/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    if (nums[left] > nums[left + 1]) {
      return left;
    }
    if (nums[right] > nums[right - 1]) {
      return right;
    }
    left += 1;
    right += 1;
  }
  return left;
};

var findPeakElement = function (nums) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

console.assert(findPeakElement([1, 2, 3, 1]) === 2, 1);
console.assert([1, 5].includes(findPeakElement([1, 2, 1, 3, 5, 6, 4])), 2);
