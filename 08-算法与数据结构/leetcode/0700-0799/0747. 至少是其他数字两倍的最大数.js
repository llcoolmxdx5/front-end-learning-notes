/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function (nums) {
  const { length } = nums;
  let first = nums[0];
  let second = 0;
  let ans = 0;
  for (let i = 1; i < length; i++) {
    const value = nums[i];
    if (value > first) {
      second = first;
      first = value;
      ans = i;
    } else if (value > second) {
      second = value;
    }
  }
  if (first / 2 >= second) {
    return ans;
  }
  return -1;
};

console.assert(dominantIndex([3, 6, 1, 0]) === 1, 1);
