/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
// var isRectangleCover = function (rectangles) {
//   const map = new Map();
//   const { length } = rectangles;
//   let minX = Number.MAX_SAFE_INTEGER;
//   let minY = Number.MAX_SAFE_INTEGER;
//   let maxX = -Number.MAX_SAFE_INTEGER;
//   let maxY = -Number.MAX_SAFE_INTEGER;
//   for (let i = 0; i < length; i++) {
//     const item = rectangles[i];
//     for (let j = item[1]; j < item[3]; j++) {
//       const { arr = [], count = 0 } = map.get(j) ?? {};
//       map.set(j, {
//         arr: [...arr, item[0], item[2]],
//         count: count + item[2] - item[0],
//       });
//     }
//     minX = Math.min(minX, item[0]);
//     minY = Math.min(minY, item[1]);
//     maxX = Math.max(maxX, item[2]);
//     maxY = Math.max(maxY, item[3]);
//   }
//   const gapX = maxX - minX;
//   for (let y = minY; y < maxY; y++) {
//     const { arr, count } = map.get(y);
//     arr.sort((a, b) => a - b);
//     const n = arr.length;
//     if (arr[0] !== minX || arr[n - 1] !== maxX || count !== gapX) {
//       return false;
//     }
//     for (let index = 1; index < n - 1; index += 2) {
//       if (arr[index] !== arr[index + 1]) {
//         return false;
//       }
//     }
//   }
//   return true;
// };

var isRectangleCover = function (rectangles) {
  const record = new Set();
  let minX = Number.MAX_SAFE_INTEGER,
    minY = Number.MAX_SAFE_INTEGER,
    maxX = -Number.MAX_SAFE_INTEGER,
    maxY = -Number.MAX_SAFE_INTEGER,
    sumArea = 0;
  for (const [x1, y1, x2, y2] of rectangles) {
    minX = Math.min(minX, x1);
    minY = Math.min(minY, y1);
    maxX = Math.max(maxX, x2);
    maxY = Math.max(maxY, y2);
    sumArea += (x2 - x1) * (y2 - y1);
    const arr = [`${x1} ${y1}`, `${x1} ${y2}`, `${x2} ${y1}`, `${x2} ${y2}`];
    arr.forEach((k) => (record.has(k) ? record.delete(k) : record.add(k)));
  }

  return (
    sumArea === (maxX - minX) * (maxY - minY) &&
    record.size === 4 &&
    [
      `${minX} ${minY}`,
      `${minX} ${maxY}`,
      `${maxX} ${minY}`,
      `${maxX} ${maxY}`,
    ].every((k) => record.has(k))
  );
};

console.assert(
  isRectangleCover([
    [0, 0, 3, 3],
    [1, 1, 2, 2],
    [1, 1, 2, 2],
  ]) === false,
  -1
);

console.assert(
  isRectangleCover([
    [0, 0, 4, 1],
    [7, 0, 8, 3],
    [5, 1, 6, 3],
    [6, 0, 7, 2],
    [4, 0, 5, 1],
    [4, 2, 5, 3],
    [2, 1, 4, 3],
    [0, 2, 2, 3],
    [0, 1, 2, 2],
    [6, 2, 8, 3],
    [5, 0, 6, 1],
    [4, 1, 5, 2],
  ]) === false,
  0
);

console.assert(
  isRectangleCover([
    [1, 1, 3, 3],
    [3, 1, 4, 2],
    [3, 2, 4, 4],
    [1, 3, 2, 4],
    [2, 3, 3, 4],
  ]) === true,
  1
);
console.assert(
  isRectangleCover([
    [1, 1, 2, 3],
    [1, 3, 2, 4],
    [3, 1, 4, 2],
    [3, 2, 4, 4],
  ]) === false,
  2
);
console.assert(
  isRectangleCover([
    [1, 1, 3, 3],
    [3, 1, 4, 2],
    [1, 3, 2, 4],
    [3, 2, 4, 4],
  ]) === false,
  3
);
console.assert(
  isRectangleCover([
    [1, 1, 3, 3],
    [3, 1, 4, 2],
    [1, 3, 2, 4],
    [2, 2, 4, 4],
  ]) === false,
  4
);

console.assert(
  isRectangleCover([
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [1, 1, 2, 2],
    [1, 1, 2, 2],
  ]) === false,
  5
);
console.assert(
  isRectangleCover([
    [0, 0, 1, 1],
    [1, 0, 1, 1],
  ]) === true,
  6
);
