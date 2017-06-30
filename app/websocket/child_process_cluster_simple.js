var cluster = require('cluster'); //实现并行处理
var numCPUs = require('os').cpus().length;

// 总控节点
if (cluster.isMaster) {
	process.on('message',(msg)=>{
		console.log('process.cluster message received : %s',msg)
	})
	
	console.log("[master] start ... cpu > %s", numCPUs);
	
	// 根据内核数，生成运动节点
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	
	cluster.on('listening',function(worker,address){
			console.log('worker listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
	});
	
	cluster.on('exit', function(worker, code, signal) {
			console.log('worker exit: ' + worker.process.pid + ' died');
	});
	
	cluster.on('message',function(worker, message, handle){
			console.log('worker message: worker ' + worker.process.pid, message, handle );
	});
	
	
} else if( cluster.isWorker ) {
	console.log('[worker] ' + "start ..." + cluster.worker.id);
	
	require('./task_net_server.js');
	
}