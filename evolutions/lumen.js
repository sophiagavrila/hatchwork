// Lumen's evolutions — II: a bigger spectacled owl reading off a stack of pages, lantern parked on top.
// III: a librarian owl in a scholar's mantle, barred reading wings spread wide, lantern staff in hand.
(function () {
  // put(rows, [x, y, art]...): stamp art onto rows. ' ' and '.' keep the pixel underneath; '_' clears it.
  const put = (rows, ...stamps) => {
    const g = rows.map(r => [...r]);
    stamps.forEach(([x, y, art]) => art.forEach((r, j) => [...r].forEach((c, i) => {
      if (c === ' ' || c === '.' || !g[y + j] || x + i < 0 || x + i >= g[y + j].length) return;
      g[y + j][x + i] = c === '_' ? '.' : c;
    })));
    return g.map(r => r.join(''));
  };
  const blank = (w, h) => Array(h).fill('.'.repeat(w));

  // Shared owl head + body, 20 wide. Lens interiors (4x4) at x4 / x12, y8. Beak at x9, y9.
  const OWL = [
    '.o................o.',
    '.olo............odo.',
    '..olo..oooooo..odo..',
    '..ollollllbbbboddo..',
    '.olllllllbbbbbbbddo.',
    'ollllllllbbbbbbbbddo',
    'ollccccccbbccccccddo',
    'olccggggccccggggccdo',
    'obcgccccggggccccgcdo',
    'obcgccccgffgccccgcdo',
    'obcgccccghhgccccgcdo',
    'obcgccccgccgccccgcdo',
    'odccggggccccggggcsdo',
    'odbcccccccccccccsbdo',
    'obdddddddddddddddbdo',
    'onbllllllllllbbbbndo',
    'ondlblbblbblbblbbndo',
    '.ondlbllbllbllbbndo.',
    '..oonnnnnnnnnnnnoo..',
    '.....ffff..ffff.....',
  ];
  const EYES = {
    open: ['cwec', 'ceec', 'ceec', 'cccc'],
    blink: ['cccc', 'cccc', 'eeee', 'cccc'],
    happy: ['cccc', 'ceec', 'ecce', 'cccc'],
    up: ['ccwe', 'ccee', 'cccc', 'cccc'],
    left: ['wecc', 'eecc', 'eecc', 'cccc'],
    read: ['cccc', 'ccwe', 'ccee', 'ccee'],
    sleep: ['cccc', 'cccc', 'ecce', 'ceec'],
  };
  const BEAK = { shut: ['ff', 'hh', 'cc'], open: ['ff', 'ee', 'hh'] };
  const GLASS = {
    warm: ['oyyao', 'oyaao', 'oaaho'],
    flick: ['oyaao', 'oyyao', 'oaaho'],
    bright: ['oyyyo', 'oyyao', 'oyaao'],
    dim: ['oaaho', 'oahho', 'ohhho'],
  };
  const lamp = k => ['  g  ', ' ooo ', ...GLASS[k], ' ooo '];
  // Owl with a face; slump drops the collar row so the whole owl sits 1px lower.
  const owl = ({ e = 'open', er = e, b = 'shut', blush = false, slump = false, rows = OWL } = {}) => {
    let r = put(rows, [4, 8, EYES[e]], [12, 8, EYES[er]], [9, 9, BEAK[b]]);
    if (blush) r = put(r, [4, 13, ['pp']], [14, 13, ['pp']]);
    return slump ? ['.'.repeat(r[0].length), ...r.filter((_, i) => i !== 14)] : r;
  };

  // ---------- II: Folio ----------
  const W2 = 25, H2 = 21;
  // Loose sheets, each edge offset a pixel; top sheet shows ink lines, a red ribbon marks the place.
  const STACK = [
    '.oooooo.',
    'okkkkkko',
    'okikikmo',
    'okkkkkmo',
    'oommmmmo',
    'okkkkkko',
    'ommmmmro',
    'ooooooRo',
  ];
  const QUILL = [18, 0, ['..kk', '.kkm', '.km.', 'km..', 'e...']];
  const II = ({ face = {}, lit = 'warm', dy = 1, over = [], quill = true } = {}) => {
    const o = owl(face);
    const g = put(blank(W2, H2), quill ? QUILL : [0, 0, []], [0, dy, o], [17, 13, STACK], [18, 7, lamp(lit)]);
    return put(g, ...over);
  };
  const Q2 = [22, 0, ['ggg', '..g', '.gg', '...', '.g.']];
  const Z2a = [22, 2, ['lll', '..l', '.l.', 'lll']];
  const Z2b = [22, 1, ['lll', '..l', '.l.', 'lll']];
  const sprites2 = {
    idle: II(),
    idle2: II({ lit: 'flick' }),
    blink: II({ face: { e: 'blink' } }),
    talk: II({ face: { b: 'open' }, lit: 'bright' }),
    talk2: II({ lit: 'bright' }),
    happy: II({ face: { e: 'happy', b: 'open', blush: true }, lit: 'bright' }),
    happy2: II({ face: { e: 'happy', blush: true }, lit: 'bright', dy: 0 }),
    think: II({ face: { e: 'up' }, over: [Q2] }),
    sleep: II({ face: { e: 'sleep', slump: true }, lit: 'dim', over: [Z2a] }),
    sleep2: II({ face: { e: 'sleep', slump: true }, lit: 'dim', over: [Z2b, [20, 5, ['ll', '.l']]] }),
    fidget: II({ face: { e: 'read' }, over: [[5, 9, ['y']], [13, 9, ['y']]] }),
    fidget2: II({ face: { e: 'left' }, lit: 'flick', over: [[7, 9, ['y']], [15, 9, ['y']]] }),
  };

  // ---------- III: Lanternarch ----------
  const W3 = 28, H3 = 22;
  // Below the head: an academic stole around the neck, its two bands hanging down the chest to gold tips.
  const BODY3 = [
    'obdduvvvvaavvvvVddbo',
    'onbluvlllllbbbvVbndo',
    'ondluvblbblbblvVbndo',
    'ondluvlbllbllbvVbndo',
    'ondluvblbblbbbvVbndo',
    '.ondgglbllbbbbggndo.',
    '..oonnnnnnnnnnnnoo..',
    '.....ffff..ffff.....',
  ];
  // Raised barred wing (left, lit). Cream tips on the trailing edge read like page edges.
  const WING_L = [
    'o....',
    'oo...',
    'olo..',
    'ollo.',
    'olbbo',
    'okkkb',
    'olbbb',
    'olbbb',
    'okkkb',
    'olbbb',
    'obbdb',
    'okkmd',
    '.obdd',
    '.onbd',
    '..ond',
    '...on',
  ];
  const mirror = (rows, map) => rows.map(r => [...r].reverse().map(c => map[c] || c).join(''));
  // Right wing swings forward over the body to grip the staff.
  const WING_R = [
    '.....oo.',
    '...oobdo',
    '..obbddo',
    '.obmmmdo',
    'obddddo.',
    'odmmmo..',
    '.onno...',
    '..oo....',
  ];
  const HALO = [[21, 1], [22, 4], [26, 6], [22, 6], [27, 3], [21, 3]];
  const III = ({ face = {}, lit = 'warm', dy = 0, over = [], wing = 0, halo = true } = {}) => {
    const o = owl(face);
    const head = (face.slump ? o.slice(1, 15) : o.slice(0, 14));
    let g = blank(W3, H3);
    g = put(g, [0, 3 + wing, WING_L]);
    for (let y = 5; y < H3; y++) g = put(g, [25, y, ['jH']]);
    g = put(g, [23, 0, ['  g  ', ' ooo ', ...GLASS[lit], ' ooo ', ' ggg ']]);
    if (halo && lit !== 'dim') HALO.forEach(([x, y]) => { g = put(g, [x, y, ['Y']]); });
    g = put(g, [4, dy + (face.slump ? 1 : 0), head], [4, 14 + dy, BODY3]);
    g = put(g, [20, 12 + (face.slump ? 1 : 0), WING_R]);
    return put(g, ...over);
  };
  const sprites3 = {
    idle: III(),
    idle2: III({ lit: 'flick' }),
    blink: III({ face: { e: 'blink' } }),
    talk: III({ face: { b: 'open' }, lit: 'bright' }),
    talk2: III({ lit: 'bright' }),
    happy: III({ face: { e: 'happy', b: 'open', blush: true }, lit: 'bright', wing: -2 }),
    happy2: III({ face: { e: 'happy', blush: true }, lit: 'bright', wing: -3 }),
    think: III({ face: { e: 'up' }, over: [[0, 0, ['ggg', '..g', '.gg', '...', '.g.']]] }),
    sleep: III({ face: { e: 'sleep', slump: true }, lit: 'dim', wing: 2, over: [[0, 0, ['llll', '..l.', '.l..', 'llll']]] }),
    sleep2: III({ face: { e: 'sleep', slump: true }, lit: 'dim', wing: 2, over: [[0, 0, ['lll', '..l', '.l.', 'lll']]] }),
    fidget: III({ face: { e: 'read' }, over: [[5, 8, ['y']], [13, 8, ['y']]] }),
  };

  PatchDex.evolve('lumen', {
    habit: 'review',
    stages: [
      {
        name: 'Folio',
        species: 'spectacled page owl',
        blurb: 'Grew into proper spectacles and started keeping the pages. It reads the whole stack before it turns a single one over.',
        voice: 'skim the summary, then read the hunks. every one.',
        evolve: 'The lantern got a stack of pages to sit on, because you started reading what changed instead of trusting the summary.',
        palette: { k: '#fbf6e9', m: '#c4b48f', i: '#8a86b8', r: '#c8453a', R: '#8a2a2a' },
        sprites: sprites2,
        loop: [['idle', 20], ['blink', 2], ['idle', 8], ['idle2', 3], ['idle', 12], ['fidget', 10], ['idle', 4], ['fidget2', 6],
          ['idle', 14], ['blink', 2], ['idle', 6], ['idle2', 3], ['idle', 8]],
      },
      {
        name: 'Lanternarch',
        species: 'librarian lantern owl',
        blurb: 'Keeper of the night stacks. It reads by its own light, wears the mantle of everything it has read, and still checks the last line twice.',
        voice: 'no diff merges unread. not even the one-liners.',
        evolve: 'The lantern rose onto a staff and the wings opened wide, because reading every diff became the way you work, not a chore you remember.',
        palette: { k: '#fbf6e9', m: '#c9bfa6', i: '#8a86b8', r: '#c8453a', R: '#8a2a2a', u: '#d4566a', v: '#a8324a', V: '#6e1f3a', j: '#b07a45', H: '#6b4026', Y: '#8a6a2e' },
        sprites: sprites3,
        loop: [['idle', 22], ['blink', 2], ['idle', 8], ['idle2', 3], ['idle', 14], ['fidget', 10], ['idle', 10], ['blink', 2], ['idle', 8], ['idle2', 3]],
      },
    ],
  });
})();
