/**
 * @param {number} n
 * @return {boolean}
 */
var reorderedPowerOf2 = function (n) {
  const isPowerOf2 = (num) => {
    if ((num & (num - 1)) === 0) {
      return true;
    }
  };
  if (isPowerOf2(n)) {
    return true;
  }
  const nums = [...String(n)].sort();
  const { length } = nums;
  const backTrack = (used, idx, num) => {
    // console.log(num);
    if (idx === length) {
      return isPowerOf2(num);
    }
    for (let i = 0; i < length; i++) {
      if (used[i] || (num === 0 && nums[i] === "0")) continue;
      used[i] = true;
      if (backTrack(used, idx + 1, +nums[i] + num * 10)) {
        return true;
      }
      used[i] = false;
    }
    return false;
  };
  // console.log(nums, "nums");
  return backTrack([], 0, 0);
};

var reorderedPowerOf2 = function (n) {
  const countDigits = (num) => {
    const cnt = new Array(10).fill(0);
    while (num) {
      cnt[num % 10] += 1;
      num = Math.floor(num / 10);
    }
    return cnt.join("");
  };
  const set = new Set();
  for (let i = 1; i < 1e9; i <<= 1) {
    set.add(countDigits(i))
  }
  return set.has(countDigits(n))
};

console.assert(reorderedPowerOf2(1) === true, 1);
console.assert(reorderedPowerOf2(10) === false, 2);
console.assert(reorderedPowerOf2(16) === true, 3);
console.assert(reorderedPowerOf2(24) === false, 4);
console.assert(reorderedPowerOf2(46) === true, 5);
console.assert(reorderedPowerOf2(4609) === true, 6);
