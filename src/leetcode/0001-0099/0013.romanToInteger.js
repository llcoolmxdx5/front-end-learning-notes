/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const obj = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  const arr = s.split("");
  let num = 0;
  for (let index = 0; index < arr.length; index++) {
    const current = obj[arr[index]];
    const next = obj[arr[index + 1]] || 0;
    if (next > current) {
      num += next - current;
      index += 1;
    } else {
      num += current;
    }
  }
  return num;
};

console.log(romanToInt("III")); // 3

console.log(romanToInt("IX")); // 9

console.log(romanToInt("XLIX")); // 49

console.log(romanToInt("LVIII")); // 58

console.log(romanToInt("MCMXCIV")); // 1994
