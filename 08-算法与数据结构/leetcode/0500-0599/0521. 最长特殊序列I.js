/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var findLUSlength = function (a, b) {
  if (a.length === b.length) {
    if (a === b) {
      return -1;
    }
    return a.length;
  }
  return Math.max(a.length, b.length);
};

console.assert(findLUSlength('aba', 'cdc') === 3, 1);
console.assert(findLUSlength('aaa', 'bbb') === 3, 2);
console.assert(findLUSlength('aaa', 'aaa') === -1, 3);
