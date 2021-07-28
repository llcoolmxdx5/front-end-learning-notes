/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  k = k % nums.length;
  const res = [
    ...nums.slice(nums.length - k),
    ...nums.slice(0, nums.length - k),
  ];
  for (let index = 0; index < res.length; index++) {
    const element = res[index];
    nums[index] = element;
  }
  console.log(nums);
};

var rotate = function (nums, k) {
  const reverse = (arr, start, end) => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start += 1;
      end -= 1;
    }
  };
  const { length } = nums;
  k = k % length;
  reverse(nums, 0, length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, length - 1);
  console.log(nums);
};

rotate([1, 2, 3, 4, 5, 6, 7], 3); //[5,6,7,1,2,3,4]
rotate([-1, -100, 3, 99], 2); // [3,99,-1,-100]
rotate([1, 2, 3, 4, 5, 6], 1); // [6,1,2,3,4,5]
