/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length % 2 !== 0) return false;
  const map = new Map();
  map.set('(', ')').set('{', '}').set('[', ']');
  const stack = [];
  const arr = s.split('');
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    if (map.has(ele)) {
      stack.push(ele);
    } else {
      const res = stack.pop();
      if (map.get(res) !== ele) return false;
    }
  }
  return !stack.length;
};

console.log(isValid('()')); // true
console.log(isValid('([)]')); // false
console.log(isValid('(')); // false
console.log(isValid('{[]}')); // true
