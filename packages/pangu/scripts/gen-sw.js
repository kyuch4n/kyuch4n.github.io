const fs = require('fs');
const path = require('path');
const sw = fs.readFileSync(
  path.resolve(__dirname, '../service-worker.js'),
  'utf-8',
);
const _sw = sw.replace(/VER(\s*)=(\s*).*;/, `VER = ${Date.now()};`);
fs.writeFileSync(path.resolve(__dirname, '../service-worker.js'), _sw, 'utf-8');
