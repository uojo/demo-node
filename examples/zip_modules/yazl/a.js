var fs = require("fs")
var yazl = require("yazl");

var zipfile = new yazl.ZipFile();
zipfile.addFile("a.txt", "b.txt");
// (add only files, not directories)
// zipfile.addFile("path/to/file.txt", "path/in/zipfile.txt");
// pipe() can be called any time after the constructor
zipfile.outputStream.pipe(fs.createWriteStream("output.zip")).on("close", function() {
  console.log("done");
});
// alternate apis for adding files:
zipfile.addReadStream(process.stdin, "a.txt", {
  mtime: new Date(),
  mode: parseInt("0100664", 8), // -rw-rw-r--
});
zipfile.addBuffer(new Buffer("b"), "b.txt", {
  mtime: new Date(),
  mode: parseInt("0100664", 8), // -rw-rw-r--
});
// call end() after all the files have been added
zipfile.end();