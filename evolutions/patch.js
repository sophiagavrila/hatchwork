// Patch evolutions. II Patchet: a sturdier quilted cub with a mustard forehead patch and a tool satchel.
// III Sewvereign: a guardian bear in a patchwork cape stitched from eight habit badges.
(function () {
  // Overlay a (multi-line) string onto rows at x,y. ' ' skips, '.' clears.
  const put = (rows, x, y, s) => { const a = rows.map(r => [...r]); s.split('\n').forEach((ln, j) => [...ln].forEach((c, i) => { if (c !== ' ' && a[y + j] && a[y + j][x + i] !== undefined) a[y + j][x + i] = c; })); return a.map(r => r.join('')); };
  const edit = (rows, ...ps) => ps.reduce((r, [x, y, s]) => put(r, x, y, s), rows);
  // Move the whole sprite up n rows (a hop), padding the bottom.
  const zBig = (x, y) => [[x, y, 'tttt'], [x + 2, y + 1, 't'], [x + 1, y + 2, 't'], [x, y + 3, 'tttt']];
  const zSmall = (x, y) => [[x, y, 'ttt'], [x + 2, y + 1, 't'], [x + 1, y + 2, 't'], [x, y + 3, 'ttt']];
  // Breathing: rows 0..y1 in columns x0..x1 sink by one, swallowing row y1+1 there (only cols k0..k1 of it).
  const sink = (rows, x0, x1, y1, k0 = x0, k1 = x1) => {
    const a = rows.map(r => [...r]);
    for (let y = y1 + 1; y >= 1; y--) for (let x = x0; x <= x1; x++) { if (y === y1 + 1 && (x < k0 || x > k1)) continue; a[y][x] = rows[y - 1][x]; }
    for (let x = x0; x <= x1; x++) a[0][x] = '.';
    return a.map(r => r.join(''));
  };

  // ── II · Patchet ──────────────────────────────────────────────────────────
  // Eyes at cols 7-8 / 16-17 rows 7-9, nose row 10, mouth cols 10-14 row 11. Satchel on the right hip.
  const A = {
    idle: [
      '.....ooo.........ooo.....',
      '....olpbo.......obpsor...',
      '....obpbooooooooobpdo.r..',
      '....ollllllbbbbbbbsdo..r.',
      '...olryyrbbbbbbbbbssdo.r.',
      '...olyyyYbbbbbbbbbssdo..R',
      '...olrYYrbbbbbbbbbssdo...',
      '...olbbwebbbbbbbwebsdo...',
      '...olbbeebbbbbbbeebsdo...',
      '...obpbeebblllbbeebpdo...',
      '...osbbbbbleeelbbbbsdo.n.',
      '....osbbbbklelkbbssdo..N.',
      '.....okkkkkkkkkkkkko...nr',
      '...olbdsssssssssssaAo..nR',
      '..olbbkbbrtttttrbbaAo..n.',
      '..olbbkbbttttttTboaaaaaao',
      '..olbbkbbttttttTboAAnnAAo',
      '..obpskbbttttttTboaaaaaAo',
      '...ooodbbrTTTTTrboaaaaAAo',
      '....osbbbbbkokbbboAAAAAAo',
      '.....ooooooo.ooooooooooo.',
    ],
  };
  const aShut = r => edit(r, [7, 7, 'bb'], [16, 7, 'bb'], [7, 9, 'bb'], [16, 9, 'bb']);
  const aJoy = r => edit(r, [7, 7, 'beb'], [7, 8, 'ebe'], [7, 9, 'bbb'], [15, 7, 'beb'], [15, 8, 'ebe'], [15, 9, 'bbb']);
  // left arm swings up beside the head
  const aWave = r => edit(r,
    [0, 8, '.oo'], [0, 9, 'olbo'], [0, 10, 'obbo'], [1, 11, 'obso'], [2, 12, 'oo'],
    [2, 14, '.o'], [2, 15, '.o'], [2, 16, '.o'], [2, 17, '.o'], [3, 14, 'lbbb'], [3, 15, 'lbbb'], [3, 16, 'sbbb'], [3, 17, 'ssbb'], [3, 18, 'osdb']);
  A.blink = aShut(A.idle);
  A.idle2 = sink(A.idle, 0, 24, 12, 5, 19);
  A.talk = edit(A.idle, [10, 11, 'kRpRk']);
  A.talk2 = edit(A.idle, [10, 11, 'bkRkb']);
  A.happy = aWave(aJoy(edit(A.idle, [10, 11, 'kRpRk'])));
  A.happy2 = edit(aWave(aJoy(edit(A.idle, [10, 11, 'klelk']))), [0, 8, '...'], [0, 9, '.oo'], [0, 10, 'olbo'], [0, 11, 'obso'], [1, 12, 'ooo']);
  A.sleep = edit(aShut(A.idle), [7, 8, 'bb'], [16, 8, 'bb'], [7, 9, 'ee'], [16, 9, 'ee'], [10, 11, 'bbkbb'],
    ...zBig(0, 0));
  A.sleep2 = edit(aShut(A.idle), [7, 8, 'bb'], [16, 8, 'bb'], [7, 9, 'ee'], [16, 9, 'ee'], [10, 11, 'bkekb'],
    ...zSmall(1, 2));
  A.think = edit(A.idle, [7, 7, 'ew'], [16, 7, 'ew'], [7, 9, 'bb'], [16, 9, 'bb'], [10, 11, 'bbkbb'],
    [0, 0, 'll'], [2, 1, 'l'], [1, 2, 'l'], [1, 4, 'l']);
  // rummaging: eyes slide to the satchel, needle pokes up
  A.fidget = edit(A.idle, [7, 7, 'bwe'], [7, 8, 'bee'], [7, 9, 'bee'], [16, 7, 'bwe'], [16, 8, 'bee'], [16, 9, 'bee'],
    [10, 11, 'bkekb'], [23, 9, 'n'], [23, 10, 'N'], [23, 11, 'n'], [23, 12, 'n'], [24, 11, 'r'], [24, 12, 'R'], [24, 13, '.']);

  // ── III · Sewvereign ──────────────────────────────────────────────────────
  // Same head one column right (eyes 8-9 / 17-18). Cape badges, left: prompting (yellow, >), planning (blue, steps),
  // research (green, lens), autonomy (orange, ^); right: verification (teal, check), review (purple, eye),
  // recovery (red, heart), context (pink, window).
  const B = {
    idle: [
      '......ooo.........orr.rr...',
      '.....olpbo.......obrRrRr...',
      '.....obpbooooooooobpRoR....',
      '.....ollllllbbbbbbbsdo.....',
      '....olryyrbbbbbbbbbssdo....',
      '....olyyyYbbbbbbbbbssdo....',
      '....olrYYrbbbbbbbbbssdo....',
      '.o..olbbwebbbbbbbwebsdo..o.',
      '.oo.olbbeebbbbbbbeebsdo.oo.',
      '.oQoobpbeebblllbbeebpdooqo.',
      '.oQqosbbbbbleeelbbbbsdoqqo.',
      '.oQqqosbbbbklelkbbssdoqqqo.',
      '.oQqqqookkkkkykkkkkooqqqqo.',
      'oQqqYyyolssssssssddottTqqqo',
      'ouulyYyolbrtttttrbdoTtTvvvo',
      'ouluYyyolbttttttTbdotTtwewo',
      'olUUqqqobbttttttTbdoqqqVVVo',
      'oqqqGGgosbttttttTsdolrlqqqo',
      'ocCcGGgosdrTTTTTrddolllMMMo',
      'oCcCggGolbbbbkbbbsdorlrMmMo',
      'occcqqqolbbbokobbsdoqqqMMMo',
      '.oooooooooooo.oooooooooooo.',
    ],
  };
  const bShut = r => edit(r, [8, 7, 'bb'], [17, 7, 'bb'], [8, 9, 'bb'], [17, 9, 'bb']);
  const bJoy = r => edit(r, [8, 7, 'beb'], [8, 8, 'ebe'], [8, 9, 'bbb'], [16, 7, 'beb'], [16, 8, 'ebe'], [16, 9, 'bbb']);
  const glint = (r, pts) => edit(r, ...pts.map(([x, y]) => [x, y, 'w']));
  const spark = (r, pts) => edit(r, ...pts.flatMap(([x, y]) => [[x, y - 1, 'y'], [x - 1, y, 'ywy'], [x, y + 1, 'y']]));
  B.blink = bShut(B.idle);
  B.idle2 = sink(B.idle, 0, 26, 12, 7, 19);
  B.talk = edit(B.idle, [11, 11, 'kRpRk']);
  B.talk2 = edit(B.idle, [11, 11, 'bkRkb']);
  // the cape flares: collar points lift and the badges catch the light
  const flare = r => edit(r, [0, 6, '.o'], [0, 7, 'oQo'], [0, 8, 'oQqo'], [25, 6, 'o.'], [24, 7, 'oqo'], [23, 8, 'oqqo']);
  B.happy = spark(flare(bJoy(edit(B.idle, [11, 11, 'kRpRk']))), [[2, 2], [24, 5]]);
  B.happy2 = spark(flare(bJoy(edit(B.idle, [11, 11, 'klelk']))), [[3, 4], [24, 3]]);
  B.sleep = edit(bShut(B.idle), [8, 8, 'bb'], [17, 8, 'bb'], [8, 9, 'ee'], [17, 9, 'ee'], [11, 11, 'bbkbb'],
    ...zBig(0, 0));
  B.sleep2 = edit(bShut(B.idle), [8, 8, 'bb'], [17, 8, 'bb'], [8, 9, 'ee'], [17, 9, 'ee'], [11, 11, 'bkekb'],
    ...zSmall(1, 2));
  B.think = edit(B.idle, [8, 7, 'ew'], [17, 7, 'ew'], [8, 9, 'bb'], [17, 9, 'bb'], [11, 11, 'bbkbb'],
    [0, 0, 'll'], [2, 1, 'l'], [1, 2, 'l'], [1, 4, 'l']);
  // a glance down at the cape while one badge glints
  B.fidget = glint(edit(B.idle, [8, 7, 'bb'], [17, 7, 'bb'], [8, 8, 'we'], [17, 8, 'we'], [11, 11, 'bkekb']), [[21, 17], [5, 13]]);

  PatchDex.evolve('patch', {
    habit: 'craft',
    stages: [
      {
        name: 'Patchet',
        species: 'quilted satchel cub',
        blurb: 'Bigger, sturdier, and never without its satchel: a needle, a spare patch, and the quiet confidence of someone who has fixed this before.',
        voice: 'plan it, run it, read the diff. then the next stitch.',
        evolve: 'Patch grew into its seams and packed a kit of tools, because you stopped reaching for one habit and started using the whole set.',
        palette: { y: '#eabb4f', Y: '#b98a32', a: '#b5733f', A: '#7a4a2b', n: '#e3e9ef', N: '#8794a3' },
        sprites: A,
        loop: [
          ['idle', 26], ['blink', 2], ['idle', 14], ['idle2', 5], ['idle', 18], ['fidget', 9], ['idle', 20],
          ['blink', 2], ['idle', 6], ['blink', 2], ['idle', 16], ['idle2', 5], ['think', 10],
        ],
      },
      {
        name: 'Sewvereign',
        species: 'patchwork guardian bear',
        blurb: 'It wears every lesson as a patch on its cape and can tell you which mistake earned each one. Rules nothing; mends everything.',
        voice: 'every habit is one patch. wear the whole cape.',
        evolve: 'Eight habits stitched into one cape: Sewvereign appears only when prompting, planning, research, autonomy, verification, review, recovery and context all hold together in your work.',
        palette: {
          y: '#eabb4f', Y: '#b98a32',
          u: '#5b84d9', U: '#3a5aa6', g: '#7cb854', G: '#4d8a35', c: '#e8853a', C: '#b45a22',
          v: '#9a6bd0', V: '#6a4499', m: '#e070a8', M: '#a8467a', q: '#3d3a66', Q: '#5a5794',
        },
        sprites: B,
        loop: [
          ['idle', 28], ['blink', 2], ['idle', 16], ['idle2', 6], ['idle', 18], ['fidget', 8], ['idle', 22],
          ['blink', 2], ['idle', 6], ['blink', 2], ['idle', 14], ['idle2', 6], ['think', 10],
        ],
      },
    ],
  });
})();
