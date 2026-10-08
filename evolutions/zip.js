// Zip evolutions. II Reruby: a crested hummingbird whose wingbeat traces a figure-8, the run-look-again loop made visible.
// III Rubicycle: a crowned, racket-tailed hummingbird that leaves a glowing infinity trail behind every pass.
(function () {
  const G = rows => rows.map(r => [...r]);
  const R = g => g.map(r => r.join(''));
  const set = (base, edits) => {
    const g = G(base);
    edits.forEach(([x, y, s]) => [...s].forEach((ch, i) => { if (ch !== ' ' && g[y] && g[y][x + i] !== undefined) g[y][x + i] = ch; }));
    return R(g);
  };
  // Lay a layer behind the body (only fills empty cells).
  const under = (body, layer, dx = 0, dy = 0) => {
    const g = G(body);
    (layer || []).forEach((r, y) => [...r].forEach((c, x) => { const xx = x + dx, yy = y + dy; if (c !== '.' && g[yy] && g[yy][xx] === '.') g[yy][xx] = c; }));
    return R(g);
  };
  // Bodies are drawn one row too tall; a belly row (12) drops out so the hover bob has room without clipping the crest.
  const blank = rows => '.'.repeat(rows[0].length);
  const fit = rows => [blank(rows), ...rows.slice(0, 12), ...rows.slice(13)];
  const up = rows => ({ lifted: [...rows.slice(0, 12), ...rows.slice(13), blank(rows)] });
  const fitAll = sprites => Object.fromEntries(Object.entries(sprites).map(([k, v]) => [k, v.lifted || fit(v)]));
  const Z1 = ['zzzz', '...z', '..z.', '.z..', 'zzzz'];
  const Z2 = ['zzz', '..z', '.z.', 'zzz'];

  // ---------------- II · Reruby ----------------
  // 25x21. Same 3/4 hover pose, grown: a swept crest, a longer needle, a wider gorget and a deeper fork in the tail.
  const BODY2 = [
    '......ooo................',
    '......ottoo..............',
    '.......ohhtoooooo........',
    '........otthhhhhto.......',
    '.......ohhhhtttggGo......',
    '.......ohhttgggweGo......',
    '......ohttgggggeeGokkkkkk',
    '......otgggGgQRrRRo......',
    '.....ogggGgQRRrRRo.......',
    '.....oggGgQRRRrRQo.......',
    '....oggGgQQRRRRQo........',
    '....oggGvvvvvvVo.........',
    '...oggGgvvvvvVVo.........',
    '...oGGgvvvvVVVo..........',
    '..oGGGgvvvVVVo...........',
    '..oGGGgVVVVoo............',
    '.oGGGGVVoo...............',
    '.otGtGoo.................',
    'otGootGo.................',
    'oto..oto.................',
    'oo....oo.................',
  ];
  // Wingbeat in two strokes. Together the solid wing and its streak trace a figure-8 around the shoulder.
  const WING2_A = [
    '...aaA..',
    '..aaaaA.',
    '.aaaaaA.',
    '.aaaaaaA',
    '..aaaaaa',
    '....aaaa',
    '......aa',
    'A.......',
    '.A......',
    '..A.....',
    '...A....',
  ];
  const WING2_B = [
    '....A...',
    '...A....',
    '..A..A..',
    '...A....',
    '....A...',
    '.....A..',
    '......A.',
    'Aaa.....',
    'aaaaa...',
    'aaaaa...',
    '.aaa....',
    '..AA....',
    '...A....',
  ];
  // Face pieces (eye at cols 15-16, rows 5-6; beak on row 6 from col 19).
  const EYE_SHUT2 = [[14, 5, 'ggg'], [14, 6, 'gee']];
  const EYE_HAPPY2 = [[14, 4, 'tgg'], [14, 5, 'geg'], [14, 6, 'ege']];
  const EYE_UP2 = [[14, 4, 'gwe'], [14, 5, 'gee'], [14, 6, 'ggg']];
  const BEAK_OPEN2 = [[19, 5, 'kkkkkk'], [19, 6, 'rr....'], [19, 7, 'kkkkk']];
  const BEAK_UP2 = [[19, 6, 'kkk...'], [22, 5, 'kkk']];
  const BEAK_DOWN2 = [[19, 6, 'kkk...'], [22, 7, 'kkk']];
  const FLASH2 = [[13, 7, 'Rrwrr'], [11, 8, 'QrRrrR'], [10, 9, 'QRrRrRQ'], [9, 10, 'QQrRrRQ']];
  const CREST_UP2 = [[6, 0, '.ooo'], [6, 1, '.otto'], [7, 2, 'ohht']];
  const idle2a = under(BODY2, WING2_A);
  const idle2b = under(BODY2, WING2_B);
  const happyBody2 = set(BODY2, [...EYE_HAPPY2, ...FLASH2, ...BEAK_UP2, ...CREST_UP2]);
  const folded2 = set(BODY2, [
    ...EYE_SHUT2, ...BEAK_DOWN2,
    [6, 7, 'o'], [5, 8, 'otG'], [5, 9, 'otG'], [4, 10, 'otG'], [4, 11, 'otG'], [3, 12, 'otG'], [3, 13, 'otG'],
    [2, 14, 'otG'], [2, 15, 'otG'], [1, 16, 'oto'], [0, 17, 'oo'],
  ]);
  const II = {
    name: 'Reruby',
    species: 'crested hummingbird',
    blurb: 'Zip grew a crest and a figure-8 wingbeat. Every pass loops back to the same flower to check it bloomed.',
    voice: 'run it. look. loop back. run it again.',
    evolve: 'The wingbeat closed into a loop: you stopped making one big change and started checking every small one.',
    palette: {},
    sprites: fitAll({
      idle: idle2a, idle2: idle2b, hover: up(idle2a), hover2: up(idle2b),
      blink: under(set(BODY2, EYE_SHUT2), WING2_A),
      talk: under(set(BODY2, BEAK_OPEN2), WING2_B),
      talk2: under(set(BODY2, FLASH2), WING2_A),
      happy: under(happyBody2, WING2_A),
      happy2: up(under(happyBody2, WING2_B)),
      // Think: eye rolls up, beak dips, a "?" floats over the head.
      think: set(under(set(BODY2, [...EYE_UP2, ...BEAK_DOWN2]), WING2_A), [[19, 0, 'zzz'], [21, 1, 'z'], [20, 2, 'z'], [20, 4, 'z']]),
      // Fidget: tail fans wide, crest flicks up, mid-stroke wings.
      fidget: under(set(BODY2, [...BEAK_DOWN2, ...CREST_UP2, [0, 17, 'ootGtGoo'], [0, 18, 'otGootGto'], [0, 19, 'oto..otoo'], [0, 20, 'oo.....oo']]), WING2_A, 0, 1),
      sleep: set(folded2, Z1.map((r, i) => [1, i + 1, r])),
      sleep2: set(folded2, Z2.map((r, i) => [2, i + 2, r])),
    }),
    loop: [
      ['idle', 1], ['idle2', 1], ['idle', 1], ['idle2', 1], ['hover', 1], ['hover2', 1], ['hover', 1], ['hover2', 1],
      ['idle', 1], ['idle2', 1], ['blink', 1], ['idle2', 1], ['hover', 1], ['hover2', 1], ['hover', 1], ['hover2', 1],
      ['idle', 1], ['idle2', 1], ['idle', 1], ['idle2', 1], ['hover', 1], ['hover2', 1], ['hover', 1], ['hover2', 1],
      ['fidget', 4], ['idle2', 1], ['idle', 1], ['idle2', 1], ['hover', 1], ['hover2', 1], ['hover', 1], ['hover2', 1],
      ['think', 8], ['idle', 1], ['idle2', 1], ['hover', 1], ['hover2', 1],
    ],
  };

  // ---------------- III · Rubicycle ----------------
  // 28x22. Twin crown plumes, a flared gorget, spatule rackets on wire tail shafts, and an infinity loop it keeps flying.
  const BODY3 = [
    '.........ooo.ooo............',
    '........ottoottoo...........',
    '.........ohhtohhtooo........',
    '..........ootthhhhhto.......',
    '..........ohhhhtttggGo......',
    '..........ohhttgggweGo......',
    '.........ohttgggggeeGokkkkkk',
    '.........otgggGgQRrRRo......',
    '........ogggGgQRRwRRo.......',
    '........oggGgQRRRrRQo.......',
    '.......oggGgQQRRRRQo........',
    '.......oggGvvvvvvVo.........',
    '......oggGgvvvvvVVo.........',
    '......oGGgvvvvVVVo..........',
    '.....oGGGgvvvVVVo...........',
    '.....oGGGgVVVVoo............',
    '....oGGGGVVoo...............',
    '....otGtGoo.................',
    '...o...o....................',
    '.ooo...ooo..................',
    'otho..ohto..................',
    '.oo....oo...................',
  ];
  const WING3_A = [
    '....aaA...',
    '...aaaaA..',
    '..aaaaaaA.',
    '.aaaaaaaA.',
    '.aaaaaaaaA',
    '..aaaaaaaa',
    '....aaaaaa',
    '......aaaa',
    '........aa',
    'A.........',
    '.A........',
    '..A.......',
    '...A......',
    '....A.....',
  ];
  const WING3_B = [
    '.....A....',
    '....A.....',
    '...A..A...',
    '..A..A....',
    '...A......',
    '....A.....',
    '.....A....',
    '......A...',
    'Aaa.......',
    'aaaaa.....',
    'aaaaaa....',
    'aaaaaa....',
    '.aaaa.....',
    '..AAA.....',
    '....A.....',
  ];
  // The loop it keeps flying: an infinity track in the open corner under the beak, with a spark running it.
  const LOOP = [
    '..aaa...aaa..',
    '.a...a.a...a.',
    'a.....a.....a',
    '.a...a.a...a.',
    '..aaa...aaa..',
  ];
  // Track order: from the crossing, round the right lobe, back through the crossing, round the left lobe.
  const TRACK = [[6, 2], [7, 1], [8, 0], [9, 0], [10, 0], [11, 1], [12, 2], [11, 3], [10, 4], [9, 4], [8, 4], [7, 3],
    [6, 2], [5, 1], [4, 0], [3, 0], [2, 0], [1, 1], [0, 2], [1, 3], [2, 4], [3, 4], [4, 4], [5, 3]];
  const LX = 14, LY = 16;
  const trail = (body, p, o = {}) => {
    const g = G(body);
    LOOP.forEach((r, y) => [...r].forEach((c, x) => { if (c !== '.' && g[LY + y][LX + x] === '.') g[LY + y][LX + x] = o.lit ? 'a' : 'A'; }));
    if (p === null) return R(g);
    const n = TRACK.length, head = (p * 3) % n;
    const put = (i, ch) => { const [x, y] = TRACK[(i + n) % n]; g[LY + y][LX + x] = ch; };
    put(head - 2, 'a'); put(head - 1, 'a'); put(head, 'w');
    return R(g);
  };
  const sh = (edits, dx = 3) => edits.map(([x, y, s]) => [x + dx, y, s]);
  const EYE_SHUT3 = sh(EYE_SHUT2), EYE_HAPPY3 = sh(EYE_HAPPY2), EYE_UP3 = sh(EYE_UP2);
  const BEAK_OPEN3 = sh(BEAK_OPEN2), BEAK_UP3 = sh(BEAK_UP2), BEAK_DOWN3 = sh(BEAK_DOWN2), FLASH3 = sh(FLASH2);
  const wing3 = (body, k, dy = 1) => under(body, k ? WING3_B : WING3_A, 0, dy);
  const fly3 = (body, k, p, o) => trail(wing3(body, k), p, o);
  const run3 = [0, 1, 2, 3, 4, 5, 6, 7].map(p => fly3(BODY3, p % 2, p));
  const happyBody3 = set(BODY3, [...EYE_HAPPY3, ...FLASH3, ...BEAK_UP3]);
  const folded3 = set(BODY3, [
    ...EYE_SHUT3, ...BEAK_DOWN3,
    [9, 7, 'o'], [8, 8, 'otG'], [8, 9, 'otG'], [7, 10, 'otG'], [7, 11, 'otG'], [6, 12, 'otG'], [6, 13, 'otG'],
    [5, 14, 'otG'], [5, 15, 'otG'], [4, 16, 'oto'], [3, 17, 'oo'],
  ]);
  const III = {
    name: 'Rubicycle',
    species: 'racket-tailed hummingbird',
    blurb: 'Zip crowned. It flies the same infinity loop all day, and nothing gets past the spark that runs it.',
    voice: 'change. run. look. loop.',
    evolve: 'The loop left a trail you can see: checking your work stopped being a step and became the way you move.',
    palette: {},
    sprites: fitAll({
      idle: run3[0], idle2: run3[1], run2: run3[2], run3: run3[3], run4: run3[4], run5: run3[5], run6: run3[6], run7: run3[7],
      hover: up(run3[0]), hover2: up(run3[1]),
      blink: fly3(set(BODY3, EYE_SHUT3), 0, 2),
      talk: fly3(set(BODY3, BEAK_OPEN3), 1, 3),
      talk2: fly3(set(BODY3, FLASH3), 0, 4),
      // Happy: crown up, gorget lit, the whole loop lights.
      happy: fly3(happyBody3, 0, 0, { lit: true }),
      happy2: up(fly3(happyBody3, 1, 4, { lit: true })),
      think: set(fly3(set(BODY3, [...EYE_UP3, ...BEAK_DOWN3]), 0, null), [[22, 0, 'zzz'], [24, 1, 'z'], [23, 2, 'z'], [23, 4, 'z']]),
      // Fidget: the rackets swap sides and the spark skips ahead.
      fidget: fly3(set(BODY3, [...BEAK_DOWN3, [0, 18, '..o.o.....'], [0, 19, '.ooo.ooo..'], [0, 20, 'othoohto..'], [0, 21, '.oo..oo...']]), 1, 6),
      sleep: set(trail(folded3, null), Z1.map((r, i) => [2, i + 1, r])),
      sleep2: set(trail(folded3, null), Z2.map((r, i) => [3, i + 2, r])),
    }),
    loop: [
      ['idle', 1], ['idle2', 1], ['run2', 1], ['run3', 1], ['run4', 1], ['run5', 1], ['run6', 1], ['run7', 1],
      ['hover', 1], ['hover2', 1], ['run2', 1], ['run3', 1], ['blink', 1], ['run5', 1], ['run6', 1], ['run7', 1],
      ['idle', 1], ['idle2', 1], ['run2', 1], ['run3', 1], ['run4', 1], ['run5', 1], ['run6', 1], ['run7', 1],
      ['fidget', 4], ['run7', 1], ['hover', 1], ['hover2', 1], ['run2', 1], ['run3', 1], ['run4', 1], ['run5', 1],
      ['think', 8], ['idle', 1], ['idle2', 1], ['hover', 1], ['hover2', 1],
    ],
  };

  PatchDex.evolve('zip', { habit: 'verification', stages: [II, III] });
})();
