/**
 * @param {number} n
 * @return {number}
 */
var countVowelPermutation = function (n) {
  const mod = 1000000007;
  const dp = new Array(5).fill(0);
  const ndp = new Array(5).fill(0);
  for (let i = 0; i < 5; ++i) {
    dp[i] = 1;
  }
  for (let i = 2; i <= n; ++i) {
    /* a前面可以为e,u,i */
    ndp[0] = (dp[1] + dp[2] + dp[4]) % mod;
    /* e前面可以为a,i */
    ndp[1] = (dp[0] + dp[2]) % mod;
    /* i前面可以为e,o */
    ndp[2] = (dp[1] + dp[3]) % mod;
    /* o前面可以为i */
    ndp[3] = dp[2];
    /* u前面可以为i,o */
    ndp[4] = (dp[2] + dp[3]) % mod;
    dp.splice(0, 5, ...ndp);
  }
  let ans = 0;
  for (let i = 0; i < 5; ++i) {
    ans = (ans + dp[i]) % mod;
  }
  return ans;
};
