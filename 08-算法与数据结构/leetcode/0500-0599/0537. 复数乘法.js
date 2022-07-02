/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var complexNumberMultiply = function (num1, num2) {
  const [a, b] = num1
    .slice(0, num1.length - 1)
    .split('+')
    .map(item => parseInt(item));
  const [c, d] = num2
    .slice(0, num2.length - 1)
    .split('+')
    .map(item => parseInt(item));
  // console.log(a, b, c, d);
  return `${a * c - b * d}+${a * d + b * c}i`;
};

console.assert(complexNumberMultiply('1+1i', '1+1i') === '0+2i', 1);
console.assert(complexNumberMultiply('1+-1i', '1+-1i') === '0+-2i', 2);
console.assert(complexNumberMultiply('1+-1i', '0+0i') === '0+0i', 3);
