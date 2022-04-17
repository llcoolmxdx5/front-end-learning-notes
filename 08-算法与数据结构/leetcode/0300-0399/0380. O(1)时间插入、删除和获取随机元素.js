var RandomizedSet = function () {
  this.nums = [];
  this.indices = new Map();
};

RandomizedSet.prototype.insert = function (val) {
  if (this.indices.has(val)) {
    return false;
  }
  const index = this.nums.length;
  this.nums.push(val);
  this.indices.set(val, index);
  return true;
};

RandomizedSet.prototype.remove = function (val) {
  if (!this.indices.has(val)) {
    return false;
  }
  const index = this.indices.get(val);
  this.nums[index] = this.nums[this.nums.length - 1];
  this.indices.set(this.nums[index], index);
  this.nums.pop();
  this.indices.delete(val);
  return true;
};

RandomizedSet.prototype.getRandom = function () {
  const randomIndex = Math.floor(Math.random() * this.nums.length);
  return this.nums[randomIndex];
};
