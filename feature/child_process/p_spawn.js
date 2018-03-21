const spawn = require('child_process').spawn;
//使用shell方法指定一个shell选项  
const bat = spawn('cmd2', ['c1', 'name1']);
bat.stdout.on('data', (data) => {  
  console.log('stdout.ondata',data.toString());  
});  
bat.stderr.on('data', (data) => {  
  console.log('stderr.ondata',data.toString());  
});
bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);  
});