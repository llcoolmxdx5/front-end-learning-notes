/**
 * @param {string} sentence
 * @return {number}
 */
var countValidWords = function (sentence) {
  const arr = sentence.split(' ');
  let count = 0;
  const isValid = (str) => {
    // 'a' 97, 'z' 122
    // '0' 48, '9' 57
    if (!str) return 0;
    let c1 = 0; // 连字符数量
    for (let i = 0, len = str.length; i < len; i++) {
      const charCode = str[i].charCodeAt();
      if (charCode >= 48 && charCode <= 57) return 0;
      if (str[i] === '-') {
        c1 += 1;
        if (
          i - 1 < 0 ||
          i + 1 === len ||
          str[i - 1].charCodeAt() < 97 ||
          str[i - 1].charCodeAt() > 122 ||
          str[i + 1].charCodeAt() < 97 ||
          str[i + 1].charCodeAt() > 122
        ) {
          return 0;
        }
      }
      if (c1 > 1) return 0;
      if ([',', '!', '.'].includes(str[i]) && i !== len - 1) {
        return 0;
      }
    }
    console.log(str);
    return 1;
  };
  for (const str of arr) {
    count += isValid(str);
  }
  return count;
};

console.assert(countValidWords('!this  1-s b8d!') === 0, 1);
console.assert(countValidWords('alice and  bob are playing stone-game10') === 5, 2);
console.assert(countValidWords('-') === 0, 3);
