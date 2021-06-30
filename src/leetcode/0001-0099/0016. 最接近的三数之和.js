/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  const sortNums = nums.sort((a, b) => a - b);
  let res = undefined;
  // console.log(sortNums);
  for (let index = 0; index < sortNums.length; index++) {
    if (sortNums.length - index <= 2) {
      return res;
    }
    // 和上一次枚举的元素不等
    // if (index > 0 && sortNums[index] === sortNums[index - 1]) continue;
    const element = sortNums[index];
    const newTarget = target - element;
    let left = index + 1,
      right = sortNums.length - 1;
    while (left < right) {
      const sum = sortNums[left] + sortNums[right];
      // console.log(element, sum, sortNums[left], sortNums[right], newTarget, res);
      const newSum = element + sum;
      if (res === undefined) {
        res = newSum;
      } else if (Math.abs(newSum - target) < Math.abs(res - target)) {
        res = newSum;
      }
      if (sum === newTarget) {
        return target;
      } else if (sum < newTarget) {
        left += 1;
        // while (left < right && sortNums[left] === sortNums[left - 1]) {
        //   left += 1;
        // }
      } else {
        right -= 1;
        // while (left < right && sortNums[right] === sortNums[right + 1]) {
        //   right -= 1;
        // }
      }
    }
  }
  return res;
};

console.assert(threeSumClosest([-1, 2, 1, -4], 1) === 2, 1); // 2
console.assert(threeSumClosest([1, -3, 3, 5, 4, 1], 1) === 1, 2); // 1
console.assert(threeSumClosest([-1, 0, 1, 1, 55], 3) === 2, 3); // 2
console.assert(threeSumClosest([1, 1, 1, 0], 100) === 3, 4);
