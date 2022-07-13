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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }
  const res = [];
  let queue = [root];
  while (queue.length) {
    const temp = [];
    const values = [];
    for (let i = 0; i < queue.length; i++) {
      values.push(queue[i].val);
      if (queue[i].left) {
        temp.push(queue[i].left);
      }
      if (queue[i].right) {
        temp.push(queue[i].right);
      }
    }
    queue = temp;
    res.push(values);
  }
  return res;
};
