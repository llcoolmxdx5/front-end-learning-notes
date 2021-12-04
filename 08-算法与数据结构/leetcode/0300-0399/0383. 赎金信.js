/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const arr = new Array(26).fill(0);
  const maxLen = Math.max(ransomNote.length, magazine.length);
  for (let i = 0; i < maxLen; i++) {
    if (ransomNote[i]) {
      arr[ransomNote[i].charCodeAt() - 97] -= 1;
    }
    if (magazine[i]) {
      arr[magazine[i].charCodeAt() - 97] += 1;
    }
  }
  return !arr.some((num) => num < 0);
};

console.assert(canConstruct("a", "b") === false, 1);
console.assert(canConstruct("aa", "ab") === false, 2);
console.assert(canConstruct("aa", "aab") === true, 3);
