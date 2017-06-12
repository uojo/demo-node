const WebSocket = require('ws');
const url = require('url');

exports.listen = function(server){
	let wsConf1 = {
		server,
		path:"/a1"
		
	};
	let wsConf2 = {
		port:8080
	};
	const wsSer = new WebSocket.Server(wsConf2);
	
	wsSer.on('connection',(ws)=>{
		ws.on('close', () => {
			console.log('WebSocket.close: %s', 0);
		});
		
		ws.on('error', (err) => {
			console.log('WebSocket.error: %s', err);
		});
		
		ws.on('message', (data) => {
			console.log('WebSocket message received from client with data: %s', data);
		});
		
		ws.send("server.message")
	})
	
	return wsSer;
};

exports.clients = [];

