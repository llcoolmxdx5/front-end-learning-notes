/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (root === null) return root;
  const queue = [root];
  while (queue.length) {
    const { length } = queue;
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      if (i < length - 1) {
        node.next = queue[0];
      }
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }
  return root;
};
var connect = function (root) {
  if (root === null) {
    return root;
  }
  let leftmost = root;
  while (leftmost.left !== null) {
    let head = leftmost;
    while (head !== null) {
      head.left.next = head.right;
      if (head.next !== null) {
        head.right.next = head.next.left;
      }
      head = head.next;
    }
    leftmost = leftmost.left;
  }
  return root;
};
