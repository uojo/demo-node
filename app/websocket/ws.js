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
			console.log('WebSocket closed');
		});
		
		ws.on('error', (err) => {
			console.log('WebSocket error: %s', err);
		});
		
		ws.on('message', (data) => {
			console.log('WebSocket message received : %s', JSON.parse(data));
			ws.send(data);
			
		});
		
	})
	
	return wsSer;
};

exports.clients = [];

