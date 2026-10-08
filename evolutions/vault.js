// Vault evolutions — II Shellock: a loupe-eyed inspector with a spoked vault wheel. III Fortoise: a walking strongroom with battlements and a watch lamp.
(function () {
  const grid = (W, H) => Array.from({ length: H }, () => Array(W).fill('.'));
  // put(g, x, y, art): stamp art; ' ' and '.' keep the pixel underneath.
  const put = (g, x, y, art) => {
    art.forEach((r, j) => [...r].forEach((c, i) => { if (c !== ' ' && c !== '.' && g[y + j] && x + i >= 0 && x + i < g[0].length) g[y + j][x + i] = c; }));
    return g;
  };
  const px = (g, x, y, c) => { if (g[y] && x >= 0 && x < g[0].length) g[y][x] = c; };
  const rowsOf = g => g.map(r => r.join(''));

  // Shell dome, light from the top-left. prof: half-width per row from `top` (overrides the superellipse).
  function shell(g, S) {
    const { cx, top, bot, rx, p = 2.2 } = S, H0 = bot - top + 0.6;
    const hw = y => S.prof ? S.prof[y - top] : rx * Math.pow(Math.max(0, 1 - Math.pow((bot + 0.5 - y) / H0, p)), 1 / p);
    const m = g.map(r => r.map(() => false));
    for (let y = top; y <= bot; y++) for (let x = Math.round(cx - hw(y)); x <= Math.round(cx + hw(y)) - 1; x++) if (m[y] && x >= 0 && x < m[0].length) m[y][x] = true;
    const on = (x, y) => !!(m[y] && m[y][x]);
    for (let y = top; y <= bot; y++) for (let x = 0; x < g[0].length; x++) {
      if (!on(x, y)) continue;
      let c;
      if (!on(x - 1, y) || !on(x + 1, y) || !on(x, y - 1)) c = 'o';
      else if (y === bot) c = S.trim ? ((x % 3) ? 'a' : 'r') : ((x % 3) ? 'n' : 'd');
      else {
        const nx = (x + 0.5 - cx) / rx, ny = (y + 0.5 - bot - 0.5) / H0;
        const s = -0.6 * nx - 0.8 * ny;
        c = s > 0.62 ? 'l' : s > -0.08 ? 'g' : s > -0.42 ? 'd' : 'n';
        if (c === 'g' && !on(x - 1, y - 1) && s > 0.2) c = 'l';
      }
      g[y][x] = c;
    }
    for (let x = 0; x < g[0].length; x++) if (on(x, bot)) px(g, x, bot + 1, 'o');
    // scute seams radiating from the door
    (S.seams || []).forEach(pts => pts.forEach(([x, y]) => { if (on(x, y) && g[y][x] !== 'o') g[y][x] = 'n'; }));
    return on;
  }
  // The vault door: dark ring, gold rivets, bevelled plate. Spoke sets turn the wheel; the dial sits on top.
  const DOOR = [
    '...ynnny...',
    '.nnlgggdnn.',
    '.nlggggddn.',
    'ylggggggdda',
    'ngggggggddn',
    'ygggggggdda',
    'ngggggggddn',
    'agggggggddr',
    '.nggggdddn.',
    '.nndddddnn.',
    '...rnnnr...',
  ];
  const SPOKES = {
    3: [[5, 1, ['y']], [5, 2, ['a']], [3, 7, ['a']], [2, 8, ['y']], [7, 7, ['a']], [8, 8, ['a']]],
    '3b': [[5, 8, ['a']], [5, 9, ['a']], [3, 3, ['a']], [2, 2, ['y']], [7, 3, ['a']], [8, 2, ['y']]],
    6: [[2, 2, ['y']], [3, 3, ['a']], [8, 2, ['y']], [7, 3, ['a']], [2, 8, ['a']], [3, 7, ['a']], [8, 8, ['r']], [7, 7, ['a']], [1, 5, ['y']], [2, 5, ['a']], [8, 5, ['a']], [9, 5, ['a']]],
    '6b': [[2, 2, ['y']], [3, 3, ['a']], [8, 2, ['y']], [7, 3, ['a']], [2, 8, ['a']], [3, 7, ['a']], [8, 8, ['r']], [7, 7, ['a']], [5, 1, ['y']], [5, 2, ['a']], [5, 8, ['a']], [5, 9, ['a']]],
  };
  function door(g, x, y, spokes, dial) {
    put(g, x, y, DOOR);
    SPOKES[spokes].forEach(([dx, dy, a]) => put(g, x + dx, y + dy, a));
    put(g, x + 3, y + 3, DIAL[dial || 'v']);
  }
  const DIAL = {
    v: ['.yaa.', 'yaaar', 'yaear', 'aaerr', '.arr.'],
    d: ['.yaa.', 'yaaar', 'yaear', 'aaaer', '.arr.'],
    h: ['.yaa.', 'yaaar', 'yaeer', 'aaarr', '.arr.'],
    d2: ['.yaa.', 'yaaar', 'yaear', 'aeaar', '.arr.'],
  };
  // Heads face the viewer, like the hatchling's, one size up. The loupe sits on the right eye and moves with it.
  const HEAD2 = [
    '...ooooo...',
    '.oossskkoo.',
    'osssskkkkko',
    'osskkkkkkko',
    'okkkkkkkkho',
    'okkkkkkkhho',
    'okccccccsho',
    '.oocccccsoo',
    '...ooooo...',
  ];
  const HEAD3 = [
    '....ooooo...',
    '.ooosssskoo.',
    'osssskkkkkko',
    'osskkkkkkkko',
    'oskkkkkkkkko',
    'okkkkkkkkkho',
    'okkkkkkkkhho',
    'okcccccccsho',
    '.oocccccssoo',
    '...oooooo...',
  ];
  function face(head, F, o) {
    const g = head.map(r => [...r]);
    const [lx, rx, ey] = F.eyes, my = F.mouth, eyes = o.eyes || 'open';
    const E = {
      open: [[0, 0, 'we'], [0, 1, 'ee']], blink: [[0, 1, 'ee']], sleep: [[0, 1, 'ee']],
      up: [[0, -1, 'we'], [0, 0, 'ee']], right: [[1, 0, 'we'], [1, 1, 'ee']],
      happy: [[-1, 0, 'kek'], [-1, 1, 'e.e']], squint: [[0, 1, 'ee']],
    };
    const lE = eyes === 'think' ? 'squint' : eyes, rE = eyes === 'think' ? 'open' : eyes;
    const off = { up: [0, -1], right: [1, 0] }[rE] || [0, 0];
    E[lE].forEach(([dx, dy, s]) => put(g, lx + dx, ey + dy, [s]));
    // loupe: a gold ring around the right eye with a pale lens glint
    if (rE === 'happy') put(g, rx - 1, ey - 3, ['.yy.', 'yiia', '.rr.']);
    else {
      const x = rx - 1 + off[0], y = ey - 1 + off[1];
      put(g, x, y, ['.ya.', 'y..a', 'a..r', '.rr.']);
      put(g, x + 1, y + 1, ['ii', 'ii']);
    }
    E[rE].forEach(([dx, dy, s]) => put(g, rx + dx, ey + dy, [s]));
    if (o.blush !== false) [[1, my + (o.blush === 'high' ? -1 : 0)], [head[0].length - 3, my + (o.blush === 'high' ? -1 : 0)]].forEach(([x, y]) => px(g, x, y, 'p'));
    const mx = F.mx;
    const M = { idle: [[0, 0, 'ee']], open: [[0, 0, 'ee'], [0, 1, 'pp']], smile: [[-1, 0, 'eeee'], [-1, 1, 'kppk']], hmm: [[1, 0, 'e']], none: [] }[o.mouth || 'idle'];
    M.forEach(([dx, dy, s]) => put(g, mx + dx, my + dy, [s]));
    return rowsOf(g);
  }
  const Z = ['ccccc', '...c.', '..c..', '.c...', 'ccccc'];
  const Q = ['.aay', 'a..a', '..a.', '....', '..a.'];

  // ---- II Shellock ----
  const W2 = 25, H2 = 20;
  const LEG2 = ['ohhhho.', 'oskkho.', 'oskkho.', 'oskkkho', 'ocococo'];
  function shellock(o = {}) {
    const g = grid(W2, H2), dy = o.dy || 0, hy = (o.hy || 0) + dy;
    shell(g, { cx: 15.5, top: dy, bot: 13 + dy, rx: 9.5, p: 2.3, seams: [[[22, 3 + dy], [23, 4 + dy]], [[22, 7 + dy], [23, 7 + dy]], [[21, 11 + dy], [22, 12 + dy]], [[10, 2 + dy], [9, 1 + dy]]] });
    door(g, 11, 2 + dy, o.spin ? '3b' : 3, o.dial);
    if (o.legs !== 'tucked') {
      put(g, 11, 15 + dy, ['ohhho', 'okkho', 'ooooo']);
      put(g, 1, 15 + dy - (o.liftF || 0), LEG2);
      put(g, 17, 15 + dy - (o.liftB || 0), LEG2);
    }
    put(g, o.hx || 0, 6 + hy, face(HEAD2, { eyes: [2, 7, 3], mouth: 6, mx: 4 }, o));
    (o.extra || []).forEach(([x, y, a]) => put(g, x, y, a));
    return rowsOf(g);
  }

  // ---- III Fortoise ----
  const W3 = 28, H3 = 22;
  const LEG3 = ['ohhhhho', 'oskkkho', 'oskkkho', 'ocococo'];
  // Battlements along the crown of the shell, with the watch lamp on the middle merlon.
  const PARAPET = {
    lit: ['.....ooo.....', '.....oyo.....', 'ooo.oyyao.ooo', 'olo.olwlo.odo', 'olllllggggddo'],
    dim: ['.....ooo.....', '.....oro.....', 'ooo.orrro.ooo', 'olo.olglo.odo', 'olllllggggddo'],
  };
  function fortoise(o = {}) {
    const g = grid(W3, H3), dy = o.dy || 0, hy = (o.hy || 0) + dy;
    shell(g, { cx: 17.5, top: 4 + dy, bot: 16 + dy, rx: 10.5, trim: true, prof: [6.5, 8.5, 9.5, 10, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5], seams: [[[23, 6 + dy], [24, 5 + dy]], [[24, 10 + dy], [25, 10 + dy], [26, 10 + dy]], [[23, 14 + dy], [24, 15 + dy]], [[11, 6 + dy], [10, 5 + dy]]] });
    put(g, 11, dy, PARAPET[o.lamp === false ? 'dim' : 'lit']);
    if (o.glow) [[15, 1 + dy], [19, 1 + dy], [17, dy - 1]].forEach(([x, y]) => px(g, x, y, 'y'));
    [[25, 8 + dy], [26, 12 + dy], [9, 9 + dy]].forEach(([x, y]) => { if (g[y] && g[y][x] !== 'o' && g[y][x] !== '.') px(g, x, y, 'a'); });
    door(g, 12, 5 + dy, o.spin ? '6b' : 6, o.dial);
    if (o.legs !== 'tucked') {
      put(g, 12, 18 + dy, ['ohhho', 'okkho', 'ooooo']);
      put(g, 1, 18 + dy - (o.liftF || 0), LEG3);
      put(g, 20, 18 + dy - (o.liftB || 0), LEG3);
    }
    put(g, o.hx || 0, 8 + hy, face(HEAD3, { eyes: [2, 8, 3], mouth: 7, mx: 5 }, o));
    (o.extra || []).forEach(([x, y, a]) => put(g, x, y, a));
    return rowsOf(g);
  }

  const moods = (f, extraHappy) => ({
    idle: f(),
    idle2: f({ hy: 1, glow: true }),
    blink: f({ eyes: 'blink' }),
    talk: f({ hy: -1, mouth: 'open', glow: true }),
    talk2: f({ mouth: 'idle' }),
    happy: f({ hy: -1, eyes: 'happy', mouth: 'smile', blush: 'high', glow: true, extra: extraHappy[0] }),
    happy2: f({ dy: -1, hy: -1, eyes: 'happy', mouth: 'smile', blush: 'high', extra: extraHappy[1] }),
    think: f({ hy: -1, eyes: 'think', mouth: 'hmm', dial: 'd', extra: [[1, 0, Q]] }),
    think2: f({ hy: -1, eyes: 'think', mouth: 'hmm', dial: 'h', spin: 1, extra: [[1, 0, Q]] }),
    sleep: f({ dy: 2, eyes: 'sleep', mouth: 'none', blush: false, dial: 'h', legs: 'tucked', lamp: false, hy: 1, extra: [[1, 0, Z]] }),
    sleep2: f({ dy: 2, eyes: 'sleep', mouth: 'none', blush: false, dial: 'h', legs: 'tucked', lamp: false, hy: 1, extra: [[3, 0, Z]] }),
    fidget: f({ eyes: 'right', dial: 'd', spin: 1 }),
    fidget2: f({ eyes: 'right', dial: 'h' }),
  });

  PatchDex.evolve('vault', {
    habit: 'review',
    stages: [
      {
        name: 'Shellock',
        species: 'loupe-eyed vault tortoise',
        blurb: 'It reads every line of a diff through a jeweler\u2019s loupe, and the wheel on its back only turns once it has.',
        voice: 'read the whole diff. the bug is in the line you skimmed.',
        evolve: 'A loupe settled over one eye and the dial grew a spoked wheel: you started reading diffs line by line instead of trusting the summary.',
        palette: { i: '#cfeee4' },
        sprites: moods(shellock, [[[20, 0, ['y']]], [[19, 0, ['y']], [23, 1, ['y']]]]),
      },
      {
        name: 'Fortoise',
        species: 'strongroom fortress tortoise',
        blurb: 'Its shell is a strongroom with battlements and a watch lamp that never goes out; nothing enters it unread.',
        voice: 'nothing merges until someone has read it. today that is you.',
        evolve: 'The shell raised walls and lit a watchtower: reading every diff became a habit you keep without being asked.',
        palette: { i: '#cfeee4' },
        sprites: moods(fortoise, [[[12, 1, ['y']], [23, 0, ['y']]], [[11, 0, ['y']], [24, 1, ['y']], [27, 4, ['y']]]]),
      },
    ],
  });
})();
