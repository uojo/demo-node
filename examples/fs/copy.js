var fs=require("fs"), stat = fs.stat;

function copy(src,dst){
  stat(src,function(err,st){
    if( st.isFile() ){
      // 创建读取流
      readable = fs.createReadStream( src );
      // 创建写入流
      writable = fs.createWriteStream( dst );
      // 通过管道来传输流
      readable.pipe( writable );
    }
  });
}

// copy("src/js/1.js","temp/1/1.js");
