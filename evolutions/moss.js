// Moss, grown: II Delvin, a tunnelling mole with a brass headlamp, a pick and a root map;
// III Rootwarden, a deep-delver crowned in lanterns, root tendrils traced down to the glowing cause.
(function () {
  const canvas = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
  const rows = g => g.map(r => r.join(''));
  const px = (g, x, y, c) => { if (g[y] && x >= 0 && x < g[0].length) g[y][x] = c; return g; };
  // stamp(g, x, y, art): '.' and ' ' keep the pixel underneath.
  const stamp = (g, x, y, art) => { art.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.' && c !== ' ') px(g, x + i, y + j, c); })); return g; };
  // Velvet fur: fill a mask, outline it, shade lit from the top-left (L > l > b > d), rim-light the left edge.
  function fur(g, inside, box, [cx, cy, rx, ry]) {
    const [x0, y0, x1, y1] = box;
    const on = (x, y) => x >= x0 && x <= x1 && y >= y0 && y <= y1 && inside(x, y);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      if (!on(x, y)) continue;
      if (!on(x - 1, y) || !on(x + 1, y) || !on(x, y - 1) || !on(x, y + 1)) { g[y][x] = 'o'; continue; }
      const nx = (x + 0.5 - cx) / rx, ny = (y + 0.5 - cy) / ry, s = -0.62 * nx - 0.78 * ny;
      let c = s > 0.78 ? 'L' : s > 0.42 ? 'l' : s > -0.5 ? 'b' : 'd';
      if (!on(x - 2, y) && c === 'b') c = 'l';
      if (!on(x + 2, y) && c === 'b') c = 'd';
      g[y][x] = c;
    }
    return on;
  }
  const ell = (cx, cy, rx, ry) => (x, y) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;

  // ── II · Delvin ──
  const W2 = 25, H2 = 21;
  const HEAD2 = [
    '..........oooo...........',
    '.........oYwYyo..........',
    '........ooYYYyoo.........',
    '......oogoyyyyogoo.......',
    '.....oggLlllbbbbgro......',
    '....ogLLllbbbbbbbbro.....',
    '....olLlbbbbbbbbbbdo.....',
    '...olbbwebbbbbbwebbdo....',
    '...olbbeebbbbbbeebbdo....',
    '...olbpbbblpplbbbpbdo....',
    '...olbbbblpPPplbbbbdo....',
    '...olbbbbllppllbbbbdo....',
    '...olbbbbbllllbbbbbdo....',
    '..olbbbbbbbllllbbbbbddo..',
    '..olbbbbbbbbbbbbbbbbddo..',
    '..olbbbbbbbbbbbbbbbdddo..',
    '..olbbbbbbbbbbbbbbddddo..',
    '...oobbbbbbbbbbbbbdddo...',
    '.....oooooooooooooooo....',
  ];
  const MAP2 = [
    '.oooooooooooooo.',
    'okgkgkkkkkkkkkuo',
    'okuuuuguuuxuxuUo',
    'okuuuuuguguxuuUo',
    'okuuuuuuuuxuxuUo',
    '.oooooooooooooo.',
  ];
  const LPAW = ['.ooo..', 'okppo.', 'okpppk', 'opppPk', '.oPPo.', '..oo..'];
  const RPAW = ['..ooo.', '.oppPo', 'kppPPo', 'kpPPPo', '.oPPo.', '..oo..'];
  const FEET = ['oppPo....oppPo', 'okkko....okkko'];
  // The pick rides on its back: steel head over the right shoulder, handle tucked behind.
  const PICK2 = ['..ooooo.', 'oMMMmmno', 'ooooogon', '...ogo.o', '...ogo..', '...ogo..', '...ogo..'];
  const Z = ['LLLl', '..l.', '.l..', 'LLLl'];
  const QMARK = ['yyy', '..y', '.yy', '...', '.y.'];
  const SPARK = ['.Y.', 'YwY', '.Y.'];
  // o: { eyes: open|shut|happy|up, mouth: null|open|shut|grin, lamp: on|bright|off|glint, paws: 0|-1, tap, twitch, z, q, spark }
  function make2(o = {}) {
    const g = canvas(W2, H2);
    stamp(g, 17, 0, o.glint ? ['..ooooo.', 'oMMwMmno', 'ooooogon', '...ogo.o', '...ogo..', '...ogo..', '...ogo..'] : PICK2);
    stamp(g, 0, 0, HEAD2);
    const lamp = { on: null, bright: ['YwYY', 'YYYY'], off: ['lLld', 'lldd'], glint: ['YYwy', 'YYYy'] }[o.lamp || 'on'];
    if (lamp) stamp(g, 10, 1, lamp);
    const eyes = o.eyes || 'open';
    if (eyes === 'shut') stamp(g, 7, 7, ['bb......bb', 'ee......ee']);
    if (eyes === 'happy') stamp(g, 6, 7, ['beeb....beeb', 'ebbe....ebbe']);
    if (eyes === 'up') stamp(g, 7, 6, ['we......we', 'ee......ee', 'bb......bb']);
    if (o.twitch) stamp(g, 9, 9, ['bblppl', 'blpPPpl', 'bllppll']);
    const m = { open: 'ee', shut: 'PP', grin: null }[o.mouth];
    if (m) stamp(g, 11, 12, [m]);
    if (o.mouth === 'grin') stamp(g, 10, 12, ['ePPe']);
    stamp(g, 5, 19, FEET);
    stamp(g, 5, 13, MAP2);
    stamp(g, 0, 13 + (o.paws || 0), LPAW);
    stamp(g, 19, 13 + (o.paws || 0) + (o.tap ? 1 : 0), RPAW);
    if (o.z) stamp(g, o.z[0], o.z[1], Z);
    if (o.q) stamp(g, 2, 0, QMARK);
    if (o.spark) { stamp(g, 1, 1, SPARK); px(g, 4, 0, 'Y'); px(g, 23, 10, 'Y'); }
    return rows(g);
  }
  const s2 = {
    idle: make2(),
    idle2: make2({ lamp: 'glint', glint: true }),
    blink: make2({ eyes: 'shut' }),
    talk: make2({ mouth: 'open', lamp: 'bright' }),
    talk2: make2({ mouth: 'shut' }),
    happy: make2({ eyes: 'happy', mouth: 'grin', lamp: 'bright' }),
    happy2: make2({ eyes: 'happy', mouth: 'grin', lamp: 'bright', paws: -1, spark: true }),
    think: make2({ eyes: 'up', lamp: 'bright', q: true }),
    fidget: make2({ twitch: true, tap: true }),
    sleep: make2({ eyes: 'shut', lamp: 'off', z: [1, 1] }),
    sleep2: make2({ eyes: 'shut', lamp: 'off', z: [2, 0] }),
  };
  // ── III · Rootwarden ──
  const W3 = 28, H3 = 22;
  const SP3 = { 3: [10, 17], 4: [8, 19], 5: [6, 21], 6: [5, 22], 7: [5, 22], 16: [3, 24], 17: [3, 24], 18: [4, 23], 19: [6, 21] };
  for (let y = 8; y <= 15; y++) SP3[y] = [4, 23];
  // The traced root: a glowing call stack down the left wall, one node per frame, ending at the crystal.
  const TRACE = [];
  const TX = [2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 2, 3, 4];
  TX.forEach((x, y) => TRACE.push([x, y, 'a']));
  for (let x = 5; x <= 12; x++) TRACE.push([x, 21, 'a']);
  [[2, 1], [1, 5], [2, 9], [1, 13], [2, 17], [8, 21]].forEach(([x, y]) => TRACE.push([x, y, 'Y']));
  // Dull roots that went nowhere: the right wall and the ceiling.
  const DULL = [
    [26, 0], [26, 1], [25, 2], [25, 3], [26, 4], [26, 5], [27, 6], [26, 7], [26, 8], [25, 9], [25, 10], [26, 11], [26, 12], [27, 13], [26, 14], [26, 15], [25, 16], [25, 17], [26, 18], [26, 19], [27, 20],
    [24, 1], [23, 2], [24, 4], [24, 3], [27, 9], [24, 12], [24, 13], [27, 16], [24, 18], [24, 19],
    [4, 0], [4, 1], [5, 2], [5, 3], [3, 3], [22, 0], [22, 1], [21, 2], [7, 0], [8, 1],
  ];
  const CROWN = [
    [12, 0, ['.oo.']],
    [11, 1, ['.oao.', 'oYwYo', 'oYYyo', 'oaaao']],
  ];
  const SIDE_L = ['.oo.', 'oYwo', 'oYyo', 'oaao'];
  const SIDE_R = ['.oo.', 'owYo', 'oYyo', 'oaao'];
  const BAND = [[9, 4, ['oyyyyyyaao']], [7, 5, ['oyy']], [18, 5, ['aao']]];
  const CRYSTAL = ['..QQ..', '.QwcQ.', 'QwccCQ', 'QcCCqQ', 'QCCqqQ', '.QqqQ.', '..QQ..'];
  const LPAW3 = ['.oooo.', 'okpppo', 'okpppk', 'oppPPk', '.oPPPo', '..ooo.'];
  const RPAW3 = ['.oooo.', 'opppPo', 'kppPPo', 'kpPPPo', 'oPPPo.', '.ooo..'];
  const FEET3 = ['oppPo..........oppPo', 'okokko.........okoko'];
  // o: { eyes, mouth, lamps: on|bright|off, pulse (trace glow runs down a frame), twitch, tap, z, q, spark }
  function make3(o = {}) {
    const g = canvas(W3, H3);
    DULL.forEach(([x, y]) => px(g, x, y, (x + y) % 3 ? 'g' : 'r'));
    TRACE.forEach(([x, y, c]) => px(g, x, y, o.lamps === 'off' && c === 'Y' ? 'y' : c));
    if (o.pulse) { TRACE.forEach(([x, y, c]) => c === 'Y' && px(g, x, y, 'a')); [[2, 3], [1, 7], [2, 11], [1, 15], [2, 19], [10, 21]].forEach(([x, y]) => px(g, x, y, 'Y')); }
    if (o.spark) TRACE.forEach(([x, y, c]) => px(g, x, y, c === 'Y' ? 'w' : 'y'));
    fur(g, (x, y) => SP3[y] && x >= SP3[y][0] && x <= SP3[y][1], [0, 0, W3 - 1, H3 - 1], [13.5, 11, 10, 9]);
    BAND.forEach(([x, y, a]) => stamp(g, x, y, a));
    CROWN.forEach(([x, y, a]) => stamp(g, x, y, a));
    stamp(g, 6, 1, SIDE_L); stamp(g, 18, 1, SIDE_R);
    if (o.lamps === 'bright') { stamp(g, 12, 2, ['YwY', 'YYY']); stamp(g, 7, 2, ['wY', 'YY']); stamp(g, 19, 2, ['Yw', 'YY']); }
    if (o.lamps === 'off') { stamp(g, 12, 2, ['lLl', 'ldd']); stamp(g, 7, 2, ['Ll', 'ld']); stamp(g, 19, 2, ['lL', 'dd']); }
    const eyes = o.eyes || 'open';
    stamp(g, 8, eyes === 'up' ? 7 : 8, ['LLl......LLl']);
    if (eyes === 'open') stamp(g, 9, 9, ['we......we', 'ee......ee']);
    if (eyes === 'shut') stamp(g, 9, 10, ['ee......ee']);
    if (eyes === 'happy') stamp(g, 8, 9, ['.ee......ee.', 'e..e....e..e']);
    if (eyes === 'up') stamp(g, 9, 8, ['we......we', 'ee......ee']);
    px(g, 8, 11, 'p'); px(g, 19, 11, 'p');
    stamp(g, o.twitch ? 12 : 11, 11, ['.lppl.', 'lpPPpl', 'llppll', '.llll.']);
    if (o.twitch) px(g, 11, 12, 'b');
    const m = { open: ['ee'], shut: ['PP'] }[o.mouth];
    if (m) stamp(g, 13, 14, m);
    if (o.mouth === 'grin') stamp(g, 12, 14, ['ePPe']);
    [[9, 20], [18, 20], [10, 21], [17, 21], [8, 19], [19, 19]].forEach(([x, y]) => px(g, x, y, o.spark ? 'c' : 'C'));
    stamp(g, 11, 15, CRYSTAL);
    stamp(g, 6, 14, LPAW3); stamp(g, 16, 14 + (o.tap ? 1 : 0), RPAW3);
    if (o.spark) { stamp(g, 23, 6, SPARK); px(g, 4, 6, 'Y'); px(g, 23, 15, 'Y'); }
    if (o.z) { for (let y = o.z[1]; y < o.z[1] + 4; y++) for (let x = o.z[0]; x < o.z[0] + 4; x++) px(g, x, y, '.'); stamp(g, o.z[0], o.z[1], Z); }
    if (o.q) { for (let y = 0; y < 5; y++) for (let x = 23; x < 26; x++) px(g, x, y, '.'); stamp(g, 23, 0, QMARK); }
    return rows(g);
  }
  const s3 = {
    idle: make3(),
    idle2: make3({ pulse: true }),
    blink: make3({ eyes: 'shut' }),
    talk: make3({ mouth: 'open', lamps: 'bright' }),
    talk2: make3({ mouth: 'shut', pulse: true }),
    happy: make3({ eyes: 'happy', mouth: 'grin', lamps: 'bright' }),
    happy2: make3({ eyes: 'happy', mouth: 'grin', lamps: 'bright', spark: true }),
    think: make3({ eyes: 'up', lamps: 'bright', pulse: true, q: true }),
    fidget: make3({ twitch: true, tap: true }),
    sleep: make3({ eyes: 'shut', lamps: 'off', z: [23, 3] }),
    sleep2: make3({ eyes: 'shut', lamps: 'off', z: [23, 1] }),
  };
  const LOOP = [['idle', 6], ['idle2', 6], ['idle', 6], ['idle2', 6], ['blink', 2], ['idle', 6], ['fidget', 3], ['idle', 3],
    ['fidget', 3], ['idle', 6], ['idle2', 6], ['blink', 2], ['idle', 2], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 6]];

  PatchDex.evolve('moss', {
    habit: 'research',
    stages: [
      {
        name: 'Delvin',
        species: 'tunnelling mole',
        blurb: 'Delvin carries a pick but reaches for the map first. Every tunnel starts at the symptom and gets marked as it goes, so nothing is dug twice.',
        voice: 'read the map before you swing the pick.',
        evolve: 'The lamp got a strap and the paws got a map: you started gathering evidence before reaching for a fix.',
        palette: { M: '#eef1f7', m: '#b3bacb', n: '#6c7389', u: '#e3c99a', U: '#a8834f', x: '#e0564f' },
        sprites: s2,
        loop: LOOP,
      },
      {
        name: 'Rootwarden',
        species: 'deep-delver mole',
        blurb: 'Crowned in lanterns, it follows one glowing root past every dead end, frame by frame, down to the crystal at the bottom: the first thing that went wrong.',
        voice: 'trace it to the first frame. the fix lives where the cause does.',
        evolve: 'The map became a traced root: you now research the whole path to the first cause before you change a single line.',
        palette: { a: '#c48a2a', c: '#d4fff7', C: '#4fd8c8', q: '#1f8a96', Q: '#123f55' },
        sprites: s3,
        loop: LOOP,
      },
    ],
  });
})();
