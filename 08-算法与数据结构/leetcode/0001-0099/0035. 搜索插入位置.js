/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0,
    right = nums.length - 1; // 定义target在左闭右闭的区间里，[left, right]
  while (left <= right) {
    // 当left==right，区间[left, right]依然有效
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1; // target 在右区间，所以[mid + 1, right]
    } else {
      right = mid - 1; // target 在左区间，所以[left, mid - 1]
    }
  }
  // 分别处理如下三种情况
  // 目标值在数组所有元素之前  [0, -1]
  // 目标值插入数组中的位置 [left, right]，return  right + 1
  // 目标值在数组所有元素之后的情况 [left, right]， return right + 1
  return right + 1;
};

var searchInsert = function (nums, target) {
  if (nums[nums.length - 1] < target) return nums.length;
  let left = 0;
  let right = nums.length - 1; // 定义target在左闭右开的区间里，[left, right)  target
  while (left < right) {
    // 因为left == right的时候，在[left, right)是无效的空间
    const middle = left + ((right - left) >> 1);
    if (nums[middle] > target) {
      right = middle; // target 在左区间，在[left, middle)中
    } else if (nums[middle] < target) {
      left = middle + 1; // target 在右区间，在 [middle+1, right)中
    } else {
      // nums[middle] == target
      return middle; // 数组中找到目标值的情况，直接返回下标
    }
  }
  // 分别处理如下三种情况
  // 目标值在数组所有元素之前 [0,0) return right 即可
  // 目标值等于数组中某一个元素 return middle
  // 目标值插入数组中的位置 [left, right) ，return right 即可
  return right;
};

console.assert(searchInsert([1, 3, 5, 6], 5) === 2, 1);
console.assert(searchInsert([1, 3, 5, 6], 2) === 1, 2);
console.assert(searchInsert([1, 3, 5, 6], 7) === 4, 3);
console.assert(searchInsert([1, 3, 5, 6], 0) === 0, 4);
console.assert(searchInsert([1], 0) === 0, 5);
