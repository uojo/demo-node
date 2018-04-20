const execa = require('execa');

module.exports = (bin,args,options)=>{
  console.log(bin,args)
  const initCmd = execa(bin, [args], options);
  initCmd.then(result => {
    console.log('then',result);
  }).catch(error => {
    console.log('error',error);
  });

}