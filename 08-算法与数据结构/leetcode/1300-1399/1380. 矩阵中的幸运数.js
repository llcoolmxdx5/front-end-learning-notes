/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var luckyNumbers = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const ans = [];
  const set = new Set();
  for (let i = 0; i < m; i++) {
    set.add(Math.min(...matrix[i]));
  }
  for (let j = 0; j < n; j++) {
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < m; i++) {
      max = Math.max(matrix[i][j], max);
    }
    if (set.has(max)) {
      ans.push(max);
    }
  }
  return ans;
};

console.assert(
  luckyNumbers([
    [3, 7, 8],
    [9, 11, 13],
    [15, 16, 17],
  ]).join() === [15].join(),
  1
);
