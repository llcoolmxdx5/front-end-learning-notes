/**
 * @param {number} n
 * @return {number[]}
 */
var lexicalOrder = function (n) {
  const ans = [];
  const dfs = (cur) => {
    if (cur > n) return;
    ans.push(cur);
    for (let i = 0; i <= 9; i++) {
      dfs(cur * 10 + i);
    }
  };
  for (let i = 1; i < 10; i++) {
    dfs(i);
  }
  // console.log(ans);
  return ans;
};

var lexicalOrder = function (n) {
  const ans = [];
  for (let i = 0, j = 1; i < n; i++) {
    ans.push(j);
    if (j * 10 <= n) {
      j = j * 10;
    } else {
      while (j + 1 > n || j % 10 === 9) {
        j = Math.floor(j / 10);
      }
      j += 1;
    }
  }
  // console.log(ans);
  return ans;
};

console.assert(
  lexicalOrder(13).join() ===
    [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9].join(),
  1
);
