# lodash

## Array

### _.flatten(array)

减少一级array嵌套深度。

参数

- array (Array): 需要减少嵌套层级的数组。

返回值

- (Array): 返回减少嵌套层级后的新数组。

```js
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
```

### _.flattenDeep(array)

将array递归为一维数组。

参数

- array (Array): 需要处理的数组。

返回值

- (Array): 返回一个的新一维数组。

```js
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]
```

### _.flattenDepth(array, [depth=1])

根据 depth 递归减少 array 的嵌套层级

参数

- array (Array): 需要减少嵌套层级的数组。
- [depth=1] (number):最多减少的嵌套层级数。

返回值

- (Array): 返回减少嵌套层级后的新数组。

```js
var array = [1, [2, [3, [4]], 5]];
_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]
_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
```

### _.fromPairs(pairs)

与 _.toPairs正好相反；这个方法返回一个由键值对pairs构成的对象。

参数

- pairs (Array): 键值对pairs。

返回值

- (Object): 返回一个新对象。

```js
_.fromPairs([['fred', 30], ['barney', 40]]);
// => { 'fred': 30, 'barney': 40 }
```

### _.intersection([arrays])

创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用 SameValueZero进行相等性比较。（可以理解为给定数组的交集）

参数

- [arrays] (...Array): 待检查的数组。

返回值

- (Array): 返回一个包含所有传入数组交集元素的新数组。

```js
_.intersection([2, 1], [4, 2], [1, 2]);
// => [2]
```

### _.unzip(array)

这个方法类似于 _.zip，除了它接收分组元素的数组，并且创建一个数组，分组元素到打包前的结构。（返回数组的第一个元素包含所有的输入数组的第一元素，第一个元素包含了所有的输入数组的第二元素，依此类推。）

参数
array (Array): 要处理的分组元素数组。
返回
(Array): 返回重组元素的新数组。

```js
var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]
_.unzip(zipped);
// => [['fred', 'barney'], [30, 40], [true, false]]
```

### _.xor([arrays])

创建一个给定数组唯一值的数组，使用 symmetric difference做等值比较。返回值的顺序取决于他们数组的出现顺序。

参数
[arrays] (...Array): 要检查的数组。
返回
(Array): 返回过滤值后的新数组。

```js
_.xor([2, 1], [2, 3]);
// => [1, 3]
```

### _.zip([arrays])

创建一个分组元素的数组，数组的第一个元素包含所有给定数组的第一个元素，数组的第二个元素包含所有给定数组的第二个元素，以此类推。

参数
[arrays] (...Array): 要处理的数组。
返回
(Array): 返回分组元素的新数组。

```js
_.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]
```

### _.zipObject([props=[]], [values=[]])

这个方法类似 _.fromPairs，除了它接受2个数组，第一个数组中的值作为属性标识符（属性名），第二个数组中的值作为相应的属性值。

参数
[props=[]] (Array): The property identifiers.
[values=[]] (Array): The property values.
返回
(Object): Returns the new object.

```js
_.zipObject(['a', 'b'], [1, 2]);
// => { 'a': 1, 'b': 2 }
```

### _.zipObjectDeep([props=[]], [values=[]])

这个方法类似 _.zipObject，除了它支持属性路径。

参数
[props=[]] (Array): 属性标识符（属性名）。
[values=[]] (Array): 属性值。
返回
(Object): 返回新对象。

```js
_.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
// => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
```

## “集合” 方法(“Collection” Methods)

### `_.every(collection, [predicate=_.identity])`

通过 predicate（断言函数） 检查 collection（集合）中的 所有 元素是否都返回真值。一旦 predicate（断言函数） 返回假值，迭代就马上停止。predicate（断言函数）调用三个参数： (value, index|key, collection)。

注意: 这个方法对于对于 空集合返回 true，因为空集合的 任何元素都是 true 。

参数

