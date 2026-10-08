// Loam — a little clay golem. Wet terracotta, thumbprint dents, ember eyes, a paper scroll in its chest slot.
(function () {
  const idle = [
    '.........oo.........',
    '.......oohloo.......',
    '.....oohhllbboo.....',
    '....ohhlbbbbbbdo....',
    '...ohlbbbbbddbbdo...',
    '...olbbbbbbdlbbdo...',
    '...olbDDbbbbDDbdo...',
    '...olbwgbbbbwgbdo...',
    '...olbgGbbbbgGbdo...',
    '...olbbbbbbbbbbdo...',
    '...obbbbbDDbbbbdo...',
    '....oddddddddddo....',
    '..oooDDDDDDDDDDooo..',
    '.ohbolhoooooobdobdo.',
    '.olbolboSssSobdobdo.',
    '.obdobboooooobdodDo.',
    '..oooldbbbbbbddooo..',
    '.....obdoooobdo.....',
    '.....odDo..odDo.....',
    '.....oooo..oooo.....',
  ];
  const W = idle[0].length;
  // put(base, x, y, rows): overlay rows at (x, y); '.' in the overlay keeps the base pixel.
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  // sink(base, row): drop everything above `row` by one pixel (squash / slump).
  const sink = (base, row) => ['.'.repeat(W), ...base.slice(0, row), ...base.slice(row + 1)];
  // eyes(base, left, right): 2×3 patches (brow, upper, lower) over each eye socket.
  const eyes = (base, l, r) => put(put(base, 6, 6, l), 12, 6, r);

  const blink = eyes(idle, ['DD', 'bb', 'DD'], ['DD', 'bb', 'DD']);
  const talk = put(idle, 8, 10, ['DooD', '.oo.']);
  const talk2 = put(idle, 9, 10, ['oo']);
  const caret = ['bggb', 'gbbg', 'bbbb'];
  const happy = put(put(put(idle, 5, 6, caret), 11, 6, caret), 8, 10, ['DbbD', '.oo.']);
  // happy2: both stubby arms thrown up beside its head.
  const bare = happy.map((r, y) => (y >= 12 && y <= 16 ? '....' + r.slice(4, 16) + '....' : r));
  const happy2 = put(bare, 0, 8, [
    '.oo..............oo.',
    'ohbo............obdo',
    'olbo............obdo',
    'obdo............odDo',
    'obdoo..........oodDo',
    '.oooo..........oooo.',
  ]);
  const sleepFace = put(eyes(idle, ['bb', 'bb', 'DD'], ['bb', 'bb', 'DD']), 8, 14, ['kSSk']);
  const sleep = sink(put(sleepFace, 16, 0, ['zzz', '..z', '.z.', 'zzz']), 12);
  const sleep2 = sink(put(sleepFace, 17, 0, ['zz', '.z', 'zz']), 12);
  // think: eyes roll up, glyph dots blink over its head.
  const think = put(eyes(idle, ['wg', 'gG', 'bb'], ['wg', 'gG', 'bb']), 15, 0, ['.g.', '..g', '.g.', '...', '.g.']);
  // fidget: it glances down at its scroll, which glows while it rereads its instructions.
  const fidget = put(eyes(idle, ['DD', 'bb', 'wg'], ['DD', 'bb', 'wg']), 8, 14, ['gwgg']);

  // Entrance-only poses: the raw figure before it is given a face, a slot, a scroll.
  const smooth = put(idle, 4, 4, [
    'hlbbbbbbbbbd',
    'lbbbbbbbbbbd',
    'lbbbbbbbbbbd',
    'lbbbbbbbbbbd',
    'lbbbbbbbbbbd',
    'lbbbbbbbbbbd',
    'bbbbbbbbbbbd',
  ]).map((r, y) => (y >= 13 && y <= 15 ? r.slice(0, 5) + (y === 15 ? 'bbbbbbbbbd' : 'lbbbbbbbbd') + r.slice(15) : r));
  const dent = put(smooth, 11, 4, ['dd', 'dl']);
  const lSock = put(dent, 6, 6, ['DD', 'DD', 'DD']);
  const sockets = put(lSock, 12, 6, ['DD', 'DD', 'DD']);
  const mouthed = put(sockets, 9, 10, ['DD']);
  const slotted = put(mouthed, 7, 13, ['oooooo', 'oDDDDo', 'oooooo']);
  const scrolled = put(slotted, 8, 14, ['SssS']);
  const glowing = put(scrolled, 8, 14, ['gwwg']);
  const dimEyes = eyes(put(scrolled, 8, 14, ['gssg']), ['DD', 'DG', 'GG'], ['DD', 'DG', 'GG']);
  const X = { smooth, dent, sockets, mouthed, slotted, scrolled, glowing, dimEyes };

  PatchDex.register({
    id: 'loam',
    name: 'Loam',
    species: 'pocket clay golem',
    rarity: 'uncommon',
    habit: 'context',
    blurb: 'A fistful of riverbank clay that woke up when someone slid a scroll into its chest. It does exactly what the scroll says, and nothing the scroll forgot to say.',
    coaching: 'Context hygiene: if you keep repeating a rule, write it once where the agent reads it every session (custom instructions, AGENTS.md) instead of re-typing it into every prompt.',
    voice: "i only know what's on my scroll. said it twice? write it there.",
    hatch: 'Wet clay oozes out of the cracked egg, gets pressed and pinched into a little figure with thumbprints for eyes, a scroll slides into the slot in its chest, and its eyes light up.',
    palette: {
      o: '#3a1e16', D: '#5f3022', d: '#8c4a31', b: '#b56a43', l: '#d68f60', h: '#f6d2ae',
      p: '#d9644e', w: '#fffaea', g: '#ffcc4d', G: '#d9821c',
      s: '#f4e7c6', S: '#c9a979', k: '#7a5a3c', z: '#cdd6ea',
    },
    sprites: { idle, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [
      ['idle', 24], ['blink', 2], ['idle', 16], ['fidget', 14], ['idle', 12], ['blink', 2], ['idle', 18], ['think', 12], ['idle', 10],
    ],
    entrance(k) {
      const { f, blank, px, stamp, W: CW, H: CH } = k;
      const EX = k.eggHome.x, EY = k.eggHome.y;
      // Wet clay as a union of ellipses [cx, cy, rx, ry], shaded from the top-left with a wet glint per lump.
      const clay = (g, blobs, glint = true) => {
        const inn = (x, y) => blobs.some(([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1);
        for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
          if (!inn(x, y)) continue;
          const edge = !inn(x - 1, y) || !inn(x + 1, y) || !inn(x, y - 1) || !inn(x, y + 1);
          const tone = !inn(x - 1, y - 1) || !inn(x, y - 2) ? 'l' : !inn(x + 1, y + 1) || !inn(x + 2, y) ? 'd' : !inn(x + 1, y + 2) ? 'D' : 'b';
          px(g, x, y, edge ? 'o' : tone);
        }
        if (glint) blobs.forEach(([cx, cy, rx, ry]) => {
          const x = Math.round(cx - rx * 0.45), y = Math.round(cy - ry * 0.55);
          if (rx >= 2.5 && g[y] && g[y][x] !== 'o' && g[y][x] !== '.') { px(g, x, y, 'h'); if (rx >= 4) px(g, x + 1, y, 'h'); }
        });
        return g;
      };
      const drops = (g, pts) => { pts.forEach(([x, y]) => px(g, x, y, 'h')); return g; };
      const half = (rows, left) => rows.map(r => [...r].map((c, i) => ((i < 6) === left ? c : '.')).join(''));
      const shell = (g, top, dx, dy, o) => stamp(g, top ? k.EGG_TOP : k.EGG_BOTTOM, EX + dx, EY + dy, o);
      const halves = (g, dx, dy) => { stamp(g, half(k.EGG_BOTTOM, true), EX - dx, EY + dy); stamp(g, half(k.EGG_BOTTOM, false), EX + dx, EY + dy); return g; };
      // the scroll in flight: a little rolled sheet with dark rims
      const scroll = (g, x) => stamp(g, ['.oooo.', 'oSssSo', '.oooo.'], x, 15);
      const motes = (g, n) => { (n ? [[5, 6], [22, 3], [3, 13], [24, 11]] : [[6, 3], [21, 6], [2, 9], [25, 14]]).forEach(([x, y]) => px(g, x, y, n ? 'g' : 'w')); return g; };
      const sq = rows => sink(rows, 10);
      const out = k.eggIntro();
      out.push(
        // clay oozes out of the crack and shoves the lid up
        f(clay(shell(blank(), false, 0, 0), [[13.5, 11.5, 4.5, 1.6]]), 90, { note: 'wet clay oozes out' }),
        f(shell(clay(shell(blank(), false, 0, 0), [[13.5, 11, 5, 2.5]]), true, 0, -2), 110),
        f(shell(clay(shell(blank(), false, 0, 0), [[13.5, 10, 5.5, 3.5], [8.6, 14, 1.2, 2.5]]), true, 1, -5, k.lean(1)), 120),
        f(clay(shell(blank(), false, 0, 0), [[13.5, 10, 6, 4], [8.4, 15, 1.3, 3.5], [18.6, 13.5, 1.2, 2.5]]), 140),
        f(clay(shell(blank(), false, 0, 0), [[13.5, 11, 6.5, 4], [8.4, 16, 1.4, 4.5], [18.6, 15, 1.3, 4]]), 160),
        // the shell gives way and the clay slumps into a lump
        f(clay(halves(blank(), 2, 1), [[13.5, 16, 6.5, 5]]), 110, { note: 'the shell gives way' }),
        f(clay(halves(blank(), 5, 4), [[13.5, 18, 7.5, 3.5]]), 110),
        f(clay(blank(), [[13.5, 18.5, 8, 3]]), 200),
        // pressed and pinched into a figure
        f(clay(blank(), [[13.5, 16.5, 6, 5]]), 120, { note: 'pressed and pinched' }),
        f(clay(blank(), [[13.5, 14.5, 5.5, 7]]), 140),
        f(drops(clay(blank(), [[13.5, 9, 6, 4.5], [13.5, 17, 5.5, 4.5]]), [[5, 7], [22, 5]]), 160),
        f(clay(blank(), [[13.5, 8, 6.5, 5], [13.5, 16, 5.5, 4], [7, 15.5, 1.5, 2.5], [20, 15.5, 1.5, 2.5]]), 150),
        f(clay(blank(), [[13.5, 7.5, 6.8, 5.2], [13.5, 16, 5.5, 3.5], [7, 15.5, 1.6, 2.5], [20, 15.5, 1.6, 2.5], [11, 20, 1.5, 1.6], [16, 20, 1.5, 1.6]]), 160),
        f(k.at(X.smooth), 220, { note: 'a little figure' }),
        // thumbprints: forehead, then two eye sockets, then a mouth
        f(drops(k.at(sq(X.dent)), [[9, 1], [19, 2]]), 80, { note: 'thumbprints' }),
        f(k.at(X.dent), 200),
        f(k.at(sq(X.sockets)), 80),
        f(k.at(X.sockets), 200),
        f(k.at(sq(X.mouthed)), 80),
        f(k.at(X.mouthed), 160),
        f(k.at(X.slotted), 320, { note: 'a slot in its chest' }),
        // a scroll slides in from the right
        f(scroll(k.at(X.slotted), 25), 90, { note: 'a scroll slides in' }),
        f(scroll(k.at(X.slotted), 17), 100),
        f(scroll(k.at(X.slotted), 13), 120),
        f(k.at(X.scrolled), 260),
        // the scroll glows, then the eyes catch
        f(k.at(X.glowing), 140, { note: 'the words take' }),
        f(k.at(X.dimEyes), 160),
        f(motes(k.at('idle'), 0), 300, { note: 'its eyes light up' }),
        f(k.at('blink'), 100),
        f(motes(k.at('happy'), 1), 200),
        f(k.at('happy2'), 260),
        f(k.at('idle'), 420),
      );
      return out;
    },
  });
})();
