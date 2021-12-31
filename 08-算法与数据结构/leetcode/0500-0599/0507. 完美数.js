/**
 * @param {number} num
 * @return {boolean}
 */
var checkPerfectNumber = function (num) {
  if (num === 1) return false;
  let ans = 1;
  for (let i = 2, max = Math.sqrt(num); i < max; i++) {
    if (num % i === 0) {
      ans += i + num / i;
    }
  }
  return ans === num;
};

console.assert(checkPerfectNumber(28) === true, 1);
console.assert(checkPerfectNumber(6) === true, 2);
console.assert(checkPerfectNumber(496) === true, 3);
console.assert(checkPerfectNumber(8128) === true, 4);
console.assert(checkPerfectNumber(2) === false, 5);
