/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const result = [];
  const backTrack = (start, track) => {
    if (k === track.length) {
      result.push([...track]);
      return;
    }
    for (let i = start; i <= n; i++) {
      track.push(i);
      backTrack(i + 1, track);
      track.pop();
    }
  };
  backTrack(1, []);
  return result;
};

console.log(combine(4, 2));
/* [
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
] */

console.log(combine(1, 1)); // [[1]]
