const { elog, clog } = require("uojo-kit");

const { log } = console;
elog(12);

let d1 = {};
d1 = null;
// d1=undefined
// d1="hello"

// elog( d1.hasOwnProperty('a') )
// elog( Object.prototype.hasOwnProperty.call(d1,'a') )

const rg1 = /\/\d+/;
// let rg1 = new RegExp("\\/\\d+")
log(rg1.test("a/b"));
log(rg1.test("a/b/12"));
