/**
 * @param {string} s
 * @return {number}
 */
var removePalindromeSub = function (s) {
  if (s.split('').reverse().join('') === s) {
    return 1;
  }
  return 2;
};

console.assert(removePalindromeSub('baabb') === 2, 1);
console.assert(removePalindromeSub('abb') === 2, 2);
console.assert(removePalindromeSub('ababa') === 1, 3);
