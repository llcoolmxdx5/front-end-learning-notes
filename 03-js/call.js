const call =
  (func, ...args) =>
  (context = globalThis) => {
    const fn = Symbol("fn");
    context[fn] = func;
    context[fn](...args);
    delete context[fn];
  };

Function.prototype._call = function (context, ...args) {
  context = context || window;
  const fn = Symbol("fn");
  context[fn] = this;
  context[fn](...args);
  delete context[fn];
};

let foo = { value: 1, fn: 1 };
function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value, this.fn);
}
call(bar, "black", "18")(foo); // black 18 1 1
bar._call(foo, "black", "18");
