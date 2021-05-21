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
