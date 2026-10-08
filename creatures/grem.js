// Grem — RAF-folklore gremlin. Sage-green mottled imp, little horns, swept-up ears, leather flying cap,
// brass goggles pushed up, rust scarf, a grin full of teeth. Breaks things on purpose so prod doesn't.
(function () {
  const idle = [
    '.....o........o.....',
    '....oio......oio....',
    '.....oIooooooIo.....',
    '....ohhhhcCccCCo....',
    'o...ohhhccCcccCo...o',
    'oo..oyyyycCyyyyo..oo',
    'oLo.oynNYcCynNYo.odo',
    'oLLooYYYYCCYYYYooddo',
    '.oLpLLgDggggDgddpdo.',
    '..opggweggggweddpo..',
    '...oogeeggggeedoo...',
    '....oprggggggrpo....',
    '....oggttttttddo....',
    'o.o.ogggtrrrdddo....',
    'sos..oddddddddo.....',
    'oSo.oqqqqqqqqqQQQo..',
    '.osooLgggggdggdoQQo.',
    '..oLgoggdgggggdo.Qo.',
    '...ooogggggggddo..o.',
    '.....oDDo..oDDo.....',
  ];
  const W = idle[0].length;
  // Replace whole rows by index.
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i]));
  // Overlay a small patch at x,y ('.' in the patch keeps what's underneath).
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  // Move a block of columns [x0,x1] in rows [y0,y1] by dy (ear twitches, wrench taps).
  const shift = (base, x0, x1, y0, y1, dy) => {
    const g = base.map(r => [...r]);
    for (let x = x0; x <= x1; x++) {
      const col = base.map(r => r[x]);
      for (let y = y0; y <= y1; y++) g[y][x] = '.';
      for (let y = y0; y <= y1; y++) { const ny = y + dy; if (ny >= 0 && ny < g.length && col[y] !== '.') g[ny][x] = col[y]; }
    }
    return g.map(r => r.join(''));
  };
  // Squash: drop a body row and pad the top.
  const sink = (base, row) => ['.'.repeat(W), ...base.slice(0, row), ...base.slice(row + 1)];

  const blink = mod(idle, { 9: '..opggggggggggddpo..' });
  const talk = mod(idle, { 13: 'o.o.oggrrpprrddo....' });
  const talk2 = mod(idle, { 11: '....opgggggggdpo....', 13: 'o.o.ogggggdddddo....' });
  const happyFace = { 9: '..opggeeggggeeddpo..', 10: '...ooeggeggeggeoo...', 13: 'o.o.oggrtrprrddo....' };
  const happy = mod(idle, happyFace);
  // Hop: everything up a pixel, wrench raised in triumph.
  const happy2 = shift(shift([...happy.slice(1), '.'.repeat(W)], 0, 3, 10, 18, -1), 0, 19, 18, 18, 0);
  // Sleep: goggles pulled down like a sleep mask, mouth shut on one fang.
  const goggled = mod(idle, {
    5: 'oo..ohhhccCcccCo..oo',
    6: 'oLo.ohhcccCcccCo.odo',
    7: 'oLLooCCCCCCCCCCooddo',
    8: '.oLpLyyyyCCyyyyddpdo.'.slice(0, 20),
    9: '..opgynNYCCynNYdpo..',
    10: '...ooYYYYggYYYYoo...',
  });
  const sleepBase = sink(mod(goggled, { 9: '..opgyNNYCCyNNYdpo..', 11: '....opggggggggpo....', 12: '....ogggrrrrdddo....', 13: 'o.o.oggggtgddddo....' }), 17);
  const sleep = put(sleepBase, 16, 0, ['zzz', '..z', '.z.', 'zzz']);
  const sleep2 = put(sleepBase, 17, 0, ['zz', '.z', 'zz']);
  // Think: eyes slide up-right, brow cocked, a brass "?" sparks above.
  const think = put(mod(idle, { 8: '.oLpLLgggggDggddpdo.', 9: '..opggeweggeweddpo..', 10: '...ooggggggggggoo...', 12: '....oggggttttddo....', 13: 'o.o.ogggrrrgdddo....' }),
    16, 0, ['yyy', '..y', '.y.', '...', '.y.']);
  // Fidget: right ear twitches down, wrench taps up.
  const fidget = shift(shift(idle, 16, 19, 0, 10, 1), 0, 2, 11, 16, -1);
  // Idle breath: ears perk up a pixel.
  const idle2 = shift(shift(idle, 0, 2, 0, 10, -1), 17, 19, 0, 10, -1);
  const sprites = { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget };
  const X = { goggled, goggrin: mod(goggled, { 13: 'o.o.oggrtrprrddo....' }) };
  PatchDex.register({
    id: 'grem', name: 'Grem', species: 'hangar gremlin', rarity: 'common', habit: 'verification',
    blurb: 'The RAF blamed gremlins for every engine that coughed mid-flight. This one switched sides: it still unscrews things, but only before takeoff, and it tells you which bolt.',
    coaching: 'Adversarial verification: before you trust it, try to break it. Empty input, nulls, huge input, timezones, concurrent calls, the network dropping halfway.',
    voice: 'nice code. now let me feed it an empty list at midnight on a leap day.',
    hatch: 'Something taps from inside, a tiny wrench pokes through, the rivets pop one by one, a riveted panel unscrews and falls off, and Grem climbs out in aviator goggles.',
    palette: {
      o: '#2b2a1e', D: '#3d4a2c',
      L: '#cfe0a4', g: '#98b86c', d: '#6c8a4c',
      p: '#d98a7a',
      h: '#c98a52', c: '#9a5a32', C: '#663822',
      y: '#f0c552', Y: '#a8772a',
      n: '#bfeef0', N: '#4a9bb0',
      w: '#fffbea', e: '#1c1612',
      t: '#f2ead2', r: '#5a1e24',
      i: '#f1e6c4', I: '#bfa978',
      q: '#d4583a', Q: '#97362a',
      z: '#b9c6e6', s: '#cfd8de', S: '#7f8c98',
    },
    sprites,
    loop: [
      ['idle', 18], ['idle2', 6], ['idle', 12], ['blink', 2], ['idle', 14], ['fidget', 3], ['idle', 3], ['fidget', 3],
      ['idle', 16], ['idle2', 6], ['idle', 8], ['blink', 2], ['idle', 10], ['think', 10], ['idle', 8],
    ],
    entrance(k) {
      const EX = k.eggHome.x, EY = k.eggHome.y;
      const grid = rows => rows.map(r => [...r]);
      const rowsOf = g => g.map(r => r.join(''));
      // The riveted panel: egg cols 2..9, rows 5..10 (below the crack line).
      const PX0 = 2, PX1 = 9, PY0 = 5, PY1 = 10;
      const corners = [[PX0, PY0], [PX1, PY0], [PX0, PY1], [PX1, PY1]];
      const inPanel = (x, y) => x >= PX0 && x <= PX1 && y >= PY0 && y <= PY1;
      const onSeam = (x, y) => inPanel(x, y) && (x === PX0 || x === PX1 || y === PY0 || y === PY1);
      // Egg with the panel seam scored in and rivets showing; `holes` lists corners whose bolt has popped.
      const riveted = (holes = []) => rowsOf(grid(k.EGG_C2).map((r, y) => r.map((c, x) => {
        const h = corners.findIndex(([cx, cy]) => cx === x && cy === y);
        if (h >= 0) return holes.includes(h) ? '0' : 'y';
        return onSeam(x, y) ? '3' : c;
      })));
      const PANEL = riveted([0, 1, 2, 3]).slice(PY0, PY1 + 1).map(r => r.slice(PX0, PX1 + 1));
      const holed = rowsOf(grid(riveted([0, 1, 2, 3])).map((r, y) => r.map((c, x) => (inPanel(x, y) ? '0' : c))));
      const eggG = (rows, dx = 0, dy = 0) => k.egg(rows, dx, dy);
      const ticks = (g, side) => {
        const pts = side > 0 ? [[13, 5], [14, 4], [13, 8], [14, 9]] : [[-2, 5], [-3, 4], [-2, 8], [-3, 9]];
        pts.forEach(([x, y]) => k.px(g, EX + x + side, EY + y, '7'));
        return g;
      };
      // A wrench jaw poking out of the right side of the shell.
      const jaw = (g, out, dy = 0) => {
        const J = out ? ['ssS', 'S..', 'ssS'] : ['s', 'S', 's'];
        k.stamp(g, J, EX + 12, EY + 5 + dy);
        k.px(g, EX + 11, EY + 6 + dy, 'S');
        return g;
      };
      // Bolts: brass dashes that spin away in arcs.
      const DIRS = [[-1, -1], [1, -1], [-1, 0], [1, 0]];
      const bolt = (g, j, t) => {
        const [cx, cy] = corners[j], [dx, up] = DIRS[j];
        const x = EX + cx + dx * 3 * t, y = EY + cy + (up ? -3 * t + t * t : -t + t * t);
        const spin = t % 2 ? ['yY'] : ['Y', 'y'];
        return k.stamp(g, spin, x, y);
      };
      const START = [0, 1, 2, 3];
      const boltsFrame = i => {
        const holes = START.map((s, j) => (i >= s ? j : -1)).filter(j => j >= 0);
        const g = eggG(riveted(holes));
        START.forEach((s, j) => {
          const [cx, cy] = corners[j];
          if (i === s - 1) k.px(g, EX + cx, EY + cy, 'Y');
          if (i >= s) bolt(g, j, i - s + 1);
        });
        return g;
      };
      // Panel tipping forward: foreshortened to h rows, hinge sliding down to the ground.
      const squashRows = (rows, h) => Array.from({ length: h }, (_, j) => rows[Math.min(rows.length - 1, Math.floor((j * rows.length) / h))]);
      const panelAt = (g, h, x, y) => k.stamp(g, squashRows(PANEL, h), x, y);
      // It lands flat, off to the left of the egg.
      const FLAT = ['33333333', '00000000'], FX = EX - 7;
      const puff = (g, x0, x1, y) => { [[x0 - 1, y], [x1 + 1, y], [x0, y - 1], [x1, y - 1]].forEach(([x, yy]) => k.px(g, x, yy, '1')); return g; };
      const dust = (g, y, w = 0) => puff(g, EX + PX0 - 1 - w, EX + PX1 + 1 + w, y);
      const ground = g => k.stamp(g, FLAT, FX, k.H - 2);
      // Grem seen through the hole, clipped to it.
      const inHole = (g, rows, dy) => {
        const tmp = k.at(rows, 0, dy);
        for (let y = PY0; y <= PY1; y++) for (let x = PX0; x <= PX1; x++) { const c = tmp[EY + y][EX + x]; if (c !== '.') g[EY + y][EX + x] = c; }
        return g;
      };
      const glints = g => { k.px(g, EX + 3, EY + 7, 'n'); k.px(g, EX + 8, EY + 7, 'n'); return g; };
      const hands = g => { k.stamp(g, ['oo', 'Lg', 'oo'], EX + PX0 - 1, EY + PY0 - 1); k.stamp(g, ['oo', 'gd', 'oo'], EX + PX1, EY + PY0 - 1); return g; };
      // The empty shell bursting apart behind Grem as it jumps out.
      const top = k.EGG_TOP, bottom = holed.map((r, y) => (y <= 4 ? '.'.repeat(r.length) : r));
      const shell = (t) => {
        const g = k.blank();
        if (t === 1) { k.stamp(g, top, EX - 7, EY - 5); k.stamp(g, bottom, EX, EY + 2); }
        if (t === 2) { k.stamp(g, top, EX - 12, EY - 3, { flipX: true }); k.stamp(g, bottom, EX, EY + 6); }
        return ground(g);
      };
      const out = k.eggIntro();
      out.push(
        // tink. tink. tink-tink.
        k.f(ticks(eggG(k.EGG_C2, 1), 1), 70, { note: 'tink... tink...' }),
        k.f(eggG(k.EGG_C2), 150),
        k.f(ticks(eggG(k.EGG_C2, -1), -1), 70),
        k.f(eggG(k.EGG_C2), 160),
        // a tiny wrench pokes through
        k.f(jaw(eggG(k.EGG_C2), false), 110, { note: 'a tiny wrench pokes through' }),
        k.f(jaw(eggG(k.EGG_C2), true), 220),
        k.f(jaw(eggG(k.EGG_C2), true, -1), 110),
        // the shell turns out to be riveted; the bolts pop one by one
        k.f(eggG(riveted()), 260, { note: 'riveted?' }),
        ...[0, 1, 2, 3, 4, 5].map(i => k.f(boltsFrame(i), i === 0 ? 120 : 90, i === 0 ? { note: 'ping! ping!' } : {})),
        // the panel tips forward and clanks onto the ground
        k.f(panelAt(eggG(holed), 6, EX + PX0, EY + PY0 + 1), 160, { note: 'the panel comes loose' }),
        k.f(panelAt(eggG(holed), 4, EX + PX0 - 3, EY + PY0 + 4), 70),
        k.f(panelAt(eggG(holed), 2, FX + 1, k.H - 3), 60),
        k.f(puff(ground(eggG(holed)), FX, FX + 7, k.H - 2), 220, { note: 'CLANK' }),
        // goggles glint in the dark
        k.f(glints(ground(eggG(holed))), 280, { note: 'something glints inside' }),
        k.f(ground(eggG(holed)), 90),
        k.f(hands(inHole(ground(eggG(holed)), X.goggrin, 3)), 360, { note: 'heh.' }),
        // and out it climbs, shell bursting behind it
        k.f(k.over(shell(1), X.goggled, 0, -3), 100, { note: 'Grem climbs out' }),
        k.f(k.over(shell(2), X.goggled, 0, -1), 80),
        k.f(dust(k.at(sink(X.goggled, 17)), k.H - 1, 4), 110),
        k.f(k.at(X.goggrin), 300),
        // goggles up. let's see what breaks.
        k.f(k.at('happy'), 260, { note: 'goggles up' }),
        k.f(k.at('happy2'), 120),
        k.f(k.at('happy'), 220),
        k.f(k.at('idle'), 300),
        k.f(k.at('blink'), 100),
        k.f(k.at('idle'), 420),
      );
      return out;
    },
  });
})();
