/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let ans = 0;
  let size = height.length;
  for (let i = 1; i < size - 1; i++) {
    let leftMax = 0,
      rightMax = 0;
    for (let j = i; j >= 0; j--) {
      leftMax = Math.max(leftMax, height[j]);
    }
    for (let j = i; j < size; j++) {
      rightMax = Math.max(rightMax, height[j]);
    }
    ans += Math.min(leftMax, rightMax) - height[i];
  }
  return ans;
};

var trap = function (height) {
  const { length } = height;
  const leftMax = [height[0]];
  for (let i = 1; i < length; i++) {
    leftMax[i] = Math.max(height[i], leftMax[i - 1]);
  }
  const rightMax = new Array(length).fill(0);
  rightMax[length - 1] = height[length - 1];
  for (let i = length - 2; i >= 0; i--) {
    rightMax[i] = Math.max(height[i], rightMax[i + 1]);
  }
  let ans = 0;
  for (let i = 0; i < length; i++) {
    ans += Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return ans;
};

var trap = function (height) {
  let ans = 0;
  let left = 0,
    right = height.length - 1;
  let leftMax = 0,
    rightMax = 0;
  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);
    if (height[left] < height[right]) {
      ans += leftMax - height[left];
      left += 1;
    } else {
      ans += rightMax - height[right];
      right -= 1;
    }
  }
  return ans;
};

console.assert(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) === 6, 1);
console.assert(trap([4, 2, 0, 3, 2, 5]) === 9, 2);
