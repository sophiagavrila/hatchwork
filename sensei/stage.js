// The stage for Sojo's ceremony: an RGB canvas, a mountain ledge above the clouds at 3 a.m., an old
// pine with a lantern, a rubber duck on a rock, smoke, feathers, tea steam and light. Drawn into floats, composited each frame, printed as truecolor half-blocks (▀).
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
  // Screen shake: move everything by (dx, dy), smearing the edge pixels into the gap.
  shift(dx, dy) {
    if (!dx && !dy) return;
    const src = this.d.slice(), w = this.w, h = this.h;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const sx = clamp(x - dx, 0, w - 1), sy = clamp(y - dy, 0, h - 1), i = (y * w + x) * 3, j = (sy * w + sx) * 3;
      this.d[i] = src[j]; this.d[i + 1] = src[j + 1]; this.d[i + 2] = src[j + 2];
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
  pine: hex('#13202a'), pineLit: hex('#2b4447'), pineD: hex('#0b141c'), bark: hex('#2a1c22'), barkLit: hex('#4a3438'),
  string: hex('#3a3046'), lampFrame: hex('#2a2030'),
  stone: hex('#6f6886'), stoneD: hex('#47415c'), stoneL: hex('#8c84a6'), lamp: hex('#ffb04a'), lampCore: hex('#fff1c2'),
  mist: hex('#8d88bb'), smoke: hex('#d9d3ea'), smokeD: hex('#9a93b8'), feather: hex('#2a2448'), featherL: hex('#8a7cc8'),
};

const MOON = { x: 79, y: 9, r: 6.5 };
const LAMPS = [{ x: 23, lx: 23, ly: 25 }]; // one camp lantern, hanging from the pine
const ROCK = { x: 84, y: 43, rx: 10, ry: 4.5 };

