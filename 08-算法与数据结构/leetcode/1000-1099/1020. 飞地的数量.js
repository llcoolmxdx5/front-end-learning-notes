/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const bfs = (x, y) => {
    let count = 1;
    let flag = false;
    grid[x][y] = 0;
    const queue = [[x, y]];
    while (queue.length) {
      const { length } = queue;
      for (let i = 0; i < length; i++) {
        const [row, col] = queue.shift();
        [
          [row + 1, col],
          [row - 1, col],
          [row, col + 1],
          [row, col - 1],
        ].forEach(([a, b]) => {
          if (grid[a]?.[b]) {
            grid[a][b] = 0;
            count += 1;
            queue.push([a, b]);
          }
          if (grid[a]?.[b] === undefined) {
            flag = true;
          }
        });
      }
    }
    return flag ? 0 : count;
  };
  let ans = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j]) {
        ans += bfs(i, j);
      }
    }
  }
  return ans;
};

console.assert(
  numEnclaves([
    [0, 0, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ]) === 3,
  1
);
console.assert(
  numEnclaves([
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ]) === 0,
  2
);
