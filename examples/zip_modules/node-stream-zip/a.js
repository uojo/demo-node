var
fs = require('fs'),
path = require('path'),
StreamZip = require('node_stream_zip');

var
testPathTmp,
testNum = 0,
basePathTmp = 'test/.tmp/',
contentPath = 'test/content/';

const zip = new StreamZip({
  file: 'a.zip',
  storeEntries: true
});

// Handle errors
zip.on('error', err => { /*...*/ });

zip.on('ready', () => {
  zip.stream('../example.js', (err, stm) => {
      stm.pipe(process.stdout);
      stm.on('end', () => zip.close());
  });
});