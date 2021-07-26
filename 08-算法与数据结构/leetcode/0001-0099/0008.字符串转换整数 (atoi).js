/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  /** 执行的不同阶段 start signed in_number end */
  let stage = "start";
  const map = new Map([
    ["start", ["start", "signed", "in_number", "end"]],
    ["signed", ["end", "end", "in_number", "end"]],
    ["in_number", ["end", "end", "in_number", "end"]],
    ["end", ["end", "end", "end", "end"]],
  ]);
  /** 符号 默认为true 正 */
  let sign = 1;
  /** 整数 */
  let num = 0;
  /**
   * 获取字符类型
   * @param {string} str
   * @return {number}
   */
  const getType = (str) => {
    if (str === " ") return 0;
    if (str === "+" || str === "-") return 1;
    if (str.charCodeAt() >= 48 && str.charCodeAt() <= 57) return 2;
    return 3;
  };
  for (const char of s) {
    stage = map.get(stage)[getType(char)];
    // console.log(stage, char, num);
    if (stage === "start") {
      continue;
    }
    if (stage === "signed") {
      sign = char === "+" ? 1 : -1;
      continue;
    }
    if (stage === "end") {
      break;
    }
    num = +char + num * 10;
  }
  const res = sign * num;
  return res >= 0 ? Math.min(res, 2147483647) : Math.max(res, -2147483648);
};

// 法二 正则
var myAtoi = function (s) {
  const re = new RegExp(/^(-|\+)?\d+/);
  let str = s.trim().match(re);
  let res = str ? Number(str[0]) : 0;
  return res >= 0 ? Math.min(res, 2 ** 31 - 1) : Math.max(res, -(2 ** 31));
};

// 法三
var myAtoi = function (s) {
  let flag = "";
  let num = 0;
  for (let index = 0; index < s.length; index++) {
    const element = s[index];
    const eleASCII = element.charCodeAt();
    const isNum = eleASCII >= 48 && eleASCII <= 57;
    // '0' -> 48 '9' -> 57
    if (element === " ") {
      if (num || flag.length) break;
      continue;
    }
    if (element === "+" || element === "-") {
      if (flag.length || num) break;
      flag = element;
      continue;
    }
    if (isNum) {
      num = +element + num * 10;
      continue;
    } else {
      break;
    }
  }
  if (flag === "-") {
    flag = false;
  } else {
    flag = true;
  }
  return flag ? Math.min(num, 2147483647) : Math.max(-num, -2147483648);
};

console.log(myAtoi("42")); // 42
console.log(myAtoi("   -42")); // -42
console.log(myAtoi("4193 with words")); // 4193
console.log(myAtoi("words and 987")); // 0
console.log(myAtoi("-91283472332")); // -2147483648
console.log(myAtoi("+-12")); // 0
console.log(myAtoi("++12")); // 0
console.log(myAtoi("00000-42a1234")); // 0
console.log(myAtoi("   +0 123")); // 0
console.log(myAtoi("  +  413")); // 0