- collection (Array|Object): 一个用来迭代的集合。
- [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回

- (boolean): 如果所有元素经 predicate（断言函数） 检查后都都返回真值，那么就返回true，否则返回 false 。

```js
_.every([true, 1, null, 'yes'], Boolean);
// => false
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': false }
];
// The `_.matches` iteratee shorthand.
_.every(users, { 'user': 'barney', 'active': false });
// => false
// The `_.matchesProperty` iteratee shorthand.
_.every(users, ['active', false]);
// => true
// The `_.property` iteratee shorthand.
_.every(users, 'active');
// => false
```

### `_.filter(collection, [predicate=_.identity])`

遍历 collection（集合）元素，返回 predicate（断言函数）返回真值 的所有元素的数组。 predicate（断言函数）调用三个参数：(value, index|key, collection)。

Note: Unlike _.remove, this method returns a new array.

参数

- collection (Array|Object): 一个用来迭代的集合。
- [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回

- (Array): 返回一个新的过滤后的数组。

```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']
// The `_.matches` iteratee shorthand.
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']
// The `_.matchesProperty` iteratee shorthand.
_.filter(users, ['active', false]);
// => objects for ['fred']
// The `_.property` iteratee shorthand.
_.filter(users, 'active');
// => objects for ['barney']
```

### `_.find(collection, [predicate=_.identity], [fromIndex=0])`

遍历 collection（集合）元素，返回 predicate（断言函数）第一个返回真值的第一个元素。predicate（断言函数）调用3个参数： (value, index|key, collection)。

参数

- collection (Array|Object): 一个用来迭代的集合。
- [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
- [fromIndex=0] (number): 开始搜索的索引位置。

返回

- (*): 返回匹配元素，否则返回 undefined。

```js
var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];
_.find(users, function(o) { return o.age < 40; });
// => object for 'barney'
// The `_.matches` iteratee shorthand.
_.find(users, { 'age': 1, 'active': true });
// => object for 'pebbles'
// The `_.matchesProperty` iteratee shorthand.
_.find(users, ['active', false]);
// => object for 'fred'
// The `_.property` iteratee shorthand.
_.find(users, 'active');
// => object for 'barney'
```

### `_.groupBy(collection, [iteratee=_.identity])`

创建一个对象，key 是 iteratee 遍历 collection(集合) 中的每个元素返回的结果。 分组值的顺序是由他们出现在 collection(集合) 中的顺序确定的。每个键对应的值负责生成 key 的元素组成的数组。iteratee 调用 1 个参数： (value)。

参数

- collection (Array|Object): 一个用来迭代的集合。
- [iteratee=_.identity] (Array|Function|Object|string): 这个迭代函数用来转换key。
返回

- (Object): 返回一个组成聚合的对象。

```js
_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }
// The `_.property` iteratee shorthand.
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```

### `_.keyBy(collection, [iteratee=_.identity])`

创建一个对象组成， key（键） 是 collection（集合）中的每个元素经过 iteratee（迭代函数） 处理后返回的结果。 每个 key（键）对应的值是生成key（键）的最后一个元素。iteratee（迭代函数）调用1个参数：(value)。

参数

- collection (Array|Object): 用来迭代的集合。
- [iteratee=_.identity] (Array|Function|Object|string): 这个迭代函数用来转换key。

返回

- (Object): 返回一个组成聚合的对象。

```js
var array = [
  { 'dir': 'left', 'code': 97 },
  { 'dir': 'right', 'code': 100 }
];
_.keyBy(array, function(o) {
  return String.fromCharCode(o.code);
});
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
_.keyBy(array, 'dir');
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
```

### `_.sample(collection)`

从collection（集合）中获得一个随机元素。

参数

- collection (Array|Object): 要取样的集合。

返回

- (*): 返回随机元素。

```js
_.sample([1, 2, 3, 4]);
// => 2
```

### `_.sampleSize(collection, [n=1])`

从collection（集合）中获得 n 个随机元素。

参数
collection (Array|Object): 要取样的集合。
[n=1] (number): 取样的元素个数。
返回
(Array): 返回随机元素。

```js
_.sampleSize([1, 2, 3], 2);
// => [3, 1]
_.sampleSize([1, 2, 3], 4);
// => [2, 3, 1]
```

### `_.shuffle(collection)`

创建一个被打乱值的集合。 使用 Fisher-Yates shuffle 版本。

参数

- collection (Array|Object): 要打乱的集合。

返回

- (Array): 返回打乱的新数组。

```js
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```

## “Function” Methods（“函数”方法）

### `_.debounce(func, [wait=0], [options={}])`

创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。 debounced（防抖动）函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options（选项） 对象决定如何调用 func 方法，options.leading 与|或 options.trailing 决定延迟前后如何触发（是 先调用后等待 还是 先等待后调用）。 func 调用时会传入最后一次提供给 debounced（防抖动）函数 的参数。 后续调用的 debounced（防抖动）函数返回是最后一次 func 调用的结果。

注意: 如果 leading 和 trailing 选项为 true, 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用防抖方法。

如果 wait 为 0 并且 leading 为 false, func调用将被推迟到下一个点，类似setTimeout为0的超时。

参数

- func (Function): 要防抖动的函数。
- [wait=0] (number): 需要延迟的毫秒数。
- [options={}] (Object): 选项对象。
- [options.leading=false] (boolean): 指定在延迟开始前调用。
- [options.maxWait] (number): 设置 func 允许被延迟的最大值。
- [options.trailing=true] (boolean): 指定在延迟结束后调用。

返回

- (Function): 返回新的 debounced（防抖动）函数。

```js
// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on('resize', _.debounce(calculateLayout, 150));
// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));
// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);
// 取消一个 trailing 的防抖动调用
jQuery(window).on('popstate', debounced.cancel);
```

### `_.once(func)`

创建一个只能调用 func 一次的函数。 重复调用返回第一次调用的结果。 func 调用时， this 绑定到创建的函数，并传入对应参数。

参数

- func (Function): 指定的触发的函数。

返回

- (Function): 返回新的受限函数。

```js
var initialize = _.once(createApplication);
initialize();
initialize();
// `initialize` 只能调用 `createApplication` 一次。
```

### `_.throttle(func, [wait=0], [options={}])`

创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。 该函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options 对象决定如何调用 func 方法， options.leading 与|或 options.trailing 决定 wait 前后如何触发。 func 会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次 func 调用的结果。

注意: 如果 leading 和 trailing 都设定为 true 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用。

如果 wait 为 0 并且 leading 为 false, func调用将被推迟到下一个点，类似setTimeout为0的超时。

参数

- func (Function): 要节流的函数。
- [wait=0] (number): 需要节流的毫秒。
- [options={}] (Object): 选项对象。
- [options.leading=true] (boolean): 指定调用在节流开始前。
- [options.trailing=true] (boolean): 指定调用在节流结束后。

返回

- (Function): 返回节流的函数。

```js
// 避免在滚动时过分的更新定位
jQuery(window).on('scroll', _.throttle(updatePosition, 100));
// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);
// 取消一个 trailing 的节流调用。
jQuery(window).on('popstate', throttled.cancel);
```

## “Lang” Methods

### `_.clone(value)`

创建一个 value 的浅拷贝。

注意: 这个方法参考自 structured clone algorithm 以及支持 arrays、array buffers、 booleans、 date objects、maps、 numbers， Object 对象, regexps, sets, strings, symbols, 以及 typed arrays。 arguments对象的可枚举属性会拷贝为普通对象。 一些不可拷贝的对象，例如error objects、functions, DOM nodes, 以及 WeakMaps 会返回空对象。

参数

- value (*): 要拷贝的值

返回

- (*): 返回拷贝后的值。

```js
var objects = [{ 'a': 1 }, { 'b': 2 }];
var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);
// => true
```

### `_.cloneDeep(value)`

这个方法类似 _.clone，除了它会递归拷贝 value。（也叫深拷贝）。

参数

- value (*): 要深拷贝的值。

返回

- (*): 返回拷贝后的值。

```js
var objects = [{ 'a': 1 }, { 'b': 2 }];
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
```

### `_.isEmpty(value)`

检查 value 是否为一个空对象，集合，映射或者set。 判断的依据是除非是有枚举属性的对象，length 大于 0 的 arguments object, array, string 或类jquery选择器。

对象如果被认为为空，那么他们没有自己的可枚举属性的对象。

类数组值，比如 arguments对象，array，buffer，string或者类jQuery集合的length 为 0，被认为是空。类似的，map（映射）和set 的size 为 0，被认为是空。

参数

- value (*): 要检查的值。

返回

- (boolean): 如果 value 为空，那么返回 true，否则返回 false。

```js
_.isEmpty(null);
// => true
_.isEmpty(true);
// => true
_.isEmpty(1);
// => true
_.isEmpty([1, 2, 3]);
// => false
_.isEmpty({ 'a': 1 });
// => false
```

### `_.isEqual(value, other)`

执行深比较来确定两者的值是否相等。

**注意:**这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexps, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 不支持函数和DOM节点比较。

参数

- value (*): 用来比较的值。
- other (*): 另一个用来比较的值。

返回

- (boolean): 如果 两个值完全相同，那么返回 true，否则返回 false。

```js
var object = { 'a': 1 };
var other = { 'a': 1 };
_.isEqual(object, other);
// => true
object === other;
// => false
```

### `_.isMatch(object, source)`

执行一个深度比较，来确定 object 是否含有和 source 完全相等的属性值。

注意: 当source为偏应用时，这种方法等价于 _.matches。（关于偏应用大家可以自己到google上搜索一下）。

偏应用比较匹配空数组和空对象 source值分别针对任何数组或对象的价值。在 _.isEqual中查看支持的值比较列表。

参数

- object (Object): 要检查的对象。
- source (Object): 属性值相匹配的对象。

返回

- (boolean): 如果object匹配，那么返回 true，否则返回 false。

```js
var object = { 'a': 1, 'b': 2 };
_.isMatch(object, { 'b': 2 });
// => true
_.isMatch(object, { 'b': 1 });
// => false
```

## “String” Methods

### `_.camelCase([string=''])`

转换字符串string为 驼峰写法。

参数
[string=''] (string): 要转换的字符串。
返回
(string): 返回驼峰写法的字符串。

```js
_.camelCase('Foo Bar');
// => 'fooBar'
_.camelCase('--foo-bar--');
// => 'fooBar'
_.camelCase('__FOO_BAR__');
// => 'fooBar'
```

### `_.snakeCase([string=''])`

转换字符串string为 snake case.

参数
[string=''] (string): 要转换的字符串。
返回
(string): 返回转换后的字符串。

```js
_.snakeCase('Foo Bar');
// => 'foo_bar'
_.snakeCase('fooBar');
// => 'foo_bar'
_.snakeCase('--FOO-BAR--');
// => 'foo_bar'
```

## “Util” Methods

### `_.matches(source)`

创建一个深比较的方法来比较给定的对象和 source 对象。 如果给定的对象拥有相同的属性值返回 true，否则返回 false。

注意: 创建的函数相当于 _.isMatch应用 source 。

部分比较匹配空数组和空对象源值，分别针对任何数组或对象的价值。见 _.isEqual支持的价值比较的列表。

参数

- source (Object): 要匹配属性值的源对象。

返回

- (Function): 返回新的函数。

```js
var objects = [
  { 'a': 1, 'b': 2, 'c': 3 },
  { 'a': 4, 'b': 5, 'c': 6 }
];
_.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
// => [{ 'a': 4, 'b': 5, 'c': 6 }]
```

### `_.range([start=0], end, [step=1])`

创建一个包含从 start 到 end，但不包含 end 本身范围数字的数组。 如果 start 是负数，而 end 或 step 没有指定，那么 step 从 -1 为开始。 如果 end 没有指定，start 设置为 0。 如果 end 小于 start ，会创建一个空数组，除非指定了 step。

注意:: JavaScript 遵循 IEEE-754 标准处理无法预料的浮点数结果。

参数

- [start=0] (number): 开始的范围。
- end (number): 结束的范围。
- [step=1] (number): 范围的增量 或者 减量。

返回

- (Array): 返回范围内数字组成的新数组。

```js
_.range(4);
// => [0, 1, 2, 3]
_.range(-4);
// => [0, -1, -2, -3]
_.range(1, 5);
// => [1, 2, 3, 4]
_.range(0, 20, 5);
// => [0, 5, 10, 15]
_.range(0, -4, -1);
// => [0, -1, -2, -3]
_.range(1, 4, 0);
// => [1, 1, 1]
_.range(0);
// => []
```
