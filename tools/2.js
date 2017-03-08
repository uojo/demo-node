var fs=require("fs"), stat = fs.stat, dirCtl=require("./dirs");

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( dst, callback ){
    dirCtl.mkSync(dst);
    return;
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( dst );
        }
        // 不存在
        else{

        }
    });
};
exists("temp/1/2/1.js");


function cp1(src,dst){
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
// cp1("src/js/1.js","temp/1/1.js");
