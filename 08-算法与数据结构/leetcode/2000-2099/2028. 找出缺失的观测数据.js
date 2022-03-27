/**
 * @param {number[]} rolls
 * @param {number} mean
 * @param {number} n
 * @return {number[]}
 */
var missingRolls = function (rolls, mean, n) {
  const m = rolls.length;
  const total = rolls.reduce((prev, cur) => prev + cur);
  const willTotal = (m + n) * mean;
  const avg = (willTotal - total) / n;
  // console.log(avg, willTotal, total);
  if (avg > 6 || avg < 1) {
    return [];
  }
  if (parseInt(avg) === avg) {
    return new Array(n).fill(avg);
  }
  const res = new Array(n).fill(parseInt(avg));
  let diff = willTotal - total - parseInt(avg) * n;
  for (let i = 0; i < diff; i++) {
    res[i] += 1;
    diff -= 1;
  }
  return res;
};

console.log(missingRolls([3, 2, 4, 3], 4, 2)); // [6, 6]
console.log(missingRolls([1, 5, 6], 3, 4)); // [2, 3, 2, 2]
console.log(missingRolls([1, 2, 3, 4], 6, 4)); // []
console.log(missingRolls([1], 3, 1)); // [5]
