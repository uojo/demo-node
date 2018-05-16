const path = require('path');
const Pageres = require('pageres');
const options = {
  delay: 2,
  scale: 1,
  transparent: true
  // selector:'#figure_video'
}
const pageres = new Pageres(options)
// logo
// .src('www.qq.com', ['108x29'], {crop: true})
// 视频失败 #figure_video
// .src('www.qq.com', ['145x80'], {crop: true})
.src('127.0.0.1:7001/screenshot', ['400x400'], {crop: false})
// .src('www.dxy.cn', ['480x320', '1024x768', 'iphone 5s'], {crop: true})
// .src('www.163.com', ['1280x1024', '1920x1080'])
// .src('data:text/html;base64,PGgxPkZPTzwvaDE+', ['1024x768'])
.dest( path.resolve(__dirname,'./dist') )
.run()
.then(() => console.log('done'));