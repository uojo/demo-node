module.exports = ()=>{
  // 只读流
  function getReadableStreamSomehow(params) {
    return process.stdin;
  }
  // console.log(stdout) //true
  const stream1 = getReadableStreamSomehow();
  stream1.on('data',function(e){
    // 如果没有添加 data 事件监听，
    // console.log('on.data',e.toString());
    // stream1.pause()
  });
  stream1.on('close',function(e){
    console.log('on.close');
    
  });
  stream1.on('error',function(e){
    console.log('on.error');
    
  });
  stream1.on('readable',function(e){
    console.log('on.readable',stream1.read());
    
  });  
  stream1.on('end',function(e){
    console.log('on.end');
    
  });
  stream1.on('pipe',function(e){
    console.log('on.pipe');

  });
  // stream1.pause();
  process.stdin.pipe(stream1);
}