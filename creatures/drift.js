// Drift — legendary jellyfish of light. Many tentacles, one mind: coaches orchestrating agents in parallel.
(function () {
  const W = 20, H = 20, CX = 9.5;
  const grid = () => Array.from({ length: H }, () => Array(W).fill('.'));
  const px = (g, x, y, c) => { if (x >= 0 && x < W && y >= 0 && y < H) g[y][x] = c; };
  const rowsOf = g => g.map(r => r.join(''));

  // Bell: dome from row `top` to rim row `rim`, half-width `R`. Aurora: mint crown -> teal band -> lilac face zone, scalloped violet rim.
  function bell(g, o = {}) {
    const top = o.top ?? 1, rim = o.rim ?? 10, R = o.R ?? 9, dim = !!o.dim, C = o.C ?? 3;
    // ellipse centred below the rim, so the bell flares gently out to its margin (dome, not ghost)
    const R2 = R / Math.sqrt(1 - (C / (rim + C - top + 0.6)) ** 2);
    const span = y => { const t = (rim + C - y) / (rim + C - top + 0.6); const hw = R2 * Math.sqrt(Math.max(0, 1 - t * t)); return [Math.round(CX - hw), Math.round(CX + hw) - 1]; };
    const inside = (x, y) => { if (y < top || y > rim) return false; const [a, b] = span(y); return x >= a && x <= b; };
    const H0 = rim - top;
    for (let y = top; y <= rim; y++) {
      const [a, b] = span(y);
      for (let x = a; x <= b; x++) {
        if (!inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1)) { px(g, x, y, 'o'); continue; }
        // concentric aurora bands that follow the dome: r=1 at the crown edge, smaller toward the face
        const dx = (x + 0.5 - CX) / R2, dy = (rim + C - y) / (rim + C - top + 0.6), r = Math.sqrt(dx * dx + dy * dy);
        let c = y === rim ? 'v' : r > 0.86 ? 'm' : r > 0.76 ? 't' : r > 0.66 ? 'l' : 'u';
        if (x + 0.5 - CX > R * 0.5 && y < rim) c = { m: 't', t: 'd', l: 'u', u: 'v' }[c];
        if (x + 0.5 - CX < -R * 0.15 && x + 0.5 - CX > -R * 0.6 && r > 0.9) c = 'n';
        if (dim) c = { m: 't', n: 'm', t: 'd', l: 'v', u: 'v', v: 'g', d: 'g' }[c] || c;
        px(g, x, y, c);
      }
    }
    // scalloped margin under the rim: little lobes with dark gaps
    const [a, b] = span(rim);
    for (let x = a; x <= b; x++) px(g, x, rim + 1, (x - a) % 3 === 1 ? 'o' : (x === a || x === b) ? 'o' : (dim ? 'g' : 'v'));
    for (let x = a + 1; x < b; x++) if ((x - a) % 3 !== 1) px(g, x, rim + 2, 'o');
    if (!dim) [[-5, 2], [-6, 3], [-6, 4]].forEach(([dx, dy]) => px(g, Math.round(CX + dx), top + dy, 'w'));
    return { top, rim, span, a, b };
  }
  function face(g, b, o = {}) {
    const y = b.rim - 5, eyes = o.eyes || 'open';
    const draw = (x, rows, dy = 0) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') px(g, x + i, y + j + dy, c); }));
    const E = { open: ['ew', 'ee', 'ee'], blink: ['..', '..', 'ee'], sleep: ['..', '..', 'ee'], up: ['ew', 'ee', '..'], side: ['ee', 'ew', 'ee'] }[eyes];
    if (eyes === 'happy') { draw(5, ['.e.', 'e.e'], 1); draw(12, ['.e.', 'e.e'], 1); }
    else { draw(6, E); draw(12, E); }
    if (o.blush !== false) [4, 5, 14, 15].forEach(x => px(g, x, y + 3, 'p'));
    const M = { idle: [[9, 'ee']], open: [[9, 'ee'], [9, 'pp', 1]], smile: [[8, 'e..e'], [9, 'ee', 1]], none: [], hmm: [[10, 'e']] }[o.mouth || 'idle'];
    M.forEach(([x, str, dy]) => [...str].forEach((c, i) => { if (c !== '.') px(g, x + i, y + 3 + (dy || 0), c); }));
  }
  // Tentacles: [baseX, length, phase, kind]. Thin outer threads + two ribbon oral arms that taper to a glowing tip.
  const TENTACLES = [[3, 5, 0.3, 't'], [7, 8, 1.9, 'arm'], [11, 7, 4.3, 'arm'], [16, 5, 5.4, 't']];
  function tentacles(g, b, o = {}) {
    const t = o.t || 0, amp = o.amp ?? 1, grow = o.grow ?? 1, only = o.only ?? 4, y0 = b.rim + 2;
    TENTACLES.slice(0, only).forEach(([x0, len, ph, kind], i) => {
      const L = Math.min(H - y0, Math.round(len * (Array.isArray(grow) ? grow[i] : grow)));
      for (let j = 0; j < L; j++) {
        const side = o.sym ? (x0 < CX ? -1 : 1) : 1, phase = o.sym ? 0 : ph;
        const x = x0 + Math.round(side * amp * 1.3 * Math.sin(j * 0.55 + phase + t) * Math.min(1, j / 2));
        const f = j / Math.max(1, len - 1), tip = j === L - 1 && j > 0;
        if (kind === 'arm') {
          // ribbon: a light core with a ruffle that flips side every other row
          // ribbon: two pixels wide near the bell, thinning to a single glowing thread
          px(g, x, y0 + j, tip ? 'p' : f < 0.4 ? 'm' : 'u');
          if (!tip && j < 4) px(g, x + 1, y0 + j, j < 2 ? 't' : 'v');
        } else px(g, x, y0 + j, tip ? 'p' : f < 0.5 ? 't' : 'u');
      }
    });
  }
  const Z = ['nnnnn', '...n.', '..n..', '.n...', 'nnnnn'];
  const Q = ['.nn.', 'n..n', '..n.', '....', '..n.'];
  const SPARK = [[0, -1], [-1, 0], [0, 0], [1, 0], [0, 1]];
  function drift(o = {}) {
    const g = grid(), dy = o.dy || 0, pulse = o.pulse || 0;
    // pulse > 0: the bell squeezes (narrower, taller crown); pulse < 0: it relaxes wide and low
    const b = bell(g, { top: 1 + dy - Math.max(0, pulse), rim: 10 + dy, R: 9 - pulse, dim: o.dim });
    tentacles(g, b, o);
    face(g, b, o);
    (o.glyphs || []).forEach(([rows, x, y]) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') px(g, x + i, y + j, c); })));
    (o.sparks || []).forEach(([x, y, c]) => SPARK.forEach(([sx, sy]) => px(g, x + sx, y + sy, sx || sy ? (c || 'n') : 'w')));
    (o.extra || []).forEach(([x, y, c]) => px(g, x, y, c));
    return rowsOf(g);
  }

  const sprites = {
    idle: drift(),
    idle2: drift({ pulse: 1, t: 1.2 }),
    blink: drift({ eyes: 'blink' }),
    talk: drift({ mouth: 'open', pulse: 1, t: 0.6 }),
    talk2: drift({ t: 0.3 }),
    happy: drift({ eyes: 'happy', mouth: 'smile', amp: 1.2, sparks: [[1, 2], [18, 3, 'm']] }),
    happy2: drift({ eyes: 'happy', mouth: 'smile', dy: -1, t: 1.4, amp: 1.2, sparks: [[2, 5, 'm'], [17, 1]] }),
    think: drift({ eyes: 'up', mouth: 'hmm', amp: 0.4, glyphs: [[Q, 16, 0]] }),
    think2: drift({ eyes: 'up', mouth: 'hmm', amp: 0.4, t: 0.8, glyphs: [[Q, 16, 0]] }),
    sleep: drift({ eyes: 'sleep', blush: false, dim: true, dy: 2, amp: 0.3, grow: 0.7, glyphs: [[Z, 15, 0]] }),
    sleep2: drift({ eyes: 'sleep', blush: false, dim: true, dy: 2, amp: 0.3, grow: 0.7, t: 1, pulse: 1, glyphs: [[Z, 14, 0]] }),
    fidget: drift({ eyes: 'side', sym: true, amp: 1.2, t: 0.6 }),
    fidget2: drift({ eyes: 'side', sym: true, amp: 0.8, t: 3.6, pulse: 1 }),
  };

  PatchDex.register({
    id: 'drift',
    name: 'Drift',
    species: 'aurora jellyfish',
    rarity: 'legendary',
    blurb: 'Unhurried and luminous; it moves many arms at once and never loses the thread.',
    coaching: 'Orchestrating agents in parallel: split work into independent lanes, then gather and verify the results.',
    voice: 'these three tasks do not touch. send them out together.',
    hatch: 'The egg floats up, turns to aurora glass, dissolves into falling light, and Drift unfurls one tentacle at a time.',
    palette: {
      o: '#241a4f', g: '#3b2f86', v: '#6a4bc4', u: '#9a7af0',
      d: '#1f8a95', t: '#2fc1b8', m: '#78f0cc', n: '#c8fff0',
      w: '#fdf8ff', l: '#c3adff', e: '#1c1446', p: '#ff9fd0',
    },
    sprites,
    loop: [['idle', 16], ['idle2', 4], ['idle', 16], ['blink', 2], ['idle', 8], ['idle2', 4], ['idle', 14], ['fidget', 4], ['fidget2', 4], ['fidget', 4], ['idle', 10], ['blink', 2], ['idle', 6]],
    entrance(k) {
      const out = k.eggIntro(), F = (g, ms, note) => out.push(k.f(g, ms, note ? { note } : {}));
      const EX = k.eggHome.x, EY = k.eggHome.y;
      const shadow = (g, w, c = 'g') => { for (let x = 14 - (w >> 1); x < 14 + (w >> 1); x++) k.px(g, x, 21, c); return g; };
      // 1. The cracked egg lifts off the ground; its shadow shrinks into a soft violet glow.
      F(shadow(k.egg(k.EGG_C2, 0, -1), 10), 120, 'lift');
      F(shadow(k.egg(k.EGG_C2, 0, -2), 8), 120);
      F(shadow(k.egg(k.EGG_C2, 0, -4), 6), 160);
      // 2. The shell turns to aurora glass in a bright sweep from the crown down.
      const GLASS = { 0: 'o', 1: 'u', 2: 'n', 3: 'v', 4: 'm', 5: 't', 6: 'p', 7: 'w' };
      const BANDS = ['n', 'm', 't', 'l', 'u', 'v', 'u', 'l', 'm'];
      // diagonal aurora bands; ph slides them through the glass
      const glass = (dy, ph, upto = 99) => {
        const g = k.egg(k.EGG_C2, 0, dy);
        k.EGG_C2.forEach((r, j) => [...r].forEach((c, i) => {
          if (c === '.' || j > upto) return;
          const ch = j === upto ? 'w' : c === '0' ? 'o' : c === '2' ? 'n' : ph == null ? GLASS[c] : BANDS[(j + (i >> 1) + 90 - ph) % 9];
          k.px(g, EX + i, EY + dy + j, ch);
        }));
        return shadow(g, 4);
      };
      F(glass(-4, null, 4), 130, 'glass');
      F(glass(-4, null, 9), 130);
      F(glass(-4, null), 140);
      // 3. Aurora bands ripple through the glass egg while it bobs.
      F(glass(-4, 0), 110, 'ripple'); F(glass(-5, 3), 110); F(glass(-5, 6), 110); F(glass(-4, 8), 110);
      // 4. A white-hot flash: the glass is all light.
      F(shadow(k.egg(k.EGG, 0, -4, { map: { 0: 'l', 1: 'w', 2: 'w', 3: 'n', 4: 'w', 5: 'n', 6: 'w', 7: 'w' } }), 6, 'u'), 150, 'flash');
      // 5. The shell bursts into motes that drift outward and fall; light pools into a growing bell.
      const SHELL = [];
      k.EGG.forEach((r, j) => [...r].forEach((c, i) => { if (c === '0' && (i + j) % 2 === 0) SHELL.push([i - 5.5, j - 6.5]); }));
      const MOTE = ['n', 'm', 'l', 'p', 'w'];
      const motes = (g, t) => SHELL.forEach(([x, y], n) => {
        if (t > 1 && n % 3 === 0) return;
        if (t > 2 && n % 3 === 1) return;
        const s = 1 + 0.45 * t;
        k.px(g, Math.round(14 + x * s), Math.round(EY - 4 + 6.5 + y * s + 0.5 * t * t), MOTE[(n + t) % 5]);
      });
      const bellOnly = (o, eyes) => { const g = grid(); const b = bell(g, o); if (eyes) face(g, b, { eyes, blush: o.blush }); return rowsOf(g); };
      const grow = [[{ top: 5, rim: 10, R: 5 }, 1], [{ top: 3, rim: 10, R: 7 }, 2], [{ top: 1, rim: 10, R: 9 }, 3]];
      grow.forEach(([o, t], i) => { const g = k.at(bellOnly(o, i === 2 ? 'sleep' : null), 0, 0); motes(g, t); F(g, i === 2 ? 160 : 120, i ? null : 'burst'); });
      // 6. Tentacles unfurl one at a time while the last motes fall like snow.
      const SNOW = [[3, 4], [24, 6], [6, 10], [22, 12], [2, 15], [25, 2]];
      const snow = (g, t) => { SNOW.forEach(([x, y], n) => { if (n + t < 9) k.px(g, x + (t % 2), y + t * 2, MOTE[n % 5]); }); return g; };
      [[0.5, 0, 0, 0], [1, 0.5, 0, 0], [1, 1, 0, 0.5], [1, 1, 0.5, 1], [1, 1, 1, 1]].forEach((gr, t) => {
        F(snow(k.at(drift({ eyes: 'sleep', grow: gr, amp: 0.6, t: t * 0.4 }), 0, 0), t), 100, t ? null : 'unfurl');
      });
      // 7. It wakes, takes a first breath, and glows with joy.
      F(k.at(drift({ eyes: 'blink' })), 160);
      F(k.at('idle'), 320, 'awake');
      F(k.at('idle2'), 150); F(k.at('idle'), 150);
      F(k.at('happy'), 220); F(k.at('happy2'), 420, 'joy');
      F(k.at('idle'), 300);
      return out;
    },
  });
})();
