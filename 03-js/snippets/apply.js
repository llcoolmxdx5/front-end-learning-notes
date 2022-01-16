// apply() 方法调用一个具有给定this值的函数，
// 以及以一个数组（或类数组对象）的形式提供的参数。

// call() 方法的作用和 apply() 方法类似，
// - 区别就是 call() 方法接受的是参数列表，
// - apply() 方法接受的是一个参数数组。

const apply = (func, context = globalThis, args) => {
  const fn = Symbol("fn");
  context[fn] = func;
  const result = args?.length ? context[fn](...args) : context[fn]();
  delete context[fn];
  return result;
};

Function.prototype._apply = function (context, args) {
  context =
    context !== undefined || context !== null ? Object(context) : globalThis;
  const fn = Symbol("fn");
  context[fn] = this;
  let result;
  // 判断是否有第二个参数
  if (args?.length) {
    result = context[fn](...args);
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
};
let foo = { value: 1, fn: 1 };
function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value, this.fn);
}
bar._apply(foo, ["black", "18"]); // black 18 1 1
apply(bar, foo, ["black", "18"]);
