/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // [3,4,5,6,0,1,2]
  // [5,6,0,1,2,3,4]
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[left] === target) {
      return left;
    }
    if (nums[right] === target) {
      return right;
    }
    if (nums[left] > nums[mid]) {
      // [mid, r] 有序
      if (target > nums[mid] && target < nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      // [l, mid] 有序
      if (target > nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }
  return -1;
};

console.assert(search([4, 5, 6, 7, 0, 1, 2], 0) === 4, 1);
console.assert(search([4, 5, 6, 7, 0, 1, 2], 3) === -1, 2);
console.assert(search([1], 0) === -1, 3);
console.assert(search([3, 1], 2) === -1, 4);
console.assert(search([5, 1, 2, 3, 4], 1) === 1, 5);
