/**
 * @param {string} num
 * @return {string}
 */
var largestOddNumber = function (num) {
  for (let i = num.length - 1; i >= 0; i--) {
    if (num[i] % 2 === 1) {
      return num.slice(0, i + 1);
    }
  }
  return "";
};

console.log(largestOddNumber("1")); // 1
console.log(largestOddNumber("")); // ''
console.log(largestOddNumber("4206")); // ''
console.log(largestOddNumber("10133890")); // 1013389
console.log(largestOddNumber("35427")); // 35427
