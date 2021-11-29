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
//   作为第一次调用 callback函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。在没有初始值的空数组上调用 reduce 将报错。

function reduce<T>(
  array: T[],
  callbackfn: (
    previousValue: T,
    currentValue: T,
    currentIndex: T,
    array: T[]
  ) => T
  // initialValue?: undefined
): T;

function reduce<T>(
  array: T[],
  callbackfn: (
    previousValue: T,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => T,
  initialValue: T
): T;

function reduce<T, U>(
  array: T[],
  callbackfn: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U,
  initialValue: U
): U;

function reduce<T, U>(
  array: T[],
  callbackfn: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U,
  initialValue?: U
) {
  let index = 0;
  let acc;
  const len = array.length;
  if (arguments.length >= 3) {
    acc = arguments[2];
  } else {
    while (index < len && !(index in array)) {
      index++;
    }
    if (index >= len) {
      throw new TypeError("Reduce of empty array " + "with no initial value");
    }
    acc = array[index++];
  }
  while (index < len) {
    if (index in array) {
      acc = callbackfn(acc, array[index], index, array);
    }
    index++;
  }
  return acc;
}
