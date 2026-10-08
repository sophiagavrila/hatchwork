// The stage for Sōjōbō's ceremony: an RGB canvas, the night gate on Mount Kurama, smoke, feathers
// and light. Drawn into floats, composited each frame, printed as truecolor half-blocks (▀).
'use strict';

const SW = 96, SH = 48; // pixels; 96 columns x 24 rows in the terminal

const hex = h => { const n = parseInt(String(h).slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

// Seeded RNG so the mountain and the stars are the same every night.
function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

class Canvas {
  constructor(w = SW, h = SH) { this.w = w; this.h = h; this.d = new Float32Array(w * h * 3); }
  copy(o) { this.d.set(o.d); return this; }
  get(x, y) { const i = (y * this.w + x) * 3; return [this.d[i], this.d[i + 1], this.d[i + 2]]; }
  put(x, y, c, a = 1) {
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || y < 0 || x >= this.w || y >= this.h || a <= 0) return;
    const i = (y * this.w + x) * 3, d = this.d;
    if (a >= 1) { d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; return; }
    d[i] += (c[0] - d[i]) * a; d[i + 1] += (c[1] - d[i + 1]) * a; d[i + 2] += (c[2] - d[i + 2]) * a;
  }
  add(x, y, c, a = 1) {
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || y < 0 || x >= this.w || y >= this.h || a <= 0) return;
    const i = (y * this.w + x) * 3, d = this.d;
    d[i] = Math.min(255, d[i] + c[0] * a); d[i + 1] = Math.min(255, d[i + 1] + c[1] * a); d[i + 2] = Math.min(255, d[i + 2] + c[2] * a);
  }
  rect(x0, y0, x1, y1, c, a = 1) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) this.put(x, y, c, a); }
  // Soft disc; `glow` adds light instead of painting over.
  disc(cx, cy, r, c, a = 1, { soft = 0, glow = false } = {}) {
    const R = r + soft;
    for (let y = Math.floor(cy - R); y <= Math.ceil(cy + R); y++) for (let x = Math.floor(cx - R); x <= Math.ceil(cx + R); x++) {
      const dd = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      if (dd > R) continue;
      const k = dd <= r ? 1 : 1 - (dd - r) / (soft || 1);
      glow ? this.add(x, y, c, a * k * k) : this.put(x, y, c, a * k);
    }
  }
  // Stamp palette rows. `scale` makes chunky pixels; `alpha` fades; `light` brightens toward white.
  sprite(rows, pal, x0, y0, { alpha = 1, scale = 1, light = 0, tint = null, tintAmt = 0, dissolve = 0, seed = 1 } = {}) {
    const cache = {};
    const col = ch => cache[ch] || (cache[ch] = (() => {
      let c = hex(pal[ch] || '#ff00ff');
      if (tint) c = lerp(c, tint, tintAmt);
      if (light) c = lerp(c, [255, 255, 240], light);
      return c;
    })());
    const r = dissolve ? rng(seed) : null;
    for (let j = 0; j < rows.length; j++) {
      const row = rows[j];
      for (let i = 0; i < row.length; i++) {
        const ch = row[i];
        if (ch === '.') continue;
        if (r && r() < dissolve) continue;
        const c = col(ch);
        for (let sy = 0; sy < scale; sy++) for (let sx = 0; sx < scale; sx++) this.put(x0 + i * scale + sx, y0 + j * scale + sy, c, alpha);
      }
    }
  }
  scale(f, from = 0, to = this.h) { const d = this.d; for (let i = from * this.w * 3; i < to * this.w * 3; i++) d[i] *= f; }
}

