/**
 * 解法一
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  for (let i = 0; i < nums.length; ++i) {
    nums[Math.abs(nums[i]) - 1] = -Math.abs(nums[Math.abs(nums[i]) - 1]);
  }
  const res = [];
  for (let i = 0; i < nums.length; ++i) {
    if (nums[i] > 0) res.push(i + 1);
  }
  return res;
};

/**
 * 解法二
 */
var findDisappearedNumbers = function (nums) {
  const { length } = nums;
  const res = Array.from({ length }, (_, index) => index + 1);
  for (const num of nums) {
    delete res[num - 1];
  }
  return res.filter(Boolean);
};

console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); // [5,6]
