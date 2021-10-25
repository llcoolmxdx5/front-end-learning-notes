/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function (nums) {
  const map = new Map();
  const set = new Set();
  const count = Math.floor(nums.length / 3);
  for (let i = 0; i < nums.length; i++) {
    const v = nums[i];
    map.set(v, (map.get(v) ?? 0) + 1);
    if (map.get(v) > count) {
      set.add(v);
    }
  }
  return [...set];
};

console.log(majorityElement([1])); // [1]

console.log(majorityElement([3, 2, 3])); // [3]
