/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  const m = mat.length,
    n = mat[0].length;
  const row = new Array(m).fill(0);
  const arr = row.map((_) => new Array(n).fill(0));
  const queue = [];
  const seen = new Set();
  mat.forEach((item, i) => {
    item.forEach((v, j) => {
      if (v === 0) {
        queue.push([i, j]);
        seen.add(`${i},${j}`);
      }
    });
  });
  while (queue.length) {
    const [i, j] = queue.shift();
    [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1],
    ].forEach(([ni, nj]) => {
      if (0 <= ni && ni < m && 0 <= nj && nj < n && !seen.has(`${ni},${nj}`)) {
        arr[ni][nj] = arr[i][j] + 1;
        queue.push([ni, nj]);
        seen.add(`${ni},${nj}`);
      }
    });
  }
  return arr;
};

console.log(
  updateMatrix([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ])
); // [[0,0,0],[0,1,0],[0,0,0]]

console.log(
  updateMatrix([
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ])
); // [[0,0,0],[0,1,0],[1,2,1]]

console.log(updateMatrix([[0], [0], [0], [0], [0]])); // [[0],[0],[0],[0],[0]]

console.log(
  updateMatrix([
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 0, 1], // 7
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0], // 8
    [1, 1, 1, 1, 0, 1, 0, 0, 1, 1], // 9
  ])
);
/**
 * [[1,0,1,1,0,0,1,0,0,1],[0,1,1,0,1,0,1,0,1,1],[0,0,1,0,1,0,0,1,0,0],[1,0,1,0,1,1,1,1,1,1],[0,1,0,1,1,0,0,0,0,1],
 * [0,0,1,0,1,1,1,0,1,0],[0,1,0,1,0,1,0,0,1,1],[1,0,0,0,1,2,1,1,0,1],[2,1,1,1,1,2,1,0,1,0],[3,2,2,1,0,1,0,0,1,1]]
 */
