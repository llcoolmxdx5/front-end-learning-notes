export default class Queue<T = number> {
  private count = 0;
  private lowestCount = 0;
  private items: Map<number, T> = new Map();

  public enqueue(...args: T[]) {
    args.forEach(item => {
      this.items.set(this.count, item);
      this.count += 1;
    });
  }
  public isEmpty() {
    return this.size() === 0;
  }
  public dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items.get(this.lowestCount);
    this.items.delete(this.lowestCount);
    this.lowestCount += 1;
    return res;
  }
  public peek() {
    return this.items.get(this.lowestCount);
  }
  public size() {
    return this.items.size;
  }
  public clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items.clear();
  }
  public toString() {
    if (this.isEmpty()) {
      return '';
    }
    return Array.from({ length: this.size() }, (_, index) =>
      this.items.get(this.lowestCount + index),
    ).join(',');
  }
}

// const queue = new Queue();
// queue.enqueue(1, 2, 3);
// queue.dequeue();
// console.log(queue.toString());