// ---- Scenery ------------------------------------------------------------------------------------
const C = {
  sky0: hex('#05040f'), sky1: hex('#141038'), sky2: hex('#3a2a5e'), sky3: hex('#5a3a62'),
  moon: hex('#f6eed6'), moonD: hex('#d8ccb0'), moonGlow: hex('#9b8fd8'),
  far: hex('#231c4a'), farLit: hex('#3d3478'), mid: hex('#16122f'), cedar: hex('#0e0b22'), cedarLit: hex('#231d4a'),
  ground0: hex('#2e2744'), ground1: hex('#17142a'), seam: hex('#1f1a33'), sheen: hex('#4a4174'),
  torii: hex('#c8323a'), toriiD: hex('#8e1f2b'), toriiL: hex('#e2564c'), black: hex('#1a1020'), gold: hex('#e9c25a'),
  rope: hex('#d6c088'), ropeD: hex('#9c8650'), paper: hex('#f4efe6'),
  stone: hex('#6f6886'), stoneD: hex('#47415c'), stoneL: hex('#8c84a6'), lamp: hex('#ffb04a'), lampCore: hex('#fff1c2'),
  mist: hex('#8d88bb'), smoke: hex('#d9d3ea'), smokeD: hex('#9a93b8'), feather: hex('#2a2448'), featherL: hex('#8a7cc8'),
};

const MOON = { x: 79, y: 9, r: 6.5 };
const LAMPS = [{ x: 6, lx: 6, ly: 35 }, { x: 89, lx: 89, ly: 35 }];

