/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const { length } = nums;
  if (length < 3) return [];
  const res = [];
  nums.sort((a, b) => a - b);
  // console.log(nums);
  for (let i = 0; i < length; i++) {
    const element = nums[i];
    if (i > 0 && element === nums[i - 1]) continue;
    if (element > 0) return res;
    let L = i + 1,
      R = nums.length - 1;
    // console.log(element, nums);
    while (L < R) {
      const twoSum = nums[L] + nums[R];
      // console.log(twoSum, "wto", L, R);
      if (twoSum + element === 0) {
        res.push([element, nums[L], nums[R]]);
        L += 1;
        R -= 1;
        while (L < R && nums[L] === nums[L - 1]) L += 1;
        while (L < R && nums[R] === nums[R + 1]) R -= 1;
      } else if (twoSum + element > 0) {
        R -= 1;
      } else {
        L += 1;
      }
    }
  }
  return res;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1, -1, 2], [-1, 0, 1]]
console.log(threeSum([0, 0, 0, 0])); // [[0, 0, 0]]
console.log(threeSum([])); // []
console.log(threeSum([0])); // []
