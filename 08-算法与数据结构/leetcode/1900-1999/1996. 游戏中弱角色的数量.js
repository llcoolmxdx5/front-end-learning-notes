/**
 * @param {number[][]} properties
 * @return {number}
 */
var numberOfWeakCharacters = function (properties) {
  properties.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return b[0] - a[0]
  });
  console.log(properties);
  let maxDefense = properties[0][1];
  let ans = 0;
  for (let i = 1, len = properties.length; i < len; i++) {
    if (properties[i][1] < maxDefense) {
      console.log(properties[i]);
      ans += 1;
    }
    maxDefense = Math.max(maxDefense, properties[i][1]);
  }
  return ans;
};

console.assert(
  numberOfWeakCharacters([
    [10, 1],
    [5, 1],
    [7, 10],
    [4, 1],
    [5, 9],
    [6, 9],
    [7, 2],
    [1, 10],
  ]) === 4,
  0
);
console.assert(
  numberOfWeakCharacters([
    [1, 5],
    [10, 4],
    [4, 3],
  ]) === 1,
  1
);
console.assert(
  numberOfWeakCharacters([
    [5, 5],
    [6, 3],
    [3, 6],
  ]) === 0,
  1
);
console.assert(
  numberOfWeakCharacters([
    [7, 9],
    [10, 7],
    [6, 9],
    [10, 4],
    [7, 5],
    [7, 10],
  ]) === 2,
  2
);
