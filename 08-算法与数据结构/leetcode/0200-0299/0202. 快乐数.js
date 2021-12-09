/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  const set = new Set().add(n);
  while (n !== 1) {
    n = n
      .toString()
      .split("")
      .reduce((acc, value) => (acc += Number(value) ** 2), 0);
    if (set.has(n)) {
      return false;
    }
    set.add(n);
  }
  return true;
};

var isHappy = function (n) {
  const set = new Set([4, 16, 37, 58, 89, 145, 42, 20]);
  while (n !== 1) {
    n = n
      .toString()
      .split("")
      .reduce((acc, value) => (acc += Number(value) ** 2), 0);
    if (set.has(n)) {
      return false;
    }
  }
  return true;
};

console.assert(isHappy(19) === true, 1);
console.assert(isHappy(2) === false, 2);
