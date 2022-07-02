/**
 * @param {number[]} nums
 * @return {string}
 */
var optimalDivision = function (nums) {
  if (nums.length === 1) {
    return String(nums[0]);
  }
  if (nums.length === 2) {
    return nums.join('/');
  }
  let ans = nums[0] + '/(';
  return ans + nums.slice(1).join('/') + ')';
};
