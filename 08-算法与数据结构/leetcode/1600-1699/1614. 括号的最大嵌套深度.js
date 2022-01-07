/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function (s) {
  const stack = [];
  let ans = 0;
  let temp = 0;
  for (const str of s) {
    if (str === "(") {
      temp += 1;
      ans = Math.max(temp, ans);
    } else if (str === ")") {
      temp -= 1;
    }
  }
  return ans;
};

console.assert(maxDepth("(1+(2*3)+((8)/4))+1") === 3, 1);
