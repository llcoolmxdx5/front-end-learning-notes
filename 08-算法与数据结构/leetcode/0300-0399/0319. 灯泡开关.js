/**
 * @param {number} n
 * @return {number}
 */
var bulbSwitch = function (n) {
  return Math.floor(Math.sqrt(n + 0.5));
};

console.assert(bulbSwitch(0) === 0, 1);
console.assert(bulbSwitch(1) === 1, 2);
console.assert(bulbSwitch(3) === 1, 3);
