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
var isEvenOddTree = function (root) {
  let flag = true; // 偶数层 节点都是奇数 递增
  const queue = [root];
  while (queue.length) {
    const { length } = queue;
    let value = queue[0].val;
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      if (flag) {
        if (node.val % 2 === 0) return false;
        if (i > 0 && node.val <= value) return false;
      } else {
        if (node.val % 2 !== 0) return false;
        if (i > 0 && node.val >= value) return false;
      }
      value = node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    flag = !flag;
  }
  return true;
};
