var express = require('express')
var serveIndex = require('serve-index')

var app = express()

// Serve URLs like /ftp/thing as public/ftp/thing
// The express.static serves the file contents
// The serveIndex is this module serving the directory
app.use('/', express.static('./'), serveIndex('./', {
  'icons': true
}))

// Listen
app.listen(3001)