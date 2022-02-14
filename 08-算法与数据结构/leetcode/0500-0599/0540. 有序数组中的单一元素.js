/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  const { length } = nums;
  let left = 0;
  let right = length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const value = nums[mid];
    if (value === nums[mid - 1]) {
      if (mid % 2 === 1) {
        left = mid + 1;
      } else {
        right = mid - 2;
      }
    } else if (value === nums[mid + 1]) {
      if (mid % 2 === 1) {
        right = mid - 1;
      } else {
        left = mid + 2;
      }
    } else {
      return value;
    }
  }
};

var singleNonDuplicate = function (nums) {
  let low = 0,
    high = nums.length - 1;
  while (low < high) {
    const mid = Math.floor((high - low) / 2) + low;
    if (
      (mid % 2 === 0 && nums[mid] === nums[mid + 1]) ||
      (mid % 2 === 1 && nums[mid] === nums[mid - 1])
    ) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nums[low];
};

var singleNonDuplicate = function (nums) {
  let low = 0,
    high = nums.length - 1;
  while (low < high) {
    let mid = Math.floor((high - low) / 2) + low;
    mid -= mid & 1;
    if (nums[mid] === nums[mid + 1]) {
      low = mid + 2;
    } else {
      high = mid;
    }
  }
  return nums[low];
};

console.assert(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8]) === 2, 1);
console.assert(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11]) === 10, 2);
