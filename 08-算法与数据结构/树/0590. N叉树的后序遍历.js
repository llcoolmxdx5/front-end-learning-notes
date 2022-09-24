function Node(val, children = []) {
  this.val = val;
  this.children = children;
}

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var postorder = function (root, res = []) {
  if (!root) {
    return [];
  }
  for (const child of root.children) {
    postorder(child, res);
  }
  res.push(root.val);
  return res;
};

var postorder = function (root) {
  if (!root) {
    return [];
  }
  const res = [];
  const stack = [root];
  const visited = new Set();
  while (stack.length) {
    const node = stack.at(-1);
    if (!node.children.length || visited.has(node)) {
      stack.pop();
      res.push(node.val);
      continue;
    }
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
    visited.add(node);
  }
  return res;
};

var postorder = function (root) {
  if (!root) {
    return [];
  }
  const res = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    res.push(node.val);
    for (const child of node.children) {
      stack.push(child);
    }
  }
  return res.reverse();
};

var postorder = function (root) {
  if (root == null) return [];
  const stack = [root];
  const ans = [];
  while (stack.length) {
    const node = stack.pop();
    if (node instanceof Node) {
      stack.push(node.val);
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push(node.children[i]);
      }
    } else {
      ans.push(node);
    }
  }
  return ans;
};

const root = new Node(1, [
  new Node(3, [new Node(5), new Node(6, [new Node(7)])]),
  new Node(2),
  new Node(4),
]);

console.log(postorder(root)); //[5, 7, 6, 3, 2, 4, 1]
