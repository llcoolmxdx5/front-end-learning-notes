/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const { length } = nums;
  let ans = 1;
  const dp = [];
  for (let i = 0; i < length; i++) {
    const element = nums[i];
    let max = 0;
    for (let j = 0; j < i; j++) {
      if (element > nums[j]) {
        max = Math.max(max, dp[j]);
      }
    }
    dp[i] = max + 1;
    ans = Math.max(dp[i], ans);
  }
  return ans;
};

var lengthOfLIS = function (nums) {
  const { length } = nums;
  const tails = [];
  for (let i = 0; i < length; i++) {
    const num = nums[i];
    if (!tails.length || num > tails[tails.length - 1]) {
      tails.push(num);
      continue;
    }
    let left = 0,
      right = tails.length - 1;
    let loc = right;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        loc = mid;
        right = mid - 1;
      }
    }
    tails[loc] = num;
  }
  // console.log(tails);
  return tails.length;
};

console.assert(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]) === 4, 1);
console.assert(lengthOfLIS([0, 1, 0, 3, 2, 3]) === 4, 2);
console.assert(lengthOfLIS([7, 7, 7, 7, 7, 7, 7]) === 1, 3);
