// 输入数据有多组, 每行表示一组输入数据。
// 每行的第一个整数为整数的个数n(1 <= n <= 100)。
// 接下来n个正整数, 即需要求和的每个正整数

// 每组数据输出求和的结果

// 输入
// 4 1 2 3 4
// 5 1 2 3 4 5

// 输出
// 10
// 15

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (line) {
  const [a, ...b] = line.split(' ').map(v => parseInt(v));
  const sum = b.reduce((prev, cur) => {
    return prev + cur;
  }, 0);
  console.log(sum);
});
