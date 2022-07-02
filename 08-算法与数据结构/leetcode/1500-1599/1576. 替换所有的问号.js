/**
 * @param {string} s
 * @return {string}
 */
var modifyString = function (s) {
  const n = s.length;
  const arr = [...s];
  for (let i = 0; i < n; ++i) {
    if (arr[i] === '?') {
      for (let j = 0; j < 3; ++j) {
        if (
          (i > 0 && arr[i - 1] === String.fromCharCode(97 + j)) ||
          (i < n - 1 && arr[i + 1] === String.fromCharCode(97 + j))
        ) {
          continue;
        }
        arr[i] = String.fromCharCode(97 + j);
        break;
      }
    }
  }
  return arr.join('');
};

console.log(modifyString('???????'));
