// Thimble evolutions — II: hermit in a pincushion on a stack of thimbles. III: hermit in an open sewing box, everything in its slot.
(function () {
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const EYE = {
    open: ['.oooo.', 'oWweWo', 'oWeelo', '.oWlo.'],
    side: ['.oooo.', 'oweWWo', 'oeeWlo', '.oWlo.'],
    shut: ['.oooo.', 'oWWWlo', 'oeeeeo', '.oWlo.'],
    happy: ['.oooo.', 'oWeeWo', 'oeWWlo', '.oWlo.'],
    up: ['.oooo.', 'oWWweo', 'oWWelo', '.oWlo.'],
    sleep: ['.oooo.', 'oWWWlo', 'oeeeeo'],
  };
  const eye = (kind, c, stalk) => EYE[kind].concat(Array(stalk).fill('..o' + c + 'o.'));
  const CLAW = {
    L: ['.o.o.', 'oCoCo', 'oCoCo', 'oCCco', 'oCcro', '.orro'],
    R: ['.o.o.', 'ocoro', 'ocoro', 'orcco', 'orrco', 'orro.'],
    Lt: ['.....', '.....', '.oooo', 'oCCco', 'oCcro', '.orro'],
    Rt: ['.....', '.....', 'oooo.', 'orcco', 'orrco', 'orro.'],
  };
  const Q = ['.WW.', 'W..W', '..W.', '....', '..W.'];

  // Shared poser. g = geometry of the form (eye/claw anchors, face row).
  const pose = (g, o = {}) => {
    const s = Object.assign({ l: 'open', r: 'open', ly: 0, ry: 0, ls: 2, rs: 2, cl: g.cy, cr: g.cy, L: 'L', R: 'R', face: null, q: false }, o);
    let b = g.bare;
    b = put(b, g.lx, g.ey + s.ly, eye(s.l, 'C', s.ls));
    b = put(b, g.rx, g.ey + s.ry, eye(s.r, 'c', s.rs));
    if (s.face) b = put(b, g.fx, g.fy, [s.face]);
    b = put(b, 0, s.cl, CLAW[s.L]);
    b = put(b, g.crx, s.cr, CLAW[s.R]);
    if (s.q) b = put(b, g.qx, 0, Q);
    return b;
  };
  const OPEN = 'oeeo', CLOSED = 'cccc';
  const moods = (g) => ({
    idle: pose(g),
    idle2: pose(g, { l: 'side', r: 'side' }),
    blink: pose(g, { l: 'shut', r: 'shut' }),
    talk: pose(g, { face: OPEN }),
    talk2: pose(g, { cr: g.cy - 1 }),
    happy: pose(g, { l: 'happy', r: 'happy', face: OPEN, cl: g.cy - 2, cr: g.cy - 2 }),
    happy2: pose(g, { l: 'happy', r: 'happy', face: OPEN, cl: g.cy - 1, cr: g.cy - 1 }),
    sleep: pose(g, { l: 'sleep', r: 'sleep', ly: 1, ry: 1, ls: 0, rs: 0, face: CLOSED }),
    sleep2: pose(g, { l: 'sleep', r: 'sleep', ly: 2, ry: 2, ls: 0, rs: 0, face: CLOSED }),
    think: pose(g, { l: 'up', r: 'up', ry: 1, rs: 1, q: true }),
    think2: pose(g, { l: 'up', r: 'up', ry: 1, rs: 1, cl: g.cy - 1 }),
    fidget: pose(g, { L: 'Lt' }),
    fidget2: pose(g, { R: 'Rt' }),
  });

  // ---- II · Adept: a pincushion of chosen pins, sitting in two nested thimbles.
  const BARE2 = [
    '........................',
    '........................',
    '........................',
    '........................',
    '........................',
    '......oooooooooooo......',
    '.....oCCCccccccccro.....',
    '....oCCCccoccocccrro....',
    '....oCCccccooccccrro....',
    '.....ooYooobooogooo.....',
    '....oVVmVVVmvvvmvvdo....',
    '..oVVVVVdVVvvvvdvvdddo..',
    '...ovvvvdvvvvvvdvdddo...',
    '....oWWWWWWlllllmmmo....',
    '....ollllmmmmmmnnnno....',
    '.....olWlmlmlmlnnno.....',
    '....oWWWWWWlllllmmmo....',
    '....olWlmlmlmlmlnnno....',
    '.....olWllllllllmno.....',
    '......olWlmlmlmnno......',
    '.......oooooooooo.......',
  ];
  const II = moods({ bare: BARE2, ey: 0, lx: 4, rx: 13, cy: 5, crx: 19, fx: 10, fy: 7, qx: 20 });

  // ---- III · Ascended: an open sewing box, one slot per thing, its first thimble in the middle.
  const BARE3 = [
    '...oooooooooooooooooooooo...',
    '..oHHHHHHHHHHHHHHHHHHHHHho..',
    '..oHdYddddddddddddddddVdjo..',
    '..oHdmddddddddddddddddmdjo..',
    '..oHddddddddddddddddddddjo..',
    '..oHddddddddddddddddddddjo..',
    '..ojjjjjoooooooooooojjjjjo..',
    '....ojjoCCCccccccccrojjo....',
    '....ojjCCCccoccocccrrjjo....',
    '....ojjCCccccooccccrrjjo....',
    '.oooooooooooooooooooooooooo.',
    '.oHHHhHHHHhHjWljHHHHhHHHHho.',
    '.ojYyjHjbBjHWlWmHjgGjHjVvjo.',
    '.ojYyjHjbBjHlWmnHjgGjHjVvjo.',
    '.ohhhjHhhhjHmmnnHhhhjHhhhjo.',
    '.oHHHHHHHHHHHHHHHHHHHHHHHho.',
    '.oHhhhhhhhhhoYYohhhhhhhhhjo.',
    '.oHhhhhhhhhhoyyohhhhhhhhhjo.',
    '.ojjjjjjjjjjjjjjjjjjjjjjjjo.',
    '.oHhhhhhhhhhhYYhhhhhhhhhhjo.',
    '.oooooooooooooooooooooooooo.',
    '..ojjo................ojjo..',
  ];
  const III = moods({ bare: BARE3, ey: 1, lx: 6, rx: 15, cy: 5, crx: 23, fx: 12, fy: 8, qx: 24 });

  PatchDex.evolve('thimble', {
    habit: 'context',
    stages: [
      {
        name: 'Pinnock',
        species: 'pincushion hermit crab',
        blurb: 'Traded the single thimble for a pincushion on a stack of two. Every pin in it was chosen; anything unpinned stays out of the shell.',
        voice: 'pin the three files that matter. leave the rest in the drawer.',
        evolve: 'Its shell grew into a pincushion on stacked thimbles: you started choosing what goes into context instead of pasting everything in.',
        palette: { V: '#f27a86', v: '#d0435a', d: '#8a2443', Y: '#f5d27a', b: '#6aa8ff', g: '#6fd08c' },
        sprites: II,
        loop: [['idle', 26], ['blink', 2], ['idle', 16], ['idle2', 6], ['idle', 14], ['fidget', 4], ['idle', 12], ['fidget2', 4], ['idle', 10], ['blink', 2]],
      },
      {
        name: 'Etuile',
        species: 'sewing-box hermit crab',
        blurb: 'Lives in an open sewing box where every spool, needle and pin has its own slot, and its first thimble sits in the middle one. Nothing in there is loose.',
        voice: 'everything has a slot. what goes in this one, and what comes out?',
        evolve: 'The pincushion became a sewing box with a place for everything: you keep context organised by habit, scoped files in and stale threads out.',
        palette: { H: '#d9a066', h: '#a8693a', j: '#5c3420', d: '#7a2238', V: '#f27a86', v: '#d0435a', Y: '#f5d27a', y: '#c9963a', b: '#6aa8ff', B: '#3a64c8', g: '#6fd08c', G: '#2f8f57' },
        sprites: III,
        loop: [['idle', 24], ['idle2', 6], ['idle', 14], ['blink', 2], ['idle', 18], ['fidget2', 4], ['idle', 12], ['idle2', 5], ['idle', 10], ['blink', 2]],
      },
    ],
  });
})();
