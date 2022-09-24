/**
 * @param {number[][]} fruits
 * @param {number} startPos
 * @param {number} k
 * @return {number}
 */
function upperBound(fruits, target) {
  let lo = 0,
    hi = fruits.length;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (fruits[mid][0] === target) {
      return mid;
    } else if (fruits[mid][0] > target) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  return lo;
}

var maxTotalFruits = function (fruits, startPos, k) {
  let noMoveVal = 0;
  let pos = upperBound(fruits, startPos);
  const left = fruits.slice(0, pos);

  if (fruits[pos]?.[0] === startPos) {
    // 不移动能获得的水果数
    noMoveVal = fruits[pos][1];
    pos += 1;
  }

  const right = fruits.slice(pos);
  // 向左走 n 步能获得的最大水果数
  const dpL = new Array(k).fill(0);
  // 向右走 n 步能获得的最大水果数
  const dpR = new Array(k).fill(0);

  let l = left.length - 1;
  for (let i = 1; i <= k; i++) {
    let cur = 0;
    if (l >= 0 && startPos - i === left[l][0]) {
      cur = left[l][1];
      l -= 1;
    }
    dpL[i] = dpL[i - 1] + cur;
  }
  let r = 0;
  for (let i = 1; i <= k; i++) {
    let cur = 0;
    if (r < right.length && startPos + i === right[r][0]) {
      cur = right[r][1];
      r += 1;
    }
    dpR[i] = dpR[i - 1] + cur;
  }
  let max = 0;
  for (let i = 1; i <= k; i++) {
    // 考虑折返一次
    max = Math.max(max, dpL[i] + (k - 2 * i >= 0 ? dpR[k - 2 * i] : 0));
    max = Math.max(max, dpR[i] + (k - 2 * i >= 0 ? dpL[k - 2 * i] : 0));
  }
  return max + noMoveVal;
};

console.assert(
  maxTotalFruits(
    [
      [2, 8],
      [6, 3],
      [8, 6],
    ],
    5,
    4,
  ) === 9,
  1,
);
console.assert(
  maxTotalFruits(
    [
      [0, 9],
      [4, 1],
      [5, 7],
      [6, 2],
      [7, 4],
      [10, 9],
    ],
    5,
    4,
  ) === 14,
  2,
);
console.assert(
  maxTotalFruits(
    [
      [0, 3],
      [6, 4],
      [8, 5],
    ],
    3,
    2,
  ) === 0,
  3,
);
console.assert(maxTotalFruits([[200000, 10000]], 200000, 200000) === 10000, 4);
