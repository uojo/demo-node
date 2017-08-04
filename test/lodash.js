const {clog} = require('../app/utils')
const _ = require("lodash");
let da1 = {
	a:{
		b:{
			c:3,
			// d:4,
			e:5
		}
	}
};
let {c,d=2} = da1.a.b
clog(c,d)

clog( _.omit(da1,['a.b.d'])  )
clog( _.has(false,'a') )
clog( _.has({a:0},'a') )
clog( _.isEmpty(false), _.isEmpty([]), _.isEmpty({}) )

clog( __dirname )