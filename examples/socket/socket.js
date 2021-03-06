var express = require('express');
var sockjs  = require('sockjs');

// 1. Echo sockjs server
var sockjs_opts = {sockjs_url: "https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"};

var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
});

// 2. Express server
var app = express();
sockjs_echo.installHandlers(app, {prefix:'/echo'});

console.log(' [*] Listening on 0.0.0.0:9999' );
app.listen(9999, '0.0.0.0');

/* app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socket.html');
});

app.get('/stomp', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/echo/info', function (req, res) {
  res.json({"websocket":true,"origins":["*:*"],"cookie_needed":false,"entropy":2559752714})
}); */