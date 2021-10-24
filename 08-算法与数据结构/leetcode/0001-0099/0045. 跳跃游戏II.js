/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  const { length } = nums;
  if (length === 1) return 0;
  let curCanDistance = 0; // 当前覆盖最远距离下标
  let nextCanDistance = 0; // 下一步覆盖最远距离下标
  let resp = 0; // 记录走的最大步数
  for (let i = 0; i < length; i++) {
    nextCanDistance = Math.max(nums[i] + i, nextCanDistance); // 更新下一步覆盖最远距离下标
    if (i === curCanDistance) {
      // 遇到当前覆盖最远距离下标
      if (curCanDistance !== length - 1) {
        // 如果当前覆盖最远距离下标不是终点
        curCanDistance = nextCanDistance; // 更新当前覆盖最远距离下标（相当于加油了）
        resp += 1; // 需要走下一步
        if (nextCanDistance >= length - 1) {
          // 下一步的覆盖范围已经可以达到终点，结束循环
          break;
        }
      } else {
        // 当前覆盖最远距离下标是集合终点，不用做 resp += 1 操作了，直接结束
        break;
      }
    }
  }
  return resp;
};

var jump = function (nums) {
  let curIndex = 0;
  let nextIndex = 0;
  let steps = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    nextIndex = Math.max(nums[i] + i, nextIndex);
    if (i === curIndex) {
      curIndex = nextIndex;
      steps++;
    }
  }
  return steps;
};

console.assert(jump([2, 3, 1, 1, 4]) === 2, 1);
console.assert(jump([2, 3, 0, 1, 4]) === 2, 2);
console.assert(jump([4, 3, 1, 1, 4]) === 1, 3);
