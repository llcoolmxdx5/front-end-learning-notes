/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0, length = nums.length; i < length; i++) {
    const element = nums[i];
    if (map.has(target - element)) {
      return [map.get(target - element), i];
    }
    map.set(element, i);
  }
};

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
