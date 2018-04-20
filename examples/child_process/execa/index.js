const path = require('path')
let options = {
  // stdout:'null'
  stdio:[0,1,2]
}
const bin = 'cmd2';
const args = 'c1 proA';
const fpath = path.resolve(__dirname, '../worker.js');

// 无法显示 ora 信息
// require('./execa')(bin,args,options);
require('./execa')(`node ${fpath}`, args, options); // error:enoent

// require('./shell_cmd')(bin, args, options);
// require('./shell_cmd')('node', `${fpath} ${args}`,options);
// require('./shell_sync')('node', fpath, args, options);