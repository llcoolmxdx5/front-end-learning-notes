// 多个测试用例，每个测试用例一行。
// 每行通过空格隔开，有n个字符，n＜100

// 对于每组用例输出一行排序后的字符串，用','隔开，无结尾空格

// 输入
// a,c,bb
// f,dddd
// nowcoder

// 输出
// a,bb,c
// dddd,f
// nowcoder

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * @param {string} line
 */
const handlerLine = line => {
  const arr = line.trim().split(',');
  console.log(arr.sort().join(','));
};

rl.addListener('line', handlerLine);

rl.addListener('close', () => {
  rl.removeListener('line', handlerLine);
});
