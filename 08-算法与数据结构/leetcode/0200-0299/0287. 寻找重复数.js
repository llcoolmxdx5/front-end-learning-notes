/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  const arr = [...nums.sort((a, b) => a - b)];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      return arr[i];
    }
  }
};

var findDuplicate = function (nums) {
  let fast = 0,
    slow = 0;
  while (true) {
    fast = nums[nums[fast]];
    slow = nums[slow];
    if (slow === fast) {
      fast = 0;
      while (nums[slow] !== nums[fast]) {
        fast = nums[fast];
        slow = nums[slow];
      }
      return nums[slow];
    }
  }
};

console.assert(findDuplicate([1, 3, 4, 2, 2]) === 2, 1);
console.assert(findDuplicate([3, 1, 3, 4, 2]) === 3, 2);
console.assert(findDuplicate([2, 2, 2, 2]) === 2, 3);
