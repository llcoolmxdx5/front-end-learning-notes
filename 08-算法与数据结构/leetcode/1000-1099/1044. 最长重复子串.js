/**
 * @param {string} s
 * @return {string}
 */
var longestDupSubstring = function (s) {
  let ans = "";
  for (let i = 0, len = s.length; i < len; i++) {
    while (s.slice(i + 1).includes(s.slice(i, i + ans.length + 1))) {
      ans = s.slice(i, i + ans.length + 1);
    }
  }
  return ans;
};

console.assert(longestDupSubstring("banana") === "ana", 1);
console.assert(longestDupSubstring("abcd") === "", 2);
