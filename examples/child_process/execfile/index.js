const path = require('path');
const { execFile, execFileSync } = require('child_process');

const fname = 'worker.js';
const fname2 = 'echo.js';
const fpath = path.resolve(__dirname, '../', fname);

const callback = (error, stdout, stderr) => {
  console.log('call-start');
  if (error) {
    throw error;
  }
  console.log('call-end');
}
const options = {
  stdio:[0,1,2]
};

// require('./execfile')(fpath,options,callback)
// require('./promisify')(fpath,options,callback)
// require('./execfilesync')(fpath,options,callback)



