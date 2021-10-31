/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  if (s[0] === "0") return 0;
  const { length } = s;
  // 定义 dp[i] 为到第 i 个字符有多少种方法
  const dp = new Array(length + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= length; i++) {
    if (s[i] === "0" && s[i - 1] === "0") {
      return 0;
    }
    if (s[i - 1] !== "0") {
      dp[i] += dp[i - 1];
    }
    if (i > 1 && s[i - 2] !== "0" && +s[i - 1] + s[i - 2] * 10 <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  return dp[length];
};

var numDecodings = function (s) {
  if (s[0] === "0") return 0;
  const { length } = s;
  // 定义 dp[i] 为到第 i 个字符有多少种方法
  // a = dp[i-2], b = dp[i-1], c = dp[i]
  let a = 0,
    b = 1,
    c = 0;
  for (let i = 1; i <= length; i++) {
    if (s[i] === "0" && s[i - 1] === "0") {
      return 0;
    }
    c = 0;
    if (s[i - 1] !== "0") {
      c += b;
    }
    if (i > 1 && s[i - 2] !== "0" && +s[i - 1] + s[i - 2] * 10 <= 26) {
      c += a;
    }
    a = b;
    b = c;
  }
  return c
};

console.assert(numDecodings("06") === 0, 1);
console.assert(numDecodings("1200") === 0, 2);
console.assert(numDecodings("226") === 3, 3);
console.assert(numDecodings("12") === 2, 4);
