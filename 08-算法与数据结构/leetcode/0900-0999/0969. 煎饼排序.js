/**
 * @param {number[]} arr
 * @return {number[]}
 */
var pancakeSort = function (arr) {
  const ans = [];
  const swap = (start, end) => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start += 1;
      end -= 1;
    }
  };
  let max = arr.length;
  while (max !== 0) {
    const index = arr.indexOf(max);
    if (index !== max - 1) {
      swap(0, index);
      ans.push(index + 1);
      swap(0, max - 1);
      ans.push(max);
    }
    max -= 1;
  }
  // console.log(arr);
  return ans;
};

console.log(pancakeSort([3, 2, 4, 1]));
console.log(pancakeSort([1, 2, 3]));
