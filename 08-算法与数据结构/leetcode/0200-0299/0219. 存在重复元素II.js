/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  if (k === 0) return false;
  const map = new Map();
  let left = 0;
  let right = 0;
  const { length } = nums;
  while (right < length) {
    map.set(nums[right], (map.get(nums[right]) ?? 0) + 1);
    if (right - left > k) {
      const leftValue = map.get(nums[left]);
      if (leftValue === 1) {
        map.delete(nums[left]);
      } else {
        map.set(nums[left], leftValue - 1);
      }
      left += 1;
    }
    // console.log(map, nums[right], left, right);
    if (map.get(nums[right]) > 1) {
      return true;
    }
    right += 1;
  }
  return false;
};

var containsNearbyDuplicate = function (nums, k) {
  const set = new Set();
  const length = nums.length;
  for (let i = 0; i < length; i++) {
    if (i > k) {
      set.delete(nums[i - k - 1]);
    }
    if (set.has(nums[i])) {
      return true;
    }
    set.add(nums[i]);
  }
  return false;
};

console.assert(containsNearbyDuplicate([1, 2, 3, 1], 3) === true, 1);
console.assert(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2) === false, 2);
console.assert(containsNearbyDuplicate([1, 0, 1, 1], 1) === true, 3);
