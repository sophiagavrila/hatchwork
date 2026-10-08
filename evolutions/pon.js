// Pon II–III. Kasapon grows into a straw hat with two leaves in the band; Senpon's leaves multiply into
// an orbiting ring, a sake gourd at the hip, mid-shapeshift shimmer in the air around it.
(function () {
  // Row-patch helpers (same idea as creatures/pon.js). Short rows patch the left part only.
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
  // Stamp rows at x,y; '.' is see-through.
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  // Drop everything above `row` by 1px (removes that row): a squash, or the hat sliding over the eyes.
  const sink = (base, row) => ['.'.repeat(base[0].length), ...base.slice(0, row), ...base.slice(row + 1)];
  // Shift a rectangle of rows y0..y1, columns x0..x1 right by one pixel.
  const nudge = (base, y0, y1, x0, x1) => base.map((r, y) => (y < y0 || y > y1 ? r : r.slice(0, x0) + '.' + r.slice(x0, x1) + r.slice(x1 + 1)));
  // Paint only on empty pixels (the shimmer never draws over the body).
  const glint = (base, pts, ch) => base.map((r, y) => [...r].map((c, x) => (c === '.' && pts.some(p => p[0] === x && p[1] === y) ? ch : c)).join(''));
  const spark = (base, pts) => glint(glint(base, pts, 'w'), pts.flatMap(([x, y]) => [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]), 'A');
  // The face, shared by both forms. Rows 7–12; each form passes its head's left column.
  const face = (hx, eyes, mouth) => {
    const E = {
      open: ['olkwekbbbbkwekdo', 'olkeekbbbbkeekdo', 'okkeekcccckeekko'],
      shut: ['olkkkkbbbbkkkkdo', 'olkeekbbbbkeekdo', 'okkkkkcccckkkkko'],
      joy: ['olkeekbbbbkeekdo', 'olekkebbbbekkedo', 'okkkkkcccckkkkko'],
      nap: ['olkkkkbbbbkkkkdo', 'olekkebbbbekkedo', 'okkeekcccckeekko'],
      up: ['olkkwebbbbkkwedo', 'olkkeebbbbkkeedo', 'okkkkkcccckkkkko'],
      side: ['olwekkbbbbwekkdo', 'oleekkbbbbeekkdo', 'okeekkcccceekkko'],
    }[eyes];
    const M = {
      smile: ['.obpccDccDccpdo.', '..odbscDDcsbdo..'],
      open: ['.obpccDDDDccpdo.', '..odbsDppDsbdo..'],
      half: ['.obpcccDDcccpdo.', '..odbscppcsbdo..'],
      grin: ['.obpccDppDccpdo.', '..odbscDDcsbdo..'],
      hush: ['.obpccccccccpdo.', '..odbscDDcsbdo..'],
      hmm: ['.obpccccDDccpdo.', '..odbsccccsbdo..'],
    }[mouth];
    return [...E, 'okkkkcceecckkkko', ...M].map(r => '.'.repeat(hx) + r);
  };
  const Z = ['zzzz', '...z', '..z.', '.z..', 'zzzz'], z = ['zzz', '..z', '.z.', 'zzz'], Q = ['zz.', '..z', '.z.', '...', '.z.'];

  // ── II · Kasapon ──────────────────────────────────────────────
  const idle2a = [
    '..oo..........oo.......',
    '.ohgo.oooooo.ohho......',
    '.ohggoyyyyyYohggo......',
    '..oGgGoyyyYoGgGo.......',
    '.ooooGoRRRRoGoooo......',
    'oyyyyyyyyyyyyYYYYoo.oo.',
    'oorrrrrrrrrrrrrroo.okko',
    '.olkwekbbbbkwekdo.okkko',
    '.olkeekbbbbkeekdookkkko',
    '.okkeekcccckeekkoollbdo',
    '.okkkkcceecckkkkolbbbdo',
    '..obpccDccDccpdookkkkko',
    '...odbscDDcsbdo.okkkkko',
    '...okkddddddkkoolbbbbdo',
    '..odkbccccccbkdobbbbbdo',
    '.odkkbccccccbkkdokkkkdo',
    '.okkobccccccsokkokkkko.',
    '..oodbccccsssdoobbbbo..',
    '...odbsssssssbdodddo...',
    '...oDdbo..obdDoooooo...',
    '...okkko..okkko........',
  ];
  const f2 = (e, m) => put(idle2a, 0, 7, face(1, e, m));
  const two = {
    idle: idle2a,
    blink: f2('shut', 'smile'),
    talk: f2('open', 'open'),
    talk2: f2('open', 'half'),
    happy: f2('joy', 'grin'),
    happy2: sink(f2('joy', 'grin'), 13),
    think: put(f2('up', 'hmm'), 19, 0, Q),
    // Tips the hat: the brim and both leaves slide right a pixel.
    fidget: nudge(f2('side', 'smile'), 0, 6, 0, 18),
    // The hat slides down over its eyes.
    sleep: put(sink(f2('nap', 'hush'), 7), 19, 0, Z),
    sleep2: put(sink(f2('nap', 'hush'), 7), 19, 1, z),
  };

  // ── III · Senpon ──────────────────────────────────────────────
  const base3 = [
    '....oo................oo....',
    '....ohgo..oooooooo..ohgo....',
    '.....oGgooyyyyyyYYooGgo.....',
    '......oo.oyyyyyYYYo.oo.oo...',
    '....ooooooRRRRRRRQoooooohgo.',
    '...ooyyyyyyyyyyyyyyYYYYooGgo',
    '.ooooorrrrrrrrrrrrrrrroo.oo.',
    'ohhgo.olkwekbbbbkwekdo..oo..',
    'oGGGo.olkeekbbbbkeekdo.ohgo.',
    '.ooo..okkeekcccckeekkooGgkko',
    '......okkkkcceecckkkkookkkko',
    '.......obpccDccDccpdo.ollbdo',
    '........odbscDDcsbdo.olbbbdo',
    '..oo...ookkddddddkkoookkkkko',
    '.oro.odkkbccccccccbkkdokkkko',
    '.oyYodkkcwwwccccccsskkdobbdo',
    'oyyYYokocwccccccccccsokkdodo',
    '.oRRRkkoccccccccccccsokkkodo',
    'oyyyYooocccccccccccssooooko.',
    'oAyyYYobcccccccccsssbdobbo..',
    'oyyYYrodkkossssssokkdDooo...',
    '.ooooooooo........ooooo.....',
  ];
  // Two phases of the orbit trail (every other dot on the leaf ring's ellipse) and the sparkles.
  const ORBIT = [
    [[1, 12], [0, 10], [3, 4], [9, 1], [13, 0], [18, 1], [26, 7]],
    [[0, 11], [2, 5], [4, 3], [11, 0], [16, 0], [27, 8], [1, 13]],
  ];
  const SPARK = [[[1, 2], [3, 11]], [[26, 1], [4, 11]]];
  const shimmer = (rows, n) => spark(glint(rows, ORBIT[n], 'h'), SPARK[n]);
  const f3 = (e, m) => put(base3, 0, 7, face(6, e, m));
  const three = {
    idle: shimmer(base3, 0),
    idle2: shimmer(base3, 1),
    blink: shimmer(f3('shut', 'smile'), 1),
    talk: shimmer(f3('open', 'open'), 0),
    talk2: shimmer(f3('open', 'half'), 1),
    happy: shimmer(f3('joy', 'grin'), 0),
    happy2: shimmer(sink(f3('joy', 'grin'), 13), 1),
    think: put(glint(f3('up', 'hmm'), ORBIT[1], 'h'), 0, 0, Q),
    fidget: shimmer(f3('side', 'smile'), 1),
    // The shimmer stops while it naps; the hat slides over its eyes.
    sleep: put(sink(f3('nap', 'hush'), 7), 0, 1, Z),
    sleep2: put(sink(f3('nap', 'hush'), 7), 0, 2, z),
  };

  const hat = { y: '#f2d27a', Y: '#c99a45', r: '#7d5426', R: '#c8463b', Q: '#8a2b2b' };
  PatchDex.evolve('pon', {
    habit: 'prompting',
    stages: [
      {
        name: 'Kasapon',
        species: 'straw-hat tanuki',
        blurb: 'Pon grew into a straw hat and tucked two leaves in the band: one for what it should become, one for how you will know it did.',
        voice: "name the target, the limits, and the proof. then i'll change.",
        evolve: 'Taller, hatted, and a second leaf: your prompts started naming the goal and the check together.',
        palette: hat,
        sprites: two,
        loop: [['idle', 22], ['blink', 2], ['idle', 16], ['fidget', 6], ['idle', 14], ['blink', 2], ['idle', 12], ['think', 10], ['idle', 8]],
      },
      {
        name: 'Senpon',
        species: 'thousand-leaf tanuki',
        blurb: 'A ring of leaves orbits Senpon, each one a shape it could take, and it takes none until the brief is exact. The gourd holds every prompt that ever worked.',
        voice: 'one line for the goal, one for the edges, one for done.',
        evolve: 'The two leaves became a ring and the shapeshift hangs in the air: you write prompts so exact the agent rarely has to guess.',
        palette: { ...hat, A: '#fff1b8' },
        sprites: three,
        loop: [['idle', 5], ['idle2', 5], ['idle', 5], ['blink', 2], ['idle2', 5], ['idle', 5], ['idle2', 5], ['fidget', 6], ['idle', 5], ['idle2', 5], ['blink', 2], ['idle', 5], ['think', 10], ['idle2', 5]],
      },
    ],
  });
})();
