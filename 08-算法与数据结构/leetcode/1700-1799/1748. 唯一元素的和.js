/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfUnique = function (nums) {
  const map = new Map();
  let ans = 0;
  for (const num of nums) {
    map.set(num, (map.get(num) ?? 0) + 1);
  }
  for (const [num, count] of map.entries()) {
    if (count === 1) {
      ans += num;
    }
  }
  return ans;
};

var sumOfUnique = function (nums) {
  const map = new Map();
  let ans = 0;
  for (const num of nums) {
    if (!map.has(num)) {
      ans += num;
      map.set(num, 1);
    } else if (map.get(num) === 1) {
      ans -= num;
      map.set(num, 2);
    }
  }
  return ans
};

console.assert(sumOfUnique([1, 2, 3, 4, 5]) === 15, 1);
console.assert(sumOfUnique([1, 1, 1, 1, 1]) === 0, 2);
