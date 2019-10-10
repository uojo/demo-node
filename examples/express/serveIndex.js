var path = require('path');
var express = require('express');
var app = express();
var serveIndex = require('serve-index');
var staticRoot = path.resolve(__dirname,'./static');

//设置静态文件目录
app.use(
 '/', express.static(staticRoot), 
	serveIndex(staticRoot, {
		icons: true,
		view: 'details'
	})
);

app.listen(3000)