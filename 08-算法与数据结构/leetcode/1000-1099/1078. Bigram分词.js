/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
var findOcurrences = function (text, first, second) {
  const arr = text.split(' ');
  const ans = [];
  for (let i = 0, len = arr.length; i < len - 2; i++) {
    if (arr[i] === first && arr[i + 1] === second) {
      ans.push(arr[i + 2]);
    }
  }
  // console.log(ans);
  return ans;
};

console.assert(
  findOcurrences('alice is a good girl she is a good student', 'a', 'good').join() ===
    ['girl', 'student'].join(),
  1,
);
console.assert(
  findOcurrences('alice is aa good girl she is a good student', 'a', 'good').join() ===
    ['student'].join(),
  2,
);
console.assert(
  findOcurrences('we will we will rock you', 'we', 'will').join() === ['we', 'rock'].join(),
  3,
);
