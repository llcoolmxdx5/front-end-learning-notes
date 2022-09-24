class MinStack {
  constructor() {
    this.arr = [];
    this.minStack = [Number.MAX_SAFE_INTEGER];
  }

  /**
   * @param {number} val
   * @return {void}
   */
  push = function (val) {
    this.arr.push(val);
    this.minStack.push(Math.min(this.minStack.at(-1), val));
  };

  pop = function () {
    this.arr.pop();
    this.minStack.pop();
  };

  /**
   * @return {number}
   */
  top = function () {
    return this.arr.at(-1);
  };

  /**
   * @return {number}
   */
  getMin = function () {
    return this.minStack.at(-1);
  };
}

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // 返回 -3.
minStack.pop();
console.log(minStack.top()); // 返回 0.
console.log(minStack.getMin()); // 返回 -2.
