// Riddle's later forms: Enigmew (winged sphinx youth with a test tablet) and Quaestor (the great sphinx guardian).
(function () {
  const A = [
    'o......o.........o......o',
    'ooo...olo.......odo...ooo',
    'oflo..olpo.....opdo..oFfo',
    'oFflo.olppoooooppdo.oFffo',
    'oFfflocaagaagaagaaAoFffFo',
    'oFfflocaagaagaagaaAoFffFo',
    'oFFfohgggggggggggggGofFFo',
    'oFFFoaalebbbbbbbedAAoFFFo',
    '.oFFogglbwebbbwebdGGoFFo.',
    '.oaAoaalbeebbbeebdAAoAAo.',
    '..ocogglbpbbnbbpbdGGoGo..',
    '..oooaalbbbbmbbbddAAooo..',
    '....oggodbbmbmbddoGGoooo.',
    '....oaaohgggggggGoAAolbbo',
    '...oggGoAoooooooAoGGGoobo',
    '.ooooooolotqqqtodoooooobo',
    '.olbbbbdbotttqTobbbbdobo.',
    '.olbbooooottqTTooooodbo..',
    '.olbolbbdottTTTolbbdobdo.',
    '.obdobobdottqTTobobdodDo.',
    '..ooooooooooooooooooooo..',
  ];
  const B2 = [
    '............................',
    '.....oo.............oo......',
    '....offoo.........ooffo.....',
    '...ooffolo...o...odoffoo....',
    '..ofoffolpo.oho.opdoffofo...',
    '..ofFffolppoogooppdoffFfo...',
    '.offffocaagaagaagaaAoffffo..',
    '..offocgaagaagaagaaGAoffo...',
    '.ooafohggggggcggggggGofAoo..',
    'offgfoaaleeebbbeeedAAofGffo.',
    '.ofaFogglbwebbbwebdGGoFAfo..',
    'ofFgfoaalbeebbbeebdAAofGFfo.',
    'offaGogglbpbbnbbpbdGGoGAffo.',
    '.ofgGoaalbbbbmbbbddAAoGGooo.',
    'offaGoggodbbmbmbddoGGoGoblbo',
    '.oFggoaahgggggggggGAAoGooobo',
    '..oooggGoooooooooooGGGoooobo',
    '.ooooooootggtuutgTooooooobo.',
    '.olbbooootttttttTToooobdbo..',
    '.olbolbdotutggtqTTolbdobdo..',
    '.obdobobottttttTTTobobodDo..',
    '..ooooooooooooooooooooooo...',
  ];
  const B = [
    '.....oo.............oo......',
    '....offo...........offo.....',
    '...oofffo.........offfoo....',
    '..ofoffolo...o...odoffofo...',
    '..ofFffolpo.oho.opdoffFfo...',
    '.offfffolppoogooppdofffffo..',
    '..offFocaagaagaagaaAoFffo...',
    '.ooffocgaagaagaagaaGAoffoo..',
    'offafohggggggcggggggGofAffo.',
    '.ofgFoaaleeebbbeeedAAoFGfo..',
    'ofFafogglbwebbbwebdGGofAFfo.',
    'offgGoaalbeebbbeebdAAoGGffo.',
    '.ofaGogglbpbbnbbpbdGGoGAfo..',
    'offgGoaalbbbbmbbbddAAoGGooo.',
    '.oFagoggodbbmbmbddoGGoGoblbo',
    '..ooooaahgggggggggGAAooooobo',
    '....oggGoooooooooooGGGo..obo',
    '.ooooooootggtuutgTooooooobo.',
    '.olbbooootttttttTToooobdbo..',
    '.olbolbdotutggtqTTolbdobdo..',
    '.obdobobottttttTTTobobodDo..',
    '..ooooooooooooooooooooooo...',
  ];
  const helpers = W => {
    const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
    const put = (base, x, y, rows) => base.map((r, j) => {
      const p = rows[j - y]; if (p === undefined) return r;
      const a = [...r]; [...p].forEach((ch, i) => { if (ch !== ' ' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
    });
    const sink = (base, row) => ['.'.repeat(W), ...base.slice(0, row), ...base.slice(row + 1)];
    return { mod, put, sink };
  };
  // Move a vertical band of columns up (dy<0) or down (dy>0); used for wing beats.
  const band = (base, x0, x1, dy, y1 = base.length - 1) => base.map((r, j) => {
    const src = j - dy;
    const from = src >= 0 && src <= y1 && j <= y1 ? base[src] : (j <= y1 ? '.'.repeat(r.length) : r);
    return r.slice(0, x0) + from.slice(x0, x1 + 1) + r.slice(x1 + 1);
  });
  const formA = () => {
    const { put, sink } = helpers(25);
    const Z = ['zzz', '..z', '.z.', 'zzz'];
    const eyes = (g, l, r) => put(put(g, 9, 8, l), 14, 8, r);
    const mouth = (g, rows) => put(g, 11, 11, rows);
    const tablet = (g, rows) => put(g, 10, 15, rows);
    const CHECK = ['ttttq', 'tttqT', 'qtqTT', 'tqTTT', 'ttTTT'];
    const GLOW = ['uqqqu', 'uuuqu', 'uuquu', 'uuuuu', 'uuquu'];
    const idle = A;
    const idle2 = band(band(A, 0, 3, 1, 12), 21, 24, 1, 11);
    const blink = eyes(A, ['bb', 'ee'], ['bb', 'ee']);
    const talk = mouth(A, ['bmb', 'mnm']);
    const talk2 = mouth(A, ['bmb', 'bmb']);
    const happyFace = g => put(put(put(g, 9, 8, ['beb', 'ebe']), 13, 8, ['beb', 'ebe']), 10, 11, ['mbbbm', 'bmmmb']);
    const happy = happyFace(A);
    const happy2 = tablet(happyFace(band(band(A, 0, 3, -1, 12), 21, 24, -1, 11)), CHECK);
    const sleepy = g => put(eyes(g, ['bb', 'ee'], ['bb', 'ee']), 11, 11, ['bbb', 'bmb']);
    const sleep = put(sink(sleepy(A), 13), 10, 0, Z);
    const sleep2 = put(sink(sleepy(A), 13), 12, 0, Z);
    const think = tablet(mouth(eyes(A, ['ew', 'bb'], ['ew', 'bb']), ['bbb', 'bmb']), GLOW);
    const fidget = eyes(band(A, 20, 24, -1, 11), ['ew', 'ee'], ['ew', 'ee']);
    return { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget };
  };
  const formB = () => {
    const { put } = helpers(28);
    const Z = ['zzz', '..z', '.z.', 'zzz'];
    const eyes = (g, l, r) => put(put(g, 10, 9, l), 15, 9, r);
    const tablet = (g, rows) => put(g, 9, 17, rows);
    const GOLD = ['tggtggtgT', 'tttttttTT', 'tgtggtgTT', 'ttttttTTT'];
    const GLOW = ['uqquuqquu', 'uuuuuuuuu', 'uquqququu', 'uuuuuuuuu'];
    const happyFace = g => put(put(put(g, 9, 9, ['bbbb', 'beeb', 'ebbe']), 14, 9, ['bbbb', 'beeb', 'ebbe']), 11, 13, ['mbbbm', 'bmmmb']);
    const shut = g => eyes(g, ['bb', 'bb', 'ee'], ['bb', 'bb', 'ee']);
    const idle = B;
    const idle2 = B2;
    const blink = eyes(B, ['bb', 'ee', 'bb'], ['bb', 'ee', 'bb']);
    const talk = put(B, 12, 13, ['bmb', 'mnm']);
    const talk2 = put(B, 12, 13, ['bmb', 'bmb']);
    const happy = happyFace(B);
    const happy2 = put(tablet(happyFace(B), GOLD), 11, 0, ['.h.', 'hhh', '.h.']);
    const sleep = put(put(shut(B2), 12, 13, ['bbb', 'bmb']), 14, 0, Z);
    const sleep2 = put(put(shut(B2), 12, 13, ['bbb', 'bmb']), 10, 0, Z);
    const think = put(tablet(eyes(B, ['ee', 'ew', 'bb'], ['ee', 'ew', 'bb']), GLOW), 12, 13, ['bbb', 'bmb']);
    const fidget = put(eyes(B2.map((r, j) => B[j].slice(0, 14) + r.slice(14)), ['ee', 'ew', 'ee'], ['ee', 'ew', 'ee']), 7, 2, ['.o..', 'oloo', 'olpo']);
    return { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget };
  };
  PatchDex.evolve('riddle', {
    habit: 'planning',
    stages: [
      {
        name: 'Enigmew',
        species: 'winged sphinx youth',
        blurb: 'Riddle grew wings and took up a stone tablet. It carves the question before anyone gets to answer, and the glyph only lights up once something truly passes.',
        voice: 'carve the check first. the code only has to answer it.',
        evolve: 'Wings and a tablet came in: you started writing the failing test or acceptance check before asking the agent for code.',
        palette: { f: '#fff3dc', F: '#e3c49c', t: '#d9d3c7', T: '#a39a8c', u: '#6f6878', O: '#7a4a3c' },
        sprites: formA(),
        loop: [['idle', 16], ['idle2', 6], ['idle', 12], ['blink', 2], ['idle', 12], ['fidget', 3], ['idle', 2], ['fidget', 3], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle', 8], ['think', 12], ['idle', 8]],
      },
      {
        name: 'Quaestor',
        species: 'great sphinx guardian',
        blurb: 'A couchant guardian with wings spread over the gate. Its tablet is lined with glyphs that turn gold only when they pass, and no change gets by without its question.',
        voice: 'every gate has its riddle. show me the failing test, then pass.',
        evolve: 'The kitten became the gate itself: you now lead every change with a test or acceptance check and let nothing merge until it answers.',
        palette: { f: '#fff3dc', F: '#e3c49c', t: '#d9d3c7', T: '#a39a8c', u: '#6f6878', O: '#7a4a3c', l: '#f6dcaa', b: '#dcb27a', d: '#b4844f', D: '#7f5636' },
        sprites: formB(),
        loop: [['idle', 18], ['idle2', 8], ['idle', 12], ['blink', 2], ['idle', 14], ['fidget', 3], ['idle', 2], ['fidget', 3], ['idle2', 8], ['idle', 12], ['blink', 2], ['idle', 8], ['think', 14], ['idle', 8]],
      },
    ],
  });
})();
