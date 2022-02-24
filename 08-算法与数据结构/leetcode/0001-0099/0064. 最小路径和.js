/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  const MAX = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (j - 1 >= 0 || i - 1 >= 0) {
        dp[i][j] =
          Math.min(dp[i]?.[j - 1] ?? MAX, dp[i - 1]?.[j] ?? MAX) + grid[i][j];
      } else {
        dp[i][j] = grid[i][j];
      }
    }
  }
  // console.log(dp);
  return dp[m - 1][n - 1];
};

console.assert(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ]) === 7,
  1
);
