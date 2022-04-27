/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  const m = heights.length;
  const n = heights[0].length;
  const pacific = Array.from({ length: m }, () => new Array(n).fill(0));
  const atlantic = Array.from({ length: m }, () => new Array(n).fill(0));

  const bfs = (row, col, array) => {
    if (array[row][col]) {
      return;
    }
    array[row][col] = 1;
    const queue = [[row, col]];
    while (queue.length) {
      const len = queue.length;
      for (let i = 0; i < len; i++) {
        const [r, c] = queue.shift();
        [
          [r + 1, c],
          [r - 1, c],
          [r, c - 1],
          [r, c + 1],
        ].forEach((item) => {
          const [a, b] = item;
          if ([undefined, 1].includes(array[a]?.[b])) {
            return;
          }
          if (heights[a][b] >= heights[r][c]) {
            array[a][b] = 1;
            queue.push([a, b]);
          }
        });
      }
    }
  };
  for (let j = 0; j < n; j++) {
    bfs(0, j, pacific);
  }
  for (let i = 0; i < m; i++) {
    bfs(i, 0, pacific);
  }
  for (let i = 0; i < n; i++) {
    bfs(m - 1, i, atlantic);
  }
  for (let i = 0; i < m; i++) {
    bfs(i, n - 1, atlantic);
  }
  // console.log(pacific, atlantic);
  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        result.push([i, j]);
      }
    }
  }
  // console.log(result);
  return result;
};

console.assert(
  pacificAtlantic([
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4],
  ]).join() ===
    [
      [0, 4],
      [1, 3],
      [1, 4],
      [2, 2],
      [3, 0],
      [3, 1],
      [4, 0],
    ].join(),
  1
);
