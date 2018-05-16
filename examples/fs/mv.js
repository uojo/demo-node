var fs=require("fs");
var log=console.log;
var mv=require("mv");
var oldFilePath = 'files/placeholder.jpeg', newFilePath = 'files/rename.jpeg';
mv(oldFilePath, newFilePath, function(err) {
  // done. it tried fs.rename first, and then falls back to
  // piping the source file to the dest file and then unlinking
  // the source file.
});

const renameOverwrite = require('rename-overwrite')
renameOverwrite(oldFilePath, newFilePath)
  .then(() => log('done'))
  .catch(err => log(err))