/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const set = new Set();
  nums.forEach(item => {
    if (set.has(item)) {
      set.delete(item);
    } else {
      set.add(item);
    }
  });
  return [...set.values()][0];
};

var singleNumber = function (nums) {
  const map = new Map();
  nums.forEach(item => {
    map.set(item, (map.get(item) ?? 0) + 1);
  });
  for (let [key, value] of map.entries()) {
    if (value === 1) {
      return key;
    }
  }
};

var singleNumber = function (nums) {
  let single = 0;
  nums.forEach(item => {
    single ^= item;
  });
  return single;
};

console.assert(singleNumber([2, 2, 1]) === 1, 1);

console.assert(singleNumber([4, 1, 2, 1, 2]) === 4, 1);
