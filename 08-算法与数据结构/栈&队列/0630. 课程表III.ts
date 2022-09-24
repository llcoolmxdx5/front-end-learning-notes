import PriorityQueue from './Queue/PriorityQueue';

var scheduleCourse = function (courses: number[][]) {
  const arr = courses.sort((a, b) => a[1] - b[1]);
  const pq = new PriorityQueue((a, b) => b - a < 0);
  let total = 0;
  for (const [ti, di] of arr) {
    // console.log(ti, di, total);
    // console.log(pq.toString(), pq.peek());
    if (total + ti <= di) {
      total += ti;
      pq.offer(ti);
    } else if (!pq.isEmpty() && pq.peek() > ti) {
      total -= pq.poll() - ti;
      pq.offer(ti);
    }
  }
  return pq.size();
};

console.assert(
  scheduleCourse([
    [100, 200],
    [200, 1300],
    [1000, 1250],
    [2000, 3200],
  ]) === 3,
  1,
);
console.assert(scheduleCourse([[1, 2]]) === 1, 2);
console.assert(
  scheduleCourse([
    [3, 2],
    [4, 3],
  ]) === 0,
  3,
);
console.assert(
  scheduleCourse([
    [7, 17],
    [3, 12],
    [10, 20],
    [9, 10],
    [5, 20],
    [10, 19],
    [4, 18],
  ]) === 4,
  4,
);
console.assert(
  scheduleCourse([
    [1, 19],
    [2, 2],
    [1, 17],
  ]) === 3,
  5,
);
