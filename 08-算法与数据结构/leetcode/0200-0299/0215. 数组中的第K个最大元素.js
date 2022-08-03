/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const arr = nums.sort((a, b) => a - b);
  return arr[k - 1];
};
