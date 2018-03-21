const {exec, execSync} = require('child_process');
const cmd1 = 'cmd2 c1 name1';
const cmd2 = 'node worker.js';
const cmd3 = 'node echo.js';
const callback = (error, stdout, stderr) => {  
  console.log(`stdout: ${stdout}`);  
  console.log(`stderr: ${stderr}`);  
  if (error !== null) {  
    console.log(`exec error: ${error}`);  
  }
};
const options = {
  // stdio:['pipe','pipe','pipe'], //默认，等同于 [subprocess.stdin, subprocess.stdout, subprocess.stderr]
  // stdio:[process.stdin, process.stdout, process.stderr], //等同于 stdio 数组的索引的 fd 。既 [0,1,2] 或 'inherit'
}

 // ora 不能输出，log 可以输出
// const child = exec( cmd2, callback );

// 注意 options 的配置，决定 ora 和 log 是否可以输出
const child = execSync( cmd2, options );
