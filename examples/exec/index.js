const execa = require('execa');

/* (async ()=>{
  const {stdout,stderr} = await execa('node',['a'])
  console.log('TCL: stdout', stdout);
  console.log('TCL: stderr', stderr);
})() */

/* const {stdout,stderr} = execa('node',['a'])
console.log('TCL: stdout', stdout);
console.log('TCL: stderr', stderr); */

// execa('node',['a']).stdout.pipe(process.stdout)
// execa('node',['err']).stderr.pipe(process.stdout)

// timeout
// execa('node',['timeout1']).stdout.pipe(process.stdout)

const cmds = ['node a','node timeout1',];

const {stdout,stderr} = execa.shellSync(cmds.join(' && '))
console.log('TCL: stdout', stdout);
console.log('TCL: stderr', stderr);

/* ;(async ()=>{
  for(let it of cmds){
    const {stdout,stderr} = await execa.shell(it)
    if(stderr){
      // break;
    }
    if(stdout){
      console.log('TCL: stdout', stdout);
    }
  }
})() */
