const { execFile, execFileSync } = require('child_process');

module.exports = (fpath,options,callback)=>{
  
  // 注意 options 的配置，决定 ora 和 log 是否可以输出。
  const child2 = execFileSync('node', [fpath], options);
  // console.log(child2); // null
  
}