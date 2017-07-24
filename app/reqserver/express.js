var express = require('express')
var proxy = require('express-http-proxy');

var app = express();
var port = 10085;

var apiProxy = proxy("127.0.0.1:10086",{
	proxyReqPathResolver:function(req,res){
		console.log('a',req.originalUrl)
		console.log('b',require('url').parse(req.url).path)
		console.log('c',req._parsedUrl.path)
		// return req._parsedUrl.path
		return req._parsedUrl.path
		// return req.originalUrl
		// return req.path
	}
})

// app.use("/*",apiProxy);
app.use("/proxy",apiProxy);
app.use("*.js",apiProxy);

app.listen(port);
console.log('Now serving the app at http://localhost:'+port);