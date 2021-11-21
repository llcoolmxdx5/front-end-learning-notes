import isIterable from "../utils/isIterable";

// Array.from() 可以通过以下方式来创建数组对象：
// - 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
// - 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）
// Array.from() 方法有一个可选参数 mapFn，让你可以在最后生成的数组上再执行一次 map 方法后再返回。
// 也就是说 Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg),除非创建的不是可用的中间数组。
// 这对一些数组的子类,如 typed arrays 来说很重要, 因为中间数组的值在调用 map() 时需要是适当的类型。

function arrayFrom<T, U>(
  iterable: Iterable<T> | ArrayLike<T>,
  mapFn?: undefined,
  thisArg?: any
): T[];
function arrayFrom<T, U>(
  iterable: Iterable<T> | ArrayLike<T>,
  mapFn: (v: T, k: number) => U,
  thisArg?: any
): U[];

function arrayFrom<T, U>(
  iterable: Iterable<T> | ArrayLike<T>,
  mapFn?: (v: T, k: number) => U,
  thisArg?: any
) {
  const toStr = Object.prototype.toString;
  // 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
  const isArrayLike =
    toStr.call(iterable) === "[object Object]" &&
    // @ts-ignore
    (iterable as object)?.length !== undefined;
  const arr: T[] = [];
  if (isArrayLike) {
    arr.push(...[].slice.call(iterable));
  } else if (isIterable(iterable)) {
    arr.push(...(iterable as Iterable<T>));
  }
  if (toStr.call(mapFn) === "[object Function]") {
    return arr.map(mapFn!, (thisArg = undefined));
  }
  return arr;
}

export default arrayFrom;
