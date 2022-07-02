/**
 * @param {number} n
 * @param {number[][]} lamps
 * @param {number[][]} queries
 * @return {number[]}
 */
var gridIllumination = function (n, lamps, queries) {
  const row = new Map();
  const col = new Map();
  const diagonal = new Map();
  const antiDiagonal = new Map();
  const points = new Set();
  for (const [x, y] of lamps) {
    const hash = [x, y].join();
    if (points.has(hash)) {
      continue;
    }
    points.add(hash);
    row.set(x, (row.get(x) || 0) + 1);
    col.set(y, (col.get(y) || 0) + 1);
    diagonal.set(x - y, (diagonal.get(x - y) || 0) + 1);
    antiDiagonal.set(x + y, (antiDiagonal.get(x + y) || 0) + 1);
  }
  const ans = [];
  for (const [x, y] of queries) {
    if (row.get(x) || col.get(y) || diagonal.get(x - y) || antiDiagonal.get(x + y)) {
      ans[ans.length] = 1;
    } else {
      ans[ans.length] = 0;
    }
    [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ].forEach(([a, b]) => {
      if (a < 0 || a >= n || b < 0 || b >= n) {
        return;
      }
      const hash = [a, b].join();
      if (!points.has(hash)) {
        return;
      }
      points.delete(hash);
      row.get(a) && row.set(a, row.get(a) - 1);
      col.get(b) && col.set(b, col.get(b) - 1);
      diagonal.get(a - b) && diagonal.set(a - b, diagonal.get(a - b) - 1);
      antiDiagonal.get(a + b) && antiDiagonal.set(a + b, antiDiagonal.get(a + b) - 1);
    });
  }
  return ans;
};

console.assert(
  gridIllumination(
    5,
    [
      [0, 0],
      [4, 4],
    ],
    [
      [1, 1],
      [1, 0],
    ],
  ).join() === [1, 0].join(),
  1,
);

console.assert(
  gridIllumination(
    10,
    [
      [1, 8],
      [4, 0],
    ],
    [
      [0, 8],
      [8, 1],
    ],
  ).join() === [1, 0].join(),
  2,
);
