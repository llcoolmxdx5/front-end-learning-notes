/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
  // 超时
  const set = new Set(words);
  const dfs = (word, start = 0) => {
    if (!word) return start > 1;
    let prefixWord = '';
    for (let i = 0, len = word.length; i < len; i++) {
      prefixWord += word[i];
      if (set.has(prefixWord)) {
        const suffixWord = word.slice(i + 1);
        if (dfs(suffixWord, start + 1)) return true;
      }
    }
    return false;
  };
  return words.filter(word => dfs(word, 0));
};

var findAllConcatenatedWordsInADict = function (words) {
  words.sort((a, b) => a.length - b.length);
  const wordSet = new Set();
  function exists(word) {
    const { length } = word;
    // 前 i 个是连接词
    const dp = Array(length + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i < length + 1; i += 1) {
      if (wordSet.has(word.slice(0, i + 1))) {
        dp[i] = true;
        continue;
      }
      for (let j = 0; j < i; j += 1) {
        if (dp[j] && wordSet.has(word.slice(j + 1, i + 1))) {
          dp[i] = true;
          break;
        }
      }
    }
    return dp[length];
  }
  return words.filter(word => {
    if (exists(word)) {
      return true;
    }
    wordSet.add(word);
    return false;
  });
};

console.log(
  findAllConcatenatedWordsInADict([
    'cat',
    'cats',
    'catsdogcats',
    'dog',
    'dogcatsdog',
    'hippopotamuses',
    'rat',
    'ratcatdogcat',
  ]),
);
// ["catsdogcats","dogcatsdog","ratcatdogcat"]

console.log(findAllConcatenatedWordsInADict(['cat', 'dog', 'catdog'])); // ["catdog"]
