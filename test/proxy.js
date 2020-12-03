/* eslint-disable class-methods-use-this */
let sampleInstance = null;
let m2 = null; // 代理
let m4 = null; // 实例

function SampleClass(...args) {
  // console.log("init", this);
  this.args = args;

  this.getArgs = function() {
    // console.log("args", this.args);
  };

  this.setProps = function(param) {
    console.log("SampleClass -> setProps -> setProps", this === m2);
    this.param = param;
  };

  this.getProps = function() {
    console.log("SampleClass -> getProps -> getProps", this === m4, this.param);
    return this.param;
  };
}

// 那我们就往这个代理对象上访问

// 现在实现一个函数，获取一个惰性单例
function singletonProxy(ClassName, ...args) {
  // 这个变量用于保存实例化过后的例子
  const m1 = {};
  m2 = new Proxy(m1, {
    get(target, propKey) {
      console.log("proxy-key >", propKey);
      if (m4 === null) {
        m4 = new ClassName(m4, ...args);
        console.log(0, m4);
      }

      // proxy 内的 this 会默认指向 m2，所以需要变更。
      return m4[propKey].bind(m4);
    }
  });
  return m2;
}

sampleInstance = singletonProxy(SampleClass, 1, 2, 3, 4);

// sampleInstance.getArgs()
// sampleInstance.getArgs()
sampleInstance.setProps({ a: 1 });
sampleInstance.getProps();
