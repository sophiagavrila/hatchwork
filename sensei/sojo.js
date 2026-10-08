'use strict';
// Sojo (Sojobo, but only recruiters say that): a retired crow-tengu with spectacles, eyebrows
// with their own opinions, a staff with a brass bell, and a chipped mug of tea. 40x46 px, two rows
// per terminal line. Drawn procedurally at load so every pose stays on-model.
const W = 40, H = 46;
const PAL = {
  o: '#0c0a16', K: '#1d1b30', k: '#33335a', g: '#7476b8', B: '#eceaf4', b: '#b3aecb',
  Y: '#e9c25a', y: '#a8802e', L: '#d7e6f3', l: '#9fb4cc', e: '#141220', n: '#fffbe6',
  N: '#6a7290', M: '#9aa2bc', m: '#3a1820', R: '#a54a2c', r: '#743222', S: '#cf6a3e',
  C: '#efe6cf', c: '#c4b48e', x: '#2f8f84', X: '#1f625b', F: '#262441', f: '#3d3a66',
  T: '#8a5a34', t: '#5a3a20', W: '#f4efe6', w: '#bdb4c8', h: '#7a4a24', O: '#f0a040', p: '#b8742a',
  G: '#fff6c8',
};

function draw(o = {}) {
  const g = Array.from({ length: H }, () => Array(W).fill('.'));
  const set = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < W && y < H) g[y][x] = c; };
  const get = (x, y) => (x >= 0 && y >= 0 && x < W && y < H ? g[y][x] : '.');
  const inPoly = (x, y, P) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
  const poly = (P, c, pred = () => true) => { for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (inPoly(x + .5, y + .5, P) && pred(x, y)) set(x, y, c); };
  const ell = (cx, cy, rx, ry, c, pred = () => true) => { for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (((x + .5 - cx) / rx) ** 2 + ((y + .5 - cy) / ry) ** 2 <= 1 && pred(x, y)) set(x, y, c); };
  const rect = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) set(x, y, c); };
  const line = (x0, y0, x1, y1, c) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1; for (let i = 0; i <= n; i++) set(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, c); };

  const hd = o.headDy || 0;       // head bob (cough)
  const up = o.staffUp ? 4 : 0;   // staff lift
  const fl = o.wings ? 1 : 0;     // feather flare

  // ---- staff: crook with a brass bell -----------------------------------------------------------
  const sx = 4;
  rect(sx, 9 - up, sx, 45 - up, 'T'); rect(sx + 1, 9 - up, sx + 1, 45 - up, 't');
  [[4, 8], [4, 7], [5, 6], [6, 5], [7, 5], [8, 6], [9, 7], [9, 8]].forEach(([x, y]) => set(x, y - up, 'T'));
  [[5, 7], [6, 6], [7, 6], [8, 7]].forEach(([x, y]) => set(x, y - up, 't'));
  
  const bell = o.glow ? 'G' : 'Y', bellD = o.glow ? 'Y' : 'y';
  set(9, 9 - up, 'y'); rect(8, 10 - up, 10, 11 - up, bell); rect(7, 12 - up, 11, 12 - up, bellD); set(9, 13 - up, 'y'); set(8, 10 - up, o.glow ? 'G' : 'n');
  for (let y = 12; y < 44; y += 7) set(sx, y - up, 'h'); // wood grain

  // ---- robe ---------------------------------------------------------------------------------------
  poly([[14, 22], [28, 22], [31, 31], [34, 41.5], [8, 41.5], [11, 31]], 'R');
  poly([[14, 22], [17, 22], [16, 31], [15, 41.5], [8, 41.5], [11, 31]], 'r');
  poly([[26, 22], [28, 22], [31, 31], [34, 41.5], [30, 41.5], [28.5, 31]], 'S');
  line(20, 34, 19, 41, 'r'); line(24, 34, 25, 41, 'r'); line(13, 36, 12, 41, 'R');
  // cream collar (V) and teal sash with a knot
  poly([[16, 21], [26, 21], [21, 30]], 'C'); poly([[18.5, 21], [23.5, 21], [21, 27]], 'c');
  rect(10, 31, 32, 32, 'x'); rect(10, 33, 32, 33, 'X'); rect(19, 31, 21, 33, 'X'); set(20, 32, 'x');
  line(19, 34, 17, 37, 'x'); line(21, 34, 22, 37, 'X');
  for (let x = 8; x <= 34; x++) set(x, 41, (x % 3) ? 'r' : 'R'); // hem

  // ---- talons -----------------------------------------------------------------------------------
  for (const fx of [14, 26]) { rect(fx, 42, fx + 2, 42, 'O'); set(fx - 1, 43, 'O'); set(fx + 1, 43, 'O'); set(fx + 3, 43, 'O'); set(fx + 1, 42, 'p'); set(fx + 3, 43, 'p'); }

  // ---- left wing: sleeve to the staff ---------------------------------------------------------------
  const lh = o.staffUp ? 18 : 27; // hand height on staff
  if (o.staffUp) poly([[14, 22], [10, 21], [7, 18], [3, 17], [3, 21], [8, 25], [13, 29]], 'F');
  else poly([[14, 22], [9, 24], [6 - fl, 27], [4 - fl, 31], [8, 32], [12, 30], [14, 28]], 'F');
  if (!o.staffUp) { line(13, 24, 7 - fl, 29, 'f'); line(13, 26, 8, 31, 'f'); set(4 - fl, 32, 'F'); set(6 - fl, 33, 'F'); set(9, 32, 'f'); }
  else { line(13, 24, 6, 19, 'f'); line(12, 27, 5, 21, 'f'); }
  rect(sx - 1, lh, sx + 2, lh + 1, 'F'); set(sx - 1, lh, 'f'); set(sx + 2, lh + 1, 'f'); set(sx - 1, lh + 2, 'F');

  // ---- right wing + the mug -------------------------------------------------------------------------
  const sip = o.sip, mx = sip ? 23 : 25, my = sip ? 17 : 27; // mug top-left
  if (sip) poly([[28, 22], [32, 24], [31, 26], [29, 23]], 'F');
  else poly([[28, 22], [32 + fl, 25], [33 + fl, 31], [29, 32], [25, 31], [27, 27]], 'F');
  if (!sip) { line(29, 24, 32 + fl, 30, 'f'); line(28, 26, 30, 31, 'f'); set(33 + fl, 32, 'F'); set(31, 33, 'F'); }
  if (sip) poly([[32, 24], [31, 20], [29, 19], [29, 23]], 'F');
  const mug = () => {
  if (!o.noMug) {
    rect(mx, my, mx + 5, my + 5, 'W'); rect(mx, my + 4, mx + 5, my + 5, 'w'); rect(mx + 5, my, mx + 5, my + 5, 'w');
    rect(mx + 1, my, mx + 4, my, 'h'); // tea
    set(mx + 6, my + 1, 'W'); set(mx + 7, my + 2, 'w'); set(mx + 7, my + 3, 'w'); set(mx + 6, my + 4, 'w'); // handle
    rect(mx + 1, my + 2, mx + 3, my + 2, 'x'); // teal stripe
    set(mx + 4, my + 5, '.'); set(mx + 5, my + 5, '.'); // the chip
  }
  if (sip) { rect(mx + 5, my + 3, mx + 7, my + 6, 'F'); set(mx + 7, my + 6, 'f'); }
  else { rect(mx - 1, my + 2, mx + 1, my + 5, 'F'); set(mx - 1, my + 5, 'f'); set(mx + 1, my + 2, 'f'); }

  };
  if (!sip) mug();

  // ---- head (big: he is mostly head, like all good mentors) ------------------------------------------
  const hy = 13 + hd, hx = 21;
  ell(hx, hy, 9.6, 8.6, 'K');
  ell(hx, hy, 9.6, 8.6, 'k', (x, y) => x >= hx + 3 && y <= hy - 3);
  ell(hx + 4, hy - 5, 2.2, 1.4, 'g', (x, y) => get(x, y) !== '.');
  for (let y = hy - 8; y <= hy + 7; y++) { for (let x = W - 1; x >= hx; x--) if ('Kkg'.includes(get(x, y))) { set(x, y, 'g'); break; } }
  // cheek feathers jut out at the sides
  set(hx - 10, hy + 3, 'K'); set(hx - 11, hy + 4, 'K'); set(hx + 10, hy + 3, 'k'); set(hx + 11, hy + 4, 'g');
  // bedhead tuft
  line(hx - 2, hy - 8, hx - 4, hy - 12, 'K'); line(hx, hy - 8, hx, hy - 13, 'K'); line(hx + 2, hy - 8, hx + 4, hy - 11, 'K'); set(hx + 5, hy - 11, 'K');
  set(hx, hy - 13, 'k'); set(hx + 4, hy - 11, 'g'); set(hx + 5, hy - 11, 'g'); set(hx - 4, hy - 12, 'k');
  // beard: thin wisps under the beak
  if (!sip) {
    poly([[17.5, hy + 6], [25.5, hy + 6], [25, hy + 9], [24, hy + 11], [23, hy + 9.5], [22, hy + 12], [21, hy + 9.5], [19.5, hy + 11.5], [18.5, hy + 9]], 'B');
    set(19, hy + 8, 'b'); set(20, hy + 10, 'b'); set(22, hy + 11, 'b'); set(24, hy + 9, 'b');
  }

  // ---- spectacles ------------------------------------------------------------------------------------
  const eyeL = 16, eyeR = 25, ey = hy - 1;
  const lens = cx => {
    ell(cx + .5, ey + .5, 3.4, 3.2, 'Y');
    ell(cx + .5, ey + .5, 2.4, 2.2, 'L');
    set(cx - 1, ey - 1, 'L'); set(cx + 2, ey + 2, 'l'); set(cx + 1, ey + 2, 'l');
    set(cx - 2, ey + 2, 'y'); set(cx + 3, ey + 2, 'y');
  };
  lens(eyeL); lens(eyeR);
  rect(eyeL + 4, ey - 1, eyeR - 3, ey - 1, 'Y'); // bridge
  set(eyeL - 4, ey, 'y'); set(eyeR + 5, ey, 'y');
  const E = o.eyes || 'open';
  for (const cx of [eyeL, eyeR]) {
    if (E === 'open') { rect(cx, ey, cx + 1, ey + 1, 'e'); set(cx, ey, 'n'); }
    else if (E === 'look') { rect(cx + 1, ey, cx + 2, ey + 1, 'e'); set(cx + 1, ey, 'n'); }
    else if (E === 'closed') rect(cx - 1, ey + 1, cx + 2, ey + 1, 'e');
    else if (E === 'happy') { set(cx - 1, ey + 1, 'e'); set(cx, ey, 'e'); set(cx + 1, ey, 'e'); set(cx + 2, ey + 1, 'e'); }
    else if (E === 'squint') rect(cx - 1, ey, cx + 2, ey, 'e');
    else if (E === 'wide') { ell(cx + .5, ey + .5, 2.4, 2.2, 'n'); set(cx, ey, 'e'); set(cx + 1, ey + 1, 'e'); }
    else if (E === 'wince') { const d = cx === eyeL ? -1 : 1; set(cx + 1 + d, ey - 1, 'e'); set(cx + 1 - d * 0, ey, 'e'); set(cx, ey, 'e'); set(cx + 1 + d, ey + 1, 'e'); }
    else if (E === 'glow') rect(cx - 1, ey - 1, cx + 2, ey + 2, 'G');
  }
  // ---- eyebrows: enormous, independent, two rows thick ---------------------------------------------
  const bL = o.browL ?? 0, bR = o.browR ?? 0;
  const BROW = [[12, 0], [13, 0], [14, -1], [15, -1], [16, -1], [17, -1], [18, -1], [19, 0], [11, -1], [10, -2], [9, -3], [8, -3]];
  const BROW2 = [[11, 0], [12, 1], [13, 1], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [10, -1]];
  const drawBrow = (mirror, dy) => {
    const X = x => (mirror ? 2 * hx + 1 - x : x), y0 = ey - 4 - dy;
    BROW2.forEach(([x, y]) => set(X(x), y0 + y, 'b'));
    BROW.forEach(([x, y]) => set(X(x), y0 + y, 'B'));
    if (o.frown) { set(X(19), y0 + 1, 'B'); set(X(20), y0 + 1, 'b'); }
  };
  drawBrow(false, bL); drawBrow(true, bR);

  // ---- beak -----------------------------------------------------------------------------------------
  const by = hy + 2, open = o.talk || 0;
  if (!sip) {
    poly([[17.5, by], [25.5, by], [24.5, by + 2.5], [21.5, by + 6.5], [18.5, by + 2.5]], 'N');
    line(18, by, 24, by, 'M'); line(19, by + 1, 20, by + 1, 'M'); set(24, by + 1, 'l');
    if (open) {
      rect(19, by + 3, 23, by + 3 + (open > 1 ? 1 : 0), 'm');
      poly([[18.5, by + 4 + open], [24.5, by + 4 + open], [21.5, by + 7 + open]], 'N');
    }
  } else {
    poly([[17.5, by - 1], [25.5, by - 1], [24.5, by + 1], [18.5, by + 1]], 'N'); line(18, by - 1, 24, by - 1, 'M');
  }

  if (sip) mug();

  // ---- outline ----------------------------------------------------------------------------------------
  const filled = (x, y) => get(x, y) !== '.' && get(x, y) !== 'o';
  const out = g.map(r => r.slice());
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (g[y][x] === '.' && (filled(x - 1, y) || filled(x + 1, y) || filled(x, y - 1) || filled(x, y + 1))) out[y][x] = 'o';
  return out.map(r => r.join(''));
}

const FRAMES = {
  idle: draw(),
  blink: draw({ eyes: 'closed' }),
  wings: draw({ wings: true }),
  talk: draw({ talk: 1 }),
  talk2: draw({ talk: 2, browL: 1 }),
  look: draw({ eyes: 'look', browR: 1 }),
  think: draw({ eyes: 'closed', browL: 1, browR: 2 }),
  squint: draw({ eyes: 'squint', browL: -1, browR: 2, frown: true }),
  cough: draw({ eyes: 'wince', talk: 2, headDy: 1, browL: -1, browR: -1 }),
  sip: draw({ eyes: 'closed', sip: true, browL: 1, browR: 1 }),
  laugh: draw({ eyes: 'happy', talk: 2, browL: 2, browR: 2 }),
  raise: draw({ staffUp: true, browL: 1, browR: 1 }),
  glow: draw({ staffUp: true, glow: true, eyes: 'glow', browL: 2, browR: 2 }),
  wide: draw({ eyes: 'wide', browL: 3, browR: 3, talk: 1 }),
  nomug: draw({ noMug: true, staffUp: true, eyes: 'happy', browL: 2, browR: 2 }),
};

module.exports = { W, H, PAL, FRAMES, draw };
