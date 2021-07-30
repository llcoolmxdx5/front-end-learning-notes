/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let left = 0,
    right = numbers.length - 1;
  while (left < right) {
    const leftNum = numbers[left],
      rightNum = numbers[right];
    const sum = leftNum + rightNum;
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum > target) {
      right -= 1;
    } else if (sum < target) {
      left += 1;
    }
  }
};

console.log(twoSum([2, 7, 11, 15], 9)); //[1,2]
console.log(twoSum([2, 3, 4], 6)); //[1,3]
console.log(twoSum([-3, 2, 3, 4], 6)); //[2,4]
