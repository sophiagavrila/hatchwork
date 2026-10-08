// Quill: a hedgehog scribe. Chestnut spines dipped in ink, spectacles pushed up, quill pen always in paw.
(function () {
  const bare = [
    '..........ii..........',
    '......i..iIIi..i......',
    '......II.otSo.II......',
    '..i...otstSsSsSo...i..',
    '..Ii.otggsggsggSo.iI..',
    '..oItsgwhgoogwhgsSIo..',
    '..otSsSggsSssggsssSo..',
    'iIttSsSSSsSsssssssSSIi',
    '.IotSsScccsscccsssSoI.',
    '..otSccweccccweccsSo..',
    '.iItScceecccceeccsSIi.',
    'iIttScceecccceeccsSSIi',
    '.IotScpccceecccpcsSoI.',
    '..otSsccccCCccccssSo..',
    '...oSsCccccccccCsso...',
    '..iIoSssccccccsssoIi..',
    '...IoSCsccccccsCsoI...',
    '....oSoccccccccoso....',
    '....osssoCCCCossso....',
    '....oooo......oooo....',
  ];
  const W = bare[0].length, H = bare.length;
  const grid = rows => rows.map(r => [...r]);
  const str = g => g.map(r => r.join(''));
  const put = (base, pts) => { const g = grid(base); pts.forEach(([x, y, c]) => { if (g[y] && g[y][x] !== undefined) g[y][x] = c; }); return str(g); };
  const shiftRows = (b, y0, y1, dy, x0 = 0, x1 = W - 1) => {
    const g = grid(b), src = grid(b);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) g[y][x] = '.';
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (g[y + dy] && src[y][x] !== '.') g[y + dy][x] = src[y][x];
    return str(g);
  };
  // The quill pen, held in the right paw: feather up top, tan shaft, ink nib below the paw.
  const PEN = [
    [20, 1, 'w'], [19, 2, 'w'], [20, 2, 'h'], [19, 3, 'w'], [20, 3, 'h'], [21, 3, 'h'],
    [18, 4, 'w'], [19, 4, 'h'], [20, 4, 'C'], [21, 4, 'h'], [18, 5, 'w'], [19, 5, 'h'], [20, 5, 'C'],
    [17, 6, 'o'], [18, 6, 'w'], [19, 6, 'C'], [17, 7, 'o'], [18, 7, 'C'], [19, 7, 'o'],
    [17, 8, 'C'], [17, 9, 'C'], [16, 10, 'C'], [16, 11, 'C'], [16, 12, 'C'], [15, 13, 'o'], [16, 13, 'C'], [15, 14, 'C'],
  ];
  const NIB = [[13, 16, 'I'], [12, 17, 'i']];
  const pen = (b, dx = 0, dy = 0, nib = true) => put(b, [...PEN, ...(nib ? NIB : [])].map(([x, y, c]) => [x + dx, y + dy, c]));
  // Face map: eyes L(7-8) R(13-14) rows 9-11, nose row 12 cols 10-11, mouth row 13, blush (6,12)/(15,12).
  const EYES = [[7, 8], [13, 14]];
  const eyes = (b, f) => put(b, EYES.flatMap(([a, z]) => f(a, z)));
  const shut = b => eyes(b, (a, z) => [[a, 9, 'c'], [z, 9, 'c'], [a, 10, 'e'], [z, 10, 'e'], [a, 11, 'c'], [z, 11, 'c']]);
  const lids = b => eyes(b, (a, z) => [[a, 9, 'c'], [z, 9, 'c'], [a, 10, 'c'], [z, 10, 'c'], [a, 11, 'e'], [z, 11, 'e']]);
  const arcs = b => eyes(b, (a, z) => [[a, 9, 'c'], [z, 9, 'c'], [a, 10, 'e'], [z, 10, 'e'], [a - 1, 11, 'e'], [a, 11, 'c'], [z, 11, 'c'], [z + 1, 11, 'e']]);
  const up = b => eyes(b, (a, z) => [[a, 8, 'w'], [z, 8, 'e'], [a, 9, 'e'], [z, 9, 'e'], [a, 11, 'c'], [z, 11, 'c']]);
  const face = pen(bare);
  const idle = face;
  const blink = pen(shut(bare));
  // Talk: a round open mouth under the nose, and the pen lifts as if to make a point.
  const talk = pen(put(bare, [[9, 13, 'e'], [10, 13, 'e'], [11, 13, 'e'], [12, 13, 'e'], [9, 14, 'e'], [10, 14, 'p'], [11, 14, 'p'], [12, 14, 'e'], [10, 15, 'e'], [11, 15, 'e']]), 0, -1);
  const talk2 = pen(put(bare, [[10, 13, 'e'], [11, 13, 'e'], [10, 14, 'p'], [11, 14, 'p']]));
  const grin = b => put(b, [[9, 13, 'e'], [10, 13, 'p'], [11, 13, 'p'], [12, 13, 'e'], [10, 14, 'e'], [11, 14, 'e'], [5, 12, 'p'], [16, 12, 'p']]);
  const happy = pen(grin(arcs(bare)), 0, -1);
  const happy2 = pen(shiftRows(grin(arcs(bare)), 0, 19, -1), 0, -1);
  const ask = b => put(b, [[3, 0, 'g'], [4, 0, 'g'], [2, 1, 'g'], [5, 1, 'g'], [4, 2, 'g'], [4, 4, 'g']]);
  const think = ask(pen(up(bare)));
  const ruffle = b => str(grid(b).map((r, y) => r.map(c => (y < 15 && c === 'i' ? 'I' : y < 15 && c === 'I' ? 'i' : c))));
  const fidget = put(pen(ruffle(bare), 0, 1), [[11, 19, 'i'], [10, 19, 'I']]);
  const Z = (b, x, y, c) => put(b, [[x, y, c], [x + 1, y, c], [x + 2, y, c], [x + 2, y + 1, c], [x + 1, y + 2, c], [x, y + 3, c], [x + 1, y + 3, c], [x + 2, y + 3, c]]);
  const slump = pen(shiftRows(lids(bare), 0, 14, 1), 1, 2);
  const sleep = Z(slump, 2, 0, 'h');
  const sleep2 = Z(slump, 3, 1, 'w');
  PatchDex.register({
    id: 'quill', name: 'Quill', species: 'hedgehog scribe', rarity: 'uncommon',
    blurb: 'A tidy hedgehog who dips every spine in ink. It does not consider anything done until it is written down.',
    coaching: 'Commit messages and docs: say why the change exists, what it touches, and what the next reader needs.',
    voice: 'future you will read this. write it for them.',
    hatch: 'Ink letters scribble across the egg, a blot spreads, and it rolls into a spiny ball that unrolls with a flourish.',
    palette: {
      o: '#2b1a12', s: '#6b3820', S: '#9a5530', t: '#c47d48', i: '#25356e', I: '#4a6fc0',
      c: '#fbebcf', C: '#dcbf95', e: '#1c120d', w: '#ffffff', p: '#f2a08e', g: '#e0a83e', h: '#d6e6fb',
    },
    sprites: { idle, blink, talk, talk2, happy, happy2, think, fidget, sleep, sleep2 },
    loop: [['idle', 24], ['blink', 2], ['idle', 14], ['fidget', 3], ['idle', 3], ['fidget', 3], ['idle', 18], ['blink', 2], ['idle', 2], ['blink', 2], ['idle', 16], ['think', 10], ['idle', 8]],
    entrance(k) {
      const out = k.eggIntro();
      const E = k.eggHome; // egg top-left on the canvas
      // Ink letters write themselves across the shell, one cursive line at a time.
      const LINES = [
        [[2, 5], [3, 4], [4, 5], [5, 4], [6, 5], [7, 4], [8, 5], [9, 4]],
        [[2, 7], [3, 8], [4, 7], [5, 7], [6, 8], [7, 7], [8, 8]],
        [[3, 10], [4, 10], [5, 9], [6, 10], [8, 10]],
      ];
      const scribble = (n, rows = k.EGG_C1) => { const g = k.egg(rows); LINES.slice(0, n).flat().forEach(([x, y]) => k.px(g, E.x + x, E.y + y, 'i')); return g; };
      // Then the ink soaks outward from the middle until the whole egg is ink-blue.
      const INK = { 0: 'o', 1: 'I', 2: 'h', 3: 'i', 4: 'i', 5: 'i', 6: 'I', 7: 'I' };
      const blot = r => { const g = scribble(3); const src = k.toGrid(k.EGG_C1); src.forEach((row, y) => row.forEach((c, x) => { if (c !== '.' && Math.hypot(x - 5.5, (y - 7) * 0.85) < r) g[E.y + y][E.x + x] = INK[c] || 'i'; })); return g; };
      // The inked egg curls into a spiny ball and rolls.
      const BALL = [
        '...i..i..i...',
        '.i.IooIooIoi.',
        '.IotSSsSSsoI.',
        'ioStSSSsSSsoi',
        '.oSttSSSsSso.',
        'IoStSSSSSssoI',
        '.oStSSSSsSso.',
        'ioSSSSSSSssoi',
        '.IosSSSSsso I'.replace(' ', 'o'),
        '..oossssooo..',
        '..i..ooo..i..',
      ];
      const spin = b => b.map(r => [...r].reverse().join('').replace(/[iI]/g, c => (c === 'i' ? 'I' : 'i')));
      const BALL2 = spin(BALL);
      const PEEK = BALL.map((r, y) => (y === 5 ? '.oStScccSssoI' : y === 6 ? '.oSceccecSso.' : y === 7 ? 'ioSccceccssoi' : r));
      const ball = (b, dx, dy = 0, map) => k.stamp(k.blank(), b, 8 + dx, 11 + dy, { map });
      const INKY = { S: 'I', t: 'h', s: 'i' };
      const trail = (g, pts, c) => { pts.forEach(([x, y]) => k.px(g, x, y, c)); return g; };
      const ARC = [[26, 7], [27, 5], [26, 3], [25, 1], [23, 0], [21, 0]];
      out.push(
        k.f(scribble(1), 160), k.f(scribble(2), 160), k.f(scribble(3), 320),
        k.f(blot(1.5), 110), k.f(blot(3), 110), k.f(blot(5), 110), k.f(blot(9), 300),
        k.f(ball(BALL, 0, 0, INKY), 110), k.f(ball(BALL, 0), 200),
        k.f(ball(BALL2, -2), 90), k.f(ball(BALL, -4, -1), 90), k.f(ball(BALL2, -5), 110),
        k.f(ball(BALL, -2), 80), k.f(ball(BALL2, 2, -1), 80), k.f(ball(BALL, 5), 110),
        k.f(ball(BALL2, 2), 90), k.f(ball(BALL, 0, -1), 90), k.f(ball(BALL, 0), 260),
        k.f(ball(PEEK, 0), 380),
        k.f(k.at(shiftRows(lids(bare), 0, 14, 1)), 160),
        k.f(k.at(pen(shut(bare), 0, 3, false)), 110),
        k.f(trail(k.at(pen(bare, 0, 1)), ARC.slice(0, 2), 'h'), 90),
        k.f(trail(k.at(pen(bare, 0, -1)), ARC.slice(0, 4), 'I'), 90),
        k.f(trail(trail(k.at(pen(bare, 0, -1)), ARC.slice(0, 2), 'i'), ARC.slice(2), 'I'), 110),
        k.f(trail(k.at('happy'), ARC.slice(3), 'i'), 160),
        k.f(k.at('happy2'), 140), k.f(k.at('happy'), 300),
        k.f(k.at('idle'), 420), k.f(k.at('blink'), 120), k.f(k.at('idle'), 300),
      );
      return out;
    },
  });
})();
