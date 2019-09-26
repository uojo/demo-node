/**
 * 节流 promise 方法
 * @constructor
 */
function PromiseThrottle(){
  const noReturnQueue = {
    // '{id}':[{resolve,reject},...]
  }
  /**
   * 将待执行的 promise 方法与标识推入执行队列
   * @param {Object} options 必须
   * @property {String} options.id 必须，判断是否重复的唯一标识
   * @property {Function} options.promiseFunc 必须，一个返回 promise 的方法
   * @property {Function} options.onRepeated 可选，当通过 `id` 判断出重复的方法进入是，是否放入待返回队列中。默认为 `null`，即不进入队列。可以通过定义方法返回 `true` 使得进队列。
   * @return {Object} return `promise`
   */
  this.push = ({id,promiseFunc,onRepeated=null})=>{
    return new Promise(((resolve,reject) => {
      if (noReturnQueue[id]) {
        if(onRepeated){
          // 重复是否等待结果返回后继续执行
          if(onRepeated(id)){
            noReturnQueue[id].push({resolve,reject})
          }
        }
      } else {
        noReturnQueue[id] = [{resolve,reject}];
        promiseFunc()
        .then(e=>{
          noReturnQueue[id].map(pOpts=>pOpts.resolve(e))
        })
        .catch(err=>{
          noReturnQueue[id].map(pOpts=>pOpts.reject(err))
        })
        .finally(()=>{
          delete noReturnQueue[id]
        })
      }
    }))
  }q
}

// export default PromiseThrottle;
const PromiseThrottleHandle = new PromiseThrottle()
const createPromiseFunc = (val)=>{
  return ()=>new Promise((resolve,reject)=>{
    console.log('TCL: createPromiseFunc -> val', val);
    // setTimeout(()=>{
      // resolve(val)
      reject(val)
    // },1000)
  })
}
const testData = [
  {id:1,promiseFunc:createPromiseFunc(1)},
  {id:2,promiseFunc:createPromiseFunc(2)},
  {id:1,promiseFunc:createPromiseFunc(1)},
  {id:3,promiseFunc:createPromiseFunc(3)},
  {id:1,promiseFunc:createPromiseFunc(1)}
]

const resultsData = (e)=>PromiseThrottleHandle.push(e)
testData.map(e=>{
  resultsData(e)
  .then(e=>{
    console.log('TCL: e', e);
  })
  .catch(err=>{
    console.log('TCL: err', err);
  })
})