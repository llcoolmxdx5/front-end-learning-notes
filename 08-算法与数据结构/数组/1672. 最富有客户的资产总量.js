/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function (accounts) {
  let sum = 0;
  for (let i = 0; i < accounts.length; i++) {
    let temp = 0;
    for (let j = 0; j < accounts[0].length; j++) {
      temp += accounts[i][j];
    }
    sum = Math.max(sum, temp);
  }
  return sum;
};

console.assert(
  maximumWealth([
    [1, 2, 3],
    [3, 2, 1],
  ]) === 6,
  1,
);
