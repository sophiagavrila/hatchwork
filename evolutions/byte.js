// Byte evolutions — II Scanwisp (ghost terminal sprite with a cursor wand), III Daemonarch (sysop specter running subagents).
(function () {
  const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
  const rows = g => g.map(r => r.join(''));
  const put = (src, ...stamps) => {
    const g = src.map(r => [...r]);
    stamps.forEach(([x, y, art]) => art.forEach((r, j) => [...r].forEach((c, i) => {
      if (c !== ' ' && g[y + j] && x + i >= 0 && x + i < g[y + j].length) g[y + j][x + i] = c;
    })));
    return g.map(r => r.join(''));
  };
  // Fill a span mask, outline it, and shade it lit from the top-left: w (lit) → v (mid) → u (shadow).
  const ghost = (w, h, spans, mat = { hi: 'w', mid: 'v', lo: 'u', ol: 'o' }) => {
    const g = grid(w, h), on = (x, y) => spans[y] && x >= spans[y][0] && x <= spans[y][1];
    for (let y = 0; y < h; y++) {
      if (!spans[y]) continue;
      const [x0, x1] = spans[y];
      for (let x = x0; x <= x1; x++) {
        if (!on(x - 1, y) || !on(x + 1, y) || !on(x, y - 1) || !on(x, y + 1)) { g[y][x] = mat.ol; continue; }
        let yb = y; while (on(x, yb + 1) && on(x, yb + 2)) yb++;
        const dR = x1 - x, dL = x - x0, dB = yb - y;
        let lv = 0;
        if (dR === 1 || (dR === 2 && dB <= 4)) lv = 1;
        if (dB === 0) lv = Math.max(lv, 1);
        if ((dB === 0 && (dR <= 3 || dL <= 2)) || (dR === 1 && dB <= 2)) lv = 2;
        g[y][x] = [mat.hi, mat.mid, mat.lo][lv];
      }
    }
    return rows(g);
  };
  // Chromatic fringe: cyan just left of the silhouette, magenta just right, on the given rows.
  const fringe = (src, ys) => src.map((r, y) => {
    if (!ys.includes(y)) return r;
    const a = [...r], L = a.findIndex(c => c !== '.'), R = a.length - 1 - [...a].reverse().findIndex(c => c !== '.');
    if (L > 0) a[L - 1] = 'c';
    if (R >= 0 && R < a.length - 1) a[R + 1] = 'm';
    return a.join('');
  });
  const shift = (src, dy) => {
    const W = src[0].length, b = '.'.repeat(W);
    return src.map((_, y) => src[y - dy] || b);
  };
  const dim = src => src.map(r => r.replace(/w/g, 'v').replace(/[cm]/g, 'u'));
  const EYES = {
    open: ['ce', 'ee', 'ee'], blink: ['..', '..', 'ee'], up: ['ec', 'ee', '..'], side: ['c.', 'e.', 'e.'],
    happy: ['.e.', 'e.e', '...'], sleep: ['..', '..', 'ee'], wide: ['ce', 'ee', 'ee'],
  };
  // Face stamp: eyes 2x3 at (lx, ey) and (rx, ey); '.' in an eye means "body color" so we fill from the source.
  const face = (src, { lx, rx, ey, mx, my, cx }, { eyes = 'open', mouth = 'flat', cheeks = true } = {}) => {
    let g = src.map(r => [...r]);
    const E = EYES[eyes], ox = eyes === 'happy' ? -1 : 0;
    [lx, rx].forEach(x => E.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') g[ey + j][x + ox + i] = c; })));
    const M = { flat: ['ee'], open: ['ee', 'mm'], smile: ['e..e', '.ee.'], tiny: ['.e'], o: ['e'] }[mouth];
    const mw = M[0].length;
    M.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') g[my + j][mx - Math.floor((mw - 1) / 2) + i] = c; }));
    if (cheeks) { g[ey + 3][cx[0]] = 'p'; g[ey + 3][cx[1]] = 'p'; }
    return g.map(r => r.join(''));
  };

  const tear = (src, shifts) => src.map((r, y) => {
    const d = shifts[y]; if (!d) return r;
    return d > 0 ? '.'.repeat(d) + r.slice(0, r.length - d) : r.slice(-d) + '.'.repeat(-d);
  });
  const gap = (src, ys) => src.map((r, y) => (ys.includes(y) ? '.'.repeat(r.length) : r));
  // Tips each scanline slice with the chromatic split: cyan on the left end, magenta on the right.
  const tips = (src, ys) => src.map((r, y) => {
    if (!ys.includes(y)) return r;
    const a = [...r], L = a.findIndex(c => c !== '.'), R = a.length - 1 - [...a].reverse().findIndex(c => c !== '.');
    if (L < 0) return r;
    a[L] = 'c'; a[R] = 'm';
    return a.join('');
  });

  // ── II · Scanwisp ─────────────────────────────────────────────────────────────
  // Taller dome than Byte; the lower body slices into scanlines that trail off to the right.
  const W2 = 24, H2 = 21;
  const SP2 = { 2: [11, 16], 3: [9, 18], 4: [8, 19], 5: [7, 20], 6: [6, 21] };
  for (let y = 7; y <= 13; y++) SP2[y] = [5, 22];
  SP2[14] = [5, 22]; SP2[15] = [5, 22];
  // Byte's three-lobed hem, then scanline slices trailing off to the right (t nudges them for the drift frame).
  const slice2 = (src, t = 0) => put(src, [6 + t, 17, ['cwwwvvvvvvvvvvuum']], [10 + 2 * t, 19, ['cvvvvvvvuum']]);
  const BODY2 = put(ghost(W2, H2, SP2), [14, 1, ['o']], [15, 0, ['m']],
    [5, 15, ['ouuuuo.ouuuo.ouuuo']],
    [5, 16, ['.oooo...ooo...ooo.']]);
  const F2 = { lx: 9, rx: 17, ey: 8, mx: 13, my: 12, cx: [8, 19] };
  // Cursor wand: a blinking block cursor on a magenta stick, gripped by a little ghost hand.
  const WAND = on => [
    'oooo.',
    on ? 'owco.' : 'ouvo.',
    on ? 'occo.' : 'ovvo.',
    on ? 'occo.' : 'ovvo.',
    'oooo.',
    '.m...',
    '.m...',
    'oooo.',
    'owwww',
    'owvvo',
    'oooo.',
    '.m...',
  ];
  const wand2 = (src, on = true, dy = 0) => put(src, [0, 3 + dy, WAND(on)]);
  const shadow2 = (src, w = 8) => src;
  const fr2 = src => fringe(src, [7, 9, 10, 12]);
  const make2 = (o = {}, { on = true, t = 0, dy = 0, sh = 8 } = {}) =>
    shadow2(shift(wand2(fr2(slice2(face(BODY2, F2, o), t)), on), dy), sh);
  const s2 = {};
  s2.idle = make2();
  s2.idle2 = make2({}, { dy: -1, t: 1, sh: 6 });
  s2.blink = make2({ eyes: 'blink' });
  s2.talk = make2({ mouth: 'open' });
  s2.talk2 = make2({ mouth: 'flat' }, { on: false });
  s2.happy = put(make2({ eyes: 'happy', mouth: 'smile' }), [0, 1, ['c']], [5, 0, ['m']]);
  s2.happy2 = put(make2({ eyes: 'happy', mouth: 'smile' }, { dy: -1, t: 1, sh: 6 }), [0, 0, ['m']], [5, 1, ['c']], [23, 4, ['c']]);
  s2.think = put(make2({ eyes: 'up', mouth: 'tiny' }), [18, 0, ['c.c.c']]);
  s2.think2 = put(make2({ eyes: 'up', mouth: 'tiny' }, { on: false }), [18, 0, ['c.c..']]);
  const sleepy2 = o => shadow2(wand2(dim(slice2(face(BODY2, F2, { eyes: 'sleep', mouth: 'o', cheeks: false }), 0)), false), 10);
  s2.sleep = put(sleepy2(), [19, 0, ['cccc', '..c.', '.c..', 'cccc']]);
  s2.sleep2 = put(sleepy2(), [21, 0, ['ccc', '.c.', 'ccc']], [18, 4, ['cc', 'cc']]);
  s2.fidget = tear(make2({ eyes: 'side' }), { 6: 1, 7: 1, 10: -1, 11: -1 });

  // ── III · Daemonarch ──────────────────────────────────────────────────────────
  const W3 = 28, H3 = 22;
  const SP3 = { 2: [12, 15], 3: [10, 17], 4: [9, 18], 5: [8, 19], 6: [8, 19], 7: [7, 20] };
  for (let y = 8; y <= 12; y++) SP3[y] = [7, 20];
  const HEAD3 = put(ghost(W3, H3, SP3), [14, 1, ['o']], [15, 0, ['m']], [10, 4, ['w']], [9, 5, ['ww']]);
  // Robe: navy, open in a glowing V at the collar, lit from the left, hem dissolving into scanlines.
  const ROBE = [
    [7, 11, ['ohRRhwwwwwwhro']],
    [6, 12, ['ohRRRRhwwwwhrrqo']],
    [5, 13, ['ohRRRRRRhwwhrrqqo']],
    [5, 14, ['ohRRRRRRRmmrrrqqo']],
    [5, 15, ['ohRRRRRRRhcrrrqqo']],
    [4, 16, ['ohRRRRRRRRcrrrrqqqo']],
    [4, 17, ['ohRRRRRRRRcrrrrrqqo']],
    [4, 18, ['oqqqqqqqqqqqqqqqqqo']],
    [4, 19, ['ccccccc.ccccccccccc']],
    [6, 20, ['vvvvv.vvvvvvvv.vv']],
    [9, 21, ['uuu.uuuuu.uu']],
  ];
  // Left arm grips the staff low; right arm is raised, open-handed, under its terminals.
  const ARM_L = [0, 12, [
    '...oooo',
    '.oohRRR',
    'owwhRRR',
    'owvhRqq',
    '.oooooo',
  ]];
  const ARM_R = [19, 8, [
    '....ooo.',
    '...owwwo',
    '...owvwo',
    '..ohhhoo',
    '.oRRro..',
    'orrqo...',
  ]];
  const STAFF = on => [
    'oooo',
    on ? 'owco' : 'ouvo',
    on ? 'occo' : 'ovvo',
    on ? 'occo' : 'ovvo',
    'oooo',
    '.m..', '.m..', '.m..', '.m..', '.m..', '.m..', '.m..', '.m..', '.m..', '.m..',
  ];
  // Terminal windows (the subagents it keeps running): title bar with a close dot, 4x2 screen.
  const SCR = {
    face: ['ckkc', 'kcck'], blink: ['kkkk', 'kcck'], text: ['hhhk', 'hhkk'], text2: ['hkhh', 'hhhk'],
    dots: ['kkkk', 'hkhk'], ok: ['kkkh', 'hkhk'], off: ['kkkk', 'kkkk'], happy: ['ckkc', 'kcck'],
  };
  const win = (bar, scr) => ['o' + (bar === 'c' ? 'cccm' : 'mmmc') + 'o', 'o' + SCR[scr][0] + 'o', 'o' + SCR[scr][1] + 'o', 'oooooo'];
  const F3 = { lx: 10, rx: 16, ey: 7, mx: 13, my: 10, cx: [9, 18] };
  const LAYOUT = [[2, 1, 'c'], [20, 0, 'm'], [22, 5, 'c']];
  const make3 = (o = {}, { scr = ['face', 'text', 'blink'], on = true, wdy = [0, 0, 0], dy = 0 } = {}) => {
    let g = fringe(face(HEAD3, F3, o), [6, 8, 9]);
    g = put(g, ...ROBE.slice(0, 8), ARM_L, ARM_R);
    g = put(g, [0, 6, STAFF(on)], ARM_L);
    g = shift(g, dy);
    g = put(g, ...ROBE.slice(8));
    LAYOUT.forEach(([x, y, bar], i) => { g = put(g, [x, y + wdy[i] + (i === 2 ? 0 : 0), win(bar, scr[i])]); });
    return g;
  };
  const s3 = {};
  s3.idle = make3();
  s3.idle2 = make3({}, { wdy: [1, 0, 1], dy: -1, scr: ['face', 'text2', 'face'] });
  s3.blink = make3({ eyes: 'blink' }, { scr: ['blink', 'text', 'face'] });
  s3.talk = make3({ mouth: 'open' }, { scr: ['face', 'text2', 'text'] });
  s3.talk2 = make3({ mouth: 'flat' }, { scr: ['text', 'text', 'text2'], on: false });
  s3.happy = make3({ eyes: 'happy', mouth: 'smile' }, { scr: ['happy', 'ok', 'happy'] });
  s3.happy2 = make3({ eyes: 'happy', mouth: 'smile' }, { scr: ['ok', 'happy', 'ok'], wdy: [-1, 1, -1], dy: -1 });
  s3.think = make3({ eyes: 'up', mouth: 'tiny' }, { scr: ['dots', 'dots', 'dots'] });
  s3.think2 = make3({ eyes: 'up', mouth: 'tiny' }, { scr: ['dots', 'text', 'dots'], on: false });
  s3.sleep = put(dim(make3({ eyes: 'sleep', mouth: 'o', cheeks: false }, { scr: ['off', 'off', 'off'], on: false })), [9, 0, ['ccc', '.c.', 'ccc']]);
  s3.sleep2 = put(dim(make3({ eyes: 'sleep', mouth: 'o', cheeks: false }, { scr: ['off', 'off', 'face'], on: false })), [8, 0, ['cccc', '..c.', '.c..', 'cccc']]);
  s3.fidget = make3({ eyes: 'side' }, { scr: ['text2', 'face', 'text'], wdy: [0, 1, -1] });

  PatchDex.evolve('byte', {
    habit: 'autonomy',
    stages: [
      {
        name: 'Scanwisp',
        species: 'terminal wisp',
        blurb: 'Byte stopped flickering and started pointing. It trails scanlines wherever it drifts and taps tasks into motion with a blinking cursor wand.',
        voice: 'small, reversible, verifiable? hand it off and watch it run.',
        evolve: 'The glitch steadied into a wand: you stopped hovering over every step and started choosing which ones to delegate.',
        palette: { h: '#a5f3fc' },
        sprites: s2,
        loop: [['idle', 6], ['idle2', 6], ['idle', 6], ['idle2', 6], ['blink', 2], ['idle', 6], ['idle2', 6],
          ['fidget', 1], ['idle', 4], ['talk2', 2], ['idle', 6], ['idle2', 6], ['blink', 2]],
      },
      {
        name: 'Daemonarch',
        species: 'sysop specter',
        blurb: 'Robed in CRT glow, it keeps a ring of terminals orbiting and a light hand on every leash. Nothing it launches runs unwatched, and nothing it watches gets micromanaged.',
        voice: 'fan it out to subagents. keep the leash, not the keyboard.',
        evolve: 'One wand became a staff and a court of running terminals: you now run parallel agents with clear scopes and check in only where it counts.',
        palette: { R: '#4f74dc', r: '#3453ad', q: '#253a85', k: '#071030', h: '#a5f3fc' },
        sprites: s3,
        loop: [['idle', 6], ['idle2', 6], ['idle', 6], ['idle2', 6], ['blink', 2], ['idle', 6], ['idle2', 6],
          ['fidget', 3], ['idle', 4], ['talk2', 2], ['idle', 6], ['idle2', 6], ['blink', 2]],
      },
    ],
  });
})();
