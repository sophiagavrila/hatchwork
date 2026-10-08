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
  // Evolution: every Patchling has three forms. Later forms may be bigger.
  const STAGES = ['Hatchling', 'Adept', 'Ascended'];
  const STAGE_MAX = [[MAX_W, MAX_H], [25, 21], [W, H]];
  // The habits growth is scored on. A creature's `habit` is its specialty; mastering it gates the final form.
  const HABITS = {
    prompting: 'specific prompts', planning: 'planning first', research: 'research before editing',
    autonomy: 'calibrated autonomy', verification: 'verification', review: 'reading the diff',
    recovery: 'recovery from failure', context: 'context hygiene',
  };

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
  const paletteOf = c => Object.assign({}, EGG_PAL, (c._base && c._base.palette) || {}, c.palette || {});

  function validate(c, stage = 0) {
    const e = [];
    if (!c.id || !c.name) e.push('missing id or name');
    if (!stage && !(c.rarity in RARITY)) e.push('rarity must be one of ' + Object.keys(RARITY).join(', '));
    if (c.habit && !(c.habit in HABITS) && c.habit !== 'craft') e.push(`habit must be one of ${Object.keys(HABITS).join(', ')}, craft`);
    const own = c.palette || {}, pal = stage ? Object.assign({}, c._base.palette, own) : own;
    Object.keys(own).forEach(k => { if ('01234567.'.includes(k) || k.length !== 1) e.push(`palette key "${k}" is reserved or not one char`); });
    const s = c.sprites || {};
    REQUIRED.forEach(n => { if (!s[n]) e.push(`missing sprite "${n}"`); });
    const base = s.idle ? dims(s.idle) : null, [mw, mh] = STAGE_MAX[stage];
    Object.entries(s).forEach(([n, rows]) => {
      const lens = new Set(rows.map(r => [...r].length));
      if (lens.size > 1) e.push(`sprite "${n}" has uneven row widths: ${[...lens].join(',')}`);
      const [w, h] = dims(rows);
      if (w > mw || h > mh) e.push(`sprite "${n}" is ${w}x${h}; max ${mw}x${mh} at stage ${stage + 1}`);
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

  // Later forms live in evolutions/<id>.js and may load before or after the creature itself.
  const pendingEvo = {};
  function attachEvo(c, spec) {
    if (spec.habit && !c.habit) c.habit = spec.habit;
    c.stages = (spec.stages || []).map((st, i) => {
      const fm = Object.assign({}, st, { id: c.id, rarity: c.rarity, habit: c.habit, stage: i + 1, _base: c });
      fm._errors = validate(fm, i + 1);
      return fm;
    });
    if (c.stages.length !== STAGES.length - 1) c._errors.push(`evolutions/${c.id}.js must define ${STAGES.length - 1} stages, got ${c.stages.length}`);
    c.stages.forEach(fm => fm._errors.forEach(x => c._errors.push(`[${fm.name || 'stage ' + (fm.stage + 1)}] ${x}`)));
    c._errors = [...new Set(c._errors)];
  }
  function register(c) {
    c._errors = validate(c);
    const i = creatures.findIndex(x => x.id === c.id);
    if (i >= 0) creatures[i] = c; else creatures.push(c);
    if (pendingEvo[c.id]) attachEvo(c, pendingEvo[c.id]);
    return c;
  }
  // PatchDex.evolve('pon', { habit: 'prompting', stages: [{ name, species, blurb, voice, evolve, palette, sprites }, {...}] })
  function evolve(id, spec) {
    pendingEvo[id] = spec;
    const c = creatures.find(x => x.id === id);
    if (c) attachEvo(c, spec);
  }
  // A creature at a given stage (0 = as hatched). Forms work anywhere a creature does: spriteFor, kit, paletteOf, draw.
  const form = (c, n = 0) => (n > 0 && c.stages && c.stages[n - 1]) || c;
  const formsOf = c => [c, ...(c.stages || [])];

  // Silhouette of a sprite: inside = white, rim = gold. Uses reserved egg colors so every palette has them.
  function silhouette(rows, inner = '2', rim = '7') {
    const g = toGrid(rows), h = g.length, w = g[0].length, on = (x, y) => y >= 0 && y < h && x >= 0 && x < w && g[y][x] !== '.';
    return g.map((r, y) => r.map((ch, x) => (ch === '.' ? '.' : (!on(x - 1, y) || !on(x + 1, y) || !on(x, y - 1) || !on(x, y + 1) ? rim : inner))));
  }
  function rays(g, t, cx = W / 2, cy = H / 2 + 1) {
    for (let a = 0; a < 8; a++) {
      const th = (a / 8) * Math.PI * 2 + t * 0.35;
      for (let r = 9 + (t % 3); r < 16; r += 2) px(g, Math.round(cx + Math.cos(th) * r * 1.3), Math.round(cy + Math.sin(th) * r * 0.8), r % 4 ? '7' : '2');
    }
    return g;
  }
  function ring(g, r, ch, cx = W / 2, cy = H / 2 + 1) {
    for (let a = 0; a < 64; a++) { const th = (a / 64) * Math.PI * 2; px(g, Math.round(cx + Math.cos(th) * r * 1.4), Math.round(cy + Math.sin(th) * r), ch); }
    return g;
  }
  // The shared evolution scene, from stage `from` to `from + 1`. Same beat for everyone, like the egg.
  function evolution(c, from = 0) {
    const A = form(c, from), B = form(c, from + 1);
    if (A === B) return [];
    const at = (fm, n, o) => { const r = fm.sprites[n]; const hm = homeOf(r); return stamp(blank(), r, hm.x, hm.y, o); };
    const sil = (fm, n = 'idle') => { const r = silhouette(fm.sprites[n]); const hm = homeOf(r); return stamp(blank(), r, hm.x, hm.y); };
    const out = [f(at(A, 'idle'), 700, { note: `${A.name} is evolving` }), f(at(A, 'happy'), 260), f(at(A, 'idle'), 260)];
    for (let i = 0; i < 4; i++) out.push(f(rays(at(A, 'idle'), i), 140));
    out.push(f(rays(sil(A), 4), 260), f(rays(sil(A), 5), 260));
    const beats = [360, 320, 280, 240, 200, 170, 140, 120, 100, 90, 80, 70, 60, 60, 50, 50, 50, 50];
    beats.forEach((ms, i) => out.push(f(rays(i % 2 ? sil(A) : sil(B), 6 + i), ms)));
    const flash = blank(); flash.forEach(r => r.fill('2'));
    out.push(f(flash, 90, { note: 'flash' }));
    [2, 5, 8, 11].forEach((r, i) => out.push(f(ring(ring(sil(B), r, '7'), r + 1.5, i % 2 ? '2' : '7'), 80)));
    out.push(f(sil(B), 220), f(sparkle2(at(B, 'happy'), 0), 260, { note: `${B.name}!` }));
    if (B.sprites.happy2) out.push(f(sparkle2(at(B, 'happy2'), 1), 200));
    out.push(f(sparkle2(at(B, 'happy'), 2), 260), f(at(B, 'idle'), 500), f(at(B, 'blink'), 120), f(at(B, 'idle'), 600));
    // Frames before the flash show the old form; after it, the new one. Each carries its own palette.
    const pa = paletteOf(A), pb = paletteOf(B), cut = out.findIndex(fr => fr.note === 'flash');
    return out.map((fr, i) => ({ ...fr, g: toGrid(fr.g), pal: i < cut ? Object.assign({}, pb, pa) : pb }));
  }
  function sparkle2(g, k) {
    const sets = [[[2, 3], [25, 5], [5, 12], [23, 14]], [[4, 1], [22, 2], [1, 9], [26, 11]], [[3, 6], [24, 8], [6, 2], [21, 1]]];
    sets[k % 3].forEach(([x, y]) => { px(g, x, y, '7'); px(g, x - 1, y, '2'); px(g, x + 1, y, '2'); px(g, x, y - 1, '2'); px(g, x, y + 1, '2'); });
    return g;
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

  return { W, H, MAX_W, MAX_H, REQUIRED, RARITY, STAGES, STAGE_MAX, HABITS, EGG_PAL, creatures, register, evolve, form, formsOf, evolution, silhouette, validate, frames, kit, paletteOf, spriteFor, pick, odds, draw, toAnsi, homeOf, blank, stamp };
});
