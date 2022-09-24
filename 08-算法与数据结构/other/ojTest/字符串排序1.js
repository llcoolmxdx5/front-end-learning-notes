// 输入有两行，第一行n
// 第二行是n个字符串，字符串之间用空格隔开

// 输出一行排序后的字符串，空格隔开，无结尾空格

// 输入
// 5
// c d a bb e

// 输出
// a bb c d e

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let curLine = -1;

/**
 * @param {string} line
 */
const handlerLine = line => {
  curLine += 1;
  if (curLine === 0) {
    return;
  }
  const arr = line.trim().split(' ');
  console.log(arr.sort().join(' '));
};

rl.addListener('line', handlerLine);

rl.addListener('close', () => {
  rl.removeListener('line', handlerLine);
});
