/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  let maxChildDepth = 0;
  const children = root.children;
  for (const child of children) {
    const childDepth = maxDepth(child);
    maxChildDepth = Math.max(maxChildDepth, childDepth);
  }
  return maxChildDepth + 1;
};

var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  const queue = [];
  queue.push(root);
  let ans = 0;
  while (queue.length) {
    let size = queue.length;
    while (size > 0) {
      const node = queue.shift();
      const children = node.children;
      for (const child of children) {
        queue.push(child);
      }
      size -= 1;
    }
    ans += 1;
  }
  return ans;
};
