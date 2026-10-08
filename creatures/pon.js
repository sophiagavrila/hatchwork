// Pon — tanuki shapeshifter. Leaf on its head, charcoal mask, ringed tail.
(function () {
  const idle = [
    '.........GG...........',
    '..oo..GGhhgGoo........',
    '.okkGghgggGokko.......',
    '.okboGGGoooobko.......',
    '.obllddbbbbbbdo..oo...',
    '.olccbbbbbbccdo.okko..',
    'olbkkbbbbbbkkbdokkkko.',
    'olkwekbbbbkwekdobllbdo',
    'olkeekbbbbkeekdoblbbdo',
    'okkeekcccckeekkokkkkko',
    'okkkkcceecckkkkokkkkko',
    '.obpccDccDccpdoblbbdo.',
    '..odbsccccsbdobbbbbdo.',
    '..okkddddddkkokkkkko..',
    '.odkbccccccbkdokkko...',
    '.odkccccccsskdobbo....',
    '.oDdbccccssbdDobo.....',
    '..okkkoooookkkooo.....',
  ];
  const W = idle[0].length;
  // Replace rows by index: mod(base, {7: '...'}). Short rows replace the left part only.
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
  // Drop the head/body 1px by removing a row and padding the top (squash / slump).
  const sink = (base, row) => ['.'.repeat(W), ...base.slice(0, row), ...base.slice(row + 1)];
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const eyesClosed = { 7: 'olkkkkbbbbkkkkdo', 8: 'olkeekbbbbkeekdo', 9: 'okkkkkcccckkkkko' };
  const eyesHappy = { 7: 'olkeekbbbbkeekdo', 8: 'olekkebbbbekkedo', 9: 'okkkkkcccckkkkko' };
  const eyesSleep = { 7: 'olkkkkbbbbkkkkdo', 8: 'olekkebbbbekkedo', 9: 'okkeekcccckeekko' };
  const blink = mod(idle, eyesClosed);
  const talk = mod(idle, { 11: '.obpcccDDcccpdo', 12: '..odbscppcsbdo' });
  const happy = mod(idle, { ...eyesHappy, 11: '.obpccDppDccpdo', 12: '..odbscDDcsbdo' });
  const happy2 = sink(happy, 13);
  const think = put(mod(idle, { 7: 'olkkwebbbbkkwedo', 8: 'olkkeebbbbkkeedo', 9: 'okkkkkcccckkkkko', 11: '.obpccccDDccpdo' }),
    19, 0, ['zz.', '..z', '.z.', '...', '.z.']);
  // Fidget: the tail swishes up a pixel and the leaf slides right, like a twitch.
  const fidget = (() => {
    const g = idle.map(r => [...r]);
    for (let x = 16; x < W; x++) {
      for (let y = 0; y < g.length - 1; y++) g[y][x] = idle[y + 1][x];
      g[g.length - 1][x] = '.';
    }
    const rows = g.map(r => r.join(''));
    return mod(rows, { 0: '..........GG..........', 1: '..oo...GGhhgGoo.' + rows[1].slice(16), 2: '.okkGGghgggGkko.' + rows[2].slice(16) });
  })();
  const sleepBase = sink(mod(idle, { ...eyesSleep, 11: '.obpccccccccpdo' }), 13);
  const Z = ['zzzz', '...z', '..z.', '.z..', 'zzzz'];
  const sleep = put(sleepBase, 17, 0, Z);
  const sleep2 = put(sleepBase, 18, 0, ['zzz', '..z', '.z.', 'zzz']);
  PatchDex.register({
    id: 'pon', name: 'Pon', species: 'leaf-cap tanuki', rarity: 'uncommon',
    blurb: 'A cheerful shapeshifter who can become anything, as long as you describe it exactly.',
    coaching: 'Prompt specificity: name the target, the constraints, and what done looks like.',
    voice: 'say what it should become, not just what to change.',
    hatch: 'The egg vanishes in a puff of smoke, a leaf flutters down, and Pon is standing there mid-pose.',
    palette: {
      o: '#3d1f1c', l: '#eaa565', b: '#c9733f', d: '#93472c', D: '#5a2a22',
      k: '#5e5058', e: '#1b1218', w: '#fff8ec', z: '#b9c6e6', c: '#f7e6c8', s: '#d8b48e',
      S: '#f1edf6', T: '#c3bad2', O: '#7d7290',
      g: '#7fbf4a', G: '#3f7a33', h: '#c4e87a', p: '#ee8a78',
    },
    sprites: { idle, blink, talk, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 22], ['blink', 2], ['idle', 16], ['fidget', 2], ['idle', 2], ['fidget', 2], ['idle', 2], ['fidget', 2], ['idle', 14], ['blink', 2], ['idle', 12], ['think', 10], ['idle', 8]],
    entrance(k) {
      const out = k.eggIntro();
      // Smoke: union of round puffs. Edge = O, lower-right rim = T, body = S.
      const smoke = (g, puffs) => {
        const inn = (x, y) => puffs.some(([cx, cy, r]) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r + r * 0.6);
        for (let y = 0; y < k.H; y++) for (let x = 0; x < k.W; x++) {
          if (!inn(x, y)) continue;
          const edge = !inn(x - 1, y) || !inn(x + 1, y) || !inn(x, y - 1) || !inn(x, y + 1);
          // Seams where one puff tucks under another give the cloud its lumpy cartoon read.
          const seam = puffs.some(([cx, cy, r], i) => i > 0 && Math.abs(Math.hypot(x - cx, y - cy) - r) < 0.5 && y < cy - r * 0.35);
          g[y][x] = edge ? 'O' : (seam || !inn(x + 1, y + 1) || !inn(x, y + 2) ? 'T' : 'S');
        }
        return g;
      };
      const leafA = ['...oo', '.ohgo', 'oGgo.', '.oo..'], leafB = ['oo...', 'ohgo.', '.oGgo', '..oo.'], leafC = ['.ooo.', 'ohhgo', 'oGGGo', '.ooo.'];
      const leaf = (g, rows, x, y) => k.stamp(g, rows, x, y);
      const egg2 = () => k.egg(k.EGG_C2);
      const P1 = [[14, 15, 4], [10, 17, 3], [18, 17, 3]];
      const P2 = [[14, 13, 6], [8, 16, 4], [20, 16, 4], [11, 18, 4], [17, 18, 4]];
      const P3 = [[14, 11, 7], [6, 15, 5], [22, 15, 5], [10, 18, 5], [18, 18, 5], [14, 18, 5]];
      const P4 = [[13, 11, 7], [7, 14, 5], [21, 15, 5], [9, 18, 5], [19, 17, 5], [14, 18, 5]];
      const thin = [[3, 18, 2], [25, 17, 2], [6, 20, 2], [22, 20, 2], [2, 13, 1]];
      const wisps = [[2, 11, 1], [26, 15, 1]];
      out.push(
        k.f(k.egg(k.EGG_C2, 0, 0, k.lean(1)), 70),
        k.f(k.egg(k.EGG_C2, 0, 0, k.lean(-1)), 70),
        k.f(smoke(egg2(), P1), 80, { note: 'POOF' }),
        k.f(smoke(k.blank(), P2), 90),
        k.f(smoke(k.blank(), P3), 160),
        k.f(leaf(smoke(k.blank(), P4), leafA, 16, 0), 150),
        k.f(leaf(smoke(k.blank(), P3), leafB, 11, 1), 150),
        k.f(leaf(smoke(k.blank(), P4), leafA, 14, 2), 150, { note: 'a leaf flutters down' }),
        k.f(leaf(smoke(k.at('happy', 0, 0), thin), leafC, 9, 0), 120),
        k.f(smoke(k.at('happy', 0, 0), wisps), 280, { note: 'ta-da' }),
        k.f(k.at('happy2'), 110),
        k.f(k.at('happy'), 300),
        k.f(k.at('fidget'), 140),
        k.f(k.at('idle'), 160),
        k.f(k.at('blink'), 110),
        k.f(k.at('idle'), 420),
      );
      return out;
    },
  });
})();
