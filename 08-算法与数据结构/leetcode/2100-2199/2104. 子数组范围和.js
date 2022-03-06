/**
 * @param {number[]} nums
 * @return {number}
 */
var subArrayRanges = function (nums) {
  const { length } = nums;
  let res = 0;
  for (let i = 0; i < length; i++) {
    let min = nums[i],
      max = nums[i];
    for (let j = i + 1; j < length; j++) {
      min = Math.min(min, nums[j]);
      max = Math.max(max, nums[j]);
      res += max - min;
    }
  }
  return res;
};

var subArrayRanges = function (nums) {
  const maxSum = (nums) => {
    let sum = 0;
    // 存储下标，这里先放个-1
    const stack = [-1];
    let top = 0;
    for (let i = 0; i <= nums.length; i++) {
      while (top > 0 && (i == nums.length || nums[stack[top]] < nums[i])) {
        const last = stack[top];
        top -= 1;
        const secondLast = stack[top];
        sum += nums[last] * (i - last) * (last - secondLast);
      }
      top += 1;
      stack[top] = i;
    }
    return sum;
  };

  const minSum = (nums) => {
    let sum = 0;
    // 存储下标
    const stack = [-1];
    let top = 0;
    for (let i = 0; i <= nums.length; i++) {
      while (top > 0 && (i == nums.length || nums[stack[top]] > nums[i])) {
        const last = stack[top];
        top -= 1;
        const secondLast = stack[top];
        sum += nums[last] * (i - last) * (last - secondLast);
      }
      top += 1;
      stack[top] = i;
    }
    return sum;
  };
  return maxSum(nums) - minSum(nums);
};

console.assert(subArrayRanges([1, 2, 3]) === 4, 1); // 4
console.assert(subArrayRanges([4, -2, -3, 4, 1]) === 59, 2); // 59