function scenery() {
  const cv = new Canvas(), sky = new Uint8Array(SW * SH), R = rng(7);
  // sky
  for (let y = 0; y < SH; y++) {
    const t = y / 34;
    const c = t < 0.55 ? lerp(C.sky0, C.sky1, t / 0.55) : t < 0.9 ? lerp(C.sky1, C.sky2, (t - 0.55) / 0.35) : lerp(C.sky2, C.sky3, clamp((t - 0.9) / 0.1));
    for (let x = 0; x < SW; x++) cv.put(x, y, c);
  }
  // moon halo, disc, terminator, craters
  for (let y = 0; y < 30; y++) for (let x = 50; x < SW; x++) {
    const d = Math.hypot(x + 0.5 - MOON.x, y + 0.5 - MOON.y);
    if (d < 22) cv.add(x, y, C.moonGlow, 0.32 * (1 - d / 22) ** 2);
  }
  cv.disc(MOON.x, MOON.y, MOON.r, C.moon, 1, { soft: 0.8 });
  for (let y = 0; y < 20; y++) for (let x = 70; x < 90; x++) {
    const d = Math.hypot(x + 0.5 - MOON.x, y + 0.5 - MOON.y), d2 = Math.hypot(x + 0.5 - MOON.x - 2.6, y + 0.5 - MOON.y + 1.4);
    if (d <= MOON.r && d2 > MOON.r) cv.put(x, y, C.moonD, 0.7);
  }
  [[77, 7], [81, 11], [78, 12], [76, 10]].forEach(([x, y], i) => cv.put(x, y, C.moonD, i ? 0.55 : 0.8));
  // far ridge, lit edge toward the moon
  const ridge = x => 25 + 3.2 * Math.sin(x * 0.075 + 0.6) + 1.8 * Math.sin(x * 0.21 + 2.1) + 0.8 * Math.sin(x * 0.55);
  for (let x = 0; x < SW; x++) {
    const top = Math.round(ridge(x));
    for (let y = top; y < SH; y++) cv.put(x, y, y === top && x > 40 ? C.farLit : lerp(C.far, C.mid, clamp((y - top) / 14)));
  }
  // mid hill + cedars
  const hill = x => 34 + 1.6 * Math.sin(x * 0.11 + 1.7) + 1.2 * Math.sin(x * 0.29);
  for (let x = 0; x < SW; x++) for (let y = Math.round(hill(x)); y < SH; y++) cv.put(x, y, C.mid);
  for (let n = 0; n < 26; n++) {
    const cx = Math.floor(R() * SW), base = Math.round(hill(cx)) + 2, h = 6 + Math.floor(R() * 7);
    for (let j = 0; j < h; j++) {
      const w = Math.floor((j / h) * 3.4 + (j % 3 === 2 ? 0.8 : 0));
      for (let i = -w; i <= w; i++) cv.put(cx + i, base - h + j, i === w && cx > 44 ? C.cedarLit : C.cedar);
    }
    cv.put(cx, base - h - 1, C.cedar);
  }
  // courtyard
  for (let y = 40; y < SH; y++) for (let x = 0; x < SW; x++) cv.put(x, y, lerp(C.ground0, C.ground1, (y - 40) / 7));
  for (let x = 0; x < SW; x++) cv.put(x, 40, C.sheen, 0.6);
  [42, 45].forEach((y, k) => { for (let x = 0; x < SW; x++) cv.put(x, y, C.seam); for (let x = (k ? 5 : 0); x < SW; x += 11) cv.put(x, y + 1, C.seam); });
  // stone lanterns (tōrō)
  for (const L of LAMPS) {
    const x = L.x;
    cv.rect(x - 4, 31, x + 4, 32, C.stoneD); cv.rect(x - 3, 30, x + 3, 30, C.stone); cv.put(x, 29, C.stone);
    cv.rect(x - 3, 33, x + 3, 37, C.stoneD); cv.rect(x - 2, 34, x + 2, 36, C.lamp);
    cv.rect(x - 1, 38, x + 1, 42, C.stone); cv.rect(x - 3, 43, x + 3, 44, C.stoneD);
    cv.rect(x - 4, 31, x - 4, 32, C.stoneL); cv.put(x - 3, 30, C.stoneL);
  }
  // torii: black kasagi with upturned ends, red shimaki, nuki, pillars, plaque
  const P1 = [18, 21], P2 = [74, 77];
  for (let x = 10; x <= 85; x++) { const up = x < 13 || x > 82 ? 1 : 0; cv.rect(x, 6 - up, x, 7 - up, C.black); }
  cv.put(9, 4, C.black); cv.put(86, 4, C.black);
  for (let x = 9; x <= 86; x++) { const up = x < 13 || x > 82 ? 1 : 0; cv.put(x, (x === 9 || x === 86 ? 3 : 5 - up), C.toriiD); }
  cv.rect(12, 8, 83, 9, C.torii); cv.rect(12, 9, 83, 9, C.toriiD);
  cv.rect(15, 15, 80, 16, C.torii); cv.rect(15, 16, 80, 16, C.toriiD);
  for (const [a, b] of [P1, P2]) { cv.rect(a, 10, b, 43, C.torii); cv.rect(b, 10, b, 43, C.toriiD); cv.rect(a, 10, a, 43, C.toriiL); cv.rect(a - 1, 41, b + 1, 44, C.black); }
  cv.rect(45, 10, 50, 14, C.black); cv.rect(46, 11, 49, 13, C.toriiD);
  cv.put(47, 11, C.gold); cv.put(48, 12, C.gold); cv.put(47, 13, C.gold);
  // shimenawa rope and paper shide
  for (let x = 22; x <= 73; x++) { const sag = Math.round(2.2 * Math.sin(Math.PI * (x - 22) / 51)); cv.put(x, 17 + sag, (x % 2) ? C.rope : C.ropeD); }
  for (const sx of [33, 48, 62]) { const y = 19 + Math.round(2.2 * Math.sin(Math.PI * (sx - 22) / 51)) - 2; [[0, 1], [1, 1], [1, 2], [0, 3], [0, 4], [1, 4], [1, 5]].forEach(([dx, dy]) => cv.put(sx + dx, y + dy, C.paper)); }
  // sky mask so the stars twinkle only where the sky shows
  const base = new Canvas().copy(cv);
  for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) {
    const ref = lerp(C.sky0, C.sky3, 0); void ref;
    sky[y * SW + x] = y < ridge(x) - 0.5 && !(x >= 9 && x <= 86 && y >= 4 && y <= 17) && !((x >= 17 && x <= 22) || (x >= 73 && x <= 78)) && Math.hypot(x - MOON.x, y - MOON.y) > MOON.r + 2 ? 1 : 0;
  }
  const stars = [];
  for (let n = 0; n < 90; n++) {
    const x = Math.floor(R() * SW), y = Math.floor(R() * 26);
    if (sky[y * SW + x]) stars.push({ x, y, b: 0.35 + R() * 0.65, p: R() * 6.28, s: 0.04 + R() * 0.12 });
  }
  return { base, stars };
}

