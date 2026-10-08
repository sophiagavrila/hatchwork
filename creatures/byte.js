// Byte — a little glitch ghost made of pixels. Coaches calibrating autonomy: when to let the agent run, when to hold the leash.
(function () {
  const W = 20, X0 = 2; // core ghost is 16 wide, drawn at x=2 so fringes and glitch tears have room.
  const CORE = [
    '.........m......',
    '........o.......',
    '......oooo......',
    '....oowwwwoo....',
    '...owwwwwwwwo...',
    '..owwwwwwwwwvo..',
    '.owwwwwwwwwwwvo.',
    '.owwcewwwwcewvo.',
    '.owweewwwweewvo.',
    '.owweewwwweewvo.',
    'owwpwwwwwwwwpvvo',
    'owwwwwweewwwwvvo',
    '.owwwwwwwwwwvvo.',
    '.ovwwwwwwwwvvuo.',
    '.ouvvvvvvvvvuuo.',
    'ouuuo.ouuo.ouuuo',
    '.ooo...oo...ooo.',
  ];
  const put = (rows, ...stamps) => {
    const g = rows.map(r => [...r]);
    stamps.forEach(([x, y, art]) => art.forEach((r, j) => [...r].forEach((c, i) => {
      if (c !== ' ' && g[y + j] && x + i >= 0 && x + i < g[y + j].length) g[y + j][x + i] = c;
    })));
    return g.map(r => r.join(''));
  };
  // Lay the 14-wide core into the 20x20 frame: 1 spare row on top, shadow on the last row.
  const frame = (core, { dy = 0, shadow = 'wide', fringe = true } = {}) => {
    const rows = Array.from({ length: 20 }, () => '.'.repeat(W));
    core.forEach((r, j) => { const y = 1 + j + dy; if (y >= 0 && y < 20) rows[y] = '..' + r + '..'; });
    if (fringe) rows.forEach((r, y) => {
      if (y < 7 + dy || y > 16 + dy || (y - dy) % 4 === 1) return; // sides only, with scanline gaps
      const a = [...r], L = a.findIndex(c => c !== '.'), R = a.length - 1 - [...a].reverse().findIndex(c => c !== '.');
      if (L > 0) a[L - 1] = 'c';
      if (R < a.length - 1) a[R + 1] = 'm';
      rows[y] = a.join('');
    });
    rows[19] = shadow === 'wide' ? '.....xxxxxxxxxx.....' : shadow === 'small' ? '......xxxxxxxx......' : '.'.repeat(W);
    return rows;
  };
  // Glitch tear: slide whole rows sideways.
  const tear = (rows, shifts) => rows.map((r, y) => {
    const d = shifts[y]; if (!d) return r;
    return d > 0 ? '.'.repeat(d) + r.slice(0, W - d) : r.slice(-d) + '.'.repeat(-d);
  });
  // Core-space face stamps. Eyes 2x3 at core x4 / x10, y7. Mouth at x6..9, y11. Cheeks x3 / x12, y10.
  const face = (core, { eyes = 'open', mouth = 'flat', cheeks = true } = {}) => {
    const E = {
      open: ['ce', 'ee', 'ee'],
      blink: ['ww', 'ww', 'ee'],
      up: ['ec', 'ee', 'ww'],
      side: ['cw', 'ew', 'ew'],
      happy: ['wew', 'ewe', 'www'],
      sleep: ['ww', 'ww', 'ee'],
    }[eyes];
    const hx = eyes === 'happy' ? [3, 9] : [4, 10];
    const M = {
      flat: ['weew', 'wwww'],
      open: ['weew', 'wmmw'],
      smile: ['ewwe', 'weew'],
      tiny: ['wwew', 'wwww'],
    };
    let g = put(core, [hx[0], 7, [...E]], [hx[1], 7, [...E]], [6, 11, M[mouth]]);
    if (!cheeks) g = put(g, [3, 10, ['w']], [12, 10, ['w']]);
    return g;
  };
  const hem2 = core => put(core, [0, 15, ['.ouuuo.ouuo.ouo', '..ooo...oo...o.']]);
  const antenna = (core, tip) => put(core, [9, 0, [tip]]);

  const idle = frame(face(CORE));
  const idle2 = frame(face(hem2(CORE)), { dy: -1, shadow: 'small' });
  const blink = frame(face(CORE, { eyes: 'blink' }));
  const talk = frame(face(CORE, { mouth: 'open' }));
  const talk2 = frame(antenna(face(CORE, { mouth: 'tiny' }), 'c'));
  const happy = frame(face(CORE, { eyes: 'happy', mouth: 'smile' }));
  const happy2 = put(frame(face(hem2(CORE), { eyes: 'happy', mouth: 'smile' }), { dy: -1, shadow: 'small' }),
    [1, 3, ['c']], [18, 5, ['m']], [0, 9, ['m']], [19, 11, ['c']]);
  const think = put(frame(antenna(face(CORE, { eyes: 'up', mouth: 'tiny' }), 'c')), [15, 1, ['c.c.c']]);
  const think2 = put(frame(face(CORE, { eyes: 'up', mouth: 'tiny' })), [15, 1, ['c.c..']]);
  const dimmed = core => core.map(r => r.replace(/w/g, 'v').replace(/[cm]/g, 'u'));
  const sleep = put(frame(dimmed(face(CORE, { eyes: 'sleep', mouth: 'tiny', cheeks: false })), { dy: 1, fringe: false, shadow: 'wide' }),
    [14, 0, ['ccccc', '...c.', '..c..', '.c...', 'ccccc']]);
  const sleep2 = put(frame(dimmed(face(hem2(CORE), { eyes: 'sleep', mouth: 'tiny', cheeks: false })), { dy: 1, fringe: false, shadow: 'wide' }),
    [16, 0, ['ccc', '..c', '.c.', 'ccc']], [14, 4, ['cc', '.c']]);
  const fidget = tear(frame(face(CORE, { eyes: 'side' })), { 5: 2, 6: 2, 11: -2, 12: -1 });
  const fidget2 = tear(frame(face(CORE)), { 8: -2, 9: -2, 14: 1 });

  PatchDex.register({
    id: 'byte', name: 'Byte', species: 'glitch ghost', rarity: 'rare',
    blurb: 'A friendly flicker of pixels that drifts between frames; curious, quick, and a little unstable at the edges.',
    coaching: 'Calibrating autonomy: let the agent run on well-scoped, reversible work; keep a hand on it for anything risky or vague.',
    voice: 'scoped and reversible? let it run. otherwise, hold the leash.',
    hatch: 'The egg dissolves into static, scanlines sweep, and Byte snaps into focus as its colors converge.',
    palette: {
      o: '#0b1440', w: '#f2fbff', v: '#bfe6f5', u: '#7fb8dc', e: '#101a52',
      c: '#22d3ee', m: '#ff3fb4', p: '#ff9ad5', x: '#1d2550',
    },
    sprites: { idle, idle2, blink, talk, talk2, happy, happy2, think, think2, sleep, sleep2, fidget, fidget2 },
    loop: [['idle', 6], ['idle2', 6], ['idle', 6], ['idle2', 6], ['blink', 2], ['idle', 6], ['idle2', 6],
      ['fidget', 1], ['idle', 2], ['fidget2', 1], ['idle', 4], ['idle2', 6], ['idle', 6], ['blink', 2], ['idle2', 6]],
    entrance(k) {
      const out = k.eggIntro(), F = (g, ms) => out.push(k.f(g, ms));
      let seed = 7; const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
      const NOISE = ['c', 'm', 'w', 'o', 'v'];
      // 1. The egg pixelates: its pixels corrupt into colored noise, then scatter.
      const corrupt = (p, scatter = 0) => {
        const src = k.egg(k.EGG_C2), g = k.blank();
        src.forEach((r, y) => r.forEach((c, x) => {
          if (c === '.') return;
          if (rnd() > p) { k.px(g, x, y, c); return; }
          if (scatter && rnd() < 0.35) return;
          const dx = scatter ? Math.round((rnd() - 0.5) * scatter * 2) : 0, dy = scatter ? Math.round((rnd() - 0.5) * scatter) : 0;
          k.px(g, x + dx, y + dy, NOISE[Math.floor(rnd() * NOISE.length)]);
        }));
        return g;
      };
      F(corrupt(0.15), 160); F(corrupt(0.4), 130); F(corrupt(0.75, 2), 110); F(corrupt(1, 5), 110);
      // 2. Static lines sweep down through a cloud of noise.
      const staticFrame = (lineY, density) => {
        const g = k.blank();
        for (let i = 0; i < density; i++) k.px(g, 5 + Math.floor(rnd() * 18), 2 + Math.floor(rnd() * 19), NOISE[Math.floor(rnd() * 3)]);
        [lineY, lineY + 1].forEach((y, j) => { for (let x = 0; x < k.W; x++) if (rnd() > 0.15) k.px(g, x, y, j ? 'v' : 'w'); });
        k.px(g, 0, lineY + 3, 'c'); k.px(g, k.W - 1, lineY - 2, 'm');
        return g;
      };
      F(staticFrame(3, 50), 90); F(staticFrame(8, 45), 90); F(staticFrame(13, 40), 90); F(staticFrame(18, 35), 90);
      // 3. Byte resolves out of the static as a chromatic split (cyan left, magenta right) that converges.
      const split = (d, gaps) => {
        const rows = (keep) => k.sprite('idle').map((r, y) => (keep(y) ? r : '.'.repeat(r.length)));
        const g = k.at(rows(y => y % 2 === 0), -d, 0, { fill: 'c' });
        k.over(g, rows(y => y % 2 === 1), d, 0, { fill: 'm' });
        return k.over(g, rows(y => !gaps || y % gaps !== 0), 0, 0);
      };
      F(split(4, 2), 120); F(split(3, 3), 110); F(split(2, 4), 110); F(split(1, 0), 110);
      const pop = k.at('idle');
      [[2, 4], [25, 6], [1, 15], [26, 17], [8, 1], [20, 0]].forEach(([x, y], i) => k.px(pop, x, y, i % 2 ? 'm' : 'c'));
      F(pop, 300);
      // 4. Settle: blink, a happy little bob, idle.
      F(k.at('blink'), 110);
      F(k.at('happy'), 280); F(k.at('happy2'), 170); F(k.at('happy'), 300);
      F(k.at('idle2'), 200);
      F(k.at('idle'), 450);
      return out;
    },
  });
})();
