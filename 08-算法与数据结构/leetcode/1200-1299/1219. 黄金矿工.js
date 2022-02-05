/**
 * @param {number[][]} grid
 * @return {number}
 */
var getMaximumGold = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let ans = 0;
  const dfs = (startX, startY, temp = 0) => {
    const rec = grid[startX][startY];
    grid[startX][startY] = 0;
    temp += rec;
    ans = Math.max(ans, temp);
    const arr = [
      [startX + 1, startY],
      [startX - 1, startY],
      [startX, startY - 1],
      [startX, startY + 1],
    ];
    for (const [row, col] of arr) {
      const value = grid[row]?.[col];
      if (!value) {
        continue;
      }
      dfs(row, col, temp);
    }
    grid[startX][startY] = rec;
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j] && dfs(i, j);
    }
  }
  return ans;
};

var getMaximumGold = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let ans = 0;
  const dfs = (startX, startY, temp = 0) => {
    const rec = grid[startX][startY];
    grid[startX][startY] = 0;
    temp += rec;
    ans = Math.max(ans, temp);
    const arr = [
      [startX + 1, startY],
      [startX - 1, startY],
      [startX, startY - 1],
      [startX, startY + 1],
    ];
    for (const [row, col] of arr) {
      if (row < 0 || col < 0 || row >= m || col >= n || !grid[row][col]) {
        continue;
      }
      dfs(row, col, temp);
    }
    grid[startX][startY] = rec;
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (
        i === 0 ||
        j === 0 ||
        !(
          (i + 1 < m && grid[i - 1][j] && grid[i + 1][j]) ||
          (j + 1 < n && grid[i][j - 1] && grid[i][j + 1])
        )
      ) {
        dfs(i, j);
      }
    }
  }
  return ans;
};

console.assert(
  getMaximumGold([
    [0, 6, 0],
    [5, 8, 7],
    [0, 9, 0],
  ]) === 24,
  1
);
console.assert(
  getMaximumGold([
    [1, 0, 7],
    [2, 0, 6],
    [3, 4, 5],
    [0, 3, 0],
    [9, 0, 20],
  ]) === 28,
  2
);
console.assert(
  getMaximumGold([
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
  ]) === 19,
  3
);
