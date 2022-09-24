// 输入数据有多组, 每行表示一组输入数据。
// 每行不定有n个整数，空格隔开。(1 <= n <= 100)。

// 每组数据输出求和的结果

// 输入
// 1 2 3
// 4 5
// 0 0 0 0 0

// 输出
// 6
// 9
// 0

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (line) {
  const arr = line.split(' ').map(v => parseInt(v));
  const sum = arr.reduce((prev, cur) => {
    return prev + cur;
  }, 0);
  console.log(sum);
});
