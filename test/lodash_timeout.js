const _ = require("lodash");

// 参考：https://blog.csdn.net/hupian1989/article/details/80920324

/**
 * 节流，意味着在一个响应周期内，多次触发将会合并为一次执行。应用场景：拖拽、滚动加载
 */
exports.throttle = () => {
  let tcount = 0;
  const echo1 = val => {
    const tag = tcount;
    console.log("start val: ", tag);
    setTimeout(() => {
      console.log("end val: ", tag);
    }, 1000);
  };
  const throttleEcho1 = _.throttle(echo1, 8000, {
    leading: true, // 默认 true，
    trailing: false // 默认 true，
  });

  // throttleEcho1.flush(); // 立即执行
  setInterval(() => {
    ++tcount;
    if (tcount === 3) {
      throttleEcho1.cancel(); // 最近等待周期重置，重新等待
    }
  }, 1000);

  // 有规律的触发执行
  setInterval(throttleEcho1, 2000);

  /**
   * 1.常规使用：
   * leading:true,trailing:true => 【执行，等待】……循环
   * leading:true,trailing:false =>【执行，等待】……循环
   * leading:false,trailing:true =>【等待，执行】……循环
   * leading:false,trailing:false => 无反应
   * 2.添加 cancel 后：
   * leading:true,trailing:true => 执行，等待（中途取消），【执行】……循环
   * leading:true,trailing:false => 执行，等待（中途取消），【执行】……循环
   * leading:false,trailing:true => 等待（中途取消），等待（重新开始），【执行，等待】……循环
   * leading:false,trailing:false => 无反应
   * 3.结论：
   * true、true === true、false，表示先执行，再等待
   * false、true，表示先等待，再执行
   */
};

/**
 * 防抖，意味着在一个响应周期内，不断接收到事件时，当前周期将不断推迟。可以设置最大等待时间，以防止不断延迟。应用场景包括：键盘输入。
 */
exports.debounce = () => {
  let tcount = 0;
  const echo1 = val => {
    const tag = tcount;
    console.log("start val: ", tag);
    setTimeout(() => {
      console.log("end val: ", tag);
    }, 1000);
  };
  const debounceEcho1 = _.debounce(echo1, 3000, {
    leading: true, // 默认 true，
    trailing: false // 默认 true，
    // maxWait: 4000 // 最长等待
  });

  // debounceEcho1.flush(); // 立即执行
  setInterval(() => {
    ++tcount;
    if (tcount === 3) {
      debounceEcho1.cancel(); // 最近等待周期重置，重新等待
    }
  }, 1000);

  // 有规律的触发执行
  setInterval(debounceEcho1, 2000);

  /**
   * 1.常规（触发的频率均在等待时间内）使用：
   * leading:true,trailing:true => 执行，【等待】……循环
   * leading:true,trailing:false => 执行，【等待】……循环
   * leading:false,trailing:true =>【等待】……循环
   * leading:false,trailing:false => 无反应
   * 2.添加 cancel 后：
   * leading:true,trailing:true => 执行，等待（中途取消），执行，【等待】……循环
   * leading:true,trailing:false => 执行，等待（中途取消），执行，【等待】……循环
   * leading:false,trailing:true => 【等待】……循环
   * leading:false,trailing:false => 无反应
   * 3.结论：
   * true、true === true、false，表示先执行，再等待
   * false、true，表示先等待，再执行
   */
};
