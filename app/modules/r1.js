const m1 = require('./m1')
const m2 = require('./m2')

m1.fn1()
m1.fn1()

// m2.fn3()
const o1 = new m2()
o1.fn1()

exports.d1 = m1.fn2()
exports.d2 = o1.fn2()