var fs=require("fs"), dirCtl=require("./dirs");

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
