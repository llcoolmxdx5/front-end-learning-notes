/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length;
  const loop = (start) => {
    const arr = [];
    for (let i = start; i < n - start; i++) {
      arr.push(matrix[i][n - 1 - start]);
      matrix[i][n - 1 - start] = matrix[start][i];
    }
    for (let i = n - 1 - start; i >= start; i--) {
      arr.push(matrix[n - 1 - start][i]);
      matrix[n - 1 - start][i] = arr.shift();
    }
    arr.reverse();
    arr.pop();
    for (let i = start; i < n - 1 - start; i++) {
      arr.push(matrix[i][start]);
      matrix[i][start] = arr.shift();
    }
    arr.reverse();
    for (let i = 1 + start; i < n - start; i++) {
      matrix[start][i] = arr.shift();
    }
    // console.log(arr);
  };
  for (let i = 0; i <= n - 2; i++) {
    loop(i);
  }
};

var rotate = function (matrix) {
  const n = matrix.length;
  for (let i = 0; i < Math.floor(n / 2); ++i) {
    for (let j = 0; j < Math.floor((n + 1) / 2); ++j) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[n - j - 1][i];
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      matrix[j][n - i - 1] = temp;
    }
  }
};

var rotate = function (matrix) {
  const n = matrix.length;
  for (let i = 0; i < Math.floor(n / 2); ++i) {
    for (let j = 0; j < Math.floor((n + 1) / 2); ++j) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[n - j - 1][i];
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      matrix[j][n - i - 1] = temp;
    }
  }
};

var rotate = function (matrix) {
  const n = matrix.length;
  // 水平翻转 -180°+镜像
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < n; j++) {
      [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]];
    }
  }
  // 主对角线翻转 270°+镜像
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
};

const matrix1 = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
];
rotate(matrix1);
console.log(matrix1);
// [
//   [15, 13, 2, 5],
//   [14, 3, 4, 1],
//   [12, 6, 8, 9],
//   [16, 7, 10, 11],
// ];
const matrix2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
rotate(matrix2);
console.log(matrix2);
// [
//   [7, 4, 1],
//   [8, 5, 2],
//   [9, 6, 3],
// ];
const matrix3 = [
  [1, 2],
  [3, 4],
];
rotate(matrix3);
console.log(matrix3);
// [
//   [3, 1],
//   [4, 2],
// ];
