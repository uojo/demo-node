let len = 5
let tid = setInterval(()=>{
	if(len<0){
		clearInterval(tid)
	}else{
		console.log('task log %s',len)
		len--
	}

})
