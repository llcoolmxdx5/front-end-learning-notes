/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  let count = 0;
  const getCount = num => {
    while (num) {
      if (num % 5 === 0) {
        count += 1;
      } else {
        break;
      }
      num /= 5;
    }
  };
  for (let i = 1; i <= n; i++) {
    getCount(i);
  }
  // console.log(count);
  return count;
};

var trailingZeroes = function (n) {
  let ans = 0;
  for (let i = 5; i <= n; i += 5) {
    for (let x = i; x % 5 == 0; x /= 5) {
      ans += 1;
    }
  }
  return ans;
};
