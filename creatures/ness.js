// Ness — a baby loch cryptid. Teal-moss plesiosaur with ossicone stubs, a cream throat, one hump and a curled tail tip, bobbing in a pocket of dark loch water.
(function () {
  const idle = [
    '.....oo..oo.........',
    '....oLlooldo........',
    '...oLLllllbdo.......',
    '..oLLllllllbdo......',
    '..oLlllllllbdo......',
    '..ollwellwebdo......',
    '..olleelbeebdo......',
    '..obbeebbeebdo......',
    '..obpbccccbpdo......',
    '...odbcmmcbdo.......',
    '....oddccddo........',
    '.....occbbdooooo....',
    '.....occbbdoLllbo.o.',
    '.....occbbdollbbdolo',
    '.....occbbdobbbbddlo',
    '.....occbbdobbbddddo',
    '.uiiifrrrrrfrrrrrrfi',
    'uuiuuurrrruurrrruiuu',
    'auuuuuurruuuurruuuua',
    '..aaaaaaaaaaaaaaaa..',
  ];
  const W = idle[0].length;
  // Stamp art onto rows; spaces are skipped, '.' erases.
  const put = (base, x, y, art) => base.map((r, j) => {
    const p = art[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== ' ' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  // Swap the face: rows 4-7, the 10 px between the head outlines (cols 3-12).
  const face = (base, rows) => put(base, 3, 4, rows);
  // Head and neck drop 1px (one neck row tucks under): the slump / bounce.
  const sink = base => ['.'.repeat(W), ...base.slice(0, 11), ...base.slice(12)];
  // Shift the head (rows 0-10) sideways for a tilt/peer.
  const tilt = (base, d) => base.map((r, y) => (y > 10 ? r : d > 0 ? '.'.repeat(d) + r.slice(0, W - d) : r.slice(-d) + '.'.repeat(-d)));
  const F = {
    blink: ['Llllllllbd', 'llllllllbd', 'lleelbeebd', 'bbbbbbbbbd'],
    joy: ['Llllllllbd', 'lleelleebd', 'lellbbbbed', 'bbbbbbbbbd'],
    sleep: ['Llllllllbd', 'llllllllbd', 'llllbbbbbd', 'bbeebbeebd'],
    think: ['Lllwellwed', 'llleelleed', 'llleebbeed', 'bbbbbbbbbd'],
    peek: ['Llllllllbd', 'lwelwellbd', 'leelbeebbd', 'beebbeebbd'],
  };
  const Z = ['zzzz', '...z', '..z.', '.z..', 'zzzz'], z = ['zzz', '..z', '.z.', 'zzz'];

  const idle2 = put(idle, 0, 16, [
    '.uifiirrrrrirrrrrrif',
    'uiuuurrrruuurrrruuiu',
    'auuuuurruuuuurruuuua',
  ]);
  const blink = face(idle, F.blink);
  const talk = put(idle, 7, 9, ['mm', 'mm']);
  const talk2 = put(idle, 6, 9, ['mmmm']);
  const happy = put(face(idle, F.joy), 6, 9, ['mmmm', ' pp ']);
  const happy2 = put(sink(happy), 15, 8, ['f  f', ' f  ', '   f']);
  const sleepBase = sink(put(face(idle, F.sleep), 7, 9, ['cm']));
  const sleep = put(put(sleepBase, 16, 0, Z), 14, 6, z);
  const sleep2 = put(put(sleepBase, 15, 1, Z), 17, 7, z);
  const think = put(put(face(idle, F.think), 6, 9, ['ccmc']), 15, 0, ['yyy', '...y', '.yy', '.y', '', '.y']);
  const fidget = put(tilt(face(idle, F.peek), -1), 17, 11, ['.o', 'olo', 'olo']);

  PatchDex.register({
    id: 'ness',
    name: 'Ness',
    species: 'baby loch cryptid',
    rarity: 'uncommon',
    habit: 'research',
    blurb: 'Famous mostly for a blurry photo, Ness has spent a lifetime being "sighted" and never once confirmed, so it is deeply unimpressed by claims without receipts.',
    coaching: 'Research before editing: treats every claim as a sighting, not evidence. When the agent says "this API exists" or "tests pass", it asks for the file and line, the command, and the output.',
    voice: "that's a sighting, not proof. show me the file and line.",
    hatch: 'The egg sinks into dark loch water in widening rings, a camera flash catches a blurry long-necked shape rising from the deep, and the photo sharpens into Ness, dripping and grinning.',
    palette: {
      o: '#173b42', // outline: deep teal, never black
      L: '#d6f2b2', l: '#8fd39a', b: '#4fad8b', d: '#2f7e72',
      c: '#f2f0cf', // pale throat / muzzle
      e: '#15202b', w: '#ffffff', p: '#f29b8c', m: '#6d2a3b',
      // loch water
      a: '#0d2546', u: '#1a4a7c', i: '#3f86bd', f: '#c4e8f7', r: '#245f6c',
      z: '#cfe2f5', y: '#ffe08a',
      // the "surgeon's photo": sepia tones and the print border
      g: '#ddd0ad', G: '#a4906b', h: '#5a4c3b', H: '#2c251e', P: '#f6f1e4',
    },
    sprites: { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [
      ['idle', 14], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle2', 6], ['idle', 12],
      ['fidget', 10], ['idle', 8], ['blink', 2], ['idle2', 6], ['idle', 8], ['think', 12], ['idle2', 6],
    ],
    entrance(k) {
      const { f, blank, px, stamp, W: CW, H: CH } = k;
      const SURF = 17; // loch surface row
      const CX = 13.5;
      // Dark loch across the bottom: lit surface line, deepening below.
      const loch = (g, calm = true) => {
        for (let y = SURF; y < CH; y++) for (let x = 0; x < CW; x++) {
          const d = y - SURF;
          g[y][x] = d === 0 ? ((x + (calm ? 0 : 1)) % 7 === 0 ? 'i' : 'u') : d < 3 ? 'u' : 'a';
          if (d === 1 && (x * 3 + y) % 11 === 0) g[y][x] = 'i';
        }
        return g;
      };
      // An expanding ripple ring on the surface (flattened ellipse), clipped to the water.
      const ring = (g, r, ch = 'f', cx = CX) => {
        for (let a = 0; a < 96; a++) {
          const t = (a / 96) * Math.PI * 2, x = Math.round(cx + Math.cos(t) * r), y = Math.round(SURF + 1 + Math.sin(t) * r * 0.28);
          if (y >= SURF && y < CH) px(g, x, y, ch);
        }
        return g;
      };
      // The egg, drawn so everything below the surface is hidden by water.
      const sunk = (dy, rows = k.EGG_C2) => {
        const g = blank();
        stamp(g, rows, k.eggHome.x, k.eggHome.y + dy);
        return loch(g.map((r, y) => (y >= SURF ? r.map(() => '.') : r)));
      };
      const bubbles = (g, t) => { [[12, SURF - 1 - t], [15, SURF - 2 - t], [13, SURF - 4 - t]].forEach(([x, y], i) => { if (y < SURF && i <= t) px(g, x, y, 'f'); }); return g; };
      // The classic long-neck profile from the famous photo.
      const NECK = [
        '..hhh........',
        'hhhhhh.......',
        '...hhhh......',
        '....hhh......',
        '.....hhh.....',
        '.....hhh.....',
        '......hhh....',
        '......hhhh...',
        '.....hhhhhh..',
        '....hhhhhhhhh',
      ];
      // Blurry: a soft halo, then a checker-dithered core. blur=2 very soft, 1 soft, 0 crisp.
      const sighting = (g, rise, blur, core = 'h', halo = 'G') => {
        const x0 = 8, y0 = SURF - NECK.length + 1 + rise;
        const on = (x, y) => NECK[y] && NECK[y][x] === 'h';
        if (blur) NECK.forEach((r, j) => [...r].forEach((_, i) => {
          if (!on(i, j)) return;
          [[-1, 0], [1, 0], [0, -1], [blur > 1 ? 2 : 0, 0], [blur > 1 ? -2 : 0, 0]].forEach(([dx, dy]) => {
            const x = x0 + i + dx, y = y0 + j + dy;
            if (y < SURF && !on(i + dx, j + dy) && (blur > 1 || (x + y) % 2 === 0)) px(g, x, y, halo);
          });
        }));
        NECK.forEach((r, j) => [...r].forEach((c, i) => {
          const x = x0 + i, y = y0 + j;
          if (c === 'h' && y < SURF && (blur < 2 || (x + y) % 2 === 0 || !on(i - 1, j) || !on(i + 1, j))) px(g, x, y, core);
        }));
        return g;
      };
      // The photo: sepia loch, print border, the blurry shape.
      const photo = (rise, blur, border = true) => {
        const g = blank();
        for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) g[y][x] = y < SURF ? (y < 6 ? 'g' : 'G') : (y - SURF) % 2 ? 'h' : 'G';
        for (let x = 0; x < CW; x += 3) px(g, x + (x % 2), SURF + 1, 'g');
        sighting(g, rise, blur, 'H', 'h');
        if (border) for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) if (x === 0 || x === CW - 1 || y === 0 || y >= CH - 3) g[y][x] = 'P';
        return g;
      };
      const flash = () => blank().map(r => r.fill('P'));
      // Ness in the loch: the full-width water behind her own pond.
      const ness = (n, dy = 0, rings = []) => {
        const g = loch(blank());
        rings.forEach(r => ring(g, r, r > 9 ? 'i' : 'f'));
        return k.over(g, n, 0, dy);
      };
      // The same photo of the real Ness, in sepia; then it develops into color from the top down.
      const SEP = { o: 'H', e: 'H', m: 'H', a: 'H', d: 'h', r: 'h', u: 'h', b: 'G', p: 'G', i: 'G', l: 'G', L: 'P', c: 'P', w: 'P', f: 'P', '.': 'g' };
      const sepia = (g, border) => g.map((r, y) => r.map((c, x) => (border && (x === 0 || x === CW - 1 || y === 0 || y >= CH - 3) ? 'P' : SEP[c] || 'G')));
      const develop = t => { const col = ness('idle'), sp = sepia(ness('idle'), false); return col.map((r, y) => (y < t ? r : sp[y])); };

      return [
        ...k.eggIntro(),
        // the ground turns out to be water
        f(loch(k.egg(k.EGG_C2).map((r, y) => (y >= SURF ? r.map(() => '.') : r))), 260, { note: 'the egg is floating on dark water' }),
        f(ring(sunk(1), 3), 110, { note: 'it sinks' }),
        f(ring(ring(sunk(3), 5), 2, 'i'), 110),
        f(ring(ring(sunk(6), 7), 4, 'i'), 120),
        f(ring(ring(sunk(10), 9, 'i'), 6), 130),
        f(bubbles(ring(ring(loch(blank()), 11, 'i'), 8), 0), 150),
        f(bubbles(ring(loch(blank()), 10, 'i'), 1), 170),
        f(bubbles(ring(loch(blank()), 13, 'i'), 2), 200),
        f(loch(blank()), 380, { note: 'the loch goes still' }),
        f(loch(blank(), false), 300),
        // something long-necked rises out of the murk
        f(sighting(loch(blank()), 6, 2, 'r', 'u'), 220, { note: 'a shape in the water' }),
        f(sighting(loch(blank()), 3, 2, 'r', 'u'), 220),
        f(sighting(loch(blank()), 0, 2, 'd', 'r'), 260),
        // click
        f(flash(), 70, { note: 'click' }),
        f(photo(0, 2), 120),
        f(photo(0, 2), 440, { note: 'the famous photo' }),
        f(photo(0, 1), 240, { note: 'it sharpens' }),
        f(photo(0, 0), 200),
        // the print is of the real thing, and it develops
        f(sepia(ness('idle'), true), 320, { note: '...wait, it is real' }),
        f(develop(7), 90),
        f(develop(13), 90),
        f(develop(19), 90),
        f(ness('happy', 0, [4]), 180, { note: 'Ness!' }),
        f(ness('happy2', 0, [7, 3]), 160),
        f(ness('happy', 0, [10, 6]), 160),
        f(ness('idle', 0, [13, 9]), 200),
        f(ness('blink', 0, [12]), 110),
        f(ness('idle'), 220),
        f(k.at('idle2'), 220),
        f(k.at('idle'), 300),
      ];
    },
  });
})();
