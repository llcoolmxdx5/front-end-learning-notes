/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function (houses, heaters) {
  heaters.sort((a, b) => a - b);
  const { length } = heaters;
  const binarySearch = target => {
    let left = 0,
      right = length - 1;
    // 最小的供暖器都在目标房屋的右边
    // 说明房屋左边没有合适的供暖器，用-1代替
    if (heaters[left] > target) {
      return -1;
    }
    while (left < right) {
      const mid = left + Math.floor((right - left + 1) / 2);
      if (heaters[mid] > target) {
        right = mid - 1;
      } else {
        left = mid;
      }
    }
    return left;
  };
  let radius = 0;
  for (const house of houses) {
    // 距离当前房屋最近的左供暖器i（可重合）
    const i = binarySearch(house);
    // 右供暖器j
    const j = i + 1;
    // 计算当前房屋离左右供暖器的距离
    const left = i < 0 ? Number.MAX_SAFE_INTEGER : house - heaters[i];
    const right = j >= length ? Number.MAX_SAFE_INTEGER : heaters[j] - house;
    // 更新半径
    radius = Math.max(radius, Math.min(left, right));
  }
  return radius;
};

console.assert(findRadius([1, 2, 3], [2]) === 1, 1);
console.assert(findRadius([1, 2, 3, 4], [1, 4]) === 1, 2);
console.assert(findRadius([1, 5], [2]) === 3, 3);
