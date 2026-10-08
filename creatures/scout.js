// Scout — puppy with an eye patch and a polka-dot bandana. Coaches research before acting: sniff around first.
(function () {
  const idle = [
    '......OOOOOOOO......',
    '..OOOOlllWWlbbOOOO..',
    '.OmmKllllWWlbbbKkkO.',
    'OmmkKllllWWkkkkKkkkO',
    'OmkkKlwelWWkwekKkkkO',
    'OmkkKleelWWkeekKkkkO',
    'OmkkKleeWWWWeekKkkkO',
    'OkkkKpWWWeeWWWpKkkkO',
    'OkkKObWWWWWWWWbOKkkO',
    '.OOOOdcWWWWWWcdOOOO.',
    '....OrrrrrrrrrROOWO.',
    '...OllrrWrrrrRbdOlO.',
    '...OlWWrrrWrRWbdOb..',
    '..OlbWWWWRRWWWcbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OWcOWWWOWWWcOWcO..',
    '..OOOOOOOOOOOOOOOO..',
  ];
  const blink = [
    '......OOOOOOOO......',
    '..OOOOlllWWlbbOOOO..',
    '.OmmKllllWWlbbbKkkO.',
    'OmmkKllllWWkkkkKkkkO',
    'OmkkKllllWWkkkkKkkkO',
    'OmkkKleelWWkeekKkkkO',
    'OmkkKlllWWWWkkkKkkkO',
    'OkkkKpWWWeeWWWpKkkkO',
    'OkkKObWWWWWWWWbOKkkO',
    '.OOOOdcWWWWWWcdOOOO.',
    '....OrrrrrrrrrROOWO.',
    '...OllrrWrrrrRbdOlO.',
    '...OlWWrrrWrRWbdOb..',
    '..OlbWWWWRRWWWcbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OWcOWWWOWWWcOWcO..',
    '..OOOOOOOOOOOOOOOO..',
  ];
  const talk = [
    '......OOOOOOOO......',
    '..OOOOlllWWlbbOOOO..',
    '.OmmKllllWWlbbbKkkO.',
    'OmmkKllllWWkkkkKkkkO',
    'OmkkKlwelWWkwekKkkkO',
    'OmkkKleelWWkeekKkkkO',
    'OmkkKleeWWWWeekKkkkO',
    'OkkkKpWWWeeWWWpKkkkO',
    'OkkKObWWeppeWWbOKkkO',
    '.OOOOdcWWeeWWcdOOOO.',
    '....OrrrrrrrrrROOWO.',
    '...OllrrWrrrrRbdOlO.',
    '...OlWWrrrWrRWbdOb..',
    '..OlbWWWWRRWWWcbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OWcOWWWOWWWcOWcO..',
    '..OOOOOOOOOOOOOOOO..',
  ];
  const talk2 = [
    '......OOOOOOOO......',
    '..OOOOlllWWlbbOOOO..',
    '.OmmKllllWWlbbbKkkO.',
    'OmmkKllllWWkkkkKkkkO',
    'OmkkKlwelWWkwekKkkkO',
    'OmkkKleelWWkeekKkkkO',
    'OmkkKleeWWWWeekKkkkO',
    'OkkkKpWWWeeWWWpKkkkO',
    'OkkKObWWWWWWWWbOKkkO',
    '.OOOOdcWWeeWWcdOOOO.',
    '....OrrrrrrrrrROOWO.',
    '...OllrrWrrrrRbdOlO.',
    '...OlWWrrrWrRWbdOb..',
    '..OlbWWWWRRWWWcbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OWcOWWWOWWWcOWcO..',
    '..OOOOOOOOOOOOOOOO..',
  ];
  const happy = [
    '......OOOOOOOO......',
    '..OOOOlllWWlbbOOOO..',
    '.OmmKllllWWlbbbKkkO.',
    'OmmkKllllWWkkkkKkkkO',
    'OmkkKleelWWkeekKkkkO',
    'OkkKOelleWWekkeOKkkO',
    '.OOOllllWWWWkkkbOOO.',
    '..OblpWWWeeWWWpbdO..',
    '...ObbWeWWWWeWbdO...',
    '....OdcWeppeWcdO..OO',
    '....OrrrrrrrrrRO.OWO',
    '...OllrrWrrrrRbdOlO.',
    '...OlWWrrrWrRWbdOb..',
    '..OlbWWWWRRWWWcbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OWcOWWWOWWWcOWcO..',
    '..OOOOOOOOOOOOOOOO..',
  ];
  const happy2 = [
    '......OOOOOOOO......',
    '....OOlllWWlbbOO....',
    '..OOOllllWWlbbbOOO..',
    '.OmmKllllWWkkkkKkkO.',
    'OmmkKleelWWkeekKkkkO',
    'OmkkKelleWWekkeKkkkO',
    'OkkKOlllWWWWkkkOKkkO',
    '.OOOlpWWWeeWWWpbOOO.',
    '...ObbWeWWWWeWbdO...',
    '....OdcWeppeWcdO.OO.',
    '....OrrrrrrrrrROOWO.',
    '...OllrrWrrrrRbdOlO.',
    '...OlWWrrrWrRWbdOb..',
    '..OlbWWWWRRWWWcbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OWcOWWWOWWWcOWcO..',
    '..OOOOOOOOOOOOOOOO..',
  ];
  const sleep = [
    '....................',
    '....................',
    '....................',
    '....................',
    '....................',
    '......OOOOOOOO......',
    '....OOlllWWlbbOO....',
    '..OOOllllWWlbbbOOO..',
    '.OmmKllllWWkkkkKkkO.',
    'OmmkKllllWWkkkkKkkkO',
    'OmkkKelleWWekkeKkkkO',
    'OmkkKleeWWWWeekKkkkO',
    'OmkkKpWWWeeWWWpKkkkO',
    'OkkkKbWWWWWWWWbKkkkO',
    'OkkKOOOOWWWWOOOOKkkO',
    '.OOOWWWcObbOWWWcOOO.',
    '.ObOWcWcObbOWcWcOdO.',
    '.OOOOOOOOOOOOOOOOOO.',
  ];
  const sleep2 = [
    '....................',
    '....................',
    '....................',
    '....................',
    '....................',
    '......OOOOOOOO......',
    '....OOlllWWlbbOO....',
    '..OOOllllWWlbbbOOO..',
    '.OmmKllllWWkkkkKkkO.',
    'OmmkKllllWWkkkkKkkkO',
    'OmkkKelleWWekkeKkkkO',
    'OmkkKleeWWWWeekKkkkO',
    'OmkkKpWWWeeWWWpKkkkO',
    'OkkkKbWWWWWWWWbKkkkO',
    'OkkKOOOOWWWWOOOOKkkO',
    '.OOOWWWcObbOWWWcOOO.',
    '.OOOWcWcOOOOWcWcOOO.',
    '....OOOO....OOOO....',
  ];
  const think = [
    '......OOOOOOOO......',
    '..OOOOlllWWlbbOOOO..',
    '.OmmKllllWWlbbbKkkO.',
    'OmmkKleelWWkeekKkkkO',
    'OmkkKlewlWWkewkKkkkO',
    'OkkKOleelWWkeekKkkkO',
    '.OOOllllWWWWkkkKkkkO',
    '..OblpWWWeeWWWpKkkkO',
    '...ObbWWWWWWWWbOKkkO',
    '....OdcWWWWWWcdOOOO.',
    '....OrrrrrrrrrROOWO.',
    '...OllrrWrrrrRbdOlO.',
    '...OlWWrrrWrRWbdOb..',
    '..OlbWWWWRRWWWcbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OWcOWWWOWWWcOWcO..',
    '..OOOOOOOOOOOOOOOO..',
  ];
  const fidget = [
    '......OOOOOOOO......',
    '..OOOOlllWWlbbOOOO..',
    '.OmmKllllWWlbbbKkkO.',
    'OmmkKllllWWkkkkKkkkO',
    'OmkkKlwelWWkwekKkkkO',
    'OmkkKleelWWkeekOKkkO',
    'OmkkKlllWweWkkkbOOO.',
    'OkkkKpWWWeeWWWpbdO..',
    'OkkKObWWWWWWWWbdO...',
    '.OOOOdcWWWWWWcdO..OO',
    '....OrrrrrrrrrRO.OWO',
    '...OllrrWrrrrRbdOlO.',
    '...OlWWrrrWrRWbdOb..',
    '..OlbWWWWRRWWWcbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OWcOWWWOWWWcOWcO..',
    '..OOOOOOOOOOOOOOOO..',
  ];
  const shakeA = [
    '......OOOOOOOO......',
    '..OOOOlllWWlbbOOOO..',
    '.OmmKllllWWlbbbKkkO.',
    'OmmkKllllWWkkkkKkkkO',
    'OmkkKllllWWkkkkKkkkO',
    'OkkKOleelWWkeekKkkkO',
    '.OOOllllWWWWkkkKkkkO',
    '..OblpWWWeeWWWpKkkkO',
    '...ObbWWWWWWWWbOKkkO',
    '....OdcWWeeWWcdOOOOO',
    '....OrrrrrrrrrRO.OWO',
    '...OllrrWrrrrRbdOlO.',
    '...OlWWrrrWrRWbdOb..',
    '..OlbWWWWRRWWWcbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OWcOWWWOWWWcOWcO..',
    '..OOOOOOOOOOOOOOOO..',
  ];
  const shakeB = [
    '......OOOOOOOO......',
    '..OOOOlllWWlbbOOOO..',
    '.OmmKllllWWlbbbKkkO.',
    'OmmkKllllWWkkkkKkkkO',
    'OmkkKllllWWkkkkKkkkO',
    'OmkkKleelWWkeekOKkkO',
    'OmkkKlllWWWWkkkbOOO.',
    'OkkkKpWWWeeWWWpbdO..',
    'OkkKObWWWWWWWWbdO...',
    '.OOOOdcWWeeWWcdO.OO.',
    '....OrrrrrrrrrROOWO.',
    '...OllrrWrrrrRbdOlO.',
    '...OlWWrrrWrRWbdOb..',
    '..OlbWWWWRRWWWcbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OlbdWWWcWWWcdbdO..',
    '..OWcOWWWOWWWcOWcO..',
    '..OOOOOOOOOOOOOOOO..',
  ];
  const tailA = [
    '.OO.',
    'OWO.',
    'OlO.',
    'Ob..',
  ];
  const tailB = [
    '..OO',
    '.OWO',
    'OlO.',
    'Ob..',
  ];
  const paws = [
    'OWWO..OWWO',
    'OOOO..OOOO',
  ];
  PatchDex.register({
    id: "scout",
    name: "Scout",
    species: "bandana puppy",
    rarity: "common",
    blurb: "Nose first, paws second; it sniffs out the whole yard before it digs.",
    coaching: "Research before acting: read the code and docs, then make the change.",
    voice: "let me sniff around the codebase before we dig in.",
    hatch: "The egg rocks on stubby paws, a tail wags out, and it bursts free wearing the shell as a hat.",
    palette: {
      O: '#3a2219', // outline
      d: '#a8713a', // tan shadow
      b: '#d4a259', // tan base
      l: '#efcb8a', // tan highlight
      W: '#fffaf0', // white fur
      c: '#e2d3bd', // white shadow
      m: '#94603a', // ear highlight
      k: '#6e4129', // ear / eye patch
      K: '#4a2a1c', // ear shadow
      r: '#cf3a3c', // bandana red
      R: '#8f2232', // bandana shadow
      e: '#1e1416', // eye / nose
      w: '#ffffff', // eye shine
      p: '#ef9a92', // blush / tongue
    },
    sprites: { idle, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 26], ['blink', 2], ['idle', 18], ['fidget', 3], ['idle', 2], ['fidget', 3], ['idle', 20], ['blink', 2], ['idle', 6], ['blink', 2]],
    entrance(k) {
      const out = k.eggIntro();
      const ex = k.eggHome.x, ey = k.eggHome.y;
      const T = [tailA, tailB];
      const egg = (dx, dy, o) => k.egg(k.EGG_C2, dx, dy, o);
      // A tail pokes out of the shell and wags while the egg rocks.
      let g = egg(0, 0); k.stamp(g, tailA, ex + 10, ey + 8);
      out.push(k.f(g, 280, { note: 'tail' }));
      [[-1, 1], [1, 0], [-1, 1], [1, 0]].forEach(([l, t]) => {
        g = egg(0, 0, k.lean(l)); k.stamp(g, T[t], ex + 10, ey + 8); out.push(k.f(g, 110));
      });
      // The egg stands up on stubby paws and waddles.
      [[0, 200], [-1, 130], [1, 130], [0, 120]].forEach(([dx, ms], n) => {
        g = egg(dx, -2); k.stamp(g, paws, ex + 1 + dx, ey + 12); k.stamp(g, T[n % 2], ex + 10 + dx, ey + 6);
        out.push(k.f(g, ms, n ? {} : { note: 'stands' }));
      });
      out.push(k.f(egg(0, 1), 110));
      // Head bursts through the top, wearing the lid as a hat.
      const hat = (g, x, y, flip) => k.stamp(g, k.EGG_TOP, x, y, { flipX: flip });
      g = k.at('blink', 0, 2); k.stamp(g, k.EGG_BOTTOM, ex, ey + 2); hat(g, ex, 2);
      out.push(k.f(g, 90));
      g = k.at('happy', 0, -1); k.stamp(g, k.EGG_BOTTOM, ex, ey + 2); hat(g, ex, 0);
      out.push(k.f(k.sparkle(g, 0), 360, { note: 'hat' }));
      // Shake it off: head swings, the hat slides, then flies.
      const sk = d => ({ rowDx: j => (j < 11 ? d : 0) });
      [[shakeA, -1, -2, 0], [shakeB, 1, 2, 0], [shakeA, -1, -3, 1]].forEach(([s, d, hx, hy]) => {
        g = k.at(s, 0, -1, sk(d)); k.stamp(g, k.EGG_BOTTOM, ex, ey + 2); hat(g, ex + hx, hy, d > 0);
        out.push(k.f(g, 100));
      });
      [[1, 5, -1], [-1, 11, 0], [0, 17, 3]].forEach(([d, hx, hy], n) => {
        g = k.at(n % 2 ? shakeA : shakeB, 0, -1, sk(d)); k.stamp(g, k.EGG_BOTTOM, ex, ey + 2); hat(g, ex + hx, hy, n % 2 === 0);
        out.push(k.f(g, 90, n ? {} : { note: 'flies' }));
      });
      // Hops up out of the shell; the halves tip away underneath.
      const L = k.EGG_BOTTOM.map(r => r.slice(0, 6)), R = k.EGG_BOTTOM.map(r => r.slice(6));
      g = k.blank(); k.stamp(g, k.EGG_BOTTOM, ex, ey + 2); k.over(g, 'happy2', 0, -3);
      out.push(k.f(g, 130, { note: 'hop' }));
      g = k.blank(); k.stamp(g, L, ex - 4, ey + 4); k.stamp(g, R, ex + 10, ey + 4); k.over(g, 'happy2', 0, -2);
      out.push(k.f(g, 100));
      g = k.blank(); k.stamp(g, L, ex - 8, ey + 7); k.stamp(g, R, ex + 14, ey + 7); k.over(g, 'happy', 0, 0);
      out.push(k.f(g, 160, { note: 'lands' }));
      out.push(k.f(k.sparkle(k.at('happy2'), 1), 160), k.f(k.at('happy'), 160), k.f(k.at('happy2'), 160));
      out.push(k.f(k.at('blink'), 110), k.f(k.at('idle'), 420));
      return out;
    },
  });
})();
