// Fold — the rare planner. An origami crane made of one folded sheet: faceted paper, crisp creases, a vermilion hanko cheek.
(function () {
  // @gen-start
  const S = {
    idle: [
      '..........oo..........',
      'oo.......orro.......oo',
      'olo......olbo......obo',
      'oslo....oblbso....obdo',
      '.oslo...ollbbo...obdo.',
      '.osllo.obllbbso.obbdo.',
      '..oslo.olllbbbo.obdo..',
      '..osllollllbbbbobbdo..',
      '...ololwellbbwebobo...',
      '...oolleellbbeebboo...',
      '...oolleellbbeebboo...',
      '....ollllleebbrrbo....',
      '....ollllllbbbrRbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    idle2: [
      '..........oo..........',
      '.........orro.........',
      'oo.......olbo.......oo',
      'olo.....oblbso.....obo',
      'oslo....ollbbo....obdo',
      '.oslo..obllbbso..obdo.',
      '.osllo.olllbbbo.obbdo.',
      '..osllollllbbbbobbdo..',
      '..ollolwellbbwebobbo..',
      '...oolleellbbeebboo...',
      '...oolleellbbeebboo...',
      '...oollllleebbrrboo...',
      '....ollllllbbbrRbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    blink: [
      '..........oo..........',
      'oo.......orro.......oo',
      'olo......olbo......obo',
      'oslo....oblbso....obdo',
      '.oslo...ollbbo...obdo.',
      '.osllo.obllbbso.obbdo.',
      '..oslo.olllbbbo.obdo..',
      '..osllollllbbbbobbdo..',
      '...ololllllbbbbbobo...',
      '...oollllllbbbbbboo...',
      '...oolleellbbeebboo...',
      '....ollllleebbrrbo....',
      '....ollllllbbbrRbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    talk: [
      '..........oo..........',
      'oo.......orro.......oo',
      'olo......olbo......obo',
      'oslo....oblbso....obdo',
      '.oslo...ollbbo...obdo.',
      '.osllo.obllbbso.obbdo.',
      '..oslo.olllbbbo.obdo..',
      '..osllollllbbbbobbdo..',
      '...ololwellbbwebobo...',
      '...oolleellbbeebboo...',
      '...oolleellbbeebboo...',
      '....ollllleebbrrbo....',
      '....olllllrrbbrRbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    talk2: [
      '..........oo..........',
      '.........orro.........',
      'oo.......olbo.......oo',
      'olo.....oblbso.....obo',
      'oslo....ollbbo....obdo',
      '.oslo..obllbbso..obdo.',
      '.osllo.olllbbbo.obbdo.',
      '..osllollllbbbbobbdo..',
      '..ollolwellbbwebobbo..',
      '...oolleellbbeebboo...',
      '...oolleellbbeebboo...',
      '...oollllleebbrrboo...',
      '....ollllleebbrRbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    happy: [
      'oo........oo........oo',
      'olo......orro......obo',
      'oslo.....olbo.....obdo',
      '.oslo...oblbso...obdo.',
      '.osllo..ollbbo..obbdo.',
      '..oslo.obllbbso.obdo..',
      '..oslloolllbbboobbdo..',
      '...ollollllbbbbobbo...',
      '...ololllllbbbbbobo...',
      '...oolleellbbeebboo...',
      '....olellelbebbebo....',
      '....ollllelbebrrbo....',
      '....ollllleebbrRbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    happy2: [
      '..........oo..........',
      '.........orro.........',
      '.........olbo.........',
      'oo......oblbso......oo',
      'olo.....ollbbo.....obo',
      'oslo...obllbbso...obdo',
      '.oslo..olllbbbo..obdo.',
      '.oslloollllbbbboobbdo.',
      '..ollolllllbbbbbobbo..',
      '..ololleellbbeebbobo..',
      '...oolellelbebbeboo...',
      '...oollllleebbrrboo...',
      '...oolllllrrbbrRboo...',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    sleep: [
      '..........oo.....sss..',
      '.........orro......s..',
      '.........olbo.....s...',
      '........oblbso...sss..',
      '........ollbbo........',
      'oo.....obllbbso.....oo',
      'olo....olllbbbo....obo',
      'oslo..ollllbbbbo..obdo',
      '.osloolllllbbbbboobdo.',
      '.ollolellelbebbebobbo.',
      '..ololleellbbeebbobo..',
      '..ooollllleebbrrbooo..',
      '....ollllllbbbrRbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    sleep2: [
      '..........oo...ssss...',
      '.........orro.....s...',
      '.........olbo....s....',
      '........oblbso..s.....',
      '........ollbbo.ssss...',
      'oo.....obllbbso.....oo',
      'olo....olllbbbo....obo',
      'oslo..ollllbbbbo..obdo',
      '.osloolllllbbbbboobdo.',
      '.ollolellelbebbebobbo.',
      '..ololleellbbeebbobo..',
      '..ooollllleebbrrbooo..',
      '....ollllllbbbrRbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    think: [
      '.....sss..oo..........',
      'oo.....s.orro.......oo',
      'olo...ss.olbo......obo',
      'oslo....oblbso....obdo',
      '.oslo.s.ollbbo...obdo.',
      '.osllo.obllbbso.obbdo.',
      '..oslo.olllbbbo.obdo..',
      '..osllollllbbbbobbdo..',
      '...olollewlbbbewobo...',
      '...oollleelbbbeeboo...',
      '...oollleelbbbeeboo...',
      '....ollllleebbrrbo....',
      '....ollllllbbbrRbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    fidget: [
      '..........oo..........',
      'oo.......orro.........',
      'olo......olbo.........',
      'oslo....oblbso........',
      '.oslo...ollbbo......oo',
      '.osllo.obllbbso....obo',
      '..oslo.olllbbbo...obdo',
      '..osllollllbbbbo.obdo.',
      '...ololwellbbwebobbdo.',
      '...oolleellbbeebbobo..',
      '...oolleellbbeebbobo..',
      '....ollllleebbrrboo...',
      '....ollllllbbbrRboo...',
      '.....obbbbbsssssooo...',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
  };
  const X = {
    kite: [
      '..........oo..........',
      '.........olbo.........',
      '.........olbo.........',
      '........oblbso........',
      '........ollbbo........',
      '.......obllbbso.......',
      '.......olllbbbo.......',
      '......ollllbbbbo......',
      '.....olllllbbbbbo.....',
      '....ollllllbbbbbbo....',
      '....ollllllbbbbbbo....',
      '....ollllllbbbbbbo....',
      '....ollllllbbbbbbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    low: [
      '..........oo..........',
      '.........olbo.........',
      '.........olbo.........',
      '........oblbso........',
      '........ollbbo........',
      'oo.....obllbbso.....oo',
      'olo....olllbbbo....obo',
      'oslo..ollllbbbbo..obdo',
      '.osloolllllbbbbboobdo.',
      '.ollollllllbbbbbbobbo.',
      '..ololleellbbeebbobo..',
      '..ooollllleebbbbbooo..',
      '....ollllllbbbbbbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    mid: [
      '..........oo..........',
      '.........olbo.........',
      '.........olbo.........',
      'oo......oblbso......oo',
      'olo.....ollbbo.....obo',
      'oslo...obllbbso...obdo',
      '.oslo..olllbbbo..obdo.',
      '.oslloollllbbbboobbdo.',
      '..ollolllllbbbbbobbo..',
      '..olollllllbbbbbbobo..',
      '...oolleellbbeebboo...',
      '...oollllleebbbbboo...',
      '...oollllllbbbbbboo...',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    up: [
      'oo........oo........oo',
      'olo......olbo......obo',
      'oslo.....olbo.....obdo',
      '.oslo...oblbso...obdo.',
      '.osllo..ollbbo..obbdo.',
      '..oslo.obllbbso.obdo..',
      '..oslloolllbbboobbdo..',
      '...ollollllbbbbobbo...',
      '...ololwellbbwebobo...',
      '...oolleellbbeebboo...',
      '....olleellbbeebbo....',
      '....ollllleebbbbbo....',
      '....olllllrrbbbbbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
    bare: [
      '..........oo..........',
      'oo.......olbo.......oo',
      'olo......olbo......obo',
      'oslo....oblbso....obdo',
      '.oslo...ollbbo...obdo.',
      '.osllo.obllbbso.obbdo.',
      '..oslo.olllbbbo.obdo..',
      '..osllollllbbbbobbdo..',
      '...ololwellbbwebobo...',
      '...oolleellbbeebboo...',
      '...oolleellbbeebboo...',
      '....ollllleebbbbbo....',
      '....ollllllbbbbbbo....',
      '.....obbbbbssssso.....',
      '......obbbbsssso......',
      '.......obbbssso.......',
      '........obbsso........',
      '.........obso.........',
      '..........oo..........',
      '......................',
    ],
  };
  // @gen-end

  PatchDex.register({
    id: 'fold',
    name: 'Fold',
    species: 'origami crane',
    rarity: 'rare',
    blurb: 'Folded from a single sheet with no cuts and no tape. It plans every crease before it makes the first one.',
    coaching: 'Plans before cutting code: sketches the steps, names the creases (interfaces, edge cases, order of work), and only then lets you fold.',
    voice: 'measure twice, fold once. what are the steps?',
    hatch: 'The egg flattens into a square sheet, then folds step by step — square, triangle, kite, crane — each crease flashing as it lands.',
    palette: {
      o: '#3d3552', e: '#1d1a2b', w: '#ffffff',
      l: '#fffdf6', b: '#ece5d8', s: '#cbc2b6', d: '#9f97ad',
      r: '#e8452c', R: '#9e2a1d',
    },
    sprites: S,
    loop: [['idle', 30], ['blink', 2], ['idle', 22], ['idle2', 4], ['idle', 18], ['fidget', 5], ['idle', 26], ['blink', 2], ['idle', 6], ['blink', 2], ['idle', 20], ['think', 14]],
    entrance(k) {
      const { f, blank, px, W, H } = k;
      const CX = 13.5, CY = 13, R = 7;
      // Fill a shape described by fn(u, y) -> colour|null, then outline its silhouette with 'o'.
      const solid = (fn, g = blank()) => {
        const m = [];
        for (let y = 0; y < H; y++) { m.push([]); for (let x = 0; x < W; x++) m[y].push(fn(x - CX, y)); }
        const on = (x, y) => x >= 0 && y >= 0 && x < W && y < H && m[y][x];
        for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
          if (!m[y][x]) continue;
          const edge = !on(x - 1, y) || !on(x + 1, y) || !on(x, y - 1) || !on(x, y + 1);
          px(g, x, y, edge ? 'o' : m[y][x]);
        }
        return g;
      };
      const tone = (u, y, lit) => (y < CY ? (u < 0 ? (lit ? 'l' : 'b') : (lit ? 'b' : 's')) : (u < 0 ? 'b' : 's'));
      // Square sheet as a diamond; the top flap is foreshortened to hTop rows as it tilts toward you.
      const sheet = hTop => solid((u, y) => {
        const a = Math.abs(u);
        if (y >= CY && y <= CY + R) return a <= R + 0.5 - (y - CY) ? tone(u, y) : null;
        if (y < CY && y >= CY - hTop) return a <= R + 0.5 - (CY - y) * (R / hTop) ? tone(u, y, hTop === R) : null;
        return null;
      });
      // The top flap after it passes horizontal: a bright triangle laid over the bottom half.
      const flapDown = (g, h) => {
        const ins = (u, y) => y >= CY && y <= CY + h && Math.abs(u) <= R + 0.5 - (y - CY) * (R / h);
        for (let y = CY; y <= CY + h; y++) for (let x = 0; x < W; x++) {
          const u = x - CX;
          if (!ins(u, y)) continue;
          const lip = !ins(u, y + 1) || !ins(u - 1, y) || !ins(u + 1, y);
          if (g[y][x] !== 'o') px(g, x, y, lip ? 'o' : (u < 0 ? 'l' : 'b'));
        }
        return g;
      };
      const tri = () => sheet(0.0001);
      const crease = (g, pts) => { pts.forEach(([x, y]) => { if (g[y][x] !== '.' && g[y][x] !== 'o') px(g, x, y, '7'); }); return g; };
      const row = (y, x0, x1) => Array.from({ length: x1 - x0 + 1 }, (_, i) => [x0 + i, y]);
      const col = (x, y0, y1) => Array.from({ length: y1 - y0 + 1 }, (_, i) => [x, y0 + i]);
      // Squash the shell: nearest-neighbour resample of the glowing egg.
      const squish = (w, h) => {
        const src = k.EGG, sw = src[0].length, sh = src.length, g = blank();
        const x0 = Math.round(CX - w / 2 + 0.5), y0 = H - 1 - h;
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
          const c = src[Math.floor((y * sh) / h)][Math.floor((x * sw) / w)];
          if (c !== '.') px(g, x0 + x, y0 + y, c === '1' || c === '2' ? '7' : c);
        }
        return g;
      };
      const glowEgg = k.egg(k.EGG, 0, 0, { map: { 1: '7', 2: '7' } });
      // Corners lift as the triangle collapses into a kite.
      const lift = solid((u, y) => {
        const a = Math.abs(u);
        if (y >= CY) return a <= 6.5 - (y - CY) ? tone(u, y) : null;
        return y >= 6 && a <= 0.5 + (y - 6) * 0.9 ? tone(u, y, true) : null;
      });
      const X_ = X;
      const sq = rows => rows.filter((_, j) => j !== 5); // drop a head row = squash
      const stamped = () => k.at(X_.bare);
      const hankoFlash = g => { [[17, 13], [18, 13], [17, 14], [18, 14], [13, 3], [14, 3]].forEach(([x, y]) => px(g, x, y, '7')); return g; };
      const motes = (g, t) => {
        const pts = t ? [[2, 4], [25, 6], [5, 1], [22, 2]] : [[3, 2], [24, 3], [1, 7], [26, 9]];
        pts.forEach(([x, y]) => { if (g[y][x] === '.') px(g, x, y, '7'); });
        return g;
      };
      return [
        ...k.eggIntro(),
        f(glowEgg, 140, { note: 'the shell goes soft' }),
        f(squish(14, 10), 90),
        f(squish(16, 6), 90),
        f(squish(18, 3), 220, { note: 'flattens into paper' }),
        f(sheet(2), 80),
        f(sheet(5), 80),
        f(sheet(R), 380, { note: 'a single square sheet' }),
        f(crease(sheet(R), row(CY, 6, 21)), 130, { note: 'crease' }),
        f(sheet(4), 80),
        f(sheet(1), 70),
        f(flapDown(tri(), 3), 70),
        f(flapDown(tri(), R), 110),
        f(tri(), 260, { note: 'triangle' }),
        f(crease(tri(), col(13, CY, 19).concat(col(14, CY, 19))), 110),
        f(lift, 90),
        f(k.at(X_.kite), 120),
        f(crease(k.at(X_.kite), col(13, 4, 19).concat(col(14, 4, 19))), 100),
        f(k.at(X_.kite), 280, { note: 'kite base' }),
        f(k.at(X_.low), 110, { note: 'wings unfold' }),
        f(k.at(X_.mid), 90),
        f(motes(k.at(X_.up, 0, -1), 0), 110),
        f(motes(k.at(X_.mid, 0, -1), 1), 90),
        f(k.at(X_.bare), 160, { note: 'eyes open' }),
        f(hankoFlash(stamped()), 90, { note: 'hanko stamp' }),
        f(k.at('idle'), 300),
        f(k.at(sq(S.idle), 0, 1), 120, { note: 'settle' }),
        f(k.at('happy'), 240, { note: 'happy' }),
        f(k.at('happy2'), 260),
        f(k.at('idle'), 400),
      ];
    },
  });
})();
