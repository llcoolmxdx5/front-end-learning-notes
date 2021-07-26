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
  let result = [];
  for (let index = 0; index < nums.length; index++) {
    result.push(index + 1);
  }
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    delete result[element - 1];
  }
  return result.filter(Boolean);
};

console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); // [5,6]
