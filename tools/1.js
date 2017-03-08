var fs=require("fs"), stat = fs.stat;
function copy(src,dst){
  fs.readdir(src,function(err,paths){
    console.log("paths:",paths);
    paths.forEach(function(path){
      console.log("path:",path);

      var _src = src+"/"+path;
      var _dst = dst+"/"+path;

      stat(_src,function(err,st){
        if( st.isFile() ){
          // 创建读取流
          readable = fs.createReadStream( _src );
          // 创建写入流
          writable = fs.createWriteStream( _dst );
          // 通过管道来传输流
          readable.pipe( writable );
        }
      })


    })

  })
}

// copy("src","tools");
copy("src/js/","temp");
