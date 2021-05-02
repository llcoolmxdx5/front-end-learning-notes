const nums = [2, 7, 11, 15];
const target = 9;

const twoSum = (nums: number[], target: number) => {
  const map = new Map<number, number>();
  nums.forEach((num, index) => {
    map.set(num, index);
  })
  for (let index = 0; index < nums.length; index += 1) {
    const element = nums[index];
    const another = target - element;
    const anotherIndex = map.get(another);
    if (anotherIndex) {
      return [index, anotherIndex];
    }
  }
  return null;
};

console.log(twoSum(nums, target));
