// Jinn — an ember-coral smoke spirit bound to a brass oil lamp. Flame-wisp crest, pointed ears with brass hoops,
// a teal sash, and a smoky tail that never quite leaves the spout.
(function () {
  const W = 22;
  // The lamp sits on rows 15-19; the spirit is drawn over it so the tail pours into the spout.
  const LAMP = [
    '..............yg......',
    '............ogyggGo.GG',
    'oyygGo...oyyyggggGGn.G',
    '.GgggyyggggggTggGGnnG.',
    '...nnGGGGGGGGGnnn.....',
  ];
  const LAMP_Y = 15;
  const body = [
    '...........F..........',
    '.........fF...........',
    '......oorfoooo........',
    '.....oLLLLbbbbo.......',
    '....oLLLbbbbbbbo......',
    'ooooLLbbbbbbbbbdoooo..',
    'oLbbLbwebbbbwebdddDo..',
    '.oddbbeebbbbeebdDDo...',
    '.goobpbbmbbmbbpdoog...',
    'G.g.obbbbmmbbddo.g.G..',
    '.g...oddddddDDo...G...',
    '...oo.oDddddDo.oo.....',
    '..oLbboLbbbbdobdDo....',
    '..oygGotTTTTqogGno....',
    '...oooLbbbdDo.ooo.....',
    '..oLLbbbddo...........',
    '.oLbddo...............',
    '......................',
    '......................',
    '......................',
  ];
  const blankRow = '.'.repeat(W);
  // Replace rows by index; short rows replace the left part only.
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  // Lamp first, spirit on top.
  const withLamp = b => put(put(Array(20).fill(blankRow), 0, LAMP_Y, LAMP), 0, 0, b);
  // Slump: drop a head row and pad the top (the tail and lamp stay put).
  const sink = (b, row) => [blankRow, ...b.slice(0, row), ...b.slice(row + 1)];

  // Face parts. Eyes live at x6..13 rows 6-7, the mouth at x8..11 rows 8-9.
  const eyes = (b, r6, r7) => put(b, 6, 6, [r6, r7]);
  const mouth = (b, r8, r9) => put(b, 8, 8, [r8, r9]);
  const FLAME = {
    idle: ['...........F', '.........fF.', '......oorfoooo'],
    flick: ['..........F.', '.........fF.', '......oorfoooo'],
    lean: ['........F...', '........Ff..', '......oorfoooo'],
    big: ['.........fFF', '........fFFf', '......orFfoooo'],
    ember: ['............', '............', '......oorroooo'],
  };
  const flame = (b, k) => mod(b, { 0: FLAME[k][0].padEnd(W, '.'), 1: FLAME[k][1].padEnd(W, '.'), 2: FLAME[k][2] });
  const dots = (b, pts, ch) => b.map((r, y) => [...r].map((c, x) => (pts.some(([px, py]) => px === x && py === y) ? ch : c)).join(''));
  // Head and torso float up a pixel; the tail stretches to stay in the spout.
  const rise = b => [...b.slice(1, 13), b[12], ...b.slice(13)];
  const brow = b => put(b, 12, 5, ['DD']);
  const Z1 = ['zzz', '..z', '.z.', 'zzz'], Z2 = ['ZZZ', '..Z', '.Z.', 'ZZZ'];
  const Q = ['yy.', '..y', '.y.', '...', '.y.'];

  const B = {};
  B.idle = body;
  B.idle2 = flame(body, 'flick');
  B.blink = eyes(body, 'bbbbbbbb', 'eebbbbee');
  B.talk = brow(mouth(body, 'bmmb', 'bmmb'));
  B.talk2 = brow(mouth(flame(body, 'flick'), 'bbbb', 'bmmb'));
  const glee = mouth(eyes(flame(body, 'big'), 'eebbbbee', 'bbbbbbbb'), 'mmmm', 'bmmb');
  const gleeEyes = b => put(b, 5, 7, ['e..e..e..e']);
  B.happy = dots(gleeEyes(glee), [[2, 2], [17, 1], [20, 3]], 'y');
  B.happy2 = dots(rise(gleeEyes(flame(glee, 'flick'))), [[3, 1], [19, 2], [1, 4]], 'y');
  const nap = sink(mouth(eyes(flame(body, 'ember'), 'bbbbbbbb', 'eebbbbee'), 'bbbb', 'bmbb'), 4);
  B.sleep = put(nap, 17, 0, Z1);
  B.sleep2 = put(nap, 16, 0, Z2);
  B.think = put(brow(mouth(eyes(body, 'ewbbbbew', 'eebbbbee'), 'bbbb', 'bbmm')), 17, 0, Q);
  B.fidget = eyes(flame(body, 'lean'), 'ewbbbbew', 'eebbbbee');

  const S = {};
  Object.entries(B).forEach(([n, b]) => { S[n] = withLamp(b); });
  PatchDex.register({
    id: 'jinn', name: 'Jinn', species: 'lamp-smoke djinn', rarity: 'rare', habit: 'prompting',
    blurb: 'A smoke spirit that grants every wish exactly as worded. It is not malicious, just very, very literal.',
    coaching: 'Constraints and non-goals: say what must not be touched, what is out of scope, and what has to stay the same.',
    voice: 'i grant it word for word. so, what must it not touch?',
    hatch: 'The egg turns into a brass lamp and rattles as if rubbed. Smoke spirals out of the spout and settles into Jinn, still tethered to it.',
    palette: {
      o: '#3d1426', L: '#ffd3b4', b: '#ff9670', d: '#e0604f', D: '#a83a45',
      y: '#fff0a0', g: '#f0b13c', G: '#b87326', n: '#6a3517',
      t: '#7ee8d6', T: '#2bb3a3', q: '#16706c',
      e: '#2b0d1f', w: '#ffffff', m: '#6e1a2e', p: '#ff6f7f',
      F: '#fff3b0', f: '#ffc04a', r: '#ff7a2e', z: '#ffd9c4', Z: '#d9909a',
    },
    sprites: S,
    loop: [['idle', 18], ['idle2', 3], ['idle', 10], ['blink', 2], ['idle', 14], ['fidget', 3], ['idle', 2], ['fidget', 3], ['idle', 12], ['idle2', 3], ['blink', 2], ['idle', 10], ['think', 10], ['idle', 8]],
    entrance(k) {
      const out = k.eggIntro();
      const X = 3, Y = 2; // the sprite's home corner on the 28×22 canvas
      const BRASS = { 0: 'n', 1: 'g', 2: 'y', 3: 'G', 4: 'g', 5: 'G', 6: 'T', 7: 'y' };
      const lamp = (dx = 0) => k.stamp(k.blank(), LAMP, X + dx, Y + LAMP_Y);
      // The egg slumps into a squat brass pot on its way to becoming the lamp.
      const POT = [
        '....nnnnnn....',
        '..nyygggggnn..',
        '.nyggggggggGn.',
        'nyggggggggGGGn',
        'nggggggggGGGGn',
        '.nGGGGGGGGGGn.',
        '..nnnnnnnnnn..',
      ];
      const glint = (g, i) => k.px(g, X + 11 + 2 * i, Y + LAMP_Y + 2, 'w');
      // Smoke spirals up and inward from the spout tip toward where Jinn will be.
      const PATH = [[4, 17], [2, 15], [2, 12], [4, 9], [7, 7], [11, 6], [15, 7], [16, 10], [14, 12], [11, 11], [11, 9]];
      const PUFF = [['z'], ['.z.', 'zzz', '.Z.'], ['.zz.', 'zzzz', 'ZzzZ', '.ZZ.']];
      const swirl = (g, head, n = 4) => {
        for (let a = Math.max(0, head - n + 1); a <= head && a < PATH.length; a++) {
          const s = PUFF[Math.min(2, head - a)], [x, y] = PATH[a];
          k.stamp(g, s, x - (s[0].length >> 1), y - (s.length >> 1));
        }
        return g;
      };
      // A smoke-only Jinn, filled in from the tail up behind a rounded, rising front.
      const smoky = (b, from, keepEyes) => b.map((r, y) => [...r].map((c, x) => {
        if (c === '.' || y < from + Math.abs(x - 9.5) / 2) return '.';
        if (keepEyes && (c === 'e' || c === 'w')) return c;
        return c === 'o' ? 'Z' : 'z';
      }).join(''));
      const ghost = (b, from, keepEyes) => k.at(withLamp(smoky(b, from, keepEyes)));
      out.push(
        k.f(k.egg(k.EGG_C2, 0, 0, { map: BRASS }), 170, { note: 'brass?' }),
        k.f(k.stamp(k.blank(), POT, 7, 15), 90),
        k.f(lamp(), 260),
        k.f(glint(lamp(-1), 0), 70, { note: 'rub rub rub' }),
        k.f(glint(lamp(1), 1), 70),
        k.f(k.sparkle(glint(lamp(-1), 2), 0), 70),
        k.f(glint(lamp(1), 3), 70),
        k.f(glint(lamp(-1), 1), 70),
        k.f(k.sparkle(glint(lamp(1), 2), 1), 70),
        k.f(lamp(), 200),
      );
      for (let i = 0; i < PATH.length; i++) out.push(k.f(swirl(lamp(), i), 75, i === 0 ? { note: 'a curl of smoke' } : {}));
      [14, 9, 4, -5].forEach((from, i) => out.push(k.f(swirl(ghost(B.blink, from), PATH.length + i, 3 - i), 95)));
      out.push(
        k.f(ghost(B.idle, -5, true), 240, { note: 'blink' }),
        k.f(k.at(withLamp(flame(body, 'ember'))), 110),
        k.f(k.at(withLamp(flame(body, 'idle'))), 90),
        k.f(k.at('happy'), 280, { note: 'your wish?' }),
        k.f(k.at('happy2'), 110),
        k.f(k.at('happy'), 220),
        k.f(k.at('idle'), 260),
        k.f(k.at('blink'), 110),
        k.f(k.at('idle'), 400),
      );
      return out;
    },
  });
})();
