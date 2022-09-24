/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let l = 0; // 定义左指针
  let res = 0; // 结果
  let map = new Map(); // 存放字符和对应下标
  for (let r = 0; r < s.length; r++) {
    const char = s[r];
    // 如果出现了重复字符，则把左指针移到重复字符的下一位。注意同时满足重复字符的索引大于左指针。
    if (map.has(char) && map.get(char) >= l) {
      l = map.get(char) + 1;
    }
    res = Math.max(res, r - l + 1); // 计算结果
    map.set(char, r); // 存下每个字符的下标
  }
  return res;
};

var lengthOfLongestSubstring = function (s) {
  /** 该做法能获得最长子串 */
  let length = 0;
  let map = new Map();
  for (let index = 0; index < s.length; index++) {
    const char = s[index];
    if (!map.has(char)) {
      map.set(char, index);
    } else if (index - map.size === map.get(char)) {
      // 第一个
      map.delete(char);
      map.set(char, index);
    } else {
      // 非第一个
      let start = map.get(char) + 1;
      const size = map.size;
      length = Math.max(size, length);
      for (let [key, value] of map.entries()) {
        if (value < start) {
          map.delete(key);
        } else {
          break;
        }
      }
      map.set(char, index);
    }
  }
  return Math.max(length, map.size);
};

console.log(lengthOfLongestSubstring('abcabcbb')); // 3
console.log(lengthOfLongestSubstring('bbbbb')); // 1
console.log(lengthOfLongestSubstring('pwwkew')); // 3
console.log(lengthOfLongestSubstring('')); // 0
console.log(lengthOfLongestSubstring('umvejcuuk')); // 6
console.log(lengthOfLongestSubstring('kdgjkjhglfp')); // 7
