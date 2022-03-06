/**
 * @param {number[]} security
 * @param {number} time
 * @return {number[]}
 */
var goodDaysToRobBank = function (security, time) {
  const ans = [];
  const { length } = security;
  const judge = (middle) => {
    for (let i = middle - time; i < middle; i++) {
      if (security[i] < security[i + 1]) {
        return false;
      }
    }
    for (let i = middle; i < middle + time; i++) {
      if (security[i] > security[i + 1]) {
        return false;
      }
    }
    return true;
  };
  for (let i = time; i < length - time; i++) {
    if (judge(i)) {
      ans.push(i);
    }
  }
  // console.log(ans);
  return ans;
};

var goodDaysToRobBank = function (security, time) {
  const ans = [];
  const { length } = security;
  const left = new Array(length).fill(0);
  const right = new Array(length).fill(0);
  for (let i = 1; i < length; i++) {
    if (security[i] <= security[i - 1]) {
      left[i] = left[i - 1] + 1;
    }
    if (security[length - i - 1] <= security[length - i]) {
      right[length - i - 1] = right[length - i] + 1;
    }
  }
  for (let i = time; i < length - time; i++) {
    if (left[i] >= time && right[i] >= time) {
      ans.push(i);
    }
  }
  return ans;
};

console.assert(
  goodDaysToRobBank([5, 3, 3, 3, 5, 6, 2], 2).join() === [2, 3].join(),
  1
);
console.assert(
  goodDaysToRobBank([1, 1, 1, 1, 1], 0).join() === [0, 1, 2, 3, 4].join(),
  2
);
console.assert(
  goodDaysToRobBank([1, 2, 3, 4, 5, 6], 2).join() === [].join(),
  3
);
