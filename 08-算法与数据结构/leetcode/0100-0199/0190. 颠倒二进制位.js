/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  let ret = 0;
  let i = 0;
  while (n) {
    i += 1;
    if (n % 2) {
      ret += Math.pow(2, 32 - i);
    }
    n = Math.floor(n / 2);
  }
  return ret;
};

var reverseBits = function (n) {
  const M1 = 0x55555555; // 01010101010101010101010101010101
  const M2 = 0x33333333; // 00110011001100110011001100110011
  const M4 = 0x0f0f0f0f; // 00001111000011110000111100001111
  const M8 = 0x00ff00ff; // 00000000111111110000000011111111

  n = ((n >>> 1) & M1) | ((n & M1) << 1);
  n = ((n >>> 2) & M2) | ((n & M2) << 2);
  n = ((n >>> 4) & M4) | ((n & M4) << 4);
  n = ((n >>> 8) & M8) | ((n & M8) << 8);
  return ((n >>> 16) | (n << 16)) >>> 0;
};

console.assert(
  reverseBits(0b00000010100101000001111010011100) === 964176192,
  1
);

console.assert(
  reverseBits(0b11111111111111111111111111111101) === 3221225471,
  2
);
