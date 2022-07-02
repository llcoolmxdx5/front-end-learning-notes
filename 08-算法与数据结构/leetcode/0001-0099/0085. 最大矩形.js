/**
 * @param {Array<'0'|'1'>[]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  // 保存以当前数字结尾的连续 1 的个数
  const width = Array.from({ length: m }, () => new Array(n).fill(0));
  let maxArea = 0;
  // 遍历每一行
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      // 更新 width
      if (matrix[row][col] == '1') {
        if (col == 0) {
          width[row][col] = 1;
        } else {
          width[row][col] = width[row][col - 1] + 1;
        }
      } else {
        width[row][col] = 0;
      }
      // 记录所有行中最小的数
      let minWidth = width[row][col];
      // 向上扩展行
      for (let upRow = row; upRow >= 0; upRow--) {
        const height = row - upRow + 1;
        // 找最小的数作为矩阵的宽
        minWidth = Math.min(minWidth, width[upRow][col]);
        // 更新面积
        maxArea = Math.max(maxArea, height * minWidth);
      }
    }
  }
  return maxArea;
};

var largestRectangleArea = function (heights) {
  let ans = 0;
  // 存储下标
  const stack = [];
  const temp = [0, ...heights, 0];
  for (let i = 0, len = temp.length; i < len; i++) {
    while (stack.length && temp[i] < temp[stack[stack.length - 1]]) {
      const h = temp[stack.pop()];
      ans = Math.max(h * (i - stack[stack.length - 1] - 1), ans);
    }
    stack.push(i);
  }
  return ans;
};

var maximalRectangle = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const heights = new Array(n).fill(0);
  let maxArea = 0;
  for (let row = 0; row < m; row++) {
    // 遍历每一列，更新高度
    for (let col = 0; col < n; col++) {
      if (matrix[row][col] == '1') {
        heights[col] += 1;
      } else {
        heights[col] = 0;
      }
    }
    // 调用上一题的解法，更新函数
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }
  return maxArea;
};

console.assert(
  maximalRectangle([
    ['1', '0', '1', '0', '0'],
    ['1', '0', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0'],
  ]) === 6,
  1
);

console.assert(maximalRectangle([['0', '0']]) === 0, 2);
