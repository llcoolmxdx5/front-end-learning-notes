/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const target = nums.length / 2;
  const map = new Map();
  for (const num of nums) {
    const count = map.get(num) || 0;
    if (count + 1 > target) {
      return num;
    }
    map.set(num, count + 1);
  }
};

var majorityElement = function (nums) {
  const { length } = nums;
  let cnt = 0,
    res = 0;
  for (const num of nums) {
    if (cnt === 0) {
      res = num;
    }
    if (res === num) {
      cnt += 1;
    } else {
      cnt -= 1;
    }
  }
  return res;
};

console.assert(majorityElement([2, 2, 1, 1, 1, 2, 2]) === 2, 1);
console.assert(majorityElement([3, 2, 3]) === 3, 2);
