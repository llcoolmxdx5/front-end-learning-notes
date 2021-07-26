/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";
  // 保存溢位
  let add = 0;
  let arr = [];
  for (let i = num1.length; i--; ) {
    const s1 = num1[i];
    const a1 = [];
    for (let j = num2.length; j--; ) {
      const s2 = num2[j];
      const a = +s1 * s2 + add;
      add = Math.floor(a / 10);
      a1.push(a % 10);
    }
    if (add) {
      a1.push(add);
      add = 0;
    }
    arr.push(a1.reverse().join("") + "0".repeat(num1.length - 1 - i));
  }
  let maxLength = Math.max(...arr.map((x) => x.length));
  arr = arr.map((x) => "0".repeat(maxLength - x.length) + x);
  // 加法
  const arr1 = [];
  add = 0;
  while (maxLength > 0) {
    const sum = eval(arr.map((x) => x[maxLength - 1]).join("+")) + add;
    add = Math.floor(sum / 10);
    arr1.push(sum % 10);
    maxLength -= 1;
  }
  const res = arr1.reverse().join("");
  return add ? add + res : res;
};

var multiply = function (num1, num2) {
  if (num1 === "0" || num2 === "0") {
    return "0";
  }
  let l1 = num1.length,
    l2 = num2.length,
    p = new Array(l1 + l2).fill(0);
  for (let i = l1; i--; ) {
    for (let j = l2; j--; ) {
      let tmp = num1[i] * num2[j] + p[i + j + 1];
      p[i + j + 1] = tmp % 10;
      p[i + j] += Math.floor(tmp / 10);
    }
  }
  let start = 0;
  while (p[start] === 0) {
    start += 1;
  }
  return p.slice(start).join("");
};

console.assert(multiply("2", "3") === "6", 1);
console.assert(multiply("123", "456") === "56088", 2);
console.assert(multiply("123", "12") === "1476", 3);
