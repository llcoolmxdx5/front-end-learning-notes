/**
 * @param {number[]} arr
 * @param {number} difference
 * @return {number}
 */
var longestSubsequence = function (arr, difference) {
  // `dp(i)` 就表示以第 `i` 个字符串结尾的最长定差子序列
  // dp[v] = dp[v-d] + 1
  const dp = new Map();
  let resp = 0;
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    const v = arr[i];
    dp.set(v, (dp.get(v - difference) ?? 0) + 1);
    resp = Math.max(dp.get(v), resp);
  }
  return resp;
};

console.assert(longestSubsequence([1, 2, 3, 4], 1) === 4, 1);
console.assert(longestSubsequence([1, 3, 5, 7], 1) === 1, 2);
console.assert(longestSubsequence([1, 5, 7, 8, 5, 3, 4, 2, 1], -2) === 4, 3);
