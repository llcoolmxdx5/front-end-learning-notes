/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  let max = root.val;
  const dfs = node => {
    if (!node) {
      return Number.MIN_SAFE_INTEGER;
    }
    const left = dfs(node.left);
    const right = dfs(node.right);
    max = Math.max(max, left, right, node.val + left + right);
    return Math.max(node.val, node.val + left, node.val + right);
  };
  return Math.max(dfs(root), max);
};

maxPathSum([-10, 9, 20, null, null, 15, 7]); // 42
