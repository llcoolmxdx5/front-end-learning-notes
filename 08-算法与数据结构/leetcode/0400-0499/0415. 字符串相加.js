/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let maxLength = Math.max(num1.length, num2.length);
  const arr = [num1, num2].map((x) => "0".repeat(maxLength - x.length) + x);
  // 加法
  const arr1 = [];
  let add = 0;
  while (maxLength > 0) {
    const sum = eval(arr.map((x) => x[maxLength - 1]).join("+")) + add;
    add = Math.floor(sum / 10);
    arr1.push(sum % 10);
    maxLength -= 1;
  }
  const res = arr1.reverse().join("");
  return add ? add + res : res;
};

var addStrings = function (num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1,
    add = 0;
  const ans = [];
  while (i >= 0 || j >= 0 || add != 0) {
    const x = i >= 0 ? num1[i] - "0" : 0;
    const y = j >= 0 ? num2[j] - "0" : 0;
    const result = x + y + add;
    ans.push(result % 10);
    add = Math.floor(result / 10);
    i -= 1;
    j -= 1;
  }
  return ans.reverse().join("");
};

console.assert(addStrings("1234", "1234") === "2468", 1);
