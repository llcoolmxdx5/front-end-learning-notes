/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let ret = 0;
  while (n) {
    n &= n - 1;
    ret += 1;
  }
  return ret;
};

var hammingWeight = function (n) {
  let ret = 0;
  while (n) {
    ret += n % 2;
    n = Math.floor(n / 2);
  }
  return ret;
};

console.assert(hammingWeight(0b00000000000000000000000000001011) === 3, 1);

console.assert(hammingWeight(0b00000000000000000000000010000000) === 1, 2);

console.assert(hammingWeight(0b11111111111111111111111111111101) === 31, 3);
