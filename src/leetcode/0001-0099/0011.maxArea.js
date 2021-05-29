/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  var left = 0;
  var right = height.length - 1;
  var area = 0;
  while (left < right) {
    var leftEle = height[left];
    var rightEle = height[right];
    var newArea = (right - left) * Math.min(rightEle, leftEle);
    area = newArea > area ? newArea : area;
    if (leftEle < rightEle) {
      left += 1;
    } else {
      right -= 1;
    }
  }
  return area;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(maxArea([4, 3, 2, 1, 4])); // 16
