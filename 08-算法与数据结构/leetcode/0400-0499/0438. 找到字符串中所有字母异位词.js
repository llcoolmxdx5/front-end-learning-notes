/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  if (s.length < p.length) {
    return [];
  }
  const mapP = new Map();
  for (let i = 0; i < p.length; i++) {
    mapP.set(p[i], (mapP.get(p[i]) ?? 0) + 1);
  }
  const mapS = new Map();
  const res = [];
  let left = (right = 0);
  while (right < s.length) {
    mapS.set(s[right], (mapS.get(s[right]) ?? 0) + 1);
    while ((mapP.get(s[right]) ?? 0) < mapS.get(s[right])) {
      mapS.set(s[left], mapS.get(s[left]) - 1);
      left += 1;
    }
    if (right - left === p.length - 1) {
      res.push(left);
      mapS.set(s[left], mapS.get(s[left]) - 1);
      left += 1;
    }
    right += 1;
  }
  return res;
};

console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]

console.log(findAnagrams("abab", "ab")); // [0, 1, 2]

console.log(findAnagrams("abaacbabc", "abc")); //[3, 4, 6]
