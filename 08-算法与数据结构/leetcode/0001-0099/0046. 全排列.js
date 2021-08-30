/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const { length } = nums;
  const result = [];
  const temp = [];
  const backtrack = (used) => {
    if (temp.length === length) {
      result.push([...temp]);
      return;
    }
    for (let i = 0; i < length; i++) {
      if (used[i]) continue;
      temp.push(nums[i]);
      used[i] = true;
      backtrack(used);
      temp.pop();
      used[i] = false;
    }
  };
  backtrack([]);
  return result;
};

console.log(permute([1, 2, 3]));
/* [
  [1, 2, 3],
  [1, 3, 2],
  [2, 1, 3],
  [2, 3, 1],
  [3, 1, 2],
  [3, 2, 1],
]; */

console.log(permute([0, 1])); // [[0,1],[1,0]]

console.log(permute([1])); // [[1]]
