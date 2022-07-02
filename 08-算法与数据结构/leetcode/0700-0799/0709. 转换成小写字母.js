/**
 * @param {string} s
 * @return {string}
 */
var toLowerCase = function (s) {
  let res = '';
  for (let i = 0, len = s.length; i < len; i++) {
    if (/[a-zA-Z]/.test(s[i])) {
      const code = s[i].charCodeAt();
      res += String.fromCharCode(code | 32);
    } else {
      res += s[i];
    }
  }
  return res;
};
