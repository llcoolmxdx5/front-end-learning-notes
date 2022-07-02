/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
  const arr = [];
  for (const timePoint of timePoints) {
    const [hour, minute] = timePoint.split(':').map((str) => parseInt(str));
    arr.push(hour * 60 + minute);
  }
  const { length } = arr;
  if (length > 1440) {
    return 0;
  }
  arr.sort((a, b) => a - b);
  let diff = 1440;
  for (let i = 1; i < length; i++) {
    diff = Math.min(diff, arr[i] - arr[i - 1]);
  }
  return Math.min(diff, arr[0] + 1440 - arr[length - 1]);
};

console.assert(findMinDifference(['23:59', '00:00']) === 1, 1);
