var path = require('path');
var express = require('express');
var app = express();
var ejs = require('ejs');
// require('./t1')
// require('./log')

// set
app.set('views', path.join(__dirname, './'));
app.engine(".html", ejs.__express);
app.set('view engine', 'html');

//设置静态文件目录
app.use( express.static( path.join(__dirname,'./') ));

// use 中间件 ：一个简单的 logger
app.use(function(req, res, next){
  console.log('log: %s %s', req.method, req.url);
  next();
});

// 路由
app.get( "/a", function (req, res) {
  res.send('Hello World! Express');
});

app.get( "/b", function (req, res) {
	res.render('b', { title: 'page B' });
});

app.get( "/c", function (req, res) {
	res.render('b');
});

app.get( "/ws", function (req, res) {
	
});


var port=3000;
var bs = require('browser-sync').create();
var ser = app.listen(port-1,function(){
	bs.init({
		open: false,
		ui: false,
		notify: false,
		logLevel:"silent",
		proxy: 'localhost:'+ (port-1),
		files: [
			{
				match:['./**'],
				fn:function(e, e_path){
					// 显示变更的行为，文件路径
					if( e=="change" ){
						// console.log( 0, e_path )
						// console.log( 8 );
						bs.reload();
						
					}else{
						
						
					}
					
				}
			}
		],
		port: port
	})
});

// 初始 websocket
require('./ws').listen(ser)
// console.log("ser",ser);
// console.log("locals",app.locals);
