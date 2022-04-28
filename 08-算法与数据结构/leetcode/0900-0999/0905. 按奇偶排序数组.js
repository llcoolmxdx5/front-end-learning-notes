/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  const even = [];
  const odd = [];
  for (const num of nums) {
    if (num % 2 === 0) {
      even.push(num);
    } else {
      odd.push(num);
    }
  }
  return [...even, ...odd];
};

console.log(sortArrayByParity([3, 1, 2, 4]));
