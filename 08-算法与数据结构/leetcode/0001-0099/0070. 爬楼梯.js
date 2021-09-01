/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const arr = [1, 2];
  if (n < 3) {
    return arr[n - 1];
  }
  for (let index = 2; index < n; index++) {
    const sum = arr[0] + arr[1];
    arr[index % 2] = sum;
  }
  return arr[(n - 1) % 2];
};

var climbStairs = function (n) {
  let p = 0,
    q = 0,
    r = 1;
  for (let i = 1; i <= n; ++i) {
    p = q;
    q = r;
    r = p + q;
  }
  return r;
};

console.assert(climbStairs(2) === 2, 1);

console.assert(climbStairs(3) === 3, 2);

console.assert(climbStairs(5) === 8, 3);

console.assert(climbStairs(6) === 13, 4);

console.assert(climbStairs(18) === 4181, 5);
