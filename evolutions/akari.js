// Akari evolutions. II Michibi: a grown Inari fox with five foxfire-tipped tails, each flame a path it has scouted.
// III Kokonobi: nine burning tails fanned like a halo, the hoshu jewel aflame overhead, perched on its torii's kasagi.
(function () {
  // [x, y, 'chars'] edits; ' ' leaves the pixel, '_' clears it.
  const set = (base, edits) => {
    const g = base.map(r => [...r]);
    edits.forEach(([x, y, s]) => [...s].forEach((ch, i) => {
      if (ch !== ' ' && g[y] && g[y][x + i] !== undefined) g[y][x + i] = ch === '_' ? '.' : ch;
    }));
    return g.map(r => r.join(''));
  };
  const art = (x, y, rows) => rows.map((r, j) => [x, y + j, r]);
  const at = (dx, dy, edits) => edits.map(([x, y, s]) => [x + dx, y + dy, s]);
  const hop = base => [...base.slice(1), '.'.repeat(base[0].length)];

  // Face edits shared by both forms, in head coordinates (II head sits at 0,0; III at 6,1).
  // Eyes cols 3-4 / 10-11 rows 9-11, liner row 8, nose row 12, mouth row 13, bib from row 14.
  const SHUT = [[3, 9, 'WW'], [10, 9, 'WW'], [3, 10, 'WW'], [10, 10, 'WW']];
  const GLAD = [[2, 9, 'WWWW'], [9, 9, 'WWWW'], [2, 11, 'eWWe'], [9, 11, 'eWWe'], [3, 12, 'p'], [11, 12, 'p']];
  const UP = [[3, 9, 'eh'], [10, 9, 'eh'], [3, 11, 'WW'], [10, 11, 'WW']];
  const GLANCE = [[2, 9, 'heW'], [9, 9, 'heW'], [2, 10, 'eeW'], [9, 10, 'eeW'], [2, 11, 'eeW'], [9, 11, 'eeW']];
  const SAY = [[6, 13, 'eee'], [7, 14, 'e']];
  const SAY2 = [[6, 13, 'epe']];
  const GRIN = [[6, 13, 'eee'], [6, 14, 'epe']];

  // ---------------- II · Michibi ----------------
  // Tail flames lean right in idle and left in idle2: the foxfire flickers.
  const idle2 = [
    '.o...........o.ocBoco....',
    '.oo.........oooBhScBo....',
    '.oWo.......osoWnSBhco.o..',
    '.oWvo.....ovsoWSSncBooco.',
    '.oWpvo...opvsoSWWWnsocBo.',
    '.oWvvWoooWvvsoSWWssSBhco.',
    '.oWWWWWvWWWWsoWWWsSoncBo.',
    'oWWWWWvpvWWWWsoWsSWWWnoo.',
    'oWvvWWWWWWWvvsosSWWWssoco',
    'oWWheWWWWWheWsoSWWWssScBo',
    'oWWeeWWWWWeeWsoWWWssSBhco',
    'ooWeeWWWWWeeWooWWSSSWncBo',
    '.ooWWWWkWWWWooWSSWWWWWnSo',
    '..ooWWeWeWWooWSWWWWWWsSco',
    '..oVvvvvvvvVoSSSSSSSSScBo',
    '..oWVvvYvvVsoWWWWWWWWBhco',
    '.oWWWVvyvVWssoWWWWWWWncBo',
    '.oWWWWVvVWWssoWWWWWWWsno.',
    '.oWWsWWVWWsWsoWWWWWWsso..',
    '.oWWsWWWWWsWsoWWWWssso...',
    '.oooooooooooooooooooo....',
  ];
  const flick2 = [
    '.o...........ooBSco......',
    '.oo.........ooocSBco.....',
    '.oWo.......osoWBSchBo....',
    '.oWvo.....ovsoWSSBcSco...',
    '.oWpvo...opvsoSWWWnSBco..',
    '.oWvvWoooWvvsoSWWssSchBo.',
    '.oWWWWWvWWWWsoWWWsSoBcno.',
    'oWWWWWvpvWWWWsoWsSWWWSo..',
    'oWvvWWWWWWWvvsosSWWWSco..',
    'oWWheWWWWWheWsoSWWWsSBco.',
    'oWWeeWWWWWeeWsoWWWssSchBo',
    'ooWeeWWWWWeeWooWWSSSWBcno',
    '.ooWWWWkWWWWooWSSWWWWSnWo',
    '..ooWWeWeWWooWSWWWWWScSo.',
    '..oVvvvvvvvVoSSSSSSSSBco.',
    '..oWVvvYvvVsoWWWWWWWWchBo',
    '.oWWWVvyvVWssoWWWWWWWBcno',
    '.oWWWWVvVWWssoWWWWWWWsno.',
    '.oWWsWWVWWsWsoWWWWWWsso..',
    '.oWWsWWWWWsWsoWWWWssso...',
    '.oooooooooooooooooooo....',
  ];
  const zed2 = c => art(5, 0, [c.repeat(4), '..' + c + '.', '.' + c + '..', c.repeat(4)]);
  const II = {
    name: 'Michibi',
    species: 'inari pathfire fox',
    blurb: 'Akari grew into its markings and two more tails. Every flame is a route it has already scouted, and it will not set off until it has seen where at least two of them lead.',
    voice: 'two paths lit. now we can actually compare them.',
    evolve: 'You started laying out options before committing to one, and the foxfire learned to split.',
    palette: {},
    sprites: {
      idle: idle2,
      idle2: flick2,
      blink: set(idle2, SHUT),
      talk: set(idle2, SAY),
      talk2: set(flick2, SAY2),
      happy: set(idle2, [...GLAD, ...art(6, 0, ['.c.', 'chc', '.c.'])]),
      happy2: hop(set(flick2, [...GLAD, ...GRIN])),
      sleep: set(idle2, [...SHUT, ...zed2('c')]),
      sleep2: set(flick2, [...SHUT, ...zed2('n')]),
      think: set(idle2, [...UP, [6, 0, 'YY'], [5, 1, 'Y..Y'], [7, 2, 'Y'], [7, 4, 'Y']]),
      fidget: set(idle2, [...GLANCE, [1, 0, '_'], [1, 1, '__'], [1, 2, '_o'], [5, 3, 'o']]),
    },
    loop: [['idle', 20], ['idle2', 6], ['idle', 14], ['blink', 2], ['idle', 10], ['idle2', 6], ['idle', 12], ['fidget', 6],
      ['idle', 12], ['blink', 2], ['idle', 10], ['think', 10], ['idle2', 6], ['idle', 8]],
  };

  // ---------------- III · Kokonobi ----------------
  const idle3 = [
    '......oco...oco.....oco.....',
    '.....ocoo..oBcBo...ocBo.....',
    '....oShoo...oYo...oohcoo....',
    '....ocSoWo.oYhYo.osocBoco...',
    '...ocBSoWvooYYyoovsonocBo...',
    '..oBhcSoWpvooyoopvsoSBhco...',
    '..oncBSoWvvWoooWvvsoSncBo...',
    '..oSnssoWWWWWvWWWWsossnsoo..',
    '..ocSsoWWWWWvYvWWWWsosssoco.',
    '.ocBSsoWvvWWWWWWWvvsossScBo.',
    'oBhcSSoWWheWWWWWheWsoSSBhco.',
    'oncBWWoWWeeWWWWWeeWsoWWncBo.',
    '.onSssooWeeWWWWWeeWoosssno..',
    '.oScSssooWWWWkWWWWoossssSco.',
    '.ocBSSSSooWWeWeWWooSSSSScBo.',
    'oBhcWWWWoVvvvvvvvVoWWWWBhco.',
    'oncBWWWWoWVvvYvvVsoWWWWncBo.',
    '.onssssoWWWVvyvVWssossssno..',
    'opsssssoWWWWVvVWWssossssspo.',
    'ovvooooooooooooooooooooovvo.',
    'ovpvvvvvvvvvvvvvvvvvvvvvpvo.',
    '.oVVVVoVVVVVVVVVVVVVoVVVVo..',
  ];
  const flick3 = [
    '....oco.....oco...oco.......',
    '....oBco...oBcBo..ooco......',
    '...oochoo...oYo...oohSo.....',
    '..ocoBcoWo.oYhYo.osoSco.....',
    '..oBconoWvooYYyoovsoSBco....',
    '..ochBSoWpvooyoopvsoSchBo...',
    '..oBcnSoWvvWoooWvvsoSBcno...',
    '.oosnssoWWWWWvWWWWsossnSo...',
    'ocosssoWWWWWvYvWWWWsosSco...',
    'oBcSssoWvvWWWWWWWvvsosSBco..',
    'ochBSSoWWheWWWWWheWsoSSchBo.',
    'oBcnWWoWWeeWWWWWeeWsoWWBcno.',
    '.onsssooWeeWWWWWeeWoossSno..',
    'ocSssssooWWWWkWWWWoossScSo..',
    'oBcSSSSSooWWeWeWWooSSSSBco..',
    'ochBWWWWoVvvvvvvvVoWWWWchBo.',
    'oBcnWWWWoWVvvYvvVsoWWWWBcno.',
    '.onssssoWWWVvyvVWssossssno..',
    'opsssssoWWWWVvVWWssossssspo.',
    'ovvooooooooooooooooooooovvo.',
    'ovpvvvvvvvvvvvvvvvvvvvvvpvo.',
    '.oVVVVoVVVVVVVVVVVVVoVVVVo..',
  ];
  const F = edits => at(6, 1, edits);
  // The fox and its tails hop; the torii beam stays put.
  const lift = base => [...base.slice(1, 19), base[18], ...base.slice(19)];
  const zed3 = c => art(0, 0, [c.repeat(4), '..' + c + '.', '.' + c + '..', c.repeat(4)]);
  const sparks3 = [...art(0, 0, ['.c.', 'chc', '.c.']), ...art(24, 0, ['.c.', 'chc', '.c.'])];
  const dimJewel = [[11, 0, '.ono.'], [11, 1, 'onBno'], [13, 3, 'y']];
  const III = {
    name: 'Kokonobi',
    species: 'nine-fire torii fox',
    blurb: 'Nine tails, nine fires, perched on the top beam of its own torii with the wish-jewel burning overhead. Kokonobi has already walked every path in foxfire and only brings you the ones worth taking.',
    voice: 'nine paths lit. eight were dead ends. here is the one.',
    evolve: 'Weighing alternatives became reflex: you plan wide, prune fast, and commit to the path that survived.',
    palette: {},
    sprites: {
      idle: idle3,
      idle2: flick3,
      blink: set(idle3, F(SHUT)),
      talk: set(idle3, F(SAY)),
      talk2: set(flick3, F(SAY2)),
      happy: set(idle3, [...F(GLAD), ...sparks3]),
      happy2: lift(set(flick3, [...F(GLAD), ...F(GRIN), ...sparks3])),
      sleep: set(idle3, [...F(SHUT), ...dimJewel, ...zed3('c')]),
      sleep2: set(flick3, [...F(SHUT), ...dimJewel, ...zed3('n')]),
      think: set(idle3, [...F(UP), [24, 0, 'YY'], [23, 1, 'Y..Y'], [25, 2, 'Y'], [25, 4, 'Y']]),
      fidget: set(flick3, F(GLANCE)),
    },
    loop: [['idle', 22], ['idle2', 6], ['idle', 14], ['blink', 2], ['idle', 10], ['idle2', 6], ['idle', 12], ['fidget', 6],
      ['idle', 12], ['blink', 2], ['idle', 10], ['think', 10], ['idle2', 6], ['idle', 8]],
  };

  PatchDex.evolve('akari', { habit: 'planning', stages: [II, III] });
})();
