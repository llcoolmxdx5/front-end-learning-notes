/**
 * @param {number[]} nums
 * @return {number}
 */
var findGCD = function (nums) {
  let min = nums[0];
  let max = nums[0];
  for (let i = 1, len = nums.length; i < len; i++) {
    min = Math.min(min, nums[i]);
    max = Math.max(max, nums[i]);
  }
  const gcd = (a, b) => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };
  return gcd(min, max);
};
