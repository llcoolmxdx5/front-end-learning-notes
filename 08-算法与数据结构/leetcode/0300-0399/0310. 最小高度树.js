/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  if (edges.length === 1) return [0, 1];
  function dfs(G, u, visited) {
    let max = 0;
    visited[u] = 1;
    // 找到最大高度
    for (let i = 0; i < G[u].length; i++) {
      const v = G[u][i];
      let deep = 0;
      if (!visited[v]) {
        deep += dfs(G, v, visited) + 1;
        max = Math.max(max, deep);
      }
    }
    return max;
  }

  const G = new Array(n).fill(0).map(() => []);

  for (const [u, v] of edges) {
    G[u].push(v);
    G[v].push(u);
  }

  const res = [];
  let min = 20000;
  for (let i = 0; i < n; i++) {
    if (G[i].length === 1) {
      res.push(20001); // 剪枝，根不可能是叶节点
    } else {
      const S = new Array(n).fill(0);
      const deep = dfs(G, i, S);
      res.push(deep);
      min = Math.min(min, deep);
    }
  }

  return res.map((v, i) => (v === min ? i : -1)).filter(v => v > -1);
};

var findMinHeightTrees = function (n, edges) {
  // 处理边界
  if (n === 1) return [0];

  // 建图，并维护一个度数组
  const G = new Array(n).fill(0).map(() => []);
  const Deg = new Array(n).fill(0);
  for (const [u, v] of edges) {
    G[u].push(v), Deg[u]++;
    G[v].push(u), Deg[v]++;
  }

  // 维护一个叶节点队列
  const Q = [];
  for (let i = 0; i < n; i++) {
    if (Deg[i] === 1) Q.push(i);
  }

  // 剪去叶节点
  let res;
  while (Q.length > 0) {
    res = [];
    // 注意：size 是惰性的，是为了按 “层” 剪去叶节点
    const size = Q.length;
    for (let i = 0; i < size; i++) {
      const u = Q.shift();
      res.push(u);
      // 同时更新相邻节点的度
      for (const v of G[u]) {
        Deg[v]--;
        if (Deg[v] === 1) Q.push(v);
      }
    }
  }

  return res;
};

console.assert(
  findMinHeightTrees(4, [
    [1, 0],
    [1, 2],
    [1, 3],
  ]).join() === [1].join(),
  1,
);

console.assert(
  findMinHeightTrees(6, [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 4],
    [5, 4],
  ]).join() === [3, 4].join(),
  2,
);
