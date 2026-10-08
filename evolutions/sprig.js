// Sprig, grown: the cap leaves become numbered steps (II), then a whole spiral stair of leaves with fruit milestones (III).
(function () {
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i]));
  const put = (base, x, y, rows) => base.map((r, j) => {
    const s = rows[j - y];
    if (s === undefined) return r;
    const a = [...r];
    [...s].forEach((c, i) => { if (c !== ' ' && a[x + i] !== undefined) a[x + i] = c; });
    return a.join('');
  });

  // ---- II ----
  const idle2a = [
    '......oo...oo.......ooo.',
    '.....ohbooohbo....oobhho',
    '.ooo.obbdddhdooooobbbbho',
    'ohhbooooooohddbDbDbbdDo.',
    'ohbbbbooooohdooooooooo..',
    '.oDdbbDbbbdhdo..........',
    '..ooooooooohdooooooo....',
    '...oCCCKCCCKBBBKBBKKo...',
    '..oCCKCCCKCCBBKBBBKKKo..',
    '..oCCCCCCCCBBBBBBBBKKo..',
    '..oooooooooooooooooooo..',
    '.....ohhhhbbbbbbbbo.....',
    '....ohhhbbbbbbbbbbdo....',
    '...ohbbwebbbbbbwebddo...',
    '.ooobbbeebbbbbbeedddooo.',
    'ohbobppbbbbeebbbbppdobdo',
    '.ooobbbbbbbbbbbbddddooo.',
    '....obbbbbbbbbddddDo....',
    '.....oobbdddddDDDoo.....',
    '.......oooooooooo.......',
  ];

  // ---- III ----
  const idle3a = [
    '........oo...YY.............',
    '.......ohbo.yYYY............',
    '.......obbddowyo.......ooo..',
    '........ooooohDo.....oodbbo.',
    '..ooo.......oDho.ooooddddbo.',
    '.ohhboo.....ohDoDddddddDDo..',
    '.ohbbbboooo.oDho.ooooooooD..',
    '.DoDdbbbbbbdohDo........wr..',
    'wr.oooooooooodDooooooo..rR..',
    'rR...oCCCKCCCKBBBKBBKKo.....',
    '....oCCKCCCKCCBBKBBBKKKo....',
    '....oCCCCCCCCBBBBBBBBKKo....',
    '....oooooooooooooooooooo....',
    '.......ohhhhbbbbbbbbo.......',
    '......ohhhbbbbbbbbbbdo......',
    '.ooo.ohbbwebbbbbbwebddo.ooo.',
    'ohhboobbbeebbbbbbeedddoobhho',
    'obddoobppbbbbeebbbbppdooddbo',
    '.ooo.obbbbbbbbbbbbddddo.ooo.',
    '......obbbbbbbbbddddDo......',
    '.......oobbdddddDDDoo.......',
    '.........oooooooooo.........',
  ];

  // Face/limb layout per form; moods are derived from idle so the two forms stay in step.
  function moods(idle, f) {
    const [L, R] = f.eyes, y = f.ey, [mx, my] = f.mouth;
    const eyes = (g, a, b) => put(put(g, L + f.dx, y + f.dy, a), R + f.dx, y + f.dy, b || a);
    const shut = g => put(put(g, L, y, ['bb']), R, y, ['bb']);
    const arcs = g => put(put(g, L - 1, y, [' ee ', 'ebbe']), R - 1, y, [' ee ', 'ebbe']);
    const hands = (g, which) => {
      let o = g;
      which.forEach(k => { o = put(o, ...f.handClear[k]); o = put(o, ...f.handUp[k]); });
      return o;
    };
    const dots = (g, pts) => pts.reduce((o, [x, yy, c]) => put(o, x, yy, [c]), g);
    const blink = shut(idle);
    const asleep = put(put(put(shut(idle), mx, my, ['dd']), ...f.handDown.l), ...f.handDown.r);
    const happy = put(arcs(idle), mx, my + 1, ['pp']);
    const think = dots(put(eyes(put(put(idle, L, y, ['bb', 'bb']), R, y, ['bb', 'bb']), ['ew', 'ee']), mx, my, ['bee']), f.think);
    return {
      idle, blink,
      talk: put(idle, mx, my + 1, ['ee']),
      talk2: put(idle, mx, my + 1, ['pp']),
      happy,
      happy2: dots(hands(happy, ['l', 'r']), f.sparkle),
      think,
      sleep: asleep,
      sleep2: dots(put(asleep, mx, my, ['ee']), f.z || []),
      fidget: hands(idle, ['l']),
      ...(f.idle2 ? { idle2: dots(idle, f.idle2) } : {}),
    };
  }
  const LOOP = [['idle', 30], ['blink', 2], ['idle', 20], ['fidget', 4], ['idle', 16], ['blink', 2], ['idle', 12], ['think', 12], ['idle', 8]];

  const sprites2 = moods(idle2a, {
    eyes: [7, 15], ey: 13, dx: 1, dy: -1, mouth: [11, 15],
    handClear: { l: [0, 14, ['...', '... ', '...']], r: [21, 14, ['..', ' ...', '..']] },
    handUp: { l: [0, 11, ['.ooo', 'ohbo', '.oo']], r: [20, 11, ['ooo', 'obdo', 'ooo']] },
    think: [[22, 8, 'h'], [23, 6, 'w']],
    handDown: { l: [0, 14, ['... ', '.ooo', 'ohbo', '.ooo']], r: [20, 14, [' ..', 'ooo.', 'obdo', 'ooo']] },
    sparkle: [[1, 8, 'w'], [22, 8, 'w']],
  });

  const sprites3 = moods(idle3a, {
    eyes: [9, 17], ey: 15, dx: 1, dy: -1, mouth: [13, 17],
    handClear: { l: [0, 15, ['....', '.....', '.....', '....']], r: [23, 15, [' ....', '.....', '.....', ' ....']] },
    handUp: { l: [1, 12, [' ooo', 'ohhbo', 'obddo', ' ooo']], r: [22, 12, ['ooo ', 'obhho', 'oddbo', 'ooo ']] },
    think: [[20, 3, 'h'], [21, 1, 'w']],
    handDown: { l: [0, 15, ['.....', '.ooo.', 'ohhbo', 'obddo', '.ooo.']], r: [23, 15, ['.....', '.ooo.', 'obhho', 'oddbo', '.ooo.']] },
    sparkle: [[1, 11, 'w'], [26, 10, 'w']],
    z: [[17, 0, 'wwww'], [19, 1, 'w'], [18, 2, 'w'], [17, 3, 'wwww']],
    idle2: [[13, 0, 'w']],
  });

  PatchDex.evolve('sprig', {
    habit: 'planning',
    stages: [
      {
        name: 'Sprigadier',
        species: 'stepleaf sapling',
        blurb: 'Sprig grew a stalk, and each leaf on it is a numbered step. It never opens a new leaf until the one below has finished growing.',
        voice: 'write the steps down first. then do step one, and only step one.',
        evolve: 'The two cap leaves became a short stair of numbered leaves: you started writing the plan down before touching the work.',
        palette: {},
        sprites: sprites2,
        loop: LOOP,
      },
      {
        name: 'Stairwood',
        species: 'spiral beanstalk spirit',
        blurb: 'A stair of leaves spirals up its twisted stalk to a golden acorn. A red berry hangs at each landing to mark a milestone it has already reached.',
        voice: 'mark the milestones. check each landing before the next climb.',
        evolve: 'The steps wound into a full beanstalk with fruit at each landing: your plans now carry checkpoints you verify on the way up.',
        palette: { r: '#ef5f4f', R: '#a8323e', y: '#ffd65c', Y: '#e0962a' },
        sprites: sprites3,
        loop: [...LOOP.slice(0, 5), ['idle2', 6], ...LOOP.slice(5)],
      },
    ],
  });
})();
