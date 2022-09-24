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
var findTilt = function (root) {
  let ans = 0;
  const dfs = node => {
    if (!node) {
      return 0;
    }
    const sumLeft = dfs(node.left);
    const sumRight = dfs(node.right);
    ans += Math.abs(sumLeft - sumRight);
    return sumLeft + sumRight + node.val;
  };
  dfs(root);
  return ans;
};
