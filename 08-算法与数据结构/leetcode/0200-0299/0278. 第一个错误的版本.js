/**
 * Definition for isBadVersion()
 *
 * @param {number} version number
 * @return {boolean} whether the version is bad
 */
var isBadVersion = function (version) {
  return version > 3;
};

/**
 * @param {function} isBadVersion(version: number) => boolean
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {number} n Total versions
   * @return {number} The first bad version
   */
  return function (n) {
    let left = 1,
      right = n;
    while (left < right) {
      // 循环直至区间左右端点相同
      const mid = Math.floor(left + (right - left) / 2); // 防止计算时溢出
      if (isBadVersion(mid)) {
        right = mid; // 答案在区间 [left, mid] 中
      } else {
        left = mid + 1; // 答案在区间 [mid+1, right] 中
      }
    }
    // 此时有 left == right，区间缩为一个点，即为答案
    return left;
  };
};

console.assert(solution(isBadVersion)(5) === 4);
