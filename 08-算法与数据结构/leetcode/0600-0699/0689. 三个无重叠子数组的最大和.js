/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSumOfThreeSubarrays = function (nums, k) {
  const n = nums.length;
  // 前缀和
  const sum = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    sum[i] = sum[i - 1] + nums[i - 1];
  }
  // dp[i][j] 在有 i 个数，子数组个数为 j 个时，最大和为dp[i][j] 完全背包
  const dp = Array.from({ length: n + 1 }, () => new Array(4).fill(0));
  for (let i = k; i <= n; i++) {
    for (let j = 1; j < 4; j++) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - k][j - 1] + sum[i] - sum[i - k]);
    }
  }
  console.log(dp);
  // 最大和为 dp[n][3]
  const ans = new Array(3).fill(0);
  for (let j = 3, i = n, idx = 2; j > 0; ) {
    if (dp[i][j] == dp[i - 1][j]) {
      i--;
    } else {
      ans[idx--] = i - k;
      i -= k;
      j--;
    }
  }
  return ans;
};

console.assert(maxSumOfThreeSubarrays([1, 2, 1, 2, 6, 7, 5, 1], 2).join() === [0, 3, 5].join(), 1);

console.assert(
  maxSumOfThreeSubarrays([1, 2, 1, 2, 1, 2, 1, 2, 1], 2).join() === [0, 2, 4].join(),
  2
);
