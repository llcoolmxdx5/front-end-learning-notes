# BFS 广度优先搜索

## 概述

BFS 和 DFS 是常用的两种算法。其中 DFS 可以被认为是回溯算法。

BFS 找到的路径一定是最短的，但代价是空间复杂度比 DFS 大得多。

BFS 问题的本质就是让你在一幅图中找到从起点 start 到终点 target 的最近距离

## 模板

```js
const BFS = (start, target) => {
  let queue = []; // 队列 核心数据结构
  const visited = new Set(); // 避免走回头路
  queue.push(start); // 将起点加入队列
  visited.add(start);
  let step = 0; // 记录扩散的步数
  while (queue.length) {
    const next = [];
    for (const cur of queue) {
      /** 这里判断是否到达终点 */
      if(cur === target) {
        return step
      }
      /** 将 cur 的相邻节点加入队列 */
      for(x = 相邻cur) {
        if(!visited.has(x)) {
          next.push(x)
          visited.add(x)
        }
      }
    }
    queue = next;
    /** 这里更新步数 */
    step += 1
  }
};
```

## 题目

- [ ] 0111 二叉树的最小深度 简单
- [x] 0116 填充每个节点的下一个右侧节点指针 中等
- [x] 0117 填充每个节点的下一个右侧节点指针 II 中等
- [x] 0130 被围绕的区域 中等
- [x] 0200 岛屿数量 中等
- [x] 0301 删除无效的括号 困难
- [x] 0542 01 矩阵 中等
- [x] 0547 省份数量 中等
- [x] 0695 岛屿的最大面积 中等
- [x] 0733 图像渲染 简单
- [ ] 0752 打开转盘锁 中等
- [ ] 0773 滑动谜题 困难
- [x] 0994 腐烂的橘子 中等
- [x] 1091 二进制矩阵中的最短路径 中等
- [x] 1034 边界着色 中等
- [x] 1609 奇偶树 中等
