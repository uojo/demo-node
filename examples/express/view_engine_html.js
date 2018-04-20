var path = require('path');
var express = require('express');
var app = express();
var ejs = require('ejs');

var port=3000;
// set
app.set('views', path.join(__dirname, 'views'));
app.engine(".html", ejs.__express);
app.set('view engine', 'html');

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

var pa1 = path.join(__dirname, 'views');

var ser = app.listen(port);

// console.log(pa1);
// console.log("ser",ser);
// console.log("locals",app.locals);
