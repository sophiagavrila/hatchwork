// Zip — hummingbird. Emerald hover-sprite with a ruby gorget, a needle beak and wings that only exist as blur.
(function () {
  // Body alone (22x18), 3/4 hover pose: head up-right, tail down-left.
  const BODY = [
    '......................',
    '.........oooooo.......',
    '........ohhhhtto......',
    '.......ohhttgggo......',
    '.......ohtggweGo......',
    '.......otgggeeGokkkkkk',
    '.......ogGgQRrRo......',
    '......ogGgQRrRRo......',
    '......oggGQRRRQo......',
    '.....oggGvvvvVo.......',
    '.....oggGvvvvVo.......',
    '.....oGGgvvvVVo.......',
    '....oGGGgvvVVo........',
    '....oGGGgVVVo.........',
    '...oGGGGVVoo..........',
    '..otGtGoo.............',
    '.otGotGo..............',
    '.oo..oo...............',
  ];
  // Wing blur, two phases. Solid stroke = where the wing is now, dotted streak = where it just was.
  const WING_A = [
    '...aA.................',
    '..aaaA................',
    '..aaaA................',
    '..aaaA................',
    '...aaaA...............',
    '....aaA...............',
    '.....aa...............',
    '.A....................',
    '..A...................',
    '...A..................',
    '....A.................',
  ];
  const WING_B = [
    '...A..................',
    '....A.................',
    '..A..A................',
    '...A..................',
    '....A.................',
    '.....A................',
    '......A...............',
    'Aa....................',
    'aaaaa.................',
    '.aaaa.................',
    '..AAa.................',
    '...AA.................',
  ];
  const W = BODY[0].length, H = BODY.length;
  const G = rows => rows.map(r => [...r]);
  const R = g => g.map(r => r.join(''));
  const set = (base, edits) => {
    const g = G(base);
    edits.forEach(([x, y, s]) => [...s].forEach((ch, i) => { if (ch !== ' ' && g[y] && g[y][x + i] !== undefined) g[y][x + i] = ch; }));
    return R(g);
  };
  // Lay a wing layer behind the body.
  const withWing = (body, wing, dy = 0) => {
    const g = G(body);
    (wing || []).forEach((r, y) => [...r].forEach((c, x) => { const yy = y + dy; if (c !== '.' && g[yy] && g[yy][x] === '.') g[yy][x] = c; }));
    return R(g);
  };
  // Hover bob: lift everything 1px.
  const up = rows => [...rows.slice(1), '.'.repeat(W)];

  // Face pieces.
  const EYE_SHUT = [[11, 4, 'ggg'], [11, 5, 'gee']];
  const EYE_HAPPY = [[11, 3, 'tgg'], [11, 4, 'geg'], [11, 5, 'ege']];
  const EYE_UP = [[11, 3, 'gwe'], [11, 4, 'gee'], [11, 5, 'ggg']];
  const BEAK_OPEN = [[16, 4, 'kkkkkk'], [16, 5, 'rr....'], [16, 6, 'kkkkk']];
  const GORGET_FLASH = [[11, 6, 'rRr'], [10, 7, 'QrRrR'], [10, 8, 'QRrRQ']];

  const idle = withWing(BODY, WING_A);
  const idle2 = withWing(BODY, WING_B);
  const hover = up(idle);
  const hover2 = up(idle2);
  const blink = withWing(set(BODY, EYE_SHUT), WING_A);
  // Talk: beak parts and the little tongue flicks out; second frame flashes the gorget.
  const talk = withWing(set(BODY, BEAK_OPEN), WING_B);
  const talk2 = withWing(set(BODY, GORGET_FLASH), WING_A);
  // Happy: ^ eye, gorget lit, wings high; second frame bobs up with the other stroke.
  const happyBody = set(BODY, [...EYE_HAPPY, ...GORGET_FLASH, [16, 5, 'kkk...'], [19, 4, 'kkk']]);
  const happy = withWing(happyBody, WING_A);
  const happy2 = up(withWing(happyBody, WING_B));
  // Think: eye rolls up, beak tips down a touch, a "?" floats where the wing was.
  const think = set(withWing(set(BODY, [...EYE_UP, [16, 5, 'kkk...'], [19, 6, 'kkk']]), WING_A), [
    [18, 0, 'zzz'], [20, 1, 'z'], [19, 2, 'z'], [19, 4, 'z'],
  ]);
  // Fidget: tail fans out and the beak dips, mid-stroke wings.
  const fidget = withWing(set(BODY, [
    [16, 5, 'kkk...'], [19, 6, 'kkk'],
    [0, 15, 'oo'], [0, 16, 'ot'], [0, 17, 'o.'], [7, 16, 'o'], [6, 17, 'ooo'],
  ]), WING_A, 1);
  // Sleep: wings folded flat along the back, head tucked, eye shut, Z where the blur used to be.
  const folded = set(BODY, [
    ...EYE_SHUT,
    [6, 8, 'o'], [5, 9, 'otG'], [5, 10, 'otG'], [4, 11, 'otG'], [4, 12, 'otG'], [3, 13, 'otG'], [3, 14, 'oto'], [2, 15, 'oo'],
    [16, 5, 'kkk...'], [19, 6, 'kkk'],
  ]);
  const Z1 = ['zzzz', '...z', '..z.', '.z..', 'zzzz'];
  const Z2 = ['zzz', '..z', '.z.', 'zzz'];
  const sleep = set(folded, Z1.map((r, i) => [1, i + 1, r]));
  const sleep2 = set(folded, Z2.map((r, i) => [2, i + 2, r]));
  // Perched and awake (entrance only).
  const perch = set(folded, [[11, 4, 'gwe'], [11, 5, 'gee'], [16, 5, 'kkkkkk'], [19, 6, '...']]);

  // ---- entrance helpers ----
  // A green comet: Zip too fast to see. Beak at the leading edge.
  const COMET = [
    '.....A..AAAaaa.ooo....',
    'A.AA.AAAaaaaaaogwGokkk',
    '.....A..AAAaaaoRGGo...',
    '...........A..AAoo....',
  ];

  PatchDex.register({
    id: 'zip', name: 'Zip', species: 'hummingbird', rarity: 'uncommon',
    blurb: 'An emerald hummingbird with a ruby throat. Its wings are never still long enough to draw.',
    coaching: 'Tight feedback loops: make the smallest change, run it, look, and go again.',
    voice: 'small change. run it. again. faster.',
    hatch: 'Something green streaks past until the egg spins, then the top pops off and Zip is already hovering.',
    palette: {
      o: '#0d3833', G: '#1c7a5a', g: '#2fae72', h: '#9be8b0', t: '#3cc4c0',
      v: '#eef4ea', V: '#b8cdbf',
      R: '#d8304a', r: '#ff7c86', Q: '#7e1a33',
      k: '#5d5670', e: '#1a1622', w: '#ffffff',
      a: '#effffd', A: '#a6dcd6', z: '#b9c6e6',
    },
    sprites: { idle, idle2, hover, hover2, blink, talk, talk2, happy, happy2, think, fidget, sleep, sleep2 },
    // 100ms ticks: the wings swap every tick, with a slow hover bob.
    loop: [
      ['idle', 1], ['idle2', 1], ['idle', 1], ['idle2', 1], ['hover', 1], ['hover2', 1], ['hover', 1], ['hover2', 1],
      ['idle', 1], ['idle2', 1], ['blink', 1], ['idle2', 1], ['hover', 1], ['hover2', 1], ['hover', 1], ['hover2', 1],
      ['idle', 1], ['idle2', 1], ['idle', 1], ['idle2', 1], ['hover', 1], ['hover2', 1], ['hover', 1], ['hover2', 1],
      ['fidget', 4], ['idle2', 1], ['idle', 1], ['idle2', 1], ['hover', 1], ['hover2', 1], ['hover', 1], ['hover2', 1],
      ['think', 8], ['idle', 1], ['idle2', 1], ['hover', 1], ['hover2', 1],
    ],
    entrance(k) {
      const out = k.eggIntro();
      const comet = (g, x, y, left) => k.stamp(g, COMET, x, y, left ? { flipX: true } : {});
      const spin = (i, o = {}) => k.egg(k.EGG_C2, 0, 0, { ...o, flipX: i % 2 === 1 });
      const zipAt = (s, dx, dy) => k.at(s, dx, dy);
      const popped = (s, topDx, topDy, botDy) => {
        const g = k.egg(k.EGG_BOTTOM, 0, botDy);
        k.stamp(g, k.EGG_TOP, k.eggHome.x + topDx, k.eggHome.y + topDy);
        return k.over(g, s, 0, -3);
      };
      out.push(
        // Fly-bys: a green streak whips past and the egg leans in its wake.
        k.f(comet(k.egg(k.EGG_C2), -6, 3), 70, { note: 'zzzip' }),
        k.f(comet(k.egg(k.EGG_C2, 0, 0, k.lean(1)), 14, 3), 70),
        k.f(k.egg(k.EGG_C2, 0, 0, k.lean(1)), 200, { note: 'what was that' }),
        k.f(comet(k.egg(k.EGG_C2), 12, 13, true), 70, { note: 'zzzip' }),
        k.f(comet(k.egg(k.EGG_C2, 0, 0, k.lean(-1)), -8, 13, true), 70),
        k.f(k.egg(k.EGG_C2, 0, 0, k.lean(-1)), 160),
        // Third pass loops right around the egg and spins it in the draft.
        k.f(comet(spin(1), -4, 0), 60, { note: 'spin' }),
        k.f(comet(spin(0), 10, 15, true), 60),
        k.f(spin(1), 60), k.f(spin(0), 60), k.f(spin(1), 70), k.f(spin(0), 90),
        k.f(k.sparkle(k.egg(k.EGG_C2, 0, -1), 1), 90),
        // Pop: the top flies off and Zip is already hovering in the shell.
        k.f(popped('idle', 3, -6, 0), 80, { note: 'pop' }),
        k.f(popped('idle2', 7, -10, 1), 80),
        k.f(popped('idle', 12, -16, 3), 80),
        k.f(popped('idle2', 30, -30, 6), 80),
        // Darts left, right, then settles, wings flickering.
        k.f(zipAt('idle', -4, -2), 70, { note: 'hover' }),
        k.f(zipAt('idle2', 3, -3), 70),
        k.f(zipAt('idle', 0, -2), 90),
        k.f(zipAt('idle2', 0, -1), 90),
        // Lands, folds the wings, then lifts off happy.
        k.f(zipAt(perch, 0, 0), 420, { note: 'perch' }),
        k.f(zipAt('happy', 0, 0), 130, { note: 'zip.' }),
        k.f(zipAt('happy2', 0, 0), 130),
        k.f(zipAt('happy', 0, 0), 130),
        k.f(zipAt('blink', 0, 0), 90),
        k.f(zipAt('idle2', 0, 0), 90),
      );
      return out;
    },
  });
})();
