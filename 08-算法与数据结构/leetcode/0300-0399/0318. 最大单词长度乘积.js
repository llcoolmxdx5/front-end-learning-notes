/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
  const { length } = words;
  const nums = new Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    const word = words[i];
    const { length: wordLength } = word;
    for (let j = 0; j < wordLength; j++) {
      nums[i] |= 1 << (word[j].charCodeAt() - 97);
    }
  }
  let ans = 0;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if ((nums[i] & nums[j]) === 0) {
        ans = Math.max(ans, words[i].length * words[j].length);
      }
    }
  }
  // console.log(nums);
  return ans;
};

console.assert(maxProduct(['abcw', 'baz', 'foo', 'bar', 'xtfn', 'abcdef']) === 16, 1);
