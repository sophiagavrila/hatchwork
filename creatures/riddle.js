// Riddle — kitten sphinx. Sand fur, lapis-and-gold striped headcloth, beaded collar, and a tail that curls into a question mark.
(function () {
  const idle = [
    '...o.........o........',
    '..obo.......obo..ooo..',
    '..olpo.....opdo.olllo.',
    '..olppoooooppdo.oDoobo',
    '..ocaaaaaaaaaAo..o.obo',
    '.ohgggggggggggGo..obo.',
    '.oalbbbbbbbbbdAo.obo..',
    '.oglbwebbbwebdGo.obo..',
    '.oalbeebbbeebdAo.obo..',
    'ogglbpbbnbbpbdGGoobloo',
    'oaalbbbbmbbbbdAAolbbdo',
    'oggodbbmbmbddoGGobbbdo',
    'oaaoohgggggGooAAobbbdo',
    '.oooooaAaAaoooooobbbdo',
    'ollbbdodDdollbbdodbbdo',
    'obdbdbDdDobdbdbodddDDo',
    '.oooooooooooooooooooo.',
  ];
  const W = idle[0].length;
  // mod(base, {row: 'text'}) replaces the left part of a row; put() stamps a patch at x, y; sink() drops everything above `row` by 1px.
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== ' ' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const sink = (base, row) => ['.'.repeat(W), ...base.slice(0, row), ...base.slice(row + 1)];
  const recolor = (base, from, to, x0 = 0, x1 = W) => base.map(r => [...r].map((c, x) => (x >= x0 && x < x1 && from.includes(c) ? to[from.indexOf(c)] : c)).join(''));
  // Eyes are 2×2 at x5-6 and x10-11, rows 7-8. Mouth is a little ω under the nose (row 9-11).
  const eyes = (a, b) => (g => put(put(g, 5, 7, a), 10, 7, b));
  const shut = rows => put(put(rows, 4, 7, ['bbb', 'eee']), 10, 7, ['bbb', 'eee']);
  const smile = rows => put(rows, 4, 7, ['beb', 'ebe']).map((r, j) => (j === 7 || j === 8 ? r.slice(0, 10) + (j === 7 ? 'beb' : 'ebe') + r.slice(13) : r));
  const mouthOpen = rows => put(rows, 7, 10, ['mmm', 'mpm']);
  const mouthSmall = rows => put(rows, 7, 10, ['bmb', 'mpm']);

  const blink = shut(idle);
  const idle2 = sink(idle, 13);
  const talk = mouthOpen(idle);
  const talk2 = mouthSmall(idle);
  const happy = put(mouthOpen(smile(idle)), 7, 10, ['mmm', 'bpb']);
  const happy2 = put(sink(happy, 13), 17, 1, ['.ooo.', 'olllo', 'oDoobo']);
  // Wink: left eye shut in a happy arc, right eye open.
  const wink = put(put(idle, 4, 7, ['beb', 'ebe']), 7, 10, ['bmm', 'mpm']);
  const sleepBase = put(sink(put(put(idle, 4, 7, ['bbb', 'bbb']), 10, 7, ['bbb', 'bbb']), 13), 4, 9, ['eeb', '...']);
  const sleepEyes = rows => put(put(rows, 4, 9, ['eeb']), 10, 9, ['bee']);
  const Z = ['zzz', '..z', '.z.', 'zzz'];
  const sleep = put(sleepEyes(sleepBase), 6, 0, Z);
  const sleep2 = put(sleepEyes(sleepBase), 8, 0, Z);
  // Think: eyes roll up, mouth goes flat, and the question-mark tail lights up like a glyph.
  const think = recolor(put(put(put(idle, 5, 7, ['ww', 'ee']), 10, 7, ['ww', 'ee']).map((r, j) => (j === 7 ? r.slice(0, 5) + 'ew' + r.slice(7, 10) + 'ew' + r.slice(12) : r)), 7, 10, ['bmm', 'bbb']),
    'lbDd', 'qqQQ', 16, 22).map((r, j) => (j > 8 ? r.slice(0, 16) + idle[j].slice(16) : r));
  // Fidget: left ear flicks down, tail tip flicks.
  const fidget = put(put(idle, 1, 0, ['....', '.oo.', 'olpo', 'olpp']), 16, 1, ['.oooo.', 'olllbo', '.ooDoo', '....o.']);
  const S = { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget, wink };

  PatchDex.register({
    id: 'riddle', name: 'Riddle', species: 'kitten sphinx', rarity: 'rare', habit: 'planning',
    blurb: 'A pocket-sized sphinx who guards every doorway in your repo and will not let a single line through until you can say what "passing" looks like.',
    coaching: 'Planning, tests first: it asks you to state the riddle before the answer, writing the failing test or acceptance check before the agent writes code, and nothing passes until the code answers it.',
    voice: 'riddle me this: which test fails right now?',
    hatch: 'A sandstorm buries the egg in a little dune, a pyramid rises on the horizon, and when the sand slides away Riddle is sitting in sphinx pose under a glowing question mark, winking.',
    palette: {
      o: '#4a2733', l: '#ffe2a6', b: '#eab76c', d: '#c08447', D: '#8e5634',
      p: '#f29a9a', n: '#c4566a', m: '#6a2f3a', e: '#2b1a3a', w: '#ffffff',
      a: '#3567d1', A: '#1f3c8a', c: '#6b98f2', g: '#f7c948', G: '#b98320', h: '#fff4b0',
      q: '#9ff3ff', Q: '#43c6d9', z: '#c9d6f5', y: '#a87884', Y: '#6f4c66', r: '#4f3550',
    },
    sprites: S,
    loop: [['idle', 18], ['idle2', 6], ['idle', 12], ['blink', 2], ['idle', 14], ['fidget', 3], ['idle', 2], ['fidget', 3], ['idle2', 6], ['idle', 12], ['blink', 2], ['idle', 8], ['think', 12], ['idle', 8]],
    entrance(k) {
      const { f, blank, px, W: CW, H: CH } = k;
      const out = k.eggIntro();
      // Sand dune: a parabolic mound, lit from the top-left, rim highlighted, base shaded.
      const dune = (g, h, w = 9, cx = 13.5) => {
        if (h <= 0) return g;
        const top = x => { const u = Math.abs(x - cx) / w; return u >= 1 ? CH : CH - h * Math.sqrt(1 - u * u); };
        for (let x = 0; x < CW; x++) {
          const t = top(x); if (t > CH - 0.5) continue;
          for (let y = Math.max(0, Math.ceil(t - 0.5)); y < CH; y++) {
            const edge = y === Math.max(0, Math.ceil(t - 0.5));
            const ripple = (y * 3 + x * 2) % 11 === 0 && y > t + 1;
            px(g, x, y, edge ? (x < cx + 2 ? 'l' : 'b') : ripple ? (x < cx ? 'd' : 'D') : x > cx + w * 0.45 ? 'd' : 'b');
          }
        }
        return g;
      };
      // Pyramid behind everything: lit left face, shaded right face, gold capstone. h = rows risen above the horizon.
      const HZ = 17;
      // Each pyramid rises from the horizon: draw only its top `h` rows, shifted down to sit on the horizon.
      const PYRS = [[4, 13], [24, 8]];
      const pyramid = (g, h, dim) => {
        PYRS.forEach(([cx, tall], i) => {
          const rise = Math.min(tall, Math.round(h * tall / 13));
          for (let j = 0; j < rise; j++) {
            const y = HZ - rise + 1 + j, half = j; // j = 0 at the tip
            for (let x = cx - half; x <= cx + half; x++) {
              const c = j < 2 && i === 0 ? (x <= cx ? 'g' : 'G') : x < cx ? 'y' : x === cx && j % 2 ? 'y' : 'Y';
              px(g, x, y, dim ? (c === 'Y' ? 'r' : 'Y') : c);
            }
          }
        });
        return g;
      };
      const ground = (g, dim) => { for (let x = 0; x < CW; x++) for (let y = HZ + 1; y < CH; y++) px(g, x, y, dim ? 'r' : y === HZ + 1 ? 'd' : (x + y) % 6 ? 'D' : 'd'); return g; };
      // Wind-blown sand: short streaks that travel right over successive frames.
      const STREAKS = [[0, 4, 3], [5, 9, 2], [2, 13, 4], [9, 2, 2], [7, 16, 3], [12, 7, 2], [1, 19, 2], [14, 11, 3]];
      const wind = (g, t) => { STREAKS.forEach(([x, y, n], i) => { const sx = (x + t * 5 + i * 3) % (CW + 6) - 3; for (let d = 0; d < n; d++) px(g, sx + d, y, d === n - 1 ? 'l' : 'b'); }); return g; };
      const Q = ['.qqq.', 'qQ.qq', '...qQ', '..qQ.', '..Q..', '.....', '..q..'];
      const glyph = (g, y = 0, dim) => k.stamp(g, Q, 11, y, dim ? { map: { q: 'Q', Q: 'Q' } } : {});
      const sparks = (g, s) => { (s ? [[9, 1], [17, 3], [10, 6]] : [[8, 4], [18, 0], [16, 6]]).forEach(([x, y]) => px(g, x, y, 'h')); return g; };
      // A canvas with: sky elements, the creature (optional), then a dune of height h covering it.
      const scene = ({ pyr = 0, dim = false, egg = false, who = null, h = 0, t = -1, q = -1, gnd = false } = {}) => {
        let g = blank();
        if (gnd) ground(g, dim);
        if (pyr) pyramid(g, pyr, dim);
        if (egg) k.stamp(g, k.EGG_C2, k.eggHome.x, k.eggHome.y);
        if (who) k.over(g, who);
        dune(g, h);
        if (t >= 0) wind(g, t);
        if (q >= 0) glyph(g, 0, q === 1);
        return g;
      };
      out.push(
        f(wind(k.egg(k.EGG_C2), 0), 110, { note: 'the wind picks up' }),
        f(wind(k.egg(k.EGG_C2, 0, 0, k.lean(1)), 1), 110),
        f(scene({ egg: true, h: 3, t: 2 }), 110, { note: 'sand piles up' }),
        f(scene({ egg: true, h: 7, t: 3 }), 110),
        f(scene({ egg: true, h: 11, t: 4 }), 120),
        f(scene({ h: 15, t: 5 }), 150, { note: 'buried in a dune' }),
        f(scene({ h: 15 }), 300),
        f(scene({ h: 15, pyr: 3, gnd: true }), 120, { note: 'pyramids rise' }),
        f(scene({ h: 15, pyr: 6, gnd: true }), 120),
        f(scene({ h: 15, pyr: 10, gnd: true }), 120),
        f(scene({ h: 15, pyr: 13, gnd: true }), 300),
        f(scene({ h: 15, pyr: 13, gnd: true, q: 1 }), 150, { note: 'a question glows' }),
        f(sparks(scene({ h: 15, pyr: 13, gnd: true, q: 0 }), 0), 220),
        f(sparks(scene({ h: 15, pyr: 13, gnd: true, q: 0 }), 1), 220),
        f(scene({ h: 12, pyr: 13, gnd: true, who: 'blink', q: 0, t: 6 }), 110, { note: 'the sand slides away' }),
        f(scene({ h: 8, pyr: 13, gnd: true, who: 'blink', q: 0, t: 7 }), 110),
        f(scene({ h: 4, pyr: 13, gnd: true, who: 'blink', q: 0, t: 8 }), 110),
        f(scene({ pyr: 13, gnd: true, who: 'idle', q: 0 }), 420, { note: 'Riddle, in sphinx pose' }),
        f(scene({ pyr: 13, gnd: true, who: 'idle', q: 1 }), 200),
        f(scene({ pyr: 13, gnd: true, who: 'wink', q: 0 }), 450, { note: 'it winks' }),
        f(scene({ pyr: 13, gnd: true, who: 'idle', q: 1 }), 160),
        f(scene({ pyr: 8, dim: true, gnd: true, who: 'happy' }), 150),
        f(scene({ pyr: 4, dim: true, who: 'happy2' }), 150),
        f(k.at('happy'), 240),
        f(k.at('blink'), 110),
        f(k.at('idle'), 500),
      );
      return out;
    },
  });
})();
