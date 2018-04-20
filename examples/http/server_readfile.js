var http = require("http");
var fs = require("fs");

var port=3000;
var Se2=function(req,res){
	console.log(req,res);
	fs.readFile("src/html/1.html",function(err,file){
		if(err){
			res.writeHead(404);
			res.end("找不到文件");
			return;
		}
		res.writeHead(200);
		res.end(file);
	});
};
http.createServer(Se2).listen(port,"127.0.0.1");
console.log('running at 127.0.0.1:'+port);
