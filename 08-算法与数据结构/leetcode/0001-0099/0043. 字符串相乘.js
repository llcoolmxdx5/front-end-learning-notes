/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0';
  }
  const arr = [];
  const s1 = num1.split('').reverse();
  const s2 = num2.split('').reverse();
  const multiple = (str, index) => {
    const res = [];
    for (let i = 0; i < index; i++) {
      res.push('0');
    }
    let sum = 0;
    for (const s of s2) {
      const m = parseInt(s) * parseInt(str) + sum;
      res.push(String(m % 10));
      sum = Math.floor(m / 10);
    }
    if (sum) {
      res.push(String(sum));
    }
    return res;
  };
  let maxLength = 0;
  for (let i = 0; i < s1.length; i++) {
    const res = multiple(s1[i], i);
    arr.push(res);
    maxLength = Math.max(maxLength, res.length);
  }
  // console.log(arr);
  const ans = [];
  let add = 0;
  for (let i = 0; i < maxLength; i++) {
    let sum = add;
    for (let j = 0; j < arr.length; j++) {
      sum += parseInt(arr[j]?.[i] || 0);
    }
    ans.push(String(sum % 10));
    add = Math.floor(sum / 10);
  }
  const res = ans.reverse().join('');
  return add ? add + res : res;
};

var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0';
  }
  let l1 = num1.length,
    l2 = num2.length,
    p = new Array(l1 + l2).fill(0);
  for (let i = l1; i--; ) {
    for (let j = l2; j--; ) {
      let tmp = num1[i] * num2[j] + p[i + j + 1];
      p[i + j + 1] = tmp % 10;
      p[i + j] += Math.floor(tmp / 10);
    }
  }
  let start = 0;
  while (p[start] === 0) {
    start += 1;
  }
  return p.slice(start).join('');
};

console.assert(multiply('2', '3') === '6', 1);
console.assert(multiply('123', '456') === '56088', 2);
console.assert(multiply('123', '12') === '1476', 3);
