module.exports = ()=>{
  // 可写流
  function getWritableStreamSomehow(params) {
    return process.stdout;
  }
  // console.log(stdout) //true
  const stream1 = getWritableStreamSomehow();
  stream1.on('data',function(e){
    console.log('ondata', e.toString());
    stream1.write('abc\n');
  });
  stream1.on('pipe',function(e){
    console.log('onpipe',e==stream1);

  });
  process.stdin.pipe(stream1);

}