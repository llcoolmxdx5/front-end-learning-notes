/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const { length } = nums;
  let ans = nums[0];
  const dp = new Array(length + 1).fill(0);
  for (let i = 1; i < length + 1; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i - 1], nums[i - 1]);
    ans = Math.max(ans, dp[i]);
  }
  // console.log(dp);
  return ans;
};

var maxSubArray = function (nums) {
  const { length } = nums;
  let ans = nums[0];
  let pre = 0;
  for (let i = 0; i < length; i++) {
    pre = Math.max(pre + nums[i], nums[i]);
    ans = Math.max(ans, pre);
  }
  return ans;
};

var maxSubArray = function (nums) {
  const maxCrossingSum = (nums, left, mid, right) => {
    // 一定会包含 nums[mid] 这个元素
    let sum = 0;
    let leftSum = Number.MIN_SAFE_INTEGER;
    // 左半边包含 nums[mid] 元素，最多可以到什么地方
    // 走到最边界，看看最值是什么
    // 计算以 mid 结尾的最大的子数组的和
    for (let i = mid; i >= left; i--) {
      sum += nums[i];
      leftSum = Math.max(leftSum, sum);
    }
    sum = 0;
    let rightSum = Number.MIN_SAFE_INTEGER;
    // 右半边不包含 nums[mid] 元素，最多可以到什么地方
    // 计算以 mid+1 开始的最大的子数组的和
    for (let i = mid + 1; i <= right; i++) {
      sum += nums[i];
      rightSum = Math.max(rightSum, sum);
    }
    return leftSum + rightSum;
  };

  const maxSubArraySum = (nums, left, right) => {
    if (left == right) {
      return nums[left];
    }
    let mid = left + Math.floor((right - left) / 2);
    return Math.max(
      maxSubArraySum(nums, left, mid),
      maxSubArraySum(nums, mid + 1, right),
      maxCrossingSum(nums, left, mid, right)
    );
  };
  let len = nums.length;
  return maxSubArraySum(nums, 0, len - 1);
};

console.assert(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) === 6, 1);
console.assert(maxSubArray([5, 4, -1, 7, 8]) === 23, 2);
