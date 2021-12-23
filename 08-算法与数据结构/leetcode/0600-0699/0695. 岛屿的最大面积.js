/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const BFS = (row, col) => {
    grid[row][col] = 0;
    let ans = 0;
    const queue = [[row, col]];
    while (queue.length) {
      const { length } = queue;
      ans += length;
      for (let i = 0; i < length; i++) {
        const [x, y] = queue.shift();
        [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1],
        ].forEach((item) => {
          const value = grid[item[0]]?.[item[1]] ?? 0;
          if (value) {
            queue.push(item);
            grid[item[0]][item[1]] = 0;
          }
        });
      }
    }
    return ans;
  };
  let maxArea = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j]) {
        maxArea = Math.max(BFS(i, j), maxArea);
      }
    }
  }
  return maxArea;
};

console.assert(
  maxAreaOfIsland([
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ]) === 6,
  1
);
