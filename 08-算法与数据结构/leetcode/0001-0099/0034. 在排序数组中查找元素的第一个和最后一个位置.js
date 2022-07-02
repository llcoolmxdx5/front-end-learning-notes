/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const binarySearch = type => {
    let left = 0,
      right = nums.length - 1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (target === nums[mid]) {
        if (type === 'left') {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    if (type === 'left') {
      if (left >= nums.length || nums[left] !== target) {
        return -1;
      }
      return left;
    }
    if (right < 0 || nums[right] !== target) {
      return -1;
    }
    return right;
  };
  const left = binarySearch('left');
  if (left === -1) {
    return [-1, -1];
  }
  const right = binarySearch('right');
  if (right === -1) {
    return [-1, -1];
  }
  return [left, right];
};

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // [3, 4]

console.log(searchRange([5, 7, 7, 8, 8, 10], 5)); // [0, 0]

console.log(searchRange([5, 7, 7, 8, 8, 10], 6)); // [-1, -1]

console.log(searchRange([], 0)); // [-1, -1]
