var socket;

var log = function(msg) {
	console.log(msg)
  // $("#j_log").innerHTML ? $("#j_log").innerHTML += "<br />" + msg : $("#j_log").innerHTML = msg;
}

var initWebSocket = function() {
	if (window.WebSocket) {
		socket = new WebSocket("ws://127.0.0.1:8080/websocket");
		socket.onmessage = function(event) {
			console.log("WebSocket message received > ", JSON.parse(event.data) );
			// log("WebSocket message received > " );
		};
		socket.onopen = function(event) {
			log("Web Socket opened!");
		};
		socket.onclose = function(event) {
			log("Web Socket closed.");
		};
		socket.onerror = function(event) {
			log("Web Socket error.");
		};
	} else {
		log("Your browser does not support Web Socket.");
	}
}

window.onload = function() {
  initWebSocket();
}

function wssend(msg){
	var data = function() {
		 socket.send('{"send":1,"take":2,"message":' + Math.random() + '}');
	};
	if (socket.readyState !== 1) {
		socket.close();
		initWebSocket();
		setTimeout(function() {
			data();
		}, 250);
	} else {
		data();
	};
}

var tid;
function wspolling(){
	tid = setInterval(function(){
		wssend("hello");
	},1000)
}

function wspause(){
	if(tid)clearInterval(tid);
	
}

function wsclose(){
	// console.log( socket.readyState)
	if(socket.readyState === 1){
		socket.close()
	}
	
}