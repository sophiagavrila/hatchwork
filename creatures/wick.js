// Wick — dusk moth. Periwinkle wings with amber eyespots, cream ruff, antennae that glow at the tips.
(function () {
  const idle = [
    '...a..............a...',
    '..aAa............aAa..',
    'o..aF............Fa..o',
    'oo..oF...oooo...Fo..oo',
    'oLo..oF.ohhhho.Fo..oLo',
    'oLLo...ohhhhhho...oLLo',
    'oLLLooohhhhhhhhoooLLLo',
    'oLaaLLohwehhwehoLLaaLo',
    'ovaxxaoheehheehoaxxavo',
    'ovaxxaoheehheehoaxxavo',
    '.ovaavopphmmhppovaavo.',
    '..oVvoCohhhhhhoCovVo..',
    '.ooooCCssssssssCCoooo.',
    'oLvvvoCCCCCCCCCCovvvLo',
    'ovvvvvoCsCssCsCovvvvvo',
    'ovvvVVoooovvooooVVvvvo',
    '.oVVVo...oVVo...oVVVo.',
    '..ooo.....oo.....ooo..',
  ];
  const W = idle[0].length, H = idle.length;
  const grid = rows => rows.map(r => [...r]);
  const str = g => g.map(r => r.join(''));
  // Edit both eyes at once: `rows` is a list of [y, leftStr, rightStr] patches (left eye starts col 7, right col 12).
  const eyes = (base, rows) => {
    const g = grid(base);
    rows.forEach(([y, a, b]) => { [...a].forEach((c, i) => { if (c !== '_') g[y][7 + i] = c; }); [...b].forEach((c, i) => { if (c !== '_') g[y][12 + i] = c; }); });
    return str(g);
  };
  const put = (base, pts) => { const g = grid(base); pts.forEach(([x, y, c]) => { g[y][x] = c; }); return str(g); };
  // Wing pixels: outer 6 columns each side, minus the antennae and the ruff.
  const ANT = new Set(['3,0', '2,1', '3,1', '4,1', '3,2', '4,2', '4,3', '5,3', '5,4']);
  const isWing = (x, y) => {
    const m = x < 11 ? x : W - 1 - x;
    return m <= 5 && idle[y][x] !== '.' && !'Cs'.includes(idle[y][x]) && !ANT.has(m + ',' + y);
  };
  const wings = (base, dy) => {
    const g = grid(base);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (isWing(x, y)) g[y][x] = '.';
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (isWing(x, y) && g[y + dy]) g[y + dy][x] = base[y][x];
    return str(g);
  };
  // Antenna tips: a little plus-shaped lamp at (3,1) and (18,1).
  const tips = (base, arm, mid) => put(base, [[3, 0, arm], [2, 1, arm], [4, 1, arm], [3, 2, arm], [3, 1, mid], [18, 0, arm], [17, 1, arm], [19, 1, arm], [18, 2, arm], [18, 1, mid]]);
  const shut = [[7, '_hh', 'hh'], [8, '_hh', 'hh'], [9, '_ee', 'ee']];
  const blink = eyes(idle, shut);
  const talk = put(idle, [[10, 11, 'm'], [11, 11, 'm']]);
  const talk2 = put(idle, [[10, 10, 'h'], [11, 10, 'h'], [10, 11, 'm'], [11, 11, 'm']]);
  const smile = [[9, 10, 'm'], [10, 10, 'h'], [11, 10, 'h'], [12, 10, 'm'], [10, 11, 'm'], [11, 11, 'm']];
  const happyFace = put(eyes(idle, [[7, 'heh', 'heh'], [8, 'ehe', 'ehe'], [9, '_hh', 'hh']]), smile);
  const happy = tips(wings(happyFace, -1), 'A', 'w');
  const happy2 = tips(happyFace, 'a', 'A');
  const think = tips(eyes(put(idle, [[10, 10, 'h'], [11, 10, 'm']]), [[7, '_ee', 'ee'], [8, '_ew', 'ew'], [9, '_hh', 'hh']]), 'A', 'w');
  const fidget = wings(idle, -1);
  const dim = tips(eyes(idle, shut), 'F', 'a');
  const Z = (base, x, y, c) => put(base, [[x, y, c], [x + 1, y, c], [x + 2, y, c], [x + 2, y + 1, c], [x + 1, y + 2, c], [x, y + 3, c], [x + 1, y + 3, c], [x + 2, y + 3, c]]);
  const sleep = Z(put(wings(dim, 1), [[10, 10, 'h'], [11, 10, 'm']]), 13, 0, 'z');
  const sleep2 = Z(tips(put(wings(dim, 1), [[10, 10, 'h'], [11, 10, 'm']]), 'F', 'F'), 13, 0, 'Z');
  PatchDex.register({
    id: 'wick', name: 'Wick', species: 'dusk moth', rarity: 'uncommon',
    blurb: 'A soft-winged moth drawn to whatever is still unlit. Its antennae glow near the dark spots.',
    coaching: 'Before building, look for the gaps: missing acceptance criteria, unstated edge cases, undefined done.',
    voice: 'something here is still unlit. what counts as done?',
    hatch: 'The crack glows like a lamp, the shell softens into a silk cocoon, and Wick unfolds its wings.',
    palette: {
      o: '#2c2340', L: '#e3dcff', v: '#a99cf0', V: '#7364c2', a: '#f5b54f', A: '#fff0a8', x: '#3a2c5e',
      h: '#f7f2ff', c: '#fff5de', C: '#ffefc2', s: '#e3bf80', f: '#c4a46a', F: '#d9b779', e: '#1d1630', w: '#ffffff',
      p: '#f5a8c0', m: '#7a4a6e', z: '#d9d2ff', Z: '#9d93cc',
    },
    sprites: { idle, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 22], ['blink', 2], ['idle', 12], ['fidget', 2], ['idle', 2], ['fidget', 2], ['idle', 16], ['blink', 2], ['idle', 2], ['blink', 2], ['idle', 14], ['think', 8], ['idle', 10]],
    entrance(k) {
      const out = k.eggIntro();
      const { f } = k;
      // Egg recolours: a warm lamp glow, then pale silk.
      const WARM = { 1: 'C', 2: 'c', 3: 's', 7: 'A' };
      const SILK = { 0: 'o', 1: 'h', 2: 'w', 3: 'L', 4: 'h', 5: 'L', 6: 'h', 7: 'A' };
      // Silk wraps: diagonal bands across the cocoon body.
      const wrap = (g, sh = 0) => { g.forEach((r, y) => r.forEach((c, x) => { if ('hwL'.includes(c) && (x + y + sh) % 4 === 0) r[x] = 'z'; })); return g; };
      // Cocoon halves cut from the uncracked egg along a jagged rim.
      const zz = x => (Math.floor(x / 2) % 2 ? 3 : 4);
      const half = top => k.EGG.map((r, y) => [...r].map((c, x) => (c === '.' ? c : y === zz(x) ? '0' : (top ? y < zz(x) : y > zz(x)) ? c : '.')).join(''));
      const TOP = half(true), BOT = half(false);
      const cocoon = (rows, dx = 0, dy = 0, o = {}, sh = 0) => wrap(k.egg(rows, dx, dy, { ...o, map: SILK }), sh);
      const layer = (g, top) => { top.forEach((r, y) => r.forEach((c, x) => { if (c !== '.') g[y][x] = c; })); return g; };
      // Half-and-half: the shell softens into silk from the top down.
      const soften = n => { const g = k.egg(k.EGG_C2, 0, 0, { map: WARM }); const c = cocoon(k.EGG); for (let y = 0; y < n; y++) g[y] = c[y]; return g; };
      const folded = wings(dim, 1);
      const waking = wings(idle, 1);
      const peek = (dy, topDy) => {
        const g = k.at(folded, 0, dy);
        layer(g, cocoon(BOT));
        if (topDy !== null) layer(g, cocoon(TOP, 0, topDy));
        return g;
      };
      // Little silk tatters left on the floor once the cocoon is gone.
      const scraps = g => { [[2, 21, 'z'], [3, 21, 'h'], [24, 21, 'h'], [25, 21, 'z'], [4, 20, 'z']].forEach(([x, y, c]) => k.px(g, x, y, c)); return g; };
      const dust = (g, i) => k.sparkle(g, i);
      out.push(
        f(k.egg(k.EGG_C2, 0, 0, { map: { 7: 'A', 0: 'a' } }), 220, { note: 'the crack glows' }),
        f(k.sparkle(k.egg(k.EGG_C2, 0, 0, { map: WARM }), 0), 240),
        f(soften(14), 140, { note: 'shell softens' }),
        f(soften(18), 140),
        f(cocoon(k.EGG), 300, { note: 'silk cocoon' }),
        f(cocoon(k.EGG, 0, 0, k.lean(-1), 1), 100),
        f(cocoon(k.EGG, 0, 0, k.lean(1), 2), 100),
        f(cocoon(k.EGG, 0, 0, k.lean(-1), 3), 100),
        f(cocoon(k.EGG, 0, 0, {}, 4), 260),
        f(peek(5, -2), 160, { note: 'unwrapping' }),
        f(peek(3, -6), 160),
        f(peek(2, null), 380),
        f(scraps(k.at(folded, 0, 1)), 140),
        f(scraps(k.at(folded)), 420, { note: 'wings folded' }),
        f(scraps(k.at(waking)), 260),
        f(scraps(k.at(fidget)), 110, { note: 'unfurling' }),
        f(scraps(k.at(idle)), 110),
        f(scraps(dust(k.at(happy), 0)), 160),
        f(scraps(dust(k.at(happy), 1)), 160),
        f(scraps(k.at(happy2)), 300),
        f(k.at(idle), 360),
        f(k.at(blink), 110),
        f(k.at(idle), 450),
      );
      return out;
    },
  });
})();
