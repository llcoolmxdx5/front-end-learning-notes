/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function (n) {
  let d = 1,
    count = 9;
  while (n > d * count) {
    n -= d * count;
    d++;
    count *= 10;
  }
  const index = n - 1;
  const start = Math.floor(Math.pow(10, d - 1));
  const num = start + Math.floor(index / d);
  const digitIndex = index % d;
  // console.log(start, num, digitIndex);
  const digit = +num.toString(10)[digitIndex];
  return digit;
};

console.assert(findNthDigit(3) === 3, 1);
console.assert(findNthDigit(11) === 0, 2);
console.assert(findNthDigit(2147483647) === 2, 3);
