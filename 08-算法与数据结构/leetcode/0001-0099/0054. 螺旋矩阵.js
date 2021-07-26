/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const res = [];
  const n = matrix.length;
  const m = matrix[0].length;
  let loop = 0;
  while (true) {
    for (let i = loop; i < m - loop; i++) {
      res.push(matrix[loop][i]);
    }
    for (let j = 1 + loop; j < n - loop; j++) {
      res.push(matrix[j][m - 1 - loop]);
    }
    for (let k = m - 2 - loop; k >= loop; k--) {
      res.push(matrix[n - 1 - loop][k]);
    }
    for (let x = n - 2 - loop; x >= 1 + loop; x--) {
      res.push(matrix[x][loop]);
    }
    loop += 1;
    // console.log(res);
    if (res.length >= n * m) break;
  }
  return res.slice(0, n * m);
};

console.log(
  spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
); // [1, 2, 3, 6, 9, 8, 7, 4, 5]

console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ])
); // [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]

console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ])
); //  [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
