// Sara — kappa. Turtle-backed river imp with a water-filled dish (sara) on its head that must never spill.
(function () {
  const idle = [
    '......qqqqqqqq......',
    '....qqrrrrrrrrqq....',
    '...qrrWWWWWWWWrrq...',
    '..oqrWwiiwwwwwwRqo..',
    '.oHqrrwwwwwwwwRRqHo.',
    '.olgqqrrrrrrrRRqqdo.',
    '.olgggdqqqqqqqddddo.',
    'olggiegggggggiegdddo',
    'olggeegggggggeegdddo',
    'olggeegggggggeegdddo',
    'olgpggnyyyYYYngpdddo',
    '.olgggNnnnnnnNgdddo.',
    '.odgggggggggggddddo.',
    'OOoddddddddddddddoOO',
    'OhoglaaaaaaAAAAgdohO',
    'OhoCclgvccvccvclgcCf',
    'OsoCCggCcCCcCCCggCoS',
    'OSoldaAAAAAbbbbddgoS',
    '.OoogddoooooddgdoOO.',
    '..OOOoo......oooOO..',
  ];
  const W = idle[0].length;
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i] + r.slice(m[i].length)));
  const sink = (base, row) => ['.'.repeat(W), ...base.slice(0, row), ...base.slice(row + 1)];
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  // Eye blocks are 2 wide at cols 4-5 and 13-14, rows 7-9.
  // Eye blocks are 2 wide at cols 4-5 and 13-14, rows 7-9. Each arg is 8 chars: cols 3-6 then cols 12-15.
  const eyes = (b, ...rs) => b.map((r, j) => (j >= 7 && j <= 9 ? r.slice(0, 3) + rs[j - 7].slice(0, 4) + r.slice(7, 12) + rs[j - 7].slice(4) + r.slice(16) : r));
  const eyesClosed = b => eyes(b, 'gggggggg', 'gggggggg', 'geeggeeg');
  const eyesHappy = b => eyes(b, 'gggggggg', 'geeggeeg', 'eggeegge');
  const mouthOpen = { 11: '.olgggNeeeeeeNgdddo.', 12: '.odgggNyyYYYnNddddo.' };
  const mouthSmall = { 11: '.olgggNnneennNgdddo.' };

  const blink = eyesClosed(idle);
  const talk = mod(idle, mouthOpen);
  const talk2 = mod(idle, mouthSmall);
  const spark = ['.f.', 'fif', '.f.'];
  const happyBase = mod(eyesHappy(idle), mouthOpen);
  const happy = put(happyBase, 0, 0, spark);
  const happy2 = put(sink(happyBase, 13), 17, 0, spark);
  // Sleep: eyes shut, slumped a pixel — but the dish stays perfectly level.
  const sleepBase = sink(mod(eyesClosed(idle), { 11: '.olgggNnnnnnnNgdddo.' }), 13);
  const sleep = put(sleepBase, 17, 0, ['zzz', '..z', '.z.', 'zzz']);
  const sleep2 = put(sleepBase, 18, 0, ['zz', '.z', 'z.', 'zz']);
  // Think: pupils roll up to the top-right, beak pursed, a question mark beside the dish.
  const think = put(sink(mod(eyes(idle, 'ggieggie', 'ggeeggee', 'gggggggg'), { 11: '.olgggNnnnnNNgdddo.' }), 13),
    17, 0, ['zz.', '..z', '.z.', '...', '.z.']);
  // Fidget: the water sloshes to the right and the highlight slides with it.
  const fidget = mod(idle, { 2: '...qrrWWWWWWWwrrq...', 3: '..oqrWWWwwwwiiwRqo..' });
  const idle2 = mod(idle, { 2: '...qrrwWWWWWWWrrq...', 3: '..oqrwiiwwwwwwWRqo..' });

  // Bare head (no dish) for the entrance, before the shell bowl settles on it.
  const bare = idle.map((r, y) => (y < 4 ? '.'.repeat(W) : y <= 6 ? r.replace(/[qrRwWi]/g, y === 4 ? 'o' : 'g') : r));
  // Bow: head dips two pixels, eyes shut; the dish rides level.
  // Seen tipped forward, more of the water shows (the ellipse grows a row) — still not a drop out.
  const bow = mod(sink(sink(eyesClosed(idle), 13), 13), {
    1: '......qqqqqqqq......', 2: '....qqrrrrrrrrqq....', 3: '...qrrWWWWWWWWrrq...',
    4: '..oqrWwiiwwwwwwRqo..', 5: '..oqrwwwwwwwwwwRqo..', 6: '.oHqrrwwwwwwwwRRqHo.',
  });

  PatchDex.register({
    id: 'sara', name: 'Sara', species: 'dish-head kappa', rarity: 'common',
    blurb: 'A careful river imp who never lets a single drop of what it knows spill on the way.',
    coaching: 'Context preservation: write handoffs and summaries so the next session starts full.',
    voice: 'write it down before the dish tips.',
    hatch: 'Rain fills the cracked eggshell like a dish, and Sara surfaces underneath wearing it.',
    palette: {
      o: '#1c3a33', l: '#9fdcae', g: '#4fae84', d: '#2f8068', D: '#1f5a50', H: '#2c6e5e',
      y: '#f6dc92', Y: '#e2b65c', n: '#a87a34', N: '#5e4320',
      a: '#fcf3d2', A: '#ecd598', b: '#c4a462',
      h: '#b69a5e', s: '#8c6b3c', S: '#634526', O: '#33241a',
      q: '#3b4a5e', r: '#f4efe2', R: '#bdb6a6',
      w: '#c4ebf8', W: '#83c3df', i: '#ffffff', x: '#7fb2d6',
      e: '#142420', p: '#f2a58e', z: '#d6ecf7',
      c: '#3d7d34', C: '#24552a', v: '#9bd46a', f: '#ffd94a',
    },
    sprites: { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 20], ['blink', 2], ['idle', 14], ['fidget', 3], ['idle2', 3], ['idle', 16], ['blink', 2], ['idle', 10], ['think', 10], ['idle', 8]],
    entrance(k) {
      const out = k.eggIntro();
      const SX = 4, SY = 2; // Sara's home on the 28x22 stage.
      // Rain: short diagonal streaks, two phases so they appear to fall.
      const RAIN = [[2, 1], [9, 0], [16, 2], [23, 0], [5, 7], [20, 6], [26, 9], [1, 12], [12, 4], [24, 14], [3, 17], [25, 19]];
      const rain = (g, ph, skip = () => false) => {
        RAIN.forEach(([x, y]) => {
          const yy = (y + ph * 3) % 22, xx = x - ph;
          [[0, 0], [-1, 1]].forEach(([ax, ay]) => { if (!skip(xx + ax, yy + ay) && g[yy + ay] && g[yy + ay][xx + ax] === '.') k.px(g, xx + ax, yy + ay, 'x'); });
        });
        return g;
      };
      // The shell top, flipped into a bowl; level 0 = empty, 1 = filling, 2 = brim-full.
      const bowl = lvl => [
        lvl === 2 ? 'WwWwWwWwWwW.' : lvl === 1 ? '0.0.0.0.0.0.' : '0.0.0.0.0.0.',
        lvl === 2 ? '.0wiiwwwww0.' : lvl === 1 ? '.0WWWWWWWW0.' : '.0101010100.',
        '.0122111110.',
        '..00221100..',
        '....0000....',
      ].map((r, j) => (j === 0 && lvl === 2 ? '0' + r.slice(1, 11) + '0' : r));
      // Puddle where the egg bottom melted; drawn last so it hides Sara's lower body.
      const puddle = (g, wide = 1, ring = 0) => {
        const rows = wide ? [
          '.....WWwwwwwwwwwwWW.....',
          '..WWwwiiwwwwwwwwwwwwWW..',
          '...xxWWWWWWWWWWWWWWxx...',
        ] : ['.......WWwwwwwwWW.......', '.....xxWWWWWWWWxx.......'];
        const y0 = 22 - rows.length;
        k.stamp(g, rows, 2, y0);
        if (ring) k.stamp(g, ring === 1 ? ['..i..i..'] : ['.i......i.'], ring === 1 ? 10 : 9, y0);
        return g;
      };
      // Draw a sprite clipped above row `cut` (it is still underwater below that).
      const rise = (g, rows, dy, cut) => {
        const t = k.stamp(k.blank(), rows, SX, SY + dy);
        for (let y = 0; y < Math.min(cut, k.H); y++) for (let x = 0; x < k.W; x++) if (t[y][x] !== '.') g[y][x] = t[y][x];
        return g;
      };
      const BX = SX + 4; // bowl x so it lands exactly where the dish sits
      const eggB = (dy = 0) => k.egg(k.EGG_BOTTOM, 0, dy);
      const bowlOn = (g, lvl, y) => k.stamp(g, bowl(lvl), BX, y);
      const flipTop = k.EGG_TOP.slice(0, 5).slice().reverse();
      // Sway: body leans 1px, the dish slides 2px and has to be caught.
      const sway = d => ({ rowDx: j => (j < 6 ? 2 * d : j < 13 ? d : 0) });
      const glint = (g, n) => { (n ? [[6, 2], [21, 1], [23, 5]] : [[7, 1], [20, 3]]).forEach(([x, y]) => k.px(g, x, y, 'i')); return g; };

      out.push(
        k.f(rain(k.egg(k.EGG_C2), 0), 110, { note: 'rain' }),
        k.f(rain(k.egg(k.EGG_C2), 1), 110),
        k.f(rain(k.stamp(eggB(), k.EGG_TOP.slice(0, 5), 8, 4), 2), 90, { note: 'the top pops off' }),
        k.f(rain(k.stamp(eggB(), flipTop, 8, 2), 3), 100),
        k.f(rain(bowlOn(eggB(), 0, 3), 4), 160),
        k.f(rain(bowlOn(eggB(1), 1, 3), 5), 170, { note: 'the shell fills with rain' }),
        k.f(rain(bowlOn(puddle(eggB(4), 0), 1, 3), 6), 170),
        k.f(rain(bowlOn(puddle(k.blank()), 2, 3), 7), 220),
        k.f(bowlOn(puddle(k.blank(), 1, 1), 2, 3), 160),
        k.f(bowlOn(puddle(k.blank(), 1, 2), 2, 3), 160),
        k.f(puddle(bowlOn(rise(k.blank(), bare, 10, 19), 2, 3)), 110, { note: 'something surfaces' }),
        k.f(puddle(bowlOn(rise(k.blank(), bare, 6, 19), 2, 3)), 110),
        k.f(puddle(bowlOn(rise(k.blank(), bare, 1, 19), 2, 3)), 110),
        k.f(puddle(bowlOn(k.at(bare), 2, 4)), 120),
        k.f(glint(puddle(k.at('idle')), 0), 140, { note: 'it fits' }),
        k.f(glint(puddle(k.at('idle'), 0), 1), 140),
        k.f(k.at('idle', 0, 0, sway(-1)), 130, { note: 'wobble' }),
        k.f(k.at('idle', 0, 0, sway(1)), 130),
        k.f(k.at('idle', 0, 0, k.lean(-1)), 110),
        k.f(k.at('fidget'), 160),
        k.f(k.at('idle'), 260, { note: 'balanced' }),
        k.f(k.at(bow), 200, { note: 'a careful bow' }),
        k.f(k.at(put(bow, 9, 0, ['i', 'W'])), 160),
        k.f(k.at(bow), 220),
        k.f(k.at('idle'), 160),
        k.f(k.at('happy'), 280, { note: 'not a drop spilled' }),
        k.f(k.at('happy2'), 140),
        k.f(k.at('happy'), 240),
        k.f(k.at('blink'), 110),
        k.f(k.at('idle'), 420),
      );
      return out;
    },
  });
})();
