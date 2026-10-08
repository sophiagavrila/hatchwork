// Kuro — karasu-tengu fledgling. Blue-black crow imp in a little hexagonal tokin cap with two white
// bonbori pom-poms, one-tooth geta, and a yatsude leaf fan held over its shoulder.
(function () {
  // Kuro without its fan; the fan is stamped on separately so it can move.
  const body = [
    '...........ooo........',
    '..........oUTto.......',
    '.........oUTttto......',
    '.........oTtttto......',
    '........oooccccco.....',
    '.......oLMMMMMMMMo....',
    '......oLMmmmmmmmMMo...',
    '.....oMmmmmmmmookMo...',
    '.....oMmmmmmmmwekkooo.',
    '.....ommmmmmmmeekyyyyo',
    '......okmmmmmmmmkYYYo.',
    '......okkmmmmmmmkooo..',
    '.....okkkckkkkckkkko..',
    '....okMkkppkkkppkoo...',
    '...okLMkpppPkpppPoo...',
    '..okLLMkkPPkkkPPkoo...',
    '..okLMLLkkkkkkkkko....',
    '...oooooyyoooyyoo.....',
    '......onnnnno.onnnnno.',
    '........oNo....oNo....',
  ];
  // Yatsude (eight-lobed) leaf fan, the tengu's wind fan.
  const FAN = [
    'o..o.o..o.',
    'Fo.oFo.oFo',
    'FFofvfoFFo',
    'oFvfvfvFo.',
    '.oFvvvo...',
    '..oFfo....',
    '...oh.....',
    '...oh.....',
  ];
  const W = body[0].length;
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
  // Drop everything above `row` by one pixel (row `row` is swallowed).
  const sink = (base, row) => ['.'.repeat(W), ...base.slice(0, row), ...base.slice(row + 1)];
  // The eye is a 2x2 block at cols 14-15, rows 8-9 (plus col 13 for the happy arc).
  const eye = (b, r8, r9, x = 14) => b.map((r, j) => (j === 8 ? r.slice(0, x) + r8 + r.slice(x + r8.length) : j === 9 ? r.slice(0, x) + r9 + r.slice(x + r9.length) : r));
  const shut = b => eye(b, 'mm', 'LL');
  const glad = b => eye(b, 'mLm', 'LmL', 13);
  const withFan = (b, dx = 0, dy = 0) => put(b, dx, dy, FAN);
  const beakOpen = { 10: '......okmmmmmmmmkeeeo.', 11: '......okkmmmmmmmkYYYo.', 12: '.....okkkckkkkckkooo..' };

  const idle = withFan(body);
  const blink = shut(idle);
  const talk = mod(idle, beakOpen);
  const talk2 = idle;
  const spark = ['.s.', 'sws', '.s.'];
  // Happy: eye curls up, beak opens, the fan beats down and up between the two frames.
  const happy = put(mod(glad(idle), beakOpen), 18, 1, spark);
  const happy2 = put(mod(glad(withFan(body, 0, 1)), beakOpen), 18, 4, spark);
  // Sleep: eye shut, head and fan slump a pixel.
  const sleepBase = sink(shut(idle), 16);
  const sleep = put(sleepBase, 17, 0, ['zzzz', '...z', '..z.', '.z..', 'zzzz']);
  const sleep2 = put(sleepBase, 18, 1, ['zzz', '..z', '.z.', 'zzz']);
  // Think: pupil rolls up, a question mark over the beak.
  const think = put(eye(idle, 'ee', 'ww'), 18, 0, ['zz.', '..z', '.z.', '...', '.z.']);
  // Fidget: a single fan stroke; idle2: a glance down the beak.
  const fidget = withFan(body, 0, 1);
  const idle2 = eye(idle, 'ww', 'ee');
  // Entrance poses.
  // One-foot landing: the back geta is tucked up under the tail.
  const oneFoot = mod(idle, { 17: '.onnnnnoooooyyoo......', 18: '...oNo........onnnnno.', 19: '...............oNo....' });
  // Squash on impact.
  const squash = sink(idle, 16);
  // Fan flipped to the other hand (stamped mirrored in front of the beak), then bow.
  const fanFront = put(body, 13, 0, FAN.map(r => [...r].reverse().join('')));
  // Bow: head and fan dip two pixels, eye shut, beak tipped down.
  const bow = [
    '......................',
    '......................',
    'o..o.o..o..ooo........',
    'Fo.oFo.oFooUTto.......',
    'FFofvfoFFoUTttto......',
    'oFvfvfvFooTtttto......',
    '.oFvvvo.oooccccco.....',
    '..oFfo.oLMMMMMMMMo....',
    '...oh.oLMmmmmmmmMMo...',
    '...ohoMmmmmmmmookMo...',
    '.....oMmmmmmmmmmkkoo..',
    '.....ommmmmmmmLLkyyyo.',
    '......okmmmmmmmmkyyYo.',
    '......okkmmmmmmmkoYYo.',
    '.....okkkckkkkckkkoo..',
    '....okMkkppkkkppkoo...',
    '..okLLMkkPPkkkPPkoo...',
    '...oooooyyoooyyoo.....',
    '......onnnnno.onnnnno.',
    '........oNo....oNo....',
  ];

  PatchDex.register({
    id: 'kuro', name: 'Kuro', species: 'karasu-tengu fledgling', rarity: 'common',
    blurb: 'A crow-tengu apprentice who learns every move by doing it a hundred times, badly first.',
    coaching: 'Deliberate practice: try the small kata yourself first, then compare with the answer.',
    voice: 'do the kata yourself. then ask me.',
    hatch: 'A mountain gust spins the egg, feathers burst out, and Kuro drops from above, fan first.',
    palette: {
      o: '#10121f', k: '#1e2440', m: '#2d3a66', M: '#4a5f9a', L: '#7d94c8',
      t: '#221e2a', T: '#5e5870', U: '#9a94ac', c: '#e2543a', C: '#a8321f',
      p: '#fbf8f0', P: '#c9cfe0',
      G: '#24552a', F: '#3f8a3a', f: '#7cc24e', v: '#c4e88a', h: '#8a5a2e',
      y: '#f6c04a', Y: '#c47a22', w: '#ffffff', e: '#0b0b12',
      n: '#b07a44', N: '#6e4626', z: '#d6ecf7', s: '#ffe39a',
    },
    sprites: { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 18], ['blink', 2], ['idle', 12], ['fidget', 2], ['idle', 2], ['fidget', 2], ['idle', 14], ['idle2', 6], ['idle', 10], ['blink', 2], ['think', 10], ['idle', 8]],
    entrance(k) {
      const out = k.eggIntro();
      const F = (g, ms, note) => out.push(k.f(g, ms, note ? { note } : {}));
      // Wind: short pale streaks sweeping left to right; phase moves them along.
      const WIND = [[0, 5, 5], [3, 11, 4], [1, 16, 6], [6, 2, 3], [4, 19, 3]];
      const wind = (g, ph) => {
        WIND.forEach(([x, y, n]) => { for (let i = 0; i < n; i++) { const xx = x + ph * 5 + i; if (g[y] && g[y][xx] === '.') k.px(g, xx, y, 'z'); } });
        return g;
      };
      // The egg seen edge-on mid-spin: drop two columns so it looks narrower.
      const thin = k.EGG_C2.map(r => r.slice(0, 2) + r.slice(3, 9) + r.slice(10));
      // Loose feathers: two-pixel quills.
      const feather = (g, x, y, c = 'M') => { k.px(g, x, y, c); k.px(g, x + 1, y - 1, 'L'); return g; };
      const feathers = (g, pts) => { pts.forEach(([x, y, c]) => feather(g, x, y, c)); return g; };

      // 1. The gust: wind lines, the egg rocks and spins.
      F(wind(k.egg(k.EGG_C2, 0, 0, k.lean(1)), 0), 110, 'a mountain gust');
      F(wind(k.egg(thin, 1), 1), 90);
      F(wind(k.egg(k.EGG_C2, 0, 0, { flipX: true }), 2), 90);
      F(wind(k.egg(thin, 1), 3), 90);
      F(wind(k.egg(k.EGG_C2, 0, -1, k.lean(1)), 4), 110);
      // 2. The top blows off and feathers burst from the crack.
      const lid = (dx, dy) => k.stamp(k.egg(k.EGG_BOTTOM), k.EGG_TOP, k.eggHome.x + dx, k.eggHome.y + dy);
      F(feathers(lid(3, -3), [[12, 9], [15, 8]]), 90, 'feathers burst');
      F(feathers(lid(9, -7), [[10, 6], [16, 5], [13, 3, 'k'], [7, 8]]), 90);
      F(feathers(lid(15, -11), [[8, 3], [18, 2], [13, 0, 'k'], [5, 6], [21, 7]]), 100);
      // The empty shell splits in two and the halves blow apart.
      const L = k.EGG_BOTTOM.map(r => r.slice(0, 6)), R = k.EGG_BOTTOM.map(r => '.'.repeat(6) + r.slice(6));
      const halves = (d, dy) => k.stamp(k.stamp(k.blank(), L, k.eggHome.x - d, k.eggHome.y + dy), R, k.eggHome.x + d, k.eggHome.y + dy);
      F(feathers(halves(1, 0), [[6, 1], [20, 0], [3, 5], [23, 4], [12, 6]]), 100);
      F(feathers(halves(4, 3), [[5, 3], [21, 2], [3, 8], [24, 7], [13, 9]]), 90);
      // 3. The shell is empty; feathers drift. Then Kuro drops from above, fan first.
      F(feathers(k.blank(), [[5, 6], [21, 5], [3, 11], [24, 10], [12, 13]]), 110, 'empty');
      const drop = (dy, pts) => feathers(k.at(idle, 0, dy), pts);
      F(drop(-17, [[4, 7], [22, 6], [2, 12], [24, 11]]), 70, 'Kuro drops in');
      F(drop(-11, [[4, 10], [23, 9], [2, 15], [25, 14]]), 70);
      F(drop(-5, [[3, 13], [24, 12], [1, 18], [25, 17]]), 70);
      // 4. Lands on one foot, wobbles, sets the other geta down.
      F(feathers(k.at(oneFoot, 0, 0), [[2, 16], [24, 15]]), 160, 'one-foot landing');
      F(feathers(k.at(oneFoot, 0, 0, k.lean(-1)), [[1, 19], [25, 18]]), 120);
      F(k.at(oneFoot, 0, 0, k.lean(1)), 120);
      F(k.at(oneFoot), 200);
      F(k.at(squash), 90);
      F(k.at(idle), 260);
      F(k.at(blink), 90);
      // 5. Fan flip: a stroke, over to the front, and back.
      F(k.at(fidget), 90, 'fan flip');
      F(k.at(fanFront), 160);
      F(wind(k.at(fanFront), 2), 120);
      F(k.at(idle), 160);
      // 6. The bow.
      F(k.at(bow), 420, 'bow');
      F(k.at(idle), 200);
      F(k.at(happy), 260);
      F(k.at(happy2), 260);
      F(k.at(idle), 300);
      return out;
    },
  });
})();
