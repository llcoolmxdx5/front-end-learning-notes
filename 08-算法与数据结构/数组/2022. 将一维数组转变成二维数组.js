/**
 * @param {number[]} original
 * @param {number} m
 * @param {number} n
 * @return {number[][]}
 */
var construct2DArray = function (original, m, n) {
  const { length } = original;
  if (length !== m * n) {
    return [];
  }
  const ans = [];
  for (let i = 0; i < length; ) {
    const temp = [];
    for (let j = 0; j < n; j++) {
      temp.push(original[i]);
      i += 1;
    }
    ans.push(temp);
  }
  return ans;
};

console.log(construct2DArray([1, 2, 3], 1, 3));
console.log(construct2DArray([3], 1, 2));
console.log(construct2DArray([1, 2, 3, 4], 2, 2));
