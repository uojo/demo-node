const m1 = require('./m1')
const m2 = require('./m2')

const o1 = new m2()

exports.d1 = m1.fn2()
exports.d2 = o1.fn2()