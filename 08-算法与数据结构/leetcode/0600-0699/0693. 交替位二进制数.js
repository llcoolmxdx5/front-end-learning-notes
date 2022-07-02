/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function (n) {
  let prev;
  while (n) {
    const cur = n % 2;
    if (prev === cur) {
      return false;
    } else {
      prev = cur;
    }
    n = Math.floor(n / 2);
  }
  return true;
};

console.assert(hasAlternatingBits(5) === true, 1);
console.assert(hasAlternatingBits(7) === false, 2);
