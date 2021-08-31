/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  const { length } = s;
  const res = [];
  const dfs = (str, index) => {
    if (index === length) {
      res.push(str);
      return;
    }
    const charCode = s[index].charCodeAt();
    if (
      (charCode >= 97 && charCode <= 122) ||
      (charCode >= 65 && charCode <= 90)
    ) {
      dfs(str + s[index], index + 1);
      dfs(str + String.fromCharCode(charCode ^ 32), index + 1);
    } else {
      dfs(str + s[index], index + 1);
    }
  };
  dfs("", 0);
  return res;
};

console.log(letterCasePermutation("a1b2")); // ["a1b2", "a1B2", "A1b2", "A1B2"]

console.log(letterCasePermutation("3z4")); // ["3z4", "3Z4"]

console.log(letterCasePermutation("12345")); // ["12345"]
