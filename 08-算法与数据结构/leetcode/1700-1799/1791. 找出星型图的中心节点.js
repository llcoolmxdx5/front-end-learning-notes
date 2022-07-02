/**
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function (edges) {
  const set = new Set(edges[0]);
  const [a, b] = edges[1];
  if (set.has(a)) {
    return a;
  }
  return b;
};
