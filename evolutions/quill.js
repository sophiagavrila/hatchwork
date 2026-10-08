// Quill, grown: II Scribbet, a hedgehog whose spines are pen nibs, scroll in paw and ink pot at its feet;
// III Marginalis, a grand archivist with a fan of feather quills, spectacles on its nose and an open ledger of diffs.
(function () {
  const canvas = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
  const rows = g => g.map(r => r.join(''));
  const px = (g, x, y, c) => { if (g[y] && x >= 0 && x < g[0].length) g[y][x] = c; return g; };
  // stamp(g, x, y, art): '.' and ' ' keep the pixel underneath.
  const stamp = (g, x, y, art) => { art.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.' && c !== ' ') px(g, x + i, y + j, c); })); return g; };
  // Spine coat: radial streaks (t > S > s) around a centre, dark outline, lit from the top-left.
  function coat(g, inside, [cx, cy]) {
    const H = g.length, W = g[0].length;
    const on = (x, y) => x >= 0 && y >= 0 && x < W && y < H && inside(x, y);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (!on(x, y)) continue;
      if (!on(x - 1, y) || !on(x + 1, y) || !on(x, y - 1) || !on(x, y + 1)) { g[y][x] = 'o'; continue; }
      const a = Math.atan2(y + 0.5 - cy, x + 0.5 - cx), r = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      const k = Math.floor((a + Math.PI) / (Math.PI / 9) + r * 0.18) % 3;
      let c = ['s', 'S', 't'][k];
      if (x + 0.5 > cx + 3 && c === 't') c = 'S';
      if (x + 0.5 > cx + 6 && c === 'S') c = 's';
      g[y][x] = c;
    }
  }
  const ell = (cx, cy, rx, ry) => (x, y) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
  const Z = ['hhh', '..h', '.h.', 'hhh'];
  const ASK = ['.gg.', 'g..g', '..g.', '....', '..g.'];
  const SPARK = ['.g.', 'gwg', '.g.'];

  // ── II · Scribbet ──
  const W2 = 24, H2 = 21;
  const BODY2 = ell(11, 12.6, 9.6, 8.5);
  const PENS2 = [-172, -148, -124, -104, -76, -56, -32, 188];
  const FACE2 = [
    '..cccccccc..',
    '.cccccccccc.',
    'cweccccccwec',
    'ceecccccceec',
    'ceecccccceec',
    'pcccceeccccp',
    '.cccccccccC.',
    '..CCccccCC..',
  ];
  const SPECS2 = ['.gg....gg.', 'gwhgoogwhg', '.gg....gg.'];
  const SCROLL2 = [
    'oCCCCCCCCCCCCo',
    '.ouiiuiiiuuuo.',
    '.ouuuuuuuuuUo.',
    '.ouiiiuiiuuUo.',
    'oCCCCCCCCCCCCo',
  ];
  const LINE2 = ['iiiuiiiiu'];
  const PAW = ['oppo', 'opPo', '.oo.'];
  const POT2 = ['.oCo.', 'oiiio', 'oIhio', 'oIiio', '.ooo.'];
  // The quill pen stands in the pot: feather up the right flank, nib dipped in ink.
  const PEN2 = [[23, 7, 'w'], [22, 8, 'w'], [23, 8, 'h'], [22, 9, 'w'], [23, 9, 'h'], [21, 10, 'w'], [22, 10, 'h'], [21, 11, 'w'], [22, 11, 'C'], [21, 12, 'C'], [21, 13, 'C'], [21, 14, 'C'], [21, 15, 'C']];
  // o: { eyes: open|shut|lids|happy|up, mouth: null|open|shut|grin, ruffle, line (scribbling), hop, ask, spark, z, tap }
  function make2(o = {}) {
    const g = canvas(W2, H2);
    coat(g, BODY2, [11, 12.6]);
    // Every spine is a pen: dark barrel, bright barrel, gold nib, pointing out along its own ray.
    PENS2.forEach(deg => {
      const dx = Math.cos(deg * Math.PI / 180), dy = Math.sin(deg * Math.PI / 180);
      let t = 0; while (BODY2(Math.floor(11 + dx * t), Math.floor(12.6 + dy * t))) t += 0.25;
      const seen = [];
      for (; seen.length < 4; t += 0.25) {
        const x = Math.floor(11 + dx * t), y = Math.floor(12.6 + dy * t), k = x + ',' + y;
        if (!seen.includes(k)) { seen.push(k); px(g, x, y, ['i', 'I', o.ruffle ? 'h' : 'I', 'g'][seen.length - 1]); }
      }
    });
    stamp(g, 5, 8, FACE2);
    stamp(g, 6, 5, SPECS2);
    const eyes = o.eyes || 'open';
    if (eyes === 'shut') stamp(g, 6, 10, ['cc......cc', 'ee......ee', 'cc......cc']);
    if (eyes === 'lids') stamp(g, 6, 10, ['cc......cc', 'cc......cc', 'ee......ee']);
    if (eyes === 'happy') { stamp(g, 6, 10, ['cc......cc', 'ee......ee', 'cc......cc']); px(g, 5, 12, 'e'); px(g, 16, 12, 'e'); }
    if (eyes === 'up') stamp(g, 6, 9, ['we......we', 'ee......ee', 'ee......ee', 'cc......cc']);
    if (o.mouth === 'open') stamp(g, 9, 14, ['eeee', '.pp.']);
    if (o.mouth === 'shut') stamp(g, 10, 14, ['ee']);
    if (o.mouth === 'grin') { stamp(g, 9, 14, ['eppe', '.ee.']); px(g, 4, 13, 'p'); px(g, 17, 13, 'p'); }
    PEN2.forEach(([x, y, c]) => px(g, x - (o.tap ? 1 : 0), y - (o.tap ? 1 : 0), c));
    stamp(g, 19, 16, POT2);
    stamp(g, 4, 16, SCROLL2);
    if (o.line) stamp(g, 7, 19, LINE2);
    stamp(g, 1, 15 + (o.tap ? 1 : 0), PAW); stamp(g, 17, 15, PAW);
    let out = rows(g);
    if (o.hop) out = [...out.slice(1), '.'.repeat(W2)];
    const h = out.map(r => [...r]);
    if (o.ask) { for (let y = 0; y < 5; y++) for (let x = 0; x < 4; x++) px(h, x, y, '.'); stamp(h, 0, 0, ASK); }
    if (o.spark) { stamp(h, 21, 1, SPARK); px(h, 0, 6, 'g'); px(h, 23, 5, 'w'); }
    if (o.z) { for (let y = o.z[1]; y < o.z[1] + 4; y++) for (let x = o.z[0]; x < o.z[0] + 3; x++) px(h, x, y, '.'); stamp(h, o.z[0], o.z[1], Z); }
    return rows(h);
  }
  const s2 = {
    idle: make2(),
    idle2: make2({ line: true }),
    blink: make2({ eyes: 'shut' }),
    talk: make2({ mouth: 'open' }),
    talk2: make2({ mouth: 'shut' }),
    happy: make2({ eyes: 'happy', mouth: 'grin' }),
    happy2: make2({ eyes: 'happy', mouth: 'grin', hop: true, spark: true }),
    think: make2({ eyes: 'up', ask: true }),
    fidget: make2({ ruffle: true, tap: true }),
    sleep: make2({ eyes: 'lids', z: [20, 2] }),
    sleep2: make2({ eyes: 'lids', z: [21, 0], ruffle: true }),
  };

  // ── III · Marginalis ──
  const W3 = 28, H3 = 22;
  const BODY3 = ell(14, 13.8, 9.4, 8);
  const FAN = [-160, -137, -113, -90, -67, -43, -20];
  // A fan of feather quills behind the body: outlined vanes, white on the lit side, ice-blue in shade, ink-dipped tips.
  function fan(g, o) {
    const id = Array.from({ length: H3 }, () => Array(W3).fill(-1)), col = Array.from({ length: H3 }, () => Array(W3).fill('.'));
    FAN.forEach((deg, i) => {
      const a = (deg + (o.ruffle ? (i % 2 ? 5 : -5) : 0)) * Math.PI / 180, ux = Math.cos(a), uy = Math.sin(a);
      const R = i % 2 ? 13.2 : 14.6;
      for (let y = 0; y < H3; y++) for (let x = 0; x < W3; x++) {
        const vx = x + 0.5 - 14, vy = y + 0.5 - 13.8;
        const along = vx * ux + vy * uy, perp = vx * -uy + vy * ux;
        const hw = Math.min(2.4, (along - 4) * 0.45, (R - along) * 0.8 + 0.5);
        if (along < 4 || along > R || Math.abs(perp) > hw) continue;
        id[y][x] = i;
        const shaft = perp > -0.55 && perp < 0.45;
        let c = shaft ? 'C' : perp < 0 ? (Math.abs(perp) > 1.6 ? 'w' : 'h') : 'B';
        if (along > R - 1.6) c = shaft ? 'i' : 'I';
        col[y][x] = c;
      }
    });
    for (let y = 0; y < H3; y++) for (let x = 0; x < W3; x++) {
      if (id[y][x] < 0) continue;
      const k = id[y][x], seam = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => { const n = (id[y + dy] || [])[x + dx]; return n !== undefined && n >= 0 && n !== k && n < k; });
      g[y][x] = seam && col[y][x] !== 'C' ? 'o' : col[y][x];
    }
  }
  const FACE3 = [
    '...cccccccc...',
    '.cccccccccccc.',
    'cccccccccccccc',
    'cccccccccccccc',
    'cccccccccccccc',
    'cpcccceeccccpc',
    '.cccccccccccC.',
    '..CCCccccCCC..',
  ];
  const LENS = ['.gg.', 'g..g', 'g..g', '.gg.'];
  // The ledger is open at a diff: plain history on the left, green and red lines on the right.
  const LEDGER = [
    '.oooooooooooooooo.',
    'ouiiuiiuoouvvvuuuo',
    'ouuuuuuuoouuuuuuUo',
    'ouiiiuiuoouxxxxuUo',
    'ouuuuuuuoouuuuuuUo',
    'RgRRRRRRrrRRRRRRgR',
    '.rrrrrrrrrrrrrrrr.',
  ];
  const PAW3 = ['.oo.', 'oppo', 'oIpo', '.oo.'];
  // o: { eyes, mouth, ruffle, hop, ask, spark, z, tap, read (a new margin note) }
  function make3(o = {}) {
    const g = canvas(W3, H3);
    fan(g, o);
    coat(g, BODY3, [14, 13.8]);
    stamp(g, 7, 8, FACE3);
    const eyes = o.eyes || 'open';
    const E = { open: ['we', 'ee', 'ee'], shut: ['cc', 'cc', 'ee'], lids: ['cc', 'cc', 'ee'], happy: ['cc', 'ee', 'cc'], up: ['we', 'ee', 'cc'] }[eyes];
    stamp(g, 9, eyes === 'up' ? 8 : 9, E.map(r => r + '......' + r));
    if (eyes === 'happy') { px(g, 8, 11, 'e'); px(g, 19, 11, 'e'); }
    // Half-moon reading spectacles perched on the nose; it reads over them.
    const sy = 12;
    stamp(g, 8, sy, ['g..g' + 'gggg' + 'g..g', '.gg.' + '....' + '.gg.']);
    if (o.mouth === 'open') stamp(g, 12, 14, ['eeee', '.pp.']);
    if (o.mouth === 'shut') stamp(g, 13, 14, ['ee']);
    if (o.mouth === 'grin') stamp(g, 12, 14, ['eppe', '.ee.']);
    const by = 15 - (o.hop ? 1 : 0);
    stamp(g, 5, by, LEDGER);
    if (o.read) stamp(g, 16, by + 3, ['vvvv']);
    stamp(g, 3, by + 1 + (o.tap ? 1 : 0), PAW3); stamp(g, 21, by + 1, PAW3);
    if (o.ask) { for (let y = 0; y < 5; y++) for (let x = 0; x < 4; x++) px(g, x, y, '.'); stamp(g, 0, 0, ASK); }
    if (o.spark) { stamp(g, 0, 0, SPARK); px(g, 26, 1, 'g'); px(g, 25, 9, 'w'); }
    if (o.z) { for (let y = o.z[1]; y < o.z[1] + 4; y++) for (let x = o.z[0]; x < o.z[0] + 3; x++) px(g, x, y, '.'); stamp(g, o.z[0], o.z[1], Z); }
    return rows(g);
  }
  const s3 = {
    idle: make3(),
    idle2: make3({ read: true }),
    blink: make3({ eyes: 'shut' }),
    talk: make3({ mouth: 'open' }),
    talk2: make3({ mouth: 'shut', read: true }),
    happy: make3({ eyes: 'happy', mouth: 'grin' }),
    happy2: make3({ eyes: 'happy', mouth: 'grin', hop: true, spark: true }),
    think: make3({ eyes: 'up', ask: true }),
    fidget: make3({ ruffle: true, tap: true }),
    sleep: make3({ eyes: 'lids', z: [24, 0] }),
    sleep2: make3({ eyes: 'lids', z: [25, 1], ruffle: true }),
  };
  const LOOP = [['idle', 6], ['idle2', 6], ['idle', 6], ['idle2', 6], ['blink', 2], ['idle', 6], ['fidget', 3], ['idle', 3],
    ['fidget', 3], ['idle', 6], ['idle2', 6], ['blink', 2], ['idle', 2], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 6]];

  PatchDex.evolve('quill', {
    habit: 'review',
    stages: [
      {
        name: 'Scribbet',
        species: 'pen-quilled scribe',
        blurb: 'Every spine on Scribbet is a pen, and every pen has been dipped. It keeps a scroll open and will not call a thing done until the why is written under it.',
        voice: 'one line for what. a paragraph for why.',
        evolve: 'The spines turned into pens and the pen found a pot: you started writing the reason down while the change was still fresh.',
        palette: { u: '#fff6e2', U: '#c9a874', P: '#c97462', G: '#a8742a' },
        sprites: s2,
        loop: LOOP,
      },
      {
        name: 'Marginalis',
        species: 'archivist hedgehog',
        blurb: 'It peers over half-moon spectacles at a ledger open to a diff, its fan of quills raised. Every line gets read, and every margin gets a note worth keeping.',
        voice: 'read the diff, not the description. then write in the margin.',
        evolve: 'The scroll became a bound ledger of diffs: you now review changes line by line and leave notes the next reader can use.',
        palette: { u: '#fff6e2', U: '#c9a874', G: '#a8742a', R: '#8a3340', r: '#521c27', v: '#5cc277', x: '#e5605a', B: '#7f93c4' },
        sprites: s3,
        loop: LOOP,
      },
    ],
  });
})();
