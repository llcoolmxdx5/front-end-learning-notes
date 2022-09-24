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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (!root) {
    return null;
  }
  if (val === root.val) {
    return root;
  }
  return searchBST(val < root.val ? root.left : root.right, val);
};

var searchBST = function (root, val) {
  while (root) {
    if (root.val === val) {
      return root;
    }
    // 节点的值大于左子树的节点值 小于 右子树的值
    root = root.val > val ? root.left : root.right;
  }
  return null;
};
