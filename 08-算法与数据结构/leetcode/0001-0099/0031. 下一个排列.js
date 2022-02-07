/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  const { length } = nums;
  let left = length - 2;
  while (left >= 0 && nums[left] >= nums[left + 1]) {
    left--;
  }
  let right = length - 1;
  if (left >= 0) {
    while (nums[right] <= nums[left]) {
      right--;
    }
    [nums[left], nums[right]] = [nums[right], nums[left]];
  }
  left += 1;
  right = length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
};

let nums = [1, 2, 3];
nextPermutation(nums);
console.assert(nums.join() === [1, 3, 2].join(), 1);

nums = [4, 3, 2, 1];
nextPermutation(nums);
console.assert(nums.join() === [1, 2, 3, 4].join(), 2);

nums = [1, 1, 6, 5];
nextPermutation(nums);
console.assert(nums.join() === [1, 5, 1, 6].join(), 3);
