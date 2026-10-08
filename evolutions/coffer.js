// Coffer's later forms. II Cashew: a bigger iron-banded mimic on stubby legs that bite-tests a coin.
// III Ledgermain: a gold-trimmed vault mimic with topaz eyes, a jeweller's loupe, strap tentacles, on its hoard.
(function () {
  const put = (base, x, y, art) => base.map((r, j) => {
    const p = art[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });

  // ---------------- II · Cashew (24×21; chest is 21 wide at x1) ----------------
  const II = (() => {
    const W = 24, H = 21;
    const LID = [
      '.....ooooooooooo.....',
      '...ooIlllllllllioo...',
      '..oliIlllllllbbiIbo..',
      '.olbiIlbbdbbbbbiIbdo.',
      '.obdiIbbbbdbbdbiIdDo.',
      '.oddjIdbddddbddjIDDo.',
      'oiiijiiiiiiiiiiijiIIo',
    ];
    // the bitten coin sits in the lower jaw and sticks out over the rim, so the lock plate moves down
    const BASE = [
      '.oiiijiiiiiiiiijiIIo.',
      '.olbiIlbbbbbbbbiIbdo.',
      '.obdiIbbdbbdbbbiIddo.',
      '.obbiIdbdgkgGbdiIdDo.',
      '.oddjIddDGGGGddjIDDo.',
      '..ooooooooooooooooo..',
      '...odDo.......odDo...',
      '..oTDDTo.....oTDDTo..',
    ];
    const EYE = {
      open: ['.eE.', 'ewpE', 'EEph', '.hh.'],
      up: ['.ep.', 'ewpE', 'EEEh', '.hh.'],
      side: ['.eE.', 'pwEE', 'pEEh', '.hh.'],
      shut: ['....', '....', 'eEEh', '....'],
      squint: ['....', 'eEph', '.hh.', '....'],
      happy: ['....', '.eE.', 'e..h', '....'],
      sleep: ['....', '....', 'hhhh', '....'],
    };
    // middle 5 columns: two incisors coming down onto the coin's top edge
    const MID = { bite: ['tTktT', 'kTkTk', 'kkkkk', 'kyygk', 'ywygG'], edge: ['tTktT', 'kTkTk', 'kkkkk', 'kkygk', 'kkygk'] };
    const FL = ['tT', 'tT', 'tk', 'kk', 'kk'], FR = ['tT', 'tT', 'kT', 'kk', 'kk'];
    const row = s => '.o' + s + 'o.';
    const gap = (L, R = L, mid = 'bite', n = 5) => [0, 1, 2, 3, 4].slice(0, n).map(j => {
      const eL = j < 4 ? EYE[L][j] : '....', eR = j < 4 ? EYE[R][j] : '....';
      return row((FL[j] + eL + MID[mid][j] + eR + FR[j]).replace(/\./g, 'k'));
    });
    const dark = row('k'.repeat(17));
    const pad = r => '.' + r + '..';
    // coin stamps over the rim: lower half of the coin, outlined so it reads against the iron
    const COIN_LOW = { bite: ['oygggGo', '.ogGGo.'], edge: ['.oygo..', '.ogGo..'] };
    const chest = (g, { lid = LID, base = BASE, dy = 0, coin = 'bite' } = {}) => {
      let b = base;
      if (coin) b = put(base, 7, 0, COIN_LOW[coin]);
      const rows = [...[...lid, ...g, ...b].map(pad), ...Array(dy).fill('.'.repeat(W))];
      while (rows.length < H) rows.unshift('.'.repeat(W));
      return rows.slice(rows.length - H);
    };
    // the long tongue lolls out of the right corner of the mouth and hangs down the side
    const TONGUE = ['n...', 'nnn.', '.nNn', '..nN', '..nN', '..nN', '.nN.'];
    const TONGUE2 = ['n...', 'nnn.', '.nNn', '..nN', '..Nn', '..nN', '...n'];
    const tongue = (rows, t = TONGUE, lifted = 0) => put(rows, 19, H - 10 - lifted, t);
    const S = {};
    // breathing: lid and eyes lift a pixel; the coin stays clamped in the lower jaw
    const lifted = (L, R, mid) => { const g = gap(L, R, mid); return [...g.slice(0, 3), dark, ...g.slice(3)]; };
    S.idle = tongue(chest(gap('open')));
    S.idle2 = tongue(chest(lifted('open')), TONGUE, 1);
    S.blink = tongue(chest(gap('shut')));
    S.talk = tongue(chest(lifted('open')), TONGUE2, 1);
    S.talk2 = tongue(chest(gap('open')), TONGUE2);
    S.happy = put(tongue(chest(lifted('happy')), TONGUE, 1), 11, 15, ['w']);
    S.happy2 = put(tongue(chest(lifted('happy')), TONGUE2, 1), 10, 14, ['.w.', 'w.w', '.w.']);
    // sleep: lid down on the coin, just a chest with a coin sticking out of it
    const shutGap = [row('tTkkkkTkTkkkkkktT'), row('kkhhhhkyygkhhhhkk')];
    const Z = ['zzz', '..z', '.z.', 'zzz'];
    S.sleep = put(put(chest(shutGap), 0, 4, Z), 3, 3, ['Z']);
    S.sleep2 = put(put(chest(shutGap), 1, 3, Z), 0, 7, ['Z']);
    // think: turns the coin edge-on and eyes it
    S.think = put(tongue(chest(gap('up', 'up', 'edge'), { coin: 'edge' })), 0, 0, ['yy.', '..y', '.y.', '...', '.y.']);
    // fidget: the bite test. Lid clamps down a pixel onto the coin and the eyes narrow.
    S.fidget = tongue(chest([...gap('squint', 'squint').slice(0, 2), ...gap('squint').slice(3)]), TONGUE2, -1);
    return { W, H, S, row, gap, chest, dark };
  })();

  // ---------------- III · Ledgermain (28×22; chest is 22 wide at x3, sitting in its hoard) ----------------
  const III = (() => {
    const W = 28, H = 22, CX = 3;
    // gold trim is mostly mid/dark gold so the bright coins and eyes still pop
    const LID = [
      '......oooooooooo......',
      '....ooOlllllllbboo....',
      '..ooyglllllllllbgGoo..',
      '.olbgGlbbdbbbbdbgGbdo.',
      '.obdgGbbbbdbbdbbgGdDo.',
      '.oddGGdbddddbdddGGDDo.',
      'oyggggggggggggggggggGo',
    ];
    const BASE = [
      '.oygggggggggggggggGGo.',
      '.olbgGlbbyyygbbbgGbdo.',
      '.obdgGbdbgkkGdbbgGdDo.',
      '.oddGGddbGkGGddDGGDDo.',
      '.oDDGGDDDDDDDDDDGGDDo.',
    ];
    const MEDAL = ['.yg.', 'yrRG', 'gRRG', '.GG.'];
    const EYE = {
      open: ['.eE.', 'ewpE', 'EEph', '.hh.'],
      side: ['.eE.', 'eEwp', 'EEhp', '.hh.'],
      shut: ['....', '....', 'eEEh', '....'],
      happy: ['....', '.eE.', 'e..h', '....'],
      sleep: ['....', '....', 'hhhh', '....'],
    };
    // under the loupe the right eye is magnified to fill the lens
    const BIG = {
      open: ['ceEc', 'ewpE', 'EEph', 'chhc'], side: ['ceEc', 'eEwp', 'EEhp', 'chhc'],
      shut: ['cccc', 'cccc', 'eEEh', 'cccc'], happy: ['cccc', 'ceEc', 'ecch', 'cccc'], sleep: ['cccc', 'cccc', 'hhhh', 'cccc'],
    };
    const TOP = 'tTktTktTkktTktTktT', LOW = 'kTtkTtkkkkkkTtkTtk';
    const row = s => '.o' + s + 'o.';
    const FL = ['tk', 'tk', 'kk', 'kk'], FR = ['kT', 'kT', 'kk', 'kk'];
    const gap = (L, R = L, low = LOW) => [
      row(TOP),
      ...[0, 1, 2, 3].map(j => row((FL[j] + 'k' + EYE[L][j] + 'kkkk' + EYE[R][j] + 'k' + FR[j]).replace(/\./g, 'k'))),
      row(low),
    ];
    const shutGap = [row('tTkkkkkkkkkkkkkktT'), row('kkkhhhhkkkkhhhhkkk')];
    const dark = row('k'.repeat(18));
    const HOARD = [
      '.oyo...................oyo..',
      'oygGo.................oyggo.',
      'yGgGgoyygoygGoyygoyGgoygGgGo',
      'gGygGgGgyGgGrRgyGgGgcCgGygGg',
      'GGgGGGgGGGgGGGGGgGGGgGGGGgGG',
    ];
    // leather strap tentacles with gold buckles. Left waves, right holds a coin up to the loupe.
    const STRAPS = {
      rest: {
        L: [, , 'ygg.', 'gkG.', '.aA.', '.aA.', 'aA..', 'aA..', 'aA..', '.aA.', '..aA', '...a'],
        R: [, , , , , 'oyyo', 'ywgG', 'ogGo', '.aA.', '..aA', '.aA.', 'aA..'],
      },
      sway: {
        L: [, , , 'ygg.', 'gkG.', '.aA.', 'aA..', 'aA..', 'aA..', '.aA.', '..aA', '...a'],
        R: [, , , , , 'oyyo', 'ywgG', 'ogGo', '.aA.', '..aA', '.aA.', 'aA..'],
      },
      up: {
        L: ['ygg.', 'gkG.', '.aA.', 'aA..', 'aA..', '.aA.', '.aA.', '..aA', '..aA', '..aA', '..aA', '...a'],
        R: [, , , 'oyyo', 'ywgG', 'ogGo', '.aA.', '..aA', '..aA', '.aA.', '.aA.', 'aA..'],
      },
      peer: {
        L: [, , 'ygg.', 'gkG.', '.aA.', '.aA.', 'aA..', 'aA..', 'aA..', '.aA.', '..aA', '...a'],
        R: [, , , , , , 'oyyo', 'ywgG', 'ogGo', 'aAA.', 'aA..', 'a...'],
      },
      droop: {
        L: [, , , , , , , , , , '...a', '..aA', '.aA.', '.aA.', 'aA..', 'ygg.', 'gkG.'],
        R: [, , , , , , , , , , 'a...', 'Aa..', '.Aa.', '.Aa.', '..Aa', 'oyyo', 'ywgG'],
      },
    };
    const pad = r => '.'.repeat(CX) + r + '.'.repeat(W - CX - r.length);
    // build: lid, gap and base stacked on the hoard (chest floor 3 rows up), then medallion, loupe, straps
    function build(g, { eye = 'open', straps = 'rest', dy = 0 } = {}) {
      const body = [...LID, ...g, ...BASE].map(pad), top = H - 3 - body.length - dy;
      let rows = Array.from({ length: H }, (_, y) => body[y - top] || '.'.repeat(W));
      rows = put(rows, CX + 9, top + 2, MEDAL);
      rows = put(rows, 0, H - HOARD.length, HOARD);
      // loupe: steel ring with a glass glint around the magnified right eye, gold chain down into the hoard
      const ey = top + LID.length + 1, ex = CX + 2 + 11 - 1;
      if (g.length > 2) {
        rows = put(rows, ex, ey - 1, ['.iiii.', 'i....I', 'i....I', 'i....I', 'I....j', '.IIjj.']);
        rows = put(rows, ex + 1, ey, BIG[eye]);
        rows = put(rows, ex + 1, ey, ['w']);
      } else {
        rows = put(rows, ex, ey - 1, ['iiiiI.', 'IcccjI'.slice(0, 6)]);
      }
      rows = put(rows, ex + 5, ey + 4, ['.', 'y', '.', 'g', '.']);
      rows = put(rows, 0, 0, STRAPS[straps].L.map(r => r || '....'));
      rows = put(rows, W - 4, 0, STRAPS[straps].R.map(r => r || '....'));
      return rows;
    }
    const sparkles = (rows, n) => put(put(rows, n ? 6 : 21, n ? 0 : 1, ['.w.', 'wyw', '.w.']), n ? 22 : 5, n ? 2 : 3, ['y']);
    const S = {};
    S.idle = build(gap('open'));
    S.idle2 = build(gap('open'), { straps: 'sway' });
    S.blink = build(gap('shut'), { eye: 'shut' });
    S.talk = build([...gap('open').slice(0, 5), dark, row('kTtkTtknnnnkTtkTtk')].slice(1).concat([]), { dy: 0 });
    S.talk2 = build(gap('open', 'open', 'kTtkTtkknnkkTtkTtk'), { straps: 'sway' });
    S.happy = sparkles(build(gap('happy'), { eye: 'happy', straps: 'up' }), 0);
    S.happy2 = sparkles(build(gap('happy'), { eye: 'happy', straps: 'up', dy: 0 }), 1);
    const Z = ['zzz', '..z', '.z.', 'zzz'];
    S.sleep = put(put(build(shutGap, { eye: 'sleep', straps: 'droop' }), 1, 2, Z), 0, 0, ['Z']);
    S.sleep2 = put(put(build(shutGap, { eye: 'sleep', straps: 'droop' }), 0, 1, Z), 4, 4, ['Z']);
    S.think = put(build(gap('side'), { eye: 'side', straps: 'peer' }), 20, 0, ['y.y.y']);
    S.fidget = build(gap('side', 'open'), { straps: 'up' });
    return { S };
  })();

  PatchDex.evolve('coffer', {
    habit: 'research',
    stages: [
      {
        name: 'Cashew',
        species: 'coin-biting chest mimic',
        blurb: 'Grew legs, iron bands and a very long tongue. Still bites every coin it is handed, because the shiny ones are the ones that lie.',
        voice: 'bite the coin first. does that flag exist, or does it just shine?',
        evolve: 'It walks now and bite-tests every coin before it hoards it: you have started checking APIs and flags before you build on them.',
        palette: {},
        sprites: II.S,
      },
      {
        name: 'Ledgermain',
        species: 'grand vault mimic',
        blurb: 'A vault-sized mimic on a hoard where every coin has been bite-tested and logged. Wears a loupe, and lifts any suspicious coin up to it with a leather strap.',
        voice: 'every coin in this hoard is real. i checked. now check yours.',
        evolve: 'It wears a loupe and keeps a ledger of every coin: checking that a function, flag or package exists is now just how you work.',
        palette: { r: '#ff5a6e', R: '#a3203f', c: '#8fe3ff', C: '#2f86c4', a: '#b65a3c', A: '#6e2a26' },
        sprites: III.S,
      },
    ],
  });
})();
