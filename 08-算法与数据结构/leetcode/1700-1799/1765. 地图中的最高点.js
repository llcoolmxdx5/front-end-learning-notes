/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
var highestPeak = function (isWater) {
  const m = isWater.length;
  const n = isWater[0].length;
  let queue = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (isWater[i][j] === 1) {
        isWater[i][j] = 0;
        queue.push([i, j]);
      } else {
        isWater[i][j] = Number.MAX_SAFE_INTEGER;
      }
    }
  }
  let level = 0;
  while (queue.length) {
    const { length } = queue;
    level += 1;
    const next = [];
    for (const [x, y] of queue) {
      [
        [x + 1, y],
        [x - 1, y],
        [x, y - 1],
        [x, y + 1],
      ].forEach(([row, col]) => {
        if (row < 0 || row >= m || col < 0 || col >= n || isWater[row][col] <= level) {
          return;
        }
        isWater[row][col] = level;
        next.push([row, col]);
      });
    }
    queue = next;
  }
  return isWater;
};

console.log(
  highestPeak([
    [0, 1],
    [0, 0],
  ])
); // [[1,0],[2,1]]
console.log(
  highestPeak([
    [0, 0, 1],
    [1, 0, 0],
    [0, 0, 0],
  ])
); // [[1,1,0],[0,1,1],[1,2,2]]
