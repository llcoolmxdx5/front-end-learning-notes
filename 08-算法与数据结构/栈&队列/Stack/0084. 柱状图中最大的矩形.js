/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let ans = 0;
  for (let i = 0, length = heights.length; i < length; i++) {
    const height = heights[i];
    let w = 1;
    let j = i;
    while (j - 1 >= 0 && heights[j - 1] >= height) {
      w += 1;
      j -= 1;
    }
    j = i;
    while (j + 1 < length && heights[j + 1] >= height) {
      w += 1;
      j += 1;
    }
    ans = Math.max(ans, height * w);
  }
  return ans;
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

console.assert(largestRectangleArea([2, 1, 5, 6, 2, 3]) === 10, 1);
console.assert(largestRectangleArea([2, 4]) === 4, 2);
