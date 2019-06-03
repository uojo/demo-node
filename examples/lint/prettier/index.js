const prettier = require("prettier")

const code = `let a='1'`
const options = {
  // "singleQuote": true,
  "parser":"babel"
}

let crlt = prettier.check(code,options)
console.log('TCL: crlt', crlt);

let nCode = prettier.format(code,options)
console.log('TCL: nCode', nCode);

let nrlt = prettier.check(nCode,options)
console.log('TCL: nrlt', nrlt);
