/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function (nums) {
  const min = Math.min(...nums);
  let resp = 0;
  for (let i = 0; i < nums.length; i++) {
    resp += nums[i] - min;
  }
  return resp;
};

console.assert(minMoves([1, 2, 3]) === 3, 1);
console.assert(minMoves([1, 1, 1]) === 0, 2);
