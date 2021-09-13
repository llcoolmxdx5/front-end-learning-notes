/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  const getString = (str) => {
    const stack = [];
    for (let index = 0; index < str.length; index++) {
      if (str[index] !== "#") {
        stack.push(str[index]);
      } else {
        stack.pop();
      }
    }
    return stack.join("");
  };
  return getString(s) === getString(t);
};

var backspaceCompare = function (s, t) {
  let n = s.length - 1,
    m = t.length - 1,
    skipS = 0,
    skipT = 0;
  while (n >= 0 || m >= 0) {
    while (n >= 0) {
      if (s[n] == "#") {
        skipS += 1;
        n -= 1;
      } else if (skipS > 0) {
        skipS -= 1;
        n -= 1;
      } else {
        break;
      }
    }
    while (m >= 0) {
      if (t[m] == "#") {
        skipT += 1;
        m -= 1;
      } else if (skipT > 0) {
        skipT -= 1;
        m -= 1;
      } else {
        break;
      }
    }
    // console.log(s[n], t[m]);
    if (n >= 0 && m >= 0) {
      if (s[n] !== t[m]) {
        return false;
      }
    } else if (n >= 0 || m >= 0) {
      return false;
    }
    n -= 1;
    m -= 1;
  }
  return true;
};

console.assert(backspaceCompare("ab#c", "ad#c") === true, 1);
console.assert(backspaceCompare("ab##", "c#d#") === true, 2);
console.assert(backspaceCompare("a##c", "#a#c") === true, 3);
console.assert(backspaceCompare("a#c", "b") === false, 4);
console.assert(backspaceCompare("##b", "b") === true, 5);
