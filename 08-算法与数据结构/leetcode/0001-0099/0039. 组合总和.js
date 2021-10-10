/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */combinationSum2
var combinationSum = function (candidates, target) {
  const { length } = candidates;
  const ans = [];
  const path = [];
  const backTack = (sum, start) => {
    if (sum === target) {
      ans.push([...path]);
    }
    if (sum > target) {
      return;
    }
    // // 如果 sum + candidates[i] > target 就终止遍历 剪枝优化
    for (let i = start; i < length && sum + candidates[i] <= target; i++) {
      const value = candidates[i];
      sum += value;
      path.push(value);
      backTack(sum, i);
      sum -= value;
      path.pop();
    }
  };
  candidates.sort((a, b) => a - b);
  backTack(0, 0);
  return ans;
};

console.log(combinationSum([2, 3, 6, 7], 7)); // [[7],[2,2,3]]

console.log(combinationSum([2, 3, 5], 8)); // [[2,2,2,2],[2,3,3],[3,5]]

console.log(combinationSum([2], 1)); // []

console.log(combinationSum([1], 1)); // [[1]]

console.log(combinationSum([1], 2)); // [[1,1]]
