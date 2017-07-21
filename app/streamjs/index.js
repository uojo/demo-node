const co = require('co')
const {elog,clog,log} = utils = require('../utils')
const lodash=require('lodash')
const Stream=require('streamjs')
const omit=require('object.omit')
// https://github.com/winterbe/streamjs/blob/master/APIDOC.md
// console.log(log)

const da1=[
  {i:0, a: 1, b: 1, f:function *(){
    // return 123;
    let t1 = yield new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('apple')
      },100)
    })
    clog(t1)
    let t2 = yield new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('orange')
      },100)
    })
    clog(t2)
    clog('end')
    // return t1;
  }},
  {i:1, a: 2, b: 2, f:function* (){
   
  }},
  {i:2, a: 1, b: 3, f:function* (){
   yield (()=>{
     return 'hello'
   })() 
  }},
  {i:3, a: 1, b: 4, f:function* (name){
    yield "你好 " + name + "!";
    yield "希望你能喜欢这篇介绍ES6的译文";
    if (name.startsWith("X")) {
      yield "你的名字 " + name + "  首字母是X，这很酷！";
    }
    yield "我们下次再见！";
  }}
]

let r0 = Stream(da1)
.filter({a:1})
// .flatMap("children")
// .map("firstName")
.distinct()
// .filter(/a.*/i)
.filter((e)=>{
  // log(e)
  return e.b>2;
})
.join(", ");

// log('blue',r0);

let r1 = Stream(da1[0]).filter((a,b,c)=>{
	log(a,b,c)
})
// log( r1.toMap() )

let r2 = lodash.mapKeys({a:1,b:2,c:3},function(val,key){
	/* if(key==='a'){
		log(key,val);
		return key;
	} */
	return key+val;
})
// log( r2 )

let r3 = omit(da1[0],['i'],(val,key)=>{
	clog(key,val)
	if(key==='b'){
		val++;
	}
	return key!=='f'
});
clog(r3);
// clog(co(da1[0].f()) ) // echo Promise
// clog(da1[0].f().next().value.then((data)=>{
//   // clog(data)
// }) ) // echo Promise
// clog(co(da1[0].f()) ) // echo Promise
// clog( da1[1].f() ) // echo {}
// clog(da1[2].f().next() ) // echo 'hello'
// clog( da1[3].f().next() ) // echo Promise

// console.trace('hello')

elog('red', 123 )