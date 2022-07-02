/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  const { length } = s;
  const dp = new Array(length).fill(0);
  let ans = 0;
  for (let i = 1; i < length; i++) {
    if (s[i] === '(') {
      continue;
    }
    if (s[i - 1] === '(') {
      dp[i] = (dp[i - 2] ?? 0) + 2;
    } else if (s[i - 1] === ')' && s[i - dp[i - 1] - 1] === '(') {
      dp[i] = dp[i - 1] + (dp[i - dp[i - 1] - 2] ?? 0) + 2;
    }
    ans = Math.max(dp[i], ans);
  }
  // console.log(ans);
  // console.log(dp);
  return ans;
};

var longestValidParentheses = function (s) {
  const { length } = s;
  let left = 0,
    right = 0,
    ans = 0;
  for (let i = 0; i < length; i++) {
    if (s[i] == '(') {
      left += 1;
    } else {
      right += 1;
    }
    if (left == right) {
      ans = Math.max(ans, 2 * right);
    } else if (right > left) {
      left = right = 0;
    }
  }
  left = right = 0;
  for (let i = length - 1; i >= 0; i--) {
    if (s[i] == '(') {
      left += 1;
    } else {
      right += 1;
    }
    if (left == right) {
      ans = Math.max(ans, 2 * left);
    } else if (left > right) {
      left = right = 0;
    }
  }
  return ans;
};

console.assert(longestValidParentheses(')()())') === 4, 1);
console.assert(longestValidParentheses('(()())') === 6, 2);
