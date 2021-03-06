/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const res = [];
  // 定义递归, curString表示当前字符串, leftNum表示当前字符串左括号个数
  const dfs = (curString, leftNum, rightNum) => {
    if (leftNum === n && rightNum === n) {
      res.push(curString);
      // 递归出口, 结束当前递归分支
      return;
    }
    if (leftNum < n) {
      dfs(curString + '(', leftNum + 1, rightNum);
    }
    if (rightNum < n && rightNum < leftNum) {
      dfs(curString + ')', leftNum, rightNum + 1);
    }
  };
  // 递归入口
  dfs('', 0, 0);
  return res;
};

console.log(generateParenthesis(3)); // ["((()))","(()())","(())()","()(())","()()()"]

console.log(generateParenthesis(1)); // ["()"]

console.log(generateParenthesis(4));
/* [
  "(((())))",
  "((()()))",
  "((())())",
  "((()))()",
  "(()(()))",
  "(()()())",
  "(()())()",
  "(())(())",
  "(())()()",
  "()((()))",
  "()(()())",
  "()(())()",
  "()()(())",
  "()()()()",
]; */
