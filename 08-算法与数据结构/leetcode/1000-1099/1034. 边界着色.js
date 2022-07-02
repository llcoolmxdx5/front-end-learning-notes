/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} col
 * @param {number} color
 * @return {number[][]}
 */
var colorBorder = function (grid, row, col, color) {
  const m = grid.length;
  const n = grid[0].length;
  const target = grid[row][col];
  const visited = Array.from({ length: m }, () => new Array(n).fill(0));
  const borders = [];
  const queue = [[row, col]];
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  while (queue.length) {
    const { length } = queue;
    for (let i = 0; i < length; i++) {
      const [x, y] = queue.shift();
      visited[x][y] = 1;
      let flag = false;
      for (let j = 0; j < 4; j++) {
        const nextX = directions[j][0] + x;
        const nextY = directions[j][1] + y;
        if (grid[nextX]?.[nextY] !== target) {
          flag = true;
          continue;
        }
        if (visited[nextX][nextY]) {
          continue;
        }
        queue.push([nextX, nextY]);
      }
      if (flag) {
        borders.push([x, y]);
      }
    }
  }
  for (let i = 0, len = borders.length; i < len; i++) {
    const [x, y] = borders[i];
    grid[x][y] = color;
  }
  return grid;
};

console.log(
  colorBorder(
    [
      [1, 2, 1, 2, 1, 2],
      [2, 2, 2, 2, 1, 2],
      [1, 2, 2, 2, 1, 2],
    ],
    1,
    3,
    1,
  ),
); // [[1,1,1,1,1,2],[1,2,1,1,1,2],[1,1,1,1,1,2]]

console.log(
  colorBorder(
    [
      [1, 1],
      [1, 2],
    ],
    0,
    0,
    3,
  ),
); // [[3,3],[3,2]]

console.log(
  colorBorder(
    [
      [1, 2, 2],
      [2, 3, 2],
    ],
    0,
    1,
    3,
  ),
); // [[1,3,3],[2,3,3]]

console.log(
  colorBorder(
    [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    1,
    1,
    2,
  ),
); // [[2,2,2],[2,1,2],[2,2,2]]
