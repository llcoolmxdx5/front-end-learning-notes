/**
 * @param {number[][]} edges
 * @param {number[]} patience
 * @return {number}
 */
var networkBecomesIdle = function (edges, patience) {
  const { length } = patience;
  const graph = new Map();
  for (const [ui, vi] of edges) {
    graph.get(ui) ? graph.get(ui).push(vi) : graph.set(ui, [vi]);
    graph.get(vi) ? graph.get(vi).push(ui) : graph.set(vi, [ui]);
  }
  const distance = new Array(length).fill(-1);
  distance[0] = 0;
  let queue = [0],
    cost = 0;
  while (queue.length) {
    cost += 1;
    next = [];
    for (const server of queue) {
      for (const other of graph.get(server)) {
        if (distance[other] === -1) {
          distance[other] = cost;
          next.push(other);
        }
      }
    }
    queue = next;
  }
  let ans = 0;
  // console.log(distance);
  for (let i = 1; i < length; i++) {
    const t = patience[i];
    const d = distance[i] * 2;
    ans = Math.max(ans, Math.floor((d - 1) / t) * t + d);
  }
  return ans + 1;
};

console.assert(
  networkBecomesIdle(
    [
      [0, 1],
      [1, 2],
    ],
    [0, 2, 1]
  ) === 8,
  1
);
console.assert(
  networkBecomesIdle(
    [
      [0, 1],
      [0, 2],
      [1, 2],
    ],
    [0, 10, 10]
  ) === 3,
  2
);
console.assert(
  networkBecomesIdle(
    [
      [5, 7],
      [15, 18],
      [12, 6],
      [5, 1],
      [11, 17],
      [3, 9],
      [6, 11],
      [14, 7],
      [19, 13],
      [13, 3],
      [4, 12],
      [9, 15],
      [2, 10],
      [18, 4],
      [5, 14],
      [17, 5],
      [16, 2],
      [7, 1],
      [0, 16],
      [10, 19],
      [1, 8],
    ],
    [0, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1]
  ) === 67,
  3
);
