/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
var findMinStep = function (board, hand) {
  const combine = (board) => {
    for (let slow = (fast = 0); fast <= board.length; fast++) {
      if (board[slow] === board[fast]) continue;
      if (fast - slow > 2) {
        board = board.slice(0, slow) + board.slice(fast);
        fast = 0;
      }
      slow = fast;
    }
    return board;
  };
  const visited = new Set();
  let r = 6; // hand.length <= 5
  const dfs = (board, hand, count) => {
    if (board.length === 0) return (r = Math.min(r, count));
    if (hand.length === 0 || visited.has(board + count)) return;
    visited.add(board + count);
    for (let i = 0; i < board.length; i++)
      for (let j = 0; j < hand.length; j++) {
        let newBoard = board.slice(0, i) + hand[j] + board.slice(i);
        if (board[i - 1] === hand[j] && hand[j] === board[i]) {
          newBoard = combine(newBoard);
        }
        dfs(newBoard, hand.slice(0, j) + hand.slice(j + 1), count + 1);
      }
  };
  dfs(board, hand, 0);
  return r === 6 ? -1 : r;
};

console.assert(findMinStep("WRRBBW", "RB") === -1, 1);
console.assert(findMinStep("WWRRBBWW", "WRBRW") === 2, 2);
console.assert(findMinStep("G", "GGGGG") === 2, 3);
console.assert(findMinStep("RBYYBBRRB", "YRBGB") === 3, 4);
console.assert(findMinStep("RRWWRRWWRR", "WW") === 2, 5);
