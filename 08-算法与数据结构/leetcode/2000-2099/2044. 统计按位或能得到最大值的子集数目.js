/**
 * @param {number[]} nums
 * @return {number}
 */
var countMaxOrSubsets = function (nums) {
  let max = 0;
  let ans = 0;
  let paths = [];
  const backTrack = (orVal, start) => {
    if (orVal === max) {
      ans += 1;
    } else if (orVal > max) {
      max = orVal;
      ans = 1;
    }
    for (let i = start; i < nums.length; i++) {
      const element = nums[i];
      paths.push(orVal);
      orVal |= element;
      backTrack(orVal, i + 1);
      orVal = paths.pop();
    }
  };
  backTrack(0, 0);
  // console.log(ans);
  return ans;
};

console.assert(countMaxOrSubsets([3, 1]) === 2, 1);
console.assert(countMaxOrSubsets([2, 2, 2]) === 7, 2);
console.assert(countMaxOrSubsets([3, 2, 1, 5]) === 6, 3);
console.assert(countMaxOrSubsets([3]) === 1, 4);
