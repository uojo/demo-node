var r1 = require('./r1');


if(typeof window==='object'){
  window['ab'] = window['ab'] || r1
}

module.exports = r1