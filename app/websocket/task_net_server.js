const net = require('net');
//创建 TCP 服务
const server = net.createServer(function(socket) { //'connection' listener
	// 服务器已连接
	// process.send("server connected");
	console.log("server connected", process.send);

  socket.on('close', function(had_error) {
		console.log('server.e.close',had_error)
    // socket.end('hello\r\n');
  });
	socket.on('connect', function() {
		console.log('server.e.connect')
    // socket.end('Server.message');
  });
  socket.on('data', function(buffer) {
		console.log('server.e.data',buffer.toString())
    // socket.end('Server.message');
  });
  socket.on('end', function() {
		// 服务器已断开
		console.log('server.e.end');
    
  });
  socket.on('error', function(e) {
		console.log('server.e.error',e)
  });
	socket.on('lookup', function(e,address,family,host) {
		console.log('server.e.lookup',arguments)
  });
	
	socket.write("Hello,Client !")
	// socket.pipe(socket) //?
});
//将服务绑定在端口上
server.listen(8124, function() { //'listening' listener
  console.log('服务器已绑定')
});