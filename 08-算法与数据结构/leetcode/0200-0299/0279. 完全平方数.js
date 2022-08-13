/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  // 和为i的完全平方数最小个数为dp[i]
  const dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    // 遍历背包
    for (let j = 1; j * j <= i; j++) {
      // 遍历物品
      dp[i] = Math.min(dp[i - j * j] + 1, dp[i]);
    }
  }
  // console.log(dp);
  return dp[n];
};

var numSquares = function (n) {
  // 和为i的完全平方数最小个数为dp[i]
  const dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;
  for (let i = 1; i * i <= n; i++) {
    // 遍历物品
    for (let j = i * i; j <= n; j++) {
      // 遍历背包
      dp[j] = Math.min(dp[j - i * i] + 1, dp[j]);
    }
  }
  // console.log(dp);
  return dp[n];
};

console.assert(numSquares(12) === 3, 1);
console.assert(numSquares(13) === 2, 2);
