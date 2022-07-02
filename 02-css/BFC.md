# BFC

## BFC 的布局规则

1. 内部的 Box 会在垂直方向，一个接一个地放置。

2. Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠

3. 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触

4. BFC 的区域不会与 float box 重叠。

5. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。

6. 计算 BFC 的高度时，浮动元素也参与计算

## 触发 BFC

1. 根元素(html)

2. float 属性不为 none

3. position 为 absolute 或 fixed

4. display 为 inline-block, table-cell, table-caption, flex, inline-flex

5. overflow 不为 visible
