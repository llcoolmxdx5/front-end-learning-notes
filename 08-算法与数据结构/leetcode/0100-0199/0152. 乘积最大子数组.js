/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  const { length } = nums;
  let ans = Number.MIN_SAFE_INTEGER;
  let min = 1,
    max = 1;
  for (let i = 0; i < length; i++) {
    if (nums[i] < 0) {
      [min, max] = [max, min];
    }
    max = Math.max(max * nums[i], nums[i]);
    min = Math.min(min * nums[i], nums[i]);
    ans = Math.max(max, ans);
  }
  // console.log(ans);
  return ans;
};

console.assert(maxProduct([2, 3, -2, 4]) === 6, 1);
console.assert(maxProduct([-2, 0, -1]) === 0, 2);
