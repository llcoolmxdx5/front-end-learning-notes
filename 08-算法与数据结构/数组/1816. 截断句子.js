/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var truncateSentence = function (s, k) {
  return s.split(' ').slice(0, k).join(' ');
};

console.assert(
  truncateSentence('What is the solution to this problem', 4) === 'What is the solution',
  1,
);
