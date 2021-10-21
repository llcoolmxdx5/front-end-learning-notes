/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let right = digits.length - 1;
  let sum = 1;
  while (sum && right >= 0) {
    if (digits[right] === 9) {
      digits[right] = 0;
      right -= 1;
    } else if (digits[right] < 9) {
      digits[right] += 1;
      sum = 0;
    }
  }
  if (sum) {
    return [1, ...digits];
  }
  return digits;
};

console.assert(plusOne([1, 9, 9]).join("") === "200", 1);
console.assert(plusOne([9]).join("") === "10", 2);
