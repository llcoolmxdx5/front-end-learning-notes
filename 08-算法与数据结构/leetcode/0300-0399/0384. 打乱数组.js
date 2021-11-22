const Solution = function (nums) {
  this.nums = nums;
  this.original = this.nums.slice();
};

Solution.prototype.reset = function () {
  this.nums = this.original.slice();
  return this.nums;
};

Solution.prototype.shuffle = function () {
  for (let i = 0; i < this.nums.length; ++i) {
    const j = Math.floor(Math.random() * (this.nums.length - i)) + i;
    const temp = this.nums[i];
    this.nums[i] = this.nums[j];
    this.nums[j] = temp;
  }
  return this.nums;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */

const obj = new Solution([1, 2, 3]);
const shuffle1 = obj.shuffle();
const reset1 = obj.reset();
const shuffle2 = obj.shuffle();
console.log(shuffle1, reset1, shuffle2);
