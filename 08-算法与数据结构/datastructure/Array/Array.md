# Array

## 静态方法

- Array.from()

  从类数组对象或者可迭代对象中创建一个新的数组实例。

- Array.isArray()

  用来判断某个变量是否是一个数组对象。

- Array.of()

  根据一组参数来创建新的数组实例，支持任意的参数数量和类型。

## 修改器方法

> 这些方法会改变调用它们的对象自身的值

- Array.prototype.copyWithin()

  在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。

- Array.prototype.fill()

  将数组中指定区间的所有元素的值，都替换成某个固定的值。

- Array.prototype.pop()

  删除数组的最后一个元素，并返回这个元素。

- Array.prototype.push()

  在数组的末尾增加一个或多个元素，并返回数组的新长度。

- Array.prototype.reverse()

  颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。

- Array.prototype.shift()

  删除数组的第一个元素，并返回这个元素。

- Array.prototype.sort()

  对数组元素进行排序，并返回当前数组。

- Array.prototype.splice()

  在任意的位置给数组添加或删除任意个元素。

- Array.prototype.unshift()

  在数组的开头增加一个或多个元素，并返回数组的新长度

## 访问方法

> 下面的这些方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值。

- Array.prototype.concat()

  返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。

- Array.prototype.includes()

  判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。

- Array.prototype.join()

  连接所有数组元素组成一个字符串。

- Array.prototype.slice()

  抽取当前数组中的一段元素组合成一个新数组。

- Array.prototype.toSource()

  不要在生产环境中使用，非标准

  返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 Object.prototype.toSource() 方法。

- Array.prototype.toString()

  返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。

- Array.prototype.toLocaleString()

  返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法。

- Array.prototype.indexOf()

  返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

- Array.prototype.lastIndexOf()

  返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

## 迭代方法

- Array.prototype.forEach()

  为数组中的每个元素执行一次回调函数。

- Array.prototype.entries()

  返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。

- Array.prototype.every()

  如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。

- Array.prototype.some()

  如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

- Array.prototype.filter()

  将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。

- Array.prototype.find()

  找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。

- Array.prototype.findIndex()

  找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。

- Array.prototype.keys()

  返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。

- Array.prototype.map()

  返回一个由回调函数的返回值组成的新数组。

- Array.prototype.reduce()

  从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回
  值。
- Array.prototype.reduceRight()

  从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回
  值。

- Array.prototype.values()

  返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。

- `Array.prototype[@@iterator]()`

  `var eArr = arr[Symbol.iterator]();`

  和上面的 values() 方法是同一个函数。
