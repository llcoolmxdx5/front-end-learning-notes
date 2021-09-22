/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let maxLength = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i <= maxLength) {
      maxLength = Math.max(maxLength, i + nums[i]);
      if (maxLength >= nums.length - 1) {
        return true;
      }
    } else {
      return false;
    }
  }
  return false;
};

console.assert(canJump([2, 3, 1, 1, 4]) === true, 1);
console.assert(canJump([3, 2, 1, 0, 4]) === false, 2);
console.assert(canJump([1, 0, 1, 0]) === false, 3);
console.assert(canJump([0]) === true, 4);
