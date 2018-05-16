var fs=require("fs"), stat = fs.stat;
var http = require('http');
var FormData = require('form-data');
var request = require('request');
var log = console.log;
// var util = require('./util');
// 参看：https://github.com/request/request

var form1 = new FormData();
form1.append('pageNo',2)
// log(form)
var form2 = {
  'file':fs.createReadStream(__dirname + '/files/placeholder.jpeg'),
}

var options = {
  // url:'http://127.0.0.1:7001/api/package',
  // url:'http://127.0.0.1:3000/data/items_placeholder',
  // method: 'GET' 
  url:'http://127.0.0.1:7001/api/upload',
  method: 'POST',
  formData:form2
};

request(options, function (error, response, body) {
  // log(body)
  if (!error && response.statusCode == 200) {
    log(body);
  }else{
    log(error)
  }
})