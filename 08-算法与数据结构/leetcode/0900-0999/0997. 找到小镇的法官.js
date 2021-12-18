/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
  if (trust.length < n - 1) {
    return -1;
  }
  const inDegrees = new Array(n + 1).fill(0);
  const outDegrees = new Array(n + 1).fill(0);
  for (let i = 0, len = trust.length; i < len; i++) {
    const [x, y] = trust[i];
    inDegrees[y] += 1;
    outDegrees[x] += 1;
  }
  for (let i = 1; i <= n; i++) {
    if (outDegrees[i] === 0 && inDegrees[i] === n - 1) {
      return i;
    }
  }
  return -1;
};

console.assert(findJudge(2, [[1, 2]]) === 2, 1);
console.assert(
  findJudge(3, [
    [1, 3],
    [2, 3],
  ]) === 3,
  2
);
console.assert(
  findJudge(3, [
    [1, 3],
    [2, 3],
    [3, 1],
  ]) === -1,
  3
);
console.assert(
  findJudge(3, [
    [1, 2],
    [2, 3],
  ]) === -1,
  4
);
console.assert(
  findJudge(4, [
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [4, 3],
  ]) === 3,
  5
);
