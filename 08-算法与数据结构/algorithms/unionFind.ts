// 并查集主要是解决图论中的动态连通性的.

// 主要实现如下几个 api

abstract class UnionFindA {
  /** 将 p 和 q 连接 */
  abstract union(p: number, q: number): void;
  /** 判断 p 和 q 是否连接 */
  abstract connected(p: number, q: number): boolean;
  /** 返回图中有多少个连通分量 */
  abstract get size(): number;
}

// 如果两个顶点之间存在路径，则称两个顶点为连通的。
// 如果无向图G中任意两个顶点都是连通的，则为连通图，否则称为非连通图。
// 其顶点个数极大的连通子图称为连通分量。

// 连通具有三个性质:

// 1. 自反性: p 和 q 是连通的
// 2. 对称性: 如果 p q 连通, 那么 q p 也是连通的
// 3. 传递性: 如果 p q 连通, 且 q r 也连通, 那么 p 和 r 也是连通的

export default class UnionFind extends UnionFindA {
  private count: number; // 统计最后剩下的连通分量
  private parent: number[]; // 记录每个元素的parent元素的数组
  constructor(n: number) {
    super();
    // 初始化，有多少个元素，就有多少个连通分量
    this.count = n;
    // 初始化，每个元素的 parent 都为它自己
    this.parent = Array.from({ length: n }, (_, index) => index);
  }

  // 查找某一个元素的顶级元素
  private findParent(p: number): number {
    // 判断当前元素 p 和他的父元素是否相同
    // 如果不同就一直往上找，直到找到最顶级的元素
    // 最顶级的元素指的是，他的 parent 等于他本身 p === parent[p]
    while (this.parent[p] !== p) {
      // 路径压缩
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p]
    }
    return p;
  }

  // 合并两个集合，
  // 找到 q 和 p 两个元素各自所在的集合的顶级元素
  // 然后把其中一个顶级元素 rootP 的 parent 改为另一个顶级元素 rootQ
  // 然后集合数量减一
  public union(p: number, q: number): void {
    const rootP = this.findParent(p);
    const rootQ = this.findParent(q);
    if (rootP !== rootQ) {
      this.parent[rootP] = rootQ;
      this.count -= 1;
    }
  }

  public connected(p: number, q: number): boolean {
    const parentP = this.findParent(p);
    const parentQ = this.findParent(q);
    return parentP === parentQ;
  }

  // 返回连通分量
  public get size(): number {
    return this.count;
  }
}
