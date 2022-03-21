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
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  const set = new Set();
  let ans = false;
  const dfs = (node) => {
    if (!node) {
      return;
    }
    if (set.has(k - node.val)) {
      ans = true;
      return;
    }
    set.add(node.val);
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return ans;
};
