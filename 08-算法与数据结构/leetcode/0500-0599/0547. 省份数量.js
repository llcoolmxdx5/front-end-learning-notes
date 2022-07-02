import UnionFind from '../../algorithms/unionFind';

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
  const visited = new Set();
  const m = isConnected.length;
  const dfs = i => {
    for (let j = 0; j < m; j++) {
      if (isConnected[i][j] === 1 && !visited.has(j)) {
        visited.add(j);
        dfs(j);
      }
    }
  };
  let step = 0;
  for (let i = 0; i < m; i++) {
    if (!visited.has(i)) {
      step += 1;
      dfs(i);
    }
  }
  return step;
};

var findCircleNum = function (isConnected) {
  const provinces = isConnected.length;
  const visited = new Set();
  let circles = 0;
  const queue = new Array();
  for (let i = 0; i < provinces; i++) {
    if (!visited.has(i)) {
      queue.push(i);
      while (queue.length) {
        const j = queue.shift();
        visited.add(j);
        for (let k = 0; k < provinces; k++) {
          if (isConnected[j][k] === 1 && !visited.has(k)) {
            queue.push(k);
          }
        }
      }
      circles++;
    }
  }
  return circles;
};

var findCircleNum = function (isConnected) {
  const n = isConnected.length;
  const unionFind = new UnionFind(n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      isConnected[i][j] && unionFind.union(i, j);
    }
  }
  return unionFind.size;
};

console.assert(
  findCircleNum([
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ]) === 2,
  1,
);
console.assert(
  findCircleNum([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]) == 3,
  2,
);

console.assert(
  findCircleNum([
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
  ]) === 1,
  3,
);
