var url = require('url')
var reqClient = require("./reqClient");
var http = require('http');

let mainServ = function (req, res) {
	const query = url.parse(req.url, true)
	console.log('TCL: mainServ -> query', query);

	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	const urlObj = url.parse("http://example.com/")
 console.log('TCL: mainServ -> urlObj', urlObj);
//  res.end("Hello");
	reqClient(urlObj,(e)=>{
		res.end("Hello"+e);
	})
	
};

let port = 3000;
http.createServer(mainServ).listen(port, "127.0.0.1");
console.log('running at 127.0.0.1:' + port);