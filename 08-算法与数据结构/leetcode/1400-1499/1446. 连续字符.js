/**
 * @param {string} s
 * @return {number}
 */
var maxPower = function (s) {
  const { length } = s;
  let power = 0;
  let temp = 0;
  for (let i = 0; i < length; i++) {
    temp += 1;
    if (s[i + 1] !== s[i]) {
      power = Math.max(power, temp);
      temp = 0;
    }
  }
  return power;
};

console.assert(maxPower('tourist') === 1, 1);
console.assert(maxPower('t') === 1, 2);
console.assert(maxPower('hooraaaaaaaaaaay') === 11, 3);
console.assert(maxPower('hooraaaaaaaaaaa') === 11, 4);
