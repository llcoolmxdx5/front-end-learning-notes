// Definition for a QuadTree node.
function Node(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
  this.val = val;
  this.isLeaf = isLeaf;
  this.topLeft = topLeft;
  this.topRight = topRight;
  this.bottomLeft = bottomLeft;
  this.bottomRight = bottomRight;
}

const getVal = (grid, startX, endX, startY, endY) => {
  const val = grid[startX][startY];
  if (endX - startX === 1) {
    return {
      isLeaf: 1,
      val,
    };
  }
  for (let i = startX; i < endX; i++) {
    for (let j = startY; j < endY; j++) {
      if (grid[i][j] !== val) {
        return {
          isLeaf: 0,
          val: 1,
        };
      }
    }
  }
  return {
    isLeaf: 1,
    val,
  };
};

/**
 * @param {number[][]} grid
 * @return {Node}
 */
var construct = function (grid) {
  const n = grid.length;
  const dfs = (startX, endX, startY, endY) => {
    const { isLeaf, val } = getVal(grid, startX, endX, startY, endY);
    if (endX - startX === 1) {
      return new Node(val, isLeaf);
    }
    if (isLeaf) {
      return new Node(val, isLeaf, null, null, null, null);
    }
    const x = Math.floor((startX + endX) / 2);
    const y = Math.floor((startY + endY) / 2);
    return new Node(
      val,
      isLeaf,
      dfs(startX, x, startY, y),
      dfs(startX, x, y, endY),
      dfs(x, endX, startY, y),
      dfs(x, endX, y, endY),
    );
  };
  return dfs(0, n, 0, n);
};

console.log(
  JSON.stringify(
    construct([
      [1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 0, 0],
    ]),
  ),
);
