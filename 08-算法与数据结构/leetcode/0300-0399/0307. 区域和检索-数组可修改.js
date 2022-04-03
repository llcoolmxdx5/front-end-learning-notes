class NumArray {
  /**
   * @param {number[]} nums
   */
  constructor(nums) {
    this.tree = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.add(i, nums[i]);
    }
    this.nums = nums;
    console.log(this.tree);
  }

  /**
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  update(index, val) {
    this.add(index, val - this.nums[index]);
    this.nums[index] = val;
  }

  /**
   * @param {number} left
   * @param {number} right
   * @return {number}
   */
  sumRange(left, right) {
    const res = this.prefixSum(right + 1) - this.prefixSum(left);
    console.log(res);
    return res;
  }

  lowBit(pos) {
    return pos & -pos;
  }

  add(index, val) {
    for (let pos = index + 1; pos < this.tree.length; pos += this.lowBit(pos)) {
      this.tree[pos] += val;
    }
  }

  prefixSum(n) {
    let ans = 0;
    for (let pos = n; pos; pos -= this.lowBit(pos)) {
      ans += this.tree[pos];
    }
    return ans;
  }
}

const numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // 返回 1 + 3 + 5 = 9
numArray.update(1, 2); // nums = [1,2,5]
numArray.sumRange(0, 2); // 返回 1 + 2 + 5 = 8
