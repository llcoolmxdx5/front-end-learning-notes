class Solution {
  /**
   * @param {number[]} nums
   */
  constructor(nums) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
      const item = nums[i];
      map.set(item, [...(map.get(item) || []), i]);
    }
    this.map = map;
  }

  /**
   * @param {number} target
   * @return {number}
   */
  pick(target) {
    const arr = this.map.get(target);
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

var Solution = function (nums) {
  this.nums = nums;
};

Solution.prototype.pick = function (target) {
  let ans = 0;
  for (let i = 0, cnt = 0; i < this.nums.length; ++i) {
    if (this.nums[i] == target) {
      cnt += 1; // 第 cnt 次遇到 target
      if (Math.floor(Math.random() * cnt) === 0) {
        ans = i;
      }
    }
  }
  return ans;
};

const s = new Solution([1, 2, 3, 3, 3]);
console.log(s.pick(3));
console.log(s.pick(3));
console.log(s.pick(1));
