// Dotty evolutions — II a ladybird inspector peering through a brass magnifier; III a stag-beetle detective.
(function () {
  const mod = (base, m) => base.map((r, i) => {
    if (m[i] === undefined) return r;
    const [x, str] = typeof m[i] === 'string' ? [0, m[i]] : m[i];
    return r.slice(0, x) + str + r.slice(x + str.length);
  });
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const pad = (rows, w) => rows.map(r => r + '.'.repeat(w - r.length));

  // ---- II ----
  const body2 = pad([
    '...OO............OO...',
    '..OHhO..........OHhO..',
    '...OOO..........OOO...',
    '......O........O......',
    '.......OOOOOOOO.......',
    '.....OOHHhhhhhKOO.....',
    '....OHhhhhhhhhhhKO....',
    '...OHWWWWhhhhWWWWKO...',
    '...OhWWeehhhheeWWKO...',
    '.OlOhWWeehhhheeWWKORO.',
    'OllOpWWWWhhhhWWWWpOrRO',
    'OlwlOhhhhhHHhhhhKOrrRO',
    'OrlKKOOKKKKKKKKOOKKRRO',
    'OrlKKrrrOOOOOOrrrKKRRO',
    'OrlrrrrrrrOOrrrrrrrRRO',
    'OrrrrrKKrrOOrrKKrrrRRO',
    'ORrrrrKKrrOOrrKKrrRRRO',
    '.ORrrrrrrrOOrrrrrrRRO.',
    '..ORRRrrrrOOrrrrRRRO..',
    '...OOOOOOOOOOOOOOOO...',
    '.....OKKO....OKKO.....',
  ], 25);
  const lens = inner => [
    '..OOOOO..',
    '.OYYGGgO.',
    'OY' + inner[0] + 'gO',
    'OY' + inner[1] + 'gO',
    'OG' + inner[2] + 'gO',
    'OG' + inner[3] + 'gO',
    'OG' + inner[4] + 'gO',
    '.OGggggO.',
    '..OOOOO..',
  ];
  // What the lens shows: Dotty's own right eye, magnified. `c` is glare on the glass.
  const EYE = ['YWWWg', 'WceeW', 'WeeeW', 'WWeeW', 'GWWWg'];
  const PEEK = ['YceeW', 'WeeeW', 'WWeWW', 'WWWWW', 'GWWWg'];
  const LOOK = ['YWWWg', 'ceeWW', 'eeeWW', 'WeeWW', 'GWWWg'];
  const SHUT = ['Yhhhg', 'hhhhh', 'WWWWW', 'hhhhh', 'Ghhhg'];
  const JOY = ['Yhhhg', 'hWWWh', 'WhhhW', 'hhhhh', 'Ghhhg'];
  const handle = [
    'GgO...',
    'OUuO..',
    'OHhuO.',
    'OhhUuO',
    '.OOOuO',
    '....O.',
  ];
  const held = (b, inner, dy = 0) => put(put(b, 11, 4 + dy, lens(inner)), 19, 11 + dy, handle);
  const lEye = (a, b) => ({ 8: [5, a], 9: [5, b] });
  const shutL = { 7: [5, 'hhhh'], 8: [5, 'hhhh'], 9: [5, 'WWWW'] };
  const idle2 = held(body2, EYE);
  const blink2 = held(mod(body2, shutL), SHUT);
  const talk2a = held(mod(body2, { 11: [10, 'pp'], 12: [10, 'pp'] }), EYE);
  const talk2b = held(mod(body2, { 11: [10, 'pp'] }), EYE);
  const happy2a = held(mod(body2, { 7: [5, 'hhhh'], 8: [5, 'hWWh'], 9: [5, 'WhhW'], 11: [9, 'HppH'] }), JOY);
  const happy2b = ['.'.repeat(25), ...happy2a.slice(0, 19), happy2a[20]];
  const think2 = put(held(mod(body2, lEye('WWee', 'WWWW')), PEEK, -1), 0, 3, ['WW.', '..W', '.W.', '...', '.W.']);
  const fidget2 = held(mod(body2, lEye('eeWW', 'eeWW')), LOOK, -1);
  // Asleep: the magnifier is lowered and leans against the shell.
  const rest = [
    '..OOOOO..',
    '.OYYGGgO.',
    'OYchhhcgO',
    'OYhhhhhgO',
    'OGhhhhhgO',
    'OGchhhcgO',
    '.OGggggO.',
    '..OOOOO..',
  ];
  const sleepBody = mod(body2, { 7: [5, 'hhhhhhhhhhhh'], 8: [5, 'hhhhhhhhhhhh'], 9: [5, 'WWWWhhhhWWWW'] });
  const lowered = put(put(sleepBody, 16, 12, rest.map(r => r.replace(/h/g, 'c'))), 21, 9, ['.O', 'Ou', 'uO', 'O.']);
  const sleep2a = put(lowered, 0, 0, ['zzz', '..z', '.z.', 'zzz']);
  const sleep2b = put(lowered, 0, 1, ['zzz', '..z', '.z.', 'zzz']);

  // ---- III ----
  const body3 = [
    '......OO............OO......',
    '.....OHhO...O..O...OHhO.....',
    '......OOO.OOOddOOO.OOO......',
    '........OTTtTttTttdO........',
    '.......OTtTtttTtttddO.......',
    '......OTtttTttTttttddO......',
    '.....OTTtTttTttTttTtddO.....',
    '....OtTTTTTTTTTTTTTTTtdO....',
    '.....OKKWWWWKKKKWWWWKKO.....',
    '.....OHhWWeehhhheeWWhKO.....',
    '.....OHhWWeehhhheeWWhKO.....',
    '.....OhpWWWWhhhhWWWWpKO.....',
    '..OOOOOhhhhhhHHhhhhhKOOOOO..',
    '.OrlrrOOOKKKKKKKKKKOOOKKRRO.',
    '.OrlrrrrrOOOOOOOOOOrrrKKRRO.',
    '.OrlrrrrrrrrrOOrrrrrrrrrRRO.',
    '.OrrrrrrrKKKrOOrKKKrrrrrRRO.',
    '.ORrrrrrrKKKrOOrKKKrrrrRRRO.',
    '.ORrrrrrrrrrrOOrrrrrrrrRRRO.',
    '..ORRrrrrrrrrOOrrrrrrrRRRO..',
    '...OOOOOOOOOOOOOOOOOOOOOO...',
    '......OKKO........OKKO......',
  ];
  const jawL = [
    '..O...',
    '.ONO..',
    'ONmO..',
    'ONmO..',
    'ONmOO.',
    'ONmNmO',
    'ONmOO.',
    '.ONmO.',
    '..ONmO',
  ];
  const flip = rows => rows.map(r => [...r].reverse().map(c => (c === 'N' ? 'm' : c === 'm' ? 'N' : c)).join(''));
  const jawR = flip(jawL);
  const glass = [
    '.YGGg.',
    'Y....g',
    'G....g',
    'G....g',
    'G....g',
    '.Gggg.',
  ];
  const chain = ['O.', 'gO', 'OG', '.g', '.G'];
  const file = [
    'OOO.....',
    'OfFOOOOO',
    'OWWWWWWO',
    'OffffxFO',
    'OfxfxfFO',
    'OffxffFO',
    'OOOOOOOO',
  ];
  const paw = ['OHO', 'hhO', 'OO.'];
  const dress = (b, o = {}) => {
    let g = put(b, 0, 4 + (o.jaw || 0), jawL);
    g = put(g, 22, 4 + (o.jaw || 0), jawR);
    if (!o.noGlass) g = put(g, 15, 7 + (o.gy || 0), glass);
    g = put(g, 20, 12, chain);
    g = put(g, 0, 14 + (o.fy || 0), file);
    g = put(g, 6, 16 + (o.fy || 0), paw);
    return g;
  };
  // Eyes under the brim. The right one sits behind the monocle; `c` is glare on its glass.
  const eyes3 = (rows, l, r) => Object.fromEntries(rows.map((y, i) => [y, [8, l[i] + 'hhhh' + r[i]]]));
  const face3 = (l, r, extra = {}) => mod(body3, { ...eyes3([8, 9, 10, 11], l, r), ...extra });
  const OPEN_L = ['WWWW', 'WWee', 'WWee', 'WWWW'];
  const OPEN_R = ['WWWW', 'ceeW', 'eeeW', 'WWWW'];
  const SHUT3 = ['KKKK', 'hhhh', 'hhhh', 'WWWW'];
  const JOY3 = ['KKKK', 'hWWh', 'WhhW', 'hhhh'];
  const idle3 = dress(face3(OPEN_L, OPEN_R));
  const blink3 = dress(face3(SHUT3, SHUT3));
  const talk3 = dress(face3(OPEN_L, OPEN_R, { 12: [12, 'hppH'] }));
  const talk3b = dress(face3(OPEN_L, OPEN_R, { 12: [13, 'pH'] }));
  const happy3 = dress(face3(JOY3, JOY3, { 11: [7, 'p'], 12: [12, 'HppH'] }));
  const happy3b = ['.'.repeat(28), ...happy3.slice(0, 20), happy3[21]];
  const think3 = put(dress(face3(['WeeW', 'WeeW', 'WWWW', 'WWWW'], ['ceeW', 'eeeW', 'WWWW', 'WWWW'])), 23, 0, ['....W', '..W..', 'W....']);
  const fidget3 = dress(face3(['WWWW', 'eeWW', 'eeWW', 'WWWW'], ['WWWW', 'eeWW', 'eeWW', 'WWWW']), { fy: -1 });
  // Asleep: deerstalker pulled down over the eyes, monocle dropped to the end of its chain.
  const napped = [
    '.'.repeat(28), '.'.repeat(28),
    ...body3.slice(0, 7),
    body3[7],
    '.....OKKKKKKKKKKKKKKKKO.....',
    '.....OhpHhhhhhhhhhhhpKO.....',
    ...body3.slice(12),
  ];
  const sleepRaw = dress(napped, { noGlass: true });
  const dangle = ['.OGO', 'OGcg', '.OgO'];
  const sleep3 = put(put(sleepRaw, 20, 16, dangle), 0, 0, ['zzz', '..z', '.z.', 'zzz']);
  const sleep3b = put(put(sleepRaw, 20, 16, dangle), 1, 1, ['zz', '.z', 'zz']);

  PatchDex.evolve('dotty', {
    habit: 'verification',
    stages: [
      {
        name: 'Dottective',
        species: 'magnifier ladybird',
        blurb: 'Grew a size and found a brass lens in the leaf litter. Now nothing counts as fixed until it has been looked at up close.',
        voice: 'the fix compiled. now show me it actually ran.',
        evolve: 'The shell broadened and a magnifier appeared, because you started checking results instead of trusting them.',
        palette: {
          G: '#e3b34c', Y: '#fff1a8', g: '#9c6a26', c: '#cfe9ff', u: '#7a4a2c', U: '#b47d4c', z: '#c9d6ff',
        },
        sprites: { idle: idle2, blink: blink2, talk: talk2a, talk2: talk2b, happy: happy2a, happy2: happy2b, think: think2, fidget: fidget2, sleep: sleep2a, sleep2: sleep2b },
      },
      {
        name: 'Stagwright',
        species: 'stag-beetle detective',
        blurb: 'Keeps a case file on every bug and never closes one on a hunch; the mandibles are for holding evidence.',
        voice: "case isn't closed until the test that failed now passes.",
        evolve: 'Antlered mandibles, a deerstalker, and a case file arrived when you made checking the result a habit you never skip.',
        palette: {
          G: '#e3b34c', Y: '#fff1a8', g: '#9c6a26', c: '#cfe9ff', z: '#c9d6ff',
          T: '#b58f63', t: '#82603f', d: '#4f3626',
          N: '#c0623f', m: '#7e2e25',
          f: '#e8c98a', F: '#b8924f', x: '#3fae5a',
        },
        sprites: { idle: idle3, blink: blink3, talk: talk3, talk2: talk3b, happy: happy3, happy2: happy3b, think: think3, fidget: fidget3, sleep: sleep3, sleep2: sleep3b },
      },
    ],
  });
})();
