var {elog} = require("uojo-kit");
var fs = require("fs");
var express = require('express');
var ejs = require('ejs');
var app = express();

const showReq=(req,source)=>{
	const reqFields = ['protocol','hostname','path','baseUrl','originalUrl','xhr','route','params','body','query']
	reqFields.forEach((v,i)=>{
		elog(source+'-'+v,'\n',req[v],'\n')
	})
}


// 设置模板
app.set('views', './files' );
app.engine(".html", ejs.__express);
app.set('view engine', 'html');

//设置静态文件目录
app.use( express.static( './files' ));
app.use( "/*", function (req, res, next) {
	showReq.call(this,req,'use')
	if(!/favicon\.ico/.test(req.baseUrl)){
		next()
	}
	
});

app.get( "/:tplPath", function (req, res) {
	showReq.call(this,req,"get")
	
	// elog(fs.readFileSync( './files/body_1.html','utf-8'))
	let pageData = {
		body:""
	}
	try{
		pageData.body = fs.readFileSync( './files/body_'+req.params.tplPath+'.html','utf-8')
	}catch(e){
		// elog(e)
		pageData.body = e.message
	}
	
  res.render('./layout',pageData );

});



app.get( "/c", function (req, res) {
  res.send('Hello World! Express');
});

app.get( "/b", function (req, res) {
  res.render('./a',{title:'Hello World! Express'});
});


var port = 3065
app.listen(port,function(err){
    if (err) {
			console.log(err)
			return
    }
    var uri = 'http://127.0.0.1:' + port
		
    console.log('Listening at ' + uri + '\n')
})