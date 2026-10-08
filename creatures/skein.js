// Skein — yarn-wool sheep. Sky-blue wool wound like a ball, loose strand tail.
(function () {
  const idle = [
    '..........ooo.ooo.....',
    '....ooo..olllollbbo...',
    '...olllooolllllbbbbo..',
    '...olllolllllbbbbbyo..',
    '...ollbbolllbbbbyybo..',
    '..occcccooybbbyybbbo..',
    '.occcccoHHobbyybbbbbo.',
    '.ocewccHhhHoybbbbyydoo',
    'occeeccHhoHobbbbyddoyo',
    'occcccpoHhobbbbydddoyo',
    'ocnccccsooobbbyddddoyo',
    '.occcsssoobbdydddyo..y',
    '..oooooo..odydodyodo..',
    '.........osoosodoodo..',
    '.........oDooDoDooDo..',
  ];
  const W = idle[0].length;
  const mod = (base, m) => base.map((r, i) => {
    if (m[i] === undefined) return r;
    const [x, str] = typeof m[i] === 'string' ? [0, m[i]] : m[i];
    return r.slice(0, x) + str + r.slice(x + str.length);
  });
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const blank = '.'.repeat(W);
  const shut = { 7: '.occccc', 8: 'oceeccc' };
  const blink = mod(idle, shut);
  const talk = mod(idle, { 10: [3, 'm'], 11: [2, 'mm'] });
  const talk2 = mod(idle, { 11: [2, 'mm'] });
  const happy = mod(idle, { 7: '.occecc', 8: 'occecec', 9: 'occcccp', 10: [3, 'm'], 11: [2, 'mm'] });
  const happy2 = [...happy.slice(1, 13), mod([happy[13]], { 0: [9, 'osoosodoodo'] })[0], happy[14].replace(/oDo/g, '.o.').replace(/oDoo/, '.o.o'), blank];
  const think = put(mod(idle, { 6: '.ocewcc', 7: '.oceecc', 8: 'occcccc', 10: [3, 'm'] }), 0, 0, ['zz.', '..z', '.z.', '...', '.z.']);
  const tailUp = { 5: [19, 'oyy'], 6: [20, 'oy'], 7: [20, 'yo'], 8: [20, 'yo'], 9: [20, 'o.'], 10: [20, 'o.'], 11: [20, '..'] };
  const fidget = mod(idle, tailUp);
  // Sleep: legs fold under, body settles 2px, eyes shut in soft curves.
  const settled = [blank, blank, ...mod(idle, { 7: '.occccc', 8: 'oceeccc', 12: '..oooooo.ooooooooooo..' }).slice(0, 13)];
  const sleep = put(settled, 0, 0, ['zzz', '..z', '.z.', 'zzz']);
  const sleep2 = put(settled, 0, 1, ['zzz', '..z', '.z.', 'zzz']);
  PatchDex.register({
    id: 'skein', name: 'Skein', species: 'yarn-wool sheep', rarity: 'common',
    blurb: 'A patient sheep wound from one long thread. It knows exactly where every loop began.',
    coaching: 'Long sessions: notice when context has tangled, summarize, and /compact before it knots.',
    voice: 'this thread is getting long. want to wind it up?',
    hatch: 'A strand of yarn unspools from the crack, the egg unravels into a ball, and the ball fluffs up into Skein.',
    palette: {
      o: '#2b3358', l: '#d4ebff', b: '#9cc7f0', d: '#5f8fcf', y: '#4a6fb5',
      c: '#fdf3e3', s: '#ead2b6', n: '#f19ab3', p: '#f7b8c6', e: '#2a2238', w: '#ffffff',
      m: '#b8546e', z: '#c9dcf2', H: '#e8b47c', h: '#a96f43', D: '#5b4a63',
    },
    sprites: { idle, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 24], ['blink', 2], ['idle', 14], ['fidget', 6], ['idle', 18], ['blink', 2], ['idle', 2], ['blink', 2], ['idle', 16], ['think', 10], ['idle', 10]],
    entrance(k) {
      const out = k.eggIntro();
      const floor = k.H - 1;
      // A procedural yarn ball: shaded disc with wrap arcs; `spin` slides the wraps so it reads as rolling.
      const ball = (g, cx, r, spin = 0) => {
        const cy = floor - r + 0.5;
        const inn = (x, y) => Math.hypot(x - cx, y - cy) <= r;
        for (let y = 0; y < k.H; y++) for (let x = 0; x < k.W; x++) {
          if (!inn(x, y)) continue;
          if (!inn(x - 1, y) || !inn(x + 1, y) || !inn(x, y - 1) || !inn(x, y + 1)) { g[y][x] = 'o'; continue; }
          const t = ((x - cx) * 0.6 + (y - cy) * 0.8) / r;
          let ch = t < -0.45 ? 'l' : t < 0.35 ? 'b' : 'd';
          const d = Math.hypot(x - (cx + r * 1.7), y - (cy + r * 1.7)) + spin;
          if (ch !== 'l' && Math.abs((d % 2.6) - 1.3) < 0.42) ch = 'y';
          g[y][x] = ch;
        }
        return g;
      };
      const strand = (g, pts) => { pts.forEach(([x, y]) => { if (g[y] && g[y][x] !== undefined) g[y][x] = 'y'; }); return g; };
      // Egg with its top `n` rows already unwound.
      const unwound = n => k.egg(k.EGG_C2.map((r, i) => (i < n ? '.'.repeat(r.length) : r)));
      const S1 = [[14, 8], [14, 7], [15, 6]];
      const S2 = [...S1, [16, 5], [17, 5], [18, 6], [19, 7]];
      const S3 = (top, bx) => [[14, top], [15, top - 1], [16, top - 2], [17, top - 2], [18, top - 1], [19, top], [20, top + 1], [bx, top + 2]];
      const trail = n => Array.from({ length: n }, (_, i) => [6 + i * 2, floor]);
      out.push(
        k.f(strand(k.egg(k.EGG_C2), S1), 160, { note: 'a loose thread' }),
        k.f(strand(k.egg(k.EGG_C2, 0, 0, k.lean(1)), S2), 140),
        k.f(ball(strand(unwound(2), [...S3(10, 21), [21, 13], [21, 14], [21, 15]]), 22, 2, 0), 110, { note: 'unravelling' }),
        k.f(ball(strand(unwound(5), [...S3(13, 21), [21, 16]]), 22, 3, 0.8), 110),
        k.f(ball(strand(unwound(8), S3(16, 21)), 22, 3.5, 1.6), 110),
        k.f(ball(strand(unwound(11), [[14, 19], [15, 18], [16, 18], [17, 18], [18, 19]]), 22, 4, 2.4), 110),
        k.f(ball(k.blank(), 21, 4.5, 3.2), 200),
        k.f(ball(k.blank(), 18, 4.5, 2.2), 110, { note: 'rolling' }),
        k.f(ball(k.blank(), 15, 4.5, 1.2), 110),
        k.f(ball(k.blank(), 13, 4.5, 0.4), 140),
        k.f(ball(k.blank(), 12, 4.5, 0), 260),
        k.f(ball(k.blank(), 13, 5, 0), 90),
        k.f(k.at('sleep2', 0, 0).map(r => r.map(c => (c === 'z' ? '.' : c))), 160, { note: 'fluff' }),
        k.f(k.at('happy2'), 120),
        k.f(k.at('happy'), 320),
        k.f(k.at('fidget'), 160),
        k.f(k.at('idle'), 200),
        k.f(k.at('blink'), 110),
        k.f(k.at('idle'), 420),
      );
      return out;
    },
  });
})();
