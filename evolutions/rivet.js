// Rivet evolutions — II: plated armadillo wearing a test-runner gauge. III: fortress armadillo, a check light on every band.
(function () {
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const Q = ['.LL.', 'L..L', '..L.', '....', '..L.'];
  const Z1 = ['LLL.', '..L.', '.L..', 'LLL.'];
  const Z2 = ['....', 'LL..', '.L..', 'LL..'];

  // ---- II · Adept: riveted bands, and a dial on its back that only rests in the green.
  const idle = [
    '..............OOOOO......',
    '.............OnccKeO.....',
    '.............OncceKO.....',
    '........oo..OOYYeYYOO....',
    '.......oFo.ooLLsLBsBsO...',
    '......oFpootoLBsLBsBsSO..',
    '.....oFppottoLBsLBsBsSsO.',
    '.....oTpoOotoBBSBsSssOSO.',
    '......oo.OLBRBBRBsRssRSO.',
    '....OOOOOOLBSBBSBsSssOSO.',
    '...OLLBBsOBsSBBSBsSssOSO.',
    '..oFTTTTTtosOssOsSOSSOSO.',
    '.oFTTewTTtosOssOsSOSSOSO.',
    'pFTTTeeTTtosOssOsSOSSOSO.',
    'oopTTeepTtoSOsSOSSOSSOSO.',
    '..ootTTttooSRSSRSSRSSRO..',
    '....oooooOOOOOOOOOOOOO...',
    '..oTTo....oTTo....otto...',
    '..oTTo....otto....otto...',
    '..oooo....oooo....oooo...',
  ];
  // Gauge needle (pivot at col 16 row 3) over a cream face: red zone left, green zone right.
  const NEEDLE = {
    pass: ['OnccKeO', 'OncceKO'],
    max: ['OnccKKO', 'OncceeO'],
    up: ['OnceKKO', 'OncecKO'],
    rest: ['OeccKKO', 'OneccKO'],
  };
  const dial = (base, n) => put(base, 13, 1, NEEDLE[n]);
  const face = {
    blink: { 12: '.oFTTTTTTto', 13: 'pFTTTeeTTto', 14: 'oopTTTTpTto' },
    talk: { 14: 'ooeTTeepTto', 15: '..potTTttoo' },
    talk2: { 14: 'ooeTTeepTto' },
    happy: { 12: '.oFTTeeTTto', 13: 'pFTTeTTeTto', 14: 'ooeTTTTppto', 15: '..potTTttoo' },
    sleep: { 12: '.oFTTTTTTto', 13: 'pFTTTTTTTto', 14: 'oopTeeTpTto' },
    think: { 12: '.oFTTweTTto', 13: 'pFTTTeeTTto', 14: 'oopTTeepTto' },
  };
  const W2 = idle[0].length;
  const pad = s => ['.'.repeat(W2), ...s];
  const lift = s => [...s, '.'.repeat(W2)];
  const happy = dial(mod(idle, face.happy), 'max');
  const sleepBase = dial(mod(idle, { ...face.sleep, 3: '..........', 4: '........oo' }), 'rest');
  const II = {
    idle: pad(idle),
    idle2: pad(dial(idle, 'max')),
    blink: pad(mod(idle, face.blink)),
    talk: pad(mod(idle, face.talk)),
    talk2: pad(dial(mod(idle, face.talk2), 'up')),
    happy: pad(happy),
    happy2: lift(happy),
    sleep: pad(put(sleepBase, 0, 0, Z1)),
    sleep2: pad(put(sleepBase, 1, 0, Z2)),
    think: pad(put(dial(mod(idle, face.think), 'up'), 0, 0, Q)),
    fidget: pad(dial(mod(idle, { 3: '.......oo...', 4: '......oFo.oo', 5: '......oFpooto' }), 'up')),
  };

  // ---- III · Ascended: the bands rise into battlements and each exposed band carries a check light.
  const idle3base = [
    '.............OOOOO..........',
    '.............OLLLO...OOOOO..',
    '.............OsSsOOOOOLLLO..',
    '...........OOsLBssLLBsSsSO..',
    '........ooOLBsLBssLBssLBssO.',
    '.......oFoLoosLBssLBssBssSO.',
    '......oFpootoSLBsSBssSBsSSO.',
    '.....oFppottoSLBsSBssSBsSSO.',
    '.....oTppootoSLBsSBssSBsSSO.',
    '.....oTpoOoosSLBsSBssSBsSSO.',
    '....OOOOOOOBsSLBsSBssSBsSSO.',
    '...OLLLBRBsOsOBssOBsSOsSSSO.',
    '..OLBBBBssssOOBssOBsSOsSSSO.',
    '..oFTTTTTTtosOBssOBsSOsSSSO.',
    '.oFTTTewTTtoSOBsSOsSSOsSSSO.',
    'pFTTTTeeTTtoSOBsSOsSSOsSSSO.',
    'oopTTTeepTtoSOBsSOsSSOsSSSO.',
    '..ootTTTttooSRSSSRSSSRSSSRO.',
    '....ooooooOOOOOOOOOOOOOOOO..',
    '..oTTTo.....oTTTo....oTTo...',
    '..oTTto.....oTTto....otto...',
    '.oFoFoFo...oFoFoFo..oFoFo...',
  ];
  // Check lights: a lens with a tick in it (cols 14/18/22, rows 8-10).
  const LX = [14, 18, 22];
  const LAMP = {
    on: ['kkG', 'GkG', 'kGk'],
    hot: ['KKG', 'GKG', 'KGK'],
    dim: ['SSk', 'kSk', 'SkS'],
    off: ['LBs', 'LBs', 'Bss'],
  };
  const lamps = (base, states) => states.reduce((b, st, i) => put(b, LX[i], 8, LAMP[st]), base);
  const idle3 = lamps(idle3base, ['on', 'on', 'on']);
  const face3 = {
    blink: { 14: '.oFTTTTTTTto', 15: 'pFTTTTeeTTto', 16: 'oopTTTTTpTto' },
    talk: { 16: 'ooeTTTeepTto', 17: '..potTTTttoo' },
    talk2: { 16: 'ooeTTTeepTto' },
    happy: { 14: '.oFTTTeeTTto', 15: 'pFTTTeTTeTto', 16: 'ooeTTTTTppto', 17: '..potTTTttoo' },
    sleep: { 14: '.oFTTTTTTTto', 15: 'pFTTTTTTTTto', 16: 'oopTTeeTpTto' },
    think: { 14: '.oFTTTweTTto', 15: 'pFTTTTeeTTto', 16: 'oopTTTTTpTto' },
  };
  const ears3 = { 4: '.......oo.', 5: '......oFo', 6: '......oFpo' };
  const happy3 = lamps(mod(idle3, face3.happy), ['hot', 'hot', 'hot']);
  const sleep3 = lamps(mod(idle3, { ...face3.sleep, 4: '..........', 5: '........oo' }), ['dim', 'dim', 'dim']);
  const III = {
    idle: idle3,
    idle2: lamps(idle3, ['hot', 'on', 'hot']),
    blink: mod(idle3, face3.blink),
    talk: mod(idle3, face3.talk),
    talk2: lamps(mod(idle3, face3.talk2), ['on', 'hot', 'on']),
    happy: happy3,
    happy2: lamps(mod(happy3, ears3), ['on', 'on', 'on']),
    sleep: put(sleep3, 1, 0, Z1),
    sleep2: put(sleep3, 2, 0, Z2),
    // Re-running the checks, left to right.
    think: put(lamps(mod(idle3, face3.think), ['on', 'hot', 'off']), 1, 0, Q),
    fidget: lamps(mod(idle3, ears3), ['on', 'off', 'on']),
  };

  PatchDex.evolve('rivet', {
    habit: 'verification',
    stages: [
      {
        name: 'Gaugeback',
        species: 'gauge-backed armadillo',
        blurb: 'Wears a pressure dial bolted to its shell and checks it more often than it speaks. The needle only settles when the suite does.',
        voice: "needle's not in the green yet. run the suite and read it.",
        evolve: 'Its plates thickened into riveted bands and it grew a gauge it trusts more than its own eyes: you stopped saying "should work" and started running the tests.',
        palette: { c: '#f1ead2', K: '#5bd36a', n: '#e0483e', Y: '#f5d27a' },
        sprites: II,
        loop: [['idle', 28], ['blink', 2], ['idle', 18], ['idle2', 3], ['idle', 12], ['fidget', 5], ['idle', 16], ['blink', 2], ['idle', 6], ['blink', 2]],
      },
      {
        name: 'Bastillo',
        species: 'fortress armadillo',
        blurb: 'Its bands rose into battlements, and each one holds a lamp that turns green only when something has been proven. Nothing gets past these walls on vibes.',
        voice: "every lamp green, or it isn't done. which check is missing?",
        evolve: 'The gauge became a wall of check lights, one per band: you verify by reflex now, tests run and output read before anything is called done.',
        palette: { G: '#d4ffbf', K: '#5bd36a', k: '#24804a' },
        sprites: III,
        loop: [['idle', 20], ['idle2', 4], ['idle', 14], ['blink', 2], ['idle', 18], ['fidget', 4], ['idle', 12], ['idle2', 4], ['idle', 10], ['blink', 2]],
      },
    ],
  });
})();
