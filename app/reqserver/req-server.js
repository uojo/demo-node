var querystring = require('querystring')
var Buffer = require('Buffer');
var http = require('http');

exports.find = function(req, success){
	console.log('agent.request.path', req.path, req.method )
	
	const postData = querystring.stringify({
		'type' : 1
	});

	var options = {
		hostname: '127.0.0.1',
		port: 10010,
		path: '/g2',
		method: req.method,
		headers: {
			// 'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
		}
	};
	
	req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (data) {
			console.log('>>> ', data, '<<<');
			/* try{
				data = JSON.parse(data);
			}catch(err){
				console.log("parse error: "+err)
			} */
			
			success(data);
		});
	});
	
	req.on('error', function(e){
		 console.log("req-server error: " + e.message);
	});
	
	req.write(postData);
	req.end();
}