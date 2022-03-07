/*
 * 冒泡排序是一种对数组进行排序的算法。
 * 它比较相邻元素并交换它们的位置，在最坏和最好的情况下，冒泡排序中的大O是O（N^2）。效率不高。
 * 不知何故，如果数组已排序或接近排序，那么我们可以通过添加标志来优化冒泡排序。
 *
 * 在冒泡排序中，我们继续迭代，同时在上一个内部循环迭代中交换某些内容。
 * 交换的意思是，在内部循环迭代中，我们检查每个数字是否大于自身，如果是，我们交换它们。
 *
 *  Wikipedia: https://en.wikipedia.org/wiki/Bubble_sort
 *  Animated Visual: https://www.toptal.com/developers/sorting-algorithms/bubble-sort
 */

/**
 * 用 2 层 循环。
 */
export function bubbleSort(items) {
  const length = items.length;
  let noSwaps;

  for (let i = length; i > 0; i--) {
    // 优化 flag
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      // 比较相邻的位置
      if (items[j] > items[j + 1]) {
        // 交换 numbers
        [items[j], items[j + 1]] = [items[j + 1], items[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) {
      break;
    }
  }

  return items;
}

/**
 * 使用while循环和for循环.
 */
export function alternativeBubbleSort(arr) {
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  }

  return arr;
}
