/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // dp[i] 为打劫 i 家的收益
  // dp[0]=nums[0]
  // dp[1]=Math.max(nums[0], nums[1])
  // dp[i]=max(dp(i-1), dp[i-2]+nums[i])
  const { length } = nums;
  if (length === 1) return nums[0];
  let first = nums[0],
    second = Math.max(nums[0], nums[1]);
  for (let i = 2; i < length; i++) {
    [first, second] = [second, Math.max(second, first + nums[i])];
  }
  return second;
};

console.assert(rob([1, 2, 3, 1]) === 4, 1);

console.assert(rob([2, 7, 9, 3, 1]) === 12, 2);
