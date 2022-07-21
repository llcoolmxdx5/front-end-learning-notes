/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const map = new Map();
  let maxLength = 0;
  for (const num of nums) {
    if (map.has(num)) {
      continue;
    }
    const left = map.get(num - 1) || 0;
    const right = map.get(num + 1) || 0;
    const curLength = right + left + 1;
    maxLength = Math.max(curLength, maxLength);
    map.set(num, curLength);
    // 更新最左端点的值，如果left=n存在，那么证明当前数的前n个都存在哈希表中
    map.set(num - left, curLength);
    map.set(num + right, curLength);
    // 此时 【num-left，num-right】范围的值都连续存在哈希表中了
  }
  return maxLength;
};

console.assert(longestConsecutive([100, 4, 200, 1, 3, 2]) === 4, 1);
console.assert(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]) === 9, 2);
