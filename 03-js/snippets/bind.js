const bind =
  (fn, context, ...boundArgs) =>
  (...args) =>
    fn.apply(context, [...boundArgs, ...args]);

Function.prototype._bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(`"${this}"+.bind is not a function`);
  }
  const self = this;
  const fBind = function (...bindArgs) {
    // 2.可以绑定 this 指向
    return self.apply(
      // 4.绑定的函数也能 new, new 的时候会忽略掉提供的 this 指向
      this instanceof fBind ? this : context,
      // 3.可以传入参数
      args.concat(bindArgs)
    );
  };
  // 5.new 出来的结果可以找到原有类的原型
  fBind.prototype = Object.create(this.prototype);
  /**
   * 与上面一行等价
   * const Empty = function () {};
   * Empty.prototype = this.prototype;
   * fBind.prototype = new Empty();
   */
  // 1.返回一个函数(高阶函数)
  return fBind;
};

function greet(greeting, punctuation) {
  return greeting + " " + this.user + punctuation;
}
const freddy = { user: "fred" };
const freddyBound1 = bind(greet, freddy);
console.log(freddyBound1("hi", "!")); // 'hi fred!'

const freddyBound2 = greet._bind(freddy);
console.log(freddyBound2("hi", "!")); // 'hi fred!'
