/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} ops
 * @return {number}
 */
var maxCount = function (m, n, ops) {
  const { length } = ops;
  let minA = m;
  let minB = n;
  for (let i = 0; i < length; i++) {
    const op = ops[i]
    minA = Math.min(op[0], minA);
    minB = Math.min(op[1], minB);
  }
  return minA * minB;
};

console.assert(
  maxCount(3, 3, [
    [2, 2],
    [3, 3],
  ]) === 4,
  1
);

console.assert(maxCount(3, 3, []) === 9, 2);
