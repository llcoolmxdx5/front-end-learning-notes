/**
 * @param {string[]} board
 * @return {boolean}
 */
var validTicTacToe = function (board) {
  const win = (p) => {
    for (let i = 0; i < 3; ++i) {
      if (p === board[0][i] && p === board[1][i] && p === board[2][i]) {
        return true;
      }
      if (p === board[i][0] && p === board[i][1] && p === board[i][2]) {
        return true;
      }
    }
    if (p === board[0][0] && p === board[1][1] && p === board[2][2]) {
      return true;
    }
    if (p === board[0][2] && p === board[1][1] && p === board[2][0]) {
      return true;
    }
    return false;
  };
  let xCount = 0;
  let oCount = 0;
  let xWin = win('X'); // x 赢
  let oWin = win('O'); // o 赢
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const value = board[i][j];
      if (value === 'X') {
        xCount += 1;
      } else if (value === 'O') {
        oCount += 1;
      }
    }
  }
  console.log(xCount, oCount, xWin, oWin);
  if (xCount !== oCount && xCount !== oCount + 1) {
    return false;
  }
  if (xWin && xCount - oCount !== 1) {
    return false;
  }
  if (oWin && oCount - xCount !== 0) {
    return false;
  }
  return true;
};

console.assert(validTicTacToe(['XXX', '   ', 'OOO']) === false, 1);
console.assert(validTicTacToe(['O  ', '   ', '   ']) === false, 2);
console.assert(validTicTacToe(['XOX', 'O O', 'XOX']) === true, 3);
console.assert(validTicTacToe(['XXX', 'OOX', 'OOX']) === true, 4);
console.assert(validTicTacToe(['XXX', 'XOO', 'OO ']) === false, 5);
// xxx
// xoo
// oo
