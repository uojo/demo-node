const http = require("http");

const Se1 = function(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello world\n");
};

const port = 3000;
http.createServer(Se1).listen(port);
console.log(`running at :${port}`);
