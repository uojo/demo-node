function start(tasks) {
  var result = [];
  return tasks.reduce((accumulator, item, index) => {
    return accumulator.then(res => {
      return item.then(res => {
        result[index] = res;
        return index == tasks.length - 1 ? result : item;
      });
    });
  }, Promise.resolve());
}
function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(time);
    }, time);
  });
}

// const stime = Date.now();
// start([delay(2000), delay(2000), delay(1000)]).then(res => {
//   console.log(Date.now() - stime);
//   console.log(res); //[undefined,undefined,1000]
// });

// 串行执行
const sfn = time => cb => {
  setTimeout(function() {
    console.log(time, "end");
    if (cb) cb();
  }, time);
};

const tarr = new Array(3).fill("").map((e, i) => sfn((i + 1) * 1000));

//串行执行arr中的函数
var series = function(arr, callback) {
  var counter = 0;
  var process = function() {
    if (counter < arr.length) {
      var fun = arr[counter++];
      if (fun) fun(process);
    } else {
      if (callback) callback();
    }
  };
  process();
};

//并行执行arr中的函数
var parallel = function(arr, callback) {
  var counter = arr.length;
  var process = function() {
    if (!--counter) {
      if (callback) callback();
    }
  };
  if (counter == 0) {
    if (callback) callback();
  } else {
    arr.forEach(function(fun) {
      if (fun) fun(process);
    });
  }
};

series(tarr, () => {
  console.log("all complete!");
});
