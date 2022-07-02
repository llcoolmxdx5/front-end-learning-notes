/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const ans = [];
  let left = intervals[0][0];
  let right = -1;
  for (const [start, end] of intervals) {
    if (start <= right || right < 0) {
      right = Math.max(end, right);
    } else {
      ans.push([left, right]);
      left = start;
      right = end;
    }
    // console.log(a, b);
  }
  ans.push([left, right]);
  // console.log(ans);
  return ans;
};

console.assert(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ]).join() ===
    [
      [1, 6],
      [8, 10],
      [15, 18],
    ].join(),
  1,
);
console.assert(
  merge([
    [1, 4],
    [4, 5],
  ]).join() === [[1, 5]].join(),
  2,
);
merge([[0, 0]]);
