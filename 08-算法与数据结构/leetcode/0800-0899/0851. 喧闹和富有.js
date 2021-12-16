/**
 * @param {number[][]} richer
 * @param {number[]} quiet
 * @return {number[]}
 */
var loudAndRich = function (richer, quiet) {
  const dfs = (index, graph, ans) => {
    if (ans[index] !== -1) {
      return;
    }
    ans[index] = index;
    for (const y of graph[index]) {
      dfs(y, graph, ans);
      if (quiet[ans[y]] < quiet[ans[index]]) {
        ans[index] = ans[y];
      }
    }
  };
  const { length } = quiet;
  const graph = Array.from({ length }, () => []);
  for (const [ai, bi] of richer) {
    graph[bi].push(ai);
  }
  // console.log(graph);
  const ans = new Array(length).fill(-1);
  for (let i = 0; i < length; i++) {
    dfs(i, graph, ans);
  }
  // console.log(ans);
  return ans;
};

import Queue from "../../datastructure/Queue/Queue";

var loudAndRich = (richer, quiet) => {
  // 拓扑排序：取入度为0的先入队，减少它下游节点的入度，如果为0了也入队，直到队列中没有元素为止
  const n = quiet.length;
  // 先整理入度表和邻接表
  const inDegree = new Array(n).fill(0);
  const graph = Array.from({ length: n }, () => []);
  for (const r of richer) {
    inDegree[r[1]] += 1;
    graph[r[0]].push(r[1]);
  }
  // 初始化 ans 各位为自己
  // 题目说的是：在所有拥有的钱肯定不少于 person x 的人中，person y 是最安静的人
  // 注意这里的不少于，说明可以是自己
  const ans = Array.from({ length: n }, (_, index) => index);
  // 拓扑排序开始
  const queue = new Queue();
  for (let i = 0; i < n; i++) {
    if (inDegree[i] == 0) {
      queue.enqueue(i);
    }
  }
  while (!queue.isEmpty()) {
    const p = queue.dequeue();
    // q 是 p 的下游，也就是 p 比 q 有钱
    for (const q of graph[p]) {
      // 如果p的安静值比q小，更新p的安静值对应的那个人
      // 注意这里p的安静值，并不是原始的quiet数组中的quiet[p]
      // 而是已经更新后的安静值，所以，应该取quiet[ans[p]]
      // 这里没有改变原来数组的内容，而是通过ans[p]间接引用的，细细品一下
      // 想像一下上图中的3的安静值被更新成了5的1
      if (quiet[ans[p]] < quiet[ans[q]]) {
        ans[q] = ans[p];
      }
      inDegree[q] -= 1;
      if (inDegree[q] === 0) {
        queue.enqueue(q);
      }
    }
  }
  return ans;
};

var loudAndRich = (richer, quiet) => {
  // 拓扑排序：取入度为0的先入队，减少它下游节点的入度，如果为0了也入队，直到队列中没有元素为止
  const n = quiet.length;
  // 先整理入度表和邻接表
  const inDegree = new Array(n).fill(0);
  const graph = Array.from({ length: n }, () => new Array(n).fill(false));
  for (const r of richer) {
    inDegree[r[1]] += 1;
    graph[r[0]][r[1]] = true;
  }
  // 初始化ans各位为自己
  // 题目说的是：在所有拥有的钱肯定不少于 person x 的人中，person y 是最安静的人
  // 注意这里的不少于，说明可以是自己
  const ans = Array.from({ length: n }, (_, index) => index);
  // 拓扑排序开始
  const queue = new Array(n).fill(0);
  let enter = 0,
    out = 0;
  for (let i = 0; i < n; i++) {
    if (inDegree[i] == 0) {
      queue[enter] = i;
      enter += 1;
    }
  }
  while (out < enter) {
    const p = queue[out];
    // q是p的下游，也就是p比q有钱
    for (let q = 0; q < graph[p].length; q++) {
      if (graph[p][q]) {
        // 如果p的安静值比q小，更新p的安静值对应的那个人
        // 注意这里p的安静值，并不是原始的quiet数组中的quiet[p]
        // 而是已经更新后的安静值，所以，应该取quiet[ans[p]]
        // 这里没有改变原来数组的内容，而是通过ans[p]间接引用的，细细品一下
        if (quiet[ans[p]] < quiet[ans[q]]) {
          ans[q] = ans[p];
        }
        inDegree[q] -= 1;
        if (inDegree[q] == 0) {
          queue[enter] = q;
          enter += 1;
        }
      }
    }
    out += 1;
  }
  return ans;
};

console.assert(
  loudAndRich(
    [
      [1, 0],
      [2, 1],
      [3, 1],
      [3, 7],
      [4, 3],
      [5, 3],
      [6, 3],
    ],
    [3, 2, 5, 4, 6, 1, 7, 0]
  ).join() === [5, 5, 2, 5, 4, 5, 6, 7].join(),
  1
);
console.assert(loudAndRich([], [0]).join() === [0].join(), 2);
