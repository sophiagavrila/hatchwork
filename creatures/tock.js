// Tock — pocket-watch snail. A lilac snail whose shell is a brass pocket watch: bow ring, crown, cream dial, hands.
(function () {
  const idle = [
    '......nnn.............',
    '.....nY.Bn............',
    '......nbn.............',
    '.....nyYBn.....L....L.',
    '.....nnnnn......m..m..',
    '...nnyYYyynn...oooooo.',
    '..nYyCCBccbbn.oLLlllmo',
    '..nyCccccccbnoLLllllmo',
    '.nyCcccecccbBolwelwemo',
    '.nyCccceccccBoleeleemo',
    '.nbBccceeeeBBoleeleemo',
    '.nbcccccccccBopllollpo',
    '.nbcccccccccBollllllmo',
    '..nbcccccccBolllllllmo',
    '..nbBccBccBBollllllmo.',
    '...nnBBBBBnnollllllo..',
    '.oooonnnnnooLlllllllo.',
    'oLllmmmmmmmllllllllllo',
    '.ommMMMMMMMMMmmmmmmmmo',
    '..ooooooooooooooooooo.',
  ];
  const W = idle[0].length;
  const G = rows => rows.map(r => [...r]);
  const R = g => g.map(r => r.join(''));
  // Write a string at (x, y); '.' clears, ' ' skips.
  const set = (base, edits) => {
    const g = G(base);
    edits.forEach(([x, y, s]) => [...s].forEach((ch, i) => { if (ch !== ' ' && g[y] && g[y][x + i] !== undefined) g[y][x + i] = ch; }));
    return R(g);
  };
  // Shift the head block (cols 13+, rows a..b) down by n; pads above with '.'.
  const headDown = (base, n, a = 3, b = 15) => {
    const g = G(base), src = G(base);
    for (let x = 13; x < W; x++) for (let y = a; y <= b; y++) {
      const s = y - n >= a ? src[y - n][x] : '.';
      g[y][x] = s;
    }
    return R(g);
  };
  // Squash: drop everything above `row` by 1px.
  const sink = (base, row) => ['.'.repeat(W), ...base.slice(0, row), ...base.slice(row + 1)];

  // Clock hands. Center (7,10); 8 directions, minute = 3px, hour = 2px.
  const DIRS = [
    [[7, 9], [7, 8], [7, 7]], [[8, 9], [9, 8], [10, 7]], [[8, 10], [9, 10], [10, 10]], [[8, 11], [9, 12], [10, 13]],
    [[7, 11], [7, 12], [7, 13]], [[6, 11], [5, 12], [4, 13]], [[6, 10], [5, 10], [4, 10]], [[6, 9], [5, 8], [4, 7]],
  ];
  const dial = (() => { const g = G(idle); for (let y = 6; y < 15; y++) for (let x = 2; x < 12; x++) if (g[y][x] === 'e') g[y][x] = 'c'; return g; })();
  const hands = (base, m, h = 2) => {
    const g = G(base);
    for (let y = 6; y < 15; y++) for (let x = 2; x < 12; x++) if (g[y][x] === 'e' || g[y][x] === 'c') g[y][x] = dial[y][x];
    DIRS[h % 8].slice(0, 2).forEach(([x, y]) => { g[y][x] = 'e'; });
    DIRS[m % 8].forEach(([x, y]) => { g[y][x] = 'e'; });
    g[10][7] = 'e';
    return R(g);
  };
  const BASE = hands(idle, 0, 2);

  // Face pieces (cols 14-20).
  const openEyes = [[14, 8, 'lwelwem'], [14, 9, 'leeleem'], [14, 10, 'leeleem']];
  const closedEyes = [[14, 8, 'llllllm'], [14, 9, 'llllllm'], [14, 10, 'leeleem']];
  const blink = set(BASE, closedEyes);
  const talk = set(BASE, [[14, 11, 'plooolp'], [14, 12, 'llopolm'], [14, 13, 'lllolll']]);
  const talk2 = set(BASE, [[14, 11, 'pllellp'], [14, 3, '.L....L'], [15, 4, '.m..m']]);
  const happyFace = [
    [14, 8, 'llllllm'], [14, 9, 'lelllem'], [14, 10, 'elelele'],
    [14, 11, 'plllllp'], [14, 12, 'llepelm'], [14, 13, 'lllelll'],
    [13, 3, '.L.....L'], [13, 4, '..m...m.'],
  ];
  const happy = set(hands(BASE, 0, 2), happyFace);
  const happy2 = sink(set(hands(BASE, 1, 2), happyFace), 16);
  const Z1 = ['zzzz', '...z', '..z.', '.z..', 'zzzz'];
  const Z2 = ['zzz', '..z', '.z.', 'zzz'];
  // Sleep: feelers tucked in, head droops 1px, eyes shut low.
  const sleepBase = headDown(set(BASE, [[14, 3, '.......'], [15, 4, '......'], ...closedEyes, [14, 11, 'plllllp']]), 1);
  const sleep = set(sleepBase, [[17, 0, Z1[0]], [17, 1, Z1[1]], [17, 2, Z1[2]], [17, 3, Z1[3]], [17, 4, Z1[4]]]);
  const sleep2 = set(sleepBase, [[18, 1, Z2[0]], [18, 2, Z2[1]], [18, 3, Z2[2]], [18, 4, Z2[3]]]);
  // Think: eyes roll up, mouth slides aside, a "?" appears, the minute hand creeps.
  const think = set(hands(BASE, 7, 2), [
    [14, 8, 'lweleem'], [14, 9, 'leeleem'], [14, 10, 'llllllm'], [14, 11, 'plllolp'],
    [10, 0, 'zz'], [12, 1, 'z'], [11, 2, 'z'], [11, 4, 'z'],
  ]);
  // Fidget: the bow swings right, feelers twitch, and the minute hand jumps a tick.
  const fidget = set(hands(BASE, 1, 2), [
    [5, 0, '..nnn.'], [5, 1, '.nY.Bn'], [5, 2, '..nbn.'],
    [14, 3, '..L....L'], [15, 4, '.m..m.'],
  ]);
  const idle2 = hands(BASE, 1, 2);

  // ---- entrance helpers ----
  // Egg outline/shell turn brass; the teal band becomes a cream window, the first hint of a dial.
  const BRASS_MAP = { 0: 'n', 1: 'y', 2: 'Y', 3: 'B', 4: 'c', 5: 'C', 6: 'b', 7: 'Y' };
  const isBrass = ch => 'nBbyYcCe'.includes(ch);
  // Shell alone: body pixels removed, open right edge re-outlined.
  const shellOnly = (() => {
    const g = G(BASE).map((r, y) => r.map((c, x) => (y <= 16 && x <= 12 && isBrass(c) ? c : '.')));
    for (let y = 0; y <= 16; y++) for (let x = 0; x < 12; x++) if (g[y][x] !== '.' && g[y][x] !== 'n' && g[y][x + 1] === '.') g[y][x + 1] = 'n';
    return R(g);
  })();
  // Body revealed up to column c (shell always drawn).
  const crop = (rows, c) => R(G(rows).map(r => r.map((ch, x) => (x <= c || isBrass(ch) && x <= 12 ? ch : '.'))));
  const REW = ['...y...y', '..yy..yy', '.yyy.yyy', '..yy..yy', '...y...y'];

  PatchDex.register({
    id: 'tock', name: 'Tock', species: 'pocket-watch snail', rarity: 'uncommon',
    blurb: 'A slow, patient snail carrying a brass pocket watch. It times everything before it touches anything.',
    coaching: 'Performance and patience: measure before you optimize, then measure again after.',
    voice: 'time it first. then we will know what is slow.',
    hatch: 'The egg cracks, rewinds itself whole, cracks again, rolls into a pocket watch, and Tock slides out.',
    palette: {
      n: '#4f2c12', B: '#a5651f', b: '#d99a32', y: '#f5cb5c', Y: '#fff2b0',
      c: '#fff4d6', C: '#e2c99a', e: '#22142a', w: '#ffffff',
      o: '#4a2752', M: '#8f5a9e', m: '#b985c4', l: '#dbb3e2', L: '#f5e1f5', p: '#ff9fbf',
      z: '#b9c6e6',
    },
    sprites: { idle: BASE, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 10], ['idle2', 10], ['idle', 10], ['blink', 2], ['idle2', 10], ['idle', 10], ['fidget', 3], ['idle2', 10], ['idle', 10], ['blink', 2], ['idle', 6], ['think', 12], ['idle2', 8]],
    entrance(k) {
      const out = k.eggIntro();
      const rew = g => k.stamp(g, REW, 1, 1);
      const brass = (dx, o = {}) => k.egg(k.EGG, dx, 0, { ...o, map: BRASS_MAP });
      const trail = (g, x1, glints) => {
        for (let x = 0; x <= x1; x++) k.px(g, x, 21, 'L');
        glints.forEach(([x, y, c]) => k.px(g, x, y, c));
        return g;
      };
      out.push(
        // Rewind: the crack plays backward, egg whole again.
        k.f(rew(k.sparkle(k.egg(k.EGG_C2), 0)), 150, { note: 'tick... tick...' }),
        k.f(rew(k.egg(k.EGG_C1, 0, -1)), 110),
        k.f(rew(k.egg(k.EGG_C1)), 150, { note: 'the crack rewinds' }),
        k.f(rew(k.egg()), 170),
        k.f(k.egg(), 250, { note: 'good as new?' }),
        // Cracks again, faster.
        k.f(k.egg(k.EGG_C1), 110),
        k.f(k.sparkle(k.egg(k.EGG_C2), 1), 150, { note: 'crack, for real' }),
        // The shell turns to brass and rolls aside like a watch.
        k.f(k.sparkle(brass(0), 0), 180, { note: 'the shell turns brass' }),
        k.f(brass(-2, k.lean(-1)), 90),
        k.f(brass(-5, k.lean(-1)), 90),
        k.f(brass(-7), 140),
        k.f(k.at(shellOnly, -3, 3), 260, { note: 'a pocket watch' }),
        // Tock peeks out, stands up, slides forward on a glittering trail.
        k.f(k.at(crop(BASE, 16), -3, 0), 280, { note: 'peek' }),
        k.f(k.at(BASE, -3), 140),
        k.f(trail(k.at(BASE, -2), 1, [[0, 20, 'Y']]), 140),
        k.f(trail(k.at(BASE, -1), 2, [[0, 19, 'Y'], [1, 20, 'y']]), 140),
        k.f(trail(k.at(BASE, 0), 3, [[1, 19, 'Y'], [0, 18, 'y'], [2, 20, 'Y']]), 160, { note: 'sparkly trail' }),
        // Hands spin, then stop on the hour.
        ...[1, 2, 4, 5, 6, 7].map((m, i) => k.f(trail(k.at(hands(BASE, m, (m + 2) % 8)), 3, i % 2 ? [[1, 18, 'y']] : [[2, 19, 'Y']]), 60, i ? {} : { note: 'whirr' })),
        k.f(k.at(hands(BASE, 0, 2), 0, -1), 90, { note: 'tock.' }),
        k.f(k.at(happy), 260),
        k.f(k.at(happy2), 120),
        k.f(k.at(happy), 240),
        k.f(k.at(blink), 100),
        k.f(k.at(BASE), 360),
      );
      return out;
    },
  });
})();
