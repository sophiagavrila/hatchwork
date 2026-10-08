// Axo evolutions. II Mendolotl: longer frilled gills and a stitched scar it wears with pride.
// III Coronotl: a sage whose gills rise into a glowing crown; the old scar healed into a gold seam.
(function () {
  // Overlay a string onto rows at x,y. ' ' skips, '.' clears.
  const put = (rows, x, y, s) => { const a = rows.map(r => [...r]); [...s].forEach((c, i) => { if (c !== ' ' && a[y] && a[y][x + i] !== undefined) a[y][x + i] = c; }); return a.map(r => r.join('')); };
  const edit = (rows, ...ps) => ps.reduce((r, [x, y, s]) => put(r, x, y, s), rows);
  // Swap colours inside the given column spans for rows y0..y1.
  const recolor = (rows, y0, y1, spans, map) => rows.map((r, y) => (y < y0 || y > y1) ? r
    : [...r].map((c, x) => spans.some(([a, b]) => x >= a && x <= b) && map[c] ? map[c] : c).join(''));
  // Breathing: rows 0..y1 in columns x0..x1 sink by one, swallowing row y1+1 there (only cols k0..k1 of it).
  const sink = (rows, x0, x1, y1, k0 = x0, k1 = x1) => {
    const a = rows.map(r => [...r]);
    for (let y = y1 + 1; y >= 1; y--) for (let x = x0; x <= x1; x++) { if (y === y1 + 1 && (x < k0 || x > k1)) continue; a[y][x] = rows[y - 1][x]; }
    for (let x = x0; x <= x1; x++) a[0][x] = '.';
    return a.map(r => r.join(''));
  };

  // ── II · Mendolotl ────────────────────────────────────────────────────────
  // Eyes cols 7-8 / 16-17 rows 4-6; mouth corners row 7 (cols 9, 15), smile row 8 cols 10-14.
  // Stitched scar across the right flank, rows 13-15.
  const A = {
    idle: [
      'G.G...................G.G',
      '.gGG....OOOOooooo....GGg.',
      '..hgG.OOppppbbbbdoo.Ggh..',
      '...hgOppppbbbbbbbbdogh...',
      '.G.GopbwebbbbbbbwebdoG.G.',
      'GGggobbeebbbbbbbeebdoggGG',
      'hhhhobGeebbbbbbbeeGdohhhh',
      '.GggobbbbmbbbbbmbbddoggG.',
      'Ghg..obbbbmmmmmbddso..ghG',
      'h.....ooooooooooooo.....h',
      '.......osdddddddso.......',
      '......obpcccccbddso......',
      '.....obpccccccbbddso..oo.',
      '.....obcccccccbhdhso.opso',
      '....obbcccccccbppppsoobso',
      '....obbbccccbbbhdhdsobdso',
      '....oGbbbbbbbbbddsobddso.',
      '....oGGobbbbbbddssddsso..',
      '.....ooobbobbbddsssoo....',
      '.......oooooooooooo......',
    ],
  };
  const aGills = [[0, 4], [20, 24]];
  const aFlutter = r => recolor(r, 0, 9, aGills, { G: 'g', g: 'G' });
  const aShut = r => edit(r, [7, 4, 'bb'], [16, 4, 'bb'], [7, 5, 'ee'], [16, 5, 'ee'], [7, 6, 'bb'], [16, 6, 'bb']);
  const aJoy = r => edit(r, [7, 4, 'ee'], [16, 4, 'ee'], [6, 5, 'ebbe'], [15, 5, 'ebbe'], [7, 6, 'bb'], [16, 6, 'bb']);
  A.blink = aShut(A.idle);
  A.idle2 = sink(A.idle, 0, 24, 9, 6, 18);
  A.talk = edit(A.idle, [9, 7, 'mmmmmmm'], [10, 8, 'meeem']);
  A.talk2 = edit(A.idle, [10, 8, 'mmemm']);
  A.happy = aJoy(edit(A.idle, [9, 7, 'meeeeem'], [10, 8, 'mGGGm']));
  A.happy2 = aFlutter(aJoy(edit(A.idle, [9, 7, 'meeeeem'], [10, 8, 'mGGGm'])));
  const aDoze = r => edit(r, [7, 4, 'bb'], [16, 4, 'bb'], [7, 5, 'bb'], [16, 5, 'bb'], [7, 6, 'ee'], [16, 6, 'ee'],
    [9, 7, 'b'], [15, 7, 'b'], [10, 8, 'bmmmb']);
  // sleep bubbles drift up beside the head
  A.sleep = edit(aDoze(A.idle), [20, 10, 'wq'], [20, 11, 'qq'], [23, 9, 'q']);
  A.sleep2 = edit(aDoze(A.idle), [21, 9, 'wq'], [21, 10, 'qq'], [19, 11, 'q']);
  A.think = edit(A.idle, [7, 4, 'ew'], [16, 4, 'ew'], [7, 6, 'bb'], [16, 6, 'bb'], [9, 7, 'b'], [15, 7, 'b'], [10, 8, 'bbmmb'],
    [20, 11, 'q'], [21, 10, 'q'], [22, 9, 'wq'], [22, 10, 'qq']);
  A.fidget = aFlutter(edit(A.idle, [7, 4, 'bw'], [7, 5, 'be'], [7, 6, 'be'], [16, 4, 'bw'], [16, 5, 'be'], [16, 6, 'be']));

  // ── III · Coronotl ────────────────────────────────────────────────────────
  // Gills rise into a luminous crown (cols 0-6 / 20-26, rows 0-11). Calm lidded eyes cols 8-10 / 16-18:
  // lid row 10, eye row 11. Mouth corners row 12 (cols 10, 16), smile row 13 cols 11-15.
  // The old scar has healed into a gold seam on the right flank.
  const B = {
    idle: [
      '..L.....................L..',
      '..qq...................qq..',
      '..qQ...................Qq..',
      'L..Qq.................qQ..L',
      'qq.gG.................Gg.qq',
      '.Qq.gG...............Gg.qQ.',
      'q.Qg.gh..OOOOooooo..hg.gQ.q',
      '.G.gg.hOOppppqddddooh.gg.G.',
      'L.G.gGOppppbqbqbddddoGg.G.L',
      'qq.hhopbbbbbbbbbbbbbdohh.qq',
      '.QqGGobbooobbbbbooobboGGqQ.',
      '..GghobbqeebbbbbqeebbohgG..',
      '.....obGbbmbbbbbmbbGbo.....',
      '......obbbbmmmmmbbbbo......',
      '.......ooooooooooooo.......',
      '........osdddddddddso......',
      '......obpcccccccbddLo...oo.',
      '.....obpccccccccbyyso..oLqo',
      '....obbccccccbbyydddsoobQso',
      '....obqccccccbYbddsdsoobdso',
      '....oGGbqbcccbbqddssssddso.',
      '.....oooooooooooooooooooo..',
    ],
  };
  const bCrown = [[0, 6], [20, 26]];
  const bFlutter = r => recolor(r, 0, 11, bCrown, { G: 'g', g: 'G', q: 'Q', Q: 'q' });
  const bBright = r => recolor(r, 0, 11, bCrown, { q: 'L', Q: 'q', G: 'q' });
  const bDim = r => recolor(r, 0, 11, bCrown, { L: 'q', q: 'Q' });
  const bShut = r => edit(r, [8, 10, 'bbb'], [16, 10, 'bbb'], [8, 11, 'eee'], [16, 11, 'eee']);
  const bJoy = r => edit(r, [8, 10, 'beb'], [16, 10, 'beb'], [8, 11, 'ebe'], [16, 11, 'ebe']);
  const bGrin = r => edit(r, [10, 12, 'meeeeem'], [11, 13, 'mGGGm']);
  B.blink = bShut(B.idle);
  B.idle2 = sink(B.idle, 0, 26, 14, 7, 19);
  B.talk = edit(B.idle, [10, 12, 'mmmmmmm'], [11, 13, 'meeem']);
  B.talk2 = edit(B.idle, [11, 13, 'mmemm']);
  B.happy = bBright(bJoy(bGrin(B.idle)));
  B.happy2 = bFlutter(bBright(bJoy(bGrin(B.idle))));
  const bDoze = r => bDim(edit(bShut(r), [10, 12, 'b'], [16, 12, 'b'], [11, 13, 'bmmmb']));
  B.sleep = edit(bDoze(B.idle), [14, 3, 'wq'], [14, 4, 'qq'], [17, 1, 'q'], [11, 4, 'q']);
  B.sleep2 = edit(bDoze(B.idle), [15, 1, 'wq'], [15, 2, 'qq'], [12, 3, 'q'], [17, 4, 'q']);
  // eyes lift toward the crown while it pulses
  B.think = bBright(edit(B.idle, [8, 10, 'qee'], [16, 10, 'qee'], [8, 11, 'bbb'], [16, 11, 'bbb'],
    [10, 12, 'b'], [16, 12, 'b'], [11, 13, 'bbmmb']));
  B.fidget = bFlutter(edit(B.idle, [8, 11, 'eeq'], [16, 11, 'eeq']));

  PatchDex.evolve('axo', {
    habit: 'recovery',
    stages: [
      {
        name: 'Mendolotl',
        species: 'mended frill axolotl',
        blurb: 'Longer gills, a bigger tail, and a stitched scar it shows off on purpose. Every fix it ever made is still holding.',
        voice: 'it broke. good. now we know where. patch it and rerun.',
        evolve: 'Axo grew its gills out and wears its first scar stitched shut, because you kept recovering from failures instead of starting over.',
        palette: {},
        sprites: A,
        loop: [
          ['idle', 28], ['blink', 2], ['idle', 16], ['idle2', 5], ['idle', 18], ['fidget', 6], ['idle', 20],
          ['blink', 2], ['idle', 6], ['blink', 2], ['idle', 14], ['idle2', 5], ['think', 10],
        ],
      },
      {
        name: 'Coronotl',
        species: 'luminous crowned sage axolotl',
        blurb: 'Its gills rise into a glowing crown and its oldest scar has healed into a seam of gold. It has failed more times than anyone and is calm about all of them.',
        voice: 'no panic. read the failure, fix the cause, keep going.',
        evolve: 'The gills became a crown of light and the stitched scar turned to gold, because failure has become ordinary for you: you read it, fix the cause, and keep going.',
        palette: { L: '#effcff', Q: '#4fb7d6', y: '#f6c85a', Y: '#c48e2c' },
        sprites: B,
        loop: [
          ['idle', 30], ['blink', 3], ['idle', 18], ['idle2', 6], ['idle', 16], ['fidget', 6], ['idle', 22],
          ['blink', 3], ['idle', 8], ['idle2', 6], ['idle', 14], ['think', 12],
        ],
      },
    ],
  });
})();
