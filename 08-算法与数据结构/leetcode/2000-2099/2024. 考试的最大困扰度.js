/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
var maxConsecutiveAnswers = function (answerKey, k) {
  const n = answerKey.length;
  const maxConsecutiveChar = (char) => {
    let ans = 0;
    for (let left = 0, right = 0, sum = 0; right < n; right++) {
      sum += answerKey[right] !== char;
      while (sum > k) {
        sum -= answerKey[left] !== char;
        left += 1;
      }
      ans = Math.max(ans, right - left + 1);
    }
    return ans;
  };
  return Math.max(maxConsecutiveChar('T'), maxConsecutiveChar('F'));
};

console.assert(maxConsecutiveAnswers('TTFF', 2) === 4, 1);
console.assert(maxConsecutiveAnswers('TTFTTFTT', 1) === 5, 2);
