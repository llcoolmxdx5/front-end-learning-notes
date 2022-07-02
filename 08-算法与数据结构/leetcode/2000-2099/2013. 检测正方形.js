class DetectSquares {
  constructor() {
    this.cnt = new Map();
  }

  /**
   * @param {number[]} point
   * @return {void}
   */
  add(point) {
    const [x, y] = point;
    if (!this.cnt.has(y)) {
      this.cnt.set(y, new Map());
    }
    const yCnt = this.cnt.get(y);
    yCnt.set(x, (yCnt.get(x) || 0) + 1);
  }

  /**
   * @param {number[]} point
   * @return {number}
   */
  count(point) {
    let res = 0;
    const [x, y] = point;
    if (!this.cnt.has(y)) {
      return 0;
    }
    const yCnt = this.cnt.get(y);
    const entries = this.cnt.entries();
    for (const [col, colCnt] of entries) {
      if (col !== y) {
        // 根据对称性，这里可以不用取绝对值
        let d = col - y;
        res += (colCnt.get(x) || 0) * (yCnt.get(x + d) || 0) * (colCnt.get(x + d) || 0);
        res += (colCnt.get(x) || 0) * (yCnt.get(x - d) || 0) * (colCnt.get(x - d) || 0);
      }
    }
    return res;
  }
}

const detectSquares = new DetectSquares();
detectSquares.add([3, 10]);
detectSquares.add([11, 2]);
detectSquares.add([3, 2]);
console.log(detectSquares.count([11, 10])); // 返回 1 。你可以选择：
//   - 第一个，第二个，和第三个点
console.log(detectSquares.count([14, 8])); // 返回 0 。查询点无法与数据结构中的这些点构成正方形。
detectSquares.add([11, 2]); // 允许添加重复的点。
console.log(detectSquares.count([11, 10])); // 返回 2 。你可以选择：
//   - 第一个，第二个，和第三个点
//   - 第一个，第三个，和第四个点
