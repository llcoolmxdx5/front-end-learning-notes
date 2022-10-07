/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const m = board.length;
  const n = board[0].length;

  const used = new Array(m); // 二维矩阵used，存放bool值
  for (let i = 0; i < m; i++) {
    used[i] = new Array(n);
  }

  const bfs = (row, col, index) => {
    if (index === word.length - 1) {
      return true;
    }
    used[row][col] = true;
    const arr = [
      [row, col + 1],
      [row, col - 1],
      [row - 1, col],
      [row + 1, col],
    ];
    let flag = false;
    for (let i = 0; i < arr.length; i++) {
      const [r, c] = arr[i];
      if (r < 0 || r >= m || c < 0 || c >= n) {
        // 当前点越界
        continue;
      }
      const value = board[r][c];
      if (used[r][c] || value !== word[index + 1]) {
        continue;
      }
      flag = bfs(r, c, index + 1);
      if (flag) {
        break;
      }
    }
    used[row][col] = false;
    return flag;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0] && bfs(i, j, 0)) {
        return true;
      }
    }
  }
  return false;
};

var exist = (board, word) => {
  const m = board.length;
  const n = board[0].length;
  const used = new Array(m); // 二维矩阵used，存放bool值
  for (let i = 0; i < m; i++) {
    used[i] = new Array(n);
  }
  // canFind 判断当前点是否是目标路径上的点
  const canFind = (row, col, i) => {
    // row col 当前点的坐标，i当前考察的word字符索引
    if (i == word.length) {
      // 递归的出口 i越界了就返回true
      return true;
    }
    if (row < 0 || row >= m || col < 0 || col >= n) {
      // 当前点越界 返回false
      return false;
    }
    if (used[row][col] || board[row][col] != word[i]) {
      // 当前点已经访问过，或，非目标点
      return false;
    }
    // 排除掉所有false的情况，当前点暂时没毛病，可以继续递归考察
    used[row][col] = true; // 记录一下当前点被访问了
    // canFindRest：基于当前选择的点[row,col]，能否找到剩余字符的路径。
    const canFindRest =
      canFind(row + 1, col, i + 1) ||
      canFind(row - 1, col, i + 1) ||
      canFind(row, col + 1, i + 1) ||
      canFind(row, col - 1, i + 1);

    if (canFindRest) {
      // 基于当前点[row,col]，可以为剩下的字符找到路径
      return true;
    }
    used[row][col] = false; // 不能为剩下字符找到路径，返回false，撤销当前点的访问状态
    return false;
  };

  for (let i = 0; i < m; i++) {
    // 遍历找起点，作为递归入口
    for (let j = 0; j < n; j++) {
      if (board[i][j] == word[0] && canFind(i, j, 0)) {
        // 找到起点且递归结果为真，找到目标路径
        return true;
      }
    }
  }
  return false; // 怎么样都没有返回true，则返回false
};

console.assert(
  exist(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    'ABCCED',
  ) === true,
  1,
);

console.assert(
  exist(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    'SEE',
  ) === true,
  2,
);

console.assert(
  exist(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    'ABCB',
  ) === false,
  3,
);

console.assert(
  exist(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'E', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    'ABCESEEEFS',
  ) === true,
  4,
);
