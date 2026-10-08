// Patch hatchery core: pixel grids -> half-block terminal cells (▀ ▄ █), shared egg, entrance kit.
// One pixel = half a terminal cell, so a W×H grid occupies W cols × H/2 rows.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.PatchDex = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const W = 28, H = 22;
  const MAX_W = 22, MAX_H = 20;
  const REQUIRED = ['idle', 'blink', 'talk', 'happy', 'sleep'];
  const RARITY = { common: 55, uncommon: 28, rare: 13, legendary: 4 };

  // Shared egg. Digits 0-7 are reserved for it; creatures must not use them.
  const EGG_PAL = { 0: '#3b2a24', 1: '#f2e6cf', 2: '#fffbf2', 3: '#cdb48f', 4: '#5fb3a8', 5: '#3d8379', 6: '#d65a4a', 7: '#ffe39a' };
  const EGG = [
    '....0000....',
    '..00221100..',
    '.0122111110.',
    '.0121111130.',
    '012111111330',
    '016464611330',
    '014445411330',
    '016455611330',
    '014555411330',
    '016464611330',
    '031111113330',
    '.0311113330.',
    '..00333300..',
    '....0000....',
  ];

  const toGrid = rows => rows.map(r => (Array.isArray(r) ? r.slice() : [...r]));
  const toRows = g => g.map(r => (Array.isArray(r) ? r.join('') : r));
  const blank = (w = W, h = H) => Array.from({ length: h }, () => Array(w).fill('.'));
  const clone = g => g.map(r => (Array.isArray(r) ? r.slice() : [...r]));
  const dims = rows => [Math.max(...rows.map(r => (Array.isArray(r) ? r : [...r]).length)), rows.length];
  const homeOf = rows => { const [w, h] = dims(rows); return { x: Math.floor((W - w) / 2), y: H - h }; };
  const f = (g, ms = 110, extra = {}) => ({ g, ms, ...extra });

  function stamp(g, rows, x, y, o = {}) {
    rows.forEach((r, j) => {
      const a = Array.isArray(r) ? r : [...r];
      const rx = x + (o.rowDx ? o.rowDx(j) : 0);
      a.forEach((c, i) => {
        if (c === '.' || c === ' ') return;
        const xi = rx + (o.flipX ? a.length - 1 - i : i), yj = y + j;
        if (xi < 0 || yj < 0 || yj >= g.length || xi >= g[0].length) return;
        g[yj][xi] = o.map && c in o.map ? o.map[c] : (o.fill || c);
      });
    });
    return g;
  }
  const px = (g, x, y, ch) => { if (y >= 0 && y < g.length && x >= 0 && x < g[0].length) g[y][x] = ch; return g; };

  // Egg crack runs along a zigzag near the top.
  const zz = x => (x % 2 ? 3 : 4);
  function crackEgg(full, glow) {
    const g = toGrid(EGG);
    for (let x = full ? 1 : 6; x <= 10; x++) if (g[zz(x)][x] !== '.') g[zz(x)][x] = '0';
    if (glow) [3, 5, 7, 9].forEach(x => { g[zz(x) + 1][x] = '7'; });
    return toRows(g);
  }
  const EGG_C1 = crackEgg(false, false);
  const EGG_C2 = crackEgg(true, true);
  const EGG_TOP = toRows(toGrid(crackEgg(true, false)).map((r, y) => r.map((c, x) => (y <= zz(x) ? c : '.'))));
  const EGG_BOTTOM = toRows(toGrid(crackEgg(true, false)).map((r, y) => r.map((c, x) => (y >= zz(x) ? c : '.'))));
  const EGG_HOME = homeOf(EGG);

  function egg(rows = EGG, dx = 0, dy = 0, o) { return stamp(blank(), rows, EGG_HOME.x + dx, EGG_HOME.y + dy, o); }
  const lean = d => ({ rowDx: j => (j < 6 ? d : 0) });
  function sparkle(g, k = 0) {
    const pts = k % 2 ? [[-2, 1], [13, 3], [5, -3], [10, -2]] : [[-1, -1], [12, 0], [3, -2], [8, -3]];
    pts.forEach(([x, y]) => px(g, EGG_HOME.x + x, EGG_HOME.y + y, '7'));
    return g;
  }
  // The shared suspense beat every hatch starts with (~2.6s). Same for everyone so the reveal is a surprise.
  function eggIntro() {
    return [
      f(egg(), 520),
      f(egg(EGG, 0, 0, lean(-1)), 120), f(egg(EGG, 0, 0, lean(1)), 120), f(egg(), 300),
      f(egg(EGG, 0, 0, lean(-1)), 80), f(egg(EGG, 0, 0, lean(1)), 80), f(egg(EGG, 0, 0, lean(-1)), 80), f(egg(EGG, 0, 0, lean(1)), 80),
      f(egg(), 240), f(egg(EGG_C1), 320), f(egg(EGG_C1, 0, -1), 90), f(egg(EGG_C1), 240),
      f(sparkle(egg(EGG_C2), 0), 200), f(sparkle(egg(EGG_C2), 1), 200),
    ];
  }

  function kit(c) {
    return {
      W, H, f, blank, clone, stamp, px, dims, home: homeOf, toGrid,
      EGG, EGG_C1, EGG_C2, EGG_TOP, EGG_BOTTOM, eggHome: EGG_HOME, egg, eggIntro, lean, sparkle,
      sprite: n => c.sprites[n],
      // Canvas with a sprite at its home spot (centered, feet on the bottom row), offset by dx/dy.
      at: (n, dx = 0, dy = 0, o) => { const r = typeof n === 'string' ? c.sprites[n] : n; const h = homeOf(r); return stamp(blank(), r, h.x + dx, h.y + dy, o); },
      // Same, but drawn onto an existing canvas.
      over: (g, n, dx = 0, dy = 0, o) => { const r = typeof n === 'string' ? c.sprites[n] : n; const h = homeOf(r); return stamp(g, r, h.x + dx, h.y + dy, o); },
    };
  }

  const creatures = [];
  const paletteOf = c => Object.assign({}, EGG_PAL, c.palette || {});

  function validate(c) {
    const e = [];
    if (!c.id || !c.name) e.push('missing id or name');
    if (!(c.rarity in RARITY)) e.push('rarity must be one of ' + Object.keys(RARITY).join(', '));
    const pal = c.palette || {};
    Object.keys(pal).forEach(k => { if ('01234567.'.includes(k) || k.length !== 1) e.push(`palette key "${k}" is reserved or not one char`); });
    const s = c.sprites || {};
    REQUIRED.forEach(n => { if (!s[n]) e.push(`missing sprite "${n}"`); });
    const base = s.idle ? dims(s.idle) : null;
    Object.entries(s).forEach(([n, rows]) => {
      const lens = new Set(rows.map(r => [...r].length));
      if (lens.size > 1) e.push(`sprite "${n}" has uneven row widths: ${[...lens].join(',')}`);
      const [w, h] = dims(rows);
      if (w > MAX_W || h > MAX_H) e.push(`sprite "${n}" is ${w}x${h}; max ${MAX_W}x${MAX_H}`);
      if (base && (w !== base[0] || h !== base[1])) e.push(`sprite "${n}" is ${w}x${h} but idle is ${base[0]}x${base[1]}`);
      rows.forEach(r => [...r].forEach(ch => { if (ch !== '.' && !(ch in pal)) e.push(`sprite "${n}" uses unknown color "${ch}"`); }));
    });
    return [...new Set(e)];
  }

  function frames(c) {
    if (c._frames) return c._frames;
    const pal = paletteOf(c);
    let out = [];
    try {
      out = (c.entrance ? c.entrance(kit(c)) : []).map(fr => ({ ...fr, g: toGrid(fr.g) }));
      out.forEach((fr, i) => {
        if (fr.g.length !== H || fr.g.some(r => r.length !== W)) c._errors.push(`entrance frame ${i} is not ${W}x${H}`);
        fr.g.forEach(r => r.forEach(ch => { if (ch !== '.' && !(ch in pal)) c._errors.push(`entrance frame ${i} uses unknown color "${ch}"`); }));
      });
      c._errors = [...new Set(c._errors)];
    } catch (err) { c._errors.push('entrance threw: ' + err.message); }
    return (c._frames = out);
  }

  function register(c) {
    c._errors = validate(c);
    const i = creatures.findIndex(x => x.id === c.id);
    if (i >= 0) creatures[i] = c; else creatures.push(c);
    return c;
  }

  function defaultLoop(c) {
    const s = c.sprites, L = [['idle', 22], ['blink', 2], ['idle', 14], ['blink', 2], ['idle', 18]];
    if (s.fidget) L.push(['fidget', 8], ['idle', 10]);
    return L;
  }
  // Which sprite to show for a mood at tick t (100ms ticks).
  function spriteFor(c, mood, t) {
    const s = c.sprites;
    if (mood === 'idle') {
      const L = c.loop || defaultLoop(c), total = L.reduce((a, b) => a + b[1], 0);
      let x = t % total;
      for (const [n, d] of L) { if (x < d) return s[n] ? n : 'idle'; x -= d; }
    }
    if (mood === 'talk') return Math.floor(t / 2) % 2 ? (s.talk2 ? 'talk2' : 'idle') : 'talk';
    if (s[mood + '2']) return Math.floor(t / 4) % 2 ? mood + '2' : mood;
    return s[mood] ? mood : 'idle';
  }

  function pick(rand = Math.random) {
    const pool = creatures.filter(c => !c._errors.length || true);
    const tiers = {};
    pool.forEach(c => (tiers[c.rarity] = tiers[c.rarity] || []).push(c));
    const live = Object.keys(tiers), total = live.reduce((a, t) => a + RARITY[t], 0);
    let x = rand() * total;
    for (const t of live) { if (x < RARITY[t]) return tiers[t][Math.floor(rand() * tiers[t].length)]; x -= RARITY[t]; }
    return pool[0];
  }
  const odds = c => { const n = creatures.filter(x => x.rarity === c.rarity).length; const total = [...new Set(creatures.map(x => x.rarity))].reduce((a, t) => a + RARITY[t], 0); return RARITY[c.rarity] / total / n; };

  function draw(cv, grid, pal, z) {
    const g = toGrid(grid), ctx = cv.getContext('2d');
    const w = g[0].length * z, h = g.length * z;
    if (cv.width !== w) cv.width = w;
    if (cv.height !== h) cv.height = h;
    ctx.clearRect(0, 0, w, h);
    for (let y = 0; y < g.length; y++) for (let x = 0; x < g[y].length; x++) {
      const ch = g[y][x]; if (ch === '.') continue;
      ctx.fillStyle = pal[ch] || '#ff00ff';
      ctx.fillRect(x * z, y * z, z, z);
    }
  }

  function toAnsi(grid, pal) {
    const g = toGrid(grid), out = [];
    const rgb = ch => { const n = parseInt((pal[ch] || '#ff00ff').slice(1), 16); return `${(n >> 16) & 255};${(n >> 8) & 255};${n & 255}`; };
    for (let y = 0; y < g.length; y += 2) {
      let line = '';
      for (let x = 0; x < g[0].length; x++) {
        const t = g[y][x], b = (g[y + 1] || [])[x] || '.';
        if (t === '.' && b === '.') line += '\x1b[0m ';
        else if (b === '.') line += `\x1b[0m\x1b[38;2;${rgb(t)}m▀`;
        else if (t === '.') line += `\x1b[0m\x1b[38;2;${rgb(b)}m▄`;
        else if (t === b) line += `\x1b[0m\x1b[38;2;${rgb(t)}m█`;
        else line += `\x1b[38;2;${rgb(t)};48;2;${rgb(b)}m▀`;
      }
      out.push(line + '\x1b[0m');
    }
    return out.join('\n');
  }

  return { W, H, MAX_W, MAX_H, REQUIRED, RARITY, EGG_PAL, creatures, register, validate, frames, kit, paletteOf, spriteFor, pick, odds, draw, toAnsi, homeOf, blank, stamp };
});
