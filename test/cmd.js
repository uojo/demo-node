var cmd = require('commander');
var log = console.log;

cmd
.version('0.1.0') //= options('-V, --version','','0.1.0')
.option('-b, --b1', 'm1') //返回 boolean
.option('-d, --d1 <name>', 'm3', 'd_dft') //必填，默认值参数无效
.option('-c, --c1 [name]', 'm2', 'c_dft') //选填，无值取默认值
.option('-T, --no-tests', 'ignore test hook'); //没有该参数


cmd
.command('setup [env]')
.description('run setup commands for all envs')
.option("-s, --setup_mode [mode]", "Which setup mode to use")
.action(function(env, options){
var mode = options.setup_mode || "normal";
env = env || 'all';
console.log('setup for %s env(s) with %s mode', env, mode);
});
//> node cmd setup -s quiet


cmd
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options){
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ deploy exec sequential');
    console.log('    $ deploy exec async');
    console.log();
  });
//> node cmd exec fn -e quiet
//> node cmd ex fn -e quiet --help


cmd
.command('*')
.action(function(env,ops){
// log(ops.parent.args)
log('deploying "%s"', env);
});
//> node cmd xxx

cmd.parse(process.argv);
log('cmd.params',cmd)