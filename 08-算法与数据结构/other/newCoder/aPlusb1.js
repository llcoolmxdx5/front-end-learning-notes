// 输入包括两个正整数a,b(1 <= a, b <= 1000),输入数据包括多组。
// 输出a+b的结果

// 输入
// 1 5
// 10 20

// 输出
// 6
// 30

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (line) {
  const tokens = line.split(' ');
  console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
});
