/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const matrix = new Array(n).fill(undefined).map((_) => new Array(n).fill(undefined));
  const max = n ** 2;
  let start = 1;
  let loop = 0;
  while (start <= max) {
    for (let i = loop; i < n - loop; i++) {
      matrix[loop][i] = start;
      start += 1;
    }
    for (let j = 1 + loop; j < n - loop; j++) {
      matrix[j][n - 1 - loop] = start;
      start += 1;
    }
    for (let k = n - 2 - loop; k >= loop; k--) {
      matrix[n - 1 - loop][k] = start;
      start += 1;
    }
    for (let m = n - 2 - loop; m >= 1 + loop; m--) {
      matrix[m][loop] = start;
      start += 1;
    }
    loop += 1;
  }
  return matrix;
};

var generateMatrix = function (n) {
  const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
  const max = n ** 2;
  let start = 1;
  let loop = 0;
  while (start <= max) {
    for (let i = loop; i < n - loop; i++) {
      matrix[loop][i] = start;
      start += 1;
    }
    for (let i = loop + 1; i < n - 1 - loop; i++) {
      matrix[i][n - 1 - loop] = start;
      start += 1;
    }
    for (let i = n - 1 - loop; i >= loop; i--) {
      matrix[n - 1 - loop][i] = start;
      start += 1;
    }
    for (let i = n - loop - 2; i > loop; i--) {
      matrix[i][loop] = start;
      start += 1;
    }
    loop += 1;
  }
  if (n % 2 === 1) {
    matrix[Math.floor(n / 2)][Math.floor(n / 2)] = max;
  }
  return matrix;
};

/**
1

1 2
4 3

1 2 3
8 9 4
7 6 5

1  2  3  4
12 13 14 5
11 16 15 6
10 9  8  7
*/

console.log(generateMatrix(3));
console.log(generateMatrix(4));
console.log(generateMatrix(5));
console.log(generateMatrix(6));
console.log(generateMatrix(1));
