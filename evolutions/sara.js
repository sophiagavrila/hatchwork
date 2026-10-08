// Sara evolutions. II Sarabande: taller, the dish brimming, a cucumber-banded scroll of notes under one arm.
// III Mirrowen: a river-guardian elder. The dish is so steady it holds the moon; the shell is carved with a
// river map, and it carries the whole stack of handoffs, tied with reed.
(function () {
  const set = (base, edits) => {
    const g = base.map(r => [...r]);
    edits.forEach(([x, y, s]) => [...s].forEach((ch, i) => { if (ch !== ' ' && g[y] && g[y][x + i] !== undefined) g[y][x + i] = ch; }));
    return g.map(r => r.join(''));
  };
  const sink = (base, row) => ['.'.repeat(base[0].length), ...base.slice(0, row), ...base.slice(row + 1)];
  const stamp = (x, y, rows) => rows.map((r, j) => [x, y + j, r.replace(/\./g, ' ')]);
  const SPARK = ['.f.', 'fif', '.f.'];
  const Z4 = ['zzz', '..z', '.z.', 'zzz'];
  const Z3 = ['zz', '.z', 'z.', 'zz'];
  const Q = ['zz.', '..z', '.z.', '...', '.z.'];

  // ---------------- II · Sarabande ----------------
  // Eyes: 2x3 blocks at cols 6-7 and 17-18, rows 8-10. Beak rows 11-12. Scroll at cols 21-24.
  const idle2 = [
    '.........xxxxxxx.........',
    '.......xxwwiiwwwxx.......',
    '.....qqWwiwwwwwwwWqq.....',
    '...qrrWWwwwwwwwwwWWRRq...',
    '..qrWWWWWWWWWWWWWWWWWRq..',
    '..qqrrrrrrrrrrrrRRRRqqq..',
    '...olgqqqqqqqqqqqqqddo...',
    '...olggggggggggggggddo...',
    '...olgiegggggggggieddo...',
    '..olggeegggggggggeedddo..',
    '..olggeegggggggggeedddo..',
    '..olgpgnyyyyyYYYYngpddo..',
    '...olggNnnnnnnnnnNgddooo.',
    '.OOolggddddddddddddgdoAbo',
    '.OholgoaaaaabaaAAAogdoaAo',
    '.OholgoaaaaabaAAAAoglgvco',
    '.OsolgoAAbbbbbbbbbodggcCo',
    '.OSlgdoaaaabaAAAbbodooaAo',
    '.OSodooAAAbbbbbbooSOooaAo',
    '..OOodgoooooooooogdoOobbo',
    '...olgggo.......olgggo.oo',
  ];
  const shut2 = [[6, 8, 'gg'], [17, 8, 'gg'], [6, 9, 'gg'], [17, 9, 'gg']];
  const glad2 = [[6, 8, 'gg'], [17, 8, 'gg'], [5, 10, 'egge'], [16, 10, 'egge']];
  const open2 = [[8, 12, 'eeeeeeeee'], [8, 13, 'NyyyYYYYN']];
  const small2 = [[11, 12, 'ee']];
  const blink2 = set(idle2, shut2);
  const talk2 = set(idle2, open2);
  const talk2b = set(idle2, small2);
  const happyBase2 = set(idle2, [...glad2, ...open2]);
  const happy2 = set(happyBase2, stamp(0, 0, SPARK));
  const happy2b = set(sink(happyBase2, 13), stamp(22, 0, SPARK));
  // Sleep: eyes shut, head nods a pixel; the brimming water rides perfectly level.
  const sleepBase2 = sink(set(idle2, [...shut2, [8, 12, 'nnnnnnnnn']]), 13);
  const sleep2 = set(sleepBase2, stamp(21, 0, Z4));
  const sleep2b = set(sleepBase2, stamp(22, 0, Z3));
  // Think: pupils roll up, beak pursed, a question mark beside the dome.
  const think2 = set(idle2, [[6, 8, 'ee'], [17, 8, 'ee'], [6, 9, 'ie'], [17, 9, 'ie'], [6, 10, 'gg'], [17, 10, 'gg'], [10, 12, 'NN'], ...stamp(22, 0, Q)]);
  // Fidget: the water sloshes right; the dome leans and its highlight slides with it.
  const fidget2 = set(idle2, [[8, 0, '.xxxxxxx'], [7, 1, '.xxwwwwiiwxx'], [9, 2, 'wwwwiw']]);
  // Idle2: the highlight on the brim shimmers.
  const idle2b = set(idle2, [[9, 1, 'wiiw'], [9, 2, 'w'], [7, 2, 'Ww']]);
  // Shift the scroll under the arm: it rises a pixel.
  const tuck2 = set(idle2, [[21, 12, 'oAbo'], [21, 13, 'oaAo'], [22, 14, 'vc'], [22, 15, 'cC'], [22, 16, 'aA'], [21, 18, 'obbo'], [21, 19, '.oo.'], [21, 20, '....']]);

  const II = {
    name: 'Sarabande',
    species: 'brimming-dish kappa',
    blurb: 'Sara grew tall enough to fill the dish to the brim and still walk without a ripple. It keeps notes rolled under one arm, wrapped in cucumber so nothing will steal them.',
    voice: 'roll up what you learned before you close the tab.',
    evolve: 'The dish filled to the brim and grew a scroll: you started ending sessions with a handoff instead of a cliff.',
    palette: {},
    sprites: {
      idle: idle2, idle2: idle2b, blink: blink2, talk: talk2, talk2: talk2b, happy: happy2, happy2: happy2b,
      sleep: sleep2, sleep2: sleep2b, think: think2, fidget: fidget2, tuck: tuck2,
    },
    loop: [['idle', 20], ['blink', 2], ['idle', 12], ['idle2', 3], ['idle', 14], ['fidget', 3], ['idle2', 3], ['idle', 10],
      ['tuck', 4], ['idle', 12], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 8]],
  };

  // ---------------- III · Mirrowen ----------------
  // Eyes: 2x2 at cols 8-9 and 18-19, rows 8-9, under pale elder brows. Beak rows 10-11.
  // The dish is a dark, perfectly still mirror (rows 2-4) with the moon in it.
  const idle3 = [
    '........qqqqqqqqqqqq........',
    '......qqrrrrrrrrrrrrqq......',
    '.....qrMMMwMMMMMuuMMMrq.....',
    '....qrMiMMMMMMMuuUMMMRRq....',
    '....qrmMMMMMMMMMUUMMwRRq....',
    '...qqrrrrrrrrrrrrrRRRRRqq...',
    '..DHolgqqqqqqqqqqqqqqddoHD..',
    '..DHolgkkkggggggggkkkddoHD..',
    '..DHolkgieggggggggiegkdoHD..',
    '..DHolggeeggggggggeegddoHD..',
    '..DolgpgnyyyyyyYYYYngpddoD..',
    '..DolgkgNnnnnnnnnnNgkddoD...',
    '.OhxhhoggdddddddddddggoshsO.',
    'OhhhxoooooooooooooooooooshSO',
    'OhxhlgbAaaaaaacvaaaAAbglgsSO',
    'OshxlgbbbbbbbbcvbbbbbbglgSxO',
    'OsxlgobAaaaaaacvaaaaAAbogSSO',
    'OSxsooobbbbbbbcvbbbbbbboosxO',
    '.OSxsobAaaaaaacvaaaAAAbosSO.',
    '..OSSoobbbbbbbcvbbbbbbboSO..',
    '...OOolgggoooooooolgggoOO...',
    '....olggggo......olggggo....',
  ];
  const shut3 = [[8, 8, 'gg'], [18, 8, 'gg']];
  const glad3 = [[8, 8, 'ee'], [18, 8, 'ee'], [7, 9, 'egge'], [17, 9, 'egge']];
  const open3 = [[9, 11, 'eeeeeeeeee'], [9, 12, 'NyyyyYYYYN']];
  const small3 = [[13, 11, 'ee']];
  const blink3 = set(idle3, shut3);
  const talk3 = set(idle3, open3);
  const talk3b = set(idle3, small3);
  const happyBase3 = set(idle3, [...glad3, ...open3]);
  const happy3 = set(happyBase3, stamp(0, 0, SPARK));
  const happy3b = set(sink(happyBase3, 12), stamp(25, 0, SPARK));
  const sleepBase3 = sink(set(idle3, shut3), 12);
  const sleep3 = set(sleepBase3, stamp(24, 0, Z4));
  const sleep3b = set(sleepBase3, stamp(25, 0, Z3));
  const think3 = set(idle3, [[8, 8, 'ie'], [18, 8, 'ie'], [8, 9, 'gg'], [18, 9, 'gg'], [12, 11, 'NN'], ...stamp(24, 0, Q)]);
  // Fidget: one drop lands in the mirror; a ring spreads and is gone by the next frame.
  const fidget3 = set(idle3, [[9, 2, 'm'], [8, 3, 'mim'], [9, 4, 'm']]);
  // Idle2: the stars in the reflection trade places.
  const idle3b = set(idle3, [[10, 2, 'M'], [7, 3, 'M'], [20, 4, 'M'], [8, 2, 'w'], [12, 4, 'i'], [20, 3, 'w']]);

  const III = {
    name: 'Mirrowen',
    species: 'river-guardian kappa',
    blurb: 'An old river guardian whose dish has gone so still it holds the moon. Its shell is carved with every bend of the river, and it never crosses one without leaving a scroll for whoever comes next.',
    voice: 'the next session can only know what you leave on the bank.',
    evolve: 'The water went still enough to reflect the sky: your handoffs got so complete that a fresh session starts where you stopped.',
    palette: {
      M: '#1d3358', m: '#36598a', u: '#fff3c4', U: '#e2c878',
      k: '#eaf6f2', x: '#7fc4e6',
    },
    sprites: {
      idle: idle3, idle2: idle3b, blink: blink3, talk: talk3, talk2: talk3b, happy: happy3, happy2: happy3b,
      sleep: sleep3, sleep2: sleep3b, think: think3, fidget: fidget3,
    },
    loop: [['idle', 24], ['blink', 2], ['idle', 14], ['idle2', 8], ['idle', 16], ['fidget', 2], ['idle', 18],
      ['blink', 2], ['idle', 10], ['idle2', 6], ['think', 10], ['idle', 8]],
  };

  PatchDex.evolve('sara', { habit: 'context', stages: [II, III] });
})();
