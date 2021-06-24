/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let res = Math.abs(x);
  res = +res.toString().split("").reverse().join("");
  if (res >= 2 ** 31 - 1) {
    return 0;
  }
  return x >= 0 ? res : -res;
};

var reverse = function (x) {
  let res = Math.abs(x);
  const arr = res.toString().split("");
  const { length } = arr;
  const newArr = new Array(length);
  for (let index = 0; index < length; index++) {
    const element = arr[index];
    newArr[length - index] = element;
  }
  res = +newArr.join("");
  // 2^31-1=2147483647
  if (res >= 2147483647) {
    return 0;
  }
  return x >= 0 ? res : -res;
};

var reverse = function (x) {
  let rev = 0;
  while (x !== 0) {
    const digit = x % 10;
    x = ~~(x / 10);
    rev = rev * 10 + digit;
    if (rev < -2147483648 || rev > 2147483647) {
      return 0;
    }
  }
  return rev;
};

console.log(reverse(2 ** 32)); // 0
console.log(reverse(123)); // 321
console.log(reverse(-123)); // -321
console.log(reverse(120)); // 21
