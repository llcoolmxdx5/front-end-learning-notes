/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const stack = [],
    ans = [];
  const backTrack = start => {
    ans.push([...stack]);
    for (let index = start; index < nums.length; index++) {
      const element = nums[index];
      stack.push(element);
      backTrack(index + 1);
      stack.pop();
    }
  };
  backTrack(0);
  return ans;
};

console.log(subsets([1, 2, 3])); // [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

console.log(subsets([0])); // [[],[0]]
