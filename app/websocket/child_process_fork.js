const childProcess = require('child_process');
const worker = childProcess.fork('worker_simple.js');

worker.on('message',function(mes){
  console.log(`from worker, message: ${mes}`);
});
worker.send("this is master");

