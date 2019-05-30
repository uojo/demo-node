const request = require('request');
const cheerio = require('cheerio');


var options = {
  url: 'http://example.com/',
  headers: {
    'User-Agent': 'request'
  }
};

request(options, (error, response, body) => {
  if(!error && response.statusCode == 200){
    const $ = cheerio.load(body)
    const docTitle = $("title").get()
    console.log('TCL: docTitle', docTitle);
  }
});