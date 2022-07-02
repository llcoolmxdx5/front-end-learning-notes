/**
 * @param {string} input
 * @return {number}
 */
var lengthLongestPath = function (input) {
  const arr = input.split('\n');
  // console.log(arr);
  const trueArr = [];
  let loop = 0;
  for (const item of arr) {
    const str = item.replace(/\t/g, '$');
    const arr1 = [];
    for (let j = 0; j < str.length; j++) {
      if (str[j] === '$') {
        arr1.push('');
      } else {
        arr1.push(str.slice(j));
        break;
      }
    }
    trueArr.push(arr1);
  }
  // console.log(trueArr);
  let ans = 0;
  let preCount = [];
  for (let i = 0; i < trueArr.length; i++) {
    const arr = trueArr[i];
    if (!/\./.test(arr.at(-1))) {
      preCount = [...preCount.slice(0, arr.length - 1), arr.at(-1).length];
      continue;
    }
    // console.log(arr, preCount);
    const temp = preCount.slice(0, arr.length - 1).reduce((prev, cur) => prev + cur, 0);
    ans = Math.max(ans, temp + arr.at(-1).length + arr.length - 1);
    // console.log(ans);
  }
  return ans;
};

var lengthLongestPath = function (input) {
  let stack = [];
  let result = 0;
  stack.push(0);
  // 1. 以\n拆分字符串
  let newArr = input.split('\n');
  for (let i = 0; i < newArr.length; i++) {
    const arr = newArr[i];
    // 2. 计算当前字符串的层级
    let level = arr.lastIndexOf('\t') + 1;
    // 2.1 如果当前字符串的层级比目前已经计算的层级要大，则将栈内的数据清理干净再计算
    while (stack.length > level + 1) {
      stack.pop();
    }
    // 2.2 获取当前所有字符串的长度
    let length = stack.at(-1) + (arr.length - level + 1);
    // 3. 将当前最新长度存到栈中
    stack.push(length);
    // 4. 如果是一个文件，则说明该层级已经到底部，输出本层循环的最终长度即可
    if (arr.includes('.')) {
      result = Math.max(result, length - 1);
    }
  }
  return result;
};

console.assert(
  lengthLongestPath(
    'dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext'
  ) === 32,
  1
);
console.assert(lengthLongestPath('a') === 0, 2);
console.assert(lengthLongestPath('dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext') === 20, 3);
console.assert(lengthLongestPath('file1.txt\nfile2.txt\nlongfile.txt') === 12, 4);
console.assert(lengthLongestPath('dir\n        file.txt') === 16, 5);
console.assert(lengthLongestPath('a\n\tb\n\t\tc.txt\n\taaaa.txt') === 10, 6);
