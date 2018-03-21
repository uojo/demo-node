const execa = require('execa');

module.exports = (bin, fpath, args, options)=>{
  const initCmd = execa.shellSync( `${bin} ${fpath} ${args}`, options );
  // console.log(initCmd.stdout.pipe)
  // initCmd.stdout.pipe(process.stdout);
  /* initCmd.then(result => {
    console.log('then',result);
  }).catch(error => {
    console.log('error',error);
  }); */

}