/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  const visited = new Set();
  const v2 = new Set();
  const queue = [];
  const BFS = () => {
    while (queue.length) {
      const { length } = queue;
      for (let i = 0; i < length; i++) {
        const [row, col] = queue.shift();
        [
          [row, col - 1],
          [row, col + 1],
          [row + 1, col],
          [row - 1, col],
        ].forEach(([a, b]) => {
          const v = board[a]?.[b] ?? "X";
          if (v === "O" && !visited.has(`${a},${b}`)) {
            visited.add(`${a},${b}`);
            queue.push([a, b]);
          }
        });
      }
    }
  };
  const m = board.length;
  for (let i = 0; i < m; i++) {
    const n = board[i].length;
    for (let j = 0; j < n; j++) {
      if (
        !visited.has(`${i},${j}`) &&
        board[i][j] === "O" &&
        (i === 0 || i === m - 1 || j === 0 || j === n - 1)
      ) {
        // console.log(`${i},${j}`);
        visited.add(`${i},${j}`);
        queue.push([i, j]);
        BFS();
      } else if (board[i][j] === "O") {
        v2.add(`${i},${j}`);
      }
    }
  }
  // console.log(visited, v2);
  [...v2].forEach((item) => {
    if (visited.has(item)) {
      return;
    }
    const [a, b] = item.split(",");
    board[a][b] = "X";
  });
  return board;
};

var solve = function (board) {
  const m = board.length,
    n = board[0].length;
  function dfs(board, sx, sy) {
    if (sx < 0 || sy < 0 || sx >= m || sy >= n || board[sx][sy] != "O") {
      return;
    }
    //标记已访问
    board[sx][sy] = "#";
    dfs(board, sx + 1, sy);
    dfs(board, sx - 1, sy);
    dfs(board, sx, sy - 1);
    dfs(board, sx, sy + 1);
  }
  // 将第一行和最后一行关联的'O'变为"#"
  for (let i = 0; i < m; i++) {
    dfs(board, i, 0);
    dfs(board, i, n - 1);
  }
  // 将第一列和最后一列关联的'O'变为"#"
  for (let j = 0; j < n; j++) {
    dfs(board, 0, j);
    dfs(board, m - 1, j);
  }
  // 剩下的O都是应该被被替换掉的
  for (let i = 1; i < m - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      if (board[i][j] === "O") {
        board[i][j] = "X";
      }
    }
  }

  // 把所有字符#恢复为O
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === "#") {
        board[i][j] = "O";
      }
    }
  }
  return board;
};

console.log(
  solve([
    ["X", "X", "X", "X"],
    ["X", "O", "O", "X"],
    ["X", "X", "O", "X"],
    ["X", "O", "X", "X"],
    ["X", "O", "X", "X"],
  ])
);
/* [
  [ 'X', 'X', 'X', 'X' ],
  [ 'X', 'X', 'X', 'X' ],
  [ 'X', 'X', 'X', 'X' ],
  [ 'X', 'O', 'X', 'X' ],
  [ 'X', 'O', 'X', 'X' ]
] */

console.log(solve([["X"]])); // [["X"]]
