/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num) {
  let ans = 0;
  while (num) {
    if (num % 2 === 0) {
      num /= 2;
    } else {
      num -= 1;
    }
    ans += 1;
  }
  return ans;
};

1110;

console.assert(numberOfSteps(14) === 6, 1);
console.assert(numberOfSteps(123) === 12, 2);
