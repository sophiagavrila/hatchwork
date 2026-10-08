// Aun evolutions. II Sekiun: a full-grown stone komainu with a carved brow, fangs and a curled mane down to
// its haunches. III Banshishi: a gilded gate lion seated on a roped plinth beside its gold tama.
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
  const hop = base => [...base.slice(1), '.'.repeat(base[0].length)];

  // ---------------- II · Sekiun ----------------
  // Eyes cols 7-8 / 16-17 rows 6-7, brows row 5, nose row 8, mouth row 10.
  const idle2 = [
    '...ooo......o......ooo...',
    '..oLlbo....oLo....obbdo..',
    '.oLlDbdo..oLllo..olbDbdo.',
    'oolDbDbdooLLllloolbDbDboo',
    'oLlbDdoLLLLLLlllllodDmbdo',
    'olDbdLdDDLLLLlllDDdllbmMo',
    'obdDdLLweLLLLlllwelllDlbo',
    '.oddbLLeYLLLLllleYllbllo.',
    'oLlbdLLLLLLeeelllllllbbdo',
    'olDbdlLLLLLLellllllllbDbo',
    'obdDdblLwDDDDDDDwllblDlbo',
    '.oddbbbllLLLLlllllbbbllo.',
    'oLlbdLoqqqrrrrrrrrollbbdo',
    'olDbdLloRrrrYrrrRolllbDbo',
    'obdDdLlboRrYyYrRoblllDlbo',
    '.oddbLlbboRRyRRobbllbllo.',
    'oLlboLlbbboRRRobbbllobbdo',
    'olDboLlbbbbooobbbbllobDbo',
    'obdmoLlbDbbbDbbbDbllomlbo',
    'obdMoLDLDobbbbboDlDloMlbo',
    '.ooooooooooooooooooooooo.',
  ];
  const calm2 = [[6, 5, 'LLL'], [16, 5, 'lll']];
  const shut2 = [[7, 6, 'LL'], [16, 6, 'll'], [7, 7, 'ee'], [16, 7, 'ee']];
  const glad2 = [...calm2, [7, 6, 'ee'], [16, 6, 'ee'], [6, 7, 'eLLe'], [15, 7, 'elle'], [6, 8, 'q'], [18, 8, 'q']];
  const blink2 = set(idle2, shut2);
  // "a": the jaw drops wide open, fangs on top.
  const talk2 = set(idle2, [[9, 9, 'DeeeeeD'], [8, 10, 'weqqqqqew'], [10, 11, 'DeeeD']]);
  const talk2b = set(idle2, [[8, 10, 'wDDeeeDDw'], [11, 11, 'DqD']]);
  const happyBase2 = set(idle2, [...glad2, [9, 10, 'DeeeeeD'], [10, 11, 'DeqeD']]);
  const happy2 = set(happyBase2, art(19, 0, ['..Y..', '.YwY.', '..Y..']));
  const happy2b = set(hop(set(idle2, [...glad2, [9, 10, 'eDDDDDe']])), art(19, 0, ['.Y.', 'YwY', '.Y.']));
  // Sleep: brow eased, eyes shut, the right ear-curl flattens under a Z.
  const sleepBase2 = set(idle2, [...calm2, ...shut2,
    [17, 0, '___wwww_'], [17, 1, '______w_'], [17, 2, '_oooowoo'], [17, 3, 'olbDwwww']]);
  const sleep2 = sleepBase2;
  const sleep2b = set(sleepBase2, [[17, 0, '___llll_'], [17, 1, '______l_'], [17, 2, '_oooolo_'], [17, 3, 'olbDllll'],
    [10, 10, 'DDeDD']]);
  // Think: eyes rolled up, gold "?" where the right ear-curl was.
  const think2 = set(idle2, [[7, 6, 'eY'], [16, 6, 'eY'], [7, 7, 'LL'], [16, 7, 'll'],
    [17, 0, '___YYY_'], [17, 1, '_____Y_'], [17, 2, 'oooYYoo'], [17, 3, 'lbDY___'.replace(/_/g, ' ')]]);
  // Fidget: the right ear-curl twitches down and the eyes dart left.
  const fidget2 = set(idle2, [[18, 0, '_____'], [17, 1, 'o_ooo__'], [17, 2, 'oolbdo_'], [17, 3, 'olbbDdo'],
    [7, 6, 'ew'], [16, 6, 'ew'], [7, 7, 'Ye'], [16, 7, 'Ye']]);
  const idle2b = set(idle2, [[7, 6, 'Lw'], [16, 6, 'lw'], [7, 7, 'Le'], [16, 7, 'le'], [9, 6, 'e'], [18, 6, 'e'], [9, 7, 'Y'], [18, 7, 'Y']]);

  const II = {
    name: 'Sekiun',
    species: 'checkpoint komainu',
    blurb: 'Aun grew a carved brow, a pair of fangs and a mane that curls all the way to its haunches. It sits at the gate like an old checkpoint guard: everyone gets waved through, after their papers are read.',
    voice: 'safe and reversible? approve. anything else, read it twice.',
    evolve: 'The pup stopped flinching at every request and started inspecting them: you learned which actions are routine and which deserve a hard look.',
    palette: {},
    sprites: {
      idle: idle2, idle2: idle2b, blink: blink2, talk: talk2, talk2: talk2b, happy: happy2, happy2: happy2b,
      sleep: sleep2, sleep2: sleep2b, think: think2, fidget: fidget2,
    },
    loop: [['idle', 22], ['blink', 2], ['idle', 14], ['idle2', 8], ['idle', 12], ['talk', 3], ['idle', 3], ['blink', 2],
      ['idle', 12], ['fidget', 5], ['idle', 14], ['think', 10], ['idle', 8]],
  };

  // ---------------- III · Banshishi ----------------
  // Eyes cols 8-9 / 17-18 rows 7-8, brows row 6, nose row 9, mouth row 11. Straw rope on the plinth, gold tama at right.
  const idle3 = [
    '..oo....ooo.....ooo....oo...',
    '.oYbo..oYlbo.o.oblYo..obYo..',
    'oYlDbooLlDbdoYodbDldoobDbYo.',
    'obDdbdoobDdoYwYodDboolblDbo.',
    'oLlbDdoooooooYooooooolDbbdo.',
    'olDbdoLLLLLLLLlllllllolbDbo.',
    'obdDdLLdDDLLLLlllDDdlllDlbo.',
    '.oYbdLLLweLLLLlllwelllllbYo.',
    'oLlbdLLLeYLLLLllleYllllbbdo.',
    'olDDdLLLLLLLeeellllllllDDbo.',
    'obdbdlLLLLLLLelllllllllblbo.',
    '.oYbdblLLwDDDDDDDwlllblbYo..',
    'oLlbbbbblllLLLlllllbbbbbbdo.',
    'olDbdbLoqqqqrrrrrrrolblbDoo.',
    '.oddboLloRrrrYrrrRollo.ooo..',
    '..oooLLlboRRYyYRRobllooYwYo.',
    '....oLLlbboRRyRRobblloYYYYo.',
    '....oLLlbdbooRoobdblloYYYyo.',
    '...oLDLDLodbbbbbdolDoooyyo..',
    '.obLLLLLLLLLLLllllllllllbo..',
    '.onnNnnNnnNnnNnnNnnNnnNnno..',
    '.obwwbbbbwwbbbbbwwbbbbwwbo..',
  ];
  const calm3 = [[7, 6, 'LLL'], [17, 6, 'lll']];
  const shut3 = [[8, 7, 'LL'], [17, 7, 'll'], [8, 8, 'ee'], [17, 8, 'ee']];
  const glad3 = [...calm3, [8, 7, 'ee'], [17, 7, 'ee'], [7, 8, 'eLLe'], [16, 8, 'elle'], [7, 9, 'q'], [19, 9, 'q']];
  const spark3 = art(21, 0, ['..Y..', '.YwY.', '..Y..']);
  const blink3 = set(idle3, shut3);
  const talk3 = set(idle3, [[10, 10, 'DeeeeeD'], [9, 11, 'weqqqqqew'], [11, 12, 'DeeeD']]);
  const talk3b = set(idle3, [[9, 11, 'wDDeeeDDw'], [12, 12, 'DqD']]);
  const happy3 = set(idle3, [...glad3, [10, 11, 'DeeeeeD'], [11, 12, 'DeqeD'], ...spark3, [4, 0, 'Y'], [5, 1, 'Y']]);
  // The lion hops; the plinth and the tama (cols 21+ of rows 14-18) stay put and the legs stretch a row.
  const lift = base => base.map((r, y) => {
    if (y > 18) return r;
    const up = y === 18 ? base[18] : base[y + 1];
    if (y === 13) return up.slice(0, 22) + '.'.repeat(r.length - 22);
    return y >= 14 ? up.slice(0, 21) + r.slice(21) : up;
  });
  const happy3b = set(lift(set(idle3, [...glad3, [10, 11, 'eDDDDDe']])), art(21, 0, ['.Y.', 'YwY', '.Y.']));
  // Sleep: brow eased, eyes shut, the right mane-curl flattens under a Z.
  const sleepBase3 = set(idle3, [...calm3, ...shut3,
    [21, 0, '_wwww_'], [21, 1, '___w__'], [21, 2, 'oowooo'], [21, 3, 'lwwwwo']]);
  const sleep3b = set(sleepBase3, [[21, 0, '_llll_'], [21, 1, '___l__'], [21, 2, 'ooloo '], [21, 3, ' llll '],
    [11, 11, 'DDeDD']]);
  // Think: eyes rolled up, gold "?" where the right mane-curl was.
  const think3 = set(idle3, [[8, 7, 'eY'], [17, 7, 'eY'], [8, 8, 'LL'], [17, 8, 'll'],
    [21, 0, '_YYY__'], [21, 1, '___Y__'], [21, 2, 'ooYYoo'], [21, 3, '  Y   ']]);
  // Fidget: eyes dart to the tama, which rolls a quarter turn.
  const fidget3 = set(idle3, [[8, 7, 'Lw'], [17, 7, 'lw'], [10, 7, 'e'], [19, 7, 'e'], [8, 8, 'Le'], [17, 8, 'le'],
    [10, 8, 'Y'], [19, 8, 'Y'], [23, 15, 'YYY'], [22, 16, 'YYYw'], [22, 17, 'YYyY']]);
  const idle3b = set(idle3, [[8, 7, 'ew'], [17, 7, 'ew'], [8, 8, 'Ye'], [17, 8, 'Ye']]);

  const III = {
    name: 'Banshishi',
    species: 'gilded gate lion',
    blurb: 'The checkpoint became a gate. Banshishi sits on a straw-roped plinth with gold in its curls and one eye on its tama, and nothing crosses the threshold it has not already weighed.',
    voice: 'routine walks through. risky waits for you. i know which is which.',
    evolve: 'You stopped asking permission for the safe things and never skipped it for the dangerous ones: approvals calibrated to the blast radius.',
    palette: { n: '#e6cc84', N: '#b8954c', t: '#7a5c30' },
    sprites: {
      idle: idle3, idle2: idle3b, blink: blink3, talk: talk3, talk2: talk3b, happy: happy3, happy2: happy3b,
      sleep: sleepBase3, sleep2: sleep3b, think: think3, fidget: fidget3,
    },
    loop: [['idle', 24], ['blink', 2], ['idle', 14], ['idle2', 8], ['idle', 12], ['talk', 3], ['idle', 3], ['blink', 2],
      ['idle', 12], ['fidget', 6], ['idle', 14], ['think', 10], ['idle', 8]],
  };

  PatchDex.evolve('aun', { habit: 'autonomy', stages: [II, III] });
})();
