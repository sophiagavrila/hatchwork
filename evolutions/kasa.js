// Kasa evolutions — II Kasane (a patched old umbrella carrying a reading lantern),
// III Hyakkasa (a hundred-year parasol spirit, every rib hung with the tag of an old decision).
// Canopies are generated: ribs sit at sin(θ) around the dome so the panels foreshorten, and each
// panel is shaded by where it faces (lit from the top-left). Faces, patches and charms are stamped on.
(function () {
  const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
  const rows = g => g.map(r => r.join(''));
  const set = (g, x, y, c) => { if (g[y] && x >= 0 && x < g[y].length) g[y][x] = c; };
  const get = (g, x, y) => (g[y] && g[y][x]) || '.';
  // ' ' in a stamp means "leave what is underneath".
  const stamp = (g, art, x, y) => art.forEach((r, j) => [...r].forEach((c, i) => { if (c !== ' ') set(g, x + i, y + j, c); }));
  const shift = (src, dy) => src.map((_, y) => src[y - dy] || '.'.repeat(src[0].length));

  const RAMP = ['h', 'l', 'b', 'd', 'D'];
  const LIGHTER = { h: 'H', l: 'h', b: 'l', d: 'b', D: 'd' };
  // Paint the canopy dome. hws = half-width per row from the apex down; n = ribs around the whole dome.
  function canopy(g, { cx, top, hws, n, phase = 0, wave = false }) {
    const H = hws.length, last = hws[H - 1];
    const th = [];
    for (let k = 0; k < n; k++) {
      let a = phase + ((k + 0.5) * 2 * Math.PI) / n;
      a = ((a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
      if (Math.abs(a) < Math.PI / 2 - 0.05) th.push(a);
    }
    th.sort((a, b) => a - b);
    const bounds = [-Math.PI / 2, ...th, Math.PI / 2];
    const ribX = (a, i) => Math.round(cx + Math.sin(a) * hws[i]);
    for (let i = 0; i < H; i++) {
      const y = top + i, hw = hws[i], rx = th.map(a => ribX(a, i));
      for (let x = cx - hw; x <= cx + hw; x++) {
        const edge = Math.abs(x - cx) === hw || i === 0 || Math.abs(x - cx) > hws[i - 1];
        let c;
        if (edge) c = 'o';
        else if (rx.includes(x) && i >= 3) c = 'r';
        else {
          // Near the apex the ribs crowd together, so shade by side instead of by panel there.
          const p = rx.filter(v => v < x).length, mid = i < 3 ? Math.sign(x - cx) * 0.7 : (bounds[p] + bounds[p + 1]) / 2;
          let v = (mid + Math.PI / 2) / Math.PI;
          if (i > H * 0.55 && Math.abs(mid) > 1.0) v += 0.14;
          c = RAMP[Math.min(4, Math.floor(v * 5))];
          // Oil-paper pattern: faint wave arcs a shade lighter than the panel.
          if (wave && i > 4) {
            const wx = (x + 30 + (Math.floor((i - 5) / 3) % 2) * 3) % 6, wy = (i - 5) % 3;
            if ((wy === 0 && wx === 1) || (wy === 1 && (wx === 0 || wx === 2))) c = LIGHTER[c];
          }
        }
        set(g, x, y, c);
      }
    }
    // Underside: dark paper, outline at both ends and a notch where each rib tip ends.
    const y = top + H, tips = th.map(a => ribX(a, H - 1));
    for (let x = cx - last; x <= cx + last; x++) set(g, x, y, Math.abs(x - cx) >= last - 1 || tips.includes(x) ? 'o' : 'u');
    // Selective outline: the lit upper-left rim of the dome is drawn in rib red instead of near-black.
    for (let i = 4; i < H - 2; i++) { const x = cx - hws[i]; if (get(g, x + 1, top + i) === 'h') set(g, x, top + i, 'r'); }
    return tips;
  }

  // ── II · Kasane ──────────────────────────────────────────────────────────────
  const W2 = 25, H2 = 21, C2 = 12;
  const HW2 = [1, 2, 4, 6, 7, 8, 9, 10, 11, 11, 12, 12];
  const FURL2 = [1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6];
  const EYE2 = {
    // Half-lidded and patient: a heavy paper lid, a crease above it, the pupil low and steady.
    open: ['  rrr  ', ' ooooo ', 'oWWweeo', 'oWWeeeo', ' oWWWo ', '  ooo  '],
    blink: ['  rrr  ', '       ', ' ooooo ', '  ooo  ', '       ', '  ooo  '],
    happy: ['       ', '  ooo  ', ' o   o ', 'o     o', '       ', '  ooo  '],
    sleep: ['       ', '       ', '       ', 'oo   oo', '  ooo  ', '       '],
    up: ['  ooo  ', ' oWWWo ', 'oeewWWo', 'oeeWWWo', ' oWWWo ', '  ooo  '],
    wide: ['  ooo  ', ' oWWWo ', 'oWWweeo', 'oWWeeeo', ' oWWWo ', '  ooo  '],
  };
  const MOUTH2 = {
    tongue: ['otpo', ' tTo', ' TTo', ' To '],
    open: ['oeeo', 'otTo', ' oo ', '    '],
    wag: ['oeto', 'ottT', ' oTT', '  To'],
    grin: ['oeeeo', ' oTo ', '  o  ', '     '],
    shut: [' oo ', '    ', '    ', '    '],
  };
  // The reading lantern: paper chōchin with red bands, hung from the left rib on a cord.
  const LANTERN2 = { lit: ['qCq', 'RjR', 'jgy', 'RyR', 'qCq'], dim: ['qCq', 'RYR', 'YyY', 'RYR', 'qCq'] };
  const LEG2 = ['qBcq', 'qBcq', 'qcCq', 'qBcq'];
  const GETA2 = ['.qRRRRq.', 'qBBBccCq', '.qq..qq.'];

  function kasane({ eye = 'open', mouth = 'tongue', furl = false, phase = 0, swing = 0, lamp = 'lit', dy = 0, squash = 0, glint = false } = {}) {
    const g = grid(W2, H2);
    const hws = furl ? FURL2 : HW2, top = 1 + dy + squash;
    const tips = canopy(g, { cx: C2, top, hws, n: furl ? 8 : 10, phase });
    const edge = top + hws.length;
    // Paper repairs: a pale patch on the lit side, a newer tan one on the shadow side, stitched at the corners.
    if (!furl) {
      stamp(g, ['PPP ', 'PPPS', ' SSS'], 3, top + 8);
      stamp(g, ['aaa ', 'aaaS', ' SSS'], 18, top + 5);
      stamp(g, ['k'], 7, top + 8);
      stamp(g, ['k'], 17, top + 8);
    }
    // Bamboo handle and leg, then the geta.
    const legTop = edge + 1, legRows = LEG2.length - squash;
    for (let i = 0; i < legRows; i++) stamp(g, [LEG2[i]], C2 - 1, legTop + i);
    stamp(g, GETA2, C2 - 3, legTop + legRows);
    // Face.
    stamp(g, EYE2[eye], C2 - 3, top + 3);
    if (!furl) stamp(g, MOUTH2[mouth], C2 - 1, top + 9);
    // Lantern on its cord from the leftmost rib tip.
    const lx = furl ? C2 - 6 : tips[0], ly = edge + 1;
    set(g, lx + (swing > 0 ? 1 : 0), ly, 'q');
    stamp(g, LANTERN2[lamp], lx - 1 + swing, ly + 1);
    if (glint) [[C2 - 12, top + 10], [C2 + 12, top + 10], [C2 - 7, top + 3], [C2 + 7, top + 3]].forEach(([x, y]) => set(g, x, y - 1, 'g'));
    return rows(g);
  }
  const zzz = (src, k) => {
    const g = src.map(r => [...r]);
    const Z = [['zzz', '..z', '.z.', 'zzz'], ['zz', '.z', 'zz']][k];
    stamp(g, Z, k ? 21 : 19, k ? 1 : 0);
    return rows(g);
  };
  const dots = (src, pts) => { const g = src.map(r => [...r]); pts.forEach(([x, y]) => set(g, x, y, 'z')); return rows(g); };

  const II = {
    idle: kasane(),
    idle2: kasane({ squash: 1 }),
    blink: kasane({ eye: 'blink' }),
    talk: kasane({ eye: 'wide', mouth: 'open' }),
    talk2: kasane({ eye: 'wide', mouth: 'wag', swing: 1 }),
    happy: kasane({ eye: 'happy', mouth: 'grin', glint: true }),
    happy2: kasane({ eye: 'happy', mouth: 'grin', dy: -1 }),
    sleep: zzz(kasane({ eye: 'sleep', furl: true, lamp: 'dim' }), 0),
    sleep2: zzz(kasane({ eye: 'sleep', furl: true, lamp: 'dim', squash: 1 }), 1),
    think: dots(kasane({ eye: 'up', mouth: 'shut' }), [[19, 3], [21, 2], [23, 0]]),
    fidget: kasane({ phase: 0.3, swing: -1 }),
  };

  // ── III · Hyakkasa ───────────────────────────────────────────────────────────
  const W3 = 28, H3 = 22, C3 = 13;
  const HW3 = [1, 2, 4, 6, 8, 9, 10, 11, 12, 12, 13, 13, 13, 13];
  const FURL3 = [1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7];
  const EYE3 = {
    // Ancient and calm: a long white brow that droops past the eye, a low lid, one bright point of light.
    open: ['  sWWWs  ', ' sWWWWWs ', 'sW ooo Ws', 's oWweeos', '  oWWeeo ', '   oooo  '],
    blink: ['  sWWWs  ', ' sWWWWWs ', 'sW     Ws', 's       s', '  ooooo  ', '   ooo   '],
    happy: ['  sWWWs  ', ' sWWWWWs ', 'sW ooo Ws', 's o   o s', '  o   o  ', '         '],
    sleep: ['         ', '  sWWWs  ', ' sWWWWWs ', 'sW     Ws', 's oo oo s', '    o    '],
    up: [' sWWWWs  ', 's WWWWWs ', 'sW ooo Ws', 's oeewWos', '  oeeWWo ', '   oooo  '],
    wide: ['  sWWWs  ', ' sWWWWWs ', 'sWoooooWs', 's oWweeos', '  oWWeeo ', '   oooo  '],
  };
  const MOUTH3 = {
    tongue: [' oo ', 'otpo', ' tTo', ' TTo', ' To '],
    open: ['oeeo', 'otTo', ' oo ', '    ', '    '],
    wag: ['oeto', 'ottT', ' oTT', '  To', '    '],
    grin: ['oeeeo', ' oTo ', '  o  ', '     ', '     '],
    shut: ['    ', ' oo ', '    ', '    ', '    '],
  };
  const LANTERN3 = { lit: ['.qq.', 'qCCq', 'RjjR', 'jjgy', 'RgyR', 'yyyY', 'qCCq', '.R..'], dim: ['.qq.', 'qCCq', 'RYYR', 'YYyY', 'RyYR', 'YYYY', 'qCCq', '.R..'] };
  // Old tags of old decisions: a paper slip with a red note, a wooden tag, a red do-not-remove label, a brass bell.
  const TAGS3 = [['q.', 'BB', 'RB', 'cc'], ['q.', 'cc', 'cC', 'CC'], ['q.', 'RR', 'RW', 'RR'], ['q.', 'gg', 'gG']];
  const LEG3 = ['qBBcq', 'qBBcq', 'qcCCq', 'qBBcq', 'qBBcq'];
  const GETA3 = ['.qRRRRRq.', 'qBBBBccCq', '.qq...qq.'];

  function hyakkasa({ eye = 'open', mouth = 'tongue', furl = false, phase = 0, swing = 0, lamp = 'lit', squash = 0, glint = false, sway = 0 } = {}) {
    const g = grid(W3, H3);
    const hws = furl ? FURL3 : HW3, top = squash;
    const tips = canopy(g, { cx: C3, top, hws, n: furl ? 8 : 14, phase, wave: !furl });
    const edge = top + hws.length;
    // Gilt finial cap on the very old top knob, and brass ferrules where the ribs end.
    set(g, C3, top, 'g');
    if (!furl) tips.forEach(x => set(g, x, edge, 'G'));
    // Bamboo leg with two nodes and a paper repair wrap, standing on a big geta.
    const legTop = edge + 1, legRows = Math.min(LEG3.length, H3 - GETA3.length - legTop);
    for (let i = 0; i < legRows; i++) stamp(g, [LEG3[i]], C3 - 2, legTop + i);
    stamp(g, GETA3, C3 - 4, legTop + legRows);
    if (!furl) {
      stamp(g, ['PPP ', 'PPPS', ' SSS'], 3, top + 8);
      stamp(g, ['aaa ', 'aaaS', ' SSS'], 19, top + 9);
      stamp(g, ['k'], 7, top + 11);
      stamp(g, ['k'], 19, top + 11);
    }
    stamp(g, EYE3[eye], C3 - 4, top + 3);
    if (!furl) stamp(g, MOUTH3[mouth], C3, top + 9);
    // Charms swing from the outer rib tips; the lantern from the leftmost one.
    if (!furl) {
      const hang = [tips[1], tips[tips.length - 2], tips[tips.length - 1], tips[2]];
      hang.forEach((x, k) => {
        if (k === 3) return;
        const s = (k + sway) % 2 ? swing : 0, art = TAGS3[k], ox = x + art[0].length > W3 ? -1 : 0;
        art.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') set(g, x + ox + i + (j ? s : 0), edge + 1 + j, c); }));
      });
    }
    const lx = furl ? C3 - 7 : tips[0];
    stamp(g, LANTERN3[lamp], lx - 1 + swing, edge + 1);
    if (glint) [[1, top + 9], [26, top + 9], [5, top + 3], [21, top + 3], [C3, top]].forEach(([x, y]) => set(g, x, y - 1, 'g'));
    return rows(g);
  }
  const zzz3 = (src, k) => {
    const g = src.map(r => [...r]);
    stamp(g, [['zzz', '..z', '.z.', 'zzz'], ['zz', '.z', 'zz']][k], k ? 23 : 21, k ? 1 : 0);
    return rows(g);
  };

  const III = {
    idle: hyakkasa(),
    idle2: hyakkasa({ sway: 1, swing: 1 }),
    blink: hyakkasa({ eye: 'blink' }),
    talk: hyakkasa({ eye: 'wide', mouth: 'open' }),
    talk2: hyakkasa({ eye: 'wide', mouth: 'wag', swing: 1 }),
    happy: hyakkasa({ eye: 'happy', mouth: 'grin', glint: true }),
    happy2: hyakkasa({ eye: 'happy', mouth: 'grin', phase: 0.22, swing: -1 }),
    sleep: zzz3(hyakkasa({ eye: 'sleep', furl: true, lamp: 'dim' }), 0),
    sleep2: zzz3(hyakkasa({ eye: 'sleep', furl: true, lamp: 'dim' }), 1),
    think: dots(hyakkasa({ eye: 'up', mouth: 'shut' }), [[21, 3], [23, 2], [25, 0]]),
    fidget: hyakkasa({ phase: 0.22, swing: -1, sway: 1 }),
  };

  const PAL = {
    P: '#fbecc8', a: '#e9ad6c', S: '#7a3424', H: '#fff4cf',
    j: '#fff4c0', y: '#f6b545', Y: '#9c5a28', G: '#b88a2c',
  };

  PatchDex.evolve('kasa', {
    habit: 'research',
    stages: [
      {
        name: 'Kasane',
        species: 'patched lantern umbrella',
        blurb: 'Its paper has been torn and mended so many times the patches have patches. It carries a little lantern for reading in dark corners.',
        voice: 'hold the lantern up first. who wrote this, and why?',
        evolve: 'Its eye settles into a patient half-lid and a reading lantern appears on its rib: you started tracing old code before touching it.',
        palette: PAL,
        loop: [['idle', 20], ['blink', 2], ['idle', 12], ['idle2', 6], ['idle', 8], ['fidget', 4], ['idle', 10], ['talk2', 3], ['idle', 12], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 10]],
        sprites: II,
      },
      {
        name: 'Hyakkasa',
        species: 'hundred-year parasol spirit',
        blurb: 'A venerable oil-paper parasol whose every rib carries a tag: an old decision, kept and labelled, so nobody has to rediscover it the hard way.',
        voice: 'every odd line was someone\'s answer. find the question.',
        evolve: 'It grows a dozen ribs and hangs a tag on each, with a brighter lantern: you read the history before you rewrite, every time.',
        palette: PAL,
        loop: [['idle', 22], ['blink', 2], ['idle', 12], ['idle2', 8], ['idle', 10], ['fidget', 5], ['idle', 12], ['blink', 2], ['idle', 8], ['think', 12], ['idle', 10], ['talk2', 3], ['idle', 10]],
        sprites: III,
      },
    ],
  });
})();
