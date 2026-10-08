// Wick II–III. Tallow carries a candle-lamp held up on one foreleg, wings broader; Atlume is an atlas moth whose
// eyespots have all become little lamps, two on each pair of wings.
(function () {
  // Row-patch helpers. `put` stamps rows at x,y ('.' is see-through); `tint` recolors chars inside boxes.
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const tint = (base, boxes, map) => base.map((r, y) => [...r].map((c, x) => (map[c] && boxes.some(([x0, y0, x1, y1]) => x >= x0 && x <= x1 && y >= y0 && y <= y1) ? map[c] : c)).join(''));
  // Shift a rectangle of rows y0..y1, columns x0..x1 right by one pixel.
  const nudge = (base, y0, y1, x0, x1) => base.map((r, y) => (y < y0 || y > y1 ? r : r.slice(0, x0) + '.' + r.slice(x0, x1) + r.slice(x1 + 1)));
  // Paint only on empty pixels.
  const glint = (base, pts, ch) => base.map((r, y) => [...r].map((c, x) => (c === '.' && pts.some(p => p[0] === x && p[1] === y) ? ch : c)).join(''));
  // The face from the hatchling, shared by both forms: two eye rows, then two mouth rows (the last starts 1px left).
  const face = (base, x, y, eyes, mouth) => {
    const E = {
      open: ['owehhweo', 'oeehheeo'],
      shut: ['ohhhhhho', 'oeehheeo'],
      joy: ['oeehheeo', 'ophhhhpo'],
      up: ['oewhhewo', 'oeehheeo'],
    }[eyes];
    const M = {
      smile: ['ophmmhpo', 'ochhhhhhC'],
      open: ['opheehpo', 'ochhmmhhC'],
      half: ['ophmmhpo', 'ochhmmhhC'],
      grin: ['ohmhhmho', 'ochhmmhhC'],
      hmm: ['ophmhhpo', 'ochhhhhhC'],
    }[mouth];
    return put(base, x - 1, y, ['.' + E[0], '.' + E[1], '.' + M[0], M[1]]);
  };
  const Q = ['zz.', '..z', '.z.', '...', '.z.'], z = ['zzz', '..z', '.z.', 'zzz'], Z = ['zzzz', '...z', '..z.', '.z..', 'zzzz'];
  const FLICK = { w: 'a', a: 'w' }, FLARE = { a: 'A', A: 'w' }, DIM = { A: 'C', w: 'C', a: 'F' };

  // ── II · Tallow ───────────────────────────────────────────────
  const idle2a = [
    '.....a............oo....',
    'oo..aAa........a.oFFo.oo',
    'oLo..a.F.......AoAwaAoLo',
    'ovLo....F......FoAccAoLo',
    'ovvLo....F....F.oFFFFovo',
    'ovvvLo....oooo...oooovvo',
    'ovvaavo..ohhhho.ocovaavo',
    'ovaxxavoowehhweooCoaxxao',
    'ovaxAavLoeehheeooCoaAxao',
    'ovvaavvvophmmhpooCovaavo',
    'oqvvvvvochhhhhhCCovvvvqo',
    '.oqVVVvoccccCCCCovVVVqo.',
    '..oVVVVoocccCCCooVVVVo..',
    '...ooooooocCCCooooooo...',
    '..ovvvvvvvoCCovvvvvvvo..',
    '.oVVVVVVVVooooVVVVVVVVo.',
    '.onVVVVVVVoVVoVVVVVVVno.',
    '..onnVVVVVovvoVVVVVnno..',
    '...oonnnnnoVVonnnnnoo...',
    '.....ooooo.oo.ooooo.....',
    '...........oo...........',
  ];
  const LAMP = [[16, 2, 21, 3]];
  const tipL = (b, t) => put(b, 4, 0, t), tipR = (b, t) => put(b, 15, 1, t);
  const bright2 = b => tipR(tipL(tint(b, LAMP, { a: 'w' }), ['.A.', 'AwA', '.A.']), ['A', 'w']);
  const dim2 = b => tipR(tipL(tint(b, LAMP, { A: 'C', w: 'C' }), ['.F.', 'FaF', '.F.']), ['F', 'a']);
  const f2 = (b, eyes, mouth) => face(b, 8, 7, eyes, mouth);
  const happy2a = glint(f2(bright2(idle2a), 'joy', 'grin'), [[16, 0], [22, 0], [14, 1]], 'A');
  const two = {
    idle: idle2a,
    idle2: tint(idle2a, LAMP, FLICK),
    blink: f2(idle2a, 'shut', 'smile'),
    talk: f2(idle2a, 'open', 'open'),
    talk2: f2(tint(idle2a, LAMP, FLICK), 'open', 'half'),
    happy: happy2a,
    // A hop: everything drops a pixel, the lamp flares.
    happy2: ['.'.repeat(24), ...glint(f2(bright2(idle2a), 'joy', 'grin'), [[15, 0], [21, 0], [23, 2]], 'A').slice(0, -1)],
    think: put(f2(idle2a, 'up', 'hmm'), 10, 0, Q),
    // The lamp swings out on the raised foreleg; the flame leans.
    fidget: nudge(tint(idle2a, LAMP, FLICK), 0, 5, 16, 22),
    sleep: put(f2(dim2(idle2a), 'shut', 'hmm'), 10, 1, z),
    sleep2: put(f2(tint(dim2(idle2a), LAMP, { a: 'm' }), 'shut', 'hmm'), 11, 0, z),
  };

  // ── III · Atlume ──────────────────────────────────────────────
  const base3 = [
    '.oo...a..............a...oo.',
    'oppooaAa............aAaooppo',
    'opmLLoa.F..........F.aoLLmpo',
    'oLvvvLo.CF........FC.oLvvvLo',
    'onvvvvLo.CF......FC.oLvvvvno',
    'onvvvvvLo.CF....FC.oLvvvvvno',
    'onvaaaavLo..oooo..oLvaaaavno',
    'onaxFFxavLoohhhhooLvaxFFxano',
    'oqaxAwxavvowehhweovvaxwAxaqo',
    'onaxaAxavvoeehheeovvaxAaxano',
    'onvaaaavqqophmmhpoqqvaaaavno',
    '.onqqqqVVochhhhhhCoVVqqqqno.',
    '..ooooooooccccCCCCoooooooo..',
    '.ovvLLvvvvocccCCCovvvvLLvvo.',
    'onVLVVVVVVVocCCCoVVVVVVVLVno',
    'onqVVaaVVVVVoCCoVVVVVaaVVqno',
    'onVVaAwaVVVVooooVVVVawAaVVno',
    'onVVawAaVVVVoVVoVVVVaAwaVVno',
    '.onVVaaVVVVVovvoVVVVVaaVVno.',
    '...onqqqVVVVoVVoVVVVqqqno...',
    '....ooonnnno.oo.onnnnooo....',
    '.......oooo..oo..oooo.......',
  ];
  const FORE = [[2, 6, 7, 10], [20, 6, 25, 10]], HIND = [[4, 15, 7, 18], [20, 15, 23, 18]], ALL = [...FORE, ...HIND];
  const tips3 = (b, t) => put(put(b, 5, 0, t), 20, 0, t);
  const f3 = (b, eyes, mouth) => face(b, 10, 8, eyes, mouth);
  // The lamps breathe in two phases: fore and hind wings trade the bright core.
  const idle3 = base3, idle3b = tint(base3, ALL, { A: 'w', w: 'A' });
  const flare3 = b => tips3(tint(b, ALL, FLARE), ['.A.', 'AwA', '.A.']);
  const star = (b, x, y) => glint(glint(b, [[x, y]], 'w'), [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]], 'A');
  const dim3 = b => tips3(tint(b, ALL, DIM), ['.F.', 'FaF', '.F.']);
  const three = {
    idle: idle3,
    idle2: idle3b,
    blink: f3(idle3, 'shut', 'smile'),
    talk: f3(idle3, 'open', 'open'),
    talk2: f3(idle3b, 'open', 'half'),
    happy: f3(flare3(idle3), 'joy', 'grin'),
    happy2: star(f3(flare3(idle3b), 'joy', 'grin'), 13, 2),
    think: put(f3(idle3, 'up', 'hmm'), 12, 0, Q),
    // Checking the plan: the left lamps flare, the right ones wait their turn.
    fidget: f3(tint(tint(idle3, [FORE[0], HIND[0]], FLARE), [FORE[1], HIND[1]], { A: 'a', w: 'A' }), 'up', 'smile'),
    sleep: put(f3(dim3(idle3), 'shut', 'hmm'), 12, 1, z),
    sleep2: put(f3(tint(dim3(idle3), ALL, { C: 'F' }), 'shut', 'hmm'), 12, 0, Z),
  };

  PatchDex.evolve('wick', {
    habit: 'planning',
    stages: [
      {
        name: 'Tallow',
        species: 'lamp-bearer moth',
        blurb: 'Wick found a candle-lamp and now carries it ahead of the work, so the unlit corners of a task show up before anyone walks into them.',
        voice: "light the steps first: what, in what order, and how we'll know.",
        evolve: 'The glow left its antennae for a lamp held overhead: you started planning before you prompted.',
        palette: {},
        sprites: two,
        loop: [['idle', 18], ['idle2', 3], ['idle', 10], ['blink', 2], ['idle', 14], ['fidget', 5], ['idle', 4], ['idle2', 3], ['idle', 10], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 8]],
      },
      {
        name: 'Atlume',
        species: 'atlas lamp moth',
        blurb: 'Every eyespot on Atlume\'s wings is a little lamp, one per step of the plan, and it will not take off until each one is lit.',
        voice: 'every step gets a lamp. the dark ones are where it breaks.',
        evolve: 'One lamp became four, set into wings as wide as a map: your plans now light the whole route before the first edit.',
        palette: {},
        sprites: three,
        loop: [['idle', 6], ['idle2', 6], ['idle', 6], ['blink', 2], ['idle2', 6], ['idle', 6], ['idle2', 6], ['fidget', 6], ['idle', 6], ['idle2', 6], ['blink', 2], ['idle', 6], ['think', 10], ['idle2', 6]],
      },
    ],
  });
})();
