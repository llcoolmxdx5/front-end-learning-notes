/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const names = path.split('/');
  const stack = [];
  for (const name of names) {
    if (name === '..') {
      if (stack.length) {
        stack.pop();
      }
    } else if (name.length && name !== '.') {
      stack.push(name);
    }
  }
  // console.log(stack);
  return '/' + stack.join('/');
};

console.assert(simplifyPath('/home/') === '/home', 1);
console.assert(simplifyPath('/../') === '/', 2);
console.assert(simplifyPath('/home//foo/') === '/home/foo', 3);
console.assert(simplifyPath('/a/./b/../../c/') === '/c', 4);
