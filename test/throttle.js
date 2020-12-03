function main(params) {
  console.log("params: ", params);
}

/**
 * 能够缓存参数的截流方法
 * @param {*} func 目标方法。间隔时间后，将期间缓存的参数一并传入
 * @param {*} wait 间隔毫秒数
 */
function genThrottleCacheFunc(func, wait) {
  let prevTimes = Date.now();
  let paramsArr = [];
  return params => {
    paramsArr.push(params);
    if (Date.now() - prevTimes >= wait) {
      try {
        func(paramsArr);
        // eslint-disable-next-line no-empty
      } catch (err) {}
      prevTimes = Date.now();
      paramsArr = [];
    }
  };
}

const func = genThrottleCacheFunc(main, 2000);

let count = 0;

setInterval(() => {
  ++count;
  console.log("count: ", count);
  func(count);
}, 1000);
