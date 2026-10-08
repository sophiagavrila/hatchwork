// Drift evolutions — II Aurelle: a bigger bell whose arms carry lit lanterns, one per lane. III Armadrift: an aurora-crowned matriarch with two little drifts out on leashes.
(function () {
  // One renderer for both forms; F holds the form's size and layout.
  function make(F) {
    const { W, H, CX } = F;
    const grid = () => Array.from({ length: H }, () => Array(W).fill('.'));
    const px = (g, x, y, c) => { if (x >= 0 && x < W && y >= 0 && y < H) g[y][x] = c; };
    const stamp = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') px(g, x + i, y + j, c); }));

    // Bell: same aurora dome as the hatchling, scaled up.
    function bell(g, o = {}) {
      const top = o.top, rim = o.rim, R = o.R, dim = !!o.dim, C = 3;
      const R2 = R / Math.sqrt(1 - (C / (rim + C - top + 0.6)) ** 2);
      const span = y => { const t = (rim + C - y) / (rim + C - top + 0.6); const hw = R2 * Math.sqrt(Math.max(0, 1 - t * t)); return [Math.round(CX - hw), Math.round(CX + hw) - 1]; };
      const inside = (x, y) => { if (y < top || y > rim) return false; const [a, b] = span(y); return x >= a && x <= b; };
      for (let y = top; y <= rim; y++) {
        const [a, b] = span(y);
        for (let x = a; x <= b; x++) {
          if (!inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1)) { px(g, x, y, 'o'); continue; }
          const dx = (x + 0.5 - CX) / R2, dy = (rim + C - y) / (rim + C - top + 0.6), r = Math.sqrt(dx * dx + dy * dy);
          let c = y === rim ? 'v' : r > 0.87 ? 'm' : r > 0.78 ? 't' : r > 0.68 ? 'l' : 'u';
          if (x + 0.5 - CX > R * 0.5 && y < rim) c = { m: 't', t: 'd', l: 'u', u: 'v' }[c];
          if (x + 0.5 - CX < -R * 0.15 && x + 0.5 - CX > -R * 0.6 && r > 0.91) c = 'n';
          if (dim) c = { m: 't', n: 'm', t: 'd', l: 'v', u: 'v', v: 'g', d: 'g' }[c] || c;
          px(g, x, y, c);
        }
      }
      const [a, b] = span(rim);
      for (let x = a; x <= b; x++) px(g, x, rim + 1, (x - a) % 3 === 1 ? 'o' : (x === a || x === b) ? 'o' : (dim ? 'g' : 'v'));
      for (let x = a + 1; x < b; x++) if ((x - a) % 3 !== 1) px(g, x, rim + 2, 'o');
      // ocelli: little lights set in the margin, one per lobe
      if (F.ocelli) for (let x = a + 2; x < b - 1; x += 3) px(g, x, rim + 1, dim ? 'v' : 'n');
      if (!dim) F.shine.forEach(([dx, dy]) => px(g, Math.round(CX + dx), top + dy, 'w'));
      return { top, rim, a, b, inside };
    }
    // Aurora crown: short curtains of light rising off the top of the bell, like the northern lights over a hill.
    function crown(g, b, o = {}) {
      if (!F.crown || o.dim) return;
      const ph = Math.round((o.t || 0) * 2), HT = [1, 2, 3, 2, 1, 3, 2], COL = ['m', 'n', 'p', 'm', 'l', 'n', 't'];
      for (let x = 0; x < W; x++) {
        let ty = -1;
        for (let y = 0; y < H; y++) if (b.inside(x, y)) { ty = y; break; }
        if (ty < 0 || ty > b.top + 4 || (x + ph) % 2) continue;
        const k = ((x >> 1) + ph) % HT.length, h = Math.min(HT[k], ty - 1);
        for (let j = 0; j < h; j++) px(g, x, ty - 2 - j, j === 0 ? COL[k] : j === 1 ? (COL[k] === 'n' ? 'm' : 't') : 'd');
      }
    }
    function face(g, b, o = {}) {
      const y = b.rim - 5, eyes = o.eyes || 'open', [lx, rx] = F.eyes, mx = F.mouth;
      const E = { open: ['ew', 'ee', 'ee'], blink: ['..', '..', 'ee'], sleep: ['..', '..', 'ee'], up: ['ew', 'ee', '..'], side: ['ee', 'ew', 'ee'] }[eyes];
      if (eyes === 'happy') { stamp(g, lx - 1, y + 1, ['.e.', 'e.e']); stamp(g, rx, y + 1, ['.e.', 'e.e']); }
      else { stamp(g, lx, y, E); stamp(g, rx, y, E); }
      if (o.blush !== false) [lx - 2, lx - 1, rx + 2, rx + 3].forEach(x => px(g, x, y + 3, 'p'));
      const M = { idle: [[0, 'ee']], open: [[0, 'ee'], [0, 'pp', 1]], smile: [[-1, 'e..e'], [0, 'ee', 1]], none: [], hmm: [[1, 'e']] }[o.mouth || 'idle'];
      M.forEach(([dx, str, dy]) => stamp(g, mx + dx, y + 3 + (dy || 0), [str]));
    }
    // Tentacles: [baseX, length, phase, kind, lampColor]. 'lamp' threads end in a lantern of light.
    function tentacles(g, b, o = {}) {
      const t = o.t || 0, amp = o.amp ?? 1, grow = o.grow ?? 1, y0 = b.rim + 2;
      F.tentacles.forEach(([x0, len, ph, kind, lc], i) => {
        const L = Math.min(H - y0, Math.round(len * (Array.isArray(grow) ? grow[i] : grow)));
        let tx = x0, ty = y0;
        for (let j = 0; j < L; j++) {
          const side = o.sym ? (x0 < CX ? -1 : 1) : 1, phase = o.sym ? 0 : ph;
          const x = x0 + Math.round(side * amp * 1.3 * Math.sin(j * 0.55 + phase + t) * Math.min(1, j / 2));
          const f = j / Math.max(1, len - 1), tip = j === L - 1 && j > 0;
          tx = x; ty = y0 + j;
          if (kind === 'arm') {
            px(g, x, y0 + j, tip ? 'p' : f < 0.4 ? 'm' : 'u');
            if (!tip && j < 4) px(g, x + 1, y0 + j, j < 2 ? 't' : 'v');
          } else px(g, x, y0 + j, tip && kind !== 'lamp' ? 'p' : f < 0.5 ? 't' : 'u');
        }
        if (kind === 'lamp' && L >= len - 1) {
          const c = o.dim ? 'v' : lc, core = o.dim ? 'u' : 'w';
          [[0, -1], [-1, 0], [1, 0], [0, 1]].forEach(([dx, dy]) => px(g, tx + dx, ty - 1 + dy, c));
          px(g, tx, ty - 1, core);
        }
      });
    }
    // Little drifts on leashes (III): tiny bells with dot eyes, each held by a glowing tentacle from under the rim.
    function minis(g, b, o = {}) {
      (F.minis || []).forEach(([x, y, crownC, from], i) => {
        const bob = (o.bob || [0, 0])[i] || 0, my = y + bob + (o.dim ? 1 : 0), d = !!o.dim;
        const [fx, fy] = [from[0], b.rim + 1], tx = x + 3, ty = my;
        const n = Math.max(Math.abs(tx - fx), Math.abs(ty - fy));
        for (let k = 0; k < n; k++) {
          const u = k / n, bow = Math.round(Math.sin(u * Math.PI) * (fx < CX ? -1 : 1));
          px(g, Math.round(fx + (tx - fx) * u) + bow, Math.round(fy + (ty - fy) * u), d ? 'g' : k < 2 ? 't' : k % 2 ? 'n' : 'm');
        }
        const eyes = o.miniEyes || 'open', c = crownC, L = fx < CX;
        const rows = d
          ? ['..ooo..', '.otvvo.', 'ovvvvvo', 'oggggvo', '.v.g.v.', '.......']
          : ['..ooo..', `.ow${c}${c}o.`, 'oueueuo', 'ovvpvvo', L ? '.u.t.u.' : '.u.t.u.', L ? '.p...t.' : '.t...p.'];
        if (eyes === 'blink' || eyes === 'sleep') rows[2] = d ? 'ovvvvvo' : 'ouvuvuo';
        if (eyes === 'up') { rows[1] = `.oe${c}eo.`; rows[2] = 'ouuuuuo'; }
        if (eyes === 'side') rows[2] = L ? 'ouueueo' : 'oeueuuo';
        if (eyes === 'happy') { rows[1] = `.oe${c}eo.`; rows[2] = 'ouuuuuo'; }
        stamp(g, x, my, rows);
      });
    }
    const Z = ['nnnnn', '...n.', '..n..', '.n...', 'nnnnn'];
    const Q = ['.nn.', 'n..n', '..n.', '....', '..n.'];
    const SPARK = [[0, -1], [-1, 0], [0, 0], [1, 0], [0, 1]];
    function draw(o = {}) {
      const g = grid(), dy = o.dy || 0, pulse = o.pulse || 0;
      const b = bell(g, { top: F.top + dy - Math.max(0, pulse), rim: F.rim + dy, R: F.R - pulse, dim: o.dim });
      crown(g, b, o);
      minis(g, b, o);
      tentacles(g, b, o);
      face(g, b, o);
      (o.glyphs || []).forEach(([rows, x, y]) => stamp(g, x, y, rows));
      (o.sparks || []).forEach(([x, y, c]) => SPARK.forEach(([sx, sy]) => px(g, x + sx, y + sy, sx || sy ? (c || 'n') : 'w')));
      return g.map(r => r.join(''));
    }
    return { draw, Z, Q };
  }

  function sprites(F, S) {
    const { draw, Z, Q } = make(F), [zx, qx] = S.glyphX;
    return {
      idle: draw({ ...S.base }),
      idle2: draw({ ...S.base, pulse: 1, t: 1.2, bob: [1, 0] }),
      blink: draw({ ...S.base, eyes: 'blink', miniEyes: 'blink' }),
      talk: draw({ ...S.base, mouth: 'open', pulse: 1, t: 0.6, bob: [0, 1] }),
      talk2: draw({ ...S.base, t: 0.3 }),
      happy: draw({ ...S.base, eyes: 'happy', mouth: 'smile', amp: 1.2, miniEyes: 'happy', bob: [-1, -1], sparks: S.sparks[0] }),
      happy2: draw({ ...S.base, eyes: 'happy', mouth: 'smile', dy: -1, t: 1.4, amp: 1.2, miniEyes: 'happy', bob: [-2, -1], sparks: S.sparks[1] }),
      think: draw({ ...S.base, eyes: 'up', mouth: 'hmm', amp: 0.4, miniEyes: 'up', glyphs: [[Q, qx, 0]] }),
      think2: draw({ ...S.base, eyes: 'up', mouth: 'hmm', amp: 0.4, t: 0.8, miniEyes: 'up', glyphs: [[Q, qx, 0]] }),
      sleep: draw({ ...S.base, eyes: 'sleep', blush: false, dim: true, dy: 2, amp: 0.3, grow: 0.7, miniEyes: 'sleep', glyphs: [[Z, zx, 0]] }),
      sleep2: draw({ ...S.base, eyes: 'sleep', blush: false, dim: true, dy: 2, amp: 0.3, grow: 0.7, t: 1, pulse: 1, miniEyes: 'sleep', glyphs: [[Z, zx - 1, 0]] }),
      fidget: draw({ ...S.base, eyes: 'side', sym: true, amp: 1.2, t: 0.6, miniEyes: 'side', bob: [1, -1] }),
      fidget2: draw({ ...S.base, eyes: 'side', sym: true, amp: 0.8, t: 3.6, pulse: 1, miniEyes: 'side', bob: [-1, 1] }),
    };
  }

  // II: 24×21. Six tentacles; the outer arms each carry a lantern (one lane apiece).
  const AURELLE = {
    W: 24, H: 21, CX: 11.5, top: 1, rim: 11, R: 10, ocelli: true,
    shine: [[-6, 2], [-7, 3], [-7, 4]], eyes: [7, 15], mouth: 11,
    tentacles: [[3, 6, 0.3, 'lamp', 'm'], [6, 5, 1.2, 't'], [9, 8, 1.9, 'arm'], [14, 8, 4.3, 'arm'], [17, 5, 3.0, 't'], [20, 6, 5.4, 'lamp', 'p']],
  };
  // III: 28×22. Aurora crown above, long central arms, and two little drifts out on leashes.
  const ARMADRIFT = {
    W: 28, H: 22, CX: 13.5, top: 3, rim: 12, R: 11, ocelli: true, crown: true,
    shine: [[-7, 2], [-8, 3], [-8, 4]], eyes: [9, 16], mouth: 13,
    tentacles: [[10, 6, 0.3, 't'], [12, 9, 1.9, 'arm'], [15, 9, 4.3, 'arm'], [17, 6, 5.4, 't']],
    minis: [[0, 16, 'm', [8]], [21, 16, 'p', [19]]],
  };

  PatchDex.evolve('drift', {
    habit: 'autonomy',
    stages: [
      {
        name: 'Aurelle',
        species: 'lantern-bearing jellyfish',
        blurb: 'It hangs a lantern on every arm it sends out, so it can always see which lane is still working.',
        voice: 'give each lane a lantern: a check that tells you when it drifts.',
        evolve: 'Its arms learned to carry lights: you stopped babysitting parallel work and started giving each lane a way to report back.',
        palette: {},
        sprites: sprites(AURELLE, { base: {}, glyphX: [18, 19], sparks: [[[1, 2], [22, 3, 'm']], [[2, 5, 'm'], [21, 1]]] }),
      },
      {
        name: 'Armadrift',
        species: 'aurora fleet matriarch',
        blurb: 'Two little drifts ride out on its leashes and come home with answers; it knows exactly how much line to give each one.',
        voice: 'long leash for the safe work, short leash for anything that ships.',
        evolve: 'Its lanterns hatched into little drifts of their own: you learned how much autonomy each task can carry, and when to reel it in.',
        palette: {},
        sprites: sprites(ARMADRIFT, { base: {}, glyphX: [22, 23], sparks: [[[2, 4], [25, 5, 'm']], [[3, 7, 'm'], [24, 2]]] }),
      },
    ],
  });
})();
