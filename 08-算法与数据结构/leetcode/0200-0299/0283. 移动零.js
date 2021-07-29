/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let left = 0,
    right = 0;
  const { length } = nums;
  while (right < length) {
    // console.log(left, right);
    // console.log(nums);
    if (nums[right] !== 0) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left += 1;
    }
    right += 1;
  }
  console.log(nums);
};

moveZeroes([0, 1, 0, 3, 12]); // [1,3,12,0,0]
moveZeroes([1, 1, 0, 3, 12]); // [1,1,3,12,0]
moveZeroes([0, 0, 1, 0, 12]); // [1,12,0,0,0]
