/**
 * @param {number} n
 * @return {string[]}
 */
var simplifiedFractions = function (n) {
  const ans = [];
  for (let i = 1; i < n; i++) {
    for (let j = i + 1; j <= n; j++) {
      if (gcd(i, j) === 1) {
        ans.push(`${i}/${j}`);
      }
    }
  }
  return ans;
};

const gcd = (a, b) => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};

console.log(simplifiedFractions(6)); // ["1/2", "1/3", "1/4", "2/3", "3/4"]
