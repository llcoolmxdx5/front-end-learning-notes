/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const m = s.length;
  const n = t.length;
  if (m < n) {
    return '';
  }
  const sMap = new Map();
  const tMap = new Map();
  const sSet = new Set();
  const tSet = new Set(t.split(''));
  for (const str of t) {
    tMap.set(str, (tMap.get(str) || 0) + 1);
  }
  let ans = '';
  let left = 0;
  for (let right = 0; right < m; right++) {
    sMap.set(s[right], (sMap.get(s[right]) || 0) + 1);
    while (
      left <= right &&
      sMap.get(s[right]) >= (tMap.get(s[right]) || 0) &&
      sMap.get(s[left]) > (tMap.get(s[left]) || 0)
    ) {
      sMap.set(s[left], sMap.get(s[left]) - 1);
      left += 1;
    }
    if (tSet.has(s[right]) && sMap.get(s[right]) >= tMap.get(s[right])) {
      sSet.add(s[right]);
    }
    const flag = sSet.size === tSet.size;
    if (flag && right - left + 1 < (ans.length || Number.MAX_SAFE_INTEGER)) {
      ans = s.slice(left, right + 1);
    }
  }
  return ans;
};

console.assert(minWindow('ADOBECODEBANC', 'ABC') === 'BANC', 1);
console.assert(minWindow('a', 'a') === 'a', 2);
console.assert(minWindow('a', 'b') === '', 3);
