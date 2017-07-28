const {clog} = require('../app/utils')
const _ = require("lodash");

clog( _.isEmpty(false) )
clog( _.has(false,'a') )
clog( _.has({a:0},'a') )

