/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (!root) return JSON.stringify([]);
  let queue = [root];
  const res = [];
  while (queue.length) {
    const newQueue = [];
    for (let i = 0; i < queue.length; i++) {
      const node = queue[i];
      if (node === null) {
        res.push(null);
      } else {
        res.push(node.val);
        newQueue.push(node.left, node.right);
      }
    }
    queue = newQueue;
  }
  return JSON.stringify(res);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const arr = JSON.parse(data);

  if (arr.length === 0) return null;

  let inx = 1;
  let root = new TreeNode(arr[0]);
  let queue = [root];

  while (queue.length) {
    const node = queue.shift();
    node.left = null;
    node.right = null;

    if (arr[inx] !== null) {
      node.left = new TreeNode(arr[inx]);
      queue.push(node.left);
    }
    inx += 1;

    if (arr[inx] !== null) {
      node.right = new TreeNode(arr[inx]);
      queue.push(node.right);
    }
    inx += 1;
  }

  return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
