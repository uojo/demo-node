const fs = require('fs');
const screenshot = require('screenshot-stream');
 
const stream = screenshot('http://www.163.com', '1024x768', {crop: true});
 
stream.pipe(fs.createWriteStream('1024x768.png'));