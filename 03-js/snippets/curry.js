// 柯里函数
// - 使用递归。
// - 如果提供的参数（arg）数量足够，则调用传递的函数fn。
// - 否则，用 Function.prototype.bind() 返回一个柯里化函数 fn，该函数需要其余参数。
// - 如果要生成接受可变数量参数的函数（可变函数，例如Math.min（）），可以选择将参数数量传递给第二个参数 arity。

const curry1 = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry1.bind(null, fn, arity, ...args);

function curry2(fn, arity = fn.length) {
  function _curry(fn, arity, ...args) {
    return function (...params) {
      let _args = [...args, ...params];
      if (_args.length >= arity) {
        return fn.apply(this, _args);
      } else {
        return _curry.call(this, fn, arity, ..._args);
      }
    };
  }
  return _curry.call(this, fn, arity);
}

const curry3 = (fn, arity = fn.length) => {
  const _curry = (fn, arity, ...args) =>
    arity <= args.length ? fn(...args) : _curry.bind(null, fn, arity, ...args);
  return _curry.call(this, fn, arity);
};

const res1 = curry2(Math.pow)(2)(10); // 1024
const res2 = curry2(Math.min, 3)(10)(50)(2); // 2
console.log(res1, res2);
