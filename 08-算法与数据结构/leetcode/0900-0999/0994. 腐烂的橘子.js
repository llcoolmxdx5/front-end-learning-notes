/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const m = grid.length,
    n = grid[0].length;
  const freshOranges = new Set();
  const queue = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        freshOranges.add(`${i},${j}`);
      } else if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
    }
  }
  let minute = 0;
  if (freshOranges.size === 0) {
    return minute;
  }
  while (queue.length) {
    const { length } = queue;
    for (let i = 0; i < length; i++) {
      const [row, col] = queue.shift();
      [
        [row - 1, col],
        [row, col + 1],
        [row + 1, col],
        [row, col - 1],
      ].forEach(([ni, nj]) => {
        if (freshOranges.has(`${ni},${nj}`) && 0 <= ni && ni < m && 0 <= nj && nj < n) {
          freshOranges.delete(`${ni},${nj}`);
          queue.push([ni, nj]);
        }
      });
    }
    minute += 1;
    if (freshOranges.size === 0) {
      return minute;
    }
  }
  if (freshOranges.size) {
    return -1;
  }
  return minute;
};

console.assert(
  orangesRotting([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ]) === 4,
  1
);
console.assert(
  orangesRotting([
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1],
  ]) === -1,
  2
);
console.assert(orangesRotting([[0, 2]]) === 0, 3);
console.assert(orangesRotting([[2], [1]]) === 1, 4);
