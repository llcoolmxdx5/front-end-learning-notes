/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
  const set = new Set(candyType);
  return Math.min(set.size, candyType.length / 2);
};

console.assert(distributeCandies([1, 1, 2, 2, 3, 3]) === 3, 1);
console.assert(distributeCandies([1, 1, 2, 3]) === 2, 2);
console.assert(distributeCandies([1, 1]) === 1, 3);
