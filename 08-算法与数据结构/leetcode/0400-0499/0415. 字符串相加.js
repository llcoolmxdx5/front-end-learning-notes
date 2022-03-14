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
  const ans = [];
  let extra = 0;
  let n = num1.length - 1;
  let m = num2.length - 1;
  while (n >= 0 || m >= 0 || extra) {
    let x = +(num1[n] ?? "0");
    let y = +(num2[m] ?? "0");
    const sum = x + y + extra;
    ans.push(sum % 10);
    extra = Math.floor(sum / 10);
    n--;
    m--;
  }
  return ans.reverse().join("");
};

console.assert(addStrings("1234", "1234") === "2468", 1);
