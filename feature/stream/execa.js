const execa = require('execa');

module.exports = ()=>{
  const initCmd = execa.sync('cmd2', ['c1 name1']);
  const initStream = initCmd.stdout;
console.log(initCmd);
// console.log(1,initStream);

  /* initCmd.then((relative) => {
    // 子进程的spinner无法显示？
    // console.log('then',relative.);
  }).catch(error => {
    console.log(error);
  }) */
  
  // 将子进程的输出通过管道传给当前进程
  // initStream.pipe(process.stdout);
}
