/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  const n = grid.length;
  if (n === 1 && grid[0][0] === 0) {
    return 1;
  }
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) {
    return -1;
  }
  let step = 1;
  const queue = [[0, 0]];
  // const visited = new Set().add(`0,0`);
  let flag = false;
  while (queue.length) {
    const { length } = queue;
    for (let i = 0; i < length; i++) {
      const [row, col] = queue.shift();
      [
        [row, col + 1],
        [row, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row - 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1],
        [row + 1, col - 1],
      ].forEach(item => {
        const [a, b] = item;
        const v = grid[a]?.[b] ?? 1;
        // if (v === 1 || visited.has(`${a},${b}`)) return;
        if (v === 1) return;
        if (a === n - 1 && b === n - 1) {
          flag = true;
        }
        queue.push([a, b]);
        // visited.add(`${a},${b}`);
        grid[a][b] = 1;
      });
    }
    step += 1;
    // console.log(queue, step, flag);
    if (flag) {
      return step;
    }
  }
  return -1;
};

console.assert(
  shortestPathBinaryMatrix([
    [0, 1],
    [1, 0],
  ]) === 2,
  1,
);
console.assert(
  shortestPathBinaryMatrix([
    [0, 0, 0],
    [1, 1, 0],
    [1, 1, 0],
  ]) === 4,
  2,
);
console.assert(
  shortestPathBinaryMatrix([
    [0, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 0],
    [0, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 0],
  ]) === 14,
  3,
);
console.assert(
  shortestPathBinaryMatrix([
    [1, 0, 0],
    [1, 1, 0],
    [1, 1, 0],
  ]) === -1,
  4,
);
