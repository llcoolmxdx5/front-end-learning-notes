/**
 * @param {number} a
 * @param {number[]} b
 * @return {number}
 */
var superPow = function (a, b) {
  let ans = 1n;
  const len = b.length;
  for (let i = len - 1; i >= 0; --i) {
    ans *= BigInt(a) ** BigInt(b[i]) % 1337n;
    a = BigInt(a) ** 10n;
  }
  return +ans.toString();
};

var superPow = function (a, b) {
  a = BigInt(a % 1337)
  let ans = 1n;
  const len = b.length;
  for (let i = 0; i < len; i++) {
    ans = (BigInt(ans) ** 10n * a ** BigInt(b[i])) % 1337n;
  }
  return +ans.toString();
};

console.assert(superPow(2, [3]) === 8, 1);
console.assert(superPow(2, [1, 0]) === 1024, 2);
console.assert(superPow(1, [4, 3, 3, 8, 5, 2]) === 1, 3);
console.assert(superPow(2147483647, [2, 0, 0]) === 1198, 4);
