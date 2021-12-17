/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function (numBottles, numExchange) {
  let ans = numBottles;
  let res = numBottles;
  while (res >= numExchange) {
    let x = Math.floor(res / numExchange);
    let y = res % numExchange;
    ans += x;
    res = x + y;
  }
  return ans;
};

var numWaterBottles = function (numBottles, numExchange) {
  return numBottles >= numExchange
    ? Math.floor((numBottles - numExchange) / (numExchange - 1)) +
        1 +
        numBottles
    : numBottles;
};

console.assert(numWaterBottles(9, 3) === 13, 1);
console.assert(numWaterBottles(15, 4) === 19, 2);
console.assert(numWaterBottles(5, 5) === 6, 3);
