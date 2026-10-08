// Jinn evolutions. II Proviso: bracelets, a teal vest, and a long scroll of past wishes in fine print.
// III Caveat: a crown of flame, three brass rings for three wishes, and the lamp hovering at its side.
(function () {
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  // Like put, but '.' also clears (for swapping out flames).
  const set = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; return p === undefined ? r : r.slice(0, x) + p + r.slice(x + p.length);
  });
  const dots = (b, pts, ch) => b.map((r, y) => [...r].map((c, x) => (pts.some(([px, py]) => px === x && py === y) ? ch : c)).join(''));
  const Z1 = ['zzz', '..z', '.z.', 'zzz'], Z2 = ['ZZZ', '..Z', '.Z.', 'ZZZ'];
  const Q = ['yy.', '..y', '.y.', '...', '.y.'];

  // ── II Proviso (25×21). Same face as the hatchling, two pixels right. ──
  const II = (() => {
    const W = 25;
    const blank = '.'.repeat(W);
    const idle = [
      '...........F..F..........',
      '..........fF.fF..........',
      '........oorfFfro.........',
      '.......oLLLLbbbbo........',
      '......oLLLbbbbbbbo.......',
      '.oooooLLDDbbbbDDbdooooo..',
      '.oLbbbLbwebbbbwebddddDo..',
      '..odddbbeebbbbeebdDDDo...',
      '..gooobpbbmbbmbbpdooog...',
      '.G.g..obbbbmmbbddo..g.G..',
      '..g....oddddddDDo....G...',
      '..t.ooo.oDddddDo.ooo.t...',
      '...oLbtTgLbbbbdgTqdDo....',
      '..Lgyo.TgLbbbddgTqobdo...',
      'nLbgGn.qgTTTTTqgqLbgyo...',
      '.ckcC..oLbbbbdDo.........',
      '.cccC.oLLbbbddo..yg......',
      '.ckkC.oLbdo....ogyggGo.GG',
      '.cccC.oyygGo.oyyygggGGn.G',
      '.ckcC..GgggyyyggggTgGGnG.',
      '.CccG....nnGGGGGGGGGnnn..',
    ];
    const FL = {
      idle: ['...........F..F..', '..........fF.fF..', '........oorfFfro.'],
      flick: ['..........F....F.', '..........fF.Ff..', '........oorfFfro.'],
      lean: ['.........F..F....', '.........Ff.fF...', '........oorfFfro.'],
      big: ['..........F.FF...', '.........fFFfFf..', '........orFFFFro.'],
      ember: ['.................', '.................', '........oorrrroo.'],
    };
    const flame = (b, k) => set(b, 0, 0, FL[k]);
    const eyes = (b, r6, r7) => put(b, 8, 6, [r6, r7]);
    const mouth = (b, r8, r9) => put(b, 10, 8, [r8, r9]);
    const calm = b => put(b, 8, 5, ['bb....bb']);
    const sink = b => [blank, ...b.slice(0, 4), ...b.slice(5)];
    // Head floats up a pixel; a bare neck row fills the gap.
    const rise = b => [...b.slice(1, 11), '........oDddddDo.........', ...b.slice(11)];
    // The scroll swings: its bottom curl flips side.
    const sway = b => set(b, 0, 19, ['..kcC', '.cCCG']);
    const S = {};
    S.idle = idle;
    S.idle2 = flame(idle, 'flick');
    S.blink = eyes(idle, 'bbbbbbbb', 'eebbbbee');
    S.talk = mouth(idle, 'bmmb', 'bmmb');
    S.talk2 = mouth(flame(idle, 'flick'), 'bbbb', 'bmmb');
    const glee = put(mouth(eyes(calm(flame(idle, 'big')), 'eebbbbee', 'bbbbbbbb'), 'mmmm', 'bmmb'), 7, 7, ['e..e..e..e']);
    S.happy = dots(glee, [[3, 1], [20, 1], [23, 4], [5, 3]], 'y');
    S.happy2 = dots(rise(sway(flame(glee, 'flick'))), [[4, 0], [21, 2], [1, 4], [23, 0]], 'y');
    const nap = sink(mouth(eyes(calm(flame(idle, 'ember')), 'bbbbbbbb', 'eebbbbee'), 'bbbb', 'bmbb'));
    S.sleep = put(nap, 20, 0, Z1);
    S.sleep2 = put(nap, 19, 0, Z2);
    S.think = put(mouth(eyes(put(idle, 14, 5, ['bb']), 'ewbbbbew', 'eebbbbee'), 'bbbb', 'bbmm'), 21, 0, Q);
    S.fidget = sway(eyes(flame(idle, 'lean'), 'ewbbbbew', 'eebbbbee'));
    return S;
  })();

  // ── III Caveat (28×22). Face one pixel left of II and a row lower, under a crown of flame. ──
  const III = (() => {
    const W = 28;
    const blank = '.'.repeat(W);
    const body = [
      '..........FF................',
      '.......F..fF..F.............',
      '.....F.fF.ffF.Ff.F..........',
      '....rfrffFffFffrfr..........',
      '......oLLLLbbbbo............',
      '.....oLLLbbbbbbbo...........',
      'oooooLLDDbbbbDDbdooooo......',
      'oLbbbLbwebbbbwebddddDo......',
      '.odddbbeebbbbeebdDDDo.......',
      '.gooobpbbmbbmbbpdooog.......',
      'G.g..obbbbmmbbddo..g.G......',
      '.g....oddddddDDo....G.......',
      '.t.Ggy.oDddddDo.ygG.t..L..b.',
      '..oLbtTgLbbbbdgTqdDbgygbLLbo',
      'oLbo.tTgLbbbddgTqoDoooooodo.',
      'oygbLoqgTTTTTqgqo....yg.....',
      '.ooo..oLbbbbbdDo...ogyggGo.G',
      '....oLbbbddo.oyygGoyyyggGGnG',
      '...oLro....do.GggyygggTgGnG.',
      '...orf..obdoo...nnGGGGGGnn..',
      '....offrfdo.................',
      '.....oooo...........nnnn....',
    ];
    const RING = ['.yg.', 'y..G', 'g..G', '.GG.'];
    const RINGS = {
      idle: [[19, 0], [24, 2], [23, 7]],
      bob: [[19, 1], [24, 1], [23, 8]],
      toss: [[19, 0], [24, 0], [23, 5]],
      drift: [[20, 0], [24, 3], [23, 7]],
      rest: [[19, 1], [24, 3], [23, 8]],
    };
    const rings = (b, k) => RINGS[k].reduce((acc, [x, y]) => put(acc, x, y, RING), b);
    const CR = {
      idle: ['..........FF.......', '.......F..fF..F....', '.....F.fF.ffF.Ff.F.', '....rfrffFffFffrfr.'],
      flick: ['...........F.......', '......F...fF...F...', '.....FfF..fFF.fF.F.', '....rfrffFffFffrfr.'],
      lean: ['.........F.........', '......F..Ff..F.....', '....F.fF.ffF.Ff.F..', '....rfrffFffFffrfr.'],
      big: ['.......F..FF..F....', '.....F.fF.fF.Ff.F..', '....fF.fF.ffF.Ff.F.', '....rfrffFFFFffrfr.'],
      ember: ['...................', '...................', '.........r..r......', '......nrfrrrrfrn...'],
    };
    const crown = (b, k) => set(b, 0, 0, CR[k]);
    const eyes = (b, r7, r8) => put(b, 7, 7, [r7, r8]);
    const mouth = (b, r9, r10) => put(b, 9, 9, [r9, r10]);
    const calm = b => put(b, 7, 6, ['bb....bb']);
    const sink = b => [blank, ...b.slice(0, 5), ...b.slice(6)];
    const rise = b => [...b.slice(1, 12), '.......oDddddDo.............', ...b.slice(12)];
    const idle = rings(body, 'idle');
    const S = {};
    S.idle = idle;
    S.idle2 = rings(crown(body, 'flick'), 'bob');
    S.blink = eyes(idle, 'bbbbbbbb', 'eebbbbee');
    S.talk = mouth(idle, 'bmmb', 'bmmb');
    S.talk2 = mouth(rings(crown(body, 'flick'), 'bob'), 'bbbb', 'bmmb');
    const glee = b => put(mouth(eyes(calm(b), 'eebbbbee', 'bbbbbbbb'), 'mmmm', 'bmmb'), 6, 8, ['e..e..e..e']);
    S.happy = dots(glee(rings(crown(body, 'big'), 'toss')), [[1, 2], [2, 0], [21, 5], [27, 0]], 'y');
    S.happy2 = dots(rise(glee(rings(crown(body, 'flick'), 'idle'))), [[0, 1], [3, 3], [22, 6], [18, 0]], 'y');
    const nap = sink(rings(mouth(eyes(calm(crown(body, 'ember')), 'bbbbbbbb', 'eebbbbee'), 'bbbb', 'bmbb'), 'rest'));
    S.sleep = put(nap, 0, 0, Z1);
    S.sleep2 = put(nap, 1, 0, Z2);
    S.think = put(mouth(eyes(put(idle, 13, 6, ['bb']), 'ewbbbbew', 'eebbbbee'), 'bbbb', 'bbmm'), 0, 0, Q);
    S.fidget = eyes(rings(crown(body, 'lean'), 'drift'), 'ewbbbbew', 'eebbbbee');
    return S;
  })();

  PatchDex.evolve('jinn', {
    habit: 'prompting',
    stages: [
      {
        name: 'Proviso',
        species: 'adept lamp djinn',
        blurb: 'Carries a long scroll of past wishes, every one with fine print. It reads each request twice before granting it.',
        voice: 'say what is out of scope, or i will assume nothing is.',
        evolve: 'It started keeping fine print once your requests spelled out their limits: what to leave alone and what must stay the same.',
        palette: { c: '#fff4dc', C: '#e8cfa0', k: '#9a6b55' },
        sprites: II,
      },
      {
        name: 'Caveat',
        species: 'ascended flame djinn',
        blurb: 'A smoke-and-flame spirit crowned in fire, with three brass rings for three wishes. The lamp follows it now.',
        voice: 'three wishes. name the non-goals first.',
        evolve: 'Its crown caught fire when your prompts began carrying their own guardrails: scope, non-goals, and what must not change.',
        palette: {},
        sprites: III,
      },
    ],
  });
})();
