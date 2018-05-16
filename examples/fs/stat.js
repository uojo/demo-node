var fs=require("fs");
var log = console.log;
var p1 = './placeholder.jpeg';

// 同步获取文件信息
const stat = fs.statSync(p1, function(err, stats) {
  log(err)
  // if (err) { throw err;}
  log(stats);
  
});
log(stat);

log('end');