// ---- Particles ----------------------------------------------------------------------------------
function puff(list, x, y, n, R, { spread = 10, speed = 0.9, life = 26, size = 2.4 } = {}) {
  for (let i = 0; i < n; i++) {
    const a = R() * Math.PI * 2, v = (0.25 + R()) * speed;
    list.push({ k: 'smoke', x: x + (R() - 0.5) * spread, y: y + (R() - 0.5) * spread * 0.8, vx: Math.cos(a) * v, vy: Math.sin(a) * v * 0.6 - 0.15, r: size * (0.6 + R()), age: 0, life: life * (0.7 + R() * 0.6) });
  }
}
function feathers(list, x0, x1, n, R) {
  for (let i = 0; i < n; i++) list.push({ k: 'feather', x: x0 + R() * (x1 - x0), y: -2 - R() * 12, vy: 0.18 + R() * 0.2, p: R() * 6.28, age: 0, life: 260 });
}
function motes(list, tx, ty, n, R) {
  for (let i = 0; i < n; i++) {
    const a = R() * Math.PI * 2, d = 14 + R() * 26;
    list.push({ k: 'mote', x: tx + Math.cos(a) * d, y: ty + Math.sin(a) * d * 0.7, tx, ty, age: 0, life: 18 + R() * 16, sp: 0.06 + R() * 0.06 });
  }
}
function step(list) {
  for (const p of list) {
    p.age++;
    if (p.k === 'smoke') { p.x += p.vx; p.y += p.vy; p.vx *= 0.94; p.vy = p.vy * 0.94 - 0.012; p.r += 0.12; }
    else if (p.k === 'feather') { p.y += p.vy; p.x += Math.sin(p.age * 0.12 + p.p) * 0.35; if (p.y > 44) p.age = p.life; }
    else if (p.k === 'mote') { p.x += (p.tx - p.x) * p.sp; p.y += (p.ty - p.y) * p.sp; if (Math.hypot(p.tx - p.x, p.ty - p.y) < 1) p.age = p.life; }
  }
  for (let i = list.length - 1; i >= 0; i--) if (list[i].age >= list[i].life) list.splice(i, 1);
}
function drawParticles(cv, list, layer) {
  for (const p of list) {
    const f = 1 - p.age / p.life;
    if (p.k === 'smoke' && layer === 'front') { cv.disc(p.x, p.y, p.r, C.smokeD, 0.35 * f, { soft: 1.2 }); cv.disc(p.x - 0.4, p.y - 0.5, p.r * 0.7, C.smoke, 0.55 * f, { soft: 1 }); }
    if (p.k === 'feather' && layer === 'front') {
      const tilt = Math.sin(p.age * 0.12 + p.p) > 0 ? 1 : -1;
      cv.put(p.x, p.y, C.featherL, 0.9); cv.put(p.x + tilt, p.y + 1, C.feather, 0.95); cv.put(p.x + tilt * 2, p.y + 1, C.feather, 0.8);
    }
    if (p.k === 'mote' && layer === 'front') { cv.add(p.x, p.y, [255, 240, 190], 0.9); cv.disc(p.x, p.y, 0.6, [255, 220, 150], 0.25, { soft: 1.5, glow: true }); }
  }
}

