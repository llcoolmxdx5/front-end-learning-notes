import PriorityQueue from './Queue/PriorityQueue';

function kSmallestPairs(nums1: number[], nums2: number[], k: number): [number, number][] {
  // 大顶堆
  const compare = (a: [number, number], b: [number, number]) => a[0] + a[1] > b[0] + b[1];
  const pq = new PriorityQueue<[number, number]>(compare);
  for (let i = 0, len1 = nums1.length; i < len1; i++) {
    for (let j = 0, len2 = nums2.length; j < len2; j++) {
      const sum = nums1[i] + nums2[j];
      let heapPeekSum: number;
      const peek = pq.peek();
      if (peek) {
        heapPeekSum = peek[0] + peek[1];
      } else {
        heapPeekSum = Number.MIN_SAFE_INTEGER;
      }
      if (pq.size() >= k) {
        if (sum >= heapPeekSum) {
          break;
        }
        pq.poll();
      }
      pq.offer([nums1[i], nums2[j]]);
    }
  }
  const ans: [number, number][] = [];
  while (pq.size()) {
    ans.push(pq.poll());
  }
  return ans.reverse();
}

console.log(kSmallestPairs([1, 7, 11], [2, 4, 6], 3)); // [1,2],[1,4],[1,6]
console.log(kSmallestPairs([1, 1, 2], [1, 2, 3], 2)); // [1,1],[1,1]
console.log(kSmallestPairs([1, 2], [3], 3)); // [1,3],[2,3]
