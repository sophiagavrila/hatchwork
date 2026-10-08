// Akari: a legendary white Inari fox kit with vermilion kumadori, a red bib, three foxfire-tipped tails and a gold hoshu jewel.
(function () {
  const idle = [
    '..o........o...oco....',
    '.oWo......oso.occBo.o.',
    '.oWvo....ovsooWWWWsoco',
    '.oWvWo..oWvsooWWWWsoBo',
    '.oWvvWooWvvsooWWWWSoso',
    '.oWWWWvvWWWsooWWWsoWso',
    '.ovWWWWWWWWvooWWWSoWso',
    '.oWvheWWhevsoWWWsoWWSo',
    'oWWeeWWWWeeWsoWWSoWSo.',
    'oWWeeWWWWeeWsoWsoWSoo.',
    '.ooWWWWWWWWooWWSoSooco',
    '...oWWkkWWoWosSoYoocBo',
    '..oWvvoovvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSSoWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const idle2 = [
    '..o........o....oc....',
    '.oWo......oso.oBBcB.o.',
    '.oWvo....ovsooWWWWsoBo',
    '.oWvWo..oWvsooWWWWsoco',
    '.oWvvWooWvvsooWWWWSoso',
    '.oWWWWvvWWWsooWWWsoWso',
    '.ovWWWWWWWWvooWWWSoWso',
    '.oWvheWWhevsoWWWsoWWSo',
    'oWWeeWWWWeeWsoWWSoWSo.',
    'oWWeeWWWWeeWsoWsoWSoo.',
    '.ooWWWWWWWWooWWSoSooBo',
    '...oWWkkWWoWosSoYooBco',
    '..oWvvoovvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSSoWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const blink = [
    '..o........o...oco....',
    '.oWo......oso.occBo.o.',
    '.oWvo....ovsooWWWWsoco',
    '.oWvWo..oWvsooWWWWsoBo',
    '.oWvvWooWvvsooWWWWSoso',
    '.oWWWWvvWWWsooWWWsoWso',
    '.ovWWWWWWWWvooWWWSoWso',
    '.oWvWWWWWWvsoWWWsoWWSo',
    'oWWWWWWWWWWWsoWWSoWSo.',
    'oWWeeWWWWeeWsoWsoWSoo.',
    '.ooWWWWWWWWooWWSoSooco',
    '...oWWkkWWoWosSoYoocBo',
    '..oWvvoovvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSSoWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const talk = [
    '..o........o...oco....',
    '.oWo......oso.occBo.o.',
    '.oWvo....ovsooWWWWsoco',
    '.oWvWo..oWvsooWWWWsoBo',
    '.oWvvWooWvvsooWWWWSoso',
    '.oWWWWvvWWWsooWWWsoWso',
    '.ovWWWWWWWWvooWWWSoWso',
    '.oWvheWWhevsoWWWsoWWSo',
    'oWWeeWWWWeeWsoWWSoWSo.',
    'oWWeeWWWWeeWsoWsoWSoo.',
    '.ooWWWWWWWWooWWSoSooco',
    '...oWWkkWWoWosSoYoocBo',
    '..oWvoeeovVsWWoYhYoWso',
    '..oWVpoovVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSSoWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const talk2 = [
    '..o........o...oco....',
    '.oWo......oso.occBo.o.',
    '.oWvo....ovsooWWWWsoco',
    '.oWvWo..oWvsooWWWWsoBo',
    '.oWvvWooWvvsooWWWWSoso',
    '.oWWWWvvWWWsooWWWsoWso',
    '.ovWWWWWWWWvooWWWSoWso',
    '.oWvheWWhevsoWWWsoWWSo',
    'oWWeeWWWWeeWsoWWSoWSo.',
    'oWWeeWWWWeeWsoWsoWSoo.',
    '.ooWWWWWWWWooWWSoSooco',
    '...oWWkkWWoWosSoYoocBo',
    '..oWvveevvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSSoWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const happy = [
    '..o........o...oco....',
    '.oWo......oso.occBo.o.',
    '.oWvo....ovsooWWWWsoco',
    '.oWvWo..oWvsooWWWWsoBo',
    '.oWvvWooWvvsooWWWWSoso',
    '.oWWWWvvWWWsooWWWsoWso',
    '.ovWWWWWWWWvooWWWSoWso',
    '.oWvWWWWWWvsoWWWsoWWSo',
    'oWWWeWWWWeWWsoWWSoWSo.',
    'oWWeWeWWeWeWsoWsoWSoo.',
    '.opWWWWWWWWpoWWSoSooco',
    '...oWWkkWWoWosSoYoocBo',
    '..oWvvoovvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSSoWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const happy2 = [
    '..o........o....oc....',
    '.oWo......oso.oBBcB.o.',
    '.oWvo....ovsooWWWWsoBo',
    '.oWvWo..oWvsooWWWWsoco',
    '.oWvvWooWvvsooWWWWSoso',
    '.oWWWWvvWWWsooWWWsoWso',
    '.ovWWWWWWWWvooWWWSoWso',
    '.oWvWWWWWWvsoWWWsoWWSo',
    'oWWWeWWWWeWWsoWWSoWSo.',
    'oWWeWeWWeWeWsoWsoWSoo.',
    '.opWWWWWWWWpoWWSoSooBo',
    '...oWWkkWWoWosSoYooBco',
    '..oWvveevvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSSoWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const sleep = [
    '.....cccc......oBo....',
    '..o....c...o..oBBno.o.',
    '.oWo..c...osooWWWWsoBo',
    '.oWvoccccovsooWWWWsono',
    '.oWvvWooWvvsooWWWWSoso',
    '.oWWWWvvWWWsooWWWsoWso',
    '.ovWWWWWWWWvooWWWSoWso',
    '.oWvWWWWWWvsoWWWsoWWSo',
    'oWWWWWWWWWWWsoWWSoWSo.',
    'oWWeeWWWWeeWsoWsoWSoo.',
    '.ooWWWWWWWWooWWSoSooBo',
    '...oWWkkWWoWosSoYooBno',
    '..oWvvoovvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSSoWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const sleep2 = [
    '.....nnnn......oBo....',
    '..o....n...o..oBBno.o.',
    '.oWo..n...osooWWWWsoBo',
    '.oWvonnnnovsooWWWWsono',
    '.oWvvWooWvvsooWWWWSoso',
    '.oWWWWvvWWWsooWWWsoWso',
    '.ovWWWWWWWWvooWWWSoWso',
    '.oWvWWWWWWvsoWWWsoWWSo',
    'oWWWWWWWWWWWsoWWSoWSo.',
    'oWWeeWWWWeeWsoWsoWSoo.',
    '.ooWWWWWWWWooWWSoSooBo',
    '...oWWkkWWoWosSoYooBno',
    '..oWvvoovvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSSoWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const think = [
    '..o...YY...o...oco....',
    '.oWo.Y..Y.oso.occBo.o.',
    '.oWvo..Y.ovsooWWWWsoco',
    '.oWvWo.yoWvsooWWWWsoBo',
    '.oWvvWooWvvsooWWWWSoso',
    '.oWWWWvvWWWsooWWWsoWso',
    '.ovWWWWWWWWvooWWWSoWso',
    '.oWvehWWehvsoWWWsoWWSo',
    'oWWWeeWWWeeWsoWWSoWSo.',
    'oWWWWWWWWWWWsoWsoWSoo.',
    '.ooWWWWWWWWooWWSoSooco',
    '...oWWkkWWoWosSoYoocBo',
    '..oWvvoovvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSSoWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const fidget = [
    '...........o...oco....',
    '..........oso.occBo.o.',
    '..oo.....ovsooWWWWsoco',
    '.oWvoo..oWvsooWWWWsoBo',
    '.oWvvWooWvvsooWWWWSoso',
    '.oWWWWvvWWWsooWWWsoWso',
    '.ovWWWWWWWWvooWWWSoWso',
    '.oWvheWWhevsoWWWsoWWSo',
    'oWWeeWWWWeeWsoWWSoWSo.',
    'oWWeeWWWWeeWsoWsoWSoo.',
    '.ooWWWWWWWWooWWSoSooco',
    '...oWWkkWWoWosSoYoocBo',
    '..oWvvoovvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSSoWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const tails0 = [
    '..o........o..........',
    '.oWo......oso.........',
    '.oWvo....ovso.........',
    '.oWvWo..oWvso.........',
    '.oWvvWooWvvso.........',
    '.oWWWWvvWWWso.........',
    '.ovWWWWWWWWvo.........',
    '.oWvheWWhevso.........',
    'oWWeeWWWWeeWso........',
    'oWWeeWWWWeeWso........',
    '.ooWWWWWWWWooo..o.....',
    '...oWWkkWWoWosooYo....',
    '..oWvvoovvVsWWoYhYo...',
    '..oWVpvvvVsWWsoYYyo...',
    '.oWWWVvvVWsWWsSoyo....',
    '.oWWsWVVWsWWWsSoo.....',
    '.oWWsWWWWsWWWsSo......',
    '.oWWsWWWWsWWsSSo......',
    '.oWWoWWWWoWWsSo.......',
    '..oooooooooooo........',
  ];
  const tails1 = [
    '..o........o..........',
    '.oWo......oso.........',
    '.oWvo....ovso.........',
    '.oWvWo..oWvso.........',
    '.oWvvWooWvvso.........',
    '.oWWWWvvWWWso.........',
    '.ovWWWWWWWWvo.........',
    '.oWvheWWhevso.........',
    'oWWeeWWWWeeWso........',
    'oWWeeWWWWeeWso......o.',
    '.ooWWWWWWWWooo..o..oco',
    '...oWWkkWWoWosooYoocBo',
    '..oWvvoovvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSooWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const tails2 = [
    '..o........o...oco....',
    '.oWo......oso.occBo...',
    '.oWvo....ovsooWWWWso..',
    '.oWvWo..oWvsooWWWWso..',
    '.oWvvWooWvvsooWWWWSo..',
    '.oWWWWvvWWWsooWWWso...',
    '.ovWWWWWWWWvooWWWSo...',
    '.oWvheWWhevsoWWWso....',
    'oWWeeWWWWeeWsoWWSo....',
    'oWWeeWWWWeeWsoWso...o.',
    '.ooWWWWWWWWooWWSo..oco',
    '...oWWkkWWoWosSoYoocBo',
    '..oWvvoovvVsWWoYhYoWso',
    '..oWVpvvvVsWWsoYYyoWso',
    '.oWWWVvvVWsWWsSoyooWso',
    '.oWWsWVVWsWWWsSooWWWso',
    '.oWWsWWWWsWWWsSWWWWWSo',
    '.oWWsWWWWsWWsSSWWWWSo.',
    '.oWWoWWWWoWWsSosssSo..',
    '..oooooooooooo.oooo...',
  ];
  const TORII = [
    'v........................v',
    'vvvvvvvvvvvvvvvvvvvvvvvvvv',
    '.VVVVVVVVVVVVVVVVVVVVVVVV.',
    '....vV......vV......vV....',
    '..pvvvvvvvvvvvvvvvvvvvvp..',
    '....VV..............VV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
    '....vV..............vV....',
  ];
  const WISP = [
    '.c.',
    'cBc',
    'nBn',
    '.n.',
  ];
  const WISP2 = [
    '..c',
    '.cB',
    'cBn',
    '.n.',
  ];
  const FLAME1 = [
    '......c.....',
    '.....cc.....',
    '..c..cBc..c.',
    '..Bc.cBc.cB.',
    '.nBccBcccBn.',
    '.nBcchhccBn.',
    'nBBchhhhcBBn',
    'nBcchhhhccBn',
    'nBcchhhhccBn',
    'nBBcchhccBBn',
    '.nBBccccBBn.',
    '.nnBBBBBBnn.',
    '..nnnBBnnn..',
    '...nnnnnn...',
  ];
  const FLAME2 = [
    '..c....c..c.',
    '..B.c..B..B.',
    '.cn.Bc.c.cn.',
    '.B..cB.Bc.B.',
    '.n.cBcBcBn..',
    '..nBccccBn..',
    '..nBchhcBn..',
    '.nBchhhhcBn.',
    '.nBchhhhcBn.',
    '.nBcchhccBn.',
    '..nBccccBn..',
    '..nnBBBBnn..',
    '...nnBBnn...',
    '....nnnn....',
  ];
  PatchDex.register({
    id: "akari",
    name: "Akari",
    species: "inari foxfire kit",
    rarity: "legendary",
    blurb: "A white Inari messenger fox with vermilion shrine markings, three foxfire-tipped tails and a wish-jewel it guards more carefully than it lets on.",
    coaching: "Weighing alternatives: lighting up two or three approaches side by side before committing to one.",
    voice: "light two paths before you walk one.",
    hatch: "Foxfire wisps circle the egg, a vermilion torii rises behind it, the shell melts into blue flame and Akari steps through as its three tails bloom one by one.",
    palette: {
      o: '#2b2440', // outline
      W: '#fbfaf6', // white fur
      s: '#d5d8ec', // cool shadow
      S: '#a4a8cc', // deep shadow
      v: '#e8452c', // vermilion kumadori / bib
      V: '#a82a2a', // vermilion shade
      p: '#f58a5e', // vermilion light
      Y: '#f6cb4a', // gold jewel
      y: '#b9862a', // gold shade
      c: '#a8f4ff', // foxfire core
      B: '#4aa8ff', // foxfire
      n: '#2a5fd0', // foxfire dark
      e: '#1d1830', // eye / mouth
      h: '#ffffff', // shine
      k: '#3a2f4f', // nose
    },
    sprites: { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 20], ['idle2', 6], ['idle', 14], ['blink', 2], ['idle', 10], ['idle2', 6], ['idle', 12], ['fidget', 6], ['idle', 12], ['blink', 2], ['idle', 10], ['think', 10], ['idle2', 6], ['idle', 8]],
    entrance(k) {

      const out = k.eggIntro();
      const ex = k.eggHome.x, ey = k.eggHome.y;
      // Three foxfire wisps orbit the egg (120 degrees apart).
      const orbit = (g, step, r = 1, n = 3) => {
        for (let i = 0; i < n; i++) {
          const a = (step * 30 + i * 120) * Math.PI / 180;
          const x = Math.round(13 + 11 * r * Math.cos(a)), y = Math.round(12 + 7 * r * Math.sin(a));
          k.stamp(g, (step + i) % 2 ? WISP2 : WISP, x, y);
        }
        return g;
      };
      const BLUE = { map: { 0: 'n', 1: 'B', 2: 'c', 3: 'B', 4: 'c', 5: 'n', 6: 'B', 7: 'h' } };
      const torii = (g, tone) => {
        const t = k.blank();
        if (tone) k.stamp(t, TORII, 1, 0, tone === 'v' ? {} : { map: { v: tone, V: tone, p: tone } });
        return k.stamp(t, g.map(r => r.join ? r.join('') : r), 0, 0);
      };
      // Wisps appear one at a time.
      [1, 2, 3].forEach(n => out.push(k.f(orbit(k.egg(k.EGG_C2), 0, 1, n), 220, n === 1 ? { note: 'foxfire' } : {})));
      // ...and circle.
      for (let s = 1; s <= 6; s++) out.push(k.f(orbit(k.egg(k.EGG_C2), s), 100));
      // A torii fades in behind the egg.
      [['k', 7], ['V', 8], ['v', 9]].forEach(([t, s], i) => out.push(k.f(torii(orbit(k.egg(k.EGG_C2), s), t), 160, i === 0 ? { note: 'torii' } : {})));
      // The egg melts into blue flame as the wisps fall inward.
      out.push(k.f(torii(orbit(k.egg(k.EGG_C2, 0, 0, BLUE), 10, 0.75), 'v'), 160, { note: 'blue flame' }));
      let g = k.egg(k.EGG_BOTTOM, 0, 0, BLUE); k.stamp(g, FLAME2, ex, ey - 3);
      out.push(k.f(torii(orbit(g, 11, 0.5), 'v'), 120));
      g = k.blank(); k.stamp(g, FLAME1, ex, ey);
      out.push(k.f(torii(g, 'v'), 140));
      g = k.blank(); k.stamp(g, FLAME2, ex, ey - 1);
      out.push(k.f(torii(g, 'v'), 140));
      // Akari steps out of the flame, through the gate.
      g = k.blank(); k.stamp(g, FLAME2, ex, ey - 2); k.over(g, tails0, 0, 1, { map: { o: 'B', e: 'n', h: 'n', k: 'n', v: 'B', V: 'B', p: 'B', Y: 'h', y: 'B' }, fill: 'c' });
      out.push(k.f(torii(g, 'v'), 180, { note: 'steps through' }));
      g = k.at(tails0, 0, 1); [[7, 21], [10, 20], [16, 21], [19, 19]].forEach(([x, y]) => k.px(g, x, y, 'B'));
      out.push(k.f(torii(g, 'v'), 160));
      out.push(k.f(torii(k.at(tails0), 'v'), 320));
      // Tails fan out one by one, each tip catching fire.
      g = k.at(tails1); k.px(g, 23, 10, 'c'); k.px(g, 24, 11, 'B');
      out.push(k.f(torii(g, 'v'), 260, { note: 'one tail' }));
      g = k.at(tails2); k.px(g, 19, 0, 'c'); k.px(g, 20, 1, 'B');
      out.push(k.f(torii(g, 'V'), 260, { note: 'two' }));
      g = k.at('idle'); k.px(g, 24, 1, 'c'); k.px(g, 25, 2, 'B');
      out.push(k.f(torii(g, 'k'), 320, { note: 'three' }));
      // The jewel glints.
      g = k.at('idle'); [[19, 10], [19, 19], [16, 14], [23, 14]].forEach(([x, y]) => k.px(g, x, y, 'h'));
      out.push(k.f(g, 280, { note: 'jewel' }));
      out.push(k.f(k.at('happy'), 220), k.f(k.at('happy2', 0, -1), 160), k.f(k.at('happy'), 260));
      out.push(k.f(k.at('blink'), 110), k.f(k.at('idle'), 420));
      return out;
    },
  });
})();
