var net = require('net');
var socket = net.connect({port: 8124},function(){ // connect监听器
  console.log("客户端已连接");
  socket.write('Client.message');
});
socket.on("data", function(buffer) {
  console.log("client.e.data",buffer.toString());
  socket.end();
});
socket.on("end", function(){
  console.log("client.e.end");
});
socket.on("error", function(e){
  console.log("client.e.error",e);
});