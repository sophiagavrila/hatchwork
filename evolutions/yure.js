// Yure evolutions — II Yurekko (a grown namazu carrying signal flags on its back),
// III Shizume (the grand namazu, keystone at rest, a staged row of rollout flags along its back).
// Bodies are generated from row spans and shaded like a sumi-e wash: dark ink on the back,
// paler toward the head, cream belly. Keystone, whiskers, flags and faces are stamped on.
(function () {
  const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
  const rows = g => g.map(r => r.join(''));
  const set = (g, x, y, c) => { if (g[y] && x >= 0 && x < g[y].length) g[y][x] = c; };
  const stamp = (g, art, x, y) => art.forEach((r, j) => [...r].forEach((c, i) => { if (c !== ' ') set(g, x + i, y + j, c); }));

  // Fill a span mask: outline K, cream belly below the mouth line, ink wash elsewhere.
  function fish(g, spans, { dy = 0, mouthRow, mouthEnd, head, finRows = [] }) {
    const on = (x, y) => spans[y] && x >= spans[y][0] && x <= spans[y][1];
    const ys = Object.keys(spans).map(Number), top = Math.min(...ys), bot = Math.max(...ys);
    for (const y of ys) {
      const [x0, x1] = spans[y];
      for (let x = x0; x <= x1; x++) {
        let c;
        if (!on(x - 1, y) || !on(x + 1, y) || !on(x, y - 1) || !on(x, y + 1)) c = 'K';
        else if (finRows.includes(y)) c = y % 2 ? 'g' : 'G';
        else if (y === mouthRow && x <= mouthEnd) c = 'K';
        else if (y > mouthRow && x <= mouthEnd + 8) c = on(x, y + 2) ? 'P' : 'p';
        else {
          const yy = (y - top) / Math.max(1, mouthRow - top), xx = Math.max(0, (x - head) / 12);
          const v = 0.5 * (1 - yy) + 0.4 * xx;
          c = v < 0.3 ? 'L' : v < 0.52 ? 'g' : v < 0.74 ? 'G' : 'I';
        }
        set(g, x, y + dy, c);
      }
    }
  }
  const pts = (g, list, c, dx = 0, dy = 0) => list.forEach(([x, y]) => set(g, x + dx, y + dy, c));

  // ── II · Yurekko ─────────────────────────────────────────────────────────────
  const W2 = 25, H2 = 21;
  const BODY2 = { 7: [7, 18], 8: [5, 20], 9: [4, 20], 10: [3, 20], 11: [3, 20], 12: [3, 20], 13: [3, 20], 14: [3, 19], 15: [4, 18], 16: [5, 17], 17: [7, 15] };
  // The tail fin, at rest and mid-flick (upper lobe raised).
  const TAIL2 = [
    { 6: [22, 23], 7: [21, 24], 8: [21, 23], 9: [20, 23], 10: [20, 22], 11: [20, 22], 12: [20, 22], 13: [20, 23], 14: [20, 23], 15: [21, 24], 16: [22, 24], 17: [23, 24] },
    { 4: [22, 23], 5: [21, 24], 6: [21, 24], 7: [21, 23], 8: [20, 23], 9: [20, 23], 10: [20, 22], 11: [20, 22], 12: [20, 22], 13: [20, 23], 14: [20, 24], 15: [21, 24], 16: [22, 23] },
  ];
  const STONE2 = [
    '...KKKK...',
    '..KsssXK..',
    '.KsSSSSXK.',
    'KYYyYYyYYK',
    'KyYYyYYyYK',
    '.KSWSSSXK.',
    '.KSWWSXXK.',
  ];
  const EYE2 = {
    open: ['we', 'ee'], blink: ['..', 'KK'], happy: ['.K.', 'K.K'], sleep: ['..', 'KK'], up: ['ee', 'ew'], wide: ['we', 'ee'],
  };
  const MOUTH2 = { shut: [], open: ['KnnnmK', '.KKKK.'], small: ['Knm', '.K.'], grin: ['KnnnnK', '.KKKK.'] };
  const WHISK2 = [
    // upper barbel curls forward and up; lower one trails long under the chin.
    [[[2, 12], [1, 11], [0, 10], [0, 9], [1, 8], [2, 7]], [[2, 14], [1, 15], [1, 16], [0, 17], [0, 18], [1, 19], [2, 20]]],
    [[[2, 12], [1, 11], [1, 10], [0, 9], [0, 8], [1, 7]], [[2, 14], [1, 15], [0, 16], [0, 17], [1, 18], [1, 19], [2, 20]]],
  ];
  // Two small signal flags on the back: a white canary pennant and a red one.
  const FLAGS2 = [
    { x: 15, y: 3, h: 4, art: [['WW', 'W.'], ['W.', 'WW']] },
    { x: 18, y: 1, h: 6, art: [['RRf', 'Rf.'], ['Rf.', 'RRf']] },
  ];

  function yurekko({ eye = 'open', mouth = 'shut', whisk = 0, flap = 0, dy = 0, stone = 0, tail = 0, shide = 0 } = {}) {
    const g = grid(W2, H2);
    const tailSpans = TAIL2[tail];
    fish(g, tailSpans, { dy, mouthRow: 99, mouthEnd: -1, head: 0, finRows: Object.keys(tailSpans).map(Number).slice(1, -1) });
    fish(g, BODY2, { dy, mouthRow: 13, mouthEnd: 9, head: 4 });
    // A few ink blots along the back, the way a brush leaves them.
    pts(g, [[12, 9], [15, 10], [17, 9]], 'I', 0, dy);
    FLAGS2.forEach(({ x, y, h, art }, i) => {
      for (let j = 0; j < h; j++) set(g, x, y + j + dy, 'q');
      stamp(g, art[(flap + i) % 2], x + 1, y + dy);
    });
    stamp(g, STONE2, 4, stone + dy);
    // The shide zigzag hangs from the rope down over its brow; it flutters in the fidget.
    stamp(g, shide ? [' W', 'WW', 'W '] : ['W', 'WW', 'W'], 7, 7 + stone + dy);
    stamp(g, EYE2[eye], 6, 10 + dy);
    if (MOUTH2[mouth].length) stamp(g, MOUTH2[mouth], 3, 14 + dy);
    WHISK2[whisk].forEach(w => pts(g, w, 'v', 0, dy));
    return rows(g);
  }
  const zz = (src, k, x0) => { const g = src.map(r => [...r]); stamp(g, [['zzz', '..z', '.z.', 'zzz'], ['zz', '.z', 'zz']][k], x0 + (k ? 1 : 0), k ? 1 : 0); return rows(g); };
  const dots = (src, list) => { const g = src.map(r => [...r]); pts(g, list, 'z'); return rows(g); };

  const II = {
    idle: yurekko(),
    idle2: yurekko({ whisk: 1, flap: 1, tail: 1 }),
    blink: yurekko({ eye: 'blink' }),
    talk: yurekko({ mouth: 'open' }),
    talk2: yurekko({ mouth: 'small', flap: 1, whisk: 1 }),
    happy: yurekko({ eye: 'happy', mouth: 'grin', tail: 1 }),
    happy2: yurekko({ eye: 'happy', mouth: 'grin', dy: -1, flap: 1, whisk: 1 }),
    sleep: zz(yurekko({ eye: 'sleep' }), 0, 0),
    sleep2: zz(yurekko({ eye: 'sleep', whisk: 1 }), 1, 0),
    think: dots(yurekko({ eye: 'up' }), [[3, 4], [2, 2], [3, 0]]),
    fidget: yurekko({ whisk: 1, flap: 1, tail: 1, shide: 1 }),
  };

  // ── III · Shizume ────────────────────────────────────────────────────────────
  const W3 = 28, H3 = 22;
  const BODY3 = { 8: [8, 20], 9: [6, 21], 10: [5, 22], 11: [4, 22], 12: [4, 22], 13: [4, 22], 14: [4, 22], 15: [4, 21], 16: [5, 20], 17: [6, 19], 18: [8, 17] };
  const TAIL3 = [
    { 9: [23, 25], 10: [22, 26], 11: [22, 27], 12: [22, 26], 13: [22, 25], 14: [22, 25], 15: [22, 26], 16: [23, 27], 17: [24, 27], 18: [25, 26] },
    { 9: [23, 25], 10: [22, 26], 11: [22, 26], 12: [22, 25], 13: [22, 25], 14: [22, 26], 15: [22, 27], 16: [23, 27], 17: [24, 27], 18: [24, 26], 19: [25, 26] },
  ];
  const STONE3 = [
    '...KKKKK...',
    '..KsssssXK.',
    '.KsSSSSSSXK',
    'KsSSSSSSSXK',
    'KYYyYYyYYyK',
    'KyYYyYYyYYK',
    '.KSWSSSWXK.',
    '.KSWWSWWXK.',
  ];
  const EYE3 = {
    // Calm: a low lid, the pupil resting, one point of light.
    open: ['KKK', 'wee'], blink: ['...', 'KKK'], happy: ['.K.', 'K.K'], sleep: ['...', 'KKK'], up: ['eew', 'eKK'], wide: ['.w.', 'wee'],
  };
  const MOUTH3 = { shut: [], open: ['KnnnnmK', '.KKKKK.'], small: ['Knnm', '.KK.'], grin: ['KnnnnnK', '.KKKKK.'] };
  const WHISK3 = [
    [[[3, 14], [2, 13], [1, 12], [1, 11], [0, 10], [0, 9], [1, 8], [2, 7]], [[3, 16], [2, 17], [2, 18], [1, 19], [1, 20], [2, 21], [3, 21]]],
    [[[3, 14], [2, 13], [2, 12], [1, 11], [1, 10], [0, 9], [0, 8], [1, 7]], [[3, 16], [2, 17], [1, 18], [1, 19], [2, 20], [3, 21], [4, 21]]],
  ];
  // The staged rollout: 1% → 10% → 50% → 100%, each flag a little taller and bigger than the last.
  const FLAGS3 = [
    { x: 15, y: 6, h: 2, art: [['W'], ['W']] },
    { x: 17, y: 4, h: 4, art: [['WW', 'W.'], ['W.', 'WW']] },
    { x: 20, y: 2, h: 6, art: [['Yy', 'Y.'], ['Y.', 'Yy']] },
    { x: 23, y: 0, h: 9, art: [['RRRf', 'RRf.', 'Rf..'], ['RRf.', 'RRRf', 'Rf..']] },
  ];

  function shizume({ eye = 'open', mouth = 'shut', whisk = 0, flap = 0, dy = 0, tail = 0, calm = 0 } = {}) {
    const g = grid(W3, H3);
    const tailSpans = TAIL3[tail];
    fish(g, tailSpans, { dy, mouthRow: 99, mouthEnd: -1, head: 0, finRows: Object.keys(tailSpans).map(Number).slice(1, -1) });
    fish(g, BODY3, { dy, mouthRow: 15, mouthEnd: 11, head: 5 });
    pts(g, [[15, 10], [18, 11], [20, 10]], 'I', 0, dy);
    FLAGS3.forEach(({ x, y, h, art }, i) => {
      for (let j = 0; j < h; j++) set(g, x, y + j + dy, 'q');
      stamp(g, art[(flap + i) % 2], x + 1, y + dy);
    });
    stamp(g, STONE3, 4, dy);
    stamp(g, ['W', 'WW', ' W'], 7, 8 + dy);
    stamp(g, EYE3[eye], 7, 12 + dy);
    if (MOUTH3[mouth].length) stamp(g, MOUTH3[mouth], 4, 16 + dy);
    WHISK3[whisk].forEach(w => pts(g, w, 'v', 0, dy));
    // The ground under it stays calm: two long level brushstrokes.
    const L = calm ? [[6, 20], [7, 20], [8, 20], [11, 20], [12, 20], [13, 20], [14, 20], [17, 20], [18, 20], [19, 20], [21, 21], [22, 21], [9, 21], [10, 21]]
      : [[5, 20], [6, 20], [7, 20], [10, 20], [11, 20], [12, 20], [13, 20], [16, 20], [17, 20], [18, 20], [20, 21], [21, 21], [8, 21], [9, 21]];
    pts(g, L, 'x');
    return rows(g);
  }
  const III = {
    idle: shizume(),
    idle2: shizume({ whisk: 1, flap: 1, calm: 1 }),
    blink: shizume({ eye: 'blink' }),
    talk: shizume({ eye: 'wide', mouth: 'open' }),
    talk2: shizume({ eye: 'wide', mouth: 'small', flap: 1, whisk: 1 }),
    happy: shizume({ eye: 'happy', mouth: 'grin', tail: 1 }),
    happy2: shizume({ eye: 'happy', mouth: 'grin', flap: 1, whisk: 1, calm: 1 }),
    sleep: zz(shizume({ eye: 'sleep' }), 0, 0),
    sleep2: zz(shizume({ eye: 'sleep', whisk: 1, calm: 1 }), 1, 0),
    think: dots(shizume({ eye: 'up' }), [[3, 4], [2, 2], [3, 0]]),
    fidget: shizume({ whisk: 1, flap: 1, tail: 1, calm: 1 }),
  };

  const PAL = { q: '#4a3b2c', f: '#8e2b20' };

  PatchDex.evolve('yure', {
    habit: 'autonomy',
    stages: [
      {
        name: 'Yurekko',
        species: 'flag-bearing namazu',
        blurb: 'A grown catfish that has learned to wriggle one fin at a time. It plants a little flag before every move, just in case.',
        voice: 'flag it, ship it to a few, watch. then widen the circle.',
        evolve: 'Its whiskers grow long and two signal flags rise on its back: you started letting the agent act in small, gated steps.',
        palette: PAL,
        loop: [['idle', 20], ['blink', 2], ['idle', 12], ['idle2', 6], ['idle', 10], ['talk2', 3], ['idle', 10], ['fidget', 4], ['idle', 12], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 8], ['happy', 3], ['idle', 10]],
        sprites: II,
      },
      {
        name: 'Shizume',
        species: 'grand keystone namazu',
        blurb: 'The great catfish at rest. The keystone sits easy on its head, and a row of flags along its back rises one stage at a time.',
        voice: 'one percent, ten, fifty, all. the ground never felt it.',
        evolve: 'The keystone grows and the flags line up in stages: you hand the agent real autonomy, rolled out in steps you can stop.',
        palette: PAL,
        loop: [['idle', 24], ['blink', 2], ['idle', 12], ['idle2', 8], ['idle', 12], ['talk2', 3], ['idle', 10], ['fidget', 5], ['idle', 14], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 10]],
        sprites: III,
      },
    ],
  });
})();
