var http = require('http')
var Buffer = require('Buffer');
var express = require('express')
var app = express()
var reqServer = require('./req-server')

app.use('/a', function (req, res, next) {
  reqServer.find(req,function(data){
		// res.contentType('json');
		// 输出
		// var data = { name: 'jack' };
		// res.write(JSON.stringify(data));
		res.write(data)
		res.end();
	});
	// next()
});

app.get('/g1', function(req,res){
	res.send('内容get g1');
});

app.get('/g2', function(req,res){
	
	res.send( JSON.parse('{"a":100,"b":"中文"}') );
});

app.use('/', function (req, res, next) {
	console.log( req.path )
	
	req = http.request({
		hostname: '127.0.0.1',
		port: 10010,
		path: '/g2',
		method:req.method,
		// headers:req.headers
	}, function(re) {
		// console.log(re.headers)
		re.setEncoding('utf8');
		re.on('data', function (data) {
			// console.log('>>> ', data, '<<<');
			res.set(re.headers).end(data);
		});
		
	});
	
	req.end()
	
});

var port = 10010
app.listen( port, function(err) {
	if (err) {
		console.log(err)
		return
	}
	var uri = 'http://127.0.0.1:' + port
	console.log('Listening at ' + uri + '\n')

})