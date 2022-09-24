import PriorityQueue from './Queue/PriorityQueue';
/**
 * @param {number[]} apples
 * @param {number[]} days
 * @return {number}
 */
var eatenApples = function (apples, days) {
  const pq = new PriorityQueue((a, b) => a[1] < b[1]);
  let ans = 0;
  let start = 0;
  const { length } = apples;
  while (start < length || !pq.isEmpty()) {
    if (start < length && apples[start]) {
      pq.offer([apples[start], days[start] + start]);
    }
    while (!pq.isEmpty()) {
      const [x, y] = pq.poll();
      if (y === start) {
        continue;
      }
      ans += 1;
      x > 1 && pq.offer([x - 1, y]);
      break;
    }
    start += 1;
  }
  return ans;
};

console.assert(eatenApples([1, 2, 3, 5, 2], [3, 2, 1, 4, 2]) === 7, 1);
console.assert(eatenApples([3, 0, 0, 0, 0, 2], [3, 0, 0, 0, 0, 2]) === 5, 2);
