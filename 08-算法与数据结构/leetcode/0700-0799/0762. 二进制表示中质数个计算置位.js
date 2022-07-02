/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var countPrimeSetBits = function (left, right) {
  const primeSet = new Set([2, 3, 5, 7, 11, 13, 17, 19]);
  let ans = 0;
  for (let start = left; start <= right; start++) {
    const bit = start.toString(2);
    let count = 0;
    for (const str of bit) {
      if (str === '1') {
        count += 1;
      }
    }
    if (primeSet.has(count)) {
      ans += 1;
    }
  }
  return ans;
};

console.assert(countPrimeSetBits(6, 10) === 4, 1);
console.assert(countPrimeSetBits(10, 15) === 5, 1);
