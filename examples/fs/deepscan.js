var fs=require("fs"), stat = fs.stat;
var path = require('path')
var deepscan = require('deep-scan')
var fRegex = require('filename-regex');
// var extName = require('ext-name');
var log = console.log;

deepscan(path.join(__dirname, '../../'), filepath => {
  log(filepath, filepath.match(fRegex()))
  // log(filepath)
  // log(extName(filepath))
  // require(filepath.replace(/\.js$/, ''));
}, ['^node_modules']);

