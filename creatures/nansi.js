// Nansi — storyteller spider (after Anansi of Akan folklore, who won the sky-god's stories).
// Terracotta body, an indigo abdomen woven with a gold diamond band, big shiny eyes, two tiny upper eyes.
// Sprites are generated (shaded ellipses + stroked legs + per-layer outline) between the @gen markers.
(function () {
  // @gen-start
  const S = {
    idle: [
      '......................',
      '.......oooooooo.......',
      '...o..oiiiiiiino..o...',
      '..olooiiiiiiinnnoolo..',
      '.obooiigiiignnngnoobo.',
      'oboooigrgngrGnGrGooobo',
      'obooiiiGnnnGnnnGnNoobo',
      'bo.oinnnnoooonnNNNo.ob',
      'bo..onnoollllooNNo..ob',
      'bo..onollllllbboNo..ob',
      'o..oloolellbbeboolo..o',
      '..oboolwebbbbweboobo..',
      '.obo.oleebbbbeedo.obo.',
      '.obo.obeebbbdeedo.obo.',
      '.obo..opbbmmddpo..obo.',
      '.obo...oddddDDo...obo.',
      '..o.....oooooo.....o..',
    ],
    idle2: [
      '.......oooooooo.......',
      '......oiiiiiiino......',
      '...o.oiiiiiiinnno.o...',
      '..oloiigiiignnngnolo..',
      '.obooigrgngrGnGrGoobo.',
      'obooiiiGnnnGnnnGnNoobo',
      'obooinnnnoooonnNNNoobo',
      'bo..onnoollllooNNo..ob',
      'bo..onollllllbboNo..ob',
      'bo..ooolellbbebooo..ob',
      'o..ololwebbbbwebolo..o',
      '..obooleebbbbeedoobo..',
      '.obo.obeebbbdeedo.obo.',
      '.obo..opbbmmddpo..obo.',
      '.obo...oddddDDo...obo.',
      '.obo....oooooo....obo.',
      '..o................o..',
    ],
    blink: [
      '......................',
      '.......oooooooo.......',
      '...o..oiiiiiiino..o...',
      '..olooiiiiiiinnnoolo..',
      '.obooiigiiignnngnoobo.',
      'oboooigrgngrGnGrGooobo',
      'obooiiiGnnnGnnnGnNoobo',
      'bo.oinnnnoooonnNNNo.ob',
      'bo..onnoollllooNNo..ob',
      'bo..onollllllbboNo..ob',
      'o..oloolellbbeboolo..o',
      '..oboolllbbbbbbboobo..',
      '.obo.oleebbbbeedo.obo.',
      '.obo.obbbbbbddddo.obo.',
      '.obo..opbbmmddpo..obo.',
      '.obo...oddddDDo...obo.',
      '..o.....oooooo.....o..',
    ],
    talk: [
      '......................',
      '.......oooooooo.......',
      '...o..oiiiiiiino..o...',
      '..olooiiiiiiinnnooloo.',
      '.obooiigiiignnngnooblo',
      'oboooigrgngrGnGrGooobo',
      'obooiiiGnnnGnnnGnNobbo',
      'bo.oinnnnoooonnNNNobob',
      'bo..onnoollllooNNoboob',
      'bo..onollllllbboNoboob',
      'o..oloolellbbeboobo..o',
      '..oboolwebbbbweboo....',
      '.obo.oleebbbbeedo.....',
      '.obo.obeebbbdeedo.....',
      '.obo..opbbmmddpo......',
      '.obo...oddppDDo.......',
      '..o.....oooooo........',
    ],
    talk2: [
      '......................',
      '.......oooooooo.......',
      '...o..oiiiiiiino..o...',
      '..olooiiiiiiinnnoolo..',
      '.obooiigiiignnngnoobo.',
      'oboooigrgngrGnGrGooobo',
      'obooiiiGnnnGnnnGnNoobo',
      'bo.oinnnnoooonnNNNo.ob',
      'bo..onnoollllooNNo.obl',
      'bo..onollllllbboNoobob',
      'o..oloolellbbebooobo.o',
      '..oboolwebbbbwebobo...',
      '.obo.oleebbbbeedoo....',
      '.obo.obeebbbdeedo.....',
      '.obo..opbbdmmdpo......',
      '.obo...oddddDDo.......',
      '..o.....oooooo........',
    ],
    happy: [
      '......................',
      '.......oooooooo.......',
      '...o..oiiiiiiino..o...',
      '.oolooiiiiiiinnnooloo.',
      'olbooiigiiignnngnooblo',
      'oboooigrgngrGnGrGooobo',
      'obboiiiGnnnGnnnGnNobbo',
      'boboinnnnoooonnNNNobob',
      'boobonnoollllooNNoboob',
      'boobonollllllbboNoboob',
      'o..oboollllbbbboobo..o',
      '....oolelbbbbbeboo....',
      '.....oebebbbbedeo.....',
      '.....obbbbbbddddo.....',
      '......opbmmmmdpo......',
      '.......oddppDDo.......',
      '........oooooo........',
    ],
    happy2: [
      '.......oooooooo.......',
      '...o..oiiiiiiino..o...',
      '.oolooiiiiiiinnnooloo.',
      'olbooiigiiignnngnooblo',
      'oboooigrgngrGnGrGooobo',
      'obboiiiGnnnGnnnGnNobbo',
      'boboinnnnoooonnNNNobob',
      'boobonnoollllooNNoboob',
      'boobonollllllbboNoboob',
      'o..oboollllbbbboobo..o',
      '....oolelbbbbbeboo....',
      '.....oebebbbbedeo.....',
      '.....obbbbbbddddo.....',
      '......opbmmmmdpo......',
      '.......oddppDDo.......',
      '........oooooo........',
      '......................',
    ],
    sleep: [
      '.................zzzz.',
      '.......oooooooo.....z.',
      '......oiiiiiiino...z..',
      '.....oiiiiiiinnno.z...',
      '....oiigiiignnngnzzzz.',
      '....oigrgngrGnGrGo....',
      '...oiiiGnnnGnnnGnNo...',
      '...oinnnnoooonnNNNo...',
      '...oonnoollllooNNoo...',
      '..olonollllllbboNolo..',
      '.oboooollllbbbboooobo.',
      'obo..olllbbbbbbbo..obo',
      'obo.oolbbbbbbbddoo.obo',
      'bo.olobeebbbdeedolo.ob',
      'boobooopbbmdddpoooboob',
      'obbo...oddddDDo...obbo',
      '.oo.....oooooo.....oo.',
    ],
    sleep2: [
      '......................',
      '.......oooooooo...zzz.',
      '......oiiiiiiino....z.',
      '.....oiiiiiiinnno..z..',
      '....oiigiiignnngnozzz.',
      '....oigrgngrGnGrGo....',
      '...oiiiGnnnGnnnGnNo...',
      '...oinnnnoooonnNNNo...',
      '...oonnoollllooNNoo...',
      '..olonollllllbboNolo..',
      '.oboooollllbbbboooobo.',
      'obo..olllbbbbbbbo..obo',
      'obo.oolbbbbbbbddoo.obo',
      'bo.olobeebbbdeedolo.ob',
      'boobooopbbmdddpoooboob',
      'obbo...oddddDDo...obbo',
      '.oo.....oooooo.....oo.',
    ],
    think: [
      '..................ss..',
      '.......oooooooo.....s.',
      '......oiiiiiiino...s..',
      '.....oiiiiiiinnno.....',
      '...ooiigiiignnngnoos..',
      '..oloigrgngrGnGrGolo..',
      '.oboiiiGnnnGnnnGnNobo.',
      'obooinnnnoooonnNNNoobo',
      'obo.onnoollllooNNo.obo',
      'bo..onolellllbboNo..ob',
      'bo.oloollllbbebooo..ob',
      'booboolewbbbbewbolo.ob',
      'oobo.oleebbbbeedoo...o',
      '.obo.obbbbbbddddoo....',
      '.obo..opbbdmmdpoo.....',
      '.obo...oddddDDoo......',
      '..o.....ooooooo.......',
    ],
    fidget: [
      '......................',
      '.......oooooooo.......',
      '...o..oiiiiiiino..o...',
      '..olooiiiiiiinnnoolo..',
      '.obooiigiiignnngnoobo.',
      'oboooigrgngrGnGrGooobo',
      'obooiiiGnnnGnnnGnNoobo',
      'bo.oinnnnoooonnNNNo.ob',
      'bo..onnoollllooNNo..ob',
      'bo..onollllllbboNo..ob',
      'o..oloolellbbeboolo..o',
      '..obooeelbbbeebboobo..',
      '.obo.owebbbbweddo.obo.',
      'obo..oeebbbbeeddo..obo',
      'obo...opbbmmddpo...obo',
      '.o.....oddddDDo.....o.',
      '........oooooo........',
    ],
  };
  const X = {
    dangle: [
      '......................',
      '.......oooooooo.......',
      '......oiiiiiiino......',
      '.....oiiiiiiinnno.....',
      '....oiigiiignnngno....',
      '...ooigrgngrGnGrGoo...',
      '..ooiiiGnnnGnnnGnNoo..',
      '.oboinnnnoooonnNNNobo.',
      '.oboonnoollllooNNoobo.',
      '..obonollllllbboNobo..',
      '..obooolellbbebooobo..',
      '...o.olwebbbbwebo.o...',
      '.....oleebbbbeedo.....',
      '.....obeebbbdeedo.....',
      '....obopbbmmddpobo....',
      '....obooddmmDDoobo....',
      '....obbboooooobbbo....',
    ],
    land: [
      '......................',
      '.......oooooooo.......',
      '......oiiiiiiino......',
      '.....oiiiiiiinnno.....',
      '....oiigiiignnngno....',
      '....oigrgngrGnGrGo....',
      '...oiiiGnnnGnnnGnNo...',
      '..ooinnnnoooonnNNNoo..',
      '.oboonnoollllooNNoobo.',
      'obo.onollllllbboNo.obo',
      'obo..oollllbbbboo..obo',
      'bo..oolelbbbbbeboo..ob',
      'bo.oloebebbbbedeolo.ob',
      'booboobbbbbbddddooboob',
      'oobo..opbmddmdpo..oboo',
      'obo....oddmmDDo....obo',
      '.o......oooooo......o.',
    ],
  };
  // @gen-end

  PatchDex.register({
    id: 'nansi',
    name: 'Nansi',
    species: 'storyteller spiderling',
    rarity: 'uncommon',
    habit: 'prompting',
    blurb: 'A small spider descended from the one who bought the sky-god\'s stories. It will happily spin anything you ask, but it spins much better once it knows why.',
    coaching: 'Prompting with intent: tell the agent the story behind the task (why it matters, who it is for, what problem it solves) so it can make the right tradeoffs on its own.',
    voice: 'tell me the story, not just the task. who is this for?',
    hatch: 'A single silk thread lowers onto the egg, spirals around it into a woven pattern, pulls taut, and the shell falls away as Nansi drops down on its silk and lands.',
    palette: {
      o: '#2d1830', e: '#1d0f22', w: '#ffffff',
      L: '#ffd9a8', l: '#f0a066', b: '#cf6a3c', d: '#94412a', D: '#62261f',
      i: '#8696e6', n: '#4a58b4', N: '#2c3279',
      g: '#ffd463', G: '#c98f24', r: '#e0703f',
      p: '#f48b84', m: '#5a1f22', s: '#f3eefa', S: '#b9b0d6', z: '#b9c6e6',
    },
    sprites: S,
    loop: [
      ['idle', 14], ['idle2', 8], ['idle', 12], ['blink', 2], ['idle2', 8], ['idle', 14],
      ['fidget', 3], ['idle', 2], ['fidget', 3], ['idle', 10], ['blink', 2], ['idle2', 8], ['think', 12], ['idle', 6],
    ],
    entrance(k) {
      const out = k.eggIntro();
      const EX = k.eggHome.x, EY = k.eggHome.y;
      const TX = 13; // the thread's column, centred over the egg
      const thread = (g, y1, ch = 's', y0 = 0) => { for (let y = y0; y <= y1; y++) k.px(g, TX, y, ch); return g; };
      // Silk bands wrap the egg on a slant; n bands so far, plus a bright bead where the thread is working.
      const BAND = (x, y) => { const v = 2 * (y - EY) - (x - EX); return v >= 1 && v % 5 < 2 ? Math.floor((v - 1) / 5) : -1; };
      const inside = (rows, x, y) => { const c = (rows[y - EY] || '')[x - EX]; return c && c !== '.' && c !== '0'; };
      const wrapped = (n, rows = k.EGG, dy = 0) => {
        const g = k.egg(rows, 0, dy);
        for (let y = EY; y < EY + 14; y++) for (let x = EX; x < EX + 12; x++) {
          const b = BAND(x, y);
          if (b >= 0 && b < n && inside(rows, x, y)) k.px(g, x, y + dy, (2 * (y - EY) - (x - EX)) % 5 ? 'S' : 's');
        }
        return g;
      };
      const bead = (g, n) => { const y = EY + 3 + n * 2, x = n % 2 ? EX + 11 : EX; k.px(g, x, Math.min(y, EY + 12), 'w'); return g; };
      // The wrapped egg becomes a woven pattern: gold and indigo checks between terracotta weft rows.
      const weave = (x, y, t) => { const bx = x - EX, by = y - EY; if (by % 4 === 0) return 'r'; return ((bx >> 1) + (by >> 1) + t) % 2 ? 'g' : 'n'; };
      const woven = (dy = 0, t = 0, half = 0, hdx = 0, hdy = 0) => {
        const g = k.blank();
        k.EGG.forEach((r, j) => [...r].forEach((c, i) => {
          if (c === '.') return;
          const x = EX + i, y = EY + j;
          if (half && (half < 0 ? i > 5 : i < 6)) return;
          const edge = c === '0' || (half && (i === 5 || i === 6));
          k.px(g, x + hdx, y + dy + hdy, edge ? '0' : (j === 1 && c === '2') ? 'G' : weave(x, y, t));
        }));
        return g;
      };
      const shell = (dy, fall) => { const g = woven(dy, 0, -1, -fall, fall * 2); const r = woven(dy, 0, 1, fall, fall * 2); r.forEach((row, y) => row.forEach((c, x) => { if (c !== '.') g[y][x] = c; })); return g; };
      // Nansi on its silk: the thread ends at the top of its abdomen.
      const hang = (rows, dy, dx = 0) => {
        const g = k.at(rows, dx, dy), top = k.home(typeof rows === 'string' ? S[rows] : rows).y + dy + 1;
        for (let y = 0; y <= top; y++) k.px(g, TX + Math.round((dx * y) / Math.max(1, top)), y, 's');
        return g;
      };
      const lay = (g, top) => { top.forEach((r, y) => r.forEach((c, x) => { if (c !== '.') g[y][x] = c; })); return g; };
      const motes = (g, n) => { (n ? [[3, 6], [24, 9], [6, 2]] : [[2, 11], [25, 4], [21, 1]]).forEach(([x, y]) => k.px(g, x, y, n ? 'g' : 'G')); return g; };
      out.push(
        // a single thread lowers from the top of the frame
        k.f(thread(k.egg(k.EGG_C2), 1, 'S'), 110, { note: 'a thread lowers' }),
        k.f(thread(k.egg(k.EGG_C2), 3, 'S'), 100),
        k.f(thread(k.px(k.egg(k.EGG_C2), TX, 6, 'w'), 5, 'S'), 100),
        k.f(thread(k.egg(k.EGG_C2), 7), 220, { note: 'and touches the shell' }),
        // ...and wraps the egg in a spiral
        k.f(bead(thread(wrapped(1, k.EGG_C2), 7), 0), 110, { note: 'it wraps the egg in a spiral' }),
        k.f(bead(thread(wrapped(2, k.EGG_C2), 7), 1), 110),
        k.f(bead(thread(wrapped(3, k.EGG_C2), 7), 2), 110),
        k.f(bead(thread(wrapped(4, k.EGG_C2), 7), 3), 110),
        k.f(bead(thread(wrapped(5, k.EGG_C2), 7), 4), 110),
        k.f(thread(wrapped(6, k.EGG_C2), 7), 240),
        // the wrapping turns into a woven pattern
        k.f(thread(woven(0, 0), 7), 160, { note: 'the wrapping becomes a weave' }),
        k.f(motes(thread(woven(0, 1), 7), 0), 160),
        k.f(motes(thread(woven(0, 0), 7), 1), 260),
        // the thread pulls taut and lifts it
        k.f(thread(woven(-1), 6, 'w'), 90, { note: 'the thread pulls taut' }),
        k.f(thread(woven(-3), 4, 'w'), 90),
        k.f(thread(woven(-4), 3, 'w'), 300),
        // the shell falls away, and Nansi is hanging there
        k.f(lay(hang(X.dangle, -2), shell(-4, 1)), 90, { note: 'the shell falls away' }),
        k.f(lay(hang(X.dangle, -2), shell(-4, 3)), 90),
        k.f(lay(hang(X.dangle, -2), shell(-4, 6)), 90),
        k.f(hang(X.dangle, -2), 320, { note: 'Nansi, dangling' }),
        k.f(hang(X.dangle, -2, -1), 160),
        k.f(hang(X.dangle, -2, 1), 160),
        k.f(hang(X.dangle, -2), 200),
        // drops down on its silk and lands
        k.f(hang(X.dangle, -1), 70, { note: 'drops on its silk' }),
        k.f(hang('idle', 0), 70),
        k.f(hang(X.land, 0), 160, { note: 'and lands' }),
        k.f(thread(k.at('happy'), 1, 'S'), 200),
        k.f(k.at('happy2'), 160),
        k.f(k.at('happy'), 260),
        k.f(k.at('idle'), 260),
        k.f(k.at('blink'), 110),
        k.f(k.at('idle'), 420),
      );
      return out;
    },
  });
})();
