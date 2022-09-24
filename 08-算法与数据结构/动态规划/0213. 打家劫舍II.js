/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const length = nums.length;
  if (length === 1) {
    return nums[0];
  } else if (length === 2) {
    return Math.max(nums[0], nums[1]);
  }
  const robRange = (nums, start, end) => {
    let first = nums[start],
      second = Math.max(nums[start], nums[start + 1]);
    for (let i = start + 2; i <= end; i++) {
      [first, second] = [second, Math.max(first + nums[i], second)];
    }
    return second;
  };
  return Math.max(robRange(nums, 0, length - 2), robRange(nums, 1, length - 1));
};

var rob = function (nums) {
  const length = nums.length;
  if (length === 1) {
    return nums[0];
  } else if (length === 2) {
    return Math.max(nums[0], nums[1]);
  }
  let a1 = nums[0],
    a2 = Math.max(nums[0], nums[1]);
  let b1 = nums[1],
    b2 = Math.max(nums[1], nums[2]);
  for (let i = 2; i <= length - 1; i++) {
    if (i < length - 1) {
      let temp = a1;
      a1 = a2;
      a2 = Math.max(temp + nums[i], a2);
      // [a1, a2] = [a2, Math.max(a1 + nums[i], a2)];
    }
    if (i > 2) {
      let temp = b1;
      b1 = b2;
      b2 = Math.max(temp + nums[i], b2);
      // [b1, b2] = [b2, Math.max(b1 + nums[i], b2)];
    }
  }
  return Math.max(a2, b2);
};

console.assert(rob([2, 3, 2]) === 3, 1);

console.assert(rob([1, 2, 3, 1]) === 4, 2);

console.assert(rob([0]) === 0, 3);

console.assert(rob([2, 7, 9, 3, 1]) === 11, 4);
