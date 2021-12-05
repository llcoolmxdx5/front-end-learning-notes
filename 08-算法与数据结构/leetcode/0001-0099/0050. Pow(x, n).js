/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  return +(x ** n).toFixed(10);
};

var myPow = function (x, n) {
  const quickMul = (number) => {
    if (number === 0) {
      return 1.0;
    }
    const y = quickMul(Math.floor(number / 2));
    return number % 2 === 0 ? y * y : y * y * x;
  };
  let ans;
  if (n > 0) {
    ans = quickMul(n);
  } else {
    ans = 1.0 / quickMul(-n);
  }
  return +ans.toFixed(10);
};

var myPow = function (x, n) {
  // 迭代算法，利用二进制位
  if (x === 0) {
    // 0 的任何次方都等于 0,1 的任何次方都等于 1
    return x;
  }

  let power = n;
  if (n < 0) {
    // 如果n小于0， 求1/x的-n次方
    power *= -1;
    x = 1 / x;
  }
  let weight = x; // 权值初值为x, 即二进制位第1位的权值为x^1
  let res = 1;
  while (power !== 0) {
    // 如果当前二进制位为1， 让结果乘上这个二进制位上的权值,
    // 该位权值在上一轮迭代中已经计算出来了
    if ((power & 1) === 1) {
      res *= weight;
    }
    weight *= weight; // 计算下一个二进制位的权值
    power = Math.floor(power / 2);
  }
  return +res.toFixed(10);
};

console.assert(myPow(2.0, 10) === 1024.0, 1);
console.assert(myPow(2.1, 3) === 9.261, 2);
console.assert(myPow(2.0, -2) === 0.25, 3);
