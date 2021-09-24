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
  if (root === null) {
    return root;
  }
  const queue = [root];
  while (queue.length) {
    const { length } = queue;
    for (let index = 0; index < length; index++) {
      const v = queue.shift();
      v.next = index < length - 1 ? queue[0] : null;
      if(v.left !== null) {
        queue.push(v.left)
      }
      if(v.right !== null) {
        queue.push(v.right)
      }
    }
  }
  return root;
};

let last = null,
  nextStart = null;
const handle = (p) => {
  if (last !== null) {
    last.next = p;
  }
  if (nextStart === null) {
    nextStart = p;
  }
  last = p;
};
var connect = function (root) {
  if (root === null) {
    return null;
  }
  let start = root;
  while (start !== null) {
    last = null;
    nextStart = null;
    for (let p = start; p !== null; p = p.next) {
      if (p.left !== null) {
        handle(p.left);
      }
      if (p.right !== null) {
        handle(p.right);
      }
    }
    start = nextStart;
  }
  return root;
};
