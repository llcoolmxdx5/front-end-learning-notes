/**
 * @param {number[]} nums
 * @return {number}
 */
var subArrayRanges = function (nums) {
  const { length } = nums;
  let res = 0;
  for (let i = 0; i < length; i++) {
    let min = Number.MAX_SAFE_INTEGER,
      max = Number.MIN_SAFE_INTEGER;
    for (let j = i; j < length; j++) {
      min = Math.min(min, nums[j]);
      max = Math.max(max, nums[j]);
      res += max - min;
    }
  }
  return res;
};

console.assert(subArrayRanges([1, 2, 3]) === 4, 1); // 4
console.assert(subArrayRanges([4, -2, -3, 4, 1]) === 59, 2); // 59
