/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length,
    n = matrix[0].length;
  let left = 0,
    right = m - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (matrix[mid][0] === target) {
      return true;
    }
    if (matrix[mid][0] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  const arr = matrix[right];
  if (!arr) {
    return false;
  }
  left = 0;
  right = n - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) {
      return true;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
};

var searchMatrix = function (matrix, target) {
  const m = matrix.length,
    n = matrix[0].length;
  let low = 0,
    high = m * n - 1;
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low;
    const x = matrix[Math.floor(mid / n)][mid % n];
    if (x < target) {
      low = mid + 1;
    } else if (x > target) {
      high = mid - 1;
    } else {
      return true;
    }
  }
  return false;
};

console.assert(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    3,
  ) === true,
  1,
);

console.assert(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    13,
  ) === false,
  2,
);

console.assert(searchMatrix([[0]], 0) === true, 3);
