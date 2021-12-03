/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const n = word1.length;
  const m = word2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  dp[0] = dp[0].map((_, index) => index);
  for (let i = 0; i < n + 1; i++) {
    dp[i][0] = i;
  }
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
      }
    }
  }
  // console.log(dp);
  // console.log(dp[n][m]);
  return dp[n][m];
};

console.assert(minDistance("horse", "ros") === 3, 1);
console.assert(minDistance("intention", "execution") === 5, 2);
