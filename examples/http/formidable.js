var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path')

var uploadField = "abc"
http.createServer(function (req, res) {
  console.log('TCL: req.headers', req.method, req.headers);
  
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      // console.log('TCL: fields', fields);
      console.log('TCL: files', files);
      try{
        var oldpath = files[uploadField].path;
        var newpath = path.resolve(__dirname,'./temp/'+files[uploadField].name);
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write('File uploaded and moved!');
          res.end();
        });
      }catch(err){
        res.write('fail!');
        res.end();
      }
    });
  } else if (/get/.test(req.url)){
    console.log('TCL: req.body', req.body);
    res.write('get complete.');
    res.end();
  } else if (req.url == '/post'){
    console.log('TCL: req.body', req.body);
    res.write('post complete.');
    res.end();
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="'+uploadField+'"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8090);