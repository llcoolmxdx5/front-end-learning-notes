/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let min = prices[0];
  let res = 0;
  for (let i = 1; i < prices.length; i++) {
    res = Math.max(prices[i] - min, res);
    min = Math.min(prices[i], min);
  }
  // console.log(res);
  return res;
};

console.assert(maxProfit([7, 1, 5, 3, 6, 4]) === 5, 1);
console.assert(maxProfit([7, 6, 4, 3, 1]) === 0, 2);
