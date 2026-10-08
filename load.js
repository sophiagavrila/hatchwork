// Load core + every creature in the roster (and its evolutions) under Node. Returns PatchDex.
const fs = require('fs');
const path = require('path');
module.exports = function load({ quiet = false } = {}) {
  globalThis.window = globalThis;
  const D = require('./core.js');
  require('./roster.js');
  for (const id of window.PATCH_ROSTER) {
    for (const dir of ['creatures', 'evolutions']) {
      const f = path.join(__dirname, dir, id + '.js');
      if (!fs.existsSync(f)) { if (dir === 'creatures' && !quiet) console.error(`[${id}] not drawn yet`); continue; }
      try { require(f); } catch (e) { if (!quiet) console.error(`[${id}] ${dir}/${id}.js failed to load: ${e.message}`); }
    }
  }
  return D;
};
