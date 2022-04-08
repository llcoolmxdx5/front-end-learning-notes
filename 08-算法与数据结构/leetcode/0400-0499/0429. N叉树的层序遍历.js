/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const ans = [];
  if (!root) {
    return ans;
  }
  const queue = [root]
  while(queue.length) {
    let temp = []
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const item = queue.shift()
      temp.push(item.val)
      if(item.children) {
        queue.push(...item.children)
      }
    }
    ans.push([...temp])
  }
  return ans
};
