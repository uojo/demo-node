/**
 * 零宽断言
 * https://blog.csdn.net/xuyangxinlei/article/details/81359366
 * https://www.cnblogs.com/dong-xu/p/6926064.html
 * https://www.cnblogs.com/macq/p/6597366.html
 */

// (?!exp) 负向前瞻
const str1 = "h110h210h310";
console.log(str1.match(/h(?!1)\d+/g));
// =>[ 'h210', 'h310' ]

const str2 = "";
// console.log(str2.match(/&((?!test).)+;/g));

const str3 =
  "<div id='1'><img class='xx'></div><div id='1'><input type='text'></div>";
// console.log(str3.match(/<div[^>]*>((?!<img[^>]*>).)+</div>/g));

// (?=exp) 正向前瞻
const str4 = "Hello, Hi, I am Hilary.";
console.log(str4.match(/H(?=i)/g));
// => [ 'H', 'H' ] 匹配到的是 Hi、Hi。由于零宽断言是不占位的，所以仅返回 H
