const fs = require('fs');
const path = require('path');

const indexFile = path.resolve(__dirname, '../lib/index.js');
const code = fs.readFileSync(indexFile).toString();

fs.writeFileSync(
  indexFile,
  code
    .replace(/\nexports\.default(.*)\n/, '\nexports$1\nexports["default"]$1\n')
    .replace(/\nexports(\W)/g, '\nmodule.exports$1'),
);
