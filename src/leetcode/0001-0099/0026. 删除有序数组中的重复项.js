/**
 * @param {number[]} nums
 * @return {number}
 */
// var removeDuplicates = function (nums) {
//   const { length } = nums;
//   let i = 0;
//   while (nums[i] !== undefined && i < length) {
//     const ele = nums[i];
//     while (nums[i + 1] !== undefined && nums[i + 1] === ele) {
//       nums.splice(i, 1);
//     }
//     if (nums[i + 1] !== ele) {
//       i += 1;
//     }
//   }
//   return nums.length;
// };

var removeDuplicates = function (nums) {
  const { length } = nums;
  if (length === 0) {
    return 0;
  }
  let slow = 0,
    fast = 1;
  while (fast < length) {
    if (nums[slow] !== nums[fast]) {
      nums[slow + 1] = nums[fast];
      slow += 1;
    }
    fast += 1;
  }
  return slow + 1;
};

console.assert(removeDuplicates([1, 1, 2]) === 2, 1);
console.assert(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]) === 5, 2);
