/**
 * @param {string[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let l = 0,
    r = s.length - 1;
  while (l < r) {
    [s[r], s[l]] = [s[l], s[r]];
    l += 1;
    r -= 1;
  }
  // console.log(s);
};

console.log(reverseString(['h', 'e', 'l', 'l', 'o'])); // ["o", "l", "l", "e", "h"]
console.log(reverseString(['H', 'a', 'n', 'n', 'a', 'h'])); // ["h", "a", "n", "n", "a", "H"]
console.log(reverseString(['H'])); // ["H"]
console.log(reverseString(['H', 'a'])); // ["a", "H"]
console.log(reverseString([])); // []
