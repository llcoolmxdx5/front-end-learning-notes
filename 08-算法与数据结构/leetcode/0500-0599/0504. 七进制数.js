/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function (num) {
  if (!num) {
    return "0";
  }
  const arr = [];
  let flag = num >= 0;
  num = Math.abs(num);
  while (num) {
    arr.push(`${num % 7}`);
    num = Math.floor(num / 7);
  }
  if (!flag) {
    arr.push("-");
  }
  return arr.reverse().join("");
};

console.assert(convertToBase7(-7) === "-10", 1);
console.assert(convertToBase7(100) === "202", 2);