// ---- Frame composition ----------------------------------------------------------------------------
// Everything the director can change lives in `S`; compose() turns it into pixels.
function compose(cv, scene, S, t) {
  cv.copy(scene.base);
  // twinkle
  for (const s of scene.stars) {
    const tw = 0.55 + 0.45 * Math.sin(t * s.s + s.p);
    cv.add(s.x, s.y, [230, 225, 255], s.b * tw * 0.85);
  }
  // shooting star, rare
  if (S.meteor != null) {
    const k = t - S.meteor;
    if (k >= 0 && k < 10) for (let j = 0; j < 6; j++) cv.add(30 + k * 3 - j, 3 + k - j / 3, [255, 250, 230], (1 - j / 6) * (1 - k / 10));
  }
  // lantern flicker
  for (const L of LAMPS) {
    const fl = 0.75 + 0.25 * Math.sin(t * 0.9 + L.x) * Math.sin(t * 0.37 + 1.3);
    cv.disc(L.lx, L.ly, 1, C.lampCore, 0.5 * fl);
    cv.disc(L.lx, L.ly, 2, C.lamp, 0.22 * fl, { soft: 9, glow: true });
  }
  // mist drifting across the cedars
  for (let band = 0; band < 3; band++) {
    const y0 = 31 + band * 3, off = t * (0.25 + band * 0.12);
    for (let x = 0; x < SW; x++) {
      const v = 0.5 + 0.5 * Math.sin((x + off) * 0.11 + band * 2) * Math.sin((x - off * 0.6) * 0.047 + band);
      if (v < 0.35) continue;
      for (let dy = 0; dy < 2; dy++) cv.put(x, y0 + dy, C.mist, (v - 0.35) * 0.22 * (dy ? 0.6 : 1));
    }
  }
  drawParticles(cv, S.particles, 'back');

  // the stage dims for the hatch, light pooling where the egg sits
  if (S.dim > 0) {
    cv.scale(1 - S.dim * 0.72);
    const cx = 48, cy = 34;
    for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) {
      const d = Math.hypot((x - cx) / 1.25, (y - cy) * 1.1);
      if (d < 26) cv.add(x, y, S.auraRGB || [255, 230, 160], S.dim * 0.16 * (1 - d / 26) ** 1.6);
    }
  }

  // Sōjōbō
  if (S.sensei && S.senseiAlpha > 0) {
    const rows = S.sensei.FRAMES[S.pose] || S.sensei.FRAMES.idle;
    cv.sprite(rows, S.sensei.PAL, S.sx, S.sy, { alpha: S.senseiAlpha, dissolve: S.dissolve || 0, seed: t, light: S.senseiLight || 0 });
    if (S.ringGlow > 0) {
      const rx = S.sx + 4.5, ry = S.sy + 2.8; // ring of the raised shakujō
      cv.disc(rx, ry, 2, [255, 248, 210], 0.5 * S.ringGlow, { soft: 10 * S.ringGlow, glow: true });
    }
  }

  // the egg, with its aura
  if (S.egg) {
    const E = S.egg, sc = E.scale || 1, w = 12 * sc, h = 14 * sc, cx = E.x + w / 2, cy = E.y + h / 2;
    const pulse = 0.75 + 0.25 * Math.sin(t * 0.35);
    cv.disc(cx, cy, w * 0.45, E.aura, 0.32 * pulse * (E.glow ?? 1), { soft: 9 * sc, glow: true });
    cv.disc(cx, cy, w * 0.2, [255, 250, 230], 0.18 * pulse * (E.glow ?? 1), { soft: 6 * sc, glow: true });
    if (E.shadow) cv.disc(cx, E.groundY ?? 46, w * 0.42, [0, 0, 0], 0.35, { soft: 2 });
    cv.sprite(E.rows, E.pal, Math.round(E.x), Math.round(E.y), { scale: sc, alpha: E.alpha ?? 1, light: E.light || 0 });
  }

  // the Patchling
  if (S.creature) {
    const K = S.creature;
    cv.sprite(K.g, K.pal, K.x, K.y, { scale: K.scale || 2, light: K.light || 0 });
  }

  drawParticles(cv, S.particles, 'front');

  if (S.flash > 0) for (let i = 0; i < cv.d.length; i++) cv.d[i] += (255 - cv.d[i]) * S.flash;
  if (S.fade < 1) cv.scale(clamp(S.fade));
}

// ---- Terminal output ------------------------------------------------------------------------------
// One string per terminal row. Colors are only re-sent when they change along the row.
function toRows(cv) {
  const out = [], d = cv.d, w = cv.w;
  const q = v => (v < 0 ? 0 : v > 255 ? 255 : v | 0);
  for (let y = 0; y < cv.h; y += 2) {
    let s = '', lf = '', lb = '';
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 3, j = ((y + 1) * w + x) * 3;
      const f = `${q(d[i])};${q(d[i + 1])};${q(d[i + 2])}`, b = `${q(d[j])};${q(d[j + 1])};${q(d[j + 2])}`;
      if (f === b) { if (b !== lb) { s += `\x1b[48;2;${b}m`; lb = b; } s += ' '; continue; }
      if (f !== lf) { s += `\x1b[38;2;${f}m`; lf = f; }
      if (b !== lb) { s += `\x1b[48;2;${b}m`; lb = b; }
      s += '▀';
    }
    out.push(s + '\x1b[0m');
  }
  return out;
}

module.exports = { SW, SH, Canvas, scenery, compose, toRows, puff, feathers, motes, step, rng, hex, lerp, clamp, C };
