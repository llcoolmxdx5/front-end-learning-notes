/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  // const dp = [1, 1];
  // for (let i = 2; i <= n; i++) {
  //   let sum = 0;
  //   for (let j = 1; j <= i; j++) {
  //     sum += dp[j - 1] * dp[i - j];
  //   }
  //   dp.push(sum);
  // }
  // console.log(dp);
  const dp = [
    1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796, 58786, 208012, 742900, 2674440, 9694845,
    35357670, 129644790, 477638700, 1767263190,
  ];
  return dp[n];
};

console.assert(numTrees(3) === 5, 1);
console.assert(numTrees(1) === 1, 2);
