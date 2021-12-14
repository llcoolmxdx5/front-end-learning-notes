export default class PriorityQueue<T = number> {
  private heap: T[] = [];
  private compare: (a: T, b: T) => boolean;
  constructor(compare: (a: T, b: T) => boolean = (a, b) => a < b) {
    this.compare = compare;
  }

  /** 添加元素 */
  public offer(item: T) {
    this.heap.push(item);
    this.up(this.heap.length - 1);
  }

  /** 返回队首元素, 队首元素出队列 */
  public poll() {
    const delItem = this.heap[0];
    this.swap(this.heap.length - 1, 0);
    this.heap.length -= 1;
    this.down(0);
    return delItem;
  }

  /** 判断队列是否为空, 为空返回 true */
  public isEmpty() {
    return this.heap.length === 0;
  }

  /** 返回队首元素 */
  public peek() {
    return this.heap[0];
  }

  /** 返回队列元素个数 */
  public size() {
    return this.heap.length
  }

  public toString() {
    return this.heap.join(",");
  }

  private down(k: number) {
    let left = k * 2 + 1,
      right = k * 2 + 2,
      largest = k;

    if (left < this.heap.length && this.compare(this.heap[left], this.heap[largest])) {
      largest = left;
    }

    if (
      right < this.heap.length &&
      this.compare(this.heap[right], this.heap[largest])
    ) {
      largest = right;
    }

    if (largest !== k) {
      this.swap(k, largest);
      this.down(largest);
    }
  }

  private up(k: number) {
    let parent = Math.floor((k - 1) / 2);
    while (k > 0 && this.compare(this.heap[k], this.heap[parent])) {
      this.swap(k, parent);
      k = parent;
      parent = Math.floor((parent - 1) / 2);
    }
  }

  private swap(i: number, j: number) {
    const tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }
}
