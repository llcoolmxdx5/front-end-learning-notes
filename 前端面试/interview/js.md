# js

## 手写深克隆

```js
const clone = (source, target = {}) => {
  let names = Object.getOwnPropertyNames(source);
  for (let i = 0; i < names.length; i++) {
    let desc = Object.getOwnPropertyDescriptor(source, names[i]);
    if (typeof desc.value === "object" && desc.value !== null) {
      let value;
      if (desc.value.constructor === Date) {
        value = new desc.value.constructor(desc.value);
      } else if (desc.value.constructor === RegExp) {
        value = new desc.value.constructor(desc.value, desc.value.flags);
      } else {
        value = new desc.value.constructor();
      }
      Object.defineProperties(target, names[i], {
        configurable: desc.configurable,
        enumerable: desc.enumerable,
        writable: desc.writable,
        value,
      });
      clone(desc.value, value);
    } else {
      Object.defineProperties(target, names[i], desc);
    }
  }
  return target;
};
```

## call apply bind 的区别

1. 第一个参数都是指定函数内部中 this 的指向（函数执行时所在的作用域），然后根据指定的作用域，调用该函数。
2. call 和 apply 方法都是在调用之后立即执行的。而 bind 调用之后是返回原函数，需要再调用一次才行，
3. 都可以在函数调用时传递参数。call，bind 方法需要直接传入，而 apply 方法需要以数组的形式传入。

```js
函数.call(对象,arg1,arg2....)
函数.apply(对象，[arg1,arg2,...])
var ss=函数.bind(对象,arg1,arg2,....)
```

## 手写 bind

```js
Function.prototype.bind1 = function (content) {
  let args = [...arguments].slice(1);
  let resFn = () =>
    this.apply(
      this instanceof resFn ? this : content,
      args.concat(...arguments)
    );
  function tmp() {} // 此处不能用箭头函数
  tmp.prototype = this.prototype;
  resFn.prototype = new tmp();
  return resFn;
};
```

##
