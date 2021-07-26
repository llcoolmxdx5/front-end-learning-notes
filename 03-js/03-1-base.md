# 03-1-js基础函数数组字符串

## js基础

### 1.数据类型的转换

#### 0.数据类型分类

分为基本数据类型和引用数据类型。其中基本数据类型包括undefined、null、Boolean、Number、String、Symbol (ES6新增，表示独一无二的值)，而引用数据类型统称为Object对象，主要包括对象、数组和函数

#### 1. 转为str

```js
num.toString() // 不能转换 undefined 和 null
String()
字符串与其他数据类型直接拼接
```

#### 2. 转为num

```js
Number() // 要转换的有一个不是数字,返回NaN true->1
parseInt() // 解析到非数字结束,第一个为非数字则返回NaN true -> NaN
parseFloat() // 解析到非数字结束,第一个为非数字则返回NaN
  // 会解析第一个. 遇到第二个.或者非数字结束如果解析的内容里只有整数，解析成整数
a.toFixed(2) // 保留2位小数
```

#### 3. 转换成布尔类型

`Boolean()` 0  ''(空字符串) null undefined NaN false 会转换成false  其它都会转换成true

### 2.类型判断

#### 1. typeof

typeof返回一个表示数据类型的字符串，返回结果包括：number、boolean、string、symbol、object、undefined、function bigint等8种数据类型，但不能判断null、array等

```js
typeof Symbol ();// symbol 有效
typeof ''; // string 有效
typeof 1; // number 有效
typeof true; // boolean 有效
typeof undefined; //undefined 有效
typeof new Function (); // function 有效
typeof BigInt(1223); // bigint 有效
typeof null; // object 无效
typeof []; // object 无效
typeof new Date (); // object 无效
typeof new RegExp(); //object 无效
```

#### 2. instanceof

instanceof 是用来判断A是否为B的实例，表达式为：A instanceof B，如果A是B的实例，则返回true,否则返回false。instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性，但它不能检测null 和 undefined

```js
[] instanceof Array; //true
{} instanceof Object; //报错
new Date() instanceof Date; //true
new RegExp() instanceof RegExp; //true
null instanceof null; //报错
undefined instanceof undefined; //报错
```

#### 3. constructor

constructor作用和instanceof非常相似。但constructor检测 Object与instanceof不一样，还可以处理基本数据类型的检测。不过函数的 constructor 是不稳定的，这个主要体现在把类的原型进行重写，在重写的过程中很有可能出现把之前的constructor给覆盖了，这样检测出来的结果就是不准确的。

#### 4. Object.prototype.toString.call()

Object.prototype.toString.call() 是最准确最常用的方式 返回一个字符串 但是不能判断 NaN

```js
Object.prototype.toString.call('').slice(8, -1); // String
Object.prototype.toString.call(1).slice(8, -1); // Number
Object.prototype.toString.call(true).slice(8, -1); // Boolean
Object.prototype.toString.call(undefined).slice(8, -1); // Undefined
Object.prototype.toString.call(null).slice(8, -1); // Null
Object.prototype.toString.call(new Function()).slice(8, -1); // Function
Object.prototype.toString.call(new Date()).slice(8, -1); // Date
Object.prototype.toString.call([]).slice(8, -1); // Array
Object.prototype.toString.call(new RegExp()).slice(8, -1); // RegExp
Object.prototype.toString.call(new Error()).slice(8, -1); // Error
Object.prototype.toString.call(NaN).slice(8, -1); // Number
```

#### 5.NaN的判断

没有任何内容与NaN相同，包括他自己NaN==NaN

```js
var a = NaN
isNaN(a)
```

#### 6.null=undefined

### 3.运算符

#### 1.与或非

```js
// (只有 false 、0、NaN、null、undefined、空字符串为假, 其余都是真)
a && b // 看左边的值是真还是假,如果是真,返回的是右边的值,如果是假返回的是左边的值
a || b // 看左边的值是真还是假,如果是真,返回的是左边的值,如果是假返回的是右边的值
value = value || 'default value' // 给函数的参数填充默认值
value = value !== undefined ? value : 'default value' // 传入undefined才会转为默认值
a && b || c // a为true返回b a为false返回c 类似三元运算符
```

#### 2.位元算符

