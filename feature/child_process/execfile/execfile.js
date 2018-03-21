const { execFile } = require('child_process');

module.exports = (fpath,options,callback)=>{
  // 无法显示 ora 的输出？options 中不能自定义 stdio 字段
  const child1 = execFile('node', [fpath], options, callback);
  child1.stdout.pipe(process.stdout);
  
}