// The rubber duck. Faces left, toward whatever is happening. 12x10.
const DUCK = [
  '....ooo.....',
  '...oYYYo....',
  '..oYWeYYo...',
  'ooOOYYYYo...',
  'oOOooYYYo...',
  '.oo.oYYYYooo',
  '...oYYYYYYYo',
  '..oYWYYYYyYo',
  '..oyYYYYYyyo',
  '...oooooooo.',
];
const DUCK_PAL = { o: '#1a1020', Y: '#ffd84a', y: '#d9a12a', W: '#fff6b8', O: '#f08a2a', e: '#1a1020', s: '#7fd1ff' };
// Sojo's chipped mug, once he is no longer holding it. 8x8.
const MUG = [
  'oooooo..',
  'ohhhhwo.',
  'oWWWWwoo',
  'oxxxWwWo',
  'oWWWWwWo',
  'oWWWWwoo',
  'owww.o..',
  'oooo....',
];
const MUG_PAL = { o: '#0c0a16', W: '#f4efe6', w: '#bdb4c8', h: '#7a4a24', x: '#2f8f84' };

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
  const skyOnly = new Canvas().copy(cv);
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
  // the rock the duck lives on
  for (let y = 36; y < SH; y++) for (let x = ROCK.x - ROCK.rx - 1; x <= ROCK.x + ROCK.rx + 1; x++) {
    const d = ((x + 0.5 - ROCK.x) / ROCK.rx) ** 2 + ((y + 0.5 - ROCK.y) / ROCK.ry) ** 2;
    if (d > 1 || y > 44) continue;
    cv.put(x, y, d > 0.8 ? C.stoneD : x < ROCK.x - 2 && y < ROCK.y - 1 ? C.stoneL : C.stone);
  }
  for (let x = ROCK.x - 9; x <= ROCK.x + 9; x++) cv.put(x, 45, C.ground1, 0.8);
  // an old pine leaning over the ledge: trunk, one long branch, flat needle pads lit from the moon side
  const trunk = [[10, 46], [10, 42], [11, 38], [13, 33], [14, 28], [16, 23], [17, 19], [16, 15], [14, 11]];
  for (let i = 0; i < trunk.length - 1; i++) {
    const [x0, y0] = trunk[i], [x1, y1] = trunk[i + 1], n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
    for (let k = 0; k <= n; k++) {
      const x = Math.round(x0 + (x1 - x0) * k / n), y = Math.round(y0 + (y1 - y0) * k / n), w = y > 38 ? 2 : y > 26 ? 1 : 1;
      for (let dx = -w; dx <= w; dx++) cv.put(x + dx, y, dx === w ? C.barkLit : C.bark);
    }
  }
  for (let x = 16; x <= 30; x++) { const y = Math.round(20 - (x - 16) * 0.28); cv.put(x, y, C.bark); cv.put(x, y + 1, x % 4 ? C.bark : C.barkLit); }
  cv.rect(7, 43, 13, 45, C.bark, 0.9); cv.put(6, 45, C.bark); cv.put(14, 45, C.bark);
  const pad = (cx, cy, rx, ry) => {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
      const d = ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2, edge = Math.sin(x * 1.7) * 0.18;
      if (d > 1 + edge) continue;
      cv.put(x, y, y < cy - ry * 0.35 ? (x > cx - rx * 0.2 ? C.pineLit : C.pine) : d > 0.7 && y > cy ? C.pineD : C.pine);
    }
  };
  [[9, 9, 8, 3], [22, 7, 7, 2.6], [29, 15, 6, 2.4], [6, 18, 5.5, 2.2], [19, 13, 5, 2], [4, 27, 4, 1.8]].forEach(p => pad(...p));
  // a camp lantern on a string from the branch
  const L0 = LAMPS[0];
  for (let y = 18; y <= L0.ly - 3; y++) cv.put(L0.x, y, C.string);
  cv.rect(L0.x - 2, L0.ly - 2, L0.x + 2, L0.ly - 2, C.lampFrame); cv.rect(L0.x - 2, L0.ly + 2, L0.x + 2, L0.ly + 2, C.lampFrame);
  cv.rect(L0.x - 1, L0.ly - 1, L0.x + 1, L0.ly + 1, C.lamp); cv.put(L0.x - 2, L0.ly, C.lampFrame); cv.put(L0.x + 2, L0.ly, C.lampFrame);
  // sky mask so the stars twinkle only where the sky still shows
  const base = new Canvas().copy(cv);
  for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) {
    const i = (y * SW + x) * 3, same = Math.abs(base.d[i] - skyOnly.d[i]) + Math.abs(base.d[i + 2] - skyOnly.d[i + 2]) < 1;
    sky[y * SW + x] = y < ridge(x) - 0.5 && same && Math.hypot(x - MOON.x, y - MOON.y) > MOON.r + 2 ? 1 : 0;
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
function steam(list, x, y, R) {
  list.push({ k: 'steam', x: x + R() * 3, y, p: R() * 6.28, age: 0, life: 22 + R() * 12 });
}
function step(list) {
  for (const p of list) {
    p.age++;
    if (p.k === 'smoke') { p.x += p.vx; p.y += p.vy; p.vx *= 0.94; p.vy = p.vy * 0.94 - 0.012; p.r += 0.12; }
    else if (p.k === 'feather') { p.y += p.vy; p.x += Math.sin(p.age * 0.12 + p.p) * 0.35; if (p.y > 44) p.age = p.life; }
    else if (p.k === 'steam') { p.y -= 0.22; p.x += Math.sin(p.age * 0.3 + p.p) * 0.25; }
    else if (p.k === 'spark') { p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.vx *= 0.97; }
    else if (p.k === 'mote') { p.x += (p.tx - p.x) * p.sp; p.y += (p.ty - p.y) * p.sp; if (Math.hypot(p.tx - p.x, p.ty - p.y) < 1) p.age = p.life; }
  }
  for (let i = list.length - 1; i >= 0; i--) if (list[i].age >= list[i].life) list.splice(i, 1);
}
// A burst of light-colored sparks, for the hatch.
function sparks(list, x, y, n, R, c = [255, 240, 190]) {
  for (let i = 0; i < n; i++) { const a = R() * Math.PI * 2, v = 0.6 + R() * 1.6; list.push({ k: 'spark', x, y, vx: Math.cos(a) * v * 1.3, vy: Math.sin(a) * v - 0.8, c, age: 0, life: 14 + R() * 14 }); }
}
function drawParticles(cv, list, layer) {
  for (const p of list) {
    const f = 1 - p.age / p.life;
    if (p.k === 'smoke' && layer === 'front') { cv.disc(p.x, p.y, p.r, C.smokeD, 0.35 * f, { soft: 1.2 }); cv.disc(p.x - 0.4, p.y - 0.5, p.r * 0.7, C.smoke, 0.55 * f, { soft: 1 }); }
    if (p.k === 'feather' && layer === 'front') {
      const tilt = Math.sin(p.age * 0.12 + p.p) > 0 ? 1 : -1;
      cv.put(p.x, p.y, C.featherL, 0.9); cv.put(p.x + tilt, p.y + 1, C.feather, 0.95); cv.put(p.x + tilt * 2, p.y + 1, C.feather, 0.8);
    }
    if (p.k === 'steam' && layer === 'front') cv.put(p.x, p.y, [225, 220, 240], 0.45 * f);
    if (p.k === 'spark' && layer === 'front') cv.add(p.x, p.y, p.c, f);
    if (p.k === 'mote' && layer === 'front') { cv.add(p.x, p.y, [255, 240, 190], 0.9); cv.disc(p.x, p.y, 0.6, [255, 220, 150], 0.25, { soft: 1.5, glow: true }); }
  }
}

// Where the bell on Sojo's staff hangs, for glows and motes. Raised poses lift it 4px.
const RAISED = new Set(['raise', 'glow', 'nomug']);
const bellAt = S => ({ x: S.sx + 9.5, y: S.sy + (RAISED.has(S.pose) ? 7 : 11) });

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

  // Sojo
  if (S.sensei && S.senseiAlpha > 0) {
    const rows = S.sensei.FRAMES[S.pose] || S.sensei.FRAMES.idle;
    cv.sprite(rows, S.sensei.PAL, S.sx, S.sy, { alpha: S.senseiAlpha, dissolve: S.dissolve || 0, seed: t, light: S.senseiLight || 0 });
    if (S.ringGlow > 0) {
      const b = bellAt(S); // the brass bell on his staff
      cv.disc(b.x, b.y, 2, [255, 248, 210], 0.5 * S.ringGlow, { soft: 10 * S.ringGlow, glow: true });
    }
  }

  // the duck on its rock, and the mug he left behind; both stay a little lit when the stage dims
  const shade = { tint: [10, 8, 20], tintAmt: 0.35 * (S.dim || 0) };
  const dk = S.duck || {};
  cv.sprite(DUCK, DUCK_PAL, ROCK.x - 6, ROCK.y - 13 + Math.round(dk.dy || 0), shade);
  if (dk.worry) { const wy = ROCK.y - 13 + Math.round(dk.dy || 0); cv.put(ROCK.x + 3, wy + 1, hex(DUCK_PAL.s), Math.min(1, dk.worry)); cv.put(ROCK.x + 3, wy + 2, hex(DUCK_PAL.s), Math.min(1, dk.worry) * 0.7); }
  if (S.mug) cv.sprite(MUG, MUG_PAL, Math.round(S.mug.x), Math.round(S.mug.y), shade);

  // light rays behind a silhouette
  if (S.rays > 0) {
    const cx = 48, cy = 26, col = S.auraRGB || [255, 230, 160];
    for (let a = 0; a < 12; a++) {
      const th = (a / 12) * Math.PI * 2 + t * 0.045, wide = a % 2 ? 0.6 : 1;
      for (let r = 12; r < 46; r += 0.6) {
        const x = cx + Math.cos(th) * r * 1.3, y = cy + Math.sin(th) * r * 0.75;
        cv.add(x, y, col, S.rays * 0.42 * wide * (1 - r / 46));
      }
    }
  }

  // the egg, with its aura
  if (S.egg) {
    const E = S.egg, sc = E.scale || 1, w = 12 * sc, h = 14 * sc, cx = E.x + w / 2, cy = E.y + h / 2, ex = Math.round(E.x + (E.wx || 0)), ey = Math.round(E.y + (E.wy || 0));
    const pulse = 0.75 + 0.25 * Math.sin(t * 0.35);
    cv.disc(cx, cy, w * 0.45, E.aura, 0.32 * pulse * (E.glow ?? 1), { soft: 9 * sc, glow: true });
    cv.disc(cx, cy, w * 0.2, [255, 250, 230], 0.18 * pulse * (E.glow ?? 1), { soft: 6 * sc, glow: true });
    if (E.shadow) cv.disc(cx, E.groundY ?? 46, w * 0.42, [0, 0, 0], 0.35, { soft: 2 });
    cv.sprite(E.rows, E.pal, ex, ey, { scale: sc, alpha: E.alpha ?? 1, light: E.light || 0 });
    // light leaking through the crack
    if (E.leak > 0) {
      const ly = ey + 4 * sc;
      cv.disc(ex + w / 2, ly, 1.5 * sc, [255, 250, 230], 0.5 * E.leak, { soft: 7 * sc * E.leak, glow: true });
      cv.disc(ex + w / 2, ly, 3 * sc, E.aura, 0.3 * E.leak, { soft: 10 * sc * E.leak, glow: true });
      for (let a = 0; a < 5; a++) {
        const th = -Math.PI / 2 + (a - 2) * 0.42 + Math.sin(t * 0.2 + a) * 0.05;
        for (let r = 3; r < 6 + 14 * E.leak; r += 0.7) cv.add(ex + w / 2 + Math.cos(th) * r * 1.2, ly + Math.sin(th) * r, E.aura, 0.5 * E.leak * (1 - r / (6 + 14 * E.leak)));
      }
    }
  }

  // the Patchling
  if (S.creature) {
    const K = S.creature, sc = K.scale || 2;
    if (K.sil > 0) {
      // Who's that Patchling: a dark shape with a rim of the path's light
      const rim = S.auraRGB || [255, 230, 160];
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) cv.sprite(K.g, K.pal, K.x + dx, K.y + dy, { scale: sc, tint: rim, tintAmt: 1, alpha: K.sil * 0.9, light: 0.3 });
      cv.sprite(K.g, K.pal, K.x, K.y, { scale: sc, light: K.light || 0 });
      cv.sprite(K.g, K.pal, K.x, K.y, { scale: sc, tint: [14, 11, 26], tintAmt: 1, alpha: K.sil });
    } else cv.sprite(K.g, K.pal, K.x, K.y, { scale: sc, light: K.light || 0 });
  }

  drawParticles(cv, S.particles, 'front');

  if (S.shake > 0.3) cv.shift(Math.round((Math.sin(t * 2.7) * S.shake)), Math.round(Math.cos(t * 3.3) * S.shake * 0.5));
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

module.exports = { SW, SH, Canvas, scenery, compose, toRows, puff, feathers, motes, steam, sparks, step, rng, hex, lerp, clamp, bellAt, C, DUCK, DUCK_PAL, MUG, MUG_PAL, ROCK };
