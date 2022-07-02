/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = (s, wordDict) => {
  const { length } = s;
  let dp = Array(length + 1).fill(false);
  dp[0] = true;
  for (let i = 0; i <= length; i++) {
    for (let j = 0; j < wordDict.length; j++) {
      if (i >= wordDict[j].length) {
        if (s.slice(i - wordDict[j].length, i) === wordDict[j] && dp[i - wordDict[j].length]) {
          dp[i] = true;
        }
      }
    }
  }
  return dp[length];
};

var wordBreak = function (s, wordDict) {
  const set = new Set(wordDict);
  const maxWordLength = Math.max(...wordDict.map((x) => x.length));
  const { length } = s;
  const dp = new Array(length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (i - j > maxWordLength) {
        break;
      }
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[length];
};

console.assert(wordBreak('leetcode', ['leet', 'code']) === true, 1);
console.assert(wordBreak('applepenapple', ['apple', 'pen']) === true, 2);
console.assert(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']) === false, 3);
