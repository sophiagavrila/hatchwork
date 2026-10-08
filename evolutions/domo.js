// Domo II–III. Latchkin keeps the house: a longer beard, a red woven sash, a lantern held up in one paw and a
// ring of brass keys on the hip. Hearthold carries the whole cottage on its back, chimney smoking, and leans
// on a tall besom like a staff.
(function () {
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
  // Stamp rows at x,y; '.' is see-through.
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  // Stamp only onto empty pixels: props that sit behind the body.
  const under = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] === '.') a[x + i] = ch; }); return a.join('');
  });
  // Drop everything above `row` by 1px (squash / slump); feet stay planted.
  const sink = (base, row) => ['.'.repeat(base[0].length), ...base.slice(0, row), ...base.slice(row + 1)];
  // Recolor pixels inside a box: swap(base, {a: 'I'}, x0, y0, x1, y1).
  const swap = (base, m, x0 = 0, y0 = 0, x1 = 99, y1 = 99) => base.map((r, y) => [...r].map((c, x) => (x >= x0 && x <= x1 && y >= y0 && y <= y1 && m[c] ? m[c] : c)).join(''));
  // Selective outline: exterior outline on the lit top-left edge turns warm brown.
  const rim = rows => {
    const g = rows.map(r => [...r]), at = (x, y) => (g[y] && g[y][x]) || '.';
    return g.map((r, y) => r.map((c, x) => (c === 'o' && (at(x - 1, y) === '.' || at(x, y - 1) === '.') && 'hlB'.includes(at(x + 1, y) + at(x, y + 1)) ? 'O' : c)).join(''));
  };
  const Z = ['ZZZ', '..Z', '.Z.', 'ZZZ'], z = ['zz', '.z', 'zz'], Q = ['...Z', '....', '.Z..', '....', 'Z...'];

  // ── II · Latchkin ─────────────────────────────────────────────
  // Body cols 4–22 (center 13). '#' is beard, filled in vertical strands: lit left of the part, shaded right.
  const strands = (rows, cx) => rows.map(r => [...r].map((c, x) => (c !== '#' ? c : x === cx ? 'g' : x < cx ? ((cx - x) % 2 ? 'B' : 'b') : r[x + 1] !== '#' ? 'g' : (x - cx) % 2 ? 'b' : 'B')).join(''));
  const body2 = strands([
    '.............o...........',
    '............oho..........',
    '.........oooohlooo.......',
    '.......olhhlhhlhlfdo.....',
    '......olhlfhlflhlfddo....',
    '.....olfBBBBbfBBBBbfdo...',
    '....olllfwelffflweffddo..',
    '.....olffeelfffleeffdo...',
    '....olfpppffNnnfpppfddo..',
    '...oBBBBBBBBnnxbbbbbbbgo.',
    '....ofbBBBBbgggbbbbgfddo.',
    '....odf#############fdo..',
    '....oqmq###########qmqo..',
    '....oQQQ###########QQQo..',
    '.....oqf###########fdDo..',
    '....oqdqf#########fdDDo..',
    '....oqddf#########fddDo..',
    '.....odddo#######odDDo...',
    '....ossSodo#####odossSo..',
    '...osSsSso.o###o.osSsSso.',
    '....ooooo....o....ooooo..',
  ], 13);
  const LANTERN = ['.ohlo', '.odfo', '..o..', '.oio.', 'oIiIo', 'oaAao', 'oAwAo', 'oaAao', 'oIiIo', '.ooo.'];
  const LANTERN_FLICK = LANTERN.map(r => r.replace('oAwAo', 'oAAwo'));
  const LANTERN_DIM = LANTERN.map(r => r.replace(/[aA]/g, 'I').replace('w', 'a'));
  const KEYS = ['.oIo.', 'oi.Io', '.oIo.', '.oao.', 'oaAo.', '.oo..'];
  const KEYS_SWING = ['.oIo.', 'oi.Io', '.oIo.', '..oao', '.oaAo', '..oo.'];
  const dress = (b, o = {}) => rim(put(put(b, 19, 14, o.keys || KEYS), 0, 5 + (o.ly || 0), o.lamp || LANTERN));
  const tuftL = { 0: '............o', 1: '...........oho', 2: '.........oooohlooo' };
  const shut = b => put(put(b, 9, 6, ['ff']), 16, 6, ['ff']);
  const beam = b => put(put(b, 8, 6, ['leel', 'effe']), 15, 6, ['leef', 'effe']);
  const two = {
    idle: dress(body2),
    idle2: dress(mod(body2, tuftL), { lamp: LANTERN_FLICK }),
    blink: dress(shut(body2)),
    talk: dress(put(body2, 12, 11, ['uuu'])),
    talk2: dress(put(body2, 12, 11, ['uUu', 'uuu'])),
    think: put(dress(put(put(body2, 8, 4, ['BBBBb', 'fflll']), 9, 6, ['ew', 'ee', '..', '..']), { lamp: LANTERN_FLICK }), 21, 0, Q),
    fidget: dress(mod(body2, tuftL), { keys: KEYS_SWING, ly: 1 }),
  };
  const happyFace2 = put(put(beam(body2), 8, 4, ['BBBBb', 'lllll']), 14, 4, ['BBBBb', 'lllll']);
  two.happy = dress(put(happyFace2, 12, 11, ['uUu']), { ly: -1, keys: KEYS_SWING });
  two.happy2 = dress(sink(put(happyFace2, 12, 11, ['uUu']), 4), { ly: 0 });
  const sleepFace2 = sink(put(put(shut(body2), 8, 5, ['gBBBb']), 14, 5, ['bBBBg']), 4);
  two.sleep = put(dress(sleepFace2, { lamp: LANTERN_DIM, ly: 2 }), 22, 0, Z);
  two.sleep2 = put(dress(sleepFace2, { lamp: LANTERN_DIM, ly: 2 }), 22, 1, z);

  const keeper = { a: '#ffb84a', A: '#ffe7a0', i: '#a7a29a', I: '#5e5853', m: '#e0a83a', Q: '#8a2a26' };

  // ── III · Hearthold ───────────────────────────────────────────
  // Latchkin's body with long elder brows and a braided beard tied with red beads, set 1px lower so the
  // cottage roof can rise behind the head. The lantern became the window light; the venik grew into a besom staff.
  const body3 = strands(mod(body2, {
    5: '.....olfBBBBbfBBBBbfdo',
    6: '....olBlfwelffflweflBdo',
    7: '.....oBffeelfffleeffBo',
    15: '....oqdqf##qQq###fdDDo',
    16: '....oqddfo#####ofddDo',
    17: '.....odddoo###oodDDo..',
    18: '....ossSodoqQqodossSo',
    19: '...osSsSso.o#o..osSsSso',
    20: '....ooooo...o....ooooo',
  }), 13);
  // The cottage on its back, peeking over the left shoulder: thatched gable, whitewashed wall, a lit window,
  // a brick chimney on the far slope with a wisp of smoke.
  const COTTAGE = [
    '......o......',
    '.....oyo.....',
    '..okoyyTo....',
    '..oKoyyTVo...',
    '..okyyTTVVo..',
    '.oyyyTTTVVVVo.',
    'oVVVVVVVVVVVVVo',
    '.ooooooooooooo',
    '.occcccccco',
    '.ocMMMMcGo',
    '.ocMaAMcGo',
    '.ocMAaMcGo',
    '.ocMMMMcGo',
    '.occcccGGo',
    '.ooooooooo',
  ];
  const DARK = COTTAGE.map(r => r.replace(/[aA]/g, 'M'));
  const SMOKE = [['FF..', '..E.'], ['..FF', '..E.'], ['F..F', '.EE.']];
  // Besom staff in the right paw: knob, pole, paw, red binding, bristles to the floor.
  const STAFF = ['.oho.', '.oto.', '.oto.', '.oto.', '.oto.', '.oto.', '.oto.', 'ohllo', 'odffo', '.oto.', '.oto.', '.oto.', '.oto.', '.oqo.', 'oyYyo', 'oyyYYo', 'oyYyYo', 'oyYyYo', 'oyYyYo', 'yoyoYo'];
  // Compose: body (shifted 2 right, 1 down) in front, cottage behind it, staff in the right paw.
  const home = (raw, o = {}) => {
    let g = put(Array.from({ length: 22 }, () => '.'.repeat(28)), 2, 1, raw);
    g = under(g, 0, 0, o.dark ? DARK : COTTAGE);
    if (o.smoke !== false) g = under(g, 1, 0, SMOKE[o.smoke || 0]);
    g = put(g, 22, 2 + (o.sy || 0), STAFF.map(r => (r.length === 5 ? '.' + r : r)));
    return rim(g);
  };
  const three = {
    idle: home(body3),
    idle2: home(mod(body3, tuftL), { smoke: 1 }),
    blink: home(shut(body3), { smoke: 1 }),
    talk: home(put(body3, 12, 11, ['uuu'])),
    talk2: home(put(body3, 12, 11, ['uUu', 'uuu']), { smoke: 1 }),
    think: put(home(put(put(body3, 8, 4, ['BBBBb', 'fflll']), 9, 6, ['ew', 'ee', '..', '..'])), 15, 0, ['Z..', '...', '.Z.']),
    fidget: home(mod(body3, tuftL), { smoke: 2, sy: -1 }),
  };
  const happyFace3 = put(put(beam(body3), 8, 4, ['BBBBb', 'lllll']), 14, 4, ['BBBBb', 'lllll']);
  three.happy = home(put(happyFace3, 12, 11, ['uUu']), { smoke: 2, sy: -1 });
  three.happy2 = sink(home(put(happyFace3, 12, 11, ['uUu']), { smoke: 1 }), 7);
  const sleepFace3 = put(put(shut(body3), 8, 5, ['gBBBb']), 14, 5, ['bBBBg']);
  three.sleep = put(sink(home(sleepFace3, { dark: true, smoke: false }), 7), 12, 0, Z);
  three.sleep2 = put(sink(home(sleepFace3, { dark: true, smoke: false }), 7), 13, 1, z);

  PatchDex.evolve('domo', {
    habit: 'review',
    stages: [
      {
        name: 'Latchkin',
        species: 'lantern house warden',
        blurb: 'Latchkin walks the house at night with a lantern up and a ring of keys on its sash, checking every room before the door is locked.',
        voice: 'lamp on the diff. every line in it should be one you meant.',
        evolve: 'A lantern, a ring of keys and a longer beard: you started reading the whole diff and git status before every commit.',
        palette: keeper,
        sprites: two,
        loop: [['idle', 20], ['blink', 2], ['idle', 8], ['idle2', 6], ['idle', 12], ['fidget', 3], ['idle', 3], ['fidget', 3], ['idle', 14], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 8]],
      },
      {
        name: 'Hearthold',
        species: 'hearth-keeper elder',
        blurb: 'Hearthold carries the whole cottage on its back, window lit and chimney smoking, and leans on a besom as tall as itself. Nothing in this house is there by accident.',
        voice: 'a clean house is a diff you could explain room by room.',
        evolve: 'The lantern became a lit window and the venik a staff: you leave every tree cleaner than you found it, so the whole codebase is home.',
        palette: { ...keeper, T: '#e2b04c', V: '#9c6a2a', M: '#3a2a26', G: '#a8988a', E: '#8f8782', F: '#cfc6be' },
        sprites: three,
        loop: [['idle', 18], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle', 12], ['fidget', 4], ['idle', 10], ['idle2', 6], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 8]],
      },
    ],
  });
})();
