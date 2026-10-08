(function () {
  const idle = [
    '.oo.......oo..........',
    'ohno.....onGo.........',
    'ohnnooooonnGo.........',
    'ohhhhggggggGo.........',
    'ohhgggggggGGooooo.....',
    'ohggggggggGGohhhhoo...',
    'ohgwegggwegGohhhgggo..',
    'ohgeAgggeAgGohgggggGo.',
    'ohgggWnWgggGogggggggGo',
    'ogggWWoWWggGoGggggggGo',
    '.oggcoWocgGooogggggGGo',
    'ohgDoccccoDoGDoooooooo',
    'ohgWWcgWWcDoGhhhhhggGo',
    'ohgWWcgWWcGoggggggGGDo',
    '.oGcccGcccooDDDDDDDDo.',
    '..oooooooooooooooooo..',
  ];
  const blink = [
    '.oo.......oo..........',
    'ohno.....onGo.........',
    'ohnnooooonnGo.........',
    'ohhhhggggggGo.........',
    'ohhgggggggGGooooo.....',
    'ohggggggggGGohhhhoo...',
    'ohgggggggggGohhhgggo..',
    'ohgeegggeegGohgggggGo.',
    'ohgggWnWgggGogggggggGo',
    'ogggWWoWWggGoGggggggGo',
    '.oggcoWocgGooogggggGGo',
    'ohgDoccccoDoGDoooooooo',
    'ohgWWcgWWcDoGhhhhhggGo',
    'ohgWWcgWWcGoggggggGGDo',
    '.oGcccGcccooDDDDDDDDo.',
    '..oooooooooooooooooo..',
  ];
  const talk = [
    '.oo.......oo..........',
    'ohno.....onGo.........',
    'ohnnooooonnGo.........',
    'ohhhhggggggGo.........',
    'ohhgggggggGGooooo.....',
    'ohggggggggGGohhhhoo...',
    'ohgwegggwegGohhhgggo..',
    'ohgeAgggeAgGohgggggGo.',
    'ohgggWnWgggGogggggggGo',
    'ogggWoooWggGoGggggggGo',
    '.oggconocgGooogggggGGo',
    'ohgDoccccoDoGDoooooooo',
    'ohgWWcgWWcDoGhhhhhggGo',
    'ohgWWcgWWcGoggggggGGDo',
    '.oGcccGcccooDDDDDDDDo.',
    '..oooooooooooooooooo..',
  ];
  const happy = [
    '.oo.......oo..........',
    'ohno.....onGo.........',
    'ohnnooooonnGo.........',
    'ohhhhggggggGo.........',
    'ohhgggggggGGooooo.....',
    'ohggggggggGGohhhhoo...',
    'ohgeegggeegGohhhgggo..',
    'oheggegeggeGohgggggGo.',
    'ohgggWnWgggGogggggggGo',
    'ogggWoooWggGoGggggggGo',
    '.oggconocgGooogggggGGo',
    'ohgDoccccoDoGDoooooooo',
    'ohgWWcgWWcDoGhhhhhggGo',
    'ohgWWcgWWcGoggggggGGDo',
    '.oGcccGcccooDDDDDDDDo.',
    '..oooooooooooooooooo..',
  ];
  const happy2 = [
    '.oo.......oo..........',
    'ohno.....onGo.........',
    'ohnnooooonnGo.........',
    'ohhhhggggggGo.........',
    'ohhgggggggGGooooo.....',
    'ohggggggggGGohhhhoo...',
    'ohgeegggeegGohhhgggo..',
    'oheggegeggeGohgggggGo.',
    'ohgggWnWgggGooggggggGo',
    'ogggWoooWggGGDggggggGo',
    '.oggconocgGoGGgggggGGo',
    'ohgDoccccoDoGooooooooo',
    'ohgWWcgWWcDoGhhhhhggGo',
    'ohgWWcgWWcGoggggggGGDo',
    '.oGcccGcccooDDDDDDDDo.',
    '..oooooooooooooooooo..',
  ];
  const sleep = [
    '......................',
    '.oo.....oo........hhhh',
    'ohnooooonnGo........h.',
    'ohhhhggggggGo......h..',
    'ohhgggggggGGooooo.hhhh',
    'ohggggggggGGohhhhoo...',
    'ohgggggggggGohhhgggo..',
    'ohgeegggeegGohgggggGo.',
    'ohgggWnWgggGogggggggGo',
    'ogggWWoWWggGoGggggggGo',
    '.oggcoWocgGooogggggGGo',
    'ohgDoccccoDoGDoooooooo',
    'ohgWWcgWWcDoGhhhhhggGo',
    'ohgWWcgWWcGoggggggGGDo',
    '.oGcccGcccooDDDDDDDDo.',
    '..oooooooooooooooooo..',
  ];
  const sleep2 = [
    '..............hhhh....',
    '.oo.....oo......h.....',
    'ohnooooonnGo...h......',
    'ohhhhggggggGo.hhhh....',
    'ohhgggggggGGooooo.....',
    'ohggggggggGGohhhhoo...',
    'ohgggggggggGohhhgggo..',
    'ohgeegggeegGohgggggGo.',
    'ohgggWnWgggGogggggggGo',
    'ogggWWoWWggGoGggggggGo',
    '.oggcooocgGooogggggGGo',
    'ohgDoccccoDoGDoooooooo',
    'ohgWWcgWWcDoGhhhhhggGo',
    'ohgWWcgWWcGoggggggGGDo',
    '.oGcccGcccooDDDDDDDDo.',
    '..oooooooooooooooooo..',
  ];
  const think = [
    '.oo.......oo....aa....',
    'ohno.....onGo.....a...',
    'ohnnooooonnGo....a....',
    'ohhhhggggggGo.........',
    'ohhgggggggGGoooooa....',
    'ohggwegggweGohhhhoo...',
    'ohggeAgggeAGohhhgggo..',
    'ohgggggggggGohgggggGo.',
    'ohgggWnWgggGogggggggGo',
    'ogggWWoWWggGoGggggggGo',
    '.oggcWWocgGooogggggGGo',
    'ohgDoccccoDoGDoooooooo',
    'ohgWWcgWWcDoGhhhhhggGo',
    'ohgWWcgWWcGoggggggGGDo',
    '.oGcccGcccooDDDDDDDDo.',
    '..oooooooooooooooooo..',
  ];
  const fidget = [
    '.oo.......oo..........',
    'ohno.....onGo.........',
    'ohnnooooonnGo.........',
    'ohhhhggggggGo.........',
    'ohhgggggggGGooooo.....',
    'ohggggggggGGohhhhoo...',
    'ohgwegggwegGohhhgggo..',
    'ohgeAgggeAgGohgggggGo.',
    'ohgggWnWgggGooggggggGo',
    'ogggWWoWWggGGDggggggGo',
    '.oggcoWocgGoGGgggggGGo',
    'ohgDoccccoDoGooooooooo',
    'ohgWWcgWWcDoGhhhhhggGo',
    'ohgWWcgWWcGoggggggGGDo',
    '.oGcccGcccooDDDDDDDDo.',
    '..oooooooooooooooooo..',
  ];
  const fidget2 = [
    '.oo........o..........',
    'ohno.....oGGo.........',
    'ohnnooooonnGo.........',
    'ohhhhggggggGo.........',
    'ohhgggggggGGooooo.....',
    'ohggggggggGGohhhhoo...',
    'ohgwegggwegGohhhgggo..',
    'ohgeAgggeAgGohgggggGo.',
    'ohgggWnWgggGogggggggGo',
    'ogggWWoWWggGoGggggggGo',
    '.oggcoWocgGooogggggGGo',
    'ohgDoccccoDoGDoooooooo',
    'ohgWWcgWWcDoGhhhhhggGo',
    'ohgWWcgWWcGoggggggGGDo',
    '.oGcccGcccooDDDDDDDDo.',
    '..oooooooooooooooooo..',
  ];

  // Entrance: the egg's bottom half becomes a little box (drawn in the shared egg palette).
  const BOX_BACK = ['0000000000000000', '0333333333333330'];
  const BOX_FRONT = ['0222222222222330', '0111111111111330', '0146464646464130', '0111111111111330', '0111111111113330', '0000000000000000'];
  const BOXING = ['...0000000000...', '..033333333330..', '.01222222223330.', '.01111111113330.', '0146464646461330', '.01111111113330.', '..000000000000..'];
  const PAW = ['.oo.', 'oWWo', 'oWco'];
  const head = n => n.slice(0, 12).map(r => r.slice(0, 13));

  PatchDex.register({
    id: 'mochi',
    name: 'Mochi',
    species: 'loaf-shaped smoke cat',
    rarity: 'common',
    blurb: 'Folds into a perfect loaf whenever things get noisy.',
    coaching: 'Knowing when to stop: take a break, wrap up, start a fresh session.',
    voice: 'good place to stop. save it and start fresh.',
    hatch: 'The egg bottom becomes a little box; Mochi climbs in, turns once, and loafs.',
    palette: {
      o: '#2b2733', h: '#cdc8d0', g: '#9a94a0', G: '#736d7c', D: '#4f4a59',
      W: '#fbf7ef', c: '#d8cfc4', a: '#f2b13a', A: '#c0701e', e: '#2a1f1a', w: '#ffffff', n: '#f2a0aa'
    },
    sprites: { idle, blink, talk, happy, happy2, sleep, sleep2, think, fidget, fidget2 },
    loop: [['idle', 28], ['blink', 2], ['idle', 16], ['fidget', 3], ['idle', 2], ['fidget', 3], ['idle', 18], ['blink', 2], ['idle', 8], ['fidget2', 2], ['idle', 12], ['think', 12], ['idle', 8]],
    entrance(k) {
      const BX = 6, BY = 14;
      const box = (g = k.blank(), dy = 0) => { k.stamp(g, BOX_BACK, BX, BY + dy); return k.stamp(g, BOX_FRONT, BX, BY + 2 + dy); };
      const behind = (rows, x, y) => box(k.stamp(k.blank(), rows, x, y));
      const inBox = (n, dy = 0, o, bdy = 0) => {
        const g = k.stamp(k.blank(), BOX_BACK, BX, BY + bdy);
        k.over(g, n, 0, dy, o);
        return k.stamp(g, BOX_FRONT, BX, BY + 2 + bdy);
      };
      const top = dy => k.stamp(k.egg(k.EGG_BOTTOM), k.EGG_TOP, k.eggHome.x + 1, k.eggHome.y + dy);
      return [
        ...k.eggIntro(),
        // The top pops off; the bottom half squares up into a box.
        k.f(top(-3), 110, { note: 'pop' }), k.f(top(-8), 100), k.f(k.egg(k.EGG_BOTTOM), 220),
        k.f(k.stamp(k.blank(), BOXING, BX, BY + 1), 130),
        k.f(k.sparkle(box(), 1), 140),
        k.f(box(), 420, { note: 'a box' }),
        // Something wants in.
        k.f(k.stamp(box(), PAW, 10, 12), 260, { note: 'paw' }),
        k.f(box(), 160),
        k.f(behind(head(idle), 8, 11), 220, { note: 'ears' }),
        k.f(behind(head(idle), 8, 6), 380, { note: 'peek' }),
        k.f(behind(head(blink), 8, 6), 140),
        // Hop in.
        k.f(inBox('idle', -7), 110, { note: 'hop' }),
        k.f(inBox('idle', -3), 80),
        k.f(inBox('idle', 1), 90),
        k.f(inBox('idle', 0), 140),
        // Turn once.
        k.f(inBox('idle', 0, { flipX: true }), 240, { note: 'turn' }),
        k.f(inBox('blink', 1, { flipX: true }), 120),
        k.f(inBox('idle', 0), 200),
        k.f(inBox('blink', 1), 220, { note: 'settle' }),
        k.f(inBox('idle', 0), 420, { note: 'if it fits' }),
        k.f(inBox('happy', 0), 220, { note: 'happy' }), k.f(inBox('happy2', 0), 220), k.f(inBox('happy', 0), 200),
        // The box folds away underneath.
        k.f(inBox('idle', 0, undefined, 2), 110), k.f(inBox('idle', 0, undefined, 4), 110),
        k.f(k.at('idle'), 500),
      ];
    },
  });
})();
