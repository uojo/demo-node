const ora = require('ora');
const ops = {
	text:'Loading unicorns',
	// stream:process.stdout
}

const spinner1 = ora(ops.text).start();
console.log(`\n 1`); // 如果中间有 log 输出，会重新起一行继续输出 spinner 的 start 时的信息
setTimeout(function(){
	spinner1.stop()
	console.log(`\n 2`);
	spinner1.text = 'Template loading completed!';
	spinner1.succeed();
	
},2000);

/* const spinner2 = ora(ops.text).start();
setTimeout(() => {
	
	spinner2.color = 'yellow';
	spinner2.text = 'Loading rainbows';
	spinner2.succeed();

}, 1000); */