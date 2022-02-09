/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countKDifference = function (nums, k) {
  const { length } = nums;
  let ans = 0;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (Math.abs(nums[i] - nums[j]) === k) {
        ans += 1;
      }
    }
  }
  return ans;
};

var countKDifference = function (nums, k) {
  let res = 0,
    n = nums.length;
  const cnt = new Map();
  for (let j = 0; j < n; ++j) {
    res += (cnt.get(nums[j] - k) || 0) + (cnt.get(nums[j] + k) || 0);
    cnt.set(nums[j], (cnt.get(nums[j]) || 0) + 1);
  }
  return res;
};

console.assert(countKDifference([1, 2, 2, 1], 1) === 4, 1);
console.assert(countKDifference([1, 3], 3) === 0, 2);
