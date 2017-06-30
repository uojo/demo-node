const net = require('net');
//创建 TCP 服务
const server = net.createServer();

server.on('close',()=>{
	console.log('server.e.close')
})
server.on('connection',(socket)=>{
	console.log('server.e.connection')
	socket.write("Server.message")
	socket.on("data",(buffer)=>{
		console.log("server.socket.e.data",buffer.toString())
	})
	// socket.end()
})
server.on('error',()=>{
	console.log('server.e.error')
})
server.on('listening',()=>{
	console.log('server.e.listening')
})

//将服务绑定在端口上
server.listen(8124, function() { //'listening' listener
  console.log('服务器已绑定')
});