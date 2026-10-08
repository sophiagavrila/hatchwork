// Scout, grown: a ranger pup reading a map through a magnifier (II), then a tracking hound with lantern, compass and pack (III).
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
    '........OOOOOOOO........',
    '.....OOOlllWWlbbOOO.....',
    '..OOOKOOOllWWllbbbKOOO..',
    '.OmmmOgggOlWWlkkkbKkkkO.',
    'OmmmOgwgggOWWkkkkkKkkkkO',
    'OmmkOgweegOWWkwekkKkkkkO',
    'OmmkOgeeegOWWkeekkKkkkkO',
    'OmkkOgeeegOWWWeekkKkkkkO',
    'OmkkkOgggOWeeWWWWpKkkkkO',
    'OkkyOOOOOWWWWWWWWbOKkkkO',
    '.OWyOOdcWWWWWWWWcdOKkkO.',
    'OWWcOOrrrrrrrrrrrROOOO..',
    '.OOOOlrrWrrrrrrWrRdO....',
    '....OlbrrWrrrrWrROOO.OO.',
    '....OlbWWWrrRRWWdOWWOWO.',
    '..OOOOOOOOOOOOOOOOcWOdO.',
    '.OPPPPqPPPPPPqPPrPrPqO..',
    '.OPrPPqPPGGPPqPPPrPPqO..',
    '.OPPPrqrGPPGPqrPrPrPqO..',
    '.OqqqqqqqqqqqqqqqqqqqO..',
    '..OOOOOOOOOOOOOOOOOOO...',
  ];

  // ---- III ----
  const base3 = [
    '.OOOOOOOO.OOOOOOOO.OOOOOOOO.',
    'OnnnKnnOOOlllWWllbbbOnnKnnnO',
    'ONnnKOOllllllWWllbbbbOOKnnNO',
    '.OOOOKlllllllWWllllbblKOOOO.',
    '.OmmmKlllllllWWlkkkkklKkkkO.',
    'OmmmkKlllllllWWkkkkkkkKkkkkO',
    'OmmkkKllwelllWWkkkwekkKkkkkO',
    'OmmkkKlleelllWWkkkeekkKkkkkO',
    'OmkkkKlleellWWWWkkeekkKkkkkO',
    'OmkkkKlpWWWWWWWWWkkkplKkkkkO',
    'OmkkkKbWWWWWeKeeWWWWWbKkkkkO',
    'OkkkKObWWWWWWeeWWWWWWbOKkkkO',
    'OkkkKOdcWWWWWWWWWWWWcdOKkkkO',
    '.OkkKOOrrrrrrrrrrRrrrOOKkkO.',
    '.OkkKOlrrWYYrrRrrrWrrdOKkkO.',
    '..OkKOlbrOOOOWWRrrrRddOKkO..',
    '...OOOlbOPPPrOWWRrrWddOOO...',
    '.....OlbOPPrPOWWWWWWddO.....',
    '.....OlbOPKPPOWWWWWdddO.....',
    '.....OlbdOOOOccWWWWdddO.....',
    '.....OWcOWWWWccWWWWOcWO.....',
    '.....OOOOOOOOOOOOOOOOOO.....',
  ];

  const dots = (g, pts) => pts.reduce((o, [x, y, c]) => put(o, x, y, [c]), g);
  const zee = (x, y, c) => [[x, y, c.repeat(4)], [x + 2, y + 1, c], [x + 1, y + 2, c], [x, y + 3, c.repeat(4)]];

  // II: the left eye is seen through the magnifier, so it is drawn big (3x3) inside the lens.
  const lens = (g, rows) => put(g, 6, 5, rows);
  const eye2 = (g, rows) => put(g, 14, 4, rows);
  const blink2 = eye2(lens(idle2a, ['ggg', 'eee', 'ggg']), [' ', 'kk', 'ee', 'kk']);
  const happy2a = put(put(put(idle2a, 5, 5, [' eee ', 'eggge', ' ggg ']), 13, 4, ['', ' ee ', 'ekke', ' kk ']), 10, 9, ['eppe']);
  const wag = g => put(g, 20, 12, ['..OO', ' OWO', 'OWO.']);
  const nap = g => ['.'.repeat(24), '.'.repeat(24), ...g.slice(0, 13), ...idle2a.slice(15)];
  const asleep2 = nap(eye2(lens(idle2a, ['ggg', 'ggg', 'eee']), [' ', 'kk', 'kk', 'ee']));
  const sprites2 = {
    idle: idle2a,
    blink: blink2,
    talk: put(put(idle2a, 10, 9, ['eppe']), 11, 10, ['ee']),
    talk2: put(idle2a, 11, 9, ['ee']),
    happy: happy2a,
    happy2: wag(put(happy2a, 11, 10, ['pp'])),
    think: dots(eye2(put(idle2a, 6, 4, ['eee', 'eew', 'eee', 'ggg']), ['ee', 'ew', 'ee', 'kk']), [[19, 0, 'W'], [21, 0, 'W'], [23, 0, 'W']]),
    sleep: dots(asleep2, zee(20, 0, 'W')),
    sleep2: dots(asleep2, zee(20, 0, 'c')),
    fidget: wag(eye2(lens(idle2a, ['eew', 'eee', 'eee']), [' ', 'ew'])),
  };

  // III: the lantern and the paw holding it are one piece, so it can swing.
  const LANTERN = [
    ' OWWO  ',
    'OWccWO ',
    '  OYYO ',
    ' OYYYYO',
    ' OywwyO',
    ' OywwyO',
    ' OyyyYO',
    ' OYYYYO',
    '  OOOO ',
  ];
  const DIM = LANTERN.map(r => r.replace(/y/g, 'Y').replace(/w/g, 'y'));
  const idle3a = put(base3, 17, 12, LANTERN);
  const eyes3 = (g, l, r) => put(put(g, 8, 5, l), 18, 5, r || l.map(x => x.replace(/l/g, 'k')));
  const asleep3 = put(eyes3(put(base3, 17, 12, DIM), [' ', 'll', 'll', 'ee']), 12, 12, ['WWWW']);
  const happy3 = put(put(put(idle3a, 7, 5, ['', ' ee ', 'elle', ' ll ']), 17, 5, ['', ' ee ', 'ekke', ' kk ']), 12, 12, ['eppe']);
  const sprites3 = {
    idle: idle3a,
    blink: eyes3(idle3a, [' ', 'll', 'ee', 'll']),
    talk: put(idle3a, 12, 12, ['eppe']),
    talk2: put(idle3a, 13, 12, ['ee']),
    happy: happy3,
    happy2: dots(happy3, [[25, 16, 'y'], [26, 18, 'w'], [25, 20, 'y']]),
    think: put(eyes3(idle3a, ['ee', 'ew', 'ee', 'll'], ['ee', 'ew', 'ee', 'kk']), 12, 10, ['eeKe']),
    sleep: dots(asleep3, zee(24, 17, 'W')),
    sleep2: dots(asleep3, zee(24, 17, 'c')),
    fidget: put(eyes3(base3, [' ', 'ew', 'ee'], [' ', 'ew', 'ee']), 18, 12, LANTERN),
  };
  const LOOP = [['idle', 28], ['blink', 2], ['idle', 18], ['fidget', 4], ['idle', 14], ['blink', 2], ['idle', 10], ['think', 12], ['idle', 8]];

  PatchDex.evolve('scout', {
    habit: 'research',
    stages: [
      {
        name: 'Rangerpup', species: 'map-reading ranger pup',
        blurb: 'Rangerpup holds a magnifier to one eye, so that eye looks huge, and it rests a paw on an open trail map. It marks the X on the map before it lifts a single paw to dig.',
        voice: 'read the map first. the docs usually know where it is buried.',
        evolve: 'The nose got a lens and a map to go with it: you started reading the code and docs closely before asking for a change.',
        palette: { g: '#cfeef5', G: '#7fb6c9', y: '#f6cf5a', Y: '#b8862b', P: '#f4e4b8', q: '#c9a46a' },
        sprites: sprites2,
        loop: LOOP,
      },
      {
        name: 'Trailhound', species: 'lantern-bearing tracking hound',
        blurb: 'Trailhound has long ears, a keen nose and a bedroll packed for the trip. It carries a lit lantern into dark corners and checks its compass before following any lead.',
        voice: 'follow the lead, then check the source. a trail is only as good as its tracks.',
        evolve: 'The map became a compass and the lens became a lantern: you now track a question to its source and verify what you find there.',
        palette: { y: '#ffd866', Y: '#c48a2c', P: '#f4e4b8', n: '#7a8f4e', N: '#4f6236' },
        sprites: sprites3,
        loop: LOOP,
      },
    ],
  });
})();
