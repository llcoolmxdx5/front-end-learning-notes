/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
  let ans = 0;
  while (num) {
    ans += num % 10;
    num = Math.floor(num / 10);
    if (num === 0 && ans >= 10) {
      num = ans;
      ans = 0;
    }
    // console.log(num, ans);
  }
  // console.log(ans);
  return ans;
};

var addDigits = function (num) {
  return ((num - 1) % 9) + 1;
};

console.assert(addDigits(38) === 2, 1);
console.assert(addDigits(119) === 2, 2);
