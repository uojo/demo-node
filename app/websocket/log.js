process.on('message', (msg) => {
	console.log('process.message > ',msg);
});

process.on('SIGINT', function() {
	console.log('收到 SIGINT 信号。');
});

// process.send({a:1,b:2});