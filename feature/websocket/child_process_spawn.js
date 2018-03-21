const spawn = require('child_process').spawn;
const touch = spawn('node',['m1.js']);

touch.stdout.on('data', (data) => {
 console.log(`stdout: ${data}`);
});

touch.stderr.on('data', (data) => {
 console.log(`stderr: ${data}`);
});

touch.on('close', (code) => {
 console.log(`child process exited with code ${code}`);
});
