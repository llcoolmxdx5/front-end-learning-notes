/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  return n > 0 && !(n & (n - 1));
};

var isPowerOfTwo = function(n) {
  return n > 0 && (n & -n) === n;
};

var isPowerOfTwo = function(n) {
  const BIG = 1 << 30;
  return n > 0 && BIG % n === 0;
};

var isPowerOfTwo = function(n) {
  return n > 0 && n.toString(2).slice(1).indexOf('1') === -1
};
