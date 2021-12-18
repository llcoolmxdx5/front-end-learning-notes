/**
 * @param {character[][]} board
 * @return {number}
 */
var countBattleships = function (board) {
  const m = board.length;
  const n = board[0].length;
  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === "X") {
        if (board[i - 1]?.[j] === "X" || board[i]?.[j - 1] === "X") {
          continue;
        } else {
          res += 1;
        }
      }
    }
  }
  return res;
};

console.assert(
  countBattleships([
    ["X", ".", ".", "X"],
    [".", ".", ".", "X"],
    [".", ".", ".", "X"],
  ]) === 2,
  1
);
