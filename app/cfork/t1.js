var exec = require('child_process').exec;


var child = exec('node worker.js', function(err, stdout, stderr) {
  if (err) throw err;
	console.log(stdout);
  console.log('complete');
});