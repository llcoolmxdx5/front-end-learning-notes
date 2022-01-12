/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  const { length } = nums;
  if (length < 3) {
    return false;
  }
  let first = nums[0];
  let second = Number.MAX_SAFE_INTEGER;
  for (let i = 1; i < length; i++) {
    const third = nums[i];
    if (third > second) {
      return true;
    }
    if (third > first) {
      second = third;
    } else if (third < first) {
      first = third;
    }
  }
  return false;
};

console.assert(increasingTriplet([1, 2, 3, 4, 5]) === true, 1);
console.assert(increasingTriplet([5, 4, 3, 2, 1]) === false, 2);
console.assert(increasingTriplet([2, 1, 5, 0, 4, 6]) === true, 3);
console.assert(increasingTriplet([20, 100, 10, 12, 5, 13]) === true, 4);
