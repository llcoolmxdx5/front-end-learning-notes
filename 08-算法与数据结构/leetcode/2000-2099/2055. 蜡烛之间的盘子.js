/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var platesBetweenCandles = function (s, queries) {
  const res = [];
  for (const [left, right] of queries) {
    let count = 0,
      temp = 0,
      flag = false;
    for (let index = left; index <= right; index++) {
      const element = s[index];
      if (flag && element === "*") {
        count += 1;
      } else if (!flag && element === "|") {
        flag = true;
      }
      if (element === "|") {
        temp = index;
      }
    }
    if (count) {
      count -= right - temp;
    }
    res.push(count);
  }
  return res;
};

var platesBetweenCandles = function (s, queries) {
  const n = s.length;
  const preSum = new Array(n).fill(0);
  for (let i = 0, sum = 0; i < n; i++) {
    if (s[i] === "*") {
      sum++;
    }
    preSum[i] = sum;
  }
  const left = new Array(n).fill(0);
  for (let i = 0, l = -1; i < n; i++) {
    if (s[i] === "|") {
      l = i;
    }
    left[i] = l;
  }
  const right = new Array(n).fill(0);
  for (let i = n - 1, r = -1; i >= 0; i--) {
    if (s[i] === "|") {
      r = i;
    }
    right[i] = r;
  }
  const ans = new Array(queries.length).fill(0);
  for (let i = 0; i < queries.length; i++) {
    const [l, r] = queries[i];
    const x = right[l],
      y = left[r];
    ans[i] = x === -1 || y === -1 || x >= y ? 0 : preSum[y] - preSum[x];
  }
  // console.log(preSum, left, right);
  // console.log(ans);
  return ans;
};

console.assert(
  platesBetweenCandles("**|**|***|", [
    [2, 5],
    [5, 9],
  ]).join() === [2, 3].join(),
  1
);
console.assert(
  platesBetweenCandles("***|**|*****|**||**|*", [
    [1, 17],
    [4, 5],
    [14, 17],
    [5, 11],
    [15, 16],
  ]).join() === [9, 0, 0, 0, 0].join(),
  2
);
