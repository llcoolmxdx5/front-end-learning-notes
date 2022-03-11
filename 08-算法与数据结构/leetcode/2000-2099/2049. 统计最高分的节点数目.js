class TreeNode {
  left = null;
  right = null;
  appendChild(child) {
    if (this.left === null) {
      this.left = child;
    } else {
      this.right = child;
    }
  }
}

/**
 * @param {number[]} parents
 * @return {number}
 */
var countHighestScoreNodes = function (parents) {
  const { length } = parents;
  const nodes = new Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    nodes[i] = new TreeNode();
  }
  for (let i = 1; i < length; i++) {
    nodes[parents[i]].appendChild(nodes[i]);
  }
  let ans = 0;
  let maxScore = 0;
  const help = (count) => {
    return Math.max(count, 1);
  };
  const dfs = (node) => {
    if (node === null) {
      return 0;
    }
    const leftCount = dfs(node.left);
    const rightCount = dfs(node.right);
    const remain = length - leftCount - rightCount - 1;
    const score = help(leftCount) * help(rightCount) * help(remain);
    if (score === maxScore) {
      ans += 1;
    } else if (score > maxScore) {
      ans = 1;
      maxScore = score;
    }
    return leftCount + rightCount + 1;
  };
  dfs(nodes[0]);
  return ans;
};

console.assert(countHighestScoreNodes([-1, 2, 0, 2, 0]) === 3, 1);
