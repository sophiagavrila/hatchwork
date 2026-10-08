// Loam evolutions. II Kilnward: a sturdy matte clay golem with spare scrolls in its belt and moss on its shoulders.
// III Terrazant: kiln-fired and glazed, cobalt plates, a glowing scroll niche, and a potted sprout where the pinch used to be.
(function () {
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const sink = (base, row) => ['.'.repeat(base[0].length), ...base.slice(0, row), ...base.slice(row + 1)];

  // ---- II ----
  const A = (() => {
    const idle = [
      '...........oo............',
      '.........oohloo....oo....',
      '.......oohhllbboo.owSo...',
      '......ohhlbbbbbbdoosSooo.',
      '.....ohlbbbbbddbbdosSowSo',
      '.....olbbbbbbdlbbdoRRoRRo',
      '.....olbDDbbbbDDbdosSosSo',
      '..aa.olbwgbbbbwgbdoaaaaa.',
      '.annaolbgGbbbbgGbdoanmma.',
      'anmmMolbbbbbbbbbbdonmmMa.',
      'oMblbobbbbbDDbbbbdobbMdo.',
      'olbbdDoddddddddddoDbdddo.',
      'olbbdolDDDDDDDDDDdobddDo.',
      '.olbdolbboooooobbdobddo..',
      '.olbdolbboSssSobbdobddo..',
      '.oDddobbboooooobddoDDdo..',
      'ohlbdorRrRrRrRrRrRobbddo.',
      'olbbdodbdbbbbbbdbdobddDo.',
      'obddDoobbdoooobbdoodDDDo.',
      '.oooo.obddo..obddo.oooo..',
      '......ooooo..ooooo.......',
    ];
    const eyes = (b, l, r) => put(put(b, 8, 6, l), 14, 6, r);
    const caret = ['bggb', 'gbbg', 'bbbb'];
    const happy = put(put(put(idle, 7, 6, caret), 13, 6, caret), 10, 10, ['DbbD', '.oo.']);
    const asleep = eyes(put(idle, 10, 14, ['kSSk']), ['bb', 'bb', 'DD'], ['bb', 'bb', 'DD']);
    return {
      idle,
      blink: eyes(idle, ['DD', 'bb', 'DD'], ['DD', 'bb', 'DD']),
      talk: put(idle, 10, 10, ['DooD', '.oo.']),
      talk2: put(idle, 11, 10, ['oo']),
      happy,
      happy2: sink(happy, 11),
      sleep: put(sink(asleep, 11), 1, 0, ['zzz', '..z', '.z.', 'zzz']),
      sleep2: put(sink(asleep, 11), 2, 0, ['zz', '.z', 'zz']),
      think: put(eyes(idle, ['wg', 'gG', 'bb'], ['wg', 'gG', 'bb']), 1, 0, ['.g.', 'g..', '.g.', '...', '.g.']),
      fidget: put(eyes(idle, ['DD', 'bb', 'wg'], ['DD', 'bb', 'wg']), 10, 14, ['gwgg']),
    };
  })();

  // ---- III ----
  const B = (() => {
    const idle = [
      '...........nn..Mm...........',
      '............nmmM............',
      '..........oDDmMDDo..........',
      '..........owvcccCo..........',
      '..........oocccCoo..........',
      '........oowhllbbbboo........',
      '.......ohhlbbbbbddbdo.......',
      '.......ohlbbbbbbdlbdo.......',
      '..oooo.ohlbbbbbbbbbdo.oooo..',
      '.owvvccolbwgbbbbwgbdocvvcCo.',
      'owvccccolbgGbbbbgGbdovccCCCo',
      'ovccccCobbbbbDDbbbbdocccCCCo',
      'oCCCCCCooddddddddddoCCCCCCCo',
      'oCCCCCClDDDDDDDDDDDDdCCCCCCo',
      '.olbdoolbvvccccccCCbdoobddo.',
      '.olbdoolbvogwwwwgoCbdoobddo.',
      '.ovcCoobbcogSssSgoCbdoovcCo.',
      'ohlbdoolbcoGggggGoCbdoobdDDo',
      'olbbdDodddcCCCCCCCCddoDbdDDo',
      '.ooooo..olbdoooobdDo..ooooo.',
      '........ovcCo..ovCCo........',
      '.......oooooo..oooooo.......',
    ];
    const eyes = (b, l, r) => put(put(b, 10, 9, l), 16, 9, r);
    const caret = ['bggb', 'gbbg'];
    const happy = put(put(put(idle, 9, 9, caret), 15, 9, caret), 12, 11, ['DbbD', '.oo.']);
    // idle2: the sprout's leaves lean in a breeze
    const sway = ['............nn..Mm..........', '............nmmM............', ...idle.slice(2)];
    const flare = b => put(b, 11, 15, ['wwwwww', 'wSssSw', 'gwwwwg']);
    const dim = b => put(b, 11, 15, ['GGGGGG', 'GSkkSG', 'GGGGGG']);
    const asleep = dim(eyes(idle, ['bb', 'DD'], ['bb', 'DD']));
    return {
      idle,
      idle2: sway,
      blink: eyes(idle, ['bb', 'DD'], ['bb', 'DD']),
      talk: put(idle, 12, 11, ['DooD', '.oo.']),
      talk2: put(idle, 13, 11, ['oo']),
      happy: flare(happy),
      happy2: sink(flare(happy), 12),
      sleep: put(sink(asleep, 12), 2, 1, ['zzz', '..z', '.z.', 'zzz']),
      sleep2: put(sink(asleep, 12), 3, 1, ['zz', '.z', 'zz']),
      think: put(eyes(idle, ['gw', 'Gg'], ['gw', 'Gg']), 21, 0, ['.g.', '..g', '.g.', '...', '.g.']),
      fidget: flare(eyes(sway, ['bb', 'wg'], ['bb', 'wg'])),
    };
  })();

  PatchDex.evolve('loam', {
    habit: 'context',
    stages: [
      {
        name: 'Kilnward',
        species: 'mossback clay golem',
        blurb: 'Sturdier now, dried matte in the sun, with spare scrolls tucked in its belt for every repo it works in. Moss grows where it stands still long enough to be useful.',
        voice: 'you told me that last session. want it on the scroll?',
        evolve: 'Its clay set and it started carrying scrolls of its own: you have begun writing lessons down once instead of repeating them every session.',
        palette: {
          h: '#e4b089', l: '#cc8758', b: '#a9653f', d: '#82472e',
          m: '#6f8c3b', M: '#47622a', n: '#a7c264', a: '#2f3a1c',
          r: '#b08550', R: '#6e4a2a',
        },
        sprites: A,
        loop: [['idle', 24], ['blink', 2], ['idle', 16], ['fidget', 14], ['idle', 12], ['blink', 2], ['idle', 18], ['think', 12], ['idle', 10]],
      },
      {
        name: 'Terrazant',
        species: 'glazed kiln colossus',
        blurb: 'Fired hard in a kiln and glazed in terracotta and cobalt, with its instructions etched into its own surface where the rain cannot wash them off. Something has finally taken root on its head.',
        voice: "it's written into me now. teach me once, then let me work.",
        evolve: 'The loose scrolls are gone, fired into its glaze and lit in its chest: your instructions file is now the first place you put a lesson, and the agent carries it everywhere.',
        palette: {
          o: '#2e1710', D: '#5a2416', d: '#94401f', b: '#c9693a', l: '#ea9257', h: '#ffd0a3', w: '#ffffff',
          c: '#2f64cc', C: '#1b3787', v: '#86aef5',
          g: '#ffd65c', G: '#f08f1c', s: '#fff4d6', S: '#d9b67c',
          m: '#5f9a3a', M: '#3d6b2a', n: '#a6dc6a',
        },
        sprites: B,
        loop: [['idle', 18], ['idle2', 10], ['idle', 14], ['blink', 2], ['idle2', 10], ['idle', 14], ['fidget', 12], ['idle', 10], ['blink', 2], ['idle2', 10], ['think', 12]],
      },
    ],
  });
})();
