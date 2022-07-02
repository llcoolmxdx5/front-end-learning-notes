const binarySearch = (nums, target, lower) => {
  let left = 0,
    right = nums.length - 1;
  let ans = nums.length;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > target || (lower && nums[mid] >= target)) {
      right = mid - 1;
      ans = mid;
    } else {
      left = mid + 1;
    }
  }
  return ans;
};
/**
 * @param {number[][]} points
 * @param {number} angle
 * @param {number[]} location
 * @return {number}
 */
var visiblePoints = function (points, angle, location) {
  let sameCnt = 0;
  const polarDegrees = [];
  let locationX = location[0];
  let locationY = location[1];
  for (let i = 0; i < points.length; ++i) {
    const [x, y] = points[i];
    if (x === locationX && y === locationY) {
      sameCnt++;
      continue;
    }
    const degree = Math.atan2(y - locationY, x - locationX);
    polarDegrees.push(degree);
  }
  polarDegrees.sort((a, b) => a - b);
  const m = polarDegrees.length;
  for (let i = 0; i < m; ++i) {
    polarDegrees.push(polarDegrees[i] + Math.PI * 2);
  }

  let maxCnt = 0;
  const toDegree = (angle * Math.PI) / 180;
  for (let i = 0; i < m; ++i) {
    const iteration = binarySearch(polarDegrees, polarDegrees[i] + toDegree, false);
    maxCnt = Math.max(maxCnt, iteration - i);
  }
  return maxCnt + sameCnt;
};

console.assert(
  visiblePoints(
    [
      [2, 1],
      [2, 2],
      [3, 3],
    ],
    90,
    [1, 1]
  ) === 3,
  1
);
