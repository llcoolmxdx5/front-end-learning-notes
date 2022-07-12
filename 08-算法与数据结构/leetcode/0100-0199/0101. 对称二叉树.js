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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  const check = (p, q) => {
    if (!p && !q) {
      return true;
    }
    if (!p || !q) {
      return false;
    }
    return q.val === p.val && check(p.left, q.right) && check(p.right, q.left);
  };
  return check(root, root);
};

var isSymmetric = function (root) {
  const queue = [root, root];
  while (queue.length) {
    const u = queue.shift();
    const v = queue.shift();
    if (!u && !v) {
      continue;
    }
    if (!u || !v) {
      return false;
    }
    if (v.val !== u.val) {
      return false;
    }
    queue.push(u.left, v.right);
    queue.push(u.right, v.left);
  }
  return true;
};
