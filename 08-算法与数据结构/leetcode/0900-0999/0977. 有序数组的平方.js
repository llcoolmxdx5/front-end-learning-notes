/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  return nums.map((x) => x ** 2).sort((a, b) => a - b);
};

var sortedSquares = function (nums) {
  const { length } = nums;
  const res = new Array(length);
  let left = 0,
    right = length - 1;
  let i = 0;
  while (i < length) {
    const leftSquare = nums[left] ** 2,
      rightSquare = nums[right] ** 2;
    if (leftSquare < rightSquare) {
      res[length - i - 1] = rightSquare;
      right -= 1;
    } else {
      res[length - i - 1] = leftSquare;
      left += 1;
    }
    i++;
  }
  return res;
};

console.log(sortedSquares([-4, -1, 0, 3, 10])); // [0,1,9,16,100]
console.log(sortedSquares([-7, -3, 2, 3, 11])); // [4,9,9,49,121]
console.log(sortedSquares([-4, -1, 0, 0, 3, 10])); // [0,0,1,9,16,100]
console.log(sortedSquares([2])); // [4]
