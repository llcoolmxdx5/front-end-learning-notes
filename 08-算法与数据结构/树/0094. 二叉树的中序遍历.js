function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root, res = []) {
  if (!root) {
    return [];
  }
  inorderTraversal(root.left, res);
  res.push(root.val);
  inorderTraversal(root.right, res);
  return res;
};

var inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    res.push(root.val);
    root = root.right;
  }
  return res;
};
var inorderTraversal = function (root) {
  const WHITE = 0;
  const GRAY = 1;
  const res = [];
  const stack = [WHITE, root];
  while (stack.length) {
    const [color, node] = stack.pop();
    if (node === null) continue;
    if (color == WHITE) {
      stack.push([WHITE, node.right]);
      stack.push([GRAY, node]);
      stack.push([WHITE, node.left]);
    } else {
      res.push(node.val);
    }
  }
  return res;
};
