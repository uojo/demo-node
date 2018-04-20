const {elog} = require("uojo-kit");
const xs = require("xstream").Stream;

elog( xs.periodic(2) )
const s0 = xs.periodic(2)
s0.addListener({
	next:i=>elog(i)
})

// elog(xs)
const stream = xs.periodic(1000)
  .filter(i => i % 2 === 0)
  .map(i => i * i)
  .endWhen(xs.periodic(5000).take(1))


stream.addListener({
  next: i => elog(i),
  error: err => elog('error'),
  complete: () => elog('completed'),
})