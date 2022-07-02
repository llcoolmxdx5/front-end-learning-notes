/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let left = 0;
  let sum = 0;
  const { length } = nums;
  let res = length + 1;
  for (let right = 0; right < length; right++) {
    sum += nums[right];
    while (sum >= target) {
      res = Math.min(right - left + 1, res);
      sum -= nums[left];
      left += 1;
    }
  }
  return res > length ? 0 : res;
};

var minSubArrayLen = function (target, nums) {
  let n = nums.length;
  let ans = n + 1;
  let sums = [0];
  for (let i = 0; i < n; i++) {
    sums.push(sums[sums.length - 1] + nums[i]);
  }
  // console.log(sums);
  for (let i = 1; i < n + 1; i++) {
    const s = target + sums[i - 1];
    // const bound = bisect.bisect_left(sums, s);
    const bound = sums.findIndex(v => v === s); // 二分查找
    // console.log(bound);
    if (bound !== sums.length && bound > -1) {
      ans = Math.min(ans, bound - (i - 1));
    }
  }

  return ans === n + 1 ? 0 : ans;
};

console.assert(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]) === 2, 1);
console.assert(minSubArrayLen(4, [1, 4, 4]) === 1, 2);
console.assert(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]) === 0, 3);
console.assert(minSubArrayLen(15, [5, 1, 3, 5, 10, 7, 4, 9, 2, 8]) === 2, 4);
