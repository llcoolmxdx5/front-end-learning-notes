/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (left === right) {
      return left;
    }
    if (arr[mid] < arr[mid + 1]) {
      // 上坡 峰顶在 mid 之后
      left = mid + 1;
    } else if (arr[mid] > arr[mid + 1]) {
      right = mid;
    }
  }
};

console.assert(peakIndexInMountainArray([24, 69, 100, 99, 79, 78, 67, 36, 26, 19]) === 2, 1);

console.assert(peakIndexInMountainArray([0, 1, 0]) === 1, 2);

console.assert(peakIndexInMountainArray([3, 4, 5, 1]) === 2, 3);
