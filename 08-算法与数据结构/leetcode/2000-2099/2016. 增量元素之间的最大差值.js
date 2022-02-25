/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumDifference = function (nums) {
  let ans = -1;
  let max = nums[nums.length - 1];
  for (let i = nums.length - 2; i >= 0; i--) {
    if (max > nums[i]) {
      ans = Math.max(max - nums[i], ans);
    } else {
      max = nums[i];
    }
    // console.log(max, ans);
  }
  return ans;
};

console.assert(maximumDifference([7, 1, 5, 4]) === 4, 1);
console.assert(
  maximumDifference([87, 68, 91, 86, 58, 63, 43, 98, 6, 40]) === 55,
  2
);
