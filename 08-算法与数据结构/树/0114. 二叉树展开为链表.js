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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  const arr = [];
  const dfs = node => {
    if (!node) {
      return;
    }
    arr.push(node);
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  for (let i = 1; i < arr.length; i++) {
    const prev = arr[i - 1];
    const curr = arr[i];
    prev.left = null;
    prev.right = curr;
  }
};

var flatten = function (root) {
  const dfs = cur => {
    if (!cur) {
      return;
    }
    let next = cur.left;
    if (next) {
      while (next.right) {
        next = next.right;
      }
      next.right = cur.right;
      cur.right = cur.left;
      cur.left = null;
    }
    dfs(cur.right);
  };
  dfs(root);
};

flatten([1, 2, 5, 3, 4, null, 6]); // [1,null,2,null,3,null,4,null,5,null,6]
