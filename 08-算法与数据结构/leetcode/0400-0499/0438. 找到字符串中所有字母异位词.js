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

var findAnagrams = function (s, p) {
  const { length: sLength } = s;
  const { length: pLength } = p;
  if (sLength < pLength) {
    return [];
  }
  const ans = [];
  const arrP = new Array(26).fill(0);
  for (let i = 0; i < pLength; i++) {
    arrP[p[i].charCodeAt() - 97] += 1;
  }
  const arrS = new Array(26).fill(0);
  let left = 0;
  let right = 0;
  while (right < sLength) {
    const rightCode = s[right].charCodeAt() - 97;
    arrS[rightCode] += 1;
    while (arrS[rightCode] > arrP[rightCode]) {
      arrS[s[left].charCodeAt() - 97] -= 1;
      left += 1;
    }
    if (right - left === pLength - 1) {
      ans.push(left);
    }
    right += 1;
  }
  return ans;
};

console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]

console.log(findAnagrams("abab", "ab")); // [0, 1, 2]

console.log(findAnagrams("abaacbabc", "abc")); //[3, 4, 6]
