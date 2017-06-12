var ws = new WebSocket("ws://127.0.0.1:8080");

ws.onopen = function(){
	console.log("client.open");
	
	setInterval(function(){
		ws.send("hello");
	},1000)
	
};

ws.onmessage = function(evt){
	console.log("client.message",evt);
  // console.log(evt.data)

};

ws.onclose = function(evt){
  console.log("client.close");

};

ws.onerror = function(evt){
  console.log("client.error");

};