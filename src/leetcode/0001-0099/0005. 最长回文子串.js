/**
 * @param {string} s
 * @return {string}
 */
// var longestPalindrome = function (s) {
//   if (s.length === 1) return s;
//   let res = s[0];
//   for (let index = 0; index < s.length; index++) {
//     // 回文子串长度是奇数
//     helper(index, index);
//     // 回文子串长度是偶数
//     helper(index, index + 1);
//   }
//   function helper(m, n) {
//     while (m >= 0 && n < s.length && s[m] === s[n]) {
//       m--;
//       n++;
//     }
//     // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
//     // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
//     if (n - m - 1 > res.length) {
//       // slice也要取[m+1,n-1]这个区间
//       res = s.slice(m + 1, n);
//     }
//   }
//   return res;
// };

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  // 了解dp[j][i]代表从j->i
  // dp[j+1][i-1]代表的是子字符串的首->尾
  // 然后就是创建二维数组的过程
  let len = s.length;
  let res = "";
  //创建二维数组
  let dp = Array.from(new Array(len), () => new Array(len).fill(0));
  //从字符串首部开始
  for (let i = 0; i < len; i++) {
    //从字符串i前开始依次向前查找
    for (let j = i; j >= 0; j--) {
      dp[j][i] = s[i] === s[j] && (i - j < 2 || dp[j + 1][i - 1]);
      if (dp[j][i] && i - j + 1 > res.length) {
        res = s.substring(j, i + 1);
      }
    }
  }
  console.log(dp);
  return res;
};

console.assert(["bab", "aba"].includes(longestPalindrome("babad")), 1);
console.assert(longestPalindrome("cbbd") === "bb", 2);
console.assert(longestPalindrome("a") === "a", 3);
console.assert(["a", "c"].includes(longestPalindrome("ac")), 4);
console.assert(longestPalindrome("babab") === "babab", 5);
console.assert(longestPalindrome("aacabdkacaa") === "aca", 6);
