// Dotty — round ladybug with big eyes and a spotted shell. Coaches debugging: reproduce first, then fix.
(function () {
  const idle = [
    '.....OO......OO.....',
    '....OHhO....OHhO....',
    '.....OO......OO.....',
    '......O......O......',
    '.......OOOOOO.......',
    '.....OHHhhhhhKO.....',
    '....OHWWWhhWWWKO....',
    '...OhhWeehheeWhKO...',
    '..OOhhWeehheeWhKOO..',
    '.OlOhpWWWhhWWWpKORO.',
    '.OlwOhhhhHHhhhKOrRO.',
    'OrlKKOOKKKKKKOOKKRRO',
    'OrlKKrrOOOOOOrrKKRRO',
    'OrrrrrrrrOOrrrrrrRRO',
    'ORrrrKKrrOOrrKKrRRRO',
    '.ORrrKKrrOOrrKKRRRO.',
    '..ORRRrrrOOrrRRRRO..',
    '...OOOOOOOOOOOOOO...',
    '.....OKKO..OKKO.....',
  ];
  const blink = [
    '.....OO......OO.....',
    '....OHhO....OHhO....',
    '.....OO......OO.....',
    '......O......O......',
    '.......OOOOOO.......',
    '.....OHHhhhhhKO.....',
    '....OHhhhhhhhhKO....',
    '...OhhhhhhhhhhhKO...',
    '..OOhhWWWhhWWWhKOO..',
    '.OlOhphhhhhhhhpKORO.',
    '.OlwOhhhhHHhhhKOrRO.',
    'OrlKKOOKKKKKKOOKKRRO',
    'OrlKKrrOOOOOOrrKKRRO',
    'OrrrrrrrrOOrrrrrrRRO',
    'ORrrrKKrrOOrrKKrRRRO',
    '.ORrrKKrrOOrrKKRRRO.',
    '..ORRRrrrOOrrRRRRO..',
    '...OOOOOOOOOOOOOO...',
    '.....OKKO..OKKO.....',
  ];
  const talk = [
    '.....OO......OO.....',
    '....OHhO....OHhO....',
    '.....OO......OO.....',
    '......O......O......',
    '.......OOOOOO.......',
    '.....OHHhhhhhKO.....',
    '....OHhWWhhWWhKO....',
    '...OhhWeehheeWhKO...',
    '..OOhhWeehheeWhKOO..',
    '.OlOhphWWhhWWhpKORO.',
    '.OlwOhhhhpphhhKOrRO.',
    'OrlKKOOKKppKKOOKKRRO',
    'OrlKKrrOOOOOOrrKKRRO',
    'OrrrrrrrrOOrrrrrrRRO',
    'ORrrrKKrrOOrrKKrRRRO',
    '.ORrrKKrrOOrrKKRRRO.',
    '..ORRRrrrOOrrRRRRO..',
    '...OOOOOOOOOOOOOO...',
    '.....OKKO..OKKO.....',
  ];
  const talk2 = [
    '.....OO......OO.....',
    '....OHhO....OHhO....',
    '.....OO......OO.....',
    '......O......O......',
    '.......OOOOOO.......',
    '.....OHHhhhhhKO.....',
    '....OHhWWhhWWhKO....',
    '...OhhWeehheeWhKO...',
    '..OOhhWeehheeWhKOO..',
    '.OlOhphWWhhWWhpKORO.',
    '.OlwOhhhhpphhhKOrRO.',
    'OrlKKOOKKKKKKOOKKRRO',
    'OrlKKrrOOOOOOrrKKRRO',
    'OrrrrrrrrOOrrrrrrRRO',
    'ORrrrKKrrOOrrKKrRRRO',
    '.ORrrKKrrOOrrKKRRRO.',
    '..ORRRrrrOOrrRRRRO..',
    '...OOOOOOOOOOOOOO...',
    '.....OKKO..OKKO.....',
  ];
  const happy = [
    '....OO........OO....',
    '...OHhO......OHhO...',
    '....OOO......OOO....',
    '......O......O......',
    '.......OOOOOO.......',
    '.....OHHhhhhhKO.....',
    '....OHhhhhhhhhKO....',
    '...OhhhWhhhhWhhKO...',
    '..OOhhWhWhhWhWhKOO..',
    '.OlOhphhhhhhhhpKORO.',
    '.OlwOhhhHppHhhKOrRO.',
    'OrlKKOOKKppKKOOKKRRO',
    'OrlKKrrOOOOOOrrKKRRO',
    'OrrrrrrrrOOrrrrrrRRO',
    'ORrrrKKrrOOrrKKrRRRO',
    '.ORrrKKrrOOrrKKRRRO.',
    '..ORRRrrrOOrrRRRRO..',
    '...OOOOOOOOOOOOOO...',
    '.....OKKO..OKKO.....',
  ];
  const happy2 = [
    '...OHhO......OHhO...',
    '....OOO......OOO....',
    '......O......O......',
    '.......OOOOOO.......',
    '.....OHHhhhhhKO.....',
    '....OHhhhhhhhhKO....',
    '...OhhhWhhhhWhhKO...',
    '..OOhhWhWhhWhWhKOO..',
    '.OlOhphhhhhhhhpKORO.',
    '.OlwOhhhHppHhhKOrRO.',
    'OrlKKOOKKppKKOOKKRRO',
    'OrlKKrrOOOOOOrrKKRRO',
    'OrrrrrrrrOOrrrrrrRRO',
    'ORrrrKKrrOOrrKKrRRRO',
    '.ORrrKKrrOOrrKKRRRO.',
    '..ORRRrrrOOrrRRRRO..',
    '...OOOOOOOOOOOOOO...',
    '....................',
    '.....OKKO..OKKO.....',
  ];
  const sleep = [
    '....................',
    '....................',
    '....................',
    '....................',
    '....OO........OO....',
    '...OHhOO....OOHhO...',
    '.....OOOOOOOOOO.....',
    '...OOOHHhhhhhKOOO...',
    '..OlOHhhhhhhhhKORO..',
    '.OlOhhhhhhhhhhhKORO.',
    '.OlOhhWhWhhWhWhKORO.',
    'OrlOhphWhhhhWhpKORRO',
    'OrlKOhhhhHHhhhKOKRRO',
    'OrrrrOOKKKKKKOOrrRRO',
    'ORrrrKKOOOOOOKKrRRRO',
    '.ORrrKKrrOOrrKKRRRO.',
    '..ORRRrrrOOrrRRRRO..',
    '...OOOOOOOOOOOOOO...',
    '.....OKKO..OKKO.....',
  ];
  const sleep2 = [
    '....................',
    '....................',
    '....................',
    '....................',
    '....................',
    '....OO........OO....',
    '...OHhOOOOOOOOHhO...',
    '...OOllOOOOOOrrOO...',
    '..OlwOHHhhhhhKOrRO..',
    '.OllOHhhhhhhhhKOrRO.',
    '.OlOhhhhhhhhhhhKORO.',
    'OrlOhhWhWhhWhWhKORRO',
    'OrlOhphWhhhhWhpKORRO',
    'OrrrOhhhhhHhhhKOrRRO',
    'ORrrrOOKKKKKKOOrRRRO',
    '.ORrrKKOOOOOOKKRRRO.',
    '..ORRRrrrOOrrRRRRO..',
    '...OOOOOOOOOOOOOO...',
    '.....OKKO..OKKO.....',
  ];
  const think = [
    '.....OO.......OO....',
    '....OHhO.....OHhO...',
    '.....OO.....OOO.....',
    '......O......O......',
    '.......OOOOOO.......',
    '.....OHHhhhhhKO.....',
    '....OHheehheehKO....',
    '...OhhWeehheeWhKO...',
    '..OOhhWWWhhWWWhKOO..',
    '.OlOhphWWhhWWhpKORO.',
    '.OlwOhhhhhHhhhKOrRO.',
    'OrlKKOOKKKKKKOOKKRRO',
    'OrlKKrrOOOOOOrrKKRRO',
    'OrrrrrrrrOOrrrrrrRRO',
    'ORrrrKKrrOOrrKKrRRRO',
    '.ORrrKKrrOOrrKKRRRO.',
    '..ORRRrrrOOrrRRRRO..',
    '...OOOOOOOOOOOOOO...',
    '.....OKKO..OKKO.....',
  ];
  const fidget = [
    '.....OO.............',
    '....OHhO.....OO.....',
    '.....OO.....OHhO....',
    '......O.....OOO.....',
    '.......OOOOOO.......',
    '.....OHHhhhhhKO.....',
    '....OHhWWhhhWWKO....',
    '..OOhheeWhheeWhKOO..',
    '.OlOhheeWhheeWhKORO.',
    'OllOhphWWhhhWWpKOrRO',
    'OlwlOhhhhhHhhhKOrrRO',
    'rlKKrOOKKKKKKOOrKKRR',
    'rlKKrrrOOOOOOrrrKKRR',
    'rrrrrrrrOvvOrrrrrrRR',
    'RrrrKKrrOvvOrrKKrRRR',
    'ORrrKKrrOVvOrrKKRRRO',
    '.ORRRrrrOVVOrrRRRRO.',
    '..OOOOOOOOOOOOOOOO..',
    '.....OKKO..OKKO.....',
  ];
  const flyA = [
    '.VV.....OO........OO.....VV.',
    'VvvVV..OHhO......OHhO..VVvvV',
    'VvvvvV..OOO......OOO..VvvvvV',
    '.VvvvvV...O......O...VvvvvV.',
    '..VvvvvV...OOOOOO...VvvvvV..',
    '...VVvvV.OHHhhhhhKO.VvvVV...',
    '.....VOOOHhhhhhhhhKOOOV.....',
    '....OOlOhhhWhhhhWhhKOrOO....',
    '...OlwlOhhWhWhhWhWhKOrrRO...',
    '..OlllrOhphhhhhhhhpKOrrrRO..',
    '...OlwlrOhhhHppHhhKOrrrRO...',
    '..OrlKKrrOOKKppKKOOrrKKRRO..',
    '..OrlKKrrrrOOOOOOrrrrKKRRO..',
    '..OrrrrrrrrOKKKKOrrrrrrRRO..',
    '..ORrrrKKrrOKKKKOrrKKrRRRO..',
    '...ORrrKKrrOKKKKOrrKKRRRO...',
    '....ORRRrrrOKKKKOrrRRRRO....',
    '.....OOOOOOOOOOOOOOOOOO.....',
    '.........OKKO..OKKO.........',
  ];
  const flyB = [
    '........OO........OO........',
    '.......OHhO......OHhO.......',
    '........OOO......OOO........',
    '.VVVV.....O......O.....VVVV.',
    'VvvvvVVV...OOOOOO...VVVvvvvV',
    'VvvvvvvV.OHHhhhhhKO.VvvvvvvV',
    '.VVvvvOOOHhhhhhhhhKOOOvvvVV.',
    '...VOOlOhhhWhhhhWhhKOrOOV...',
    '...OlwlOhhWhWhhWhWhKOrrRO...',
    '..OlllrOhphhhhhhhhpKOrrrRO..',
    '...OlwlrOhhhHppHhhKOrrrRO...',
    '..OrlKKrrOOKKppKKOOrrKKRRO..',
    '..OrlKKrrrrOOOOOOrrrrKKRRO..',
    '..OrrrrrrrrOKKKKOrrrrrrRRO..',
    '..ORrrrKKrrOKKKKOrrKKrRRRO..',
    '...ORrrKKrrOKKKKOrrKKRRRO...',
    '....ORRRrrrOKKKKOrrRRRRO....',
    '.....OOOOOOOOOOOOOOOOOO.....',
    '.........OKKO..OKKO.........',
  ];
  const flyC = [
    '..V.....OO........OO.....V..',
    '.v.V...OHhO......OHhO...V.v.',
    'V.v.v...OOO......OOO...v.v.V',
    '.V.v.v.V..O......O..V.v.v.V.',
    'V.V.v.v....OOOOOO....v.v.V.V',
    '.V.V.v.V.OHHhhhhhKO.V.v.V.V.',
    '....V.OOOHhWWhhWWhKOOO.V....',
    '....OOlOhhWeehheeWhKOrOO....',
    '...OlwlOhhWeehheeWhKOrrRO...',
    '..OlllrOhphWWhhWWhpKOrrrRO..',
    '...OlwlrOhhhhhHhhhKOrrrRO...',
    '..OrlKKrrOOKKKKKKOOrrKKRRO..',
    '..OrlKKrrrrOOOOOOrrrrKKRRO..',
    '..OrrrrrrrrOKKKKOrrrrrrRRO..',
    '..ORrrrKKrrOKKKKOrrKKrRRRO..',
    '...ORrrKKrrOKKKKOrrKKRRRO...',
    '....ORRRrrrOKKKKOrrRRRRO....',
    '.....OOOOOOOOOOOOOOOOOO.....',
    '.........OKKO..OKKO.........',
  ];
  const tuck2 = [
    '......OO........OO......',
    '.....OHhO......OHhO.....',
    '......OOO......OOO......',
    '........O......O........',
    '.........OOOOOO.........',
    '.......OHHhhhhhKO.......',
    '....OOOHhhhhhhhhKOOO....',
    '..OOlOhhhWhhhhWhhKOrOO..',
    '.OlwlOhhWhWhhWhWhKOrrRO.',
    'OlllrOhphhhhhhhhpKOrrrRO',
    '.OlwlrOhhhHppHhhKOrrrRO.',
    'OrlKKrrOOKKppKKOOrrKKRRO',
    'OrlKKrrrrOOOOOOrrrrKKRRO',
    'OrrrrrrrrOKKKKOrrrrrrRRO',
    'ORrrrKKrrOKKKKOrrKKrRRRO',
    '.ORrrKKrrOKKKKOrrKKRRRO.',
    '..ORRRrrrOKKKKOrrRRRRO..',
    '...OOOOOOOOOOOOOOOOOO...',
    '.......OKKO..OKKO.......',
  ];
  const tuck1 = [
    '....OO........OO....',
    '...OHhO......OHhO...',
    '....OOO......OOO....',
    '......O......O......',
    '.......OOOOOO.......',
    '.....OHHhhhhhKO.....',
    '....OHhhhhhhhhKO....',
    '..OOhhhWhhhhWhhKOO..',
    '.OlOhhWhWhhWhWhKORO.',
    'OllOhphhhhhhhhpKOrRO',
    'OlwlOhhhHppHhhKOrrRO',
    'rlKKrOOKKppKKOOrKKRR',
    'rlKKrrrOOOOOOrrrKKRR',
    'rrrrrrrrOvvOrrrrrrRR',
    'RrrrKKrrOvvOrrKKrRRR',
    'ORrrKKrrOVvOrrKKRRRO',
    '.ORRRrrrOVVOrrRRRRO.',
    '..OOOOOOOOOOOOOOOO..',
    '.....OKKO..OKKO.....',
  ];
  PatchDex.register({
    id: "dotty",
    name: "Dotty",
    species: "bug-hunting ladybug",
    rarity: "common",
    blurb: "Lands on every bug in the garden, watches it twice, then shoos it off for good.",
    coaching: "Debugging: reproduce the bug first, then fix it.",
    voice: "let's make it happen again before we fix it.",
    hatch: "The egg buzzes, pops its lid, and Dotty zips up on blurry wings before tucking them away.",
    palette: {
      O: '#2a0f1e', // outline
      R: '#9e1638', // shell shadow
      r: '#e8294a', // shell red
      l: '#ff7b86', // shell highlight
      w: '#ffffff', // shell shine
      K: '#2b2233', // spots / body
      h: '#4a4458', // face
      H: '#6f6984', // face highlight / nose
      W: '#f5f3ff', // eye white
      e: '#120c18', // eye
      p: '#f2709a', // blush / tongue
      v: '#dfe9ff', // wing
      V: '#9fb3dc', // wing edge
    },
    sprites: { idle, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 24], ['blink', 2], ['idle', 16], ['fidget', 2], ['idle', 2], ['fidget', 2], ['idle', 20], ['think', 8], ['idle', 6], ['blink', 2]],
    entrance(k) {
      const out = k.eggIntro();
      const ex = k.eggHome.x, ey = k.eggHome.y;
      // Something buzzes inside: the egg jitters.
      [[-1, 'buzz'], [1], [-1], [1], [0]].forEach(([l, note]) => {
        out.push(k.f(k.egg(k.EGG_C2, 0, 0, k.lean(l)), 70, note ? { note } : {}));
      });
      // The lid pops and Dotty rises out of the shell on blurry wings.
      const fly = (g, s, y) => k.stamp(g, s, 0, y);
      const shell = (g, sp, dy) => {
        const L = k.EGG_BOTTOM.map(r => r.slice(0, 6)), R = k.EGG_BOTTOM.map(r => r.slice(6));
        k.stamp(g, L, ex - sp, ey + 2 + dy); k.stamp(g, R, ex + 6 + sp, ey + 2 + dy);
      };
      // Only the antennae and the top of the head peek over the rim at first.
      const peek = idle.slice(0, 9).map(r => r.slice(3, 17));
      let g = k.blank(); k.stamp(g, peek, 7, ey - 6); shell(g, 0, 0); k.stamp(g, k.EGG_TOP, ex, ey - 9);
      out.push(k.f(g, 140, { note: 'pop' }));
      [[flyA, 6, 0, ey - 11], [flyB, 3, 1, ey - 18], [flyC, 1, 2, ey - 26]].forEach(([s, y, sp, ty]) => {
        g = k.blank(); shell(g, sp, 0); fly(g, s, y); k.stamp(g, k.EGG_TOP, ex, ty); out.push(k.f(g, 90));
      });
      // Hovers and buzzes while the empty shell tips apart below.
      [[flyA, 0, 3, 1], [flyB, 1, 5, 3], [flyC, 0, 8, 6], [flyA, 1, 11, 9], [flyB, 0, 14, 12]].forEach(([s, y, sp, dy], n) => {
        g = k.blank(); shell(g, sp, dy); fly(g, s, y); out.push(k.f(g, 90, n ? {} : { note: 'hover' }));
      });
      // Floats down and lands.
      [[flyC, 2, 100], [flyA, 3, 140]].forEach(([s, y, ms], n) => {
        g = k.blank(); fly(g, s, y); out.push(k.f(g, ms, n ? { note: 'lands' } : {}));
      });
      // Wings fold away and the shell clicks shut.
      g = k.blank(); k.stamp(g, tuck2, 2, 3); out.push(k.f(g, 120, { note: 'tuck' }));
      g = k.blank(); k.stamp(g, tuck1, 4, 3); out.push(k.f(g, 120));
      out.push(k.f(k.at('happy', 0, 1), 100));
      out.push(k.f(k.sparkle(k.at('happy'), 0), 360), k.f(k.at('happy2'), 160), k.f(k.at('happy'), 160));
      out.push(k.f(k.at('blink'), 110), k.f(k.at('idle'), 420));
      return out;
    },
  });
})();
