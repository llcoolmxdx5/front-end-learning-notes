/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
  const { length } = nums;
  let maxLen = 0;
  let ans = 0;
  const dp = [];
  const cnt = [];
  for (let i = 0; i < length; i++) {
    const element = nums[i];
    dp[i] = 1;
    cnt[i] = 1;
    for (let j = 0; j < i; j++) {
      if (element > nums[j]) {
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          cnt[i] = cnt[j];
        } else if (dp[j] + 1 === dp[i]) {
          cnt[i] += cnt[j];
        }
      }
    }
    if (dp[i] > maxLen) {
      maxLen = dp[i];
      ans = cnt[i];
    } else if (dp[i] === maxLen) {
      ans += cnt[i];
    }
  }
  return ans
};

console.assert(findNumberOfLIS([1, 3, 5, 4, 7]) === 2, 1);
console.assert(findNumberOfLIS([2, 2, 2, 2, 2]) === 5, 2);
