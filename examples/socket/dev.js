var path = require('path');
var express = require('express');
var sockjs = require('sockjs');
var app = express();
var port=3000;

// use 中间件 ：一个简单的 logger
app.use(function(req, res, next){
  console.log('log: %s %s', req.method, req.url);
  next();
});
app.use(express.static(path.join(__dirname, './')));

var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
echo.on('connection', function(conn) {
  conn.on('data', function(message) {
    conn.write(message);
  });
  conn.on('close', function() {});
});
echo.installHandlers(app, {prefix:'/echo'});

console.log(' [*] Listening on 127.0.0.1:'+port );
var ser = app.listen(port);
