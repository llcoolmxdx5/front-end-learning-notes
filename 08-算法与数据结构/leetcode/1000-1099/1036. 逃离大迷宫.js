/**
 * @param {number[][]} blocked
 * @param {number[]} source
 * @param {number[]} target
 * @return {boolean}
 */

var isEscapePossible = function (blocked, source, target) {
  const BOUND = 1000000;
  const DIR = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  const max = (blocked.length * (blocked.length - 1)) / 2;
  const block = new Set();
  for (const b of blocked) {
    block.add(b.join());
  }
  const bfs = function (start, end) {
    const queue = [start];
    const explored = new Set();
    explored.add(start.join());
    for (let i = 0; i < queue.length && queue.length <= max; i++) {
      for (const [offsetX, offsetY] of DIR) {
        const px = queue[i][0] + offsetX;
        const py = queue[i][1] + offsetY;
        const point = [px, py];
        const hash = point.join();
        if (
          px >= 0 &&
          px < BOUND &&
          py >= 0 &&
          py < BOUND &&
          !block.has(hash) &&
          !explored.has(hash)
        ) {
          if (px == end[0] && py == end[1]) return true;
          explored.add(hash);
          queue.push(point);
        }
      }
    }
    return queue.length > max;
  };
  return bfs(source, target) && bfs(target, source);
};

console.assert(
  isEscapePossible(
    [
      [0, 1],
      [1, 0],
    ],
    [0, 0],
    [0, 2]
  ) === false,
  1
);
console.assert(isEscapePossible([], [0, 0], [999999, 999999]) === true, 2);
