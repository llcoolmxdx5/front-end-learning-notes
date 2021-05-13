/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const map = new Map();
  for (let index = 0; index < nums.length; index += 1) {
    const element = nums[index];
    const another = target - element;
    if (map.has(another)) {
      const anotherIndex = map.get(another);
      return [anotherIndex, index];
    } else {
      map.set(element, index);
    }
  }
};
