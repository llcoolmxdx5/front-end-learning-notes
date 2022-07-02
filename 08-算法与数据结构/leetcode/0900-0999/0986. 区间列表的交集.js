/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function (firstList, secondList) {
  const n = firstList.length,
    m = secondList.length;
  const res = [];
  let i = 0,
    j = 0;
  while (i < n && j < m) {
    const low = Math.max(firstList[i][0], secondList[j][0]);
    const high = Math.min(firstList[i][1], secondList[j][1]);
    if (low <= high) {
      res.push([low, high]);
    }
    if (firstList[i][1] < secondList[j][1]) {
      i += 1;
    } else {
      j += 1;
    }
    // console.log(res);
  }
  return res;
};

console.log(
  intervalIntersection(
    [
      [0, 2],
      [5, 10],
      [13, 23],
      [24, 25],
    ],
    [
      [1, 5],
      [8, 12],
      [15, 24],
      [25, 26],
    ],
  ),
); // [[1, 2],[5, 5],[8, 10],[15, 23],[24, 24],[25, 25]];

console.log(intervalIntersection([[5, 10]], [[3, 10]])); //[[5,10]]
console.log(intervalIntersection([[1, 6]], [[2, 5]])); // [[2, 5]]

console.log(
  intervalIntersection(
    [
      [1, 2],
      [5, 10],
      [13, 23],
      [24, 25],
    ],
    [
      [2, 5],
      [8, 12],
      [15, 24],
      [25, 26],
    ],
  ),
); // [[2, 2], [5, 5], [8, 10], [15, 23], [24, 24],[25, 25]]

console.log(
  intervalIntersection(
    [],
    [
      [4, 8],
      [10, 12],
    ],
  ),
); // []

console.log(intervalIntersection([[1, 7]], [[3, 10]])); // [[3, 7]]
