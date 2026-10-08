// Don, grown: II Dondoko (a stormier cloud on a hoop of six taiko, a small bolt underneath), III Gorodon (a great thunderhead haloed by a full ring of eight drums, bolts crackling below).
(function () {
  const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
  const rows = g => g.map(r => r.join(''));
  const stamp = (g, x, y, art) => art.forEach((r, j) => [...r].forEach((c, i) => {
    if (c !== '.' && c !== ' ' && g[y + j] && x + i >= 0 && x + i < g[y + j].length) g[y + j][x + i] = c === '_' ? '.' : c;
  }));

  // Cloud = union of round puffs, shaded like the hatchling: outline o, lit top-left C, body c, right flank d,
  // storm belly D, and short d seams where the top lobe and the three belly lobes meet the body.
  const inP = ([cx, cy, r], x, y) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r + r * 0.4;
  const cloud = (g, { body, top, belly }, dy, mid) => {
    const sh = ([cx, cy, r]) => [cx, cy + dy, r];
    const all = [...body, top, ...belly].map(sh);
    const inn = (x, y) => all.some(p => inP(p, x, y));
    const seam = (l, x, y, ok) => ok && inP(l, x, y) && [[1, 0], [-1, 0]].some(([dx]) => !inP(l, x + dx, y) && inn(x + dx, y));
    for (let y = 0; y < g.length; y++) for (let x = 0; x < g[0].length; x++) {
      if (!inn(x, y)) continue;
      if (!inn(x - 1, y) || !inn(x + 1, y) || !inn(x, y - 1) || !inn(x, y + 1)) { g[y][x] = 'o'; continue; }
      let c = 'c';
      if (!inn(x, y + 2)) c = 'D';
      else if (!inn(x, y + 3)) c = 'd';
      else if (x < mid && (!inn(x, y - 2) || !inn(x - 2, y))) c = 'C';
      else if (x > mid && (!inn(x + 2, y) || !inn(x, y - 2))) c = 'd';
      const t = sh(top);
      if (c !== 'D' && (seam(t, x, y, y <= t[1] + 1) || belly.map(sh).some(l => seam(l, x, y, y >= l[1] - 1)))) c = 'd';
      g[y][x] = c;
    }
  };
  const hoop = (g, cx, cy, rx, ry, upper = false) => {
    for (let t = 0; t < (upper ? 180 : 360); t += 2) {
      const a = t * Math.PI / 180, x = Math.round(cx + rx * Math.cos(a)), y = Math.round(cy - ry * Math.sin(a));
      if (y < cy && Math.abs(x - cx) < 4.5) continue;
      if (g[y] && g[y][x] !== undefined) g[y][x] = y < cy ? 'm' : 'M';
    }
  };
  const DRUM = ['.RrR.', 'rWWWr', 'rWRWr', 'rsWsr', '.RrR.'];
  const DRUM_HIT = ['.yyy.', 'yWWWy', 'yWWWy', 'yWWWy', '.yyy.'];
  const ring = (g, cx, cy, rx, ry, angles, hit = -1) => angles.forEach((t, i) => {
    const a = t * Math.PI / 180;
    stamp(g, Math.round(cx + rx * Math.cos(a)) - 2, Math.round(cy - ry * Math.sin(a)) - 2, i === hit ? DRUM_HIT : DRUM);
  });

  // Faces: eyes are 2 wide; lx = left eye column, rx = right eye column, ey = top eye row, mx = mouth left column.
  const EYES = {
    open: ['we', 'ee', 'ee'],
    blink: ['..', '..', 'ee'],
    happy: ['..', '.e', 'e.'],
    up: ['ew', 'ee', '..'],
    side: ['.w', 'ee', 'ee'],
  };
  const face = (g, f, o) => {
    const L = EYES[o.eyes] || EYES.open;
    let R = L;
    if (o.eyes === 'happy') R = ['..', 'e.', '.e'];
    stamp(g, f.lx, f.ey + o.dy, L);
    stamp(g, f.rx, f.ey + o.dy, R);
    if (o.eyes === 'blink') { stamp(g, f.lx, f.ey + 2 + o.dy, ['ee']); stamp(g, f.rx, f.ey + 2 + o.dy, ['ee']); }
    if (f.brows && o.brows !== false) {
      stamp(g, f.lx, f.ey - 3 + o.dy, ['o.', '.o']);
      stamp(g, f.rx, f.ey - 3 + o.dy, ['.o', 'o.']);
    }
    stamp(g, f.lx - 2, f.ey + 3 + o.dy, ['pp']);
    stamp(g, f.rx + 2, f.ey + 3 + o.dy, ['pp']);
    const M = f.mouths[o.mouth || 'smile'];
    stamp(g, f.mx, f.ey + (f.my || 4) + o.dy, M);
  };

  // ── II · Dondoko ──────────────────────────────────────────────────────────────
  const W2 = 25, H2 = 21;
  const CLOUD2 = {
    body: [[12, 10.5, 5.6], [7, 10.5, 3.6], [17, 10.5, 3.6], [8.5, 7.5, 3], [15.5, 7.5, 3], [6, 12.5, 2.4], [18, 12.5, 2.4]],
    top: [12, 5.2, 2.4],
    belly: [[7.5, 15, 2.1], [12, 15.4, 2.3], [16.5, 15, 2.1]],
  };
  const ANG2 = [195, 155, 120, 60, 25, -15];
  const F2 = {
    lx: 9, rx: 14, ey: 8,
    mouths: { smile: ['e...e', '.eee.'], talk: ['.eee.', '.ehe.', '..e..'], talk2: ['.eee.', '.eee.'], grin: ['eeeee', '.ehe.'], o: ['..e..', '.e.e.', '..e..'], flat: ['.....', '.eee.'], sleep: ['.....', '..e..'] },
  };
  const F2m = { ...F2, mx: 10 };
  const HORN2 = ['h...h', 'hH.Hh', '.H.H.'];
  const BOLT2 = ['.yy', 'yW.', '.Wy', 'yW.', 'Y..'];
  const BOLT2B = ['..y', '.yW', 'yW.', '.Wy', '..Y'];
  const make2 = (o = {}) => {
    o = { dy: 0, eyes: 'open', mouth: 'smile', bolt: 1, hit: -1, ...o };
    const g = grid(W2, H2);
    hoop(g, 12, 9, 10, 8, true);
    ring(g, 12, 9, 10, 8, ANG2, o.hit);
    cloud(g, CLOUD2, o.dy, 12);
    stamp(g, 10, 1 + o.dy, HORN2);
    if (o.bolt === 1) stamp(g, 11, 16 + o.dy, BOLT2);
    if (o.bolt === 2) stamp(g, 11, 16 + o.dy, BOLT2B);
    face(g, F2m, o);
    if (o.fx) o.fx.forEach(([x, y, a]) => stamp(g, x, y, a));
    return rows(g);
  };
  const s2 = {
    idle: make2(),
    idle2: make2({ dy: 1, bolt: 2 }),
    blink: make2({ eyes: 'blink' }),
    talk: make2({ mouth: 'talk' }),
    talk2: make2({ mouth: 'talk2', bolt: 2 }),
    happy: make2({ eyes: 'happy', mouth: 'grin', fx: [[0, 0, ['y']], [24, 1, ['y']], [1, 18, ['y']], [23, 17, ['y']]] }),
    happy2: make2({ eyes: 'happy', mouth: 'grin', dy: -1, bolt: 2, hit: 0, fx: [[0, 4, ['y.', '.y']], [23, 18, ['y']]] }),
    sleep: make2({ eyes: 'blink', mouth: 'sleep', bolt: 0, dy: 1, fx: [[20, 15, ['zzz', '..z', '.z.', 'zzz']]] }),
    sleep2: make2({ eyes: 'blink', mouth: 'sleep', bolt: 0, dy: 1, fx: [[21, 14, ['zzz', '..z', '.z.', 'zzz']], [20, 19, ['z']]] }),
    think: make2({ eyes: 'up', mouth: 'flat', bolt: 0, fx: [[21, 15, ['yy.', '..y', '.y.', '...', '.y.']]] }),
    fidget: make2({ eyes: 'side', mouth: 'o', hit: 5, bolt: 2, fx: [[22, 15, ['y.y', '.y.']]] }),
  };

  // ── III · Gorodon ─────────────────────────────────────────────────────────────
  const W3 = 28, H3 = 22;
  const CLOUD3 = {
    body: [[13.5, 10, 6], [8, 10, 4], [19, 10, 4], [9.5, 6.8, 3.3], [17.5, 6.8, 3.3], [6.5, 12, 2.6], [20.5, 12, 2.6]],
    top: [13.5, 4.6, 3.3],
    belly: [[8.5, 14, 2.2], [13.5, 14.4, 2.5], [18.5, 14, 2.2]],
  };
  const ANG3 = [15, 60, 120, 165, 200, 245, 295, 340];
  const F3 = {
    lx: 10, rx: 16, ey: 8, mx: 12, my: 3, brows: true,
    mouths: { smile: ['e..e', '.ee.'], talk: ['.ee.', 'ehhe', '.ee.'], talk2: ['.ee.', '.ee.'], grin: ['eeee', 'ehhe', '.ee.'], o: ['.ee.', 'e..e', '.ee.'], flat: ['....', '.ee.'], sleep: ['....', '.ee.'] },
  };
  const HORN3 = ['h....h', 'hH..Hh', '.H..H.'];
  const BOLT3 = ['..yy', '.yW.', 'yWWy', '..Wy', '.yW.', '.Y..'];
  const BOLT3B = ['.yy.', '..Wy', '.yW.', 'yWWy', '.Wy.', 'Y...'];
  const ZAP = ['.yy', 'yW.', '.Wy', 'y..'];
  const make3 = (o = {}) => {
    o = { dy: 0, eyes: 'open', mouth: 'smile', bolt: 1, hit: -1, ...o };
    const g = grid(W3, H3);
    hoop(g, 13.5, 10, 12, 8.5);
    ring(g, 13.5, 10, 12, 8.5, ANG3, o.hit);
    cloud(g, CLOUD3, o.dy, 13.5);
    stamp(g, 11, 0 + o.dy, HORN3);
    if (o.bolt === 1) { stamp(g, 12, 16 + o.dy, BOLT3); stamp(g, 1, 17, ZAP); }
    if (o.bolt === 2) { stamp(g, 12, 16 + o.dy, BOLT3B); stamp(g, 23, 17, ZAP); }
    face(g, F3, o);
    if (o.fx) o.fx.forEach(([x, y, a]) => stamp(g, x, y, a));
    return rows(g);
  };
  const s3 = {
    idle: make3(),
    idle2: make3({ dy: 1, bolt: 2 }),
    blink: make3({ eyes: 'blink' }),
    talk: make3({ mouth: 'talk' }),
    talk2: make3({ mouth: 'talk2', bolt: 2 }),
    happy: make3({ eyes: 'happy', mouth: 'grin', brows: false, fx: [[0, 0, ['y']], [27, 0, ['y']], [0, 20, ['y']], [27, 21, ['y']]] }),
    happy2: make3({ eyes: 'happy', mouth: 'grin', brows: false, dy: -1, bolt: 2, hit: 1, fx: [[23, 0, ['y.', '.y']]] }),
    sleep: make3({ eyes: 'blink', mouth: 'sleep', brows: false, bolt: 0, dy: 1, fx: [[23, 17, ['zzz', '..z', '.z.', 'zzz']]] }),
    sleep2: make3({ eyes: 'blink', mouth: 'sleep', brows: false, bolt: 0, dy: 1, fx: [[24, 16, ['zzz', '..z', '.z.', 'zzz']], [23, 21, ['z']]] }),
    think: make3({ eyes: 'up', mouth: 'flat', bolt: 0, fx: [[24, 16, ['yy.', '..y', '.y.', '...', '.y.']]] }),
    fidget: make3({ eyes: 'side', mouth: 'o', hit: 0, bolt: 2 }),
  };

  PatchDex.evolve('don', {
    habit: 'recovery',
    stages: [
      {
        name: 'Dondoko',
        species: 'storm drum cloud',
        blurb: 'Don grew heavier with rain and strung its drums on a hoop. A small bolt hangs under it, ready to strike the moment a build goes red.',
        voice: 'red build. dondoko. everyone stops, we fix it, we go on.',
        evolve: 'The cloud darkened and took on two more drums: you stop and fix a broken build before anything else, every time.',
        palette: {},
        sprites: s2,
        loop: [['idle', 20], ['blink', 2], ['idle', 6], ['idle2', 6], ['idle', 6], ['idle2', 6], ['idle', 14], ['fidget', 2], ['idle', 3], ['fidget', 2],
          ['idle', 16], ['blink', 2], ['idle', 10], ['think', 10], ['idle', 8]],
      },
      {
        name: 'Gorodon',
        species: 'great thunderhead',
        blurb: 'A great thunderhead wearing a full ring of eight drums like a halo. When it sounds, the whole valley stops, and nobody minds, because it is always right.',
        voice: 'the drum sounded. nothing ships on red. fix it first, calmly.',
        evolve: 'The ring closed: recovery comes first by habit now. When CI breaks you fix it before new work, and the team trusts the alarm.',
        palette: {},
        sprites: s3,
        loop: [['idle', 20], ['blink', 2], ['idle', 6], ['idle2', 6], ['idle', 6], ['idle2', 6], ['idle', 14], ['fidget', 2], ['idle', 3], ['fidget', 2],
          ['idle', 16], ['blink', 2], ['idle', 10], ['think', 10], ['idle', 8]],
      },
    ],
  });
})();
