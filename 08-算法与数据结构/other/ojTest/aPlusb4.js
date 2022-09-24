// 输入数据包括多组。
// 每组数据一行,每行的第一个整数为整数的个数n(1 <= n <= 100), n为0的时候结束输入。
// 接下来n个正整数,即需要求和的每个正整数。

// 每组数据输出求和的结果

// 输入
// 4 1 2 3 4
// 5 1 2 3 4 5
// 0

// 输出
// 10
// 15

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let flag = false;

rl.on('line', function (line) {
  const [a, ...b] = line.split(' ').map(v => parseInt(v));
  if (a === 0 || flag) {
    flag = true;
    return;
  }
  const sum = b.reduce((prev, cur) => {
    return prev + cur;
  }, 0);
  console.log(sum);
});
