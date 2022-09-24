/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  // dp[i] 凑足总额为 i 的 最大乘积为 dp[i]
  const dp = new Array(n + 1).fill(0);
  for (let i = 2; i < n + 1; i++) {
    for (let j = 0, max = Math.floor(i / 2); j <= max; j++) {
      dp[i] = Math.max(j * (i - j), j * dp[i - j], dp[i]);
    }
  }
  return dp[n];
};

console.assert(integerBreak(2) === 1, 1);
console.assert(integerBreak(10) === 36, 2);
