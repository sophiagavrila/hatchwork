// Axo — axolotl. Regenerates, so it coaches recovery and fix-forward.
(function () {
  const idle = [
    '.G.....OOOooo.....g.',
    '.gG..OOppppbboo..gg.',
    '..hgOppppbbbbbdogh..',
    '...Oppwebbbbwebdo...',
    'GGgopbeebbbbeebdoggg',
    'hhhobGeebbbbeeGdohhh',
    '.Ggobbbmbbbbmbddogg.',
    'Gh..obbbmmmmddso..hg',
    'h....oooooooooo....h',
    '......osddddso...oo.',
    '.....obpcccbdso.opso',
    '....obpccccbddsoobso',
    '....obcccccbbdsobdso',
    '....obbcccbbddsssoo.',
    '....obbbbobbddsoo...',
    '.....oooo.oooooo....',
  ];
  const blink = [
    '.G.....OOOooo.....g.',
    '.gG..OOppppbboo..gg.',
    '..hgOppppbbbbbdogh..',
    '...Opppbbbbbbbbdo...',
    'GGgopbeebbbbeebdoggg',
    'hhhobGbbbbbbbbGdohhh',
    '.Ggobbbmbbbbmbddogg.',
    'Gh..obbbmmmmddso..hg',
    'h....oooooooooo....h',
    '......osddddso...oo.',
    '.....obpcccbdso.opso',
    '....obpccccbddsoobso',
    '....obcccccbbdsobdso',
    '....obbcccbbddsssoo.',
    '....obbbbobbddsoo...',
    '.....oooo.oooooo....',
  ];
  const talk = [
    '.G.....OOOooo.....g.',
    '.gG..OOppppbboo..gg.',
    '..hgOppppbbbbbdogh..',
    '...Oppwebbbbwebdo...',
    'GGgopbeebbbbeebdoggg',
    'hhhobGeebbbbeeGdohhh',
    '.Ggobbbmmmmmmbddogg.',
    'Gh..obbbmeemddso..hg',
    'h....oooooooooo....h',
    '......osddddso...oo.',
    '.....obpcccbdso.opso',
    '....obpccccbddsoobso',
    '....obcccccbbdsobdso',
    '....obbcccbbddsssoo.',
    '....obbbbobbddsoo...',
    '.....oooo.oooooo....',
  ];
  const happy = [
    '.G.....OOOooo.....g.',
    '.gG..OOppppbboo..gg.',
    '..hgOppppbbbbbdogh..',
    '...Oppeebbbbeebdo...',
    'GGgopebbebbebbedoggg',
    'hhhobGbbbbbbbbGdohhh',
    '.Ggobbbmeeeembddogg.',
    'Gh..obbbmGGmddso..hg',
    'h....oooooooooo....h',
    '......osddddso...oo.',
    '.....obpcccbdso.opso',
    '....obpccccbddsoobso',
    '....obcccccbbdsobdso',
    '....obbcccbbddsssoo.',
    '....obbbbobbddsoo...',
    '.....oooo.oooooo....',
  ];
  const happy2 = [
    'G......OOOooo......g',
    '.gG..OOppppbboo..gg.',
    '..hgOppppbbbbbdogh..',
    'GGgOppeebbbbeebdoggg',
    'hhhopebbebbebbedohhh',
    '.GgobGbbbbbbbbGdogg.',
    'Gh.obbbmeeeembddo.hg',
    'h...obbbmGGmddso...h',
    '.....oooooooooo.....',
    '......osddddso...oo.',
    '.....obpcccbdso.opso',
    '....obpccccbddsoobso',
    '....obcccccbbdsobdso',
    '....obbcccbbddsssoo.',
    '....obbbbobbddsoo...',
    '.....oooo.oooooo....',
  ];
  const sleep = [
    '.......OOOooo.......',
    '.....OOppppbboo.....',
    '....Oppppbbbbbdo....',
    '..gOppbbbbbbbbbdog..',
    '.hgopbbbbbbbbbbdogh.',
    'GGgobGeebbbbeeGdoggg',
    'hhhobbbbbbbbbbddohhh',
    '..Ggobbbbmmbddsogg..',
    '.Gh..oooooooooo..hg.',
    'h.....osddddso.....h',
    '.....obpcccbdso.opso',
    '....obpccccbddsoobso',
    '....obcccccbbdsobdso',
    '....obbcccbbddsssoo.',
    '....obbbbobbddsoo...',
    '.....oooo.oooooo....',
  ];
  const sleep2 = [
    '.......OOOooo.......',
    '.....OOppppbboo.....',
    '....Oppppbbbbbdo....',
    '..gOppbbbbbbbbbdog..',
    '.hgopbbbbbbbbbbdogh.',
    'GGgobGeebbbbeeGdoggg',
    'hhhobbbbbmmbbbddohhh',
    '..Ggobbbbeebddsogg..',
    '.Gh..oooooooooo..hg.',
    'h.....osddddso.....h',
    '.....obpcccbdso.opso',
    '....obpccccbddsoobso',
    '....obcccccbbdsobdso',
    '....obbcccbbddsssoo.',
    '....obbbbobbddsoo...',
    '.....oooo.oooooo....',
  ];
  const think = [
    '.G.....OOOooo.....g.',
    '.gG..OOppppbboo..gg.',
    '..hgOppppbbbbbdogh..',
    '...Oppewbbbbewbdo...',
    'GGgopbeebbbbeebdoggg',
    'hhhobGbbbbbbbbGdohhh',
    '.Ggobbbbbbbbbbddogg.',
    'Gh..obbbbmmbddso..hg',
    'h....oooooooooo....h',
    '......osddddso...oo.',
    '.....obpcccbdso.opso',
    '....obpccccbddsoobso',
    '....obcccccbbdsobdso',
    '....obbcccbbddsssoo.',
    '....obbbbobbddsoo...',
    '.....oooo.oooooo....',
  ];
  const fidget = [
    'G......OOOooo......g',
    '.gG..OOppppbboo..gg.',
    '..hgOppppbbbbbdogh..',
    'GGgOppwebbbbwebdoggg',
    'hhhopbeebbbbeebdohhh',
    '.GgobGeebbbbeeGdogg.',
    'Gh.obbbmbbbbmbddo.hg',
    'h...obbbmmmmddso...h',
    '.....oooooooooo.....',
    '......osddddso...oo.',
    '.....obpcccbdso.opso',
    '....obpccccbddsoobso',
    '....obcccccbbdsobdso',
    '....obbcccbbddsssoo.',
    '....obbbbobbddsoo...',
    '.....oooo.oooooo....',
  ];
  PatchDex.register({
    id: 'axo', name: 'Axo', species: 'pond axolotl sprite', rarity: 'uncommon',
    blurb: 'Unbothered and gently persistent; it has regrown worse than this.',
    coaching: 'Iterating after failure: read the error, change one thing, retry smarter.',
    voice: 'that failed. read the error, change one thing, run again.',
    hatch: 'Water seeps from the crack and Axo floats out in a bubble that pops.',
    palette: {
      o: '#6b2348', p: '#ffe6e3', b: '#f7a3bd', d: '#d6789f', s: '#ad5689', 
      G: '#ff8fb1', g: '#e8457e', h: '#a3235a', e: '#2b1426', w: '#ffffff', m: '#b8406a', c: '#ffcfdc', O: '#a5476f', q: '#8fd3ee',
    },
    sprites: { idle, blink, talk, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 30], ['blink', 2], ['idle', 24], ['fidget', 5], ['idle', 18], ['blink', 2], ['idle', 6], ['blink', 2]],
    entrance(k) {
      // Bubble rim: stair-stepped ellipse with a shine in the top-left.
      const bubble = (g, cx, cy, rx, ry) => {
        for (let y = -ry; y <= ry; y++) {
          const x = Math.round(rx * Math.sqrt(1 - (y / ry) ** 2));
          k.px(g, Math.round(cx - x), Math.round(cy + y), 'q'); k.px(g, Math.round(cx + x), Math.round(cy + y), 'q');
        }
        for (let x = -rx; x <= rx; x++) {
          const y = Math.round(ry * Math.sqrt(1 - (x / rx) ** 2));
          k.px(g, Math.round(cx + x), Math.round(cy - y), 'q'); k.px(g, Math.round(cx + x), Math.round(cy + y), 'q');
        }
        if (rx >= 4) { k.px(g, Math.round(cx - rx * 0.55), Math.round(cy - ry * 0.55), 'w'); k.px(g, Math.round(cx - rx * 0.55) + 1, Math.round(cy - ry * 0.55) - 1, 'w'); }
        return g;
      };
      const pop = (cx, cy, r, n) => g => {
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + 0.3;
          k.px(g, Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.8), i % 3 ? 'q' : 'w');
        }
        return g;
      };
      const drip = (g, pts) => { pts.forEach(([x, y]) => k.px(g, k.eggHome.x + x, k.eggHome.y + y, 'q')); return g; };
      const inBubble = (dy, rx = 12, ry = 10) => k.over(bubble(k.blank(), 13.5, 14.5 + dy, rx, ry), 'sleep', 0, dy);
      return [
        ...k.eggIntro(),
        k.f(drip(k.egg(k.EGG_C2), [[2, 5], [9, 6]]), 160, { note: 'water seeps from the crack' }),
        k.f(drip(k.egg(k.EGG_C2), [[2, 6], [2, 8], [9, 7], [9, 9], [5, 5]]), 160),
        k.f(drip(k.egg(k.EGG_C2), [[2, 9], [2, 11], [9, 10], [9, 12], [5, 6], [6, 5]]), 200),
        k.f(bubble(k.stamp(k.egg(k.EGG_BOTTOM), k.EGG_TOP, k.eggHome.x, k.eggHome.y - 3), 13.5, 11, 3, 3), 120, { note: 'top pops, a bubble rises' }),
        k.f(bubble(k.stamp(k.egg(k.EGG_BOTTOM, 0, 2), k.EGG_TOP, k.eggHome.x + 1, k.eggHome.y - 8), 13.5, 8, 6, 5), 120),
        k.f(bubble(k.egg(k.EGG_BOTTOM, 0, 6), 13.5, 7, 9, 7), 110),
        k.f(inBubble(-4), 260, { note: 'Axo floats, asleep' }),
        k.f(inBubble(-3), 220),
        k.f(inBubble(-4), 220),
        k.f(inBubble(-3), 220),
        k.f(inBubble(-4, 13, 9), 90),
        k.f(inBubble(-4, 12, 10), 90),
        k.f(pop(13.5, 10.5, 12, 14)(k.at('blink', 0, -3)), 90, { note: 'pop' }),
        k.f(pop(13.5, 10.5, 13, 10)(k.at('talk', 0, -2)), 110),
        k.f(k.at('fidget', 0, -1), 100),
        k.f(k.at('fidget'), 120),
        k.f(k.at('idle'), 300),
        k.f(k.at('blink'), 110),
        k.f(k.at('idle'), 220),
        k.f(k.at('happy'), 260, { note: 'happy' }),
        k.f(k.at('happy2', 0, -1), 200),
        k.f(k.at('happy'), 260),
        k.f(k.at('idle'), 500),
      ];
    },
  });
})();
