/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeBitwiseAnd = function (left, right) {
  while (left < right) {
    right = right & (right - 1);
  }
  return right;
};

console.assert(rangeBitwiseAnd(1, 2147483647) === 0, 1);
console.assert(rangeBitwiseAnd(0, 0) === 0, 2);
console.assert(rangeBitwiseAnd(5, 7) === 4, 3);
