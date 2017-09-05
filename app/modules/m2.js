// 构造函数

module.exports = function(){
	var a = 0
	
	this.fn1 = ()=>{
		a++
	}
	
	this.fn2 = ()=>{
		return a;
	}
}