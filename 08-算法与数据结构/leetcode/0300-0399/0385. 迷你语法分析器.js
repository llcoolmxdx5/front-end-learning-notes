/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     @return {void}
 *     this.setInteger = function(value) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     @return {void}
 *     this.add = function(elem) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @param {string} s
 * @return {NestedInteger}
 */
var deserialize = function (s) {
  if (s[0] !== '[') {
    return new NestedInteger(parseInt(s));
  }
  const stack = [];
  let sign = false;
  let curVal = 0;
  for (let i = 0; i < s.length; i++) {
    const str = s[i];
    switch (str) {
      case '[':
        stack.push(new NestedInteger());
        break;
      case '-':
        sign = true;
        break;
      case ',':
        console.log(curVal, stack);
        if (/[0-9]/.test(s[i - 1])) {
          stack.at(-1).add(new NestedInteger(sign ? -curVal : curVal));
        }
        curVal = 0;
        sign = false;
        break;
      case ']':
        // 只有上一个字符是数字才加入新的数字，否则可能是 "[]"
        if (/[0-9]/.test(s[i - 1])) {
          stack.at(-1).add(new NestedInteger(sign ? -curVal : curVal));
        }
        // 弹出栈，并将当前的对象加入嵌套的列表中
        if (stack.length > 1) {
          cur = stack.pop();
          stack.at(-1).add(cur);
        }
        curVal = 0;
        sign = false;
        break;
      default:
        curVal = +str + curVal * 10;
    }
  }
  console.log(stack);
  return stack.pop();
};
