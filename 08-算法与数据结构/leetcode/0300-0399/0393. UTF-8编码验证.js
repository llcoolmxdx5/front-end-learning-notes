/**
 * @param {number[]} data
 * @return {boolean}
 */
var validUtf8 = function (data) {
  const n = data.length;
  const getPrefix1Count = (num) => {
    const binary = num.toString(2);
    // console.log(binary);
    if (binary.length < 8) {
      return 0;
    }
    let count = 0;
    for (let i = 0; i < binary.length; i++) {
      if (binary[i] === "1") {
        count += 1;
      } else {
        break;
      }
    }
    return count;
  };
  let diff = 0;
  for (const num of data) {
    const count = getPrefix1Count(num);
    // console.log(count, diff);
    if (count > 4) {
      return false;
    }
    if (diff === 0) {
      if (count === 1) {
        return false;
      }
      if (count === 0) {
        continue;
      }
      diff = count - 1;
    } else if (count === 1) {
      diff -= 1;
    } else {
      return false;
    }
  }
  if (diff) {
    return false;
  }
  return true;
};

console.assert(validUtf8([197, 130, 1]) === true, 1);
console.assert(validUtf8([235, 140, 4]) === false, 2);
console.assert(validUtf8([250, 145, 145, 145, 145]) === false, 3);
