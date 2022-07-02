/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findBall = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const getFall = (row, col) => {
    const isRight = grid[row][col] === 1;
    if (isRight) {
      if (row === m - 1 && grid[row][col + 1] === 1) {
        return col + 1;
      }
      if ([undefined, -1].includes(grid[row][col + 1])) {
        return -1;
      }
      if (!grid[row + 1]?.[col + 1]) {
        return -1;
      }
      return getFall(row + 1, col + 1);
    } else {
      if (row === m - 1 && grid[row][col - 1] === -1) {
        return col - 1;
      }
      if ([undefined, 1].includes(grid[row][col - 1])) {
        return -1;
      }
      if (!grid[row + 1]?.[col - 1]) {
        return -1;
      }
      return getFall(row + 1, col - 1);
    }
  };
  const ans = [];
  for (let i = 0; i < n; i++) {
    ans.push(getFall(0, i));
  }
  // console.log(ans);
  return ans;
};

var findBall = function (grid) {
  const n = grid[0].length;
  const ans = new Array(n);
  for (let j = 0; j < n; j++) {
    let col = j; // 球的初始列
    for (const row of grid) {
      const dir = row[col];
      col += dir; // 移动球
      if (col < 0 || col === n || row[col] !== dir) {
        // 到达侧边或 V 形
        col = -1;
        break;
      }
    }
    ans[j] = col; // col >= 0 为成功到达底部
  }
  return ans;
};

console.assert(
  findBall([
    [1, 1, 1, -1, -1],
    [1, 1, 1, -1, -1],
    [-1, -1, -1, 1, 1],
    [1, 1, 1, 1, -1],
    [-1, -1, -1, -1, -1],
  ]).join() === [1, -1, -1, -1, -1].join(),
  1,
);
console.assert(
  findBall([
    [1, 1, 1, 1, 1, 1],
    [-1, -1, -1, -1, -1, -1],
    [1, 1, 1, 1, 1, 1],
    [-1, -1, -1, -1, -1, -1],
  ]).join() === [0, 1, 2, 3, 4, -1].join(),
  2,
);
