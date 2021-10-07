/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  const resp = [];
  const temp = [];
  nums.sort((a, b) => a - b);
  const set = new Set()
  const backTrack = (start) => {
    if(!set.has(temp.join(','))) {
      resp.push([...temp]);
      set.add(temp.join(','))
    }
    for (let i = start; i < nums.length; i++) {
      temp.push(nums[i]);
      backTrack(i + 1);
      temp.pop();
    }
  };
  backTrack(0);
  return resp;
};

console.log(subsetsWithDup([1, 2, 2])); // [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]];

console.log(subsetsWithDup([2, 2, 1])); // [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]];

console.log(subsetsWithDup([0])); // [[],[0]]
