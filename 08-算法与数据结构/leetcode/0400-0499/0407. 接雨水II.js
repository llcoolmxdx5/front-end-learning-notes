import PriorityQueue from '../../datastructure/Queue/PriorityQueue';

/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function (heightMap) {
  const m = heightMap.length;
  const n = heightMap[0].length;
  if (m < 3 || n < 3) {
    return 0;
  }
  let ans = 0;
  const pq = new PriorityQueue((a, b) => a.height - b.height < 0);
  const visited = new Array(m).fill(0).map(_ => new Array(n).fill(false));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
        visited[i][j] = true;
        pq.offer({ height: heightMap[i][j], row: i, col: j });
      }
    }
  }
  const dirX = [0, 0, 1, -1];
  const dirY = [1, -1, 0, 0];
  while (!pq.isEmpty()) {
    const { height, row, col } = pq.poll();
    for (let k = 0; k < 4; k++) {
      const nx = row + dirX[k];
      const ny = col + dirY[k];
      if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited[nx][ny]) {
        if (heightMap[nx][ny] < height) {
          ans += height - heightMap[nx][ny];
        }
        visited[nx][ny] = true;
        pq.offer({
          height: Math.max(heightMap[nx][ny], height),
          row: nx,
          col: ny,
        });
      }
    }
  }
  return ans;
};

console.assert(
  trapRainWater([
    [12, 13, 1, 12],
    [13, 4, 13, 12],
    [13, 8, 10, 12],
    [12, 13, 12, 12],
    [13, 13, 13, 13],
  ]) === 14,
  3,
);

console.assert(
  trapRainWater([
    [1, 4, 3, 1, 3, 2],
    [3, 2, 1, 3, 2, 4],
    [2, 3, 3, 2, 3, 1],
  ]) === 4,
  1,
);
console.assert(
  trapRainWater([
    [3, 3, 3, 3, 3],
    [3, 2, 2, 2, 3],
    [3, 2, 1, 2, 3],
    [3, 2, 2, 2, 3],
    [3, 3, 3, 3, 3],
  ]) === 10,
  2,
);
