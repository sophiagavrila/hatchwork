(() => {
  const idle = [
    '.ooo..........ooo.',
    'ohhboo......oobhho',
    'ohbbbbo....obbbbho',
    '.oDdbbboddobbbdDo.',
    '..ooooooddoooooo..',
    '..ooCCCCCBBBBBoo..',
    '.oCCCKCCCKBBBKBBo.',
    'oCCKCCCKBBBKBBBKKo',
    'oCCCCCBBBBBBBBBKKo',
    'oooooooooooooooooo',
    '..ohhhbbbbbbbbbo..',
    '.ohhhbbbbbbbbbbbo.',
    '.ohbbwebbbbwebddo.',
    '.obbbeebbbbeedddo.',
    '.obppbbbeebddppdo.',
    '..obbbbbbbddddDo..',
    '..obbbbbdddddDDo..',
    '...obbbddddDDDo...',
    '....ooddddDDoo....',
    '......oooooo......',
  ];

  const blink = [
    '.ooo..........ooo.',
    'ohhboo......oobhho',
    'ohbbbbo....obbbbho',
    '.oDdbbboddobbbdDo.',
    '..ooooooddoooooo..',
    '..ooCCCCCBBBBBoo..',
    '.oCCCKCCCKBBBKBBo.',
    'oCCKCCCKBBBKBBBKKo',
    'oCCCCCBBBBBBBBBKKo',
    'oooooooooooooooooo',
    '..ohhhbbbbbbbbbo..',
    '.ohhhbbbbbbbbbbbo.',
    '.ohbbbbbbbbbbbddo.',
    '.obbbeebbbbeedddo.',
    '.obppbbbeebddppdo.',
    '..obbbbbbbddddDo..',
    '..obbbbbdddddDDo..',
    '...obbbddddDDDo...',
    '....ooddddDDoo....',
    '......oooooo......',
  ];
  const talk = [
    '.ooo..........ooo.',
    'ohhboo......oobhho',
    'ohbbbbo....obbbbho',
    '.oDdbbboddobbbdDo.',
    '..ooooooddoooooo..',
    '..ooCCCCCBBBBBoo..',
    '.oCCCKCCCKBBBKBBo.',
    'oCCKCCCKBBBKBBBKKo',
    'oCCCCCBBBBBBBBBKKo',
    'oooooooooooooooooo',
    '..ohhhbbbbbbbbbo..',
    '.ohhhbbbbbbbbbbbo.',
    '.ohbbwebbbbwebddo.',
    '.obbbeebbbbeedddo.',
    '.obppbbbeebddppdo.',
    '..obbbbbeeddddDo..',
    '..obbbbbdddddDDo..',
    '...obbbddddDDDo...',
    '....ooddddDDoo....',
    '......oooooo......',
  ];
  const happy = [
    '.ooo..........ooo.',
    'ohhboo......oobhho',
    'ohbbbbo....obbbbho',
    '.oDdbbboddobbbdDo.',
    '..ooooooddoooooo..',
    '..ooCCCCCBBBBBoo..',
    '.oCCCKCCCKBBBKBBo.',
    'oCCKCCCKBBBKBBBKKo',
    'oCCCCCBBBBBBBBBKKo',
    'oooooooooooooooooo',
    '..ohhhbbbbbbbbbo..',
    '.ohhhbbbbbbbbbbbo.',
    '.ohbbeebbbbeebddo.',
    '.obbebbebbebbeddo.',
    '.obppbbbeebddppdo.',
    '..obbbbbppddddDo..',
    '..obbbbbdddddDDo..',
    '...obbbddddDDDo...',
    '....ooddddDDoo....',
    '......oooooo......',
  ];
  const happy2 = [
    '..oooo......oooo..',
    '.ohhhbo....obhhho.',
    'ohbbbbbo..obbbbbho',
    '.oDDdddoddodddDDo.',
    '..ooooooddoooooo..',
    '..ooCCCCCBBBBBoo..',
    '.oCCCKCCCKBBBKBBo.',
    'oCCKCCCKBBBKBBBKKo',
    'oCCCCCBBBBBBBBBKKo',
    'oooooooooooooooooo',
    '..ohhhbbbbbbbbbo..',
    '.ohhhbbbbbbbbbbbo.',
    '.ohbbeebbbbeebddo.',
    '.obbebbebbebbeddo.',
    '.obppbbbeebddppdo.',
    '..obbbbbppddddDo..',
    '..obbbbbdddddDDo..',
    '...obbbddddDDDo...',
    '....ooddddDDoo....',
    '......oooooo......',
  ];
  const sleep = [
    '..................',
    '...oooo....oooo...',
    '.oohhhbo..obhhhoo.',
    'ohbbbddoddoddbbbho',
    'oDDoooooddoooooDDo',
    'ooooCCCCCBBBBBoooo',
    '.oCCCKCCCKBBBKBBo.',
    'oCCKCCCKBBBKBBBKKo',
    'oCCCCCBBBBBBBBBKKo',
    'oooooooooooooooooo',
    '..ohhhbbbbbbbbbo..',
    '.ohhhbbbbbbbbbbbo.',
    '.ohbbbbbbbbbbbddo.',
    '.obbbeebbbbeedddo.',
    '.obppbbbddbddppdo.',
    '..obbbbbbbddddDo..',
    '..obbbbbdddddDDo..',
    '...obbbddddDDDo...',
    '....ooddddDDoo....',
    '......oooooo......',
  ];
  const sleep2 = [
    '..................',
    '...oooo....oooo...',
    '.oohhhbo..obhhhoo.',
    'ohbbbddoddoddbbbho',
    'oDDoooooddoooooDDo',
    'ooooCCCCCBBBBBoooo',
    '.oCCCKCCCKBBBKBBo.',
    'oCCKCCCKBBBKBBBKKo',
    'oCCCCCBBBBBBBBBKKo',
    'oooooooooooooooooo',
    '..ohhhbbbbbbbbbo..',
    '.ohhhbbbbbbbbbbbo.',
    '.ohbbbbbbbbbbbddo.',
    '.obbbeebbbbeedddo.',
    '.obppbbbeebddppdo.',
    '..obbbbbbbddddDo..',
    '..obbbbbdddddDDo..',
    '...obbbddddDDDo...',
    '....ooddddDDoo....',
    '......oooooo......',
  ];
  const think = [
    '.ooo........oooo..',
    'ohhboo.....obhhho.',
    'ohbbbbo...obbbbbho',
    '.oDdbbboddodddDDo.',
    '..ooooooddoooooo..',
    '..ooCCCCCBBBBBoo..',
    '.oCCCKCCCKBBBKBBo.',
    'oCCKCCCKBBBKBBBKKo',
    'oCCCCCBBBBBBBBBKKo',
    'oooooooooooooooooo',
    '..ohhhbbbbbbbbbo..',
    '.ohhhbewbbbbewbbo.',
    '.ohbbbeebbbbeeddo.',
    '.obbbbbbbbbbbdddo.',
    '.obppbbbbeeddppdo.',
    '..obbbbbbbddddDo..',
    '..obbbbbdddddDDo..',
    '...obbbddddDDDo...',
    '....ooddddDDoo....',
    '......oooooo......',
  ];
  const fidget = [
    '..oooo........ooo.',
    '.ohhhbo.....oobhho',
    'ohbbbbbo...obbbbho',
    '.oDDdddoddobbbdDo.',
    '..ooooooddoooooo..',
    '..ooCCCCCBBBBBoo..',
    '.oCCCKCCCKBBBKBBo.',
    'oCCKCCCKBBBKBBBKKo',
    'oCCCCCBBBBBBBBBKKo',
    'oooooooooooooooooo',
    '..ohhhbbbbbbbbbo..',
    '.ohhhbbbbbbbbbbbo.',
    '.ohbbwebbbbwebddo.',
    '.obbbeebbbbeedddo.',
    '.obppbbbeebddppdo.',
    '..obbbbbbbddddDo..',
    '..obbbbbdddddDDo..',
    '...obbbddddDDDo...',
    '....ooddddDDoo....',
    '......oooooo......',
  ];
  const fidget2 = [
    '.ooo........oooo..',
    'ohhboo.....obhhho.',
    'ohbbbbo...obbbbbho',
    '.oDdbbboddodddDDo.',
    '..ooooooddoooooo..',
    '..ooCCCCCBBBBBoo..',
    '.oCCCKCCCKBBBKBBo.',
    'oCCKCCCKBBBKBBBKKo',
    'oCCCCCBBBBBBBBBKKo',
    'oooooooooooooooooo',
    '..ohhhbbbbbbbbbo..',
    '.ohhhbbbbbbbbbbbo.',
    '.ohbbwebbbbwebddo.',
    '.obbbeebbbbeedddo.',
    '.obppbbbeebddppdo.',
    '..obbbbbbbddddDo..',
    '..obbbbbdddddDDo..',
    '...obbbddddDDDo...',
    '....ooddddDDoo....',
    '......oooooo......',
  ];

  // Entrance pieces: the sprout grows in stages (bottoms sit on row 18, stem on x 13-14).
  const SPROUT = [
    ['.oo.', 'obdo', 'obdo'],
    ['oo....oo', 'oho..oho', '.obddbo.', '..oddo..', '..oddo..'],
    ['.ooo......ooo.', 'ohhboo..oobhho', '.obbbbddbbbbo.', '..ooooddoooo..', '.....oddo.....', '.....oddo.....'],
    [...idle.slice(0, 4), '.......oddo.......', '.......oddo.......'],
  ];
  const SPROUT_X = [12, 10, 7, 5];
  // Soil mound across the bottom; `bump` raises a hump in the middle, `spread` shrinks it to two side piles.
  function soil(k, g, o = {}) {
    const rows = [[19, 5, 22], [20, 3, 24], [21, 1, 26]];
    if (o.bump) rows.unshift([18, 14 - o.bump, 13 + o.bump]);
    rows.forEach(([y, x0, x1], j) => {
      if (o.only && y < o.only) return;
      for (let x = x0; x <= x1; x++) {
        if (o.spread && x > 6 + j * 2 && x < 21 - j * 2) continue;
        const top = j === 0 || (o.bump && j === 1 && (x < 14 - o.bump || x > 13 + o.bump));
        const edge = x === x0 || x === x1;
        k.px(g, x, y, edge ? 'q' : top ? 's' : (x * 7 + y * 3) % 9 === 0 ? 's' : 'S');
      }
    });
    return g;
  }
  const dirt = (k, g, pts) => { pts.forEach(([x, y, c]) => k.px(g, x, y, c || 's')); return g; };

  PatchDex.register({
    id: 'sprig',
    name: 'Sprig',
    species: 'acorn-capped pea sprite',
    rarity: 'common',
    blurb: 'Grows one leaf at a time and is never in a hurry.',
    coaching: 'Decomposition: break the work into small steps and finish them in order.',
    voice: 'smaller step. do the first piece, then the next.',
    hatch: 'The egg sinks into soil; a sprout pokes up, grows, and Sprig pops out.',
    palette: {
      o: '#2c3a1f', h: '#ecf8a8', b: '#b9db55', d: '#86ae36', D: '#557a2e',
      C: '#dca46a', B: '#a86b3c', K: '#6b3f28',
      e: '#1e1a16', w: '#ffffff', p: '#f4a28c',
      s: '#8c6239', S: '#5c3d26', q: '#3b2a1c',
    },
    sprites: { idle, blink, talk, happy, happy2, sleep, sleep2, think, fidget, fidget2 },
    loop: [['idle', 26], ['blink', 2], ['idle', 18], ['fidget', 3], ['fidget2', 3], ['fidget', 3], ['idle', 14], ['blink', 2], ['idle', 10], ['think', 12], ['idle', 8]],
    entrance(k) {
      const buried = (dy, bump) => soil(k, k.egg(k.EGG_C2, 0, dy), { bump });
      const sprout = (n, o = {}) => {
        const g = soil(k, k.blank(), { bump: o.bump });
        const rows = SPROUT[n];
        return k.stamp(g, rows, SPROUT_X[n] + (o.dx || 0), 19 - rows.length - (o.lift || 0), o.sway ? { rowDx: j => (j < 4 ? o.sway : 0) } : {});
      };
      const pop = (dy, front, pts) => {
        const g = front ? k.at('idle', 0, dy) : soil(k, k.blank(), { spread: true });
        if (front) soil(k, g); else k.over(g, 'idle', 0, dy);
        return dirt(k, g, pts || []);
      };
      return [
        ...k.eggIntro(),
        // Soil gathers, the egg sinks out of sight.
        k.f(soil(k, k.egg(k.EGG_C2), { only: 21 }), 120, { note: 'soil' }),
        k.f(soil(k, k.egg(k.EGG_C2), { only: 20 }), 120),
        k.f(buried(0), 160),
        k.f(buried(2), 140), k.f(buried(5), 120), k.f(buried(8), 110), k.f(buried(11), 110),
        k.f(soil(k, k.blank(), { bump: 3 }), 380, { note: 'buried' }),
        // A sprout, one step at a time.
        k.f(sprout(0, { bump: 2 }), 260, { note: 'tip' }),
        k.f(sprout(1, { bump: 2 }), 220),
        k.f(sprout(2, { bump: 2 }), 200),
        k.f(sprout(3, { bump: 2 }), 360, { note: 'sprout' }),
        k.f(sprout(3, { bump: 3, sway: -1 }), 90), k.f(sprout(3, { bump: 3, sway: 1 }), 90),
        k.f(sprout(3, { bump: 4, lift: 1 }), 120),
        // Pop out of the dirt.
        k.f(pop(10, true, [[11, 17], [16, 17]]), 90, { note: 'pop' }),
        k.f(pop(5, true, [[8, 14], [19, 13], [10, 16, 'S'], [18, 16, 'S']]), 80),
        k.f(pop(-2, false, [[6, 10], [21, 9], [4, 13, 'S'], [23, 12, 'S']]), 140),
        k.f(pop(1, false, [[5, 12], [22, 11]]), 100),
        k.f(pop(0, false), 160, { note: 'land' }),
        k.f(k.over(soil(k, k.blank(), { spread: true }), 'blink'), 120),
        k.f(k.over(soil(k, k.blank(), { spread: true }), 'happy'), 220, { note: 'happy' }),
        k.f(k.over(soil(k, k.blank(), { spread: true, only: 20 }), 'happy2', 0, -1), 220),
        k.f(k.over(soil(k, k.blank(), { spread: true, only: 21 }), 'happy'), 220),
        k.f(k.at('idle'), 500),
      ];
    },
  });
})();
