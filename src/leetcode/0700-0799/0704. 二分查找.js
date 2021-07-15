/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// var search = function (nums, target) {
//   let mid;
//   let start = 0;
//   while (true) {
//     // console.log(nums);
//     if (nums.length === 1) {
//       if (nums[0] === target) return start;
//       return -1;
//     }
//     if (nums.length % 2 === 0) {
//       if (nums[nums.length / 2] > target) {
//         nums = nums.slice(0, nums.length / 2);
//       } else {
//         start += nums.length / 2;
//         nums = nums.slice(nums.length / 2);
//       }
//     } else {
//       mid = (nums.length - 1) / 2;
//       if (nums[mid] === target) return start + mid;
//       if (nums[mid] < target) {
//         nums = nums.slice(mid + 1);
//         start += mid + 1;
//       } else {
//         nums = nums.slice(0, mid);
//       }
//     }
//   }
// };

var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};

console.assert(search([-1, 0, 3, 5, 9, 12], 9) === 4, 1);
console.assert(search([-1, 0, 3, 5, 9, 12], 2) === -1, 2);
console.assert(search([-1, 0, 3, 4, 5, 9, 12], 3) === 2, 3);
console.assert(search([2, 5], 2) === 0, 4);
console.assert(search([2, 5], 5) === 1, 5);
