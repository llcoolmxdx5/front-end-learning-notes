/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  const { length } = nums;
  let left = 0;
  for (let right = 0; right < length; right += 1) {
    // console.log(nums, left, right);
    if (nums[left] === 0) {
      left += 1;
    }
    if (right > left && nums[right] === 0) {
      let i = left,
        j = right;
      while (i < j) {
        nums[j] = nums[j - 1];
        j -= 1;
      }
      nums[left] = 0;
    } else if (nums[right] < nums[left]) {
      let i = left,
        j = right;
      while (i < j) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i += 1;
        j -= 1;
      }
    } else if (nums[right] === nums[left] && nums[left] === 1) {
      let i = left + 1,
        j = right;
      while (nums[i] === nums[j]) {
        i += 1;
      }
      while (i < j) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i += 1;
        j -= 1;
      }
    }
  }
  // console.log(nums);
};

var sortColors = function (nums) {
  let n = nums.length;
  let ptr = 0;
  for (let i = 0; i < n; ++i) {
    if (nums[i] == 0) {
      [nums[i], nums[ptr]] = [nums[ptr], nums[i]];
      ptr += 1;
    }
  }
  for (let i = ptr; i < n; i++) {
    if (nums[i] == 1) {
      [nums[i], nums[ptr]] = [nums[ptr], nums[i]];
      ptr += 1;
    }
  }
};

var sortColors = function (nums) {
  let n = nums.length;
  let p0 = 0,
    p1 = 0;
  for (let i = 0; i < n; ++i) {
    if (nums[i] == 1) {
      [nums[i], nums[p1]] = [nums[p1], nums[i]];
      p1 += 1;
    } else if (nums[i] == 0) {
      [nums[i], nums[p0]] = [nums[p0], nums[i]];
      if (p0 < p1) {
        [nums[i], nums[p1]] = [nums[p1], nums[i]];
      }
      p0 += 1;
      p1 += 1;
    }
  }
};

var sortColors = function (nums) {
  let n = nums.length;
  let p0 = 0,
    p2 = n - 1;
  for (let i = 0; i <= p2; ++i) {
    while (i <= p2 && nums[i] == 2) {
      [nums[i], nums[p2]] = [nums[p2], nums[i]];
      --p2;
    }
    if (nums[i] == 0) {
      [nums[i], nums[p0]] = [nums[p0], nums[i]];
      ++p0;
    }
  }
};

const arr = [2, 0, 2, 1, 1, 0];
sortColors(arr);
console.assert(arr.join() === [0, 0, 1, 1, 2, 2].join(), 1);

const arr1 = [1, 2, 2, 2, 2, 0, 0, 0, 1, 1];
sortColors(arr1);
console.assert(arr1.join() === [0, 0, 0, 1, 1, 1, 2, 2, 2, 2].join(), 2);
