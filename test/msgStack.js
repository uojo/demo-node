const assert = require("assert");

// console.log(123, );

/**
 * 维护一个栈结构的队列，始终保证队列长度维持在限定值，超出则先进先出
 * 顺序规则：左旧右新，右进左出。
 */
function CacheStack({ maxLength, data = [] }) {
  // 弃用：使用原生数组方法操作 value 时无法监听到 set
  // let stack = [];
  // Reflect.defineProperty(this, "value", {
  //   get() {
  //     console.log("get", stack);
  //     return stack;
  //   },
  //   set(val) {
  //     console.log("set", val);
  //     stack = val;
  //   }
  // });
  this.value = data;
  Reflect.defineProperty(this, "length", {
    get() {
      return this.value.length;
    }
  });

  this.set = function(arr) {
    if (arr.length > maxLength) {
      this.value = arr.slice(-maxLength);
    } else {
      this.value = arr;
    }
  };
  this.unshift = function(item) {
    // 不限定值
    if (Array.isArray(item)) {
      this.value = item.concat(this.value);
    } else {
      this.value.unshift(item);
    }
  };
  this.push = function(item) {
    this.value = this.value.concat(item); // 支持数组（多值）与非数组（单）
    if (this.value.length > maxLength) {
      this.value.shift();
    }
    return this.value;
  };
  this.pop = function(count) {
    if (this.value.length === 0) return [];
    if (count < this.value.length) {
      const rlt = this.value.slice(-count); // 取右侧值（新）
      this.value.splice(this.value.length - count); // 原地更新 value
      return rlt;
    }
    const r = this.value.slice(-this.value.length);
    this.value.splice(0); // 原地清空
    return r;
  };
}

const foo = new CacheStack({
  maxLength: 4
});

// 用例
assert.deepEqual(foo.value, []);
foo.set([1, 2, 3, 4, 5]);
// console.log(foo.value);
assert.deepEqual(foo.value, [2, 3, 4, 5]);
assert.deepEqual(foo.length, 4);
foo.push(6);
assert.deepEqual(foo.value, [3, 4, 5, 6], "推入单值");
foo.push([7]);
assert.deepEqual(foo.value, [4, 5, 6, 7], "推入数组");
assert.deepEqual(foo.length, 4);
assert.deepEqual(foo.pop(2), [6, 7], "取最新值时");
assert.deepEqual(foo.length, 2);
assert.deepEqual(foo.value, [4, 5], "取最新值后");
assert.deepEqual(foo.pop(2), [4, 5], "再取新值时");
assert.deepEqual(foo.value, [], "取完");
assert.deepEqual(foo.length, 0);
foo.unshift(8);
assert.deepEqual(foo.value, [8], "推入单个旧值");
assert.deepEqual(foo.length, 1);
foo.unshift([9, 10, 11, 12, 13]);
assert.deepEqual(foo.value, [9, 10, 11, 12, 13, 8], "推入多个旧值");
assert.deepEqual(foo.length, 6);
