// Kuro evolutions. II Bokuro: a young tengu with wider wings, a practice staff planted at its side and a red
// sash. III Hanekata: a master tengu, great black wings spread, holding a white feather fan, mid-kata on one geta.
(function () {
  const set = (base, edits) => {
    const g = base.map(r => [...r]);
    edits.forEach(([x, y, s]) => [...s].forEach((ch, i) => { if (ch !== ' ' && g[y] && g[y][x + i] !== undefined) g[y][x + i] = ch; }));
    return g.map(r => r.join(''));
  };
  const sink = (base, row) => ['.'.repeat(base[0].length), ...base.slice(0, row), ...base.slice(row + 1)];
  const hop = base => [...base.slice(1), '.'.repeat(base[0].length)];
  const stamp = (x, y, rows) => rows.map((r, j) => [x, y + j, r.replace(/\./g, ' ')]);
  const eye = (x, a, b) => [[x, 8, a], [x, 9, b]];
  const SPARK = ['.s.', 'sws', '.s.'];
  const Z4 = ['zzz', '..z', '.z.', 'zzz'];
  const Z3 = ['zz', '.z', 'z.', 'zz'];
  const Q = ['zz.', '..z', '.z.', '...', '.z.'];

  // ---------------- II · Bokuro ----------------
  // Eye at cols 17-18, rows 8-9. Beak rows 8-10, cols 19-24. Staff at cols 23-24.
  const idle2 = [
    '.............ooo.......oo',
    '.ooo........oUTto......hn',
    'oLLMoo.....oUTttto.....hn',
    '.oooMMoo...oTtttto.....hn',
    'oLLLLMMmo.oooccccco....hn',
    '.ooooMMmmoLMMMMMMMMo...hn',
    'oLLLLLMmoLMmmmmmmmMMo..hn',
    '.oooooMmMmmmmmmmmookMo.hn',
    '..oLLLoMmmmmmmmmmwekkooon',
    '...ooooMmmmmmmmmmeekyyyyo',
    '....oLommmmmmmmmmmkYYYohn',
    '....ooookmmmmmmmmmkooo.hn',
    '....okkokkcckkkkkkkkkoMkn',
    '....oLkokkkccpkkkkkkMMkkn',
    '...oLLMkkppkccPkkkkkookhn',
    '...oLMLkpppPkkcckkkoo..hn',
    '...okMLkkPPkkkkcckko...hn',
    '....ooookkkkkkkkcco....hn',
    '......ooooyyoooyyoo....hn',
    '........onnnnno.onnnnnohn',
    '..........oNo....oNo...oo',
  ];
  const shut2 = eye(17, 'mm', 'LL');
  const glad2 = eye(16, 'mLm', 'LmL');
  const open2 = [[18, 10, 'keeeo'], [18, 11, 'kYYYo'], [19, 12, 'oo']];
  const blink2 = set(idle2, shut2);
  const talk2 = set(idle2, open2);
  const talk2b = set(idle2, [[19, 10, 'eYY']]);
  const happyBase2 = set(idle2, [...glad2, ...open2]);
  const happy2 = set(happyBase2, stamp(19, 0, SPARK));
  const happy2b = set(hop(happyBase2), stamp(19, 1, SPARK));
  const sleepBase2 = sink(set(idle2, shut2), 17);
  const sleep2 = set(sleepBase2, stamp(19, 0, Z4));
  const sleep2b = set(sleepBase2, stamp(20, 1, Z3));
  const think2 = set(idle2, [...eye(17, 'ee', 'ww'), ...stamp(19, 0, Q)]);
  // Fidget: the raised wing flicks up a pixel, like resetting a stance between reps.
  const fidget2 = set(idle2, [
    [0, 0, '.ooo'], [0, 1, 'oLLMoo'], [0, 2, '.oooMMoo'], [0, 3, 'oLLLLMMmo'], [0, 4, '.ooooMMmmo'],
    [0, 5, 'oLLLLLMmmo'], [0, 6, '.oooooMm'], [0, 7, '..oLLLMm'], [0, 8, '...oooo'], [0, 9, '....oLo'],
  ]);
  const idle2b = set(idle2, eye(17, 'ww', 'ee'));

  const II = {
    name: 'Bokuro',
    species: 'staff-drill tengu',
    blurb: 'A young tengu that plants a practice staff beside it wherever it lands. It runs the same drill until the motion stops needing thought, then makes the drill a little harder.',
    voice: 'again. slower this time. now again.',
    evolve: 'The leaf fan was traded for a staff once the reps started to count: your practice turned into a routine.',
    palette: {},
    sprites: {
      idle: idle2, idle2: idle2b, blink: blink2, talk: talk2, talk2: talk2b, happy: happy2, happy2: happy2b,
      sleep: sleep2, sleep2: sleep2b, think: think2, fidget: fidget2,
    },
    loop: [['idle', 18], ['blink', 2], ['idle', 12], ['fidget', 2], ['idle', 2], ['fidget', 2], ['idle', 14],
      ['idle2', 6], ['idle', 10], ['blink', 2], ['think', 10], ['idle', 8]],
  };

  // ---------------- III · Hanekata ----------------
  // Eye at cols 21-22, rows 8-9. Beak rows 7-10, cols 23-27. Feather fan at cols 22-27, rows 11-20.
  const idle3 = [
    '..ooooooo..ooo...ooo........',
    '.oMMmmmmmkoMmko.oUTto.......',
    '..ooooooookkmkooUTttto......',
    '.ooooooMmmmkkkkoTtttto......',
    'oLLLLLMookokkkoooccccco.....',
    'oMMMMMMMMMokkoLMMMMMMMMo....',
    '.oooooooMMmooLMmmmmmmmMMo...',
    '.oLLLLLLMmmoMmmmmmmmmooo.o..',
    '.oMMMMMMMMmoMmmmmmmmmwekoooo',
    '..ooooooooMommmmmmmmmeekyyyo',
    '...oLLLLLLMMokmmmmmmmmkYYYo.',
    '...oMMMMMMMokkmmmmmmmmkoooo.',
    '....oooooookkcckkkkkkkoppppo',
    '.....oLLLokMkkcckpkkkoopppPo',
    '.....oMMMoMMkkkcckPkkooppPPo',
    '......ooooMLkkpkcckkkkkoPPo.',
    '.........oMLkpPkkcckkkkooyo.',
    '..........ookPPkkkcckkoMkho.',
    '............ookkkoyyooo.oho.',
    '.............oyo...oyo...oc.',
    '.............oyo.onnno...cc.',
    '...........onnnnno..........',
  ];
  const shut3 = eye(21, 'mm', 'LL');
  const glad3 = eye(20, 'mLm', 'LmL');
  const open3 = [[22, 10, 'keeeo'], [22, 11, 'kYYYo']];
  const blink3 = set(idle3, shut3);
  const talk3 = set(idle3, open3);
  const talk3b = set(idle3, [[23, 10, 'eYY']]);
  const happyBase3 = set(idle3, [...glad3, ...open3]);
  const happy3 = set(happyBase3, stamp(24, 0, SPARK));
  const happy3b = set(hop(happyBase3), stamp(25, 1, SPARK));
  const sleepBase3 = sink(set(idle3, shut3), 16);
  const sleep3 = set(sleepBase3, stamp(24, 0, Z4));
  const sleep3b = set(sleepBase3, stamp(25, 1, Z3));
  const think3 = set(idle3, [...eye(21, 'ee', 'ww'), ...stamp(24, 0, Q)]);
  // Fidget: one stroke of the fan; the light crosses the feathers and the tassel swings out.
  const fidget3 = set(idle3, [
    [23, 12, 'Pppp'], [23, 13, 'Pppp'], [23, 14, 'PPpp'], [24, 15, 'Pp'], [25, 19, '.oc'], [25, 20, '..c'],
  ]);
  const idle3b = set(idle3, eye(21, 'ww', 'ee'));

  const III = {
    name: 'Hanekata',
    species: 'feather-fan master tengu',
    blurb: 'A mountain tengu holding a kata on one geta with its great black wings spread. It has done each form so many times that it now spends its practice on the transitions between them.',
    voice: 'the form is done when nothing is left to fix. so: not yet.',
    evolve: 'The staff became a feather fan and the wings finally opened: deliberate practice made the craft look effortless.',
    palette: {},
    sprites: {
      idle: idle3, idle2: idle3b, blink: blink3, talk: talk3, talk2: talk3b, happy: happy3, happy2: happy3b,
      sleep: sleep3, sleep2: sleep3b, think: think3, fidget: fidget3,
    },
    loop: [['idle', 22], ['blink', 2], ['idle', 14], ['fidget', 3], ['idle', 16], ['idle2', 6], ['idle', 12],
      ['blink', 2], ['fidget', 3], ['idle', 10], ['think', 10], ['idle', 8]],
  };

  PatchDex.evolve('kuro', { habit: 'craft', stages: [II, III] });
})();
