// arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
// callback
//   为数组中每个元素执行的函数，该函数接收一至三个参数：
//   currentValue
//     数组中正在处理的当前元素。
//   index 可选
//     数组中正在处理的当前元素的索引。
//   array 可选
//     forEach() 方法正在操作的数组。
// thisArg 可选
//   可选参数。当执行回调函数 callback 时，用作 this 的值。
// 返回值
//   undefined。

// 1. forEach 不会直接改变调用它的对象，但是那个对象可能会被 callback 函数改变
// 2. 不对未初始化的值进行任何操作（稀疏数组）
// 3. 除了抛出异常以外，没有办法中止或跳出 forEach() 循环。
// 4. 如果数组在迭代时被修改了，则其他元素会被跳过。
// 5. forEach() 遍历的范围在第一次调用 callback 前就会确定。调用 forEach 后添加到数组中的项不会被 callback 访问到。
// 6. 如果省略了 thisArg 参数，或者其值为 null 或 undefined，this 则指向全局对象。

function forEach<T>(
  arr: T[],
  callbackfn: (value: T, index: number, array: T[]) => void,
  thisArg?: any,
): void {
  const self = thisArg ?? globalThis;
  let index = 0;
  const length = arr.length;
  while (index < length) {
    if (index in arr) {
      callbackfn.call(self, arr[index], index, arr);
    }
    index += 1;
  }
}

// @ts-ignore
const arr = [1, 2, , '4', undefined];
forEach(arr, (value, index, arr) => {
  console.log(value, index, arr);
});

arr.forEach((value, index, arr) => {
  console.log(value, index, arr);
});

let words = ['one', 'two', 'three', 'four'];
forEach(words, function (word) {
  console.log(word);
  if (word === 'two') {
    words.shift();
  }
});
words = ['one', 'two', 'three', 'four'];
words.forEach(function (word) {
  console.log(word);
  if (word === 'two') {
    words.shift();
  }
});
// one
// two
// four
