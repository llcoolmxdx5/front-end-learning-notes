/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  let max = 0;
  /**
  dp[i][j]表示以第i行第j列为右下角所能构成的最大正方形边长, 则递推式为:
  dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);
  **/
  let dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (matrix[i - 1][j - 1] === '1') {
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
        max = Math.max(max, dp[i][j]);
      }
    }
  }

  return max * max;
};

console.assert(
  maximalSquare([
    ['1', '0', '1', '0', '0'],
    ['1', '0', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0'],
  ]) === 4,
  1,
);

console.assert(
  maximalSquare([
    ['0', '1'],
    ['1', '0'],
  ]) === 1,
  2,
);
