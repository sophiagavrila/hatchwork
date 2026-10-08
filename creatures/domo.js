// Domo — domovoi house spirit. A rye-brown furball with a big ash-white beard, bushy brows, an ember nose,
// bast-shoe feet and a little twig broom (venik) bound with red thread.
(function () {
  const W = 21;
  const pad = rows => rows.map(r => r.padEnd(W, '.'));
  // Body only (cols 0-16); the venik is stamped on afterwards.
  const body = pad([
    '........o........',
    '.......oho.......',
    '....ooohhlooo....',
    '...olhhlhhlfdo...',
    '..olhlfhlflfddo..',
    '.olfBBBbfBBBbfdo.',
    'olllbwellfwegfdo.',
    '.olffeelffeefddo.',
    '.olfppfNnnfppfddo',
    '.olBBBBnnxbbbgdo.',
    'olBBBBBbgBbbbgdo.',
    '.ofBbBbBgbBbgfdo.',
    '.ofBbBbBbgbgbfddo',
    'odfBbBbBbgbgbdDo.',
    '.oddfBbBbgbgfdDo.',
    '..ossSoBbgossSo..',
    '.osSsSoobooosSsSo',
    '..oooo..o..oooo..',
  ]);
  // Replace rows by index: mod(base, {7: '...'}). Short rows replace the left part only.
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
  // Stamp small rows at (x, y); '.' is transparent.
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  // Drop everything above `row` by 1px (squash / slump); feet stay planted.
  const sink = (base, row) => ['.'.repeat(W), ...base.slice(0, row), ...base.slice(row + 1)];
  // Selective outline: exterior outline on the lit top-left edge turns warm brown.
  const rim = rows => {
    const g = rows.map(r => [...r]), at = (x, y) => (g[y] && g[y][x]) || '.';
    return g.map((r, y) => r.map((c, x) => (c === 'o' && (at(x - 1, y) === '.' || at(x, y - 1) === '.') && 'hlB'.includes(at(x + 1, y) + at(x, y + 1)) ? 'O' : c)).join(''));
  };
  // Venik: handle up, a paw gripping it, red binding, straw fanning down in strands.
  const VENIK = [
    '..o...',
    '.oto..',
    '.oto..',
    'ohlo..',
    'odto..',
    '.oqo..',
    '.oyYo.',
    'oyyYo.',
    'oyYyYo',
    'oyYyYo',
    'yoyoYo',
  ];
  const VENIK_SWISH = [
    '..o...',
    '.oto..',
    '.oto..',
    'ohlo..',
    'odto..',
    '.oqo..',
    '..oyYo',
    '.oyyYo',
    '.oyYyYo',
    '.oyYyYo',
    '.yoyoYo',
  ];
  const VENIK_UP = [
    '..o...',
    '.oto..',
    'ohlo..',
    'odto..',
    '.oqo..',
    '.oyYo.',
    'oyyYo.',
    'oyYyYo',
    'oyYyYo',
    'yoyoYo',
  ];
  const v = (b, rows = VENIK, dy = 0) => rim(put(b, 15, 5 + dy, rows));
  const eyesShut = { 6: 'olllbllllfffgfdo.' };
  const idle = v(body);
  const idle2 = v(mod(body, { 0: '.........o', 1: '.......oho', 2: '....oooohlooo' }));
  const blink = v(mod(body, eyesShut));
  const talk = v(mod(body, { 11: '.ofBbBbuuubbgfdo.' }));
  const talk2 = v(mod(body, { 11: '.ofBbBbuUubbgfdo.', 12: '.ofBbBbuuubgbfddo' }));
  const happyFace = mod(body, { 4: '..olhBBBbBBBbdo..', 5: '.olflllfflllffdo', 6: 'olllbeellfeegfdo.', 7: '.olfeffefeffeddo.', 11: '.ofBbBbuUubbgfdo.' });
  const happy = v(happyFace, VENIK_UP);
  const happy2 = v(sink(happyFace, 4), VENIK_UP, -1);
  const sleepFace = sink(mod(body, { 5: '.ollgBBbfbBBgfdo.', ...eyesShut, 11: '.ofBbBbBubBbgfdo.' }), 4);
  const sleep = put(v(sleepFace, VENIK, 1), 17, 0, ['ZZZ', '..Z', '.Z.', 'ZZZ']);
  const sleep2 = put(v(sleepFace, VENIK, 1), 18, 1, ['zz', '.z', 'zz']);
  const think = put(v(mod(body, { 4: '..olhhllfBBBbdo..', 5: '.ollBBBbfflllfdo.', 6: 'olllbwellfwegfdo.' })), 17, 0, ['...z', '....', '.z..', '....', 'z...'].map(r => r.replace(/z/g, 'Z')));
  const fidget = v(mod(body, { 0: '.........o', 1: '.......oho', 2: '....oooohlooo' }), VENIK_SWISH);
  // Entrance-only poses.
  const bow = v(sink(sink(mod(body, { 5: '.olfgBBbfbBBgfdo.', ...eyesShut }), 4), 4), VENIK, 2);
  PatchDex.register({
    id: 'domo', name: 'Domo', species: 'hearth house spirit', rarity: 'common', habit: 'review',
    blurb: 'A whiskery little house spirit who lives behind the stove and keeps the place tidy. Leave it bread and a clean working tree.',
    coaching: 'Workspace hygiene before commit: run git status and read the diff, then sweep out temp files, debug prints, untracked junk and stale TODOs.',
    voice: 'who left a debug print by the stove? git status, then sweep.',
    hatch: 'A fire catches in a little brick stove beside the egg; bristles poke out of the crack, sweep the shell into a neat pile, and Domo bows.',
    palette: {
      o: '#2f1a14', O: '#6e4129', h: '#f0c890', l: '#d49b5e', f: '#a86c3c', d: '#7a4628', D: '#552d1d',
      B: '#f3ece2', b: '#cdc2b6', g: '#958a84', e: '#1c1210', w: '#ffffff', p: '#e88a6c',
      n: '#d65a3a', N: '#ff9e6e', x: '#9c3a2a', u: '#5b2422', U: '#d9675a',
      t: '#8b5a32', q: '#c8413a', y: '#ecc76a', Y: '#b58a3c', s: '#d6b679', S: '#9b7a45',
      z: '#e6ddd2', Z: '#b3aaa1',
      k: '#b0503a', K: '#7a3226', c: '#d8c6ae', C: '#4a4442', r: '#ff9a3c', R: '#ffe08a', j: '#b8402a',
    },
    sprites: { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 20], ['blink', 2], ['idle', 6], ['idle2', 8], ['idle', 12], ['fidget', 2], ['idle', 2], ['fidget', 2], ['idle', 2], ['fidget', 2], ['idle', 14], ['blink', 2], ['idle', 10], ['idle2', 8], ['idle', 8]],
    entrance(k) {
      const out = k.eggIntro();
      const { f } = k, EX = k.eggHome.x, EY = k.eggHome.y;
      // A little brick stove with a loaf on the ledge. Fades up out of the dark from its embers.
      const STOVE = [
        '....oooo',
        '.oo.okKo',
        'oyYookKo',
        'occcccco',
        'okkKkkKo',
        'oKkkKkko',
        'okoooKko',
        'oorRroKo',
        'oojrjoko',
        'okoooKko',
        'oKkkKkKo',
        'oooooooo',
      ];
      const FLICK = [{}, { r: 'R', R: 'r' }, { R: 'r', j: 'r' }];
      const stove = (g, lvl = 2, fl = 0) => {
        // lvl 0: embers only, 1: soot silhouette, 2: lit.
        const rows = STOVE.map(r => [...r].map(c => ('rRj'.includes(c) ? (FLICK[fl % 3][c] || c) : lvl === 0 ? '.' : lvl === 1 && c !== 'o' ? 'C' : c)).join(''));
        return k.stamp(g, rows, 0, 10);
      };
      // Shell bits: [x, y, rows]. They land on the floor, then get swept into a pile at the foot of the stove.
      const BITS = [[3, 20, ['21', '13']], [7, 21, ['31']], [10, 20, ['0', '1']], [12, 21, ['61']], [14, 21, ['2']], [16, 21, ['14']], [5, 21, ['3']]];
      const PILE = ['..12..', '.12131', '1213316'];
      const bits = (g, t) => { BITS.forEach(([x, y, r], i) => { const tx = 1 + (i % 4); k.stamp(g, r, Math.round(x + (tx - x) * t), y); }); return g; };
      const pile = (g, glint) => { k.stamp(g, PILE, 0, 19); if (glint) { k.px(g, 3, 18, '7'); k.px(g, 2, 18, '2'); k.px(g, 4, 18, '2'); } return g; };
      // Bristles poking out of the crack; sw = sideways swish.
      const straw = (g, h, sw = 0) => {
        for (let j = 0; j < h; j++) [4, 5, 6, 7].forEach((x, i) => k.px(g, EX + x + sw * ((j + 1) >> 1), EY + 3 - j, j === h - 1 ? 'Y' : (i + j) % 2 ? 'Y' : 'y'));
        return g;
      };
      const lifted = (dy, sw, h) => { const g = stove(k.egg(k.EGG_BOTTOM), 2, h); straw(g, h, sw); return k.stamp(g, k.EGG_TOP, EX + sw, EY + dy); };
      // The bottom shell parts like two doors, falling outward over Domo.
      const L = k.EGG_BOTTOM.map(r => r.slice(0, 6)), R = k.EGG_BOTTOM.map(r => r.slice(6));
      const doors = (g, t) => { k.stamp(g, L, EX - 2 * t, EY + t * t); k.stamp(g, R, EX + 6 + 2 * t, EY + t * t); return g; };
      const scene = (n, dx, o = {}) => {
        const g = stove(k.blank(), o.lvl === undefined ? 2 : o.lvl, o.fl || 0);
        if (o.pile) pile(g, o.glint); else if (o.t !== undefined) bits(g, o.t);
        return k.over(g, n, dx, 0, o.flip ? { flipX: true } : {});
      };
      out.push(
        f(stove(k.egg(k.EGG_C2), 0, 0), 260, { note: 'something glows in the dark' }),
        f(stove(k.egg(k.EGG_C2), 1, 1), 160),
        f(stove(k.egg(k.EGG_C2), 2, 0), 320, { note: 'a little brick stove' }),
        f(lifted(-1, 0, 1), 180, { note: 'bristles poke out of the crack' }),
        f(lifted(-2, -1, 2), 110),
        f(lifted(-2, 1, 2), 110),
        f(lifted(-3, -1, 3), 110),
        f(k.stamp(straw(stove(k.egg(k.EGG_BOTTOM), 2, 2), 4, -1), k.EGG_TOP, EX - 6, EY - 3, { flipX: true }), 100, { note: 'swish' }),
        f(straw(bits(stove(k.egg(k.EGG_BOTTOM), 2, 0), 0), 3, 1), 160),
        f(doors(k.over(stove(bits(k.blank(), 0), 2, 1), 'blink', 4), 1), 110, { note: 'the shell parts' }),
        f(doors(k.over(stove(bits(k.blank(), 0), 2, 2), 'idle', 4), 2), 100),
        f(scene('idle', 4, { t: 0 }), 320, { note: 'shell everywhere' }),
        f(scene('blink', 4, { t: 0, fl: 1 }), 120),
        f(scene('idle', 4, { t: 0, flip: true, fl: 2 }), 200, { note: 'not in my house' }),
        f(scene('fidget', 4, { t: 0.35, flip: true }), 110, { note: 'sweep, sweep' }),
        f(scene('idle', 4, { t: 0.7, flip: true, fl: 1 }), 110),
        f(scene('fidget', 4, { t: 1, flip: true, fl: 2 }), 110),
        f(scene('idle', 4, { pile: true, glint: true, flip: true }), 320, { note: 'a neat pile by the stove' }),
        f(scene('idle', 4, { pile: true, fl: 1 }), 200),
        f(scene(bow, 4, { pile: true, fl: 2 }), 560, { note: 'Domo bows' }),
        f(scene('happy', 4, { pile: true }), 220),
        f(scene('happy2', 4, { pile: true, fl: 1 }), 140),
        f(scene('happy', 4, { pile: true, fl: 2 }), 240),
        f(scene('fidget', 3, { pile: true, lvl: 1 }), 120),
        f(scene('idle', 2, { lvl: 0, fl: 1 }), 120),
        f(k.at('fidget', 1), 120),
        f(k.at('idle'), 360),
        f(k.at('blink'), 110),
        f(k.at('idle'), 420),
      );
      return out;
    },
  });
})();
