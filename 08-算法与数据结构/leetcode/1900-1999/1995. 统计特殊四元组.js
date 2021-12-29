/**
 * @param {number[]} nums
 * @return {number}
 */
var countQuadruplets = function (nums) {
  const { length } = nums;
  let count = 0;
  for (let a = 0; a < length - 3; a++) {
    for (let b = a + 1; b < length - 2; b++) {
      for (let c = b + 1; c < length - 1; c++) {
        for (let d = c + 1; d < length; d++) {
          if (nums[a] + nums[b] + nums[c] === nums[d]) {
            count += 1;
          }
        }
      }
    }
  }
  return count;
};

var countQuadruplets = function (nums) {
  let ans = 0;
  let len = nums.length;
  const count = new Map();
  for (let b = len - 3; b >= 1; b--) {
    for (let d = b + 2; d < len; d++) {
      count.set(
        nums[d] - nums[b + 1],
        (count.get(nums[d] - nums[b + 1]) ?? 0) + 1
      );
    }
    for (let a = b - 1; a >= 0; a--) {
      ans += count.get(nums[a] + nums[b]) ?? 0;
    }
  }
  return ans;
};

console.assert(countQuadruplets([1, 2, 3, 6]) === 1, 1);
console.assert(countQuadruplets([3, 3, 6, 4, 5]) === 0, 2);
console.assert(countQuadruplets([1, 1, 1, 3, 5]) === 4, 3);
