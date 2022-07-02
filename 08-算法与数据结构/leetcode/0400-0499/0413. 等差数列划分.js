/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfArithmeticSlices = function (nums) {
  const { length } = nums;
  if (length < 3) {
    return 0;
  }
  // 定义 dp[i][j] 为 i 到 j 是否为等差数列
  const dp = [];
  let resp = 0;
  nums.sort((a, b) => a - b);
  for (let i = length - 1; i >= 0; i--) {
    dp[i] = [];
    for (let j = i + 2; j < length; j++) {
      if (j - i === 2) {
        dp[i][j] = nums[i + 1] * 2 === nums[i] + nums[j];
      } else {
        dp[i][j] = dp[i][j - 1] && nums[i + 1] - nums[i] === nums[j] - nums[j - 1];
      }
      if (dp[i][j]) {
        resp += 1;
      }
    }
  }
  return resp;
};

var numberOfArithmeticSlices = function (nums) {
  const { length } = nums;
  if (length < 3) {
    return 0;
  }
  let d = nums[0] - nums[1],
    t = 0;
  let ans = 0;
  // 因为等差数列的长度至少为 3，所以可以从 i=2 开始枚举
  for (let i = 2; i < length; i++) {
    if (nums[i - 1] - nums[i] === d) {
      t += 1;
    } else {
      d = nums[i - 1] - nums[i];
      t = 0;
    }
    ans += t;
  }
  return ans;
};

console.assert(numberOfArithmeticSlices([1, 2, 3, 4]) === 3, 1); // [[1, 2, 3], [2, 3, 4], [1,2,3,4]]
console.assert(numberOfArithmeticSlices([1]) === 0, 2);
console.assert(numberOfArithmeticSlices([1, 1, 1, 1, 1]) === 6, 3);
console.assert(numberOfArithmeticSlices([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) === 55, 4);
