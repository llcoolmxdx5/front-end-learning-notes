/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestRangeI = function (nums, k) {
  let max = nums[0];
  let min = nums[0];
  for (let i = 1; i < nums.length; i++) {
    max = Math.max(max, nums[i]);
    min = Math.min(min, nums[i]);
  }
  return Math.max(max - min - 2 * k, 0);
};

console.assert(smallestRangeI([0, 10], 2) === 6, 1);
console.assert(smallestRangeI([1, 3, 6], 3) === 0, 2);
console.assert(smallestRangeI([2, 7, 2], 1) === 3, 3);
