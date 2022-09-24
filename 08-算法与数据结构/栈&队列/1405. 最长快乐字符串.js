import PriorityQueue from './Queue/PriorityQueue';

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {string}
 */
var longestDiverseString = function (a, b, c) {
  const pq = new PriorityQueue((a, b) => a[1] > b[1]);
  pq.offer(['a', a]);
  pq.offer(['b', b]);
  pq.offer(['c', c]);
  let ans = '';
  while (pq.peek()[1]) {
    const [str, count] = pq.poll();
    if (ans[ans.length - 1] !== str) {
      if (count >= 2) {
        ans += str.repeat(2);
        pq.offer([str, count - 2]);
      } else if (count === 1) {
        ans += str;
        pq.offer([str, 0]);
      }
    } else {
      const [str1, count1] = pq.poll();
      if (count1 >= 2) {
        ans += str1.repeat(2);
        pq.offer([str1, count1 - 2]);
      } else if (count1 === 1) {
        ans += str1;
        pq.offer([str1, 0]);
      } else {
        break;
      }
      pq.offer([str, count]);
    }
  }
  return ans;
};

var longestDiverseString = function (a, b, c) {
  const res = [];
  const arr = [
    [a, 'a'],
    [b, 'b'],
    [c, 'c'],
  ];

  while (true) {
    arr.sort((a, b) => b[0] - a[0]);
    let hasNext = false;
    for (const [i, [c, ch]] of arr.entries()) {
      if (c <= 0) {
        break;
      }
      const m = res.length;
      if (m >= 2 && res[m - 2] === ch && res[m - 1] === ch) {
        continue;
      }
      hasNext = true;
      res.push(ch);
      arr[i][0]--;
      break;
    }
    if (!hasNext) {
      break;
    }
  }

  return res.join('');
};

console.assert(longestDiverseString(1, 1, 7) === 'ccaccbcc', 1);
console.assert(longestDiverseString(2, 2, 1) === 'aabbc', 2);
