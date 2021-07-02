/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const arr = s.split(" ");
  let res = "";
  for (let index = 0; index < arr.length; index++) {
    let element = arr[index];
    let left = 0,
      right = element.length - 1;
    const eleArr = element.split("");
    while (left < right) {
      [eleArr[left], eleArr[right]] = [eleArr[right], eleArr[left]];
      left += 1;
      right -= 1;
    }
    res += " " + eleArr.join("");
  }
  return res.slice(1);
};

var reverseWords = function (s) {
  let newS = s.split("").reverse().join("");
  return newS.split(" ").reverse().join(" ");
};

var reverseWords = function (s) {
  let i = 0;
  const { length } = s;
  const ret = [];
  while (i < length) {
    let start = i;
    while (s[i] !== " " && i < length) {
      i += 1;
    }
    for (let index = start; index < i; index++) {
      const element = s[i + start - 1 - index];
      ret.push(element);
    }
    while (i < length && s[i] === " ") {
      i += 1;
      ret.push(" ");
    }
  }
  return ret.join("");
};

console.assert(
  reverseWords("Let's take LeetCode contest") === "s'teL ekat edoCteeL tsetnoc",
  1
);
