var path = require('path');
var proxy = require('http-proxy-middleware')
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

var port = 3000;
let token = null

app.use(bodyParser.json());

app.get("/", function (req, res) {
	res.send('Hello World');
});

const funcA = (app, config) => {
	// 动态注册路由，且只会注册一次
	app.get("/b", (req, res) => {
		res.send('b' + JSON.stringify(config));
	})
}
app.get("/a", function (req, res) {
	res.send('a');
	const query = req.query
	console.log('TCL: query', query);
	// funcA(app, query)
	token = JSON.stringify(query)
});
// 先注册路由，内部动态判断
app.get("/c", (req, res) => {
	if (token) {
		res.send(token)
	}
	res.send('fail')
})

var ser = app.listen(port);