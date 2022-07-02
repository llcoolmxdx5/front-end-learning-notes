/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length === 1) return s;
  let res = s[0];
  for (let index = 0; index < s.length; index++) {
    // 回文子串长度是奇数
    helper(index, index);
    // 回文子串长度是偶数
    helper(index, index + 1);
  }
  function helper(m, n) {
    while (m >= 0 && n < s.length && s[m] === s[n]) {
      m--;
      n++;
    }
    // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
    // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
    if (n - m - 1 > res.length) {
      // slice也要取[m+1,n-1]这个区间
      res = s.slice(m + 1, n);
    }
  }
  return res;
};

var longestPalindrome = function (s) {
  // 定义dp[i][j] 表示字符串s的第i到j个字母组成的串（下文表示成 dp[i, j]）是否为回文串
  const { length } = s;
  let res = '';
  const dp = [];
  // 倒着遍历简化操作，这么做的原因是dp[i][..]依赖于dp[i + 1][..]
  for (let i = length - 1; i >= 0; i--) {
    dp[i] = [];
    for (let j = i; j < length; j++) {
      if (i === j) {
        // 子串长度为1 dp[i][i] = true
        dp[i][j] = true;
      } else if (j - i === 1) {
        // 子串长度为2 dp[i][i+1] = s[i] === s[i+1]
        dp[i][j] = s[i] === s[j];
      } else if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1];
      }
      if (dp[i][j] && j - i + 1 > res.length) {
        res = s.slice(i, j + 1);
      }
    }
  }
  // console.log(dp);
  // console.log(res);
  return res;
};

console.assert(['bab', 'aba'].includes(longestPalindrome('babad')), 1);
console.assert(longestPalindrome('cbbd') === 'bb', 2);
console.assert(longestPalindrome('a') === 'a', 3);
console.assert(['a', 'c'].includes(longestPalindrome('ac')), 4);
console.assert(longestPalindrome('babab') === 'babab', 5);
console.assert(longestPalindrome('aacabdkacaa') === 'aca', 6);
