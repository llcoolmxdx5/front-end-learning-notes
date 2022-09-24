/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0); // 入度表
  const map = new Map(); // 邻接表 后续课程
  for (const [a, b] of prerequisites) {
    inDegree[a]++;
    map.set(b, [...(map.get(b) ?? []), a]);
  }
  let queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }
  while (queue.length) {
    const newQueue = [];
    for (const selected of queue) {
      const toEnQueue = map.get(selected) ?? []; // 获取这门课对应的后续课
      for (let i = 0; i < toEnQueue.length; i++) {
        const toEnQueueItem = toEnQueue[i];
        inDegree[toEnQueueItem] -= 1; // 依赖它的后续课的入度-1
        if (inDegree[toEnQueueItem] === 0) {
          // 如果因此减为0，入列
          newQueue.push(toEnQueueItem);
        }
      }
    }
    queue = newQueue;
  }
  // console.log(inDegree);
  return inDegree.every(x => x === 0);
};

console.assert(canFinish(2, [[1, 0]]) === true, 1);

console.assert(
  canFinish(2, [
    [1, 0],
    [0, 1],
  ]) === false,
  2,
);

console.assert(
  canFinish(3, [
    [1, 0],
    [1, 2],
    [0, 1],
  ]) === false,
  3,
);

console.assert(
  canFinish(4, [
    [0, 1],
    [3, 1],
    [1, 3],
    [3, 2],
  ]) === false,
  4,
);

console.assert(
  canFinish(5, [
    [1, 4],
    [2, 4],
    [3, 1],
    [3, 2],
  ]) === true,
  5,
);
