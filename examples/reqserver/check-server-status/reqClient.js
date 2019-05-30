var Buffer = require('Buffer');
var http = require('http');

module.exports = function(options, callback){
	const {host,port,pathname,query, method='get'} = options

	var defaultOptions = {
		hostname: host,
		port,
		path: pathname,
		method,
		headers: {
			// 'Content-Type': 'application/x-www-form-urlencoded',
			// 'Content-Length': Buffer.byteLength(query)
		}
	};
	
	const reqOptions = Object.assign({},defaultOptions,options)

	req = http.request(reqOptions, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (data) {
			callback(data);
		});
	});
	
	req.on('error', function(error){
		 callback(error)
	});
	
	req.end();
}