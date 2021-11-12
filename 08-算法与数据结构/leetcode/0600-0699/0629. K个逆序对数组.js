/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kInversePairs = function (n, k) {
  const MOD = 1000000007;
  const dp = [[], [1]];
  for (let i = 2; i <= n; i++) {
    dp[i] = [];
    const maxJ = Math.min(k, (i * (i - 1)) / 2);
    for (let j = 0; j <= maxJ; j++) {
      let sum = 0;
      for (let m = Math.max(0, j - i + 1); m <= j; m++) {
        sum += dp[i - 1][m] ?? 0;
        sum %= MOD;
      }
      dp[i][j] = sum;
    }
  }
  // console.log(dp);
  return dp[n][k];
};

var kInversePairs = function (n, k) {
  // dp[i][j] = dp[i-1][j] + dp[i-1][j-1] + ... + dp[i-1][j-(i-1)]
  // dp[i][j-1] = dp[i-1][j-1] + ... + dp[i-1][j-1-(i-1-1)] + dp[i-1][j-1-(i-1)]
  // 相减 dp[i][j] = dp[i][j-1] + dp[i-1][j] - dp[i-1][j-i]。
  const MOD = 1000000007;
  const dp = [[], [1]];
  for (let i = 2; i <= n; i++) {
    dp[i] = [];
    const maxJ = Math.min(k, (i * (i - 1)) / 2);
    for (let j = 0; j <= maxJ; j++) {
      dp[i][j] =
        ((dp[i][j - 1] ?? 0) + (dp[i - 1][j] ?? 0) - (dp[i - 1][j - i] ?? 0)) %
        MOD;
    }
  }
  // console.log(dp);
  return dp[n][k];
};

var kInversePairs = function (n, k) {
  // dp[i][j] = dp[i-1][j] + dp[i-1][j-1] + ... + dp[i-1][j-(i-1)]
  // dp[i][j-1] = dp[i-1][j-1] + ... + dp[i-1][j-1-(i-1-1)] + dp[i-1][j-1-(i-1)]
  // 相减 dp[i][j] = dp[i][j-1] + dp[i-1][j] - dp[i-1][j-i]。

  // 可以看到公式 dp[i][j] = dp[i][j-1] + dp[i-1][j] - dp[i-1][j-i] 只与 i-1 项有关，
  // 所以，我们可以使用一个二维数组来交替使用降低空间复杂度。
  const MOD = 1000000007;
  const dp = new Array(2).fill(0).map(() => new Array(k + 1).fill(0));
  dp[1][0] = 1;
  for (let i = 2; i <= n; i++) {
    const maxJ = Math.min(k, (i * (i - 1)) / 2);
    for (let j = 0; j <= maxJ; j++) {
      dp[i & 1][j] =
        ((j >= 1 ? dp[i & 1][j - 1] : 0) +
          dp[(i - 1) & 1][j] -
          (j >= i ? dp[(i - 1) & 1][j - i] : 0) +
          MOD) %
        MOD;
    }
  }
  return dp[n & 1][k] ?? 0;
};

console.assert(kInversePairs(3, 0) === 1, 1);
console.assert(kInversePairs(3, 1) === 2, 2);
console.assert(kInversePairs(1, 1) === 0, 3);
console.assert(kInversePairs(1000, 1000) === 663677020, 4);
