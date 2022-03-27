/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function (n, k) {
  /** 计算节点curr下有多少比n小的子节点 */
  const getSteps = (curr, n) => {
    let steps = 0;
    let first = curr;
    let last = curr;
    while (first <= n) {
      // 当前层有符合要求的节点
      steps += Math.min(last, n) - first + 1; // 汇入
      first = first * 10; // 进入到下一层
      last = last * 10 + 9; // 进入到下一层
    }
    return steps;
  };

  let curr = 1; // 从1开始，1是字典序最小的
  k -= 1; // 如果k=1，则不进入下面的循环，直接返回1，否则说明1不是目标，找第k-1个小的数
  while (k > 0) {
    const steps = getSteps(curr, n); // steps=当前节点curr下有多少比n小的子节点(包括n)
    if (steps <= k) {
      // 不够，需要去邻近节点找
      k -= steps; // 意味着前面的steps个数包含在在curr节点下，接下来进入兄弟节点找第k-steps小的数
      curr += 1; // +1意味着到达了邻近兄弟节点
    } else {
      // 否则，在curr下
      curr = curr * 10; // 从最左侧开始搜寻
      k -= 1; // 减去当前节点
    }
  }
  return curr;
};

console.assert(findKthNumber(13, 2) === 10, 1);
console.assert(findKthNumber(1, 1) === 1, 2);
