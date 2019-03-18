const http = require("http");
// console.log(module)
// console.log(global)
// console.log(require.cache)
let globalData = "hello"
// 传递数据到接下来 require 的模块
exports.company = 'google'
const data = require("./middle_data")
console.log('data: ', data);
// const builtin = require('module').builtinModules;
// console.log('builtin: ', builtin);


module.exports = "mod.js"
