class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  enqueue() {
    [...arguments].forEach((item) => {
      this.items[this.count] = item;
      this.count++;
    });
  }
  isEmpty() {
    return this.size() === 0;
  }
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return res;
  }
  peek() {
    return this.items[this.lowestCount];
  }
  size() {
    return this.count - this.lowestCount;
  }
  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
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
}

module.exports = Queue;

// const queue = new Queue();
// queue.enqueue(1, 2, 3);
// queue.dequeue();
// console.log(queue.toString());
