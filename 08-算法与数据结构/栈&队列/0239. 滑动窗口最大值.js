/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const arr = nums.slice(0, k);
  const res = [Math.max(...arr)];
  for (let i = k; i < nums.length; i++) {
    arr.shift();
    arr.push(nums[i]);
    res.push(Math.max(...arr));
  }
  return res;
};

import PriorityQueue from './Queue/PriorityQueue';

var maxSlidingWindow = function (nums, k) {
  const priorityQueue = new PriorityQueue((a, b) => a[0] > b[0]);
  for (let i = 0; i < k; i++) {
    priorityQueue.offer([nums[i], i]);
  }
  const res = [priorityQueue.peek()[0]];
  for (let i = k; i < nums.length; i++) {
    priorityQueue.offer([nums[i], i]);
    while (priorityQueue.peek()[1] <= i - k) {
      priorityQueue.poll();
    }
    res.push(priorityQueue.peek()[0]);
  }
  // console.log(res);
  return res;
};

var maxSlidingWindow = function (nums, k) {
  const n = nums.length;
  const q = [];
  for (let i = 0; i < k; i++) {
    while (q.length && nums[i] >= nums[q.at(-1)]) {
      q.pop();
    }
    q.push(i);
  }

  const ans = [nums[q[0]]];
  for (let i = k; i < n; i++) {
    while (q.length && nums[i] >= nums[q.at(-1)]) {
      q.pop();
    }
    q.push(i);
    while (q[0] <= i - k) {
      q.shift();
    }
    ans.push(nums[q[0]]);
  }
  return ans;
};

console.assert(
  maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3).join() === [3, 3, 5, 5, 6, 7].join(),
  1,
);
