var {JSDOM} = jsdom = require('jsdom')
var pageHTML = '<!DOCTYPE html><p>Hello world</p>';
var options = {
  url: "https://example.org/",
  referrer: "https://example.com/",
  contentType: "text/html",
  userAgent: "Mellblomenator/9000",
  includeNodeLocations: true
}
var {window} = new JSDOM(pageHTML,options);
var {location} = window;
// console.log(window)
console.log(location.href)
// https://example.org/
console.log(window.XMLHttpRequest, window.ActiveXObject)
// Function, undefined
