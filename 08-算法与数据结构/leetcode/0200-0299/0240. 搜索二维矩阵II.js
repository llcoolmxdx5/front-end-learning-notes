/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  let row = 0;
  let col = n - 1;
  while (true) {
    // console.log(row, col);
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] < target) {
      row += 1;
    } else if (matrix[row][col] > target) {
      col -= 1;
    }
    if (col < 0 || row > m - 1) {
      return false;
    }
  }
};

console.assert(
  searchMatrix(
    [
      [2, 5],
      [2, 8],
      [7, 9],
      [7, 11],
      [9, 11],
    ],
    7,
  ) === true,
  1,
);

console.assert(
  searchMatrix(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    5,
  ) === true,
  2,
);

console.assert(
  searchMatrix(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    20,
  ) === false,
  3,
);
