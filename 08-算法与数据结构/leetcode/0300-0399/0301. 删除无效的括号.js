/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
  const isValid = str => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') {
        count += 1;
      } else if (str[i] === ')') {
        if (count <= 0) {
          return false;
        }
        count -= 1;
      }
    }
    return count === 0;
  };
  const ans = [];
  const set = new Set();
  const queue = [s];
  while (true) {
    const { length } = queue;
    for (let i = 0; i < length; i++) {
      const item = queue.shift();
      if (isValid(item)) {
        // 有效
        ans.push(item);
      } else if (!ans.length) {
        // 无效
        for (let j = 0; j < item.length; j++) {
          const element = item[j];
          if (['(', ')'].includes(element)) {
            const newStr = item.slice(0, j) + item.slice(j + 1);
            if (!set.has(newStr)) {
              queue.push(newStr);
              set.add(newStr);
            }
          }
        }
      }
    }
    if (ans.length) {
      return ans;
    }
  }
};

console.log(removeInvalidParentheses('()())()')); // ["(())()", "()()()"]
console.log(removeInvalidParentheses('(a)())()')); // ["(a())()","(a)()()"]
console.log(removeInvalidParentheses(')(')); // [""]
