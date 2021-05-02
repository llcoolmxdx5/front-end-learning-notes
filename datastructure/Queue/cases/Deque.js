class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  size() {
    return this.count - this.lowestCount;
  }
  isEmpty() {
    return this.size() === 0;
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    return new Array(this.size())
      .fill("")
      .map((i, index) => this.items[this.lowestCount + index])
      .join(",");
  }
  addFront() {
    const length = [...arguments].length;
    new Array(length).fill("").forEach((i, index) => {
      this.items[this.lowestCount + length + index] = this.items[
        this.lowestCount + index
      ];
    });
    [...arguments].forEach((item, i) => {
      this.items[this.lowestCount + i] = item;
      this.count += 1;
    });
  }
  addBack() {
    [...arguments].forEach((item) => {
      this.items[this.count] = item;
      this.count++;
    });
  }
  removeFront() {
    delete this.items[this.lowestCount];
    this.lowestCount += 1;
  }
  removeBack() {
    delete this.items[this.count - 1];
    this.count -= 1;
  }
  peekFront() {
    return this.items[this.lowestCount];
  }
  peekBack() {
    return this.items[this.count - 1];
  }
}

module.exports = Deque;

// const deque = new Deque();
// console.log(deque.isEmpty()); // 输出 true
// deque.addBack("John");
// deque.addBack("Jack");
// console.log(deque.toString()); // John, Jack
// deque.addBack("Camila");
// console.log(deque.toString()); // John, Jack, Camila
// console.log(deque.size()); // 输出 3
// console.log(deque.isEmpty()); // 输出 false
// deque.removeFront(); // 移除 John
// console.log(deque.toString()); // Jack, Camila
// deque.removeBack(); // Camila 决定离开
// console.log(deque.toString()); // Jack
// deque.addFront("John"); // John 回来询问一些信息
// console.log(deque.toString()); // John, Jack
