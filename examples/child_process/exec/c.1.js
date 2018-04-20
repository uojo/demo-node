const path = require('path');
const execa = require('execa');

module.exports = ()=>{
  let options = {
    stdout:process.stdout
  }
  const initCmd = execa.shell( path.resolve('../worker.js'), "c a", options);
  // console.log(initCmd.stdout.pipe)
  initCmd.stdout.pipe(process.stdout);
  /* initCmd.then(result => {
    console.log('then',result);
  }).catch(error => {
    console.log('error',error);
  }); */

}