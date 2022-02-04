/**
 * @param {number[][]} rectangles
 * @return {number}
 */
var countGoodRectangles = function (rectangles) {
  let ans = 0;
  let maxLen = 0;
  for (const [li, wi] of rectangles) {
    const max = Math.min(li, wi);
    if (max > maxLen) {
      maxLen = max;
      ans = 1;
    } else if (max === maxLen) {
      ans += 1;
    }
  }
  return ans;
};

console.assert(
  countGoodRectangles([
    [5, 8],
    [3, 9],
    [5, 12],
    [16, 5],
  ]) === 3,
  1
);
console.assert(
  countGoodRectangles([
    [2, 3],
    [3, 7],
    [4, 3],
    [3, 7],
  ]) === 3,
  2
);
