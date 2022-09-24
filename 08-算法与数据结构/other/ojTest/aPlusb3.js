// 输入包括两个正整数a,b(1 <= a, b <= 10^9),输入数据有多组, 如果输入为0 0则结束输入

// 输出a+b的结果

// 输入
// 1 5
// 10 20
// 0 0

// 输出
// 6
// 30

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * @param {string} line
 */
const handlerLine = line => {
  const [a, b] = line.split(' ').map(v => parseInt(v));
  if (a === 0 && b === 0) {
    rl.close();
    return;
  }
  console.log(a + b);
};

rl.addListener('line', handlerLine);

rl.addListener('close', () => {
  rl.removeListener('line', handlerLine);
});
