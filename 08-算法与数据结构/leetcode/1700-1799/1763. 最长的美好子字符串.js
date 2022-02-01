/**
 * @param {string} s
 * @return {string}
 */
var longestNiceSubstring = function (s) {
  const check = (str) => {
    const set1 = new Set(str);
    const set2 = new Set(str.split("").map((item) => item.toLowerCase()));
    return set1.size === set2.size * 2;
  };
  let ans = "";
  for (let i = 0, len = s.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (j - i + 1 > ans.length && check(s.slice(i, j + 1))) {
        ans = s.slice(i, j + 1);
      }
    }
  }
  return ans;
};

var longestNiceSubstring = function (s) {
  const n = s.length;
  let maxPos = 0;
  let maxLen = 0;
  for (let i = 0; i < n; ++i) {
    let lower = 0;
    let upper = 0;
    for (let j = i; j < n; ++j) {
      if ("a" <= s[j] && s[j] <= "z") {
        lower |= 1 << (s[j].charCodeAt() - "a".charCodeAt());
      } else {
        upper |= 1 << (s[j].charCodeAt() - "A".charCodeAt());
      }
      if (lower === upper && j - i + 1 > maxLen) {
        maxPos = i;
        maxLen = j - i + 1;
      }
    }
  }
  return s.slice(maxPos, maxPos + maxLen);
};

var longestNiceSubstring = function (s) {
  if (s.length < 2) return "";
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (
      (c < 97 && s.indexOf(String.fromCharCode(c + 32)) == -1) ||
      (c >= 97 && s.indexOf(String.fromCharCode(c - 32)) == -1)
    ) {
      const s1 = longestNiceSubstring(s.substring(0, i)),
        s2 = longestNiceSubstring(s.substring(i + 1));
      if (s1.length >= s2.length) return s1;
      return s2;
    }
  }
  return s;
};

console.assert(longestNiceSubstring("YazaAay") === "aAa", 1);
console.assert(longestNiceSubstring("Bb") === "Bb", 2);
