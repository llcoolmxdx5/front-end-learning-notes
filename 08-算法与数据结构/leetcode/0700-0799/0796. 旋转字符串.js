/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function (s, goal) {
  if (s.length !== goal.length) return false;
  if (s === goal) return true;
  for (let i = 0; i < s.length; i++) {
    if (s.slice(i + 1) + s.slice(0, i + 1) === goal) {
      return true;
    }
  }
  return false;
};

var rotateString = function (s, goal) {
  return s.length === goal.length && (s + s).indexOf(goal) !== -1;
};

console.assert(rotateString('abcde', 'cdeab') === true, 1);
console.assert(rotateString('cdeab', 'abcde') === true, 2);
console.assert(rotateString('abcde', 'abced') === false, 3);
console.assert(rotateString('bbbacddceeb', 'ceebbbbacdd') === true, 4);
