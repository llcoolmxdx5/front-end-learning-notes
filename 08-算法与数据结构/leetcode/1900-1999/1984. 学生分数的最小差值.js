/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  nums.sort((a, b) => a - b);
  let ans = Number.MAX_SAFE_INTEGER;
  for (let i = 0, len = nums.length; i <= len - k; i++) {
    ans = Math.min(nums[i + k - 1] - nums[i], ans);
  }
  return ans;
};

console.assert(minimumDifference([9, 4, 1, 7], 2) === 2, 1);
