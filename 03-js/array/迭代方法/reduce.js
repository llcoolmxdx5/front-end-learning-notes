// arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
// callback
//  执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：
//  accumulator
//    累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue
//  currentValue
//    数组中正在处理的元素。
//  index 可选
//    数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。
//  array可选
//    调用reduce()的数组
// initialValue可选
//  作为第一次调用 callback函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。在没有初始值的空数组上调用 reduce 将报错。

Array.prototype._reduce = function (cb, initialValue) {
  let array = this
  let acc = initialValue || array[0]
  let startIndex = initialValue ? 0 : 1
  for (let i = startIndex; i < array.length; i++) {
    let cur = array[i]
    acc = cb(acc, cur, i, array)
  }
  return acc
}
// let arr = [1, 2, 3, 4, 5];
// let sum = arr._reduce((prev, cur, index, arr) => {
//   console.log(prev, cur, index, arr);
//   return prev * cur;
// }, 100);
// console.log(sum); // 12000

// 二维数组降为一维
let flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  (acc, cur) => acc.concat(cur), []
); // [0, 1, 2, 3, 4, 5]

// 数组去重
// let orderedArray = Array.from(new Set(myArray)); 
let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
let result = arr.sort().reduce((init, current) => {
  if (init.length === 0 || init[init.length - 1] !== current) {
    init.push(current);
  }
  return init;
}, []);
console.log(result); //[1, 2, 3, 4, 5]