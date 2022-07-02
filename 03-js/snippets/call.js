const call = (func, context = globalThis, ...args) => {
  const fn = Symbol('fn');
  context[fn] = func;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

Function.prototype._call = function (context, ...args) {
  // 按规范非undefined和null 才转化为对象,其他都是全局对象
  // 严格模式下,不传为 undefined(未实现)
  context = context !== undefined || context !== null ? Object(context) : globalThis;
  // 用 Symbol 避免参数重复
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

let foo = { value: 1, fn: 1 };
function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value, this.fn);
}
call(bar, foo, 'black', '18'); // black 18 1 1
bar._call(foo, 'black', '18');
