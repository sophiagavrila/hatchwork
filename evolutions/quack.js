// Quack evolutions — II Billable (reading glasses + clipboard, listening professionally), III Quaptain (captain's cap + ship's wheel).
(function () {
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
  // Water lapping: the surface pattern slides one pixel.
  const lapRows = ([top, deep]) => ['.' + top.slice(2, -1) + top[1] + '.', deep.slice(1) + deep[0]];
  const ZBIG = ['DDDD', '...D', '..D.', '.D..', 'DDDD'];
  const ZSMALL = ['CCC', '..C', '.C.', 'CCC'];
  const QMARK = ['.DD.', 'D..D', '..D.', '....', '..D.'];

  // ---------- II · Billable ----------
  const II = (() => {
    const body = [
      '...........oo...........',
      '..........oyo...........',
      '.........ooloooo........',
      '.......oollwwlyyoo......',
      '......ollllwlyyyyYo.....',
      '.....ollwelyyyyyyYYo..oo',
      '.....olleelyyyyyyyYo.oyo',
      '.....ollllyyyyyyyYYooyYo',
      '.....olkkkkkyyyyyYYdlyYo',
      '.rrrrrykggkyyyyyyyYYyyYo',
      'raaaabrykkyyyyyyYYYdyyYo',
      'rbbbbbrypyyyyyyYYYddyyYo',
      '.rBBBBryyyyyyyyyYYYYyYYo',
      '..rrrrolyyyyyyyyyYYYYYYo',
      '..olllyyyyyyyyyyYYYYYYdo',
      '..olyyyyyyyyyyyYYYYYYYdo',
      '..olyyyyyyyyyyYYYYYYYddo',
      '...oyyyyyyyyyyYYYYYYddo.',
      '....ooyyyyyyyYYYYYYddo..',
    ];
    const WATER = ['.cCCccCCcccCCccCCccCCcC.', 'CCDDCCDDCCCDDCCDDCCDDCCD'];
    const WATER2 = lapRows(WATER);
    const W = body[0].length;
    // Clipboard (two ticked lines, one still open) held up by the molded wing.
    const BOARD = ['...oSo..', '.onnSnno', '.nPPPPPn', '.nGLLLPn', '.nPPPPPn', '.nGLLPPn', '.NNNNNNN'];
    const WING = ['...dddddd..', '..dlllllyd.', '.dllyyyyYYd', 'dlyyyYYYYd.', 'dyYYYdddd..', '.ddd.......'];
    const NO_GLASSES = ['lyyyyy', 'yyyyyy', 'yyyyyy'];
    const GLASSES = ['kkkkk', 'kggk.', '.kk..'];
    // dy: sink into the water; face/glasses are patched on the body before the props go on.
    const build = ({ dy = 0, alt = false, face = g => g, board = BOARD, bx = 1, by = 12 } = {}) => {
      let g = face(body);
      g = put(g, bx, by, board);
      g = put(g, 8, 12, WING);
      g = [...Array(dy)].map(() => '.'.repeat(W)).concat(g).slice(0, 19);
      return g.concat(alt ? WATER2 : WATER);
    };
    const eye = rows => g => put(g, 8, 5, rows);
    const both = (...fs) => g => fs.reduce((a, f) => f(a), g);
    const jaw = g => mod(g, { 11: '.rmmmmr', 12: '.rBBBBr', 13: '..rrrro' });
    const jaw2 = g => mod(g, { 11: 'rbmmmbr' });
    const glassesAt = y => g => put(put(g, 7, 8, NO_GLASSES), 7, y, GLASSES);

    const idle = build();
    const idle2 = build({ dy: 1, alt: true });
    const blink = build({ face: eye(['ll', 'ee']) });
    const talk = build({ face: jaw });
    const talk2 = build({ face: jaw2, alt: true });
    const happyFace = both(jaw, eye(['ee', 'yy']), g => put(g, 7, 6, ['e..e']), g => put(g, 8, 11, ['pp']));
    const happy = build({ face: happyFace, by: 11 });
    const happy2 = (() => {
      const g = build({ face: happyFace, dy: 1, alt: true, by: 10 });
      return put(put(g, 0, 15, ['c', '.w', 'C']), 22, 16, ['.c', 'w.', '.C']);
    })();
    // Dozing mid-review: eyes shut, glasses slid down the bill, clipboard drooping.
    const sleepFace = both(eye(['ll', 'ee']), glassesAt(9));
    const sleep = put(build({ face: sleepFace, dy: 1, by: 13 }), 19, 0, ZBIG);
    const sleep2 = put(build({ face: sleepFace, dy: 1, alt: true, by: 13 }), 20, 0, ZSMALL);
    // Thinking: looks up over the frames, tapping the open item.
    const think = put(build({ face: eye(['ew', 'ee']) }), 19, 0, QMARK);
    // Fidget: nudges the glasses back up the bill.
    const fidget = build({ face: both(eye(['ll', 'ee']), glassesAt(6)), alt: true, by: 11 });

    return {
      name: 'Billable',
      species: 'consulting rubber duck',
      blurb: 'Quack put on half-moon reading glasses and started taking notes. It still never interrupts, but now it ticks each step off a clipboard and peers over the frames when one is missing.',
      voice: "walk me through it. step one, step two... i'll wait while you find step three.",
      evolve: 'Quack grew reading glasses and a clipboard: you stopped skimming plans and started reading them back line by line, ticking off each step before any code ran.',
      palette: {
        k: '#33283f', g: '#dff3ff',
        n: '#a8693a', N: '#6e3f22', P: '#fffdf4', S: '#c9d2e0', G: '#3fae6a', L: '#8fa3c0',
      },
      sprites: { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
      loop: [
        ['idle', 14], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle', 8], ['think', 8], ['idle', 6],
        ['idle2', 6], ['idle', 12], ['fidget', 4], ['idle', 8], ['blink', 2], ['idle', 4], ['blink', 2], ['idle2', 6],
      ],
    };
  })();

  // ---------- III · Quaptain ----------
  const III = (() => {
    const body = [
      '............................',
      '............................',
      '..........oooooooo..........',
      '.........ollllllyyo.........',
      '........ollllllyyyyo........',
      '.......olllllyyyyyYo........',
      '.......ollllyyyyyyYo.......o',
      '......olllyyyyyyyyYYo.....oo',
      '......ollyyyyyyyyyYYo....oyo',
      '......olyyyyyyyyyYYYo...oyYo',
      '......oyyyyyyyyyYYYYo..oylYo',
      '......oyyyyyyyyYYYYdooolyyYo',
      '.....olyyyyyyyYYYYYdllyyyYYo',
      '....ollyyyyyyyyYYYYYyyyyyYYo',
      '...olllyyyyyyyyyyYYYYyyyYYYo',
      '...ollyyyyyyyyyyyyYYYYYYYYdo',
      '...olyyyyyyyyyyyyYYYYYYYYddo',
      '....oyyyyyyyyyyyYYYYYYYYddo.',
      '.....ooyyyyyyyyYYYYYYYdddoo.',
      '.......ooYYYYYYYYYYYddooo...',
    ];
    const WATER = ['.cwcCcCCccCCcccCCccCCcccCCc.', 'CCDDCCDDCCCDDCCDDCCDDCCDDCCD'];
    const WATER2 = lapRows(WATER);
    const W = body[0].length;
    // Peaked captain's cap: white crown, navy band with a gold badge, brim pulled low over the eye.
    const CAP = [
      '.....oooooooooo...',
      '...ooQQQQQQQQqqoo.',
      '..oQwQQQQQQQQqqqqo',
      '..ovvvhhvvvvvvvVVo',
      '.oVVVVVVVoooooooo.',
      'oVVVVVVoo.........',
      '.ooooo............',
    ];
    // The hatchling's curl, poking out the back of the cap.
    const TUFT = ['..oo', '.olo', '.oyo', 'oyo.'];
    const BILL = ['..rrrrrr.', '.raaaaabr', 'rbbbbbbbr', '.rBBBBBBr', '..rrrrrr.'];
    const OPEN = ['..rrrrrr.', '.raaaaabr', '.rmmmmmmr', '.rBBBBBBr', '..rrrrrr.'];
    const OPEN2 = ['..rrrrrr.', '.raaaaabr', 'rbbmmmmbr', '.rBBBBBBr', '..rrrrrr.'];
    const WHEEL = [
      '.....j.....',
      '.j..ojo..j.',
      '..oon.noo..',
      '..on.n.no..',
      '.on.HnH.no.',
      'jonnnhnnnoj',
      '.on.HnH.no.',
      '..on.n.no..',
      '..oon.noo..',
      '.j..ojo..j.',
      '.....j.....',
    ];
    // Same wheel a notch further round: the brass glint has moved to the next spokes.
    const WHEEL2 = [
      '.....j.....',
      '.h..ojo..j.',
      '..oon.noo..',
      '..onHn.no..',
      '.on..nH.no.',
      'jonnnhnnnoj',
      '.onHn..no..',
      '..on.nHno..',
      '..oon.noo..',
      '.j..ojo..h.',
      '.....j.....',
    ].map(r => r.padEnd(11, '.'));
    const WING = ['...dddddd..', '.ddllllllyd', 'dlllyyyyyYd', 'llyyyYYYYd.', 'dyyYYdddd..', '.dd........'];
    const EYE = ['we', 'ee', 'ee'];
    const build = ({ dy = 0, alt = false, eye = EYE, bill = BILL, cap = 0, wheel = WHEEL, tail, extra = g => g } = {}) => {
      let g = put(body, 10, 7, eye);
      if (tail) g = tail(g);
      g = put(g, 20, 2 + cap, TUFT);
      g = put(g, 4, cap, CAP);
      g = extra(g);
      g = [...Array(dy)].map(() => '.'.repeat(W)).concat(g).slice(0, 20).concat(['.'.repeat(W), '.'.repeat(W)]);
      g = put(g, 0, 20, [(alt ? WATER2 : WATER)[0]]);
      g = put(g, 4, 11 + dy, wheel);
      g = put(g, 0, 9 + dy, bill);
      g = put(g, 14, 13 + dy, WING);
      return put(g, 0, 21, [(alt ? WATER2 : WATER)[1]]);
    };
    const blush = g => put(g, 11, 10, ['pp']);
    const HAPPY_EYE = ['ee', 'yy', 'yy'];
    const happyArc = g => put(g, 9, 8, ['e..e']);

    const idle = build();
    const idle2 = build({ dy: 1, alt: true });
    const blink = build({ eye: ['yy', 'yy', 'ee'] });
    const talk = build({ bill: OPEN });
    const talk2 = build({ bill: OPEN2, alt: true });
    const happy = build({ eye: HAPPY_EYE, bill: OPEN, extra: g => blush(happyArc(g)), wheel: WHEEL2 });
    const happy2 = (() => {
      const g = build({ eye: HAPPY_EYE, bill: OPEN, extra: g2 => blush(happyArc(g2)), dy: 1, alt: true });
      return put(put(g, 0, 15, ['c', '.w', 'C..', '.c']), 26, 17, ['.c', 'w.', '.C']);
    })();
    // Asleep at the helm: cap tipped down over the eyes.
    const sleep = put(build({ eye: ['yy', 'yy', 'ee'], cap: 1, dy: 1 }), 23, 0, ZBIG);
    const sleep2 = put(build({ eye: ['yy', 'yy', 'ee'], cap: 1, dy: 1, alt: true }), 24, 0, ZSMALL);
    const think = put(build({ eye: ['ew', 'ee', 'yy'] }), 23, 0, QMARK);
    // Fidget: a quarter-turn of the wheel and a flick of the tail.
    const fidget = build({ wheel: WHEEL2, alt: true, tail: g => put(g, 24, 6, ['..oo', '.oyo']) });

    return {
      name: 'Quaptain',
      species: 'flagship rubber duck',
      blurb: 'A big glossy captain in a peaked cap, one wing on a ship\'s wheel. Whole crews read their plans to it before leaving port, and it will not turn the wheel until the heading has been said out loud.',
      voice: "chart the course. say it out loud. then we sail. i'll be at the wheel, listening.",
      evolve: 'Billable traded the clipboard for a captain\'s cap and a ship\'s wheel: planning stopped being a checklist you ran and became how you steer. You chart the route and say it out loud before anyone takes the helm.',
      palette: {
        n: '#b5713a', N: '#5a2f17', j: '#e9a865', h: '#ffd75e', H: '#c08a22',
        Q: '#fbfbff', q: '#c9d0e8', v: '#2f3f86', V: '#1b2250',
      },
      sprites: { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
      loop: [
        ['idle', 14], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle', 8], ['fidget', 3], ['idle', 2], ['fidget', 3],
        ['idle2', 6], ['idle', 12], ['blink', 2], ['idle', 4], ['blink', 2], ['idle2', 6], ['think', 8],
      ],
    };
  })();

  PatchDex.evolve('quack', { habit: 'planning', stages: [II, III] });
})();
