/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let res = '';
  let index = 0;
  while (true) {
    const s = strs[0]?.[index];
    if (s === undefined) return res;
    const flag = strs.every((item) => item[index] === s);
    if (flag) {
      res += s;
      index += 1;
    } else {
      return res;
    }
  }
};

var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return '';
  let i = 0;
  let res = strs[0];
  while (i < strs.length - 1) {
    if (res === '') return '';
    let s1 = '';
    for (let index = 0; index < res.length; index++) {
      if (res[index] === strs[i + 1]?.[index]) {
        s1 += res[index];
      } else {
        break;
      }
    }
    res = s1;
    i += 1;
  }
  // console.log(res);
  return res;
};

console.assert(longestCommonPrefix(['flower', 'flow', 'flight'] === 'fl'), 1);
console.assert(longestCommonPrefix(['dog', 'racecar', 'car'] === ''), 2);
console.assert(longestCommonPrefix([] === ''), 3);
