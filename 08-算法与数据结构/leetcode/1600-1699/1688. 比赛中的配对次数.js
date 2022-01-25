/**
 * @param {number} n
 * @return {number}
 */
var numberOfMatches = function (n) {
  let ans = 0;
  while (n > 1) {
    if (n % 2 === 0) {
      n /= 2;
      ans += n;
    } else {
      ans += (n - 1) / 2;
      n = (n - 1) / 2 + 1;
    }
  }
  return ans;
};

var numberOfMatches = function (n) {
  return n - 1;
};

console.assert(numberOfMatches(7) === 6, 1);
console.assert(numberOfMatches(14) === 13, 2);
