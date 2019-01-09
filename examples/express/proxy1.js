var path = require('path');
var proxy = require('http-proxy-middleware')
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

var port=3000;

app.use(bodyParser.json());

// use 中间件 ：一个简单的 logger
app.use(function(req, res, next){
  console.log('log: %s %s', req.method, req.url);
  next();
});

// 路由
app.get( "/a", function (req, res) {
  res.send('Hello World! Express');
});

// 路由
app.use(proxy('/proxy/*',{
	target: 'https://api.bootcdn.cn/libraries/',
	// pathRewrite:{"/proxy/":""},
	pathRewrite:function (path, req) { 
		// console.log(path); // xxx.com/proxy/ab => /proxy/ab
		return path.replace("/proxy/", '')+".json" 
	},
	changeOrigin: true,
	secure: false,
	cookieDomainRewrite: '127.0.0.1',
	onProxyReq:function(proxyReq, req, res){
		// console.log(req)
		console.log('onProxyReq',req.originalUrl)
		if (req.body) {
			console.log("reqBody", req.body)
      // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
			proxyReq.setHeader('Content-Type', 'application/json')
			
      let bodyData = JSON.stringify(req.body)
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      // stream the content
      proxyReq.write(bodyData)
      proxyReq.end()
    }
	}
}));


var ser = app.listen(port);

