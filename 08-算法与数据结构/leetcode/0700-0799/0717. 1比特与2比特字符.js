/**
 * @param {number[]} bits
 * @return {boolean}
 */
var isOneBitCharacter = function (bits) {
  let temp;
  for (let i = 0; i < bits.length; ) {
    if (bits[i] === 0) {
      temp = 0;
      i += 1;
    } else {
      temp = bits.slice(i, i + 2);
      i += 2;
    }
  }
  // console.log(temp);
  return temp === 0;
};

console.assert(isOneBitCharacter([1, 0, 0]) === true, 1);
console.assert(isOneBitCharacter([1, 1, 1, 0]) === false, 2);