```js
~20 == -21 // 按位非 结果是这个数+1取负值
~arr.indexOf("asd") // 找到为真
& // 按位与
| // 按位或
a ^ b ^ b == a // 按位异或 相同为0，不同为1
1 << 5// 左移 2的5次幂
>> // 右移
>>> // 无符号右移
```

#### 3.条件运算符

```js
a ? b : c // a为真取b a为假取c
```

### 4.switch

```js
var a = 90;
switch(true) {
  case a > 100:
  case a < 0:
    console.log("成绩错误");
    break;
  case a >= 90:
    console.log("A");
}
```

### 5.for循环

1. 最原始的for循环

    ```js
    var arr = [1,2,3,4]
    for(var i = 0 ; i< arr.length ; i++){
        console.log(arr[i])
    }
    ```

2. forEach

    从ES5开始 Javascript内置了forEach方法 用来遍历数组

    ```js
    let arr = ['a', 'b', 'c', 'd']
    arr.forEach(function (val, idx, arr) {
        console.log(val + ', index = ' + idx) // val是当前元素，index当前元素索引，arr数组
        console.log(arr)
    })
    ```

    存在一个局限 就是你不能中断循环(使用break语句或使用return语句）

3. for…in

    for-in循环实际是为循环”enumerable“对象而设计的

    ```js
    let obj = {a: '1', b: '2', c: '3', d: '4'}
    for (let o in obj) {
        console.log(o)    //遍历的实际上是对象的属性名称 a,b,c,d
        console.log(obj[o])  //这个才是属性对应的值1，2，3，4
    }
    ```

4. for…of

    它是ES6中新增加的语法

    ```js
    // 循环一个数组
    let arr = ['China', 'America', 'Korea']
    for (let o of arr) {
        console.log(o) //China, America, Korea
    }
    ```

    ```js
    // 但是它并不能循环一个普通对象
    let obj = {a: '1', b: '2', c: '3', d: '4'}
    for (let o of obj) {
        console.log(o)   //Uncaught TypeError: obj[Symbol.iterator] is not a function
    }
    ```

    ```js
    // 但是可以循环一个拥有enumerable属性的对象。
    // 如果我们按对象所拥有的属性进行循环，可使用内置的Object.keys()方法
    let obj = {a: '1', b: '2', c: '3', d: '4'}
    for (let o of Object.keys(obj)) {
        console.log(o) // a,b,c,d
    }
    ```

    ```js
    // 如果我们按对象所拥有的属性值进行循环，可使用内置的Object.values()方法
    let obj = {a: '1', b: '2', c: '3', d: '4'}
    for (let o of Object.values(obj)) {
        console.log(o) // 1,2,3,4
    }
    ```

    ```js
    // 循环一个字符串
    let str = 'love'
    for (let o of str) {
        console.log(o) // l,o,v,e
    }
    ```

    ```js
    // 循环一个Map
    let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);
    for (let [key, value] of iterable) {
      console.log(value);
    }
    // 1
    // 2
    // 3
    for (let entry of iterable) {
      console.log(entry);
    }
    // [a, 1]
    // [b, 2]
    // [c, 3]
    ```

    ```js
    // 循环一个Set
    let iterable = new Set([1, 1, 2, 2, 3, 3]);
    for (let value of iterable) {
      console.log(value);
    }
    // 1
    // 2
    // 3
    ```

   ```js
    // 循环一个类型化数组
    let iterable = new Uint8Array([0x00, 0xff]);
    for (let value of iterable) {
      console.log(value);
    }
    // 0
    // 255
   ```

#### 堆内存与栈内存

栈内存主要用于存储各种基本类型的变量，包括Boolean、Number、String、Undefined、Null，**以及对象变量的指针，这时候栈内存给人的感觉就像一个线性排列的空间，每个小单元大小基本相等。

而堆内存主要负责像对象Object这种变量类型的存储

## 函数

### 函数内 `this` 指向的不同场景

| 调用方式   | 非严格模式   | 备注                |
| ------ | ------- | ----------------- |
| 普通函数调用 | window  | 严格模式下是 undefined  |
| 构造函数调用 | 实例对象    | 原型方法中 this 也是实例对象 |
| 对象方法调用 | 该方法所属对象 | 紧挨着的对象            |
| 事件绑定方法 | 绑定事件对象  |                   |
| 定时器函数  | window  |                   |

### call、apply、bind

#### call

`call()` 方法调用一个函数, 其具有一个指定的 `this` 值和分别地提供的参数(参数的列表)。

注意：该方法的作用和 `apply()` 方法类似，只有一个区别，就是 `call()` 方法接受的是若干个参数的列表，而 `apply()` 方法接受的是一个包含多个参数的数组。

语法：

```javascript
fun.call(thisArg[, arg1[, arg2[, ...]]])
```

参数：

- `thisArg`
  - 在 fun 函数运行时指定的 this 值
  - 如果指定了 null 或者 undefined 则内部 this 指向 window
- `arg1, arg2, ...`
  - 指定的参数列表

#### apply

`apply()` 方法调用一个函数, 其具有一个指定的 `this` 值，以及作为一个数组（或类似数组的对象）提供的参数。

注意：该方法的作用和 `call()` 方法类似，只有一个区别，就是 `call()` 方法接受的是若干个参数的列表，而 `apply()` 方法接受的是一个包含多个参数的数组。

语法：

```javascript
fun.apply(thisArg, [argsArray])
```

参数：

- `thisArg`
- `argsArray`

`apply()` 与 `call()` 非常相似，不同之处在于提供参数的方式。
`apply()` 使用参数数组而不是一组参数列表。例如：

```javascript
fun.apply(this, ['eat', 'bananas'])
```

#### bind

bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的call属性）。
当目标函数被调用时 this 值绑定到 bind() 的第一个参数，该参数不能被重写。绑定函数被调用时，bind() 也接受预设的参数提供给原函数。
一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

语法：

```javascript
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```

参数：

- thisArg
  当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用new 操作符调用绑定函数时，该参数无效。

- arg1, arg2, ...
  当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。

返回值:返回由指定的this值和初始化参数改造的原函数拷贝。

示例1：

```javascript
this.x = 9;
var module = {
  x: 81,
  getX: function() { return this.x; }
};
module.getX(); // 返回 81
var retrieveX = module.getX;
retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域
// 创建一个新函数，将"this"绑定到module对象
// 新手可能会被全局的x变量和module里的属性x所迷惑
var boundGetX = retrieveX.bind(module);
boundGetX(); // 返回 81
```

示例2：

```javascript
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}
// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};
LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};
var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用'declare'方法
```

#### 小结

- call 和 apply 特性一样
  - 都是用来调用函数，而且是立即调用
  - 但是可以在调用函数的同时，通过第一个参数指定函数内部 `this` 的指向
  - call 调用的时候，参数必须以参数列表的形式进行传递，也就是以逗号分隔的方式依次传递即可
  - apply 调用的时候，参数必须是一个数组，然后在执行的时候，会将数组内部的元素一个一个拿出来，与形参一一对应进行传递
  - 如果第一个参数指定了 `null` 或者 `undefined` 则内部 this 指向 window
- bind
  - 可以用来指定内部 this 的指向，然后生成一个改变了 this 指向的新的函数
  - 它和 call、apply 最大的区别是：bind 不会调用
  - bind 支持传递参数，它的传参方式比较特殊，一共有两个位置可以传递
    - 1.在 bind 的同时，以参数列表的形式进行传递
    - 2.在调用的时候，以参数列表的形式进行传递
  - 那到底以谁 bind 的时候传递的参数为准呢还是以调用的时候传递的参数为准
  - 两者合并：bind 的时候传递的参数和调用的时候传递的参数会合并到一起，传递到函数内部

### 函数的其他成员

- arguments
  - 实参集合
- caller
  - 函数的调用者
- length
  - 形参的个数
- name
  - 函数的名称

```js
function fn(x, y, z) {
  console.log(fn.length) // => 形参的个数
  console.log(arguments) // 伪数组实参参数集合
  console.log(arguments.callee === fn) // 函数本身
  console.log(fn.caller) // 函数的调用者
  console.log(fn.name) // => 函数的名字
}
function f() {
  fn(10, 20, 30)
}
f()
```

### 高阶函数

- 函数可以作为参数
- 函数可以作为返回值

#### 作为参数

```js
function eat (callback) {
  setTimeout(function () {
    console.log('吃完了')
    callback()
  }, 1000)
}
eat(function () {
  console.log('去唱歌')
})
```

#### 作为返回值

```js
function genFun (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === type
  }
}
var isArray = genFun('[object Array]')
var isObject = genFun('[object Object]')
console.log(isArray([])) // => true
console.log(isArray({})) // => true
```

### 闭包

```js
function fn () {
  var count = 0
  return {
    getCount: function () {
      console.log(count)
    },
    setCount: function () {
      count++
    }
  }
}
var fns = fn()
fns.getCount() // => 0
fns.setCount()
fns.getCount() // => 1
```

#### 作用域、作用域链、预解析

- 全局作用域
- 函数作用域
- **没有块级作用域**

```javascript
{
  var foo = 'bar'
}
console.log(foo)
if (true) {
  var a = 123
}
console.log(a)
```

作用域链示例代码：

```javascript
var a = 10
function fn () {
  var b = 20
  function fn1 () {
    var c = 30
    console.log(a + b + c)
  }
  function fn2 () {
    var d = 40
    console.log(c + d)
  }
  fn1()
  fn2()
}
```

- 内层作用域可以访问外层作用域，反之不行

#### 什么是闭包

闭包就是能够读取其他函数内部变量的函数，
由于在 Javascript 语言中，只有函数内部的子函数才能读取局部变量，
因此可以把闭包简单理解成 “定义在一个函数内部的函数”。
所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

闭包的用途：

- 可以在函数外部读取函数内部成员
- 让函数内成员始终存活在内存中

#### 一些关于闭包的例子

示例1：

```javascript
var arr = [10, 20, 30]
for(var i = 0; i < arr.length; i++) {
  arr[i] = function () {
    console.log(i)
  }
}
```

示例2：

```javascript
console.log(111)
for(var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i)
  }, 0)
}
console.log(222)
```

### 递归

#### 举个栗子：计算阶乘的递归函数

```javascript
function factorial (num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}
```

#### 递归应用场景

- 深拷贝
- 菜单树
- 遍历 DOM 树

### 柯里化

> 在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数且返回结果的新函数的技术。

**函数柯里化的主要作用和特点就是参数复用、提前返回和延迟执行。**

```js
function curry(fn, args) {
    var length = fn.length;
    var args = args || [];
    return function () {
        var newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length < length) {
            return curry.call(this, fn, newArgs);
        } else {
            return fn.apply(this, newArgs);
        }
    }
}
function multiFn(a, b, c) {
    return a * b * c;
}
var multi = curry(multiFn);
multi(2)(3)(4);
multi(2, 3, 4);
multi(2)(3, 4);
multi(2, 3)(4);
```

```js
const curry = (fn, arr = []) => (...args) => (
    arg => arg.length === fn.length
        ? fn(...arg)
        : curry(fn, arg)
)([...arr, ...args])
let curryTest = curry((a, b, c, d) => a + b + c + d)
curryTest(1, 2, 3)(4) //返回10
curryTest(1, 2)(4)(3) //返回10
curryTest(1, 2)(3, 4) //返回10
```

## 数组

[数组](http://www.runoob.com/jsref/jsref-obj-array.html)

### 1.遍历数组

#### 1.索引数组

```js
for(var i = 0; i < arr.length; i++) {
  // 数组遍历的固定结构
}
for (var index in arr) {
  console.log(index, arr[index])
  // 使用for in遍历时，索引值会当成对象的属性来遍历，会变成一个字符串
  // 数组元素有属性时，for in会遍历到，正常的不会
  // for in不会遍历到数组中的空元素
}
```

#### 2. 关联数组

```js
var hash=[]
hash["下标名(key)"]=值(value)
for(var key in hash){
    key //仅获取当前下标名称
    hash[key] //获取当前元素值
}
var keys=[];
var i=0;
for(keys[i++] in hash);
//结束后: keys中保存了hash的所有key
```

### 2. 方法

#### 1.栈操作(先进后出)

> 队尾插入元素，在队尾删除元素

```js
push()    //在数组的最后添加元素
pop() //取出数组中的最后一项，修改length属性
```

#### 2.队列操作(先进先出)

> 队尾插入元素，在队首删除元素

```js
push()
shift()  //取出数组中的第一个元素，修改length属性
unshift() //在数组最前面插入项，返回数组的长度
```

#### 3.排序方法

```js
arr.reverse() // 翻转数组
arr.sort(function(a, b) {
  return a - b // 从小到大
  return b - a // 从大到小
  return Math.random() - 0.5 // 随机乱序
}); // 即使是数组sort也是根据字符，从小到大排序
```

#### 4.操作方法

```js
var arr1 = arr.concat() // 把参数拼接到当前数组 返回拼接后的数组
arr.slice(start, end+1) // 从当前数组中截取一个新的数组，不影响原来的数组，参数start从0开始,end从1开始
var arr1 = arr.splice(start, n, options)
  // 删除或替换当前数组的某些项目
  // 参数start, deleteCount, options(要替换的项目)
  // 返回被删除元素的组成的新数组
imgs=imgs.concat(imgs.splice(0, n))  // 移除开头的n个元素拼到结尾
imgs=imgs.splice(-n).concat(imgs)  // 移除结尾的n个元素拼到开头
```

#### 5.位置方法

```js
// 无法查找对象
arr.indexOf(target, index)
arr.lastIndexOf()   //如果没找到返回-1
```

#### 6.迭代方法

> 不会修改原数组(可选)

```js
arr.every(function(item, index, arr) {
  // 检测数组所有元素是否都符合指定条件（通过函数提供）
  // 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
  // 如果所有元素都满足条件，则返回 true。
})
arr.filter(function(item, index, arr) {
  return item > 100
  // 返回满足条件的元素组成的数组
})
arr.forEach(function(item, index, arr){
  // 侨接模式 这里的this会指向window
})
var arr1 = arr.map(function(item, index, arr){
  // 这里的this会指向window
  // 可以使用return forEach不行
  // map可以返回一个新数组 原数组的长度与新数组长度相同
  return item+'1'
})
var bool = arr.some(function(item, index, arr) {
  // 判断数组中是否有满足条件的，如有返回true，并且不再继续判断
})
var sum = array.reduce(function(value, currentValue, currentIndex, arr) {
  // reduce() 方法用于归并
  /* @value 必需。初始值, 或者计算结束后的返回值 未指定初始值时为数组第0项
   * @currentValue 必需。当前元素
   * @currentIndex 可选。当前元素的索引
  */
}, initialValue)
var newArray = arr.flat([depth])
// 会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
// 会移除数组中的空项
// 使用 Infinity 作为深度，展开任意深度的嵌套数组
// 支持性很差 处于草案阶段 chrome69+
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
  // 递归获取arr里的元素，并返回，递归深度只有一层
}[, thisArg])
```

#### 7.join方法

```js
var str = arr.join("连接符")//将数组的所有元素连接到一个字符串中。
```

#### 8.转换类数组为数组

```js
var arr=Array.from(arguments); // ES6
var arr=Array.prototype.slice.call(arguments); // 转换为数组
var arr=Array.prototype.concat.apply([],arguments);// 转换为数组
```

### 3.数组去重

#### 1. 双层for循环

> 对象和NaN不去重

```js
function unique(arr) {
  let newArr = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    let repeat = false;
    for (let j = 0; j < newArr.length; j++) {
      if (arr[i] === newArr[j]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(unique([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]));
// 结果是[1, 2, 3, 5, 6, 7, 4]
```

#### 2. 优化的键值对方法

> 全部去重

```js
var array = [{value: 1}, {value: 1}, {value: 2}];
function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        console.log(typeof item + JSON.stringify(item))
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}
console.log(unique(array)); // [{value: 1}, {value: 2}]
```

#### 3. ES6 Set方法

> 对象不去重 NaN 去重

```js
var unique = (arr) => [...new Set(arr)]
```

#### 4. indexOf去重

> 对象和 NaN 不去重

```js
var array = ['a','b','a'];
function unique(arr) {
  var arr1 = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr1.indexOf(arr[i]) === -1) {
      arr1.push(arr[i])
    }
  }
  return arr1;
}
console.log(unique(array));
```

### 4.数组排序

#### 1.冒泡排序

1、比较相邻的两个元素，如果前一个比后一个大，则交换位置。
2、比较完第一轮的时候，最后一个元素是最大的元素。
3、这时候最后一个元素是最大的，所以最后一个元素就不需要参与比较大小。

```js
function bSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len-1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      // 相邻元素两两对比，元素交换，大的元素交换到后面
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr;
}
//举个数组
myArr = [20,18,27,19,35];
//使用函数
bSort(myArr)
```

#### 2.选择排序

1. 算法简介

    选择排序是一个简单直观的排序方法，它的工作原理很简单，首先从未排序序列中找到最大的元素，放到已排序序列的末尾，重复上述步骤，直到所有元素排序完毕。

2. 算法描述

    1）假设未排序序列的第一个是最大值，记下该元素的位置，从前往后比较

    2）若某个元素比该元素大，覆盖之前的位置

    3）重复第二个步骤，直到找到未排序的末尾

    4）将未排序元素的第一个元素和最大元素交换位置

    5）重复前面几个步骤，直到所有元素都已经排序。

3. 算法分析

    选择排序的交换操作次数最好情况已经有序为0次，最坏情况逆序n-1次，因此交换操作次数位于0~(n-1)次之间；比较操作次数（n-1+…+2+1+0）为n(n-1)/2次；交换元素赋值操作为3次，逆序需要n-1趟交换，因此，赋值操作位于0~3(n-1)次之间。由于需要交换位置，所以肯定是不稳定的。

时间复杂度均为o(n^2)    空间复杂度为o(1)  不稳定

```js
function selectSort(arr){
  var len = arr.length;
  var index;
  for(var i = 0; i < len - 1; i++) {
    index = i;
    for(var j=i+1; j < len; j++) {
      if(arr[index] > arr[j]) {//寻找最小值
        index=j;//保存最小值的索引
      }
    }
    if(index != i) {
      [arr[i], arr[index]] = [arr[index], arr[i]]
    }
  }
  return arr;
}
```

#### 3.快速排序

1、找基准（一般是以中间项为基准）

2、遍历数组，小于基准的放在left，大于基准的放在right

3、递归

```js
function quickSort(arr){
  //如果数组<=1,则直接返回
  if(arr.length <= 1){return arr;}
  var pivotIndex = Math.floor(arr.length/2);
  //找基准，并把基准从原数组删除
  var pivot = arr.splice(pivotIndex, 1)[0];
  //定义左右数组
  var left = [];
  var right = [];
  //比基准小的放在left，比基准大的放在right
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  //递归
  return quickSort(left).concat([pivot],quickSort(right));
}
```

## String

### 1.字符方法

```js
str.charAt(0)    //获取指定位置处字符
str.charCodeAt(0)  //获取指定位置处字符的ASCII码
var str = String.fromCharCode() //把ASCII码转换成字符串
str[0]   //HTML5，IE8+支持 和charAt()等效
```

### 2.字符串操作方法

```js
str.concat() //拼接字符串，等效于+，+更常用
str.slice()  //从start位置开始，截取到end位置，end取不到
str.substring() //从start位置开始，截取到end位置，end取不到 不支持负数参数 可用 str.length-n替代
str.substr() //从start位置开始，截取length个字符
```

### 3.位置方法

```js
str.indexOf()   // 返回指定内容在元字符串中的位置
str.lastIndexOf() // 从后往前找，只找第一个匹配的
```

### 4.去除空白

```js
str.trim()  // 只能去除字符串前后的空白
```

### 5.大小写转换方法

```js
str.to(Locale)UpperCase() // 转换大写
str.to(Locale)LowerCase() // 转换小写
```

### 6.其它 参数可以为正则

```js
str.match()  //查找找到一个或多个正则表达式的匹配。
str.search()  //查找与正则表达式相匹配的值。
str.replace()  //在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串。
str.split()  //把字符串分割为字符串数组。
```

## AJAX

### 1.创建对象

```js
var xmlHttp
if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest(); // 支持IE7.0以上及其他浏览器
} else {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP") // 支持IE5 IE6
}
```

### 2.请求

- xmlHttp.open(method,url,async);
  规定请求的类型、URL 以及是否异步处理请求。
  method：请求的类型；GET 或 POST
  url：文件在服务器上的位置
  async：true（异步）或 false（同步）

- xmlHttp.send(string);
  将请求发送到服务器。
  string：仅用于 POST 请求

- xmlHttp.setRequestHeader(header,value)
  向请求添加 HTTP 头。
  header: 规定头的名称
  value: 规定头的值

```js
xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
        document.getElementById("myDiv").innerHTML = xmlHttp.responseText;
    }
}
xmlHttp.open("GET", "/try/ajax/ajax_info.txt", true);
xmlHttp.send();
```

### 3.响应

responseText 属性
  获得字符串形式的响应数据。
responseXML 属性
  获得 XML 形式的响应数据。

### 4.对ajax的封装

```js
function ajax(url,type,param,dataType,callback){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if(type == 'get'){
        url += "?" + param;
    }
    xhr.open(type,url,true);
    var data = null;
    if(type == 'post'){
        data = param;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    }
    xhr.send(data);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var data = xhr.responseText;
                if(dataType == 'json'){
                    data = JSON.parse(data);
                }
                callback(data);
            }
        }
    }
}
```

### 5.对ajax的另一种封装

```js
function ajax(obj){
    var defaults = {
        type : 'get',
        data : {},
        url : '#',
        dataType : 'text',
        async : true,
        success : function(data){console.log(data)}
    }
    for(var key in obj){
        defaults[key] = obj[key];
    }
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // 把对象形式的参数转化为字符串形式的参数
    var param = '';
    for(var attr in obj.data){
        param += attr + '=' + obj.data[attr] + '&';
    }
    if(param){
        param = param.substring(0,param.length - 1);
    }
    // 处理get请求参数并且处理中文乱码问题
    if(defaults.type == 'get'){
        defaults.url += '?' + encodeURI(param);
    }
    xhr.open(defaults.type,defaults.url,defaults.async); // 准备发送（设置发送的参数）
    // 处理post请求参数并且设置请求头信息（必须设置）
    var data = null;
    if(defaults.type == 'post'){
        data = param;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    }
    xhr.send(data); // 执行发送动作
    // 处理同步请求，不会调用回调函数
    if(!defaults.async){
        if(defaults.dataType == 'json'){
            return JSON.parse(xhr.responseText);
        }else{
            return xhr.responseText;
        }
    }
    // 指定回调函数（处理服务器响应数据）
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var data = xhr.responseText;
                if(defaults.dataType == 'json'){
                    // data = eval("("+ data +")");
                    data = JSON.parse(data);
                }
                defaults.success(data);
            }
        }
    }
}
```

## 跨域

### CORS

```js
// 后端响应头携带
'Access-Control-Allow-Origin':'*'
```

## 正则表达式

### 元字符

#### 常用元字符串

| 元字符  | 说明              |
| ---- | --------------- |
| \d   | 匹配数字            |
| \D   | 匹配任意非数字的字符      |
| \w   | 匹配字母或数字或下划线     |
| \W   | 匹配任意不是字母，数字，下划线 |
| \s   | 匹配任意的空白符        |
| \S   | 匹配任意不是空白符的字符    |
| .    | 匹配除换行符以外的任意单个字符 |
| ^    | 表示匹配行首的文本(以谁开始) |
| $    | 表示匹配行尾的文本(以谁结束) |

#### 限定符

| 限定符   | 说明       |
| ----- | -------- |
| *     | 重复零次或更多次 |
| +     | 重复一次或更多次 |
| ?     | 重复零次或一次  |
| {n}   | 重复n次     |
| {n,}  | 重复n次或更多次 |
| {n,m} | 重复n到m次   |

#### 前瞻后顾

| 方法   | 语法       | 备注 |
| ----- | -------- | ------ |
| 前瞻 | exp1(?=exp2) | 查找exp2前面的exp1 |
| 后顾 | (?<=exp2)exp1 | 查找exp2后面的exp1 |
| 负前瞻 | exp1(?!exp2) | 查找后面不是exp2的exp1 |
| 负后顾 | (?<!exp2)exp1 | 查找前面不是exp2的exp1 |

> js不支持后顾

#### 修饰符

i 不区分大小写
g 全局
m 多行匹配

#### 其它

[] 字符串用中括号括起来，表示匹配其中的任一字符，相当于或的意思

[^]  匹配除中括号以内的内容

\ 转义符

| 或者，选择两者中的一个。注意|将左右两边分为两部分，而不管左右两边有多长多乱

() 从两个直接量中选择一个，分组
   eg：gr(a|e)y匹配gray和grey

[\x21-\x7e] 匹配所有的特殊字符

[\u4e00-\u9fa5]  匹配汉字

### 贪婪与非贪婪

贪婪： 即最后有一个`*` 会尽量多的匹配
非贪婪：`.*` 需要有前后限制符 即在有重复的符号后再添加一个`?`

### JavaScript 中使用正则表达式

#### 正则提取

```javascript
// 1. 提取工资
var str = "张三：1000，李四：5000，王五：8000。";
var array = str.match(/\d+/g);
console.log(array); // ["1000", "5000", "8000"]

// 2. 提取email地址
var str = "123123@xx.com,fangfang@valuedopinions.cn 286669312@qq.com 2、emailenglish@emailenglish.englishtown.com 286669312@qq.com...";
var array = str.match(/\w+@\w+\.\w+(\.\w+)?/g);
console.log(array);

// 3. 分组提取  
// 3. 提取日期中的年部分  2015-5-10
var dateStr = '2016-1-5';
// 正则表达式中的()作为分组来使用，获取分组匹配到的结果用Regex.$1 $2 $3....来获取
var reg = /(\d{4})-\d{1,2}-\d{1,2}/;
if (reg.test(dateStr)) {
  console.log(RegExp.$1); // 2016
}

// 4. 提取邮件中的每一部分
var reg = /(\w+)@(\w+)\.(\w+)(\.\w+)?/;
var str = "123123@xx.com";
if (reg.test(str)) {
  console.log(RegExp.$1); // 123123
  console.log(RegExp.$2); // xx
  console.log(RegExp.$3); // com
}
```

#### 正则查找

```js
// exec方法检索字符串中的指定值。返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null

// exec() 方法的功能非常强大，它是一个通用的方法，而且使用起来也比 test() 方法以及支持正则表达式的 String 对象的方法更为复杂。

// 如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。除了数组元素和 length 属性之外，exec() 方法还返回两个属性。index 属性声明的是匹配文本的第一个字符的位置。input 属性则存放的是被检索的字符串 string。我们可以看得出，在调用非全局的 RegExp 对象的 exec() 方法时，返回的数组与调用方法 String.match() 返回的数组是相同的。

// 但是，当 RegExpObject 是一个全局正则表达式时，exec() 的行为就稍微复杂一些。它会在 RegExpObject 的 lastIndex 属性指定的字符处开始检索字符串 string。当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把 RegExpObject 的 lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。这就是说，您可以通过反复调用 exec() 方法来遍历字符串中的所有匹配文本。当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。

// 注意：如果在一个字符串中完成了一次模式匹配之后要开始检索新的字符串，就必须手动地把 lastIndex 属性重置为 0。

// 提示：请注意，无论 RegExpObject 是否是全局模式，exec() 都会把完整的细节添加到它返回的数组中。这就是 exec() 与 String.match() 的不同之处，后者在全局模式下返回的信息要少得多。因此我们可以这么说，在循环中反复地调用 exec() 方法是唯一一种获得全局模式的完整模式匹配信息的方法。

var str = "Visit W3School, W3School is a place to study web technology."
var reg = new RegExp("W3School","g")
var result
while ((result = reg.exec(str)) != null)  {
  console.log(result);
  console.log(reg.lastIndex);
}
// W3School
// 14
// W3School
// 24

var str = 'abcda'
str.search(/a/ig) // 0
// 返回搜索到的下标只能找到符合条件的第一个

var dateStr = '2015-10-10';
var reg = /^\d{4}-\d{1,2}-\d{1,2}$/
console.log(reg.test(dateStr)); // true
```

#### 正则切割

```js
var str = 'a&s-b-d&c-a-&'
str.split(/[&-]/g) // ["a", "s", "b", "d", "c", "a", "", ""]
```

#### 正则替换

```javascript
// 1. 替换所有空白
var str = "   123AD  boy   girl  adf ";
str = str.replace(/\s/g,"xx");
console.log(str);

// 2. 替换所有,|，
var str = "abc,efg,123，abc,123，a";
str = str.replace(/,|，/g, ".");
console.log(str);
```
