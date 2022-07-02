/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const { length } = nums;
  const temp = [];
  const resp = [];
  const set = new Set();
  const backTrack = used => {
    if (temp.length === length && !set.has(temp.join(','))) {
      resp.push([...temp]);
      set.add(temp.join(','));
      return;
    }
    for (let i = 0; i < length; i++) {
      if (used[i]) continue;
      temp.push(nums[i]);
      used[i] = true;
      backTrack(used);
      temp.pop();
      used[i] = false;
    }
  };
  backTrack([]);
  return resp;
};

var permuteUnique = function (nums) {
  const { length } = nums;
  const temp = [];
  const resp = [];
  nums.sort((a, b) => a - b);
  const backTrack = used => {
    if (temp.length === length) {
      resp.push([...temp]);
      return;
    }
    for (let i = 0; i < length; i++) {
      if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])) continue;
      temp.push(nums[i]);
      used[i] = true;
      backTrack(used);
      temp.pop();
      used[i] = false;
    }
  };
  backTrack([]);
  return resp;
};

console.log(permuteUnique([1, 1, 2]));
/* [
  [1, 1, 2],
  [1, 2, 1],
  [2, 1, 1],
]; */

console.log(permuteUnique([1, 2, 3]));
/* [
  [1, 2, 3],
  [1, 3, 2],
  [2, 1, 3],
  [2, 3, 1],
  [3, 1, 2],
  [3, 2, 1],
]; */
