const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const git = require('git-rev-sync');

const now = moment().utcOffset(8);
const writeContent = {
  timestamp: now.format('x'),
  datetime: now.format('YY/MMDD/HHmm'),
  git:{
    tag:git.tag() || '',
    short:git.short() || '',
    isTagDirty:git.isTagDirty(),
  },
};

const destFilePath = path.resolve(__dirname, '../temp/build_info.json');
fs.ensureFileSync(destFilePath);
fs.writeJsonSync(destFilePath, writeContent);
