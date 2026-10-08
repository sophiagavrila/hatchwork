// Moss — velvet mole with a miner's headlamp. Digs to the root of things.
(function () {
  const idle = [
    '......................',
    '........oooooo........',
    '......oolLlbbdoo......',
    '.....olLloooobbdo.....',
    '....olLloyYYyobbdo....',
    '...ogggggoyyogggggo...',
    '..ollllLboooobbbbbdo..',
    '.olLlbbwebbbbwebbbbdo.',
    '.olbbbbeebbbbeebbbbdo.',
    '.olbbbpbblpplbbpbbbdo.',
    '.olbbbbblpPPplbbbbbdo.',
    '.olbbbbbllppllbbbbbdo.',
    '.olbbbbbllllllbbbbbdo.',
    '.olbbbbbbllllbbbbbbdo.',
    '.olbooooooooooooooddo.',
    '.oookpppppookpppppooo.',
    '.okppppppPookppppppPo.',
    '.opppppPPPooppppPPPPo.',
    '..okokokokookokokoko..',
    '...o.o.o.o..o.o.o.o...',
  ];
  const W = idle[0].length, H = idle.length;
  const grid = rows => rows.map(r => [...r]);
  const str = g => g.map(r => r.join(''));
  const put = (base, pts) => { const g = grid(base); pts.forEach(([x, y, c]) => { if (g[y] && g[y][x] !== undefined) g[y][x] = c; }); return str(g); };
  // Face map: eyes L(7-8) R(13-14) rows 7-8; nose rows 9-11 cols 9-12; mouth rows 12-13; lamp lens rows 4-5; paws rows 14-19.
  const shut = b => put(b, [[7, 7, 'b'], [8, 7, 'b'], [13, 7, 'b'], [14, 7, 'b']]);
  const lamp = (b, top, low) => put(b, [[9, 4, top[0]], [10, 4, top[1]], [11, 4, top[2]], [12, 4, top[3]], [10, 5, low], [11, 5, low]]);
  // Shift a block of rows [y0, y1] (cols x0..x1) by dy; vacated pixels become transparent.
  const shiftRows = (b, y0, y1, dy, x0 = 0, x1 = W - 1) => {
    const g = grid(b), src = grid(b);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) g[y][x] = '.';
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (g[y + dy] && src[y][x] !== '.') g[y + dy][x] = src[y][x];
    return str(g);
  };
  const blink = shut(idle);
  const talk = lamp(put(idle, [[10, 12, 'e'], [11, 12, 'e'], [10, 13, 'P'], [11, 13, 'P']]), 'yYYy', 'Y');
  const talk2 = put(idle, [[10, 12, 'e'], [11, 12, 'e']]);
  const arcs = b => put(b, [[7, 7, 'e'], [8, 7, 'e'], [6, 8, 'e'], [7, 8, 'b'], [8, 8, 'b'], [9, 8, 'e'], [13, 7, 'e'], [14, 7, 'e'], [12, 8, 'e'], [13, 8, 'b'], [14, 8, 'b'], [15, 8, 'e']]);
  const grin = b => put(b, [[9, 12, 'e'], [10, 12, 'e'], [11, 12, 'e'], [12, 12, 'e'], [10, 13, 'p'], [11, 13, 'p']]);
  const happy = lamp(grin(arcs(idle)), 'YYYY', 'Y');
  const happy2 = shiftRows(happy, 1, 19, -1);
  // The lamp clicks on and a little question mark appears.
  const ask = b => put(b, [[18, 0, 'y'], [19, 0, 'y'], [20, 1, 'y'], [19, 2, 'y'], [19, 4, 'y']]);
  const lookUp = b => put(b, [[7, 6, 'w'], [8, 6, 'e'], [13, 6, 'w'], [14, 6, 'e'], [7, 7, 'e'], [8, 7, 'e'], [13, 7, 'e'], [14, 7, 'e'], [7, 8, 'b'], [8, 8, 'b'], [13, 8, 'b'], [14, 8, 'b']]);
  const think = ask(lamp(lookUp(idle), 'YYYY', 'Y'));
  // Digging fidget: left paw scoops up while the star nose twitches sideways.
  const twitch = b => put(b, [[10, 9, 'b'], [12, 9, 'p'], [9, 10, 'b'], [13, 10, 'p'], [10, 10, 'p'], [10, 11, 'b'], [12, 11, 'p']]);
  const fidget = twitch(shiftRows(idle, 14, 19, -1, 1, 10));
  const off = b => lamp(b, 'lddl', 'd');
  const Z = (b, x, y, c) => put(b, [[x, y, c], [x + 1, y, c], [x + 2, y, c], [x + 2, y + 1, c], [x + 1, y + 2, c], [x, y + 3, c], [x + 1, y + 3, c], [x + 2, y + 3, c]]);
  // Slump: shut eyes, lamp off, then the head sinks a pixel into the paws.
  const slump = shiftRows(off(shut(idle)), 1, 12, 1);
  const sleep = Z(slump, 17, 0, 'L');
  const sleep2 = Z(slump, 18, 1, 'l');
  PatchDex.register({
    id: 'moss', name: 'Moss', species: 'lamplit mole', rarity: 'common',
    blurb: 'A velvety mole who would rather dig than guess. Its headlamp clicks on the moment something smells off.',
    coaching: 'Root-causing: follow the logs and traces down to the first thing that went wrong, not the loudest.',
    voice: 'the error is loud. the cause is usually quieter.',
    hatch: 'The egg sinks into the dirt, a mound tunnels across, and Moss pops up with its lamp sweeping.',
    palette: {
      o: '#21172a', d: '#45335a', b: '#65507a', l: '#8c76a6', L: '#b7a2cc',
      p: '#f7a1b8', P: '#d0708f', k: '#fff1df', e: '#170d1c', w: '#ffffff',
      y: '#ffd95a', Y: '#fffbd6', g: '#7b5236', r: '#4a3122',
    },
    sprites: { idle, blink, talk, talk2, happy, happy2, think, fidget, sleep, sleep2 },
    loop: [['idle', 24], ['blink', 2], ['idle', 14], ['fidget', 3], ['idle', 3], ['fidget', 3], ['idle', 18], ['blink', 2], ['idle', 2], ['blink', 2], ['idle', 16], ['think', 10], ['idle', 8]],
    entrance(k) {
      const out = k.eggIntro();
      const { f, W: CW, H: CH } = k;
      const GY = 19; // ground surface row
      // Packed dirt strip; `bite` hollows out the dirt at the hole Moss climbs from.
      const ground = (g, hole = null) => {
        for (let y = GY; y < CH; y++) for (let x = 0; x < CW; x++) {
          if (hole && x >= hole[0] && x <= hole[1] && y > GY) continue;
          g[y][x] = y === GY ? ((x * 7) % 9 === 0 ? 'r' : 'g') : ((x * 5 + y * 3) % 7 === 0 ? 'g' : 'r');
        }
        return g;
      };
      const crumbs = (g, pts) => { pts.forEach(([x, y, c]) => k.px(g, x, y, c || 'g')); return g; };
      // A travelling dirt mound, bottom row resting on the ground surface.
      const MOUND = [['..ooo..', '.ogggo.', 'oggrggo'], ['...ooo...', '.oogggoo.', 'oggrgggro'], ['...ooooo...', '..ogggggo..', '.oggrgggro.', 'oggggrggggo']];
      const mound = (g, cx, size = 0, dx = 0) => { const m = MOUND[size]; return k.stamp(g, m, cx - (m[0].length >> 1) + dx, GY - m.length, {}); };
      const sinking = (dy, bits) => crumbs(ground(k.egg(k.EGG, 0, dy)), bits);
      const dig = (cx, size, bits = [], dx = 0) => crumbs(mound(ground(k.blank()), cx, size, dx), bits);
      // Moss part-way out of a hole; everything below the surface is hidden by dirt.
      const emerge = (rows, dy, bits = []) => crumbs(ground(k.at(rows, 0, dy)), bits);
      // Headlamp beam: a dithered cone of light from the lamp, drawn only on empty pixels.
      const beam = (g, ang, dy = 0) => {
        const ox = 13.5, oy = 6 + dy, a = ang * Math.PI / 180;
        for (let y = 0; y < GY; y++) for (let x = 0; x < CW; x++) {
          if (g[y][x] !== '.') continue;
          const vx = x - ox, vy = y - oy, d = Math.hypot(vx, vy);
          if (d < 3 || d > 19) continue;
          let da = Math.atan2(vy, vx) - a; da = Math.atan2(Math.sin(da), Math.cos(da));
          if (Math.abs(da) < 0.26) g[y][x] = Math.abs(da) < 0.08 ? 'Y' : ((x + y) % 2 ? 'y' : '.');
        }
        return g;
      };
      const dark = off(idle);
      const squint = off(shut(idle));
      out.push(
        f(sinking(1, [[7, 18], [20, 18, 'r']]), 160, { note: 'the egg sinks' }),
        f(sinking(4, [[6, 17], [21, 17, 'r'], [10, 18]]), 120),
        f(sinking(8, [[5, 16, 'r'], [22, 16], [9, 17, 'r'], [18, 17]]), 120),
        f(sinking(12, [[5, 18], [22, 18, 'r'], [13, 17], [15, 16, 'r']]), 340),
        f(dig(14, 0), 140, { note: 'tunnelling' }),
        f(dig(18, 0, [[13, 18]]), 110),
        f(dig(22, 0, [[17, 18, 'r']]), 110),
        f(dig(19, 1, [[24, 17]]), 110),
        f(dig(15, 1, [[21, 18, 'r']]), 110),
        f(dig(14, 2), 220),
        f(dig(14, 2, [], -1), 70),
        f(dig(14, 2, [], 1), 70),
        f(emerge(squint, 12, [[6, 12], [21, 13, 'r'], [9, 9], [18, 10], [4, 16, 'r'], [24, 15]]), 110, { note: 'pop' }),
        f(emerge(squint, 4, [[5, 8, 'r'], [22, 9], [8, 5], [19, 4, 'r'], [3, 14], [25, 13]]), 100),
        f(emerge(squint, 6, [[3, 12], [25, 11, 'r']]), 360),
        f(emerge(idle, 6), 70, { note: 'click' }),
        f(emerge(dark, 6), 90),
        f(beam(emerge(idle, 6), -160, 6), 240, { note: 'sweep' }),
        f(beam(emerge(idle, 6), -125, 6), 130),
        f(beam(emerge(idle, 6), -90, 6), 130),
        f(beam(emerge(idle, 6), -55, 6), 130),
        f(beam(emerge(idle, 6), -20, 6), 280),
        f(emerge(idle, 2), 100, { note: 'climbs out' }),
        f(crumbs(k.at(happy2), [[3, 21], [24, 21, 'r'], [6, 20]]), 200),
        f(crumbs(k.at(happy), [[3, 21], [24, 21, 'r']]), 300, { note: 'found it' }),
        f(k.at(idle), 380),
        f(k.at(blink), 110),
        f(k.at(idle), 450),
      );
      return out;
    },
  });
})();
