/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return nums[left];
};

console.assert(findMin([3, 4, 5, 1, 2]) === 1, 1);

console.assert(findMin([4, 5, 6, 7, 0, 1, 2]) === 0, 2);

console.assert(findMin([11, 13, 15, 17]) === 11, 3);

console.assert(findMin([3, 1, 2]) === 1, 4);

console.assert(findMin([2, 1]) === 1, 5);

console.assert(findMin([3, 2, 1]) === 1, 6);

console.assert(findMin([5, 1, 2, 3, 4]) === 1, 7);
