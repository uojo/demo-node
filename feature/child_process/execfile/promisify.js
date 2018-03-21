const { execFile, execFileSync } = require('child_process');
const util = require('util');

module.exports = (fpath,options,callback)=>{
  
  // 无法显示 ora 的输出？和 execfile 类似。
  const execFile2 = util.promisify(execFile);
  (async function() {
    const { stdout } = await execFile2('node', [fpath]);
    console.log(stdout);
    // stdout.pipe(process.stdout); // pipe is not a function
  })(); 
  
}