const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const candidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '..', '.env'),
  path.resolve(__dirname, '..', '..', '.env')
];

for (const file of candidates) {
  if (fs.existsSync(file)) {
    dotenv.config({ path: file });
    process.env.ENV_FILE_PATH = file;
    break;
  }
}

module.exports = { loadedFrom: process.env.ENV_FILE_PATH || null };
