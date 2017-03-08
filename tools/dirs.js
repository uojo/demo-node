var fs = require("fs");

function mkdirSync(url,cb,mode){
    var path = require("path"), arr = url.split("/");
	//console.log(":",path);

    mode = mode || 0755;
    cb = cb ||function(){};
    if(arr[0]==="."){//处理 ./aaa
        arr.shift();
    }
    if(arr[0] ==".."){//处理 ../ddd/d
        arr.splice(0,2,arr[0]+"/"+arr[1])
    }
    function inner(cur){
		//console.log(">",cur);
		//console.log("-",path.existsSync(cur) , "-", arr.length);

        if(!fs.existsSync(cur)){//不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if(arr.length){
            inner(cur +"/"+arr.shift());
        }else{
            cb();
        }
    }
    arr.length && inner(arr.shift());
}

exports.mkSync = mkdirSync;
