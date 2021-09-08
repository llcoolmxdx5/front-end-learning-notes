/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    // console.log(nums[left], nums[mid], nums[right]);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[left] === target) {
      return left;
    }
    if (nums[right] === target) {
      return right;
    }
    if (nums[left] < nums[mid]) {
      // 顺序
      if (target > nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // 乱序
      if (target > nums[left]) {
        right = mid - 1;
      } else if (target < nums[right]) {
        left += 1;
      } else {
        return -1;
      }
    }
  }
  return -1;
};

console.assert(search([4, 5, 6, 7, 0, 1, 2], 0) === 4, 1);

console.assert(search([4, 5, 6, 7, 0, 1, 2], 3) === -1, 2);

console.assert(search([1], 0) === -1, 3);

console.assert(search([3, 1], 2) === -1, 4);
