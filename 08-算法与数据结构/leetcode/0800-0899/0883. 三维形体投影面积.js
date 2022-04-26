/**
 * @param {number[][]} grid
 * @return {number}
 */
var projectionArea = function (grid) {
  const n = grid.length;
  /** 俯视图 */
  let verticalViewCount = 0;
  /** 正视图 */
  let frontViewCount = 0;
  /** 侧视图 */
  let sideViewCount = 0;
  for (let i = 0; i < n; i++) {
    let frontCount = 0;
    let sideCount = 0;
    for (let j = 0; j < n; j++) {
      if (grid[i][j]) {
        verticalViewCount += 1;
      }
      frontCount = Math.max(frontCount, grid[i][j]);
      sideCount = Math.max(sideCount, grid[j][i]);
    }
    frontViewCount += frontCount;
    sideViewCount += sideCount;
  }
  return verticalViewCount + frontViewCount + sideViewCount;
};

console.assert(
  projectionArea([
    [1, 2],
    [3, 4],
  ]) === 17,
  1
);
console.assert(projectionArea([[2]]) === 5, 2);
console.assert(
  projectionArea([
    [1, 0],
    [0, 2],
  ]) === 8,
  3
);
