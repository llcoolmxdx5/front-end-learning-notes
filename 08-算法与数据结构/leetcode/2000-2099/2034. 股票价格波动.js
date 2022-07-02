import PriorityQueue from '../../datastructure/Queue/PriorityQueue';

class StockPrice {
  constructor() {
    this.maxTime = 0;
    this.timeMap = new Map();
    this.maxPrice = new PriorityQueue((a, b) => a[0] - b[0] > 0);
    this.minPrice = new PriorityQueue((a, b) => a[0] - b[0] < 0);
  }

  /**
   * @param {number} timestamp
   * @param {number} price
   * @return {void}
   */
  update(timestamp, price) {
    this.maxTime = Math.max(timestamp, this.maxTime);
    this.timeMap.set(timestamp, price);
    this.maxPrice.offer([price, timestamp]);
    this.minPrice.offer([price, timestamp]);
  }

  /**
   * @return {number}
   */
  current() {
    return this.timeMap.get(this.maxTime);
  }

  /**
   * @return {number}
   */
  maximum() {
    while (true) {
      const cur = this.maxPrice.peek();
      if (this.timeMap.get(cur[1]) === cur[0]) return cur[0];
      this.maxPrice.poll();
    }
  }

  /**
   * @return {number}
   */
  minimum() {
    while (true) {
      const cur = this.minPrice.peek();
      if (this.timeMap.get(cur[1]) === cur[0]) return cur[0];
      this.minPrice.poll();
    }
  }
}

const arr = ['update', 'update', 'current', 'maximum', 'update', 'maximum', 'update', 'minimum'];
const values = [[1, 10], [2, 5], [], [], [1, 3], [], [4, 2], []];

const stockPrice = new StockPrice();
for (let i = 0; i < arr.length; i++) {
  console.log(stockPrice[arr[i]](...values[i]));
  // [null, null, null, 5, 10, null, 5, null, 2]
}
