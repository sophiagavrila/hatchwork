// Cinder — the legendary phoenix chick. Ember-orange down, a living flame tuft, soot-grey wings with glowing tips.
(function () {
  // @gen-start
  const S = {
    idle: [
      '.......R...........',
      '......RlR..........',
      '..R...RyR..........',
      '..Rl.RlhR..........',
      '...RlRlhyR.........',
      '...RlyhhylR........',
      '..oRyhhhyRo........',
      '.oOllyyyllbo....R..',
      '.oOllllllbbro..Rl..',
      'oOllwebbbwebroRlyR.',
      'oOlleebbbeebroRyhR.',
      'ollpbbgGbbpbroRlyR.',
      'olbbbbbGboooroRlR..',
      'olbyyyybogaagoRo...',
      'obyhhhyboaGGGGo....',
      '.obyyyyboGGGGGEo...',
      '.orbbbbboGGGEyEo...',
      '..orrrrrroGEyoyo...',
      '...oooooooooyo.....',
      '...GG.GG...........',
    ],
    idle2: [
      '......R............',
      '.....RlR..R........',
      '.....RyR.Rl........',
      '..R.RlhRlR.........',
      '...RlRhhyR.........',
      '...RlyhhylR........',
      '..oRyhhhyRo......R.',
      '.oOllyyyllbo....Rl.',
      '.oOllllllbbro..RlR.',
      'oOllwebbbwebroRlyR.',
      'oOlleebbbeebroRyhR.',
      'ollpbbgGbbpbroRlyR.',
      'olbbbbbGboooroRlR..',
      'olbyyyybogaagoRo...',
      'obyhhhyboaGGGGo....',
      '.obyyyyboGGGGGEo...',
      '.orbbbbboGGGEyEo...',
      '..orrrrrroGEyoyo...',
      '...oooooooooyo.....',
      '...GG.GG...........',
    ],
    blink: [
      '.......R...........',
      '......RlR..........',
      '..R...RyR..........',
      '..Rl.RlhR..........',
      '...RlRlhyR.........',
      '...RlyhhylR........',
      '..oRyhhhyRo........',
      '.oOllyyyllbo....R..',
      '.oOllllllbbro..Rl..',
      'oOllbbbbbbbbroRlyR.',
      'oOlleebbbeebroRyhR.',
      'ollpbbgGbbpbroRlyR.',
      'olbbbbbGboooroRlR..',
      'olbyyyybogaagoRo...',
      'obyhhhyboaGGGGo....',
      '.obyyyyboGGGGGEo...',
      '.orbbbbboGGGEyEo...',
      '..orrrrrroGEyoyo...',
      '...oooooooooyo.....',
      '...GG.GG...........',
    ],
    talk: [
      '.......R...........',
      '......RlR..........',
      '..R...RyR..........',
      '..Rl.RlhR..........',
      '...RlRlhyR.........',
      '...RlyhhylR........',
      '..oRyhhhyRo........',
      '.oOllyyyllbo....R..',
      '.oOllllllbbro..Rl..',
      'oOllwebbbwebroRlyR.',
      'oOlleebbbeebroRyhR.',
      'ollpbbgGbbpbroRlyR.',
      'olbbbbmGboooroRlR..',
      'olbyyyybogaagoRo...',
      'obyhhhyboaGGGGo....',
      '.obyyyyboGGGGGEo...',
      '.orbbbbboGGGEyEo...',
      '..orrrrrroGEyoyo...',
      '...oooooooooyo.....',
      '...GG.GG...........',
    ],
    talk2: [
      '......R............',
      '.....RlR..R........',
      '.....RyR.Rl........',
      '..R.RlhRlR.........',
      '...RlRhhyR.........',
      '...RlyhhylR........',
      '..oRyhhhyRo......R.',
      '.oOllyyyllbo....Rl.',
      '.oOllllllbbro..RlR.',
      'oOllwebbbwebroRlyR.',
      'oOlleebbbeebroRyhR.',
      'ollpbbgGbbpbroRlyR.',
      'olbbbbGbboooroRlR..',
      'olbyyyybogaagoRo...',
      'obyhhhyboaGGGGo....',
      '.obyyyyboGGGGGEo...',
      '.orbbbbboGGGEyEo...',
      '..orrrrrroGEyoyo...',
      '...oooooooooyo.....',
      '...GG.GG...........',
    ],
    happy: [
      '...y...R...y.......',
      '......RlR..........',
      '.R...RyhR.R........',
      '.Rl.RlhhRRl........',
      '..RlRlhhyRlR.......',
      '...RlyhhylR........',
      '..oRyhhhyRo......R.',
      '.oOllyyyllbo....Rl.',
      '.oOllllllbbro..RlR.',
      'oOlleelbbeebro.oyR.',
      'oOlellebebbeoyoyoR.',
      'ollpbbgGbbpoEyEyoR.',
      'olbbbbbGbboGGEEoR..',
      'olbyyyybboaGGGoo...',
      'obyhhhybbogaGo.....',
      '.obyyyybboggo......',
      '.orbbbbbbroo.......',
      '..orrrrrrro........',
      '...ooooooo.........',
      '...GG.GG...........',
    ],
    happy2: [
      '..y...R............',
      '.....RlR..R.y......',
      '.....RyR.Rl........',
      'l.R.RlhRlR.........',
      '...RlRhhyR.........',
      '...RlyhhylR........',
      '..oRyhhhyRo........',
      '.oOllyyyllbo....R..',
      '.oOllllllbbro..Rl..',
      'oOlleelbbeebroRlyR.',
      'oOlellebebberoRyhR.',
      'ollpbbgGbbooooRlyR.',
      'olbbbbbGbogaaoolR..',
      'olbyyyybboaGGGGoo..',
      'obyhhhybboGGGGGEyo.',
      '.obyyyybbboGGEyoEyo',
      '.orbbbbbbrrooyo.oyo',
      '..orrrrrrro........',
      '...ooooooo.........',
      '...GG.GG...........',
    ],
    sleep: [
      '...................',
      '.............zzz...',
      '...............z...',
      '......R.......z....',
      '.............zzz...',
      '....R.R............',
      '..oORlRlRbo........',
      '.oOlRlyyRlbo.......',
      '.oOllllllbbro......',
      'oOllbbbbbbbbro.....',
      'oOlleebbbeebro.R...',
      'ollpbbgGbbpbroRlR..',
      'olbbbbbGboooroRlR..',
      'olbyyyybogaagoRo...',
      'obyhhhyboaGGGGo....',
      '.obyyyyboGGGGGEo...',
      '.orbbbbboGGGEyEo...',
      '..orrrrrroGEyoyo...',
      '...oooooooooyo.....',
      '...GG.GG...........',
    ],
    sleep2: [
      '..............ZZZ..',
      '................Z..',
      '...............Z...',
      '......R.......ZZZ..',
      '......y............',
      '....RlhlR..........',
      '..oORlRlRbo........',
      '.oOlRlyyRlbo.......',
      '.oOllllllbbro......',
      'oOllbbbbbbbbro.....',
      'oOlleebbbeebro.R...',
      'ollpbbgGbbpbroRlR..',
      'olbbbbbGboooroRlR..',
      'olbyyyybogaagoRo...',
      'obyhhhyboaGGGGo....',
      '.obyyyyboGGGGGEo...',
      '.orbbbbboGGGEyEo...',
      '..orrrrrroGEyoyo...',
      '...oooooooooyo.....',
      '...GG.GG...........',
    ],
    think: [
      '.......R........a..',
      '......RlR.....g....',
      '..R...RyR.....aa...',
      '..Rl.RlhR..........',
      '...RlRlhyR..a......',
      '...RlyhhylR........',
      '..oRyhhhyRo......R.',
      '.oOllyyyllbo....Rl.',
      '.oOllllllbbro..RlR.',
      'oOllewbbbewbroRlyR.',
      'oOllllbbbbbbroRyhR.',
      'ollpbbgGbbpbroRlyR.',
      'olbbbbbGboooroRlR..',
      'olbyyyybogaagoRo...',
      'obyhhhyboaGGGGo....',
      '.obyyyyboGGGGGEo...',
      '.orbbbbboGGGEyEo...',
      '..orrrrrroGEyoyo...',
      '...oooooooooyo.....',
      '...GG.GG...........',
    ],
    fidget: [
      '....aR.............',
      '....RlR..R.........',
      '....RyR.Rl..g......',
      '.R.RlhRlR..........',
      '..RlRhhyR..........',
      '..RlyhhylR.........',
      'aoRyhhhyRo.........',
      'oOllyyyllbo....R...',
      'oOllllllbbro..Rl.a.',
      'OllwebbbwebroRlyR..',
      'OlleebbbeebroRyhR..',
      'llpbbgGbbooooRlyR..',
      'olbbbbbGbogaaoolR..',
      'glbyyyybboaGGGGoo..',
      'obyhhhybboGGGGGEyo.',
      '.obyyyybbboGGEyoEyo',
      '.orbbbbbbrrooyo.oyo',
      '..orrrrrrro........',
      '...ooooooo.........',
      '...GG.GG...........',
    ],
  };
  // @gen-end
  PatchDex.register({
    id: 'cinder', name: 'Cinder', species: 'ashborn phoenix chick', rarity: 'legendary', habit: 'recovery',
    blurb: 'Hatched from its own ashes and fully planning to do it again. Not reckless, just well rehearsed.',
    coaching: 'Recovery from failure: checkpoint (commit, stash, snapshot) before you let the agent run anything risky, and when a run goes wrong, roll back to the last good state and re-run with a better prompt instead of patching the wreckage.',
    voice: 'commit before the fire. we rise from the last good state.',
    hatch: 'The egg runs hot, catches fire and burns down to a heap of glowing ash; after a held breath a pillar of flame erupts and Cinder rises out of it, shaking off the ash.',
    palette: {
      o: '#3b1518', O: '#8c3a22', R: '#b3202a', r: '#c43a2a', b: '#ee6a2c', l: '#f8a043', y: '#ffd75e', h: '#fff4d6',
      e: '#2a0c14', w: '#ffffff', p: '#ff7f86', m: '#7a1828',
      G: '#4a3c3e', g: '#85787a', a: '#bdb2ad', E: '#ff9330', z: '#ffd9a0', Z: '#c99a74', s: '#5e5456',
    },
    sprites: S,
    loop: [['idle', 3], ['idle2', 3], ['idle', 3], ['idle2', 3], ['idle', 3], ['idle2', 3], ['blink', 2], ['idle', 3], ['idle2', 3], ['idle', 3], ['idle2', 3], ['fidget', 3], ['idle', 3], ['idle2', 3], ['idle', 3], ['idle2', 3], ['think', 8], ['idle2', 3], ['idle', 3], ['blink', 2], ['idle2', 3]],
    entrance(k) {
      const { f } = k;
      const EX = k.eggHome.x, EY = k.eggHome.y;
      // The shell heats up: cream -> amber -> orange, the crack glowing white-hot.
      const HEAT = [
        { 1: 'y', 2: 'h', 3: 'l', 7: 'h' },
        { 1: 'l', 2: 'y', 3: 'b', 4: 'y', 5: 'l', 6: 'E', 7: 'h', 0: 'O' },
        { 1: 'b', 2: 'l', 3: 'r', 4: 'y', 5: 'E', 6: 'h', 7: 'h', 0: 'R' },
      ];
      const CHAR = { 0: 'o', 1: 'G', 2: 'g', 3: 's', 4: 'E', 5: 'R', 6: 'y', 7: 'E' };
      const hot = (n, rows = k.EGG_C2, o = {}) => k.egg(rows, 0, 0, { ...o, map: HEAT[n] });
      // flame tongues
      const T = [
        ['.R.', 'RlR', 'lyl'],
        ['.R.', '.lR', 'RyR', 'Ryl', 'lhy'],
        ['..R.', '.Rl.', '.RlR', 'RlyR', 'Ryhl', 'lhhy'],
        ['.R..', '.lR.', '.RlR', 'RlyR', 'RyhR', 'Ryhl', 'lhhy'],
      ];
      const tongue = (g, x, base, n, flip) => k.stamp(g, T[n], x, base - T[n].length + 1, { flipX: !!flip });
      // a ring of fire around the egg; size 0..3, t flickers
      const blaze = (g, size, t) => {
        const spots = [[-3, 0], [0, 1], [3, 0], [6, 2], [9, 1], [11, 0]];
        spots.forEach(([dx, dn], i) => {
          const n = Math.max(0, Math.min(3, size - 1 + ((dn + t + i) % 2)));
          if (size > 0) tongue(g, EX + dx, k.H - 1, n, (i + t) % 2);
        });
        if (size >= 3) [[1, 5], [5, 3], [8, 6]].forEach(([dx, dy], i) => tongue(g, EX + dx, EY + dy + 3, (i + t) % 2 + 1, t % 2));
        return g;
      };
      // ash heap with ember specks; e = which embers are lit (0 none, 1/2 alternate, 3 all)
      const HEAP = [
        '.........aga.........',
        '.....aagggaGgaa......',
        '...agggGgggGgggga....',
        '.agGggGGgGGgGGgggGa..',
        'gGGgGGGsGGGGsGGGgGGg.',
      ];
      const EMB = [[6, 2], [10, 1], [14, 3], [3, 4], [9, 3], [17, 4], [12, 4], [8, 1]];
      const HX = 4, HY = k.H - HEAP.length;
      const heap = (g, e = 0, rows = HEAP) => {
        k.stamp(g, rows, HX, k.H - rows.length);
        EMB.forEach(([x, y], i) => { if (e === 3 || (e && i % 2 === e - 1)) k.px(g, HX + x, k.H - rows.length + y, i % 3 ? 'E' : 'y'); else if (e) k.px(g, HX + x, k.H - rows.length + y, 'R'); });
        return g;
      };
      const SMALL = HEAP.slice(1).map(r => r.replace(/^a/, '.'));
      // pillar of flame from the heap; top = highest row reached
      const pillar = (g, top, t, w = 3) => {
        const cx = 13;
        for (let y = top; y < k.H; y++) {
          const d = y - top, half = Math.min(w, Math.floor(d / 2)), wob = Math.round(Math.sin((y + t * 2) * 0.9) * (d > 1 && d < 10 ? 1 : 0));
          for (let x = -half - 1; x <= half + 1; x++) {
            const ax = Math.abs(x), edge = ax === half + 1;
            if (edge && (y + t + (x > 0 ? 1 : 0)) % 3 === 0) continue;
            k.px(g, cx + x + wob, y, edge ? 'R' : ax === half ? 'l' : ax === half - 1 ? 'y' : 'h');
          }
        }
        if (w >= 3) [[-6, 8 + (t % 2) * 3, 1, 1], [5, 11 - (t % 2) * 3, 1, 0], [-7, 15, 0, 0], [6, 16, 0, 1]].forEach(([dx, base, n, fl]) => tongue(g, cx + dx, top + base, n, fl));
        return g;
      };
      // flying ash flecks and sparks
      const flecks = (g, n) => {
        const P = [[[3, 6, 'a'], [24, 4, 'g'], [5, 14, 'g'], [23, 12, 'a'], [8, 2, 'E']], [[1, 4, 'g'], [26, 2, 'a'], [2, 12, 'a'], [25, 9, 'g'], [20, 1, 'E']], [[0, 2, 'a'], [27, 0, 'g'], [26, 7, 'a']]];
        P[n % 3].forEach(([x, y, c]) => k.px(g, x, y, c));
        return g;
      };
      const sparks = (g, n) => { (n % 2 ? [[6, 3], [21, 1], [4, 9], [24, 7]] : [[8, 1], [19, 4], [3, 6], [23, 2]]).forEach(([x, y]) => k.px(g, x, y, n % 4 > 1 ? 'y' : 'E')); return g; };
      // the reborn chick, still white-hot, then cooling to its own colours
      const WHITE = { o: 'R', O: 'l', R: 'y', r: 'l', b: 'y', l: 'h', y: 'h', G: 'E', g: 'y', a: 'h', e: 'r', m: 'r', p: 'y', w: 'h', E: 'h' };
      const COOL = { o: 'r', O: 'b', R: 'l', r: 'b', b: 'l', l: 'y', G: 'r', g: 'E', a: 'y', e: 'o', E: 'y' };
      // chick rising: draw from the waist up only (the heap hides the rest)
      const rise = (n, dy, e) => { const g = k.at(n, 0, dy); return heap(g, e, SMALL); };
      return [
        ...k.eggIntro(),
        f(hot(0), 220, { note: 'the shell runs hot' }),
        f(sparks(hot(1), 0), 180),
        f(sparks(hot(2), 1), 180),
        f(blaze(hot(2, k.EGG_C2, k.lean(-1)), 1, 0), 110, { note: 'it catches fire' }),
        f(blaze(hot(2, k.EGG_C2, k.lean(1)), 2, 1), 110),
        f(blaze(hot(2), 3, 0), 110),
        f(sparks(blaze(hot(2), 3, 1), 2), 110),
        f(blaze(k.egg(k.EGG_BOTTOM, 0, 1, { map: CHAR }), 3, 0), 110, { note: 'burning down' }),
        f(sparks(blaze(k.egg(k.EGG_BOTTOM, 0, 3, { map: CHAR }), 3, 1), 3), 110),
        f(blaze(heap(k.blank(), 3), 2, 0), 120),
        f(blaze(heap(k.blank(), 3), 1, 1), 140),
        f(heap(k.blank(), 3), 260, { note: 'a heap of ash' }),
        f(heap(k.blank(), 1), 300),
        f(heap(k.blank(), 2), 300),
        f(heap(k.blank(), 0), 480, { note: 'a held breath' }),
        f(heap(k.blank(), 2), 160),
        f(heap(k.px(k.blank(), 13, 16, 'h'), 3), 140, { note: 'something stirs' }),
        f(pillar(heap(k.blank(), 3), 14, 0, 1), 70, { note: 'a pillar of flame' }),
        f(pillar(heap(k.blank(), 3), 6, 1, 2), 70),
        f(pillar(heap(k.blank(), 3), 0, 0, 3), 90),
        f(sparks(pillar(k.blank(), 0, 1, 3), 1), 90),
        f(sparks(pillar(k.blank(), 0, 0, 3), 2), 90),
        f(heap(k.over(pillar(k.blank(), 0, 1, 2), 'idle', 0, 4, { map: WHITE }), 3, SMALL), 120, { note: 'Cinder rises from the ashes' }),
        f(heap(k.over(pillar(k.blank(), 6, 0, 1), 'idle', 0, 2, { map: COOL }), 3, SMALL), 120),
        f(rise('idle', 1, 1), 160),
        f(sparks(k.at('idle'), 0), 200),
        f(flecks(k.at('fidget'), 0), 90, { note: 'shakes off the ash' }),
        f(flecks(k.at('idle'), 1), 90),
        f(flecks(k.at('fidget'), 2), 90),
        f(k.at('idle'), 140),
        f(sparks(k.at('happy'), 0), 200, { note: 'flame tuft flares' }),
        f(sparks(k.at('happy2'), 1), 180),
        f(sparks(k.at('happy'), 2), 200),
        f(k.at('idle'), 300),
        f(k.at('idle2'), 120),
        f(k.at('blink'), 110),
        f(k.at('idle'), 320),
      ];
    },
  });
})();
