const http = require("http");

let Se1=function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	console.log(req.headers.hosts); // 127.0.0.1:3000
	console.log(req);
	// console.log(res);
	res.end("hello world\n");
};

let port=3000;
http.createServer(Se1).listen(port,"127.0.0.1");
console.log('running at 127.0.0.1:'+port);
