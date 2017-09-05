// 局部变量，被 require 后，是公用的
let k1 = 0


exports.fn1 = function(){
	++k1
	
}

exports.fn2 = function(){
	return k1
	
}