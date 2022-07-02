/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = (coins, amount) => {
  if (!amount) {
    return 0;
  }
  const dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;
  for (let i = 0, len = coins.length; i < len; i++) {
    // 遍历物品
    for (let j = coins[i]; j <= amount; j++) {
      // 遍历背包
      dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j]);
    }
  }
  // for (let j = 0; j <= amount; j++) {
  //   for (let i = 0, len = coins.length; i < len; i++) {
  //     if (j - coins[i] >= 0) {
  //       dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j]);
  //     }
  //   }
  // }
  return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
};

console.assert(coinChange([1, 2, 5], 11) === 3, 1);
console.assert(coinChange([2], 3) === -1, 2);
console.assert(coinChange([1], 0) === 0, 3);
console.assert(coinChange([1], 1) === 1, 4);
console.assert(coinChange([1], 2) === 2, 5);
