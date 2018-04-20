const execa = require('execa');

module.exports = (bin,args,options)=>{
  const pc = execa.shell(`${bin} ${args}`, options);
  
}