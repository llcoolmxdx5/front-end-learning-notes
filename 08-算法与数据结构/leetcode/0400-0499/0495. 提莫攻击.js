/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function (timeSeries, duration) {
  const { length } = timeSeries;
  let sum = duration;
  for (let i = 0; i < length - 1; i++) {
    sum += Math.min(timeSeries[i + 1] - timeSeries[i], duration);
  }
  return sum;
};

console.assert(findPoisonedDuration([1, 4], 2) === 4, 1);
console.assert(findPoisonedDuration([1, 2], 2) === 3, 2);
