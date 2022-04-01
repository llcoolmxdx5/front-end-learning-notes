/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canReorderDoubled = function (arr) {
  const n = arr.length;
  const map = new Map();
  for (const item of arr) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  const values = [...map.keys()];
  values.sort((a, b) => Math.abs(a) - Math.abs(b));
  for (const value of values) {
    if ((map.get(value * 2) || 0) < map.get(value)) {
      return false;
    }
    map.set(value * 2, (map.get(value * 2) || 0) - map.get(value));
  }
  return true;
};

console.assert(canReorderDoubled([4, -2, 2, -4]) === true, 1);
console.assert(canReorderDoubled([0, 4, -2, 0, 2, -4]) === true, 2);
console.assert(canReorderDoubled([2, 1, 2, 6]) === false, 3);
