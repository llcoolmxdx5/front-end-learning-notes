/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function (left, right) {
  const isSelfDividing = (num) => {
    let temp = num;
    while (temp) {
      const digit = temp % 10;
      if (digit === 0 || num % digit !== 0) {
        return false;
      }
      temp = Math.floor(temp / 10);
    }
    return true;
  };
  const ans = [];
  for (let start = left; start <= right; start++) {
    if (isSelfDividing(start)) {
      ans.push(start);
    }
  }
  return ans;
};

console.assert(
  selfDividingNumbers(1, 22).join() === [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22].join(),
  1
);
console.assert(selfDividingNumbers(47, 85).join() === [48, 55, 66, 77].join(), 2);
