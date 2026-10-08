// Tock evolutions. II Tachy: the watch becomes a chronograph with start/stop pushers and a jeweler's loupe.
// III Grandtock: a twin-bell regulator with an open movement and a jeweler's loupe — the clock others are set by.
(function () {
  const G = rows => rows.map(r => [...r]);
  const R = g => g.map(r => r.join(''));
  const set = (base, edits) => {
    const g = G(base);
    edits.forEach(([x, y, s]) => [...s].forEach((ch, i) => { if (ch !== ' ' && g[y] && g[y][x + i] !== undefined) g[y][x + i] = ch; }));
    return R(g);
  };
  const sink = (base, row) => ['.'.repeat(base[0].length), ...base.slice(0, row), ...base.slice(row + 1)];

  // ---------------- II · Tachy ----------------
  // Chronograph case: bow + crown, start (left) and reset (right) pushers, 2px bezel, cream dial.
  const idle2Raw = [
    '......nnn................',
    '.....nY.Bn...............',
    '......nbn......L......L..',
    '.nn..nyYBn..nn..m....m...',
    'nYyn.nnnnn.nybn..m..m....',
    '.nbnnYYYYynnBn..oooooo...',
    '..nYYYYYYyyyn..oLLLllmo..',
    '.nYYYCCCCcyybnoLLllllmmo.',
    '.nYYCCcccccbbnoLlllbyybo.',
    'nYYCccccccccbbnlwelywebo.',
    'nYYCccccccccbbnleelyeebo.',
    'nYYCccccccccBBnleelbeeBo.',
    'nYYCccccccccBBnplllBBBBo.',
    'nyycccccccccBBnlllollpmo.',
    '.nyycccccccBBnolllllllmo.',
    '.nyybcccccBBBnolllllllmo.',
    '..nbbbbBBBBBnollllllllmmo',
    '.oonnbbBBBnnollllllllllmo',
    'oLllnnnnnnmmlllllllllllmo',
    '.ommMMMMMMMMMMMMMmmmmmmmo',
    '..oooooooooooooooooooooo.',
  ];
  // Hands: center (7,10). minute 3px, hour 2px (ink), sweep 3px (red).
  const D2 = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
  const DIAL2 = (() => { const g = G(idle2Raw); return g; })();
  const hands2 = (base, m, h = 2, sw = 5) => {
    const g = G(base);
    for (let y = 6; y < 18; y++) for (let x = 1; x < 14; x++) if ('erB'.includes(g[y][x]) && 'cC'.includes(DIAL2[y][x])) g[y][x] = DIAL2[y][x];
    const ray = (d, n, ch) => { for (let i = 1; i <= n; i++) { const x = 7 + D2[d][0] * i, y = 11 + D2[d][1] * i; if ('cC'.includes(g[y][x]) || 'erB'.includes(g[y][x])) g[y][x] = ch; } };
    ray(sw % 8, 4, 'r'); ray(h % 8, 2, 'e'); ray(m % 8, 3, 'e');
    g[11][7] = 'e';
    [[7, 7], [11, 11], [7, 15], [3, 11]].forEach(([x, y]) => { if (g[y][x] === 'c' || g[y][x] === 'C') g[y][x] = 'B'; });
    return R(g);
  };
  const base2 = hands2(idle2Raw, 0, 2, 5);
  // Face rows (cols 15-22). Eye 2 sits behind the loupe ring (cols 19-22, rows 8-12).
  const face2 = (rows, y0 = 9) => rows.map((r, i) => [15, y0 + i, r]);
  const Z1 = ['zzzz', '...z', '..z.', '.z..', 'zzzz'];
  const Z2 = ['zzz', '..z', '.z.', 'zzz'];
  const noFeelers2 = [[15, 2, '.......'], [16, 3, '......'], [17, 4, '....']];
  const eyesShut2 = face2(['llllylLb', 'llllyllb', 'leelbeeB']);
  const blink2 = set(base2, eyesShut2);
  const talk2a = set(base2, face2(['llooolpm', 'llopolmm', 'lllolllm'], 13));
  const talk2b = set(base2, [...face2(['lloooopm', 'lllllllm'], 13), [15, 2, '.L....L.'], [15, 3, '..m..m..']]);
  const happyFace2 = [...face2(['leelyeeb', 'elleyllb', 'llllbllB', 'plllBBBB', 'llepeppm', 'lllelllm']), [15, 2, 'L......L'], [16, 3, 'm....m'], [17, 4, 'm..m']];
  const happy2a = set(hands2(idle2Raw, 0, 2, 0), happyFace2);
  const happy2b = sink(set(hands2(idle2Raw, 1, 2, 1), happyFace2), 18);
  const sleepBase2 = set(hands2(idle2Raw, 0, 0, 0), [...noFeelers2, ...eyesShut2, ...face2(['lllellpm'], 13)]);
  const sleep2a = set(sleepBase2, Z1.map((r, i) => [18, i, r]));
  const sleep2b = set(sleepBase2, Z2.map((r, i) => [19, i + 1, r]));
  const think2 = set(hands2(idle2Raw, 7, 2, 4), [
    ...face2(['wellyweb', 'eellyeeb', 'llllbllB', 'plllBBBB', 'llllolpm']),
    [22, 0, 'zz'], [24, 1, 'z'], [23, 2, 'z'], [23, 4, 'z'],
  ]);
  // Fidget: thumbs the start pusher (it sinks into the case) and the sweep hand jumps.
  const fidget2 = set(hands2(idle2Raw, 0, 2, 7), [[0, 3, '....'], [0, 4, '.nn.'], [1, 5, 'nYn'], [15, 2, '.L.....L'], [16, 3, 'm....m.']]);
  // The chronograph runs: the red sweep hand walks the dial.
  const run2 = [0, 1, 2, 3, 4, 5, 6, 7].map(i => hands2(idle2Raw, 0, 2, i));

  const II = {
    name: 'Tachy',
    species: 'chronograph snail',
    blurb: 'Tock grew pushers. One starts the clock, one stops it, and nothing ships until both have been pressed.',
    voice: 'baseline first. then the change. then the same run again.',
    evolve: 'The watch became a stopwatch: you stopped guessing at speed and started timing before and after.',
    palette: { r: '#e0524a' },
    sprites: {
      idle: base2, idle2: run2[6], blink: blink2, talk: talk2a, talk2: talk2b, happy: happy2a, happy2: happy2b,
      sleep: sleep2a, sleep2: sleep2b, think: think2, fidget: fidget2,
      run7: run2[7], run0: run2[0], run1: run2[1], run2: run2[2], run3: run2[3], run4: run2[4],
    },
    loop: [['idle', 8], ['idle2', 8], ['run7', 8], ['run0', 6], ['blink', 2], ['run0', 2], ['run1', 8], ['run2', 8], ['run3', 8], ['run4', 8],
      ['idle', 8], ['idle2', 8], ['fidget', 4], ['run0', 8], ['run1', 8], ['think', 14], ['run2', 6], ['run3', 8], ['run4', 8]],
  };
  // ---------------- III · Grandtock ----------------
  const idle3Raw = [
    '..nn....nnn....nn...........',
    '.nYyn..nY.Bn..nYyn.Y.....Y..',
    'nYYybn..nbn..nYYybnm.....m..',
    'nnnnnn.nyYBn.nnnnnn.m...m...',
    '....n.nnnnnnn.n......m.m....',
    '....nnYYYYYYynn....ooooooo..',
    '...nYYYYYYYyyyyn..oLLLlllmo.',
    '..nYYYcccBcccyyynoYYyyyybbBo',
    '..nYYckBkkkkkcbbnoLllllllBmo',
    '.nYYckbYbkkkkkcbbnllllbyybmo',
    '.nYYcbYrykkkkkcbbnlwelywebmo',
    '.nYYckbyBkkkkkcbbnleelyeebmo',
    '.nYYBkkkkkkkkkBBBnleelbeeBmo',
    '.nYYckkkkkkkkkcBBnplllBBBBpo',
    '.nYyckkkkkbYbkcBBnlllollllmo',
    '.nyyckkkkkYrYkcBBnllllllllmo',
    '..nyyckkkkbYbcBBnolllllllmmo',
    '..nyybcccBcccBBBnllllllllmmo',
    '.oonybbbbBBBBBBnlllllllllmmo',
    'oLllnnbbbBBBBnnllllllllllmo.',
    '.ommMMnnnnnnnMMMMMMMMmmmmmmo',
    '..ooooooooooooooooooooooooo.',
  ];
  // Open movement: cream hands over the dark works, red sweep, brass pivot at (9,12).
  const hands3 = (m, h = 2, sw = 5, base = idle3Raw) => {
    const g = G(base);
    const ray = (d, n, ch) => { for (let i = 1; i <= n; i++) { const x = 9 + D2[d][0] * i, y = 12 + D2[d][1] * i; if (!'nyYbB'.includes(g[y][x]) || i < n) g[y][x] = ch; } };
    ray(sw % 8, 4, 'r'); ray(h % 8, 2, 'w'); ray(m % 8, 3, 'w');
    g[12][9] = 'Y';
    return R(g);
  };
  // Balance wheel at (11,15): two phases read as a spin.
  const WHEEL = [['bYb', 'YrY', 'bYb'], ['YbY', 'brb', 'YbY']];
  const wheel = (base, k) => set(base, WHEEL[k % 2].map((r, i) => [10, 14 + i, r]));
  const at3 = (m, h, sw, k = 0) => wheel(hands3(m, h, sw), k);
  // Bells lean toward the bow ring when they ring.
  const ringBells = base => {
    const g = G(base);
    for (let y = 0; y < 3; y++) {
      for (let x = 5; x > 0; x--) g[y][x] = g[y][x - 1];
      g[y][0] = '.';
      for (let x = 13; x < 18; x++) g[y][x] = g[y][x + 1];
      g[y][18] = '.';
    }
    return R(g);
  };
  const face3 = (rows, y0 = 10) => rows.map((r, i) => [18, y0 + i, r]);
  const eyesShut3 = face3(['llllylLb', 'llllyllb', 'leelbeeB']);
  const noFeelers3 = [[19, 1, '.......'], [19, 2, '.......'], [20, 3, '.....'], [21, 4, '...']];
  const base3 = at3(0, 2, 5, 0);
  const idle3b = at3(0, 2, 4, 1);
  const blink3 = set(base3, eyesShut3);
  const talk3 = set(base3, face3(['llooolll', 'llopolll', 'lllollll'], 14));
  const talk3b = set(at3(0, 2, 5, 1), [...face3(['lloooool', 'llllllll'], 14), [19, 1, 'Y.....Y'], [19, 2, '.m...m.'], [20, 3, 'm...m']]);
  const happyFace3 = face3(['leelyeeb', 'elleyllb', 'llllbllB', 'plllBBBB', 'llololll', 'lllollll'], 10);
  const SPARK = [[[6, 0, 'Y'], [12, 1, 'Y'], [27, 0, 'Y']], [[5, 4, 'Y'], [13, 4, 'Y'], [17, 0, 'Y']]];
  const happy3 = set(ringBells(at3(0, 2, 0, 0)), [...happyFace3, ...SPARK[0]]);
  const happy3b = sink(set(at3(1, 2, 1, 1), [...happyFace3, ...SPARK[1]]), 19);
  const sleepBase3 = set(at3(0, 0, 0, 0), [...noFeelers3, ...eyesShut3, ...face3(['lllellll'], 14)]);
  const sleep3 = set(sleepBase3, Z1.map((r, i) => [21, i, r]));
  const sleep3b = set(sleepBase3, Z2.map((r, i) => [22, i + 1, r]));
  const think3 = set(at3(7, 2, 4, 1), [
    ...face3(['wellyweb', 'eellyeeb', 'llllbllB', 'plllBBBB', 'llllolll']),
    [24, 0, 'zz.'], [24, 1, '..z'], [24, 2, '.z.'], [24, 3, '...'], [24, 4, '.z.'],
  ]);
  const fidget3 = set(ringBells(at3(0, 2, 7, 1)), [[19, 1, '.Y.....Y'], [19, 2, '.m.....m'], [20, 3, '.m...m']]);
  const run3 = [0, 1, 2, 3, 4, 5, 6, 7].map(i => at3(0, 2, i, i % 2));
  const III = {
    name: 'Grandtock',
    species: 'regulator clock snail',
    blurb: 'The clock every other clock in the shop is set by. Its movement is open, so anyone can check its work.',
    voice: 'show me the before number. now the after. now run it twice.',
    evolve: 'The case opened and grew alarm bells: you check your own work in plain sight, and regressions ring.',
    palette: { r: '#e0524a', k: '#2a1631' },
    sprites: {
      idle: base3, idle2: idle3b, blink: blink3, talk: talk3, talk2: talk3b, happy: happy3, happy2: happy3b,
      sleep: sleep3, sleep2: sleep3b, think: think3, fidget: fidget3,
      run7: run3[7], run0: run3[0], run1: run3[1], run2: run3[2], run3: run3[3], run4: run3[4],
    },
    loop: [['idle', 8], ['idle2', 8], ['run7', 8], ['run0', 6], ['blink', 2], ['run0', 2], ['run1', 8], ['run2', 8], ['run3', 8], ['run4', 8],
      ['idle', 8], ['idle2', 8], ['fidget', 4], ['run0', 8], ['run1', 8], ['think', 14], ['run2', 6], ['run3', 8], ['run4', 8]],
  };

  PatchDex.evolve('tock', { habit: 'verification', stages: [II, III] });
})();
