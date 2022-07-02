/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
  const map = new Map();
  nums.forEach(x => map.set(x, 1 + (map.get(x) ?? 0)));
  const resp = [];
  for (let [key, value] of map.entries()) {
    if (value === 1) {
      resp.push(key);
    }
  }
  return resp;
};

var singleNumber = function (nums) {
  if (nums.length === 2) return nums;
  let xorSum = 0;

  for (const num of nums) {
    xorSum ^= num;
  }
  let type1 = 0,
    type2 = 0;
  const lsb = xorSum & -xorSum;
  for (const num of nums) {
    if (num & lsb) {
      type1 ^= num;
    } else {
      type2 ^= num;
    }
  }
  return [type1, type2];
};

console.log(singleNumber([1, 2, 1, 3, 2, 5]));
