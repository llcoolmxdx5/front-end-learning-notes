/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  const ans = [0, 1];
  for (let i = 1; i < n; i++) {
    for (let j = ans.length - 1; j >= 0; j--) {
      ans.push(ans[j] + 2 ** i);
    }
  }
  // console.log(ans);
  return ans;
};

console.assert(grayCode(1).join() === [0, 1].join(), 1);
console.assert(grayCode(2).join() === [0, 1, 3, 2].join(), 2);
console.assert(
  grayCode(5).join() ===
    [
      0, 1, 3, 2, 6, 7, 5, 4, 12, 13, 15, 14, 10, 11, 9, 8, 24, 25, 27, 26, 30,
      31, 29, 28, 20, 21, 23, 22, 18, 19, 17, 16,
    ].join(),
  5
);
