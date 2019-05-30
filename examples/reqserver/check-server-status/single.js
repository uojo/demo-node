var url = require('url')
var request = require("request");
var http = require('http');

let mainServ = function (req, res) {
	// const query = url.parse(req.url, true)

	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	var options = {
		url: 'https://www.baidu.com',
		headers: {
			'User-Agent': 'request'
		}
	};
	 
	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			console.log(info.stargazers_count + " Stars");
			console.log(info.forks_count + " Forks");
		}
		res.end("Hello");
	}
	 
	request(options, callback);
	
};

let port = 3000;
http.createServer(mainServ).listen(port, "127.0.0.1");
console.log('running at 127.0.0.1:' + port);