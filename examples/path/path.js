var path = require("path");


console.log("常量__dirname", __dirname);
console.log("规范化的路径格式", path.normalize(__dirname) );

// path.join([path1],[path2]..[pathn]);
/**
 * [path1] 路径或表示目录的字符，
 */

var path1 = 'path1',
    path2 = 'path2//pp\\',
    path3 = '../path3';

var myPath = path.join(path1, path2, path3);
console.log("路径合并",myPath); //path1\path2\path3


// 获取绝对路径，以应用程序为起点，根据参数字符串解析出一个绝对路径
// path.resolve(path1, [path2]..[pathn]);
/**
 * path 必须至少一个路径字符串值
 * [pathn] 可选路径字符串
 */

var myPath = path.resolve( 'path1', 'path2', 'a/b\\c/' ) ;
console.log("获取绝对路径",myPath); //E:\workspace\NodeJS\path1/path2/a/b\c

//path.relative(from, to);
//获取两路径之间的相对关系

/**
 * from 当前路径，并且方法返回值是基于from指定到to的相对路径
 * to   到哪路径，
 */

var from = 'c:\\from\\a\\',
    to = 'c:/test/b';

var _path = path.relative(from, to);
console.log(_path); //..\..\test\b; 表示从from到to的相对路径


// 获取路径中目录名

var myPath = path.dirname(__dirname + '/test/util you.mp3');
console.log(myPath);


// 获取路径中文件名,后缀是可选的，如果加，请使用'.ext'方式来匹配，则返回值中不包括后缀名；

var myPath = path.basename(__dirname + '/test/util you.mp3', '.mp3');
console.log(myPath);

//获取路径中的扩展名，如果没有'.'，则返回空
// path.extname(path)


//返回操作系统中文件分隔符； window是'\\', Unix是'/'
// path.sep属性


//返回操作系统中目录分隔符，如window是';', Unix中是':'
// path.delimiter属性





