/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
  const sqrt = Math.pow(num, 1 / 2);
  return parseInt(sqrt) === sqrt
};

var isPerfectSquare = function (num) {
  const n = Math.floor(num / 2);
  let left = 1;
  let right = n + 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    // console.log(mid);
    const res = mid * mid;
    if (res === num) {
      return true;
    } else if (res < num) {
      left = mid + 1;
    } else {
      right = mid - 1
    }
  }
  return false
};

console.assert(isPerfectSquare(16) === true, 1);
console.assert(isPerfectSquare(999) === false, 2);
console.assert(isPerfectSquare(1) === true, 3);
