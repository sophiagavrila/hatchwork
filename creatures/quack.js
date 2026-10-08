// Quack — rubber-duck debugging. Glossy yellow vinyl duck afloat in a strip of bath water; molded wing, curl on top, orange bill.
(function () {
  const idle = [
    '.........oo..........',
    '........oyo..........',
    '.......oolooo........',
    '.....oollwwlyoo......',
    '.....olllwlyyyyo.....',
    '....olwelyyyyyyYo....',
    '....oleeyyyyyyyYo..oo',
    '....oleeyyyyyyYYo.oyo',
    '.rrrrypyyyyyyYYYooyYo',
    'raaabryyyyyyYYYdlyyYo',
    'rbbbbryyyyyyyYYYyyyYo',
    '.rBBBryyyyyddddYyyYYo',
    '..rrrolyyydlllyddYYYo',
    '..olllyyyydyyyYYYdYdo',
    '..olyyyyyyyddddddYYdo',
    '...oyyyyyyyyyyYYYYdo.',
    '.cCCccCCcccCCccCCccC.',
    'CCDDCCDDCCCDDCCDDCCDC',
  ];
  const W = idle[0].length;
  // Replace rows by index; short rows replace the left part only.
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
  // Stamp small patches ('.' = keep) at x, y.
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  // Settle 1px lower in the water: drop the last body row above the waterline.
  const sink = base => ['.'.repeat(W), ...base.slice(0, 15), ...base.slice(16)];
  const lap = (base, a, b) => mod(base, { 16: a, 17: b });
  const WATER2 = ['.cCcCCccCCcCCcccCCcC.', 'CDDCCDDCCDDDCCDDCCDDC'];
  const jaw = { 11: '.rmmmr', 12: '.rBBBr', 13: '..rrrl' };
  const eye = (g, rows) => put(g, 6, 5, rows);
  const blink = eye(idle, ['ll', 'yy', 'ee']);
  const talk = mod(idle, jaw);
  const talk2 = mod(idle, { 11: '.rmmBr' });
  const happy = put(put(eye(mod(idle, jaw), ['ll', 'ee', 'yy']), 5, 7, ['e..e', 'pp']), 5, 8, ['pp']);
  const happy2 = put(lap(sink(happy), ...WATER2), 0, 14, ['c' + '.'.repeat(18) + 'c', '.w' + '.'.repeat(16) + 'w.']);
  const zs = (g, x, y, big) => put(g, x, y, big ? ['DDDD', '...D', '..D.', '.D..', 'DDDD'] : ['CCC', '..C', '.C.', 'CCC']);
  const sleepFace = sink(put(eye(idle, ['ll', 'yy', 'ee']), 5, 6, ['e..e']));
  const sleep = zs(sleepFace, 16, 0, true);
  const sleep2 = zs(lap(sleepFace, ...WATER2), 17, 0, false);
  const think = put(put(eye(idle, ['ew', 'ee', 'yy']), 16, 0, ['.DD.', 'D..D', '..D.', '....', '..D.']), 1, 11, ['.rrBr']);
  const fidget = put(lap(idle, ...WATER2), 17, 4, ['..oo', '.oyo', '.oyo', 'oyYo', 'oyYo']);
  const idle2 = lap(sink(idle), ...WATER2);

  PatchDex.register({
    id: 'quack',
    name: 'Quack',
    species: 'rubber debugging duck',
    rarity: 'common',
    habit: 'planning',
    blurb: 'A squeaky vinyl duck that has heard every plan ever said out loud. It never interrupts; it just floats there until you hear the hole yourself.',
    coaching: 'Plan read-back: before the agent runs, have it explain its plan back to you step by step. If the plan does not survive being said out loud, it will not survive the code.',
    voice: "explain the plan to me like i'm a duck. because i am.",
    hatch: 'The egg bobs in a little bath, ripples spread, it tips over with a squeak, the top pops off, and Quack bobs up out of the water with a splash.',
    palette: {
      o: '#6b3412', w: '#ffffff', l: '#fff4b8', y: '#ffd83a', Y: '#f2ae1c', d: '#cf7d10',
      a: '#ffc98a', b: '#ff9330', B: '#d9581a', r: '#7a2a12', m: '#5e1a12',
      e: '#2b1830', p: '#ff9e86',
      c: '#e2f6ff', C: '#86cdf2', D: '#4b92cc',
    },
    sprites: { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [
      ['idle', 14], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle', 6], ['idle2', 6], ['idle', 12],
      ['fidget', 3], ['idle', 2], ['fidget', 3], ['idle2', 6], ['idle', 12], ['blink', 2], ['idle', 4], ['blink', 2], ['idle2', 6], ['think', 10],
    ],
    entrance(k) {
      const out = k.eggIntro();
      const EX = k.eggHome.x, EY = k.eggHome.y;
      const hx = k.home(idle).x, wy = k.H - 2;
      // Bath water: the same strip Quack floats in, stamped across the bottom of the canvas.
      const water = (g, alt) => k.stamp(g, alt ? WATER2 : idle.slice(16), hx, wy);
      // Ripple rings: short bright dashes on the surface, moving outward.
      const ripple = (g, r) => { [-1, 1].forEach(s => { const x = Math.round(13.5 + s * (6.5 + r * 2)); k.px(g, x, wy, 'w'); k.px(g, x + s, wy, 'c'); k.px(g, x - s, wy, 'c'); }); return g; };
      const bob = (dy, o, alt, r) => { const g = water(k.egg(k.EGG_C2, 0, dy, o), alt); return r === undefined ? g : ripple(g, r); };
      // Squeak: three little sound strokes off the egg's top corner.
      const squeak = (g, side) => {
        const x = side > 0 ? EX + 12 : EX - 1, s = side;
        [[0, 0], [s, -1], [s * 2, 1], [s * 3, 1], [s, 3], [s * 2, 3], [0, -2], [0, -3]].forEach(([dx, dy]) => k.px(g, x + dx, EY + 2 + dy, 'w'));
        return g;
      };
      const tip = (side, dy) => { const g = water(k.blank()); k.stamp(g, k.EGG_C2, EX, EY + dy, { rowDx: j => (j < 7 ? side * (j < 3 ? 2 : 1) : 0) }); return water(g); };
      const shell = (topDy, topDx) => { const g = k.egg(k.EGG_BOTTOM, 0, 2); k.stamp(g, k.EGG_TOP, EX + topDx, EY + topDy); return water(g); };
      // Quack rising out of the water: body clipped by the surface (water stamped on top).
      const body = idle.slice(0, 16);
      const rise = (dy, rows = body, alt) => water(k.stamp(k.blank(), rows, hx, wy - 16 + dy), alt);
      // Splash: a crown of water thrown up on both sides, then droplets arcing out and falling back.
      const drops = (g, n) => {
        const P = [
          [[5, 19, 'c'], [6, 18, 'w'], [6, 19, 'C'], [22, 19, 'c'], [21, 18, 'w'], [21, 19, 'C'], [4, 19, 'C'], [23, 19, 'C']],
          [[3, 19, 'C'], [4, 18, 'c'], [4, 17, 'w'], [5, 16, 'c'], [3, 15, 'w'], [24, 19, 'C'], [23, 18, 'c'], [23, 17, 'w'], [22, 16, 'c'], [24, 15, 'w'], [7, 14, 'c'], [20, 13, 'c']],
          [[2, 14, 'w'], [1, 16, 'c'], [4, 12, 'c'], [25, 13, 'w'], [26, 15, 'c'], [23, 11, 'c'], [7, 9, 'w'], [21, 8, 'c']],
          [[1, 18, 'c'], [26, 18, 'c'], [3, 16, 'C'], [24, 17, 'C'], [6, 13, 'c'], [22, 12, 'C']],
          [[2, 19, 'c'], [25, 19, 'c']],
        ][n];
        P.forEach(([x, y, c]) => k.px(g, x, y, c));
        return g;
      };
      out.push(
        k.f(bob(0), 200, { note: 'a little bath fills in under it' }),
        k.f(bob(1, {}, true), 180),
        k.f(bob(0, {}, false, 0), 180, { note: 'it floats' }),
        k.f(bob(1, {}, true, 1), 180),
        k.f(bob(0, {}, false, 2), 180),
        k.f(bob(1, {}, true, 3), 160),
        k.f(tip(-1, 0), 110, { note: 'it tips...' }),
        k.f(squeak(tip(-1, 0), -1), 200, { note: 'squeak' }),
        k.f(tip(1, 1), 110),
        k.f(squeak(tip(1, 1), 1), 200, { note: 'squeak' }),
        k.f(bob(0), 120),
        k.f(shell(-2, 0), 80, { note: 'pop' }),
        k.f(shell(-6, 1), 80),
        k.f(shell(-11, 2), 90),
        k.f(water(k.egg(k.EGG_BOTTOM, 0, 4)), 90),
        k.f(water(k.egg(k.EGG_BOTTOM, 0, 7), true), 90, { note: 'the shell slips under' }),
        k.f(ripple(ripple(water(k.blank()), 0), 1), 160),
        k.f(drops(rise(9, body), 0), 70, { note: 'SPLASH' }),
        k.f(drops(rise(4, body, true), 1), 80),
        k.f(drops(rise(-1, body), 2), 110),
        k.f(drops(rise(1, sink(happy).slice(0, 16), true), 3), 140),
        k.f(drops(k.at(happy), 4), 220, { note: 'Quack bobs up' }),
        k.f(k.at(happy2), 160),
        k.f(k.at(happy), 220),
        k.f(k.at(idle2), 180),
        k.f(k.at(idle), 260),
        k.f(k.at(blink), 110),
        k.f(k.at(idle), 450),
      );
      return out;
    },
  });
})();
