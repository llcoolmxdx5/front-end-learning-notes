/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
var knightProbability = function (n, k, row, column) {
  const dp = Array.from({ length: k + 1 }, () =>
    Array.from({ length: n }, () => new Array(n).fill(0)),
  );
  for (let step = 0; step <= k; step++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (step === 0) {
          dp[step][i][j] = 1;
        } else {
          const dirs = [
            [i - 2, j - 1],
            [i - 2, j + 1],
            [i + 2, j - 1],
            [i + 2, j + 1],
            [i - 1, j - 2],
            [i - 1, j + 2],
            [i + 1, j - 2],
            [i + 1, j + 2],
          ];
          for (const [a, b] of dirs) {
            if (a < 0 || a >= n || b < 0 || b >= n) {
              continue;
            }
            dp[step][i][j] += dp[step - 1][a][b] / 8;
          }
        }
      }
    }
  }
  console.log(dp);
  return dp[k][row][column];
};

console.assert(knightProbability(3, 2, 0, 0) === 0.0625, 1);
console.assert(knightProbability(1, 0, 0, 0) === 1, 2);
