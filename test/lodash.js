const _ = require("lodash");
const lodash_timeout = require("./lodash_timeout");
const da1 = {
  a: {
    b: {
      c: 3,
      // d:4,
      e: 5
    }
  }
};

const cmds = [
  `_.difference([4, 3, 2, 1, 0], [4, 2], [1])`,
  `_.get(global, 'a.b', '')`,
  `_.isString('');`,
  `_.identity(1,2,3)`,
  `_('null').isString()`
];

// cmds.forEach(e => console.log(`${e} =>`, eval(e)));

// clog( _.omit(da1,['a.b.d'])  )
// clog( _.has(false,'a') )
// clog( _.has({a:0},'a') )
// clog( _.isEmpty(false), _.isEmpty([]), _.isEmpty({}) )

// clog( __dirname )

// lodash_timeout.throttle();
// lodash_timeout.debounce();
