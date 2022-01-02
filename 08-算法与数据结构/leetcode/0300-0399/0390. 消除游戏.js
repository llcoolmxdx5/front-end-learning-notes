/**
 * @param {number} n
 * @return {number}
 */
var lastRemaining = function (n) {
  let left = true;
  let head = 1;
  let step = 1;
  while (n > 1) {
    if (left || n % 2 === 1) {
      head += step;
    }
    left = !left;
    n = Math.floor(n / 2);
    step *= 2;
  }
  return head;
};
console.assert(lastRemaining(4) === 2, 4);
console.assert(lastRemaining(5) === 2, 5);
console.assert(lastRemaining(6) === 4, 6);
console.assert(lastRemaining(7) === 4, 7);
console.assert(lastRemaining(8) === 6, 8);
console.assert(lastRemaining(9) === 6, 9);
console.assert(lastRemaining(10) === 8, 10);
console.assert(lastRemaining(11) === 8, 11);
console.assert(lastRemaining(12) === 6, 12);
console.assert(lastRemaining(5555) === 1528, 5555);
