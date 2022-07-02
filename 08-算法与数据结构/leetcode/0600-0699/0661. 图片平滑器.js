/**
 * @param {number[][]} img
 * @return {number[][]}
 */
var imageSmoother = function (img) {
  const m = img.length;
  const n = img[0].length;
  const res = Array.from({ length: m }, () => new Array(n).fill(0));
  const getSmoother = (row, col) => {
    const rowStart = row - 1 >= 0 ? row - 1 : row;
    const rowEnd = row + 1 < m ? row + 1 : row;
    const colStart = col - 1 >= 0 ? col - 1 : col;
    const colEnd = col + 1 < n ? col + 1 : col;
    let sum = 0;
    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        sum += img[i][j];
      }
    }
    return Math.floor(sum / ((rowEnd - rowStart + 1) * (colEnd - colStart + 1)));
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      res[i][j] = getSmoother(i, j);
    }
  }
  // console.log(res);
  return res;
};

console.assert(
  JSON.stringify(
    imageSmoother([
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ])
  ) ===
    JSON.stringify([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]),
  1
);

console.assert(
  JSON.stringify(
    imageSmoother([
      [100, 200, 100],
      [200, 50, 200],
      [100, 200, 100],
    ])
  ) ===
    JSON.stringify([
      [137, 141, 137],
      [141, 138, 141],
      [137, 141, 137],
    ]),
  2
);
