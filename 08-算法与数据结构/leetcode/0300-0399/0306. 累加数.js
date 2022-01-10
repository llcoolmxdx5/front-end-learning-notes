/**
 * @param {string} num
 * @return {boolean}
 */
var isAdditiveNumber = function (num) {
  const getValid = (first, second, rest) => {
    const str = (BigInt(first) + BigInt(second)).toString();
    if (rest.slice(0, str.length) === str) {
      if (!rest.slice(str.length)) {
        return true;
      }
      return getValid(second, str, rest.slice(str.length));
    }
    return false;
  };
  for (let i = 0, len = num.length; i < len; i++) {
    const first = num.slice(0, i + 1);
    if (num[0] === "0" && first.length > 1) {
      break;
    }
    for (let j = i + 1; j < len; j++) {
      const second = num.slice(i + 1, j + 1);
      // console.log(first, second, num[i + 1]);
      if (num[i + 1] === "0" && second.length > 1) {
        break;
      }
      if (len - (j + 1) < Math.max(i + 1, j - i)) break;
      if (getValid(first, second, num.slice(j + 1))) {
        return true;
      }
    }
  }
  return false;
};

console.assert(isAdditiveNumber("112358") === true, 1);
console.assert(isAdditiveNumber("199100199") === true, 2);
console.assert(isAdditiveNumber("0000000") === true, 3);
console.assert(isAdditiveNumber("0") === false, 4);
console.assert(isAdditiveNumber("101") === true, 5);
console.assert(isAdditiveNumber("011") === true, 6);
