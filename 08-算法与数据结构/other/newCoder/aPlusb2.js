// 输入第一行包括一个数据组数t(1 <= t <= 100)
// 接下来每行包括两个正整数a,b(1 <= a, b <= 1000)

// 输出a+b的结果

// 输入
// 2
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

let lintCount = 1;

rl.on('line', function (line) {
  if (lintCount > 1) {
    const tokens = line.split(' ');
    console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
  }
  lintCount += 1;
});
