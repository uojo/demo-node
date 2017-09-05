var path = require('path')
var express = require('express')
var proxy = require('express-http-proxy');

var app = express();
var port = 10086;

//设置静态文件目录
app.use( '/files', express.static( path.join(__dirname,'files') ));

app.all("/api/*",function(req,res,next){
  console.log("10086",req.path);

  if(/\.js$/.test(req.path)){
    res.set({
      'Content-Type':'application/javascript; charset=UTF-8'
    }).end(req.path+'\n')
  }

  if(/\.json$/.test(req.path)){
    res.set({
      'Content-Type':'application/json; charset=UTF-8'
    }).json({a:1})
  }
  
  next();
});

app.get("/rd/*",function(req,res,next){
	console.log(req.path)
	if( /img/.test(req.path) ){
		res.redirect('/files/1.jpg')
	}
	next();
});

app.use('/src',express.static('./src/'));


app.listen(port);
console.log('Now serving the app at http://localhost:'+port);