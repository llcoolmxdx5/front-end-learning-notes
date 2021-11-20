/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function (nums) {
  const map = new Map();
  const { length } = nums;
  for (let i = 0; i < length; i++) {
    map.set(nums[i], 1 + (map.get(nums[i]) ?? 0));
  }
  let ans = 0;
  for (const key of map.keys()) {
    if (map.get(key + 1)) {
      ans = Math.max(ans, map.get(key) + map.get(key + 1));
    }
  }
  return ans;
};

console.assert(findLHS([1, 3, 2, 2, 5, 2, 3, 7]) === 5, 1);
console.assert(findLHS([1, 2, 3, 4]) === 2, 2);
console.assert(findLHS([1, 1, 1, 1]) === 0, 3);
