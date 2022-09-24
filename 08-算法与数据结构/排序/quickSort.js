/**
 * @function QuickSort
 * @description 快速排序是一种使用分治策略的比较排序算法
 * @param {Integer[]} items - 整数数组
 * @return {Integer[]} - 排序后的数组
 * @see [QuickSort](https://en.wikipedia.org/wiki/Quicksort)
 */
function quickSort(items) {
  const length = items.length;
  if (length <= 1) {
    return items;
  }
  const PIVOT = items[0];
  const GREATER = [];
  const LESSER = [];
  for (let i = 1; i < length; i++) {
    if (items[i] > PIVOT) {
      GREATER.push(items[i]);
    } else {
      LESSER.push(items[i]);
    }
  }
  const sorted = [...quickSort(LESSER), PIVOT, ...quickSort(GREATER)];
  return sorted;
}

export { quickSort };
