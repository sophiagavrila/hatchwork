// Fold's evolutions — II: a bigger crane folded twice over, a second wing layer under the first, crease lines printed on the paper.
// III: a thousand-fold crane, three blades per wing and a fanned paper tail, with a small vermilion crane flying escort.
(function () {
  // put(rows, [x, y, art]...): stamp art onto rows. ' ' and '.' keep the pixel underneath; '_' clears it.
  const put = (rows, ...stamps) => {
    const g = rows.map(r => [...r]);
    stamps.forEach(([x, y, art]) => art.forEach((r, j) => [...r].forEach((c, i) => {
      if (c === ' ' || c === '.' || !g[y + j] || x + i < 0 || x + i >= g[y + j].length) return;
      g[y + j][x + i] = c === '_' ? '.' : c;
    })));
    return g.map(r => r.join(''));
  };
  const blank = (w, h) => Array(h).fill('.'.repeat(w));

  // Parts are drawn as left halves in region letters, then mirrored. The lit (left) side and the
  // shadow (right) side shade each region differently, same as the hatchling's one folded sheet.
  const LIT = { W: 'l', E: 'b', H: 'l', U: 's', V: 'c', B: 'b', S: 's', K: 's', T: 'b', P: 'c' };
  const SHADE = { W: 's', E: 'c', H: 'b', U: 'c', V: 'd', B: 's', S: 'c', K: 'c', T: 's', P: 'd' };
  const paint = (s, map) => [...s].map(c => map[c] || c).join('');
  const left = half => half.map(r => paint(r, LIT));
  const right = half => half.map(r => paint([...r].reverse().join(''), SHADE));
  // part(half, y0) -> { l, r, y0 }: a mirrored pair that can be posed per side.
  const part = (half, y0) => ({ l: left(half), r: right(half), y0 });
  // compose(W, H, [[part, dyLeft, dyRight]...]): back to front.
  const compose = (W, H, layers) => {
    let g = blank(W, H);
    layers.forEach(([p, dl, dr = dl]) => {
      const hw = p.l[0].length;
      g = put(g, [0, p.y0 + dl, p.l], [W - hw, p.y0 + dr, p.r]);
    });
    return g;
  };
  const mirrorArt = art => art.map(r => [...r].reverse().join(''));
  // Mouths, as [dx, art] from the mouth anchor. 'open' and 'yap' alternate when talking.
  const MOUTH = { shut: [0, ['ee']], open: [0, ['ee', 'rr']], yap: [0, ['rr']], smile: [-1, ['e..e', '.ee.']], none: [0, []] };

  // ───────────────────────── II: Pleatwing (24x21) ─────────────────────────
  const W2 = 24, H2 = 21;
  const BODY2 = part([
    '...........o',
    '..........or',
    '..........oH',
    '.........oHH',
    '.........oHH',
    '........oHHH',
    '........oHHH',
    '.......oHHHH',
    '.......oHHHH',
    '......oHHHHH',
    '......oHHHHH',
    '......oHHHHH',
    '......oHHHHH',
    '.....ooHHHHH',
    '......oooooo',
    '.......oKKKK',
    '........oKKK',
    '.........oKK',
    '..........oK',
    '...........o',
  ], 0);
  const MAIN2 = part([
    'oo........',
    'oWo.......',
    'oEWo......',
    'oEWWo.....',
    '.oEWWo....',
    '..oEWWo...',
    '...oEWWo..',
    '....oEWWo.',
    '.....oooo.',
  ], 1);
  const UNDER2 = part([
    'oo.......',
    'oUoo.....',
    'oVUUoo...',
    'ooVVUUoo.',
    '..ooVVVVo',
    '....ooooo',
  ], 8);
  // Crease-pattern print: dashed valley folds (blue) down each main wing, a mountain fold (red) down the keel.
  const VALLEY2 = [[2, 4], [4, 6], [6, 8]];
  const crane2 = ({ b = 0, ml = 0, mr = ml, ul = 0, ur = ul } = {}) => {
    let g = compose(W2, H2, [[UNDER2, ul, ur], [MAIN2, ml, mr], [BODY2, b]]);
    g = put(g, ...VALLEY2.map(([x, y]) => [x, y + ml, ['v']]), ...VALLEY2.map(([x, y]) => [W2 - 1 - x, y + mr, ['v']]));
    return put(g, [11, 15 + b, ['x', '.x', 'x', '.x']]);
  };
  // Faces sit on the body; eyes are 2x3 at x8 / x14, y9. Mouth at x11, y12. Hanko cheek at x15, y12.
  const EYE2 = {
    open: ['we', 'ee', 'ee'],
    blink: ['ll', 'll', 'ee'],
    up: ['ew', 'ee', 'ee'],
  };
  const face2 = (g, { eyes = 'open', dx = 0, b = 0, mouth = 'shut' } = {}) => {
    const y = 9 + b;
    let out = g;
    if (eyes === 'happy') out = put(out, [7, y, ['.ee.', 'e..e']], [13, y, ['.ee.', 'e..e']]);
    else if (eyes === 'sleep') out = put(out, [7, y + 1, ['e..e', '.ee.']], [13, y + 1, ['e..e', '.ee.']]);
    else out = put(out, [8 + dx, y, EYE2[eyes]], [14 + dx, y, eyes === 'blink' ? ['bb', 'bb', 'ee'] : EYE2[eyes]]);
    const [mx, m] = MOUTH[mouth];
    out = put(out, [11 + mx, y + 3, m]);
    return put(out, [15, y + 3, ['rr', 'rR']]);
  };
  const Q2 = ['sss', '..s', '.ss', '...', '.s.'];
  const Z2 = ['sss', '..s', '.s.', 'sss'];
  const Z2b = ['ssss', '...s', '..s.', '.s..', 'ssss'];
  const sprites2 = {
    idle: face2(crane2()),
    idle2: face2(crane2({ b: 1, ul: 1 }), { b: 1 }),
    blink: face2(crane2(), { eyes: 'blink' }),
    talk: face2(crane2(), { mouth: 'open' }),
    talk2: face2(crane2({ b: 1, ul: 1 }), { b: 1, mouth: 'yap' }),
    happy: face2(crane2({ ml: -1, ul: -2 }), { eyes: 'happy', mouth: 'smile' }),
    happy2: face2(crane2({ b: 1, ml: -1, ul: -3 }), { eyes: 'happy', b: 1, mouth: 'smile' }),
    think: put(face2(crane2(), { eyes: 'up', mouth: 'none' }), [4, 0, Q2]),
    sleep: put(face2(crane2({ b: 1, ml: 2, ul: 2 }), { eyes: 'sleep', b: 1, mouth: 'none' }), [19, 0, Z2]),
    sleep2: put(face2(crane2({ b: 1, ml: 2, ul: 2 }), { eyes: 'sleep', b: 1, mouth: 'none' }), [18, 0, Z2b]),
    // Folds a wing down to check a crease, then the other one.
    fidget: face2(crane2({ mr: 3, ur: 2 }), { eyes: 'up', mouth: 'none' }),
    fidget2: face2(crane2({ ml: 3, ul: 2 }), { mouth: 'none' }),
  };

  // ───────────────────────── III: Millefold (28x22) ─────────────────────────
  const W3 = 28, H3 = 22;
  const BODY3 = part([
    '.............o',
    '............or',
    '............oH',
    '...........oHH',
    '...........oHH',
    '..........oHHH',
    '..........oHHH',
    '.........oHHHH',
    '.........oHHHH',
    '........oHHHHH',
    '.......oHHHHHH',
    '.......oHHHHHH',
    '.......oHHHHHH',
    '.......oHHHHHH',
    '.......oHHHHHH',
    '.......oHHHHHH',
    '.......ooooooo',
    '..........oKKK',
    '..........oKKK',
    '...........oKK',
    '............oK',
    '.............o',
  ], 0);
  const BLADE1 = part([
    'oo.......',
    'oWo......',
    'oEWo.....',
    '.oEWo....',
    '.oEWWo...',
    '..oEWWo..',
    '...oEWWo.',
    '....oEWWo',
    '.....oEWo',
    '......ooo',
  ], 1);
  const BLADE2 = part([
    'oo......',
    'oUoo....',
    'oVUUoo..',
    '.oVVUUUo',
    '..oooVVo',
    '.....ooo',
  ], 8);
  const BLADE3 = part([
    'oooo....',
    'oBBBoooo',
    '.oSSBBBo',
    '..ooSSSo',
    '....oooo',
  ], 12);
  const TAIL3 = part([
    '...ooooooo',
    '..oTPTPTPo',
    '.oTPTPTPo.',
    'oTPTPTPo..',
    'oTPTPoo...',
    'ooo.......',
  ], 16);
  const VALLEY3 = [[2, 4], [4, 6], [6, 8]];
  const crane3 = ({ a = 0, al = a, ar = a, m = 0, ml = m, mr = m, n = 0 } = {}) => {
    let g = compose(W3, H3, [[TAIL3, 0], [BLADE3, n], [BLADE2, ml, mr], [BLADE1, al, ar], [BODY3, 0]]);
    g = put(g, ...VALLEY3.map(([x, y]) => [x, y + al, ['v']]), ...VALLEY3.map(([x, y]) => [W3 - 1 - x, y + ar, ['v']]));
    // Faceted shoulders and hips: extra fold planes on each side of the body.
    g = put(g, [9, 9, ['b']], [8, 10, ['bb', 'b']], [18, 9, ['s']], [18, 10, ['ss', '.s']], [8, 14, ['b', 'bb']], [19, 15, ['s']]);
    return put(g, [13, 17, ['x', '.x', 'x']]);
  };
  // Eyes 2x3 at x10 / x16, y11. Mouth at x13, y14. Hanko cheek at x17, y14.
  const face3 = (g, { eyes = 'open', dx = 0, mouth = 'shut' } = {}) => {
    let out = g;
    if (eyes === 'happy') out = put(out, [9, 11, ['.ee.', 'e..e']], [15, 11, ['.ee.', 'e..e']]);
    else if (eyes === 'sleep') out = put(out, [9, 12, ['e..e', '.ee.']], [15, 12, ['e..e', '.ee.']]);
    else if (eyes === 'blink') out = put(out, [10, 11, ['ll', 'll', 'ee']], [16, 11, ['bb', 'bb', 'ee']]);
    else {
      const e = eyes === 'up' ? ['ew', 'ee', 'ee'] : ['we', 'ee', 'ee'];
      out = put(out, [10 + dx, 11, e], [16 + dx, 11, e]);
    }
    const [mx, m] = MOUTH[mouth];
    out = put(out, [13 + mx, 14, m]);
    return put(out, [17, 14, ['rr', 'rR']]);
  };
  // The escort: a small vermilion crane in profile, facing Fold. 8x5.
  const ESCORT = {
    up: ['....xR..', 'r..xrR..', '.r.xrR.R', '..rrrRR.', '...RRR..'],
    rest: ['r.......', '.r....R.', '.rrxxRR.', '..rRRR..', '...RR...'],
  };
  const escortR = (g, pose, x = 17, y = 0) => put(g, [x, y, ESCORT[pose]]);
  const escortL = (g, pose, x = 3, y = 0) => put(g, [x, y, mirrorArt(ESCORT[pose])]);
  const Q3 = ['sss', '..s', '.ss', '...', '.s.'];
  const Z3 = ['sss', '..s', '.s.', 'sss'];
  const Z3b = ['ssss', '...s', '..s.', '.s..', 'ssss'];
  const sprites3 = {
    idle: escortR(face3(crane3()), 'up'),
    idle2: escortR(face3(crane3({ m: 1, n: 1 })), 'up', 17, 1),
    blink: escortR(face3(crane3(), { eyes: 'blink' }), 'up'),
    talk: escortR(face3(crane3(), { mouth: 'open' }), 'up'),
    talk2: escortR(face3(crane3({ m: 1, n: 1 }), { mouth: 'yap' }), 'up', 17, 1),
    happy: escortR(face3(crane3({ a: -1, m: -1, n: -2 }), { eyes: 'happy', mouth: 'smile' }), 'up'),
    happy2: escortR(face3(crane3({ m: -2, n: -1 }), { eyes: 'happy', mouth: 'smile' }), 'up', 17, 1),
    think: put(escortR(face3(crane3(), { eyes: 'up', mouth: 'none' }), 'rest'), [5, 0, Q3]),
    sleep: put(escortR(face3(crane3({ a: 2, m: 1, n: 1 }), { eyes: 'sleep', mouth: 'none' }), 'rest'), [5, 0, Z3]),
    sleep2: put(escortR(face3(crane3({ a: 2, m: 1, n: 1 }), { eyes: 'sleep', mouth: 'none' }), 'rest'), [4, 0, Z3b]),
    // The escort crosses over to the other side and Fold watches it go.
    fidget: escortL(face3(crane3({ al: 1 }), { mouth: 'none' }), 'up'),
    fidget2: escortL(face3(crane3({ al: 2, ml: 1 }), { mouth: 'none' }), 'up', 3, 1),
  };


  PatchDex.evolve('fold', {
    habit: 'planning',
    stages: [
      {
        name: 'Pleatwing',
        species: 'crease-pattern crane',
        blurb: 'Folded from a bigger sheet, with a second wing tucked under the first. The crease pattern is printed right on the paper, dashed and labeled, before a single fold is made.',
        voice: 'draw the crease pattern first. then fold.',
        evolve: 'A second wing layer and a printed crease pattern, because you kept writing the plan down before you touched the code.',
        palette: { v: '#6f8fd8', x: '#f08a78' },
        sprites: sprites2,
        loop: [['idle', 20], ['blink', 2], ['idle', 8], ['idle2', 3], ['idle', 12], ['fidget', 8], ['idle', 4], ['fidget2', 6],
          ['idle', 12], ['blink', 2], ['idle', 6], ['idle2', 3], ['idle', 8]],
      },
      {
        name: 'Millefold',
        species: 'thousand-fold crane',
        blurb: 'One sheet, a thousand folds, and not one of them improvised. Three blades to a wing, a fanned paper tail, and a small vermilion crane that flies ahead to scout the next step.',
        voice: 'a thousand folds, one plan. what\'s step one?',
        evolve: 'The folds multiplied and a little crane flew out of the plan, because planning first stopped being a step and became how you start.',
        palette: { v: '#6f8fd8', x: '#f08a78' },
        sprites: sprites3,
        loop: [['idle', 18], ['idle2', 3], ['idle', 6], ['blink', 2], ['idle', 10], ['idle2', 3], ['idle', 8], ['fidget', 6], ['fidget2', 3],
          ['fidget', 6], ['idle', 10], ['blink', 2], ['idle', 6], ['idle2', 3], ['idle', 6]],
      },
    ],
  });
})();
