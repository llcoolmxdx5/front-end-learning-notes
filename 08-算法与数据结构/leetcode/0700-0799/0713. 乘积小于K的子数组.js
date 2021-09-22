/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var numSubarrayProductLessThanK = function (nums, k) {
  const { length } = nums;
  let res = 0;
  let left = (right = 0);
  let sum = 1;
  while (left < length) {
    while (right < length) {
      sum *= nums[right];
      if (sum < k) {
        res += 1;
      } else {
        break;
      }
      right += 1;
    }
    left += 1;
    right = left;
    sum = 1;
  }
  return res;
};

var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) return 0;
  const { length } = nums;
  let res = 0;
  let left = 0;
  let prod = 1;
  for (let right = 0; right < length; right++) {
    const val = nums[right];
    prod *= val;
    while (prod >= k) {
      prod /= nums[left];
      left += 1;
    }
    res += right - left + 1;
  }
  return res;
};

console.assert(numSubarrayProductLessThanK([10, 5, 2, 6], 100) === 8, 1);
console.assert(numSubarrayProductLessThanK([1, 2, 3], 0) === 0, 2);
