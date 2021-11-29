export default class PriorityQueue<T = number> {
  private heap: T[] = [];
  private size = 0;
  private compare: (a: T, b: T) => boolean;
  constructor(compare: (a: T, b: T) => boolean = (a, b) => a < b) {
    this.compare = compare;
  }

  public insert(item: T) {
    this.heap.push(item);
    this.size += 1;
    this.up(this.size - 1);
  }

  public remove() {
    const delItem = this.heap[0];
    this.swap(this.size - 1, 0);
    this.size -= 1;
    this.heap.length -= 1;
    this.down(0);
    return delItem;
  }

  private down(k: number) {
    let left = k * 2 + 1,
      right = k * 2 + 2,
      largest = k;

    if (left < this.size && this.compare(this.heap[left], this.heap[largest])) {
      largest = left;
    }

    if (
      right < this.size &&
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

const kthSmallestPrimeFraction = function (arr: number[], k: number) {
  const pq = new PriorityQueue<[number, number]>(
    (a, b) => arr[a[0]] * arr[b[1]] < arr[a[1]] * arr[b[0]]
  );
  const { length } = arr;
  for (let i = 1; i < length; i++) {
    pq.insert([0, i]);
  }
  let cur: [number, number] = [0, length - 1];
  for (let r = 0; r < k; r++) {
    cur = pq.remove();
    const [i, j] = cur;
    if (i < j - 1) {
      pq.insert([i + 1, j]);
    }
  }
  return [arr[cur[0]], arr[cur[1]]];
};

console.log(kthSmallestPrimeFraction([1, 13, 17, 59], 6).join() === "13,17", 3);
