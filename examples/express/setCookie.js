var path = require('path');
var proxy = require('http-proxy-middleware')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
 
var express = require('express');
var app = express();

var port = 3000;

app.use(bodyParser.json());
app.use(cookieParser())

const genMenu = (req)=> {
	const cookies = JSON.stringify(req.cookies, null, 4) || ""
 	console.log('TCL: cookies', cookies);
	return `<a href="/">Hello</a> <a href="/b"> World</a> <a href="/c">cookie</a> <pre>${cookies}</pre>`
}

const render = (req,res)=>{
	res.send(genMenu(req))
}

app.get("/", function (req, res) {
	res.cookie('name', 'tobi')
	res.cookie('id', '1',{domain:'.apple.com'})
	render(req,res)
});

app.get("/b", function (req, res) {
	render(req,res)
});

app.get("/c", function (req, res) {
	render(req,res)
});

var ser = app.listen(port);