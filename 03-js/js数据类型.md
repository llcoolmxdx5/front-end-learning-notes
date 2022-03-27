# js 数据类型

## 1.数据类型的转换

### 0.数据类型分类

分为基本数据类型和引用数据类型。其中基本数据类型包括 undefined、null、Boolean、Number、String、Symbol (ES6 新增，表示独一无二的值)，而引用数据类型统称为 Object 对象，主要包括对象、数组和函数

### 1. 转为 str

```js
num.toString(); // 不能转换undefined 和 null
String();
字符串与其他数据类型直接拼接;
```

### 2. 转为 num

```js
Number(); // 要转换的有一个不是数字,返回NaN true->1
parseInt(); // 解析到非数字结束,第一个为非数字则返回NaN true -> NaN
parseFloat(); // 解析到非数字结束,第一个为非数字则返回NaN
// 会解析第一个. 遇到第二个.或者非数字结束如果解析的内容里只有整数，解析成整数
a.toFixed(2); // 保留2位小数
```

### 3. 转换成布尔类型

在条件判断时，`Boolean()` 0 ''(空字符串) null undefined NaN false 会转换成 false 其它都会转换成 true

### 4. 对象转原始类型

对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下：

- 如果已经是原始类型了，那就不需要转换了
- 调用 x.valueOf()，如果转换为基础类型，就返回转换的值
- 调用 x.toString()，如果转换为基础类型，就返回转换的值
- 如果都没有返回原始类型，就会报错

当然你也可以重写 `Symbol.toPrimitive` ，该方法在转原始类型时调用优先级最高。

```js
let a = {
  valueOf() {
    return 0;
  },
  toString() {
    return "1";
  },
  [Symbol.toPrimitive]() {
    return 2;
  },
};
1 + a; // => 3
```

### 5. 四则运算符

加法运算符不同于其他几个运算符，它有以下几个特点：

- 运算中其中一方为字符串，那么就会把另一方也转换为字符串
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

```js
1 + "1"; // '11'
true + true; // 2
4 + [1, 2, 3]; // "41,2,3"
```

如果你对于答案有疑问的话，请看解析：

对于第一行代码来说，触发特点一，所以将数字 1 转换为字符串，得到结果 '11'
对于第二行代码来说，触发特点二，所以将 true 转为数字 1
对于第三行代码来说，触发特点二，所以将数组通过 toString 转为字符串 1,2,3，得到结果 41,2,3
另外对于加法还需要注意这个表达式 'a' + + 'b'

```js
"a" + +"b"; // -> "aNaN"
```

因为 + 'b' 等于 NaN，所以结果为 "aNaN"，你可能也会在一些代码中看到过 + '1' 的形式来快速获取 number 类型。

那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字

```js
4 * "3"; // 12
4 * []; // 0
4 * [1, 2]; // NaN
```

### 6. 比较运算符

- 如果是对象，就通过 toPrimitive 转换对象
- 如果是字符串，就通过 unicode 字符索引来比较

```js
let a = {
  valueOf() {
    return 0;
  },
  toString() {
    return "1";
  },
};
a > -1; // true
```

在以上代码中，因为 a 是对象，所以会通过 valueOf 转换为原始类型再比较值。

## 2.类型判断

### 1. typeof

typeof 返回一个表示数据类型的字符串，返回结果包括：number、boolean、string、symbol、bigint、object、undefined、function 8 种数据类型，但不能判断 null、array 等

```js
typeof Symbol(); // symbol 有效
typeof ""; // string 有效
typeof 1; // number 有效
typeof 1n; // bigint 有效
typeof true; // boolean 有效
typeof undefined; //undefined 有效
typeof new Function(); // function 有效
typeof null; // object 无效
typeof []; // object 无效
typeof new Date(); // object 无效
typeof new RegExp(); //object 无效
```

### 2. instanceof

instanceof 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true,否则返回 false。instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性，但它不能检测 null 和 undefined

```js
[] instanceof Array; //true
{} instanceof Object; //报错
new Date() instanceof Date; //true
new RegExp() instanceof RegExp; //true
null instanceof null; //报错
undefined instanceof undefined; //报错
```

### 3. constructor

constructor 作用和 instanceof 非常相似。但 constructor 检测 Object 与 instanceof 不一样，还可以处理基本数据类型的检测。不过函数的 constructor 是不稳定的，这个主要体现在把类的原型进行重写，在重写的过程中很有可能出现把之前的 constructor 给覆盖了，这样检测出来的结果就是不准确的。

### 4. Object.prototype.toString.call()

Object.prototype.toString.call() 是最准确最常用的方式 返回一个字符串, 不能检测 NaN

```js
Object.prototype.toString.call("").slice(7, -1); // String
Object.prototype.toString.call(1).slice(7, -1); // Number
Object.prototype.toString.call(NaN).slice(7, -1); // Number
Object.prototype.toString.call(1n).slice(7, -1); // BigInt
Object.prototype.toString.call(true).slice(7, -1); // Boolean
Object.prototype.toString.call(undefined).slice(7, -1); // Undefined
Object.prototype.toString.call(null).slice(7, -1); // Null
Object.prototype.toString.call(new Function()).slice(7, -1); // Function
Object.prototype.toString.call(new Date()).slice(7, -1); // Date
Object.prototype.toString.call([]).slice(7, -1); // Array
Object.prototype.toString.call(new RegExp()).slice(7, -1); // RegExp
Object.prototype.toString.call(new Error()).slice(7, -1); // Error
```

### 5.NaN 的判断

没有任何内容与 NaN 相同，包括他自己 NaN==NaN

```js
var a = NaN;
isNaN(a);
```

### 6.null=undefined
