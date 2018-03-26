const {elog, clog} = require('uojo-kit')

elog(12)

let d1 = {}
d1=null
// d1=undefined
// d1="hello"

// elog( d1.hasOwnProperty('a') )
elog( Object.prototype.hasOwnProperty.call(d1,'a') )