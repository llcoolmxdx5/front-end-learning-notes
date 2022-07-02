/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
  const res = [];
  if (!root) {
    return [];
  }
  res.push(root.val);
  root.children.forEach(item => {
    res.push(...preorder(item));
  });
  // console.log(res);
  return res;
};

var preorder = function (root) {
  const res = [];
  if (!root) {
    return [];
  }
  const stack = [root];
  while (stack.length) {
    const obj = stack.pop();
    res.push(obj.val);
    for (let i = obj.children.length - 1; i >= 0; i--) {
      stack.push(obj.children[i]);
    }
  }
  // console.log(res);
  return res;
};

const obj = {
  val: 1,
  children: [
    {
      val: 3,
      children: [
        {
          val: 5,
          children: [],
        },
        {
          val: 6,
          children: [],
        },
      ],
    },
    { val: 2, children: [] },
    { val: 4, children: [] },
  ],
};

console.assert(preorder(obj).join() === [1, 3, 5, 6, 2, 4].join(), 1);
