// Tsugi evolutions — II Futatsugi (lidded kintsugi cup, steam lifting the lid), III Kintsuya (gold-seamed teapot tea-house spirit).
(function () {
  const pad = (w, x, s) => ('.'.repeat(x) + s + '.'.repeat(w)).slice(0, w);
  const put = (src, ...stamps) => {
    const g = src.map(r => [...r]);
    stamps.forEach(([x, y, art]) => art.forEach((r, j) => [...r].forEach((c, i) => {
      if (c !== ' ' && g[y + j] && x + i >= 0 && x + i < g[y + j].length) g[y + j][x + i] = c;
    })));
    return g.map(r => r.join(''));
  };
  const shift = (src, dy) => src.map((_, y) => src[y - dy] || '.'.repeat(src[0].length));
  // Rows above `y` move by dy (lid lifts, roof hops) while the rest stays put.
  const lift = (src, y0, dy) => src.map((r, y) => (y < y0 ? (src[y - dy] && y - dy < y0 ? src[y - dy] : '.'.repeat(r.length)) : r));

  // ── II · Futatsugi ────────────────────────────────────────────────────────────
  const W2 = 25;
  const R2 = (x, s) => pad(W2, x, s);
  const CUP2 = [
    R2(11, 'll'),
    R2(10, 'l..s'),
    R2(11, 'bl'),
    R2(9, 'olgo'),
    R2(6, 'oollllGsoo'),
    R2(4, 'oollbbbgbbbsoo'),
    R2(3, 'olcCccgcCcccCcso'),
    R2(1, 'oolllgllllllllllsoo'),
    R2(1, 'oooooooooooooooooooo'),
    R2(1, 'olcccCccccCcccgcCcsooooo'),
    R2(1, 'olbbbbbbbbbbbbbGbssobbso'),
    R2(1, 'olbbbwebbbbbbwebgsso.bso'),
    R2(1, 'olbbbeebbbbbbeebGsso.bso'),
    R2(1, 'olbbpeebbebbbeepgssobbso'),
    R2(2, 'olbgbbbbbbbbbbbsso.ooo'),
    R2(3, 'occgcccCcccccCco'),
    R2(4, 'oCCgGCCCCCCCCo'),
    R2(1, 'ooosssssssssssssssooo'),
    R2(0, 'ollbbbbbbbbbbbbbgbbbsso'),
    R2(1, 'osssssssssssssssgGssoo'),
    R2(3, 'oooooooooooooooooo'),
  ];
  const F2 = { lx: 6, rx: 13, ey: 11, mx: 10, ch: [5, 16] };
  const face2 = (src, mood) => {
    const { lx, rx, ey, mx, ch } = F2;
    const clear = [[lx, ey, ['bb', 'bb', 'bb']], [rx, ey, ['bb', 'bb', 'bb']], [mx - 1, ey + 2, ['bbb']], [mx - 1, ey + 3, ['bbb']]];
    const st = {
      open: [[lx, ey, ['we', 'ee', 'ee']], [rx, ey, ['we', 'ee', 'ee']], [mx, ey + 2, ['e']]],
      blink: [[lx, ey + 1, ['ee']], [rx, ey + 1, ['ee']], [mx, ey + 2, ['e']]],
      talk: [[lx, ey, ['we', 'ee', 'ee']], [rx, ey, ['we', 'ee', 'ee']], [mx - 1, ey + 2, ['epe']]],
      talk2: [[lx, ey, ['we', 'ee', 'ee']], [rx, ey, ['we', 'ee', 'ee']], [mx, ey + 2, ['e']], [mx, ey + 3, ['e']]],
      happy: [[lx - 1, ey + 1, ['.ee.', 'e..e']], [rx - 1, ey + 1, ['.ee.', 'e..e']], [mx - 1, ey + 3, ['eee']], [mx, ey + 4, ['p']]],
      sleep: [[lx - 1, ey + 1, ['e..e', '.ee.']], [rx - 1, ey + 1, ['e..e', '.ee.']], [mx, ey + 3, ['e']]],
      think: [[lx + 1, ey - 1, ['we', 'ee', 'ee']], [rx + 1, ey - 1, ['we', 'ee', 'ee']], [mx + 1, ey + 2, ['e']]],
      side: [[lx + 1, ey, ['we', 'ee', 'ee']], [rx + 1, ey, ['we', 'ee', 'ee']], [mx + 1, ey + 2, ['e']]],
    }[mood];
    let g = put(src, ...clear, ...st);
    if (mood !== 'sleep' && mood !== 'blink') g = put(g, [ch[0], ey + 2, ['p']], [ch[1], ey + 2, ['p']]);
    return g;
  };
  const STEAM2 = [
    ['..ll..', '.l..s.', '..bl..'],
    ['...ll.', '..l..s', '...bl.'],
    ['.l.l..', '.s.l..', '..bl..'],
    ['......', '......', '......'],
    ['.gg...', '...g..', '..g...'],
    ['ss....', '..s...', '.s....'],
  ];
  const steam2 = (src, k) => put(src, [9, 0, STEAM2[k]]);
  const clr2 = src => put(src, [9, 0, ['......', '......', '......']]);
  const s2 = {};
  const mk2 = (mood, k = 0) => steam2(clr2(face2(CUP2, mood)), k);
  s2.idle = mk2('open', 0);
  s2.idle2 = mk2('open', 1);
  s2.blink = mk2('blink', 0);
  s2.talk = mk2('talk', 1);
  s2.talk2 = mk2('talk2', 2);
  s2.happy = lift(mk2('happy', 2), 8, -1);
  s2.happy2 = put(lift(mk2('happy', 0), 8, -2), [3, 5, ['g']], [20, 4, ['g']]);
  s2.think = mk2('think', 4);
  s2.sleep = put(mk2('sleep', 3), [0, 0, ['CCC', '..C', '.C.', 'CCC']]);
  s2.sleep2 = put(mk2('sleep', 3), [1, 0, ['ccc', '..c', '.c.', 'ccc']]);
  s2.fidget = lift(mk2('side', 5), 8, -1);

  // ── III · Kintsuya ────────────────────────────────────────────────────────────
  // A round teapot whose lid grew into a little tea-house roof, lanterns hung from the eaves.
  const W3 = 28, H3 = 22;
  const blank3 = () => Array.from({ length: H3 }, () => '.'.repeat(W3));
  const BSP = { 7: [8, 19], 8: [8, 19], 9: [6, 21], 10: [5, 22], 16: [5, 22], 17: [6, 21], 18: [7, 20] };
  for (let y = 11; y <= 15; y++) BSP[y] = [4, 23];
  // Porcelain belly: outline, lit left column, two shade columns on the right; cobalt bands top and bottom.
  const belly = () => {
    const g = blank3().map(r => [...r]), on = (x, y) => BSP[y] && x >= BSP[y][0] && x <= BSP[y][1];
    Object.entries(BSP).forEach(([ys, [x0, x1]]) => {
      const y = +ys;
      for (let x = x0; x <= x1; x++) {
        if (!on(x - 1, y) || !on(x + 1, y) || !on(x, y - 1) || !on(x, y + 1)) { g[y][x] = 'o'; continue; }
        const dL = x - x0, dR = x1 - x;
        let c = dL === 1 ? 'l' : dR <= 2 ? 's' : 'b';
        if (y === 8 || y === 9) c = dR <= 2 ? 's' : 'l';
        if (y === 10) c = (x - 5) % 5 === 0 ? 'C' : 'c';
        if (y === 17) c = (x - 6) % 5 === 0 ? 'C' : 'c';
        if (y === 18) c = 'C';
        g[y][x] = c;
      }
    });
    return g.map(r => r.join(''));
  };
  const ROOF = [
    [12, 0, ['oggo']],
    [10, 1, ['occcCCCo']],
    [7, 2, ['ooccccgcCCCCoo']],
    [2, 3, ['o..ooccccccgcCCCCCCoo..o']],
    [2, 4, ['oaaaaaaaaaaaaaaaaaaaaaao']],
    [3, 5, ['.oAAAAAAAAAAAAAAAAAAAo.']],
    [9, 6, ['ollllllsso']],
    [8, 7, ['oCcccgccCCCo']],
  ];
  const LANTERN = (on, fl) => ['.o.', 'ooo', !on ? 'AAA' : fl ? 'yYy' : 'Yyy', !on ? 'AAA' : fl ? 'yyy' : 'yyA', 'ooo'];
  const SPOUT = [
    [0, 10, ['ooo']],
    [0, 11, ['olso']],
    [1, 12, ['olsbb']],
    [2, 13, ['ogGb']],
    [3, 14, ['oob']],
  ];
  const HANDLE = [24, 11, ['oooo', 'bbso', '.gso', '.bso', 'bbso', 'ooo.']];
  const SAUCER = [
    [3, 19, ['ooosssssssssssssssssssoo']],
    [1, 20, ['ollbbbbbbbbbbbbbbbbgbbbbsso']],
    [3, 21, ['oooooooooooooooooooooooo']],
  ];
  const VEINS = [[9, 8, 'g'], [10, 9, 'G'], [19, 10, 'g'], [20, 11, 'G'], [20, 12, 'g'], [19, 13, 'G'], [20, 14, 'g'],
    [6, 15, 'g'], [7, 16, 'g'], [8, 17, 'g'], [9, 18, 'g'], [10, 18, 'G'], [21, 19, 'g'], [22, 20, 'G']];
  const vein3 = (src, shine = -1) => put(src, ...VEINS.map(([x, y, c], i) => [x, y, [i % 4 === shine ? 'w' : c]]));
  const F3 = { lx: 9, rx: 17, ey: 12, mx: 13, ch: [8, 19] };
  const face3 = (src, mood) => {
    const { lx, rx, ey, mx, ch } = F3;
    const st = {
      open: [[lx, ey, ['we', 'ee', 'ee']], [rx, ey, ['we', 'ee', 'ee']], [mx, ey + 2, ['e']]],
      blink: [[lx, ey + 1, ['ee']], [rx, ey + 1, ['ee']], [mx, ey + 2, ['e']]],
      talk: [[lx, ey, ['we', 'ee', 'ee']], [rx, ey, ['we', 'ee', 'ee']], [mx - 1, ey + 2, ['epe']]],
      talk2: [[lx, ey, ['we', 'ee', 'ee']], [rx, ey, ['we', 'ee', 'ee']], [mx, ey + 2, ['e']], [mx, ey + 3, ['e']]],
      happy: [[lx - 1, ey + 1, ['.ee.', 'e..e']], [rx - 1, ey + 1, ['.ee.', 'e..e']], [mx - 1, ey + 3, ['eee']], [mx, ey + 4, ['p']]],
      sleep: [[lx - 1, ey + 1, ['e..e', '.ee.']], [rx - 1, ey + 1, ['e..e', '.ee.']], [mx, ey + 3, ['e']]],
      think: [[lx + 1, ey - 1, ['we', 'ee', 'ee']], [rx + 1, ey - 1, ['we', 'ee', 'ee']], [mx + 1, ey + 2, ['e']]],
      side: [[lx + 1, ey, ['we', 'ee', 'ee']], [rx + 1, ey, ['we', 'ee', 'ee']], [mx + 1, ey + 2, ['e']]],
    }[mood];
    let g = put(src, ...st);
    if (mood !== 'sleep' && mood !== 'blink') g = put(g, [ch[0], ey + 2, ['p']], [ch[1], ey + 2, ['p']]);
    return g;
  };
  const make3 = (mood, { lit = true, flick = false, shine = -1, sway = 0, roofDy = 0 } = {}) => {
    let g = put(blank3(), ...SAUCER, HANDLE, ...SPOUT);
    const b = belly();
    g = g.map((r, y) => [...r].map((c, x) => (b[y][x] !== '.' ? b[y][x] : c)).join(''));
    g = put(g, ...SPOUT.slice(2), HANDLE);
    g = vein3(face3(g, mood), shine);
    let roof = put(blank3(), ...ROOF, [2 + sway, 5, LANTERN(lit, flick)], [23 - sway, 5, LANTERN(lit, flick)]);
    roof = shift(roof, roofDy);
    return g.map((r, y) => [...r].map((c, x) => (roof[y][x] !== '.' ? roof[y][x] : c)).join(''));
  };
  const s3 = {};
  s3.idle = make3('open');
  s3.idle2 = make3('open', { shine: 0, flick: true });
  s3.blink = make3('blink');
  s3.talk = make3('talk');
  s3.talk2 = make3('talk2', { shine: 2 });
  s3.happy = make3('happy', { shine: 1, roofDy: -1 });
  s3.happy2 = put(make3('happy', { shine: 3 }), [0, 2, ['w']], [26, 8, ['w']], [1, 17, ['g']]);
  s3.think = put(make3('think'), [22, 0, ['g.g.g']]);
  s3.sleep = put(make3('sleep', { lit: false }), [0, 0, ['CCC', '..C', '.C.', 'CC.']]);
  s3.sleep2 = put(make3('sleep', { lit: false }), [0, 0, ['..c', '.c.', 'ccc']], [4, 0, ['CC', '.C']]);
  s3.fidget = make3('side', { sway: 1, shine: 1 });

  PatchDex.evolve('tsugi', {
    habit: 'recovery',
    stages: [
      {
        name: 'Futatsugi',
        species: 'lidded kintsugi cup',
        blurb: 'Tsugi grew a lid and twice the gold. It still steams a little when things go wrong, but now it vents, then gets on with the repair.',
        voice: 'let it steam, then name the crack. what broke, and why?',
        evolve: 'More seams, all of them gold, and a lid that lifts instead of shattering: you started treating failures as notes, not setbacks.',
        palette: {},
        sprites: s2,
        loop: [
          ['idle', 12], ['idle2', 8], ['idle', 10], ['blink', 2], ['idle2', 8], ['idle', 12],
          ['fidget', 6], ['idle2', 8], ['idle', 10], ['blink', 2], ['idle', 6], ['think', 10],
        ],
      },
      {
        name: 'Kintsuya',
        species: 'kintsugi tea-house spirit',
        blurb: 'A teapot that broke so often it became a tea house: lanterns lit, roof up, every old crack now its brightest feature.',
        voice: 'every outage is a seam. write the postmortem, then pour.',
        evolve: 'The cup became a whole house with a roof and lanterns: you recover fast, write it down, and leave the place sturdier than before.',
        palette: { A: '#7a4428', y: '#e8603c', Y: '#ffc27a' },
        sprites: s3,
        loop: [
          ['idle', 12], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle', 8], ['idle2', 6],
          ['fidget', 6], ['idle', 10], ['blink', 2], ['idle2', 8], ['think', 10], ['idle', 8],
        ],
      },
    ],
  });
})();
