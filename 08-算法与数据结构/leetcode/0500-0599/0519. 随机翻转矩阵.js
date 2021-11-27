/**
 * @param {number} m
 * @param {number} n
 */
var Solution = function (m, n) {
  this.m = m;
  this.n = n;
  this.map = new Map();
  this.total = this.m * this.n - 1;
};

/**
 * @return {number[]}
 */
Solution.prototype.flip = function () {
  const x = Math.floor(Math.random() * this.total);
  const idx = this.map.get(x) || x;
  this.map.set(x, this.map.get(this.total) || this.total);
  this.total -= 1;
  return [Math.floor(idx / this.n), idx % this.n];
};

/**
 * @return {void}
 */
Solution.prototype.reset = function () {
  this.total = this.m * this.n - 1;
  this.map.clear();
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(m, n)
 * var param_1 = obj.flip()
 * obj.reset()
 */

const solution = new Solution(3, 1);
console.log(solution.flip()); // 返回 [1, 0]，此时返回 [0,0]、[1,0] 和 [2,0] 的概率应当相同
console.log(solution.flip()); // 返回 [2, 0]，因为 [1,0] 已经返回过了，此时返回 [2,0] 和 [0,0] 的概率应当相同
console.log(solution.flip()); // 返回 [0, 0]，根据前面已经返回过的下标，此时只能返回 [0,0]
solution.reset(); // 所有值都重置为 0 ，并可以再次选择下标返回
console.log(solution.flip()); // 返回 [2, 0]，此时返回 [0,0]、[1,0] 和 [2,0] 的概率应当相同
