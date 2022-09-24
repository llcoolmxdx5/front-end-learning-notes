/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const queue = []; // 队列 核心数据结构
  const visited = new Set(); // 避免走回头路
  let step = 0; // 记录扩散的步数
  const BFS = () => {
    step += 1;
    while (queue.length) {
      // console.log(queue, step);
      const { length } = queue;
      for (let i = 0; i < length; i++) {
        const [row, col] = queue.shift();
        [
          [row, col - 1],
          [row + 1, col],
          [row, col + 1],
          [row - 1, col],
        ].forEach(([row1, col1]) => {
          const m = grid[row1]?.[col1] ?? '0';
          if (m === '1' && !visited.has(`${row1},${col1}`)) {
            queue.push([row1, col1]);
            visited.add(`${row1},${col1}`);
          }
        });
      }
    }
  };
  const m = grid.length;
  for (let row = 0; row < m; row++) {
    const n = grid[row].length;
    for (let col = 0; col < n; col++) {
      if (!visited.has(`${row},${col}`) && grid[row][col] === '1') {
        queue.push([row, col]); // 将起点加入队列
        visited.add(`${row},${col}`);
        BFS();
      }
    }
  }
  return step;
};

var numIslands = function (grid) {
  const queue = []; // 队列 核心数据结构
  let step = 0; // 记录扩散的步数
  const BFS = () => {
    step += 1;
    while (queue.length) {
      // console.log(queue, step);
      const { length } = queue;
      for (let i = 0; i < length; i++) {
        const [row, col] = queue.shift();
        [
          [row, col - 1],
          [row + 1, col],
          [row, col + 1],
          [row - 1, col],
        ].forEach(([row1, col1]) => {
          const m = grid[row1]?.[col1] ?? '0';
          if (m === '1') {
            queue.push([row1, col1]);
            grid[row1][col1] = '0';
          }
        });
      }
    }
  };
  const m = grid.length;
  for (let row = 0; row < m; row++) {
    const n = grid[row].length;
    for (let col = 0; col < n; col++) {
      if (grid[row][col] === '1') {
        queue.push([row, col]); // 将起点加入队列
        grid[row][col] = '0';
        BFS();
      }
    }
  }
  return step;
};

var numIslands = function (grid) {
  const dfs = (r, c) => {
    const value = grid[r]?.[c];
    if (value !== '1') {
      return;
    }
    grid[r][c] = '0';
    dfs(r - 1, c);
    dfs(r + 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  let step = 0;
  const m = grid.length;
  for (let row = 0; row < m; row++) {
    const n = grid[row].length;
    for (let col = 0; col < n; col++) {
      if (grid[row][col] === '1') {
        step += 1;
        dfs(row, col);
      }
    }
  }
  return step;
};

console.assert(
  numIslands([
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ]) === 3,
  1,
);
console.assert(
  numIslands([
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ]) === 1,
  2,
);
