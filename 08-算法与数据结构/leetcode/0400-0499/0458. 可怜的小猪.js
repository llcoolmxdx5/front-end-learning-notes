/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */
var poorPigs = function (buckets, minutesToDie, minutesToTest) {
  const radix = Math.floor(minutesToTest / minutesToDie) + 1;
  return Math.ceil(Math.log(buckets) / Math.log(radix));
};

console.assert(poorPigs(1000, 15, 60) === 5, 1);
console.assert(poorPigs(4, 15, 15) === 2, 2);
console.assert(poorPigs(4, 15, 30) === 2, 3);
console.assert(poorPigs(1, 15, 15) === 0, 4);
console.assert(poorPigs(2, 15, 15) === 1, 5);
