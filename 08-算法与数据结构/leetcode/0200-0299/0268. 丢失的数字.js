/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  const { length } = nums;
  let ans = (length * (length + 1)) / 2;
  for (let i = 0; i < length; i++) {
    ans -= nums[i];
  }
  return ans;
};

var missingNumber = function (nums) {
  const { length } = nums;
  let ans = 0;
  for (let i = 0; i < length + 1; i++) {
    ans ^= i;
  }
  for (let i = 0; i < length; i++) {
    ans ^= nums[i];
  }
  return ans;
};

console.assert(missingNumber([3, 0, 1]) === 2, 1);
console.assert(missingNumber([0]) === 1, 2);
