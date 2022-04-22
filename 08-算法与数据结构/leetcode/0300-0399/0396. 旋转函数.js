/**
 * @param {number[]} nums
 * @return {number}
 */
var maxRotateFunction = function (nums) {
  const { length } = nums;
  let sum = 0;
  let temp = 0;
  for (let i = 0; i < length; i++) {
    sum += nums[i];
    temp += i * nums[i];
  }
  let ans = temp;
  for (let i = 1; i < length; i++) {
    temp = temp + sum - length * nums[length - i];
    ans = Math.max(temp, ans);
  }
  return ans;
};

console.assert(maxRotateFunction([4, 3, 2, 6]) === 26, 1);
console.assert(maxRotateFunction([100]) === 0, 2);
