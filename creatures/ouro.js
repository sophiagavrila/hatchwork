// Ouro: a hatchling ouroboros, curled into an O with its own gold tail tip in its mouth. Coaches
// recovery from failure loops: on the third try at the same fix, stop chewing and change the angle.
(function () {
  PatchDex.register({
    id: 'ouro',
    name: 'Ouro',
    species: 'tail-biting ring serpent',
    rarity: 'uncommon',
    habit: 'recovery',
    blurb: 'A tiny emerald serpent born holding its own tail. It loves a good loop, which is exactly why it can tell when you are stuck in one.',
    coaching: 'Breaking loops: notices when the same fix is about to be tried a third time, then has you stop, step back, and either change the approach or bring in new information before going round again.',
    voice: 'third lap on the same fix. let go of the tail, try a new angle.',
    hatch: 'The crack glows gold and slips off the egg as a little snake that circles it and bites its own tail; the ring spins faster while the egg shrinks away, then it lets go with a snap and Ouro uncoils, grinning.',
    palette: {
      o: '#123a33',
      O: '#2f7458',
      D: '#1c5a45',
      d: '#2a8a5c',
      b: '#3fb46f',
      l: '#7dd88a',
      L: '#c9f3ae',
      G: '#9a6414',
      g: '#e0a52f',
      y: '#ffd96e',
      Y: '#fff2c2',
      e: '#16202c',
      w: '#ffffff',
      k: '#3a8f9e',
      p: '#f08c8c',
      m: '#5a1f2e',
      r: '#e8506a',
      z: '#bfead2',
    },
    sprites: {
      idle: [
        '....ooooooo...........',
        '...oLLlllllooo........',
        '..oLlllllyllllo.......',
        '..oLlweelllllbo.......',
        '..olbeeeblllbbo.......',
        '..obbeekbbbbbDo.......',
        '.Oobppbobbbbbdoooo....',
        '.OodbbbbooogyYyybdo...',
        'oLboddyyyygggGoybbo...',
        'obbboooooooooo.oydo...',
        'oldggo.........ogbo...',
        'obbgGo.........oydo...',
        'obdbgo.........oydo...',
        'obbbgGo.......OYbdo...',
        '.odbbyyoo...oOYlbdo...',
        '.obbdbgyyoooYYlddo....',
        '..obdbbbygygbbbdDo....',
        '...odbddbbddbddoo.....',
        '....ooooooooooo.......',
      ],
      idle2: [
        '....ooooooo...........',
        '...oLLlllllooo........',
        '..oLlllllyllllo.......',
        '..oLlweelllllbo.......',
        '..olbeeeblllbbo.......',
        '..obbeekbbbbbDo.......',
        '..obppbobbbbbdoooo....',
        '.OodbbbbooogyYyybdo...',
        '.oboddyyyygggGoybbo...',
        'oLbboooooooooo.oydo...',
        'olbbgo.........ogbo...',
        'obbggo.........oydo...',
        'olbygo.........oydo...',
        'obdbyGo.......OYlbo...',
        '.odbgyyo....oOyybdo...',
        '.obbdbyyooooYYgddo....',
        '..obdbbbygyygbbdDo....',
        '...odbbdbbddbddoo.....',
        '....ooooooooooo.......',
      ],
      blink: [
        '....ooooooo...........',
        '...oLLlllllooo........',
        '..oLlllllyllllo.......',
        '..oLlllllllllbo.......',
        '..olbeeeblllbbo.......',
        '..obbbbbbbbbbDo.......',
        '.Oobppbobbbbbdoooo....',
        '.OodbbbbooogyYyybdo...',
        'oLboddyyyygggGoybbo...',
        'obbboooooooooo.oydo...',
        'oldggo.........ogbo...',
        'obbgGo.........oydo...',
        'obdbgo.........oydo...',
        'obbbgGo.......OYbdo...',
        '.odbbyyoo...oOYlbdo...',
        '.obbdbgyyoooYYlddo....',
        '..obdbbbygygbbbdDo....',
        '...odbddbbddbddoo.....',
        '....ooooooooooo.......',
      ],
      talk: [
        '....ooooooo...........',
        '...oLLlllllooo........',
        '..oLlllllyllllo.......',
        '..oLlweelllllbo.......',
        '..olbeeeblllbbo.Ooo...',
        '..obbeekbbbbbDo.oyyo..',
        '.Oobppbobbbbbdo..oyo..',
        '.Oodbbbboommmmo.Ogdo..',
        'oLboddyyomrrmo.oYbdo..',
        'obbbooooooooo..oydo...',
        'oldggo.........ogbo...',
        'obbgGo.........oydo...',
        'obdbgo.........oydo...',
        'obbbgGo.......OYbdo...',
        '.odbbyyoo...oOYlbdo...',
        '.obbdbgyyoooYYlddo....',
        '..obdbbbygygbbbdDo....',
        '...odbddbbddbddoo.....',
        '....ooooooooooo.......',
      ],
      talk2: [
        '....ooooooo...........',
        '...oLLlllllooo........',
        '..oLlllllyllllo.......',
        '..oLlweelllllbo.......',
        '..olbeeeblllbbo.Ooo...',
        '..obbeekbbbbbDo.oyyo..',
        '.Oobppbobbbbbdo..oyo..',
        '.Oodbbbbooooooo.Ogdo..',
        'oLboddyyyygggGooYbdo..',
        'obbboooooooooo.oydo...',
        'oldggo.........ogbo...',
        'obbgGo.........oydo...',
        'obdbgo.........oydo...',
        'obbbgGo.......OYbdo...',
        '.odbbyyoo...oOYlbdo...',
        '.obbdbgyyoooYYlddo....',
        '..obdbbbygygbbbdDo....',
        '...odbddbbddbddoo.....',
        '....ooooooooooo.......',
      ],
      happy: [
        '....ooooooo.....oo....',
        '...oLLlllllooo.oYyo...',
        '..oLlllllyllllooyyo...',
        '..oLleellllllbo.obo...',
        '..olebbeblllbbo.obdo..',
        '..obbbbbbbbbbDo.obo...',
        '.OobppboobbbbbooYdo...',
        '.Oodbbbommmmmmooydo...',
        'oLboddyomrrrmo.oybo...',
        'obbbooooooooo..oydo...',
        'oldggo.........ogbo...',
        'obbgGo.........oydo...',
        'obdbgo.........oydo...',
        'obbbgGo.......OYbdo...',
        '.odbbyyoo...oOYlbdo...',
        '.obbdbgyyoooYYlddo....',
        '..obdbbbygygbbbdDo....',
        '...odbddbbddbddoo.....',
        '....ooooooooooo.......',
      ],
      happy2: [
        '....ooooooo........oo.',
        '...oLLlllllooo....oYo.',
        '..oLlllllyllllo...oygo',
        '..oLleellllllbo...obgo',
        '..olebbeblllbbo..Oydo.',
        '..obbbbbbbbbbDo..Oydo.',
        '.Oobppboobbbbbo.OYddo.',
        '.Oodbbbommmmmmo.obdo..',
        'oLboddyomrrrmo.oYbdo..',
        'obbbooooooooo..oydo...',
        'oldggo.........ogbo...',
        'obbgGo.........oydo...',
        'obdbgo.........oydo...',
        'obbbgGo.......OYbdo...',
        '.odbbyyoo...oOYlbdo...',
        '.obbdbgyyoooYYlddo....',
        '..obdbbbygygbbbdDo....',
        '...odbddbbddbddoo.....',
        '....ooooooooooo.......',
      ],
      sleep: [
        '....ooooooo.....zzz...',
        '...oLLlllllooo...z....',
        '..oLlllllyllllo.zzz...',
        '..oLlllllllllboz......',
        '..olebbeblllbboz......',
        '..obbeebbbbbbDoz......',
        '.Oobppbobbbbbdoooo....',
        '.OodbbbbooogyYyybdo...',
        'oLboddyyyygggGoybbo...',
        'obbboooooooooo.oydo...',
        'oldggo.........ogbo...',
        'obbgGo.........oydo...',
        'obdbgo.........oydo...',
        'obbbgGo.......OYbdo...',
        '.odbbyyoo...oOYlbdo...',
        '.obbdbgyyoooYYlddo....',
        '..obdbbbygygbbbdDo....',
        '...odbddbbddbddoo.....',
        '....ooooooooooo.......',
      ],
      sleep2: [
        '....ooooooo...........',
        '...oLLlllllooo...zzz..',
        '..oLlllllyllllo...z...',
        '..oLlllllllllbo..zzz..',
        '..olebbeblllbbozz.....',
        '..obbeebbbbbbDo.z.....',
        '.Oobppbobbbbbdoooo....',
        '.OodbbbbooogyYyybdo...',
        'oLboddyyyygggGoybbo...',
        'obbboooooooooo.oydo...',
        'oldggo.........ogbo...',
        'obbgGo.........oydo...',
        'obdbgo.........oydo...',
        'obbbgGo.......OYbdo...',
        '.odbbyyoo...oOYlbdo...',
        '.obbdbgyyoooYYlddo....',
        '..obdbbbygygbbbdDo....',
        '...odbddbbddbddoo.....',
        '....ooooooooooo.......',
      ],
      think: [
        '....ooooooo.....yy....',
        '...oLLlllllooo....y...',
        '..oLleewlyllllo..y....',
        '..oLleeelllllbo.......',
        '..olbeekblllbbo..y....',
        '..obbbbbbbbbbDo.......',
        '.Oobppbobbbbbdoooo....',
        '.OodbbbbooogyYyybdo...',
        'oLboddyyyygggGoybbo...',
        'obbboooooooooo.oydo...',
        'oldggo.........ogbo...',
        'obbgGo.........oydo...',
        'obdbgo.........oydo...',
        'obbbgGo.......OYbdo...',
        '.odbbyyoo...oOYlbdo...',
        '.obbdbgyyoooYYlddo....',
        '..obdbbbygygbbbdDo....',
        '...odbddbbddbddoo.....',
        '....ooooooooooo.......',
      ],
      fidget: [
        '....ooooooo...........',
        '...oLLlllllooo........',
        '..oLlllllyllllo.......',
        '..oLlewelllllbo.......',
        '..olbeeeblllbbo.......',
        '..obbkeebbbbbDooo.....',
        '.OobppbobbbbbdoYyo....',
        '.OodbbbbooogyYyyydo...',
        'oLboddyyyygggGooybo...',
        'obbboooooooooo.oydo...',
        'oldggo.........ogbo...',
        'obbgGo.........oydo...',
        'obdbgo.........oydo...',
        'obbbgGo.......OYbdo...',
        '.odbbyyoo...oOYlbdo...',
        '.obbdbgyyoooYYlddo....',
        '..obdbbbygygbbbdDo....',
        '...odbddbbddbddoo.....',
        '....ooooooooooo.......',
      ],
    },
    loop: [
      ['idle', 18], ['blink', 2], ['idle', 12], ['idle2', 10], ['idle', 10], ['think', 8], ['fidget', 3], ['idle', 2],
      ['fidget', 3], ['idle', 14], ['blink', 2], ['idle2', 10], ['idle', 8],
    ],
    entrance(k) {
      // The crack's glow peels off as a snake and circles the egg like a tilted ring, then the ring stands up
      // into Ouro's O. snake() paints a spine (tail first, head last); back points go behind the egg.
      const snake = (o) => {
        const g = k.blank(), body = k.blank();
        const pts = o.pts, n = pts.length, R = o.r || 1.3;
        const near = k.blank().map(r => r.map(() => 9));
        const disc = (p, r, fn, force) => {
          for (let y = Math.floor(p.y - 3); y <= p.y + 3; y++) for (let x = Math.floor(p.x - 3); x <= p.x + 3; x++) {
            const dx = x + 0.5 - p.x, dy = y + 0.5 - p.y, d = Math.hypot(dx, dy) / r;
            if (d > 1 || !g[y] || x < 0 || x >= k.W || (!force && d >= near[y][x])) continue;
            near[y][x] = d; k.px(g, x, y, fn(dy / r, p.nx === undefined ? 0 : (dx * p.nx + dy * p.ny) / r)); k.px(body, x, y, 'x');
          }
        };
        // Lit top edge with a travelling scale glint; the belly (inner side of the ring, or underside) is gold.
        const shade = (i, tail) => (v, inner) => (tail ? (v < -0.2 ? 'Y' : 'y') : inner < -0.45 || (inner === 0 && v > 0.4) ? 'g' : v < -0.3 ? ((n - i + (o.spin || 0)) % 12 < 3 ? 'L' : 'l') : 'b');
        const paint = back => pts.forEach((p, i) => {
          if (!!p.back !== back) return;
          const fromTail = i * (o.step || 1.5);
          const tail = fromTail < 20;
          disc(p, tail ? R * (0.75 + 0.25 * (fromTail / 20)) : R, shade(i, tail));
        });
        paint(true);
        if (o.egg) o.egg.rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') { k.px(g, o.egg.x + i, o.egg.y + j, c); k.px(body, o.egg.x + i, o.egg.y + j, 'E'); } }));
        paint(false);
        const h = pts[n - 1], q = pts[Math.max(0, n - 4)];
        const tx = h.x - q.x, ty = h.y - q.y, tm = Math.hypot(tx, ty) || 1;
        if (!h.hidden) {
          disc(h, Math.max(1.75, R * 1.3), v => (v < -0.3 ? 'l' : v > 0.5 ? 'd' : 'b'), true);
          k.px(g, Math.floor(h.x + (tx / tm) * 0.7), Math.floor(h.y - 0.6), 'e');
          if (o.bite) k.px(g, Math.floor(h.x + (tx / tm) * 1.9), Math.floor(h.y + 0.4), 'Y');
        }
        // Outline wherever the body meets empty space or the egg.
        const isB = (x, y) => body[y] && body[y][x] === 'x';
        for (let y = 0; y < k.H; y++) for (let x = 0; x < k.W; x++) {
          if (isB(x, y)) continue;
          if ((isB(x - 1, y) || isB(x + 1, y) || isB(x, y - 1) || isB(x, y + 1)) && (g[y][x] === '.' || body[y][x] === 'E')) g[y][x] = 'o';
        }
        return g;
      };
      // Spine points along a ring; angles in degrees, increasing = clockwise on screen. Tail first, head last.
      const ring = (o) => {
        const pts = [];
        for (let d = o.len; d >= 0; d -= 1.5) {
          const th = ((o.head - d) * Math.PI) / 180, x = o.cx + o.rx * Math.cos(th), y = o.cy + o.ry * Math.sin(th);
          const back = Math.sin(th) < -0.12 && o.ry < 5;
          // Inward normal only once the ring stands up; while it lies flat the underside is the belly.
          const nx = (x - o.cx) / o.rx ** 2, ny = (y - o.cy) / o.ry ** 2, nm = Math.hypot(nx, ny) || 1;
          pts.push({ x, y, back, ...(o.ry > 4.4 ? { nx: nx / nm, ny: ny / nm } : {}), hidden: back && o.egg && Math.abs(x - 14) < o.egg.rows[0].length / 2 + 0.5 });
        }
        return snake({ ...o, pts });
      };
      // A polyline spine (for the glow peeling off the crack).
      const line = (P, o = {}) => {
        const pts = [];
        for (let i = 0; i < P.length - 1; i++) {
          const [ax, ay] = P[i], [bx, by] = P[i + 1], m = Math.ceil(Math.hypot(bx - ax, by - ay) / 0.5);
          for (let j = 0; j < m; j++) pts.push({ x: ax + ((bx - ax) * j) / m, y: ay + ((by - ay) * j) / m });
        }
        pts.push({ x: P[P.length - 1][0], y: P[P.length - 1][1] });
        return snake({ ...o, pts, step: 0.5 });
      };
      // Nearest-neighbour shrink of the glowing egg, kept centred on the ring.
      const DIM = k.toGrid(k.EGG_C2).map(r => r.map(c => (c === '7' ? '1' : c)));
      const shrunk = s => {
        const w = Math.max(1, Math.round(12 * s)), h = Math.max(1, Math.round(14 * s));
        const rows = Array.from({ length: h }, (_, j) => Array.from({ length: w }, (_, i) => DIM[Math.min(13, Math.floor(((j + 0.5) * 14) / h))][Math.min(11, Math.floor(((i + 0.5) * 12) / w))]).join(''));
        return { rows, x: Math.round(14 - w / 2), y: Math.round(15 - h / 2) };
      };
      const FULL = shrunk(1);
      const R0 = { cx: 14, cy: 15.4, rx: 10.4, ry: 3.1, r: 1.3 };
      // Ring tightens from a tilted halo around the egg into Ouro's upright O.
      const R1 = { cx: 13, cy: 14.3, rx: 7.2, ry: 6.0, r: 2.1 };
      const mix = t => Object.fromEntries(Object.keys(R0).map(key => [key, R0[key] + (R1[key] - R0[key]) * t]));
      const spark = (g, n) => {
        const P = n % 2 ? [[3, 6], [24, 5], [2, 17], [25, 18], [13, 2]] : [[5, 3], [22, 2], [1, 12], [26, 12], [20, 20]];
        P.forEach(([x, y]) => { if (g[y][x] === '.') k.px(g, x, y, '7'); });
        return g;
      };
      const out = [
        ...k.eggIntro(),
        k.f(k.egg(k.EGG_C2, 0, 0, { map: { 7: 'y' } }), 200, { note: 'the crack glows gold' }),
        k.f(k.egg(k.EGG_C2, 0, 0, { map: { 7: 'Y' } }), 200),
      ];
      // The glow peels off the crack as a little snake, slides down the egg's side, and swims round it.
      const EX = k.eggHome.x, EY = k.eggHome.y;
      out.push(
        k.f(line([[EX + 3, EY + 4], [EX + 6, EY + 3], [EX + 9, EY + 4], [EX + 11.5, EY + 2.8]], { egg: FULL, r: 1.05 }), 220, { note: 'the glow peels off as a little snake' }),
        k.f(line([[EX + 7, EY + 3.4], [EX + 10, EY + 3], [EX + 12.6, EY + 4.6], [EX + 14.5, EY + 7.4]], { egg: FULL, r: 1.1 }), 140),
      );
      const A = -8;
      [[40, 48], [70, 78], [100, 108], [140, 148], [180, 188], [220, 228], [260, 268], [300, 308], [330, 338]].forEach(([head, len], i) =>
        out.push(k.f(ring({ ...R0, head: A + head, len, egg: FULL }), 90, i === 2 ? { note: 'it swims round the egg' } : {})));
      out.push(k.f(ring({ ...R0, head: A + 357, len: 357, bite: true, egg: FULL }), 460, { note: 'chomp: it bites its own tail' }));
      // Spin: bigger steps, shorter frames; the egg shrinks to nothing inside the ring.
      const SPIN = [[340, 1, 150], [25, 0.92, 130], [80, 0.82, 110], [150, 0.7, 95], [230, 0.58, 80], [320, 0.46, 70], [60, 0.34, 60], [170, 0.22, 55], [290, 0.12, 50], [50, 0.05, 50], [175, 0, 50], [235, 0, 70]];
      SPIN.forEach(([head, s, ms], i) => {
        const t = i / (SPIN.length - 1);
        const g = ring({ ...mix(t), head, len: 357, bite: true, spin: i * 7, egg: s > 0 ? shrunk(s) : null });
        out.push(k.f(i > 5 ? spark(g, i) : g, ms, i === 0 ? { note: 'the ring starts to spin' } : i === 6 ? { note: 'faster, while the egg shrinks away' } : {}));
      });
      out.push(
        k.f(spark(spark(ring({ ...R1, head: 235, len: 325 }), 0), 1), 100, { note: 'snap! it lets go' }),
        k.f(spark(k.at('talk2'), 1), 140),
        k.f(spark(k.at('happy'), 0), 260, { note: 'Ouro uncoils, grinning' }),
        k.f(k.at('happy2'), 200),
        k.f(k.at('happy'), 260),
        k.f(k.at('idle'), 480),
        k.f(k.at('blink'), 120),
        k.f(k.at('idle'), 600),
      );
      return out;
    },

  });
})();
