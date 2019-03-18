const http = require("http");

let Se1=function(req,res){
	// console.log(res);
	res.writeHead(200,{'Content-Type':'text/plain'});
	// console.log(req.headers.hosts); // 127.0.0.1:3000
	// console.log(req);
	let rlt
	// 传递数据
	global.a1=100
	rlt =  require('./mod')

	let expStr = "const data = require('./data');console.log(data);return data"
	let fn1 = new Function('require','exports',expStr)
	rlt = fn1(require)

	// console.log(1)
	// rlt = eval(expStr)
	// res.end(rlt);

	res.end("hello world\n");
};

let port=3000;
http.createServer(Se1).listen(port,"127.0.0.1");
console.log('running at 127.0.0.1:'+port);
