// Mochi's later forms. II Nimbun: a round cloud-cat on its own cushion, tail puffed into a little cloud.
// III Crescat: a cloud-cat lounging in a crescent moon, its tail turned into a strip of starry night.
(function () {
  // Stamp small rows at (x, y); '.' is transparent, '_' erases.
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch === '_' ? '.' : ch; }); return a.join('');
  });
  const all = (base, ...stamps) => stamps.reduce((r, s) => put(r, ...s), base);

  // ---- II · Nimbun (25×21) ----
  const n = [
    '...oo.........oo.........',
    '...ohno.ooo.onGo.........',
    '...ohnnooHoonnGo....ooo..',
    '..ohhHhhggggggGGo..oWWHo.',
    '.ohHhhgggggggggGGo.oWHhho',
    '.ohhhgggggggggggGGooHhhgo',
    '.ohhgwegggggwegGGo.oGGGo.',
    '.ohhgeAgggggeAggGo..ohhgo',
    'ohhgbbggWnWggbbggGooohggo',
    'ohhggggWWoWWgggggGooGgggo',
    '.ooggggcoWocggggoo.oGGGo.',
    '..oDgcWWWWWWWcgDo..ohhgo.',
    '.ohhgcWWWWWWWcgGGoohhggGo',
    '.ohggcWcWWWcWcggGooGgggGo',
    'ohhggggcgcgcgggggGooGGGo.',
    'ohgggWWcgggWWcgggGohhgGo.',
    'youDGcWcGGGcWcGDGoGGGDouy',
    'ouHuuuuuuuuuuuuuuuuuuuUvo',
    'oUuUUUUUUUUUvUUUUUUUUUvvo',
    '.oUUUUUUUUUUUUUUUUUUUvvo.',
    'y.ooooooooooooooooooooo.y',
  ];
  const nEyes = (l, r = l) => [[5, 6, l], [12, 6, r]];
  const nShut = nEyes(['gg', 'ee']);
  const nTip = dx => [19 + dx, 2, ['.ooo.', 'oWWHo', 'oWHhho', 'oHhhgo']];
  const nTuck = [[18, 2, ['_______', '_______', '_______', '_______', '_______']], [21, 6, ['ooo']]];
  const nTipClear = [19, 2, ['_____', '_____', '______', '.______']];
  const N = {
    idle: n,
    idle2: all(n, nTipClear, nTip(-1)),
    blink: all(n, ...nShut),
    talk: all(n, [7, 9, ['WoooW', 'conoc']]),
    talk2: all(n, [7, 9, ['WWoWW', 'coooc']]),
    happy: all(n, [5, 6, ['ee', '..']], [12, 6, ['ee', '..']], [4, 7, ['egge']], [11, 7, ['egge']], [7, 9, ['WoooW', 'conoc']]),
    happy2: all(n, [5, 6, ['ee', '..']], [12, 6, ['ee', '..']], [4, 7, ['egge']], [11, 7, ['egge']], [7, 9, ['WoooW', 'conoc']],
      [17, 0, ['.y.', 'yHy', '.y.']], [0, 3, ['y']]),
    sleep: all(n, ...nShut, ...nTuck, [7, 9, ['WWWWW', 'cWoWc']], [19, 0, ['hhhh', '...h', '..h.', '.h..', 'hhhh']]),
    sleep2: all(n, ...nShut, ...nTuck, [7, 9, ['WWWWW', 'cWWWc']], [20, 1, ['hhhh', '...h', '..h.', '.h..', 'hhhh']], [17, 4, ['h']]),
    think: all(n, [5, 6, ['gg', 'gg']], [12, 6, ['gg', 'gg']], [6, 5, ['we']], [13, 5, ['we']], [6, 6, ['eA']], [13, 6, ['eA']],
      [7, 9, ['WWWWW', 'cWoWc']], [17, 1, ['a']], [18, 0, ['a']]),
    fidget: all(n, [14, 0, ['_.o']], [12, 1, ['onnGo']]),
    fidget2: all(n, [4, 14, ['gWWc', 'gcWc', 'DGGG']]),
  };

  // ---- III · Crescat (28×22) ----
  const c = [
    '.....................ooooo..',
    '.....o..........o...oSSsSSo.',
    '....oho........oGo..oSooSwSo',
    '....ohno......onGo..oyooSsSo',
    '....ohnnoooooonnGo...o.oSSSo',
    '...ohhhhhgyygggggGo....oSySo',
    '...ohhggggyggggggGo....osSSo',
    '...ohgwegggggggweGo...oSSSo.',
    '...ohgeAgggggggeAGo..oSSwSo.',
    '...ohbbggWnnWggbbGoooSSSSo..',
    '.o.oggggWoWWoWgggGogggggo.o.',
    'oyo.oggcWWWWWWcgGoggggggGoyo',
    'oYyooGgccccccccgGogggGGGoyYo',
    'oYYyooWWWWccWWWWogGGGGGoyYYo',
    'oYYYyoWcWcGGcWcWoGGGGooyYYYo',
    '.oYYYYooooooooooGGDooyYYYYo.',
    '.oMYYYYYyoooDDDDoooyYYYYYMo.',
    '..oMYYYYYYYyooooyYYYYYYYMo..',
    '...oMMYYYMYYYYYYYYYYYYMMo...',
    '....ooMMYYYYYYYYYMYYMMoo....',
    '......ooMMMMMMMMMMMMoo......',
    '........oooooooooooo........',
  ];
  const cShut = [[6, 7, ['gg', 'ee']], [15, 7, ['gg', 'ee']]];
  const cJoy = [[6, 7, ['ee', 'gg']], [5, 8, ['e..e']], [15, 7, ['ee', 'gg']], [14, 8, ['e..e']]];
  const cOpen = [8, 10, ['WWooWW', 'WonnoW']];
  const cTwinkle = [[25, 2, ['s']], [25, 3, ['w']], [25, 5, ['S']], [24, 6, ['y']], [24, 8, ['S']], [23, 7, ['w']]];
  const C = {
    idle: c,
    idle2: all(c, ...cTwinkle, [19, 6, ['y']], [0, 7, ['y']]),
    blink: all(c, ...cShut),
    talk: all(c, cOpen),
    talk2: all(c, [8, 10, ['WoWWoW', 'WWooWW']]),
    happy: all(c, ...cJoy, cOpen),
    happy2: all(c, ...cJoy, cOpen, ...cTwinkle, [0, 5, ['.y.', 'ywy', '.y.']], [19, 4, ['y']], [27, 9, ['y']]),
    sleep: all(c, ...cShut, [8, 10, ['WWWWWW', 'WWWWWW']], [0, 0, ['HHHH', '...H', '..H.', '.H..', 'HHHH']]),
    sleep2: all(c, ...cShut, [8, 10, ['WWWWWW', 'WWWWWW']], [0, 0, ['HHHH', '...H', '..H.', '.H..', 'HHHH']], ...cTwinkle, [5, 0, ['H']]),
    think: all(c, [6, 7, ['gg', 'gg']], [15, 7, ['gg', 'gg']], [7, 6, ['we', 'eA']], [16, 6, ['we', 'eA']],
      [8, 10, ['WWWWWW', 'WWooWW']], [1, 3, ['Y']], [0, 1, ['y']]),
    fidget: all(c, [16, 1, ['_o']], [15, 2, ['oGGo']]),
    fidget2: all(c, [4, 1, ['o_']]),
  };

  PatchDex.evolve('mochi', {
    habit: 'context',
    stages: [
      {
        name: 'Nimbun',
        species: 'cushioned cloud-cat',
        blurb: 'Puffed up into a soft little cloud and claimed a cushion of its own. It naps on schedule, not when it collapses.',
        voice: 'that thread is getting long. summarize it, then start clean.',
        evolve: 'Mochi grew round and cloud-soft and found a cushion, because you started ending sessions on purpose instead of letting them sprawl.',
        palette: { H: '#ebe7f0', b: '#e3a9b8', u: '#b3c1ee', U: '#8494d6', v: '#5c66ab', y: '#f2c95e' },
        sprites: N,
        loop: [['idle', 24], ['blink', 2], ['idle', 10], ['idle2', 6], ['idle', 14], ['fidget', 3], ['idle', 2], ['fidget', 3], ['idle', 16],
          ['blink', 2], ['idle', 8], ['fidget2', 4], ['idle', 10], ['think', 12], ['idle', 8]],
      },
      {
        name: 'Crescat',
        species: 'moon-lounging cloud-cat',
        blurb: 'Lounges in a crescent moon with its tail spilled into the night sky. Every star on that tail is a session it closed clean.',
        voice: 'new moon, new context. carry the summary, leave the noise.',
        evolve: 'Nimbun drifted up to the moon and its tail filled with stars, because you kept context lean and ended every session clean.',
        palette: { H: '#ebe7f0', b: '#e3a9b8', y: '#fff0b8', Y: '#f5cf63', M: '#d39a3a', s: '#6a70c4', S: '#3d4290' },
        sprites: C,
        loop: [['idle', 24], ['blink', 2], ['idle', 12], ['idle2', 6], ['idle', 14], ['fidget', 3], ['idle', 2], ['fidget', 3], ['idle', 16],
          ['blink', 2], ['idle', 8], ['idle2', 6], ['idle', 6], ['fidget2', 4], ['idle', 10], ['think', 12], ['idle', 8]],
      },
    ],
  });
})();
