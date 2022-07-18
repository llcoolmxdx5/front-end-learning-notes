/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  const dfs = (index, arr) => {
    if (arr.length === 0) {
      return null;
    }
    const val = preorder[index];
    const arrIndex = arr.indexOf(val);
    const left = arr.slice(0, arrIndex);
    const right = arr.slice(arrIndex + 1);
    // console.log(val, left, right);
    return new TreeNode(val, dfs(index + 1, left), dfs(index + 1 + left.length, right));
  };
  return dfs(0, inorder);
};

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])); // [3,9,20,null,null,15,7]
console.log(buildTree([1, 2, 3], [3, 2, 1])); // [1,2,null,3]
console.log(buildTree([3, 1, 2, 4], [1, 2, 3, 4])); // [3,1,4,null,2]
