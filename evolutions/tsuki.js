// Tsuki, grown: II Kinetsu (a taller pounder with a real usu and a checked brand), III Mochizuki (moon sage before a full-moon halo, glowing mortar).
(function () {
  const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
  const rows = g => g.map(r => r.join(''));
  const put = (src, ...stamps) => {
    const g = src.map(r => [...r]);
    stamps.forEach(([x, y, art]) => art.forEach((r, j) => [...r].forEach((c, i) => {
      if (c !== ' ' && c !== '.' && g[y + j] && x + i >= 0 && x + i < g[y + j].length) g[y + j][x + i] = c === '_' ? '.' : c;
    })));
    return rows(g);
  };
  const shiftRows = (src, ys, dx) => src.map((r, y) => {
    if (!ys.includes(y)) return r;
    return dx > 0 ? '.'.repeat(dx) + r.slice(0, r.length - dx) : r.slice(-dx) + '.'.repeat(-dx);
  });

  // ── II · Kinetsu ──────────────────────────────────────────────────────────────
  const W2 = 25, H2 = 21;
  const RAB2 = [
    '...ooo..oo.....',
    '..oWppo.opdo...',
    '..oWppo.opdo...',
    '..oWppo.opdo...',
    '..oWppo.opdo...',
    '..obppo.opdo...',
    '..obppoooddo...',
    '.ooWbbbbbbbbbo.',
    'oWWbbbgggbbbbdo',
    'oWbbbbbGbbbbbdo',
    'oWbbwebbbwebbdo',
    'obbbeebbbeebbdo',
    'obppeebbbeeppdo',
    'obbbbbbpbbbbbdo',
    '.odbbbbbbbbbdo.',
    '..oodddddddoo..',
    '.oWbbbbbbbbbdo.',
    'oWbgggggggggGdo',
    'oWbbbbbbbbbbbdo',
    'obbbbbbdbbbbddo',
    '.ooooooooooooo.',
  ];
  const KINE_UP = [
    '.OOOOOOO.',
    'OKKKKKKkO',
    'OKkkkkkqO',
    'OkkkkkqqO',
    '.OOOOOOO.',
    ...Array(15).fill('...Kq....'),
  ];
  const KINE_DN = ['OOOOO', 'OKKkO', 'OKkqO', 'OKkqO', 'OKkqO', 'OkkqO', 'OkqqO', 'OOOOO'];
  const USU = [
    '..oooo..',
    '.oWWWbo.',
    'oWWbbbdo',
    'OKKKKKkO',
    'OKkkkgqO',
    'OkgkgkqO',
    'OkkgkqqO',
    'OOOOOOOO',
  ];
  const USU_HIT = [
    '........',
    'W......W',
    '.oooooo.',
    'OKKKKKkO',
    'OKkkkgqO',
    'OkgkgkqO',
    'OkkgkqqO',
    'OOOOOOOO',
  ];
  const PAW_LOW = [12, 15, ['.oooo', 'oWbbo', '.ooo.']];
  const PAW_HIGH = [12, 9, ['.ooo.', 'oWbbo', 'obbdo', '.ooo.']];
  const FACE2 = {
    open: [[10, 'oWbbwebbbwebbdo'], [11, 'obbbeebbbeebbdo'], [12, 'obppeebbbeeppdo']],
    blink: [[10, 'oWbbbbbbbbbbbdo'], [11, 'obbbbbbbbbbbbdo'], [12, 'obppeebbbeeppdo']],
    happy: [[10, 'oWbbbbbbbbbbbdo'], [11, 'obbbebbbbbebbdo'], [12, 'obpebebbbebepdo']],
    up: [[10, 'oWbbewbbbewbbdo'], [11, 'obbbeebbbeebbdo'], [12, 'obppbbbbbbbppdo']],
    side: [[10, 'oWbbbwbbbbwbbdo'], [11, 'obbbbebbbbeebdo'], [12, 'obppbebbbbeepdo']],
  };
  const MOUTH2 = { none: null, open: '.odbbbeeebbbdo.', small: '.odbbbbebbbbdo.', smile: '.odbbbeeebbbdo.' };
  const face2 = (src, eyes = 'open', mouth = 'none') => {
    let g = src;
    FACE2[eyes].forEach(([y, r]) => { g = put(g, [0, y, [r]]); });
    if (MOUTH2[mouth]) g = put(g, [0, 14, [MOUTH2[mouth]]]);
    if (mouth === 'smile') g = put(g, [6, 14, ['e.e']], [7, 15, ['e']]);
    return g;
  };
  const make2 = ({ eyes = 'open', mouth = 'none', strike = false, ears = 0 } = {}) => {
    let rab = face2(RAB2, eyes, mouth);
    if (ears) rab = shiftRows(rab, [0, 1], ears);
    let g = rows(grid(W2, H2));
    if (strike) {
      g = put(g, [17, 13, USU_HIT], [19, 6, KINE_DN], [0, 0, rab], [15, 10, ['KKKK', 'qqqq']], PAW_HIGH);
    } else {
      g = put(g, [12, 0, KINE_UP], [17, 13, USU], [0, 0, rab], PAW_LOW);
    }
    return g;
  };
  const Z2a = [18, 6, ['zzzz', '...z', '..z.', '.z..', 'zzzz']];
  const Z2b = [21, 5, ['zzz', '..z', '.z.', 'zzz']];
  const FLOP2 = [0, 0, [
    '_______________',
    '_oooo___oo_____',
    'oWpppoooppo____',
    '_oooWpo_opdo___',
    '___obpo_opdo___',
    '__obppo_opdo___',
    '__obppoooddo___',
  ]];
  const sleepy2 = () => {
    const rab = put(face2(RAB2, 'blink'), FLOP2);
    return put(rows(grid(W2, H2)), [12, 0, KINE_UP], [17, 13, USU], [0, 0, rab], PAW_LOW);
  };
  const s2 = {};
  s2.idle = make2();
  s2.idle2 = make2({ ears: -1 });
  s2.blink = make2({ eyes: 'blink' });
  s2.talk = make2({ mouth: 'open' });
  s2.talk2 = make2({ mouth: 'small' });
  s2.happy = put(make2({ eyes: 'happy', mouth: 'smile' }), [21, 7, ['g', '.', '..g']]);
  s2.happy2 = put(make2({ eyes: 'happy', mouth: 'smile', strike: true }), [24, 11, ['g']], [16, 12, ['g']]);
  s2.think = put(make2({ eyes: 'up' }), [19, 6, ['.gg.', 'g..g', '...g', '..g.', '..g.', '....', '..g.']]);
  s2.fidget = make2({ eyes: 'side', strike: true });
  s2.sleep = put(sleepy2(), Z2a);
  s2.sleep2 = put(sleepy2(), Z2b);

  // ── III · Mochizuki ───────────────────────────────────────────────────────────
  const W3 = 28, H3 = 22;
  // Full moon halo: dark-gold rim, gold body, warm highlight top-left, a few soft craters.
  const disc = (g, cx, cy, r) => {
    for (let y = 0; y < H3; y++) for (let x = 0; x < W3; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d > r + 0.4) continue;
      let c = d > r - 0.6 ? 'y' : d > r - 1.5 ? 'G' : 'g';
      if (c === 'g' && (x - cx) + (y - cy) < -r * 0.7) c = 'W';
      g[y][x] = c;
    }
    [[cx + 6, cy - 4], [cx + 7, cy - 3], [cx - 7, cy + 2], [cx - 6, cy + 4], [cx + 7, cy + 3]].forEach(([x, y]) => {
      x = Math.round(x); y = Math.round(y);
      if (g[y] && g[y][x] === 'g') g[y][x] = 'G';
    });
    return g;
  };
  const RAB3 = [
    '.ooo........ooo.',
    'oWppo......oppdo',
    'oWppo......oppdo',
    '.oWppo....oppdo.',
    '.oWppo....oppdo.',
    '..oWppo..oppdo..',
    '..oWppo..oppdo..',
    '..obppo..oppdo..',
    '..oobpooooppdo..',
    '..oWWbbbbbbbbo..',
    '.oWWbbbWgbbbbdo.',
    '.oWbbbbgGbbbbdo.',
    '.oWbwebbbbwebdo.',
    '.obbeebbbbeebdo.',
    '.obpeebbbbeepdo.',
    '.obbbbbppbbbbdo.',
    '..odbbbbbbbbdo..',
    '..oaaaaaaaaaAo..',
    '.oWbaAbbbbbAbdo.',
    'oWbbbbbbbbbbbbdo',
    'oWbbWWbbbbWWbddo',
    '.oooooooooooooo.',
  ];
  const KINE3 = [
    '.OOOOOO.',
    'OKKKKKkO',
    'OKkkkkqO',
    'OkkkkqqO',
    '.OOOOOO.',
    ...Array(9).fill('...Kq...'),
  ];
  // The usu, lit from within: gold hoops, white check, mochi glowing white.
  const USU3 = [
    '..oooo..',
    '.oWWWWo.',
    'oWWWWWbo',
    'OgggggGO',
    'OKkkkWqO',
    'OkWkWkqO',
    'OkkWkqqO',
    'OgggggGO',
    'OOOOOOOO',
  ];
  const GLOW3 = [
    [[19, 11, ['g']], [27, 10, ['g']], [21, 9, ['W']]],
    [[19, 10, ['W']], [27, 11, ['W']], [26, 8, ['g']]],
    [[19, 11, ['g']], [27, 11, ['g']], [20, 8, ['W']], [26, 8, ['W']], [27, 6, ['g']]],
  ];
  const FACE3 = {
    open: [[12, '.oWbwebbbbwebdo.'], [13, '.obbeebbbbeebdo.'], [14, '.obpeebbbbeepdo.']],
    blink: [[12, '.oWbbbbbbbbbbdo.'], [13, '.obbbbbbbbbbbdo.'], [14, '.obpeebbbbeepdo.']],
    happy: [[12, '.oWbbbbbbbbbbdo.'], [13, '.obbebbbbbbebdo.'], [14, '.obebebbbbebedo.']],
    up: [[12, '.oWbewbbbbewbdo.'], [13, '.obbeebbbbeebdo.'], [14, '.obpbbbbbbbbpdo.']],
    side: [[12, '.oWbbwbbbbbwbdo.'], [13, '.obbbebbbbbeedo.'], [14, '.obpbebbbbbeedo.']],
  };
  const face3 = (src, eyes, mouth) => {
    let g = src;
    FACE3[eyes].forEach(([y, r]) => { g = put(g, [0, y, [r]]); });
    if (mouth === 'open') g = put(g, [7, 16, ['ee']]);
    if (mouth === 'small') g = put(g, [7, 16, ['e']]);
    if (mouth === 'smile') g = put(g, [6, 16, ['eeee']]);
    return g;
  };
  const RX = 3, UX = 20, UY = 13;
  const make3 = ({ eyes = 'open', mouth = 'none', glow = 0, ears = 0, lit = true } = {}) => {
    const g = grid(W3, H3);
    disc(g, RX + 7.5, 10, 10.2);
    let out = rows(g);
    let rab = face3(RAB3, eyes, mouth);
    if (ears) rab = shiftRows(rab, [0, 1, 2], ears);
    const usu = lit ? USU3 : USU3.map(r => r.replace(/W/g, 'b').replace(/g/g, 'K').replace(/G/g, 'k'));
    out = put(out, [RX, 0, rab], [UX, UY, usu], [UX, 0, KINE3]);
    if (lit && glow >= 0) out = put(out, ...GLOW3[glow]);
    return out;
  };
  const s3 = {};
  s3.idle = make3();
  s3.idle2 = make3({ ears: -1, glow: 1 });
  s3.blink = make3({ eyes: 'blink' });
  s3.talk = make3({ mouth: 'open' });
  s3.talk2 = make3({ mouth: 'small', glow: 1 });
  s3.happy = make3({ eyes: 'happy', mouth: 'smile', glow: 2 });
  s3.happy2 = put(make3({ eyes: 'happy', mouth: 'smile', glow: 1, ears: -1 }), [0, 15, ['W']], [1, 1, ['g']]);
  s3.think = put(make3({ eyes: 'up', glow: -1 }), [25, 5, ['gg.', '..g', '.g.', '...', '.g.']]);
  s3.fidget = make3({ eyes: 'side', glow: 2 });
  s3.sleep = put(make3({ eyes: 'blink', lit: false }), [25, 8, ['zzz', '..z', '.z.', 'zzz']]);
  s3.sleep2 = put(make3({ eyes: 'blink', lit: false, ears: -1 }), [25, 5, ['zzz', '..z', '.z.', 'zzz']], [26, 11, ['z']]);

  PatchDex.evolve('tsuki', {
    habit: 'verification',
    stages: [
      {
        name: 'Kinetsu',
        species: 'mochi pounding rabbit',
        blurb: 'Tsuki grew into the full kine and a proper usu. Every strike is followed by a turn of the mochi, and every turn is a look.',
        voice: 'strike, turn, check. a test after every change.',
        evolve: 'The mortar now wears a gold check: your edit-test loop got steady enough that nothing goes in unverified.',
        palette: {},
        sprites: s2,
        loop: [['idle', 20], ['blink', 2], ['idle', 10], ['idle2', 6], ['idle', 10], ['fidget', 3], ['idle', 3], ['fidget', 3],
          ['idle', 16], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 8]],
      },
      {
        name: 'Mochizuki',
        species: 'full moon sage',
        blurb: 'A moon rabbit seated before a full moon, its kine planted upright and still between strikes. The mochi in its mortar glows because it has been checked at every turn.',
        voice: 'run it, read it, then believe it. green is earned, not assumed.',
        evolve: 'The moon came round to full: you verify by habit now, and the results you report are ones you have actually seen.',
        palette: { a: '#a9c2ee', A: '#6d86c4' },
        sprites: s3,
        loop: [['idle', 20], ['idle2', 6], ['idle', 12], ['blink', 2], ['idle', 12], ['idle2', 6], ['fidget', 4],
          ['idle', 14], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 8]],
      },
    ],
  });
})();
