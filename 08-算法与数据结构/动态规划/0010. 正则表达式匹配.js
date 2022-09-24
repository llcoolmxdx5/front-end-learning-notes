/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  /** dp[i][j] 为 s 的前 i 个字符与 p 的前 j 个字符匹配 */
  const n = s.length;
  const m = p.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(false));
  dp[0][0] = true;
  for (let j = 1; j < m + 1; j++) {
    if (p[j - 1] === '*') {
      // 题目保证了 * 前面一定有有效的字符
      dp[0][j] = dp[0][j - 2];
    }
  }
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      if (s[i - 1] === p[j - 1] || p[j - 1] === '.') {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === '*') {
        if (s[i - 1] === p[j - 2] || p[j - 2] === '.') {
          dp[i][j] =
            dp[i][j - 2] /** a* 是空 */ ||
            dp[i][j - 1] /** a* 是单个 a */ ||
            dp[i - 1][j] /** a* 是多个 a */;
        } else {
          /** a* 是空 */
          dp[i][j] = dp[i][j - 2];
        }
      }
    }
  }
  return dp[n][m];
};

console.assert(isMatch('aa', 'a') === false, 1);
console.assert(isMatch('aa', 'a*') === true, 2);
console.assert(isMatch('aab', 'c*a*b') === true, 3);
console.assert(isMatch('mississippi', 'mis*is*p*.') === false, 4);
console.assert(isMatch('ab', '.*') === true, 5);
