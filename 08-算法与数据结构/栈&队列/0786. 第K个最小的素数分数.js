import PriorityQueue from './Queue/PriorityQueue';

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var kthSmallestPrimeFraction = function (arr, k) {
  const pq = new PriorityQueue((a, b) => arr[a[0]] * arr[b[1]] < arr[a[1]] * arr[b[0]]);
  const { length } = arr;
  for (let i = 1; i < length; i++) {
    pq.offer([0, i]);
  }
  let cur;
  for (let r = 0; r < k; r++) {
    cur = pq.poll();
    const [i, j] = cur;
    if (i < j - 1) {
      pq.offer([i + 1, j]);
    }
  }
  return [arr[cur[0]], arr[cur[1]]];
};

console.assert(kthSmallestPrimeFraction([1, 2, 3, 5], 3).join() === '2,5', 1);
console.assert(kthSmallestPrimeFraction([1, 7], 1).join() === '1,7', 2);
console.assert(kthSmallestPrimeFraction([1, 13, 17, 59], 6).join() === '13,17', 3);
