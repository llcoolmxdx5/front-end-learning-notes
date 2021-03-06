/**
 * @param {number} n
 * @return {number}
 */
var countNumbersWithUniqueDigits = function (n) {
  // 各位数字都不同。
  // dp[i]=dp[i-1]+(dp[i-1]-dp[i-2])*(10-(i-1));
  // 加上dp[i-1]没什么可说的，加上之前的数字

  // dp[i-1]-dp[i-2]的意思是我们上一次较上上一次多出来的各位不重复的数字。
  // 以n=3为例，n=2已经计算了0-99之间不重复的数字了，我们需要判断的是100-999之间不重复的数字，
  // 那也就只能用10-99之间的不重复的数去组成三位数，而不能使用0-9之间的不重复的数，
  // 因为他们也组成不了3位数。而10-99之间不重复的数等于dp[2]-dp[1]。

  // 当i=2时，说明之前选取的数字只有
  // 1位，那么我们只要与这一位不重复即可，所以其实有9(10-1)种情况（比如1，后面可以跟0,2,3,4,5,6,7,8,9）。
  // 当i=3时，说明之前选取的数字有2位，那么我们需要与2位不重复，所以剩余的
  // 有8（10-2）种（比如12，后面可以跟0,3,4,5,6,7,8,9）
  const dp = [1, 10];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + (dp[i - 1] - dp[i - 2]) * (10 - (i - 1));
  }
  return dp[n];
};

var countNumbersWithUniqueDigits = function (n) {
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return 10;
  }
  let res = 10,
    cur = 9;
  for (let i = 0; i < n - 1; i++) {
    cur *= 9 - i;
    res += cur;
  }
  return res;
};

console.assert(countNumbersWithUniqueDigits(2) === 91, 1);
console.assert(countNumbersWithUniqueDigits(3) === 739, 2);
console.assert(countNumbersWithUniqueDigits(7) === 712891, 3);
