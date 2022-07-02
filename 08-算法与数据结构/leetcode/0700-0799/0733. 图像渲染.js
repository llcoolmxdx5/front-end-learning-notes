/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
// bfs
var floodFill = function (image, sr, sc, newColor) {
  const oldColor = image[sr][sc];
  if (oldColor === newColor) return image;
  const { length } = image;
  const queue = [[sr, sc]];
  while (queue.length) {
    const [row, col] = queue.shift();
    image[row][col] = newColor;
    if (row - 1 >= 0 && image[row - 1][col] === oldColor) queue.push([row - 1, col]);
    if (col + 1 < image[row].length && image[row][col + 1] === oldColor) queue.push([row, col + 1]);
    if (row + 1 < length && image[row + 1][col] === oldColor) queue.push([row + 1, col]);
    if (col - 1 >= 0 && image[row][col - 1] === oldColor) queue.push([row, col - 1]);
  }
  return image;
};

// dfs
var floodFill = function (image, sr, sc, newColor) {
  const oldColor = image[sr][sc];
  if (oldColor === newColor) return image;
  const { length } = image;
  const dfs = (row, col) => {
    if (
      row < 0 ||
      row >= length ||
      col < 0 ||
      col >= image[row].length ||
      image[row][col] !== oldColor
    ) {
      return;
    }
    image[row][col] = newColor;
    // console.log(image);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row + 1, col);
    dfs(row, col - 1);
  };
  dfs(sr, sc);
  return image;
};

console.log(
  floodFill(
    [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ],
    1,
    1,
    2,
  ),
);

/**
 * [
 * [2, 2, 2],
 * [2, 2, 0],
 * [2, 0, 1],
 * ]
 */

console.log(
  floodFill(
    [
      [0, 0, 0],
      [0, 1, 1],
    ],
    1,
    1,
    1,
  ),
);
