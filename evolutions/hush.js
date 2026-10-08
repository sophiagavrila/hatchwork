// Hush's later forms. II Hushara: a long-eared fennec in a teal scarf that streams out in the wind.
// III Dunewise: a robed desert sage fox with a belled staff, calm eyes, and sand blowing past.
(function () {
  // Stamp small rows at (x, y); '.' is transparent, '_' erases.
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch === '_' ? '.' : ch; }); return a.join('');
  });
  const all = (base, ...stamps) => stamps.reduce((r, s) => put(r, ...s), base);

  // ---- II · Hushara (25×21) ----
  const h = [
    'oo.....................oo',
    'oro...................oro',
    'orro.................orro',
    'olrro...............orrdo',
    'olrrco.............ocrrdo',
    '.olrcco...........occrdo.',
    '.olrccco.........occcrdo.',
    '..olrcccooooooooocccrdo..',
    '..olbcccbblllllbbcccbdo..',
    '..olbbcbbbbbbbbbbbcbbdo..',
    '.olbbbbbbbbbbbbbbbbbbbdo.',
    '.olbbwebbbbbbbbbbbwebbdo.',
    '.olbbeebbbbbbbbbbbeebbdo.',
    '.olpbeebbcccccccbbeebpdo.',
    'ooolbbccccCeeeCccccbbdoo.',
    'otoodbcccCCCoCCCcccbdocco',
    'otttoTtutttttttttutToccco',
    'outToTTtttttttttttTTobcco',
    'oTTolbbcccccccctTcbobbbdo',
    'oo.olbccobbcccboTcobbbddo',
    '....oooooooooooooooooooo.',
  ];
  const hShut = [[5, 11, ['bb', 'bb', 'ee']], [18, 11, ['bb', 'bb', 'ee']]];
  const hJoy = [[4, 11, ['bbbb', 'beeb', 'ebbe']], [17, 11, ['bbbb', 'beeb', 'ebbe']]];
  const hOpen = [10, 15, ['CopoC']];
  // The loose scarf end lifts in the wind.
  const hFlap = [[0, 13, ['oo']], [0, 14, ['oto']], [0, 15, ['otto']], [0, 16, ['outTo']], [0, 17, ['oTTto']], [0, 18, ['_oo']], [0, 19, ['__']]];
  const H = {
    idle: h,
    idle2: all(h, ...hFlap),
    blink: all(h, ...hShut),
    talk: all(h, hOpen),
    talk2: all(h, [11, 15, ['ooo']]),
    happy: all(h, ...hJoy, hOpen),
    happy2: all(h, ...hJoy, hOpen, ...hFlap, [10, 2, ['.u.', 'uwu', '.u.']], [15, 4, ['u']]),
    sleep: all(h, ...hShut, [10, 1, ['cccc', '...c', '..c.', '.c..', 'cccc']]),
    sleep2: all(h, ...hShut, [11, 0, ['cccc', '...c', '..c.', '.c..', 'cccc']], [9, 5, ['c']]),
    think: all(h, [5, 10, ['we', 'ee', 'ee', 'bb']], [18, 10, ['we', 'ee', 'ee', 'bb']], [11, 15, ['CCC']], [12, 4, ['u']], [14, 2, ['u']]),
    fidget: all(h, [23, 0, ['__']], [22, 1, ['ooo']]),
    fidget2: all(h, ...hFlap, [0, 0, ['__']], [0, 1, ['oo']]),
  };

  // ---- III · Dunewise (28×22) ----
  const d = [
    '.ddd.oo.................oo..',
    'dD.dDoro...............oro..',
    'dD.dDorro.............orro..',
    '.o.dDolrro...........orrdo..',
    'oyodDolrrco.........ocrrdo..',
    'yyYdD.olrrcco.....occrrdo...',
    '.e.dD.olrcccbooooobcccrdo...',
    '...dD..olccbbblllbbbccdo....',
    '...dD...olbddbbbbbddbdo..sss',
    'ss.dD...olbwebbbbbwebdo.....',
    '...dD...olpeebcccbeepdo....s',
    '...dD....olbcccecccbdo......',
    '.s.oooo...odcccCcccdo....oo.',
    '..oblbo.ottttttttttttto.occo',
    '..obbbtooTttttTyTttttTtobcco',
    '...ootTttossTtssStTSSSdobbco',
    '...dDooooossTtssStTSSSdobdbo',
    'S.sdD.olssssTtssStTSSSSdodo.',
    '...dD.olssssTtssStTSSSSdoo..',
    '...dDolsssssyyssSyySSSSSdoss',
    '...dDoSYYYYYYYYYYYYYYYYYxoSs',
    'sSsdDooooooooooooooooooooo..',
  ];
  const dShut = [[11, 8, ['bb', 'bb', 'ee']], [18, 8, ['bb', 'bb', 'ee']]];
  const dJoy = [[11, 8, ['bb']], [18, 8, ['bb']], [10, 9, ['beeb', 'ebbe']], [17, 9, ['beeb', 'ebbe']]];
  const dOpen = [14, 12, ['opo']];
  // Sand drifts one pixel downwind; the bell swings.
  const dGust = [[0, 9, ['_ss']], [1, 12, ['_s']], [0, 17, ['_S.s']], [25, 8, ['_sss']], [26, 10, ['s_']], [26, 19, ['_s']], [25, 20, ['_sS']], [0, 21, ['ssS']]];
  const dSwing = [[0, 3, ['_o_', 'oyo', 'Yyy', 'e__']]];
  const dRing = [[0, 7, ['y.y']], [0, 8, ['.y.']]];
  const D = {
    idle: d,
    idle2: all(d, ...dGust, ...dSwing),
    blink: all(d, ...dShut),
    talk: all(d, dOpen),
    talk2: all(d, [15, 12, ['o']]),
    happy: all(d, ...dJoy, dOpen),
    happy2: all(d, ...dJoy, dOpen, ...dGust, ...dSwing, ...dRing),
    sleep: all(d, ...dShut, [13, 0, ['cccc', '...c', '..c.', '.c..', 'cccc']]),
    sleep2: all(d, ...dShut, ...dGust, [14, 0, ['cccc', '...c', '..c.', '.c..', 'cccc']], [12, 4, ['c']]),
    think: all(d, [11, 8, ['we', 'ee', 'bb']], [18, 8, ['we', 'ee', 'bb']], [17, 3, ['y']], [19, 1, ['y']]),
    fidget: all(d, [24, 0, ['__']], [23, 1, ['ooo']]),
    fidget2: all(d, ...dRing),
  };

  PatchDex.evolve('hush', {
    habit: 'prompting',
    stages: [
      {
        name: 'Hushara',
        species: 'scarf-tailed fennec',
        blurb: 'Its ears outgrew its head and its scarf caught the wind. It hears the vague part of a request and asks about that first.',
        voice: 'one question first: who is this for, and what changes if it works?',
        evolve: 'Hush\'s ears stretched long and it took up a scarf for the wind, because you kept asking before assuming.',
        palette: { u: '#8fe3e6' },
        sprites: H,
        loop: [['idle', 24], ['blink', 2], ['idle', 12], ['idle2', 4], ['idle', 2], ['idle2', 4], ['idle', 16], ['fidget', 3], ['idle', 10],
          ['blink', 2], ['idle', 8], ['fidget2', 4], ['idle', 10], ['think', 12], ['idle', 8]],
      },
      {
        name: 'Dunewise',
        species: 'desert sage fox',
        blurb: 'Walks the dunes in a robe with a small bell on its staff. It rings once before answering, so the question gets heard in full.',
        voice: 'say what done looks like. i\'ll wait for the sand to settle.',
        evolve: 'Hushara took up a staff and a bell and went quiet, because your prompts got precise enough to need no follow-up.',
        palette: { y: '#f6cf5a', Y: '#c98f2e', s: '#e3c08e', S: '#c39a62', x: '#9c7446' },
        sprites: D,
        loop: [['idle', 20], ['idle2', 4], ['idle', 16], ['blink', 2], ['idle', 10], ['idle2', 4], ['idle', 14], ['fidget', 3], ['idle', 10],
          ['fidget2', 4], ['idle', 12], ['blink', 2], ['idle', 8], ['think', 14], ['idle', 8]],
      },
    ],
  });
})();
