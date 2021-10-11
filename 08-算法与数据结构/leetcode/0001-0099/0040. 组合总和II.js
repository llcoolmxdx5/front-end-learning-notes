/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const { length } = candidates;
  const ans = [];
  const path = [];
  const backTack = (sum, start, used) => {
    if (sum === target) {
      ans.push([...path]);
    }
    if (sum > target) {
      return;
    }
    // 如果 sum + candidates[i] > target 就终止遍历 剪枝优化
    for (let i = start; i < length && sum + candidates[i] <= target; i++) {
      const value = candidates[i];
      if (i > 0 && value == candidates[i - 1] && used[i - 1] == false) {
        used[i] = false;
        continue;
      }
      sum += value;
      path.push(value);
      used[i] = true;
      backTack(sum, i + 1, used);
      used[i] = false;
      sum -= value;
      path.pop();
    }
  };
  candidates.sort((a, b) => a - b);
  backTack(0, 0, []);
  return ans;
};

var combinationSum2 = function (candidates, target) {
  const res = [];
  const path = [];
  const len = candidates.length;
  candidates.sort((a, b) => a - b);
  backtracking(0, 0);
  return res;
  function backtracking(sum, start) {
    if (sum > target) return;
    if (sum === target) {
      res.push([...path]);
      return;
    }
    let f = -1;
    for (let i = start; i < len && sum + candidates[i] <= target; i++) {
      const value = candidates[i];
      if (value > target - sum || value === f) continue;
      path.push(value);
      sum += value;
      f = value;
      backtracking(sum, i + 1);
      path.pop();
      sum -= value;
    }
  }
};

console.log(combinationSum2([2, 2, 2], 2)); // [[2]]
