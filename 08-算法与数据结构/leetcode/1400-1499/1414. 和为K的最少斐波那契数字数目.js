const getFibonacciNumbers = () => {
  const dp = [1, 1];
  for (let i = 2; i < 1000; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    if (dp[i] > 10 ** 9) {
      break;
    }
  }
  return dp;
};
/**
 * @param {number} k
 * @return {number}
 */
var findMinFibonacciNumbers = function (k) {
  const fibonacciNumbers = [
    1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946,
    17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578,
    5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296,
    433494437, 701408733,
  ];
  const findMax = (target) => {
    let left = 0;
    let right = fibonacciNumbers.length;
    while (left < right) {
      const mid = left + Math.floor((right - left + 1) / 2);
      const value = fibonacciNumbers[mid];
      if (value === target) {
        return target;
      } else if (value < target) {
        left = mid;
      } else {
        right = mid - 1;
      }
    }
    return fibonacciNumbers[right];
  };
  let ans = 0;
  while (k) {
    k -= findMax(k);
    ans += 1;
  }
  return ans;
};

console.assert(findMinFibonacciNumbers(7) === 2, 1);
console.assert(findMinFibonacciNumbers(19) === 3, 2);
