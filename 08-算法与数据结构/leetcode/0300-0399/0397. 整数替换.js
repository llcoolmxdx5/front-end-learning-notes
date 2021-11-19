/**
 * @param {number} n
 * @return {number}
 */
var integerReplacement = function (n) {
  if (n === 1) {
    return 0;
  }
  const next = Math.floor(n / 2);
  if (n % 2 === 0) {
    return 1 + integerReplacement(next);
  }
  return 2 + Math.min(integerReplacement(next), integerReplacement(next + 1));
};

var integerReplacement = function (n) {
  const memo = new Map();
  if (n === 1) {
    return 0;
  }
  const next = Math.floor(n / 2);
  if (n % 2 === 0) {
    memo.set(n, 1 + integerReplacement(next));
  } else {
    memo.set(
      n,
      2 + Math.min(integerReplacement(next), integerReplacement(next + 1))
    );
  }
  return memo.get(n);
};

var integerReplacement = function (n) {
  let ans = 0;
  let num = n;
  while (num !== 1) {
    if (num % 2 === 0) {
      ans += 1;
      num = num / 2;
    } else if (num % 4 === 1) {
      ans += 2;
      num = Math.floor(num / 2);
    } else {
      if (num === 3) {
        return ans + 2;
      }
      ans += 2;
      num = Math.floor(num / 2) + 1;
    }
  }
  return ans;
};

console.assert(integerReplacement(8) === 3, 1);
console.assert(integerReplacement(7) === 4, 2);
console.assert(integerReplacement(88890) === 23, 3);
console.assert(integerReplacement(376) === 10, 4);
