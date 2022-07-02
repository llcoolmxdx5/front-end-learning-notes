/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  const len1 = s1.length;
  const len2 = s2.length;
  if (len1 > len2) return false;
  const count1 = new Array(26).fill(0);
  const count2 = new Array(26).fill(0);
  for (let index = 0; index < len1; index++) {
    count1[s1[index].charCodeAt(0) - 97] += 1;
  }
  let start = 0;
  for (let i = 0; i < len2; i++) {
    count2[s2[i].charCodeAt(0) - 97] += 1;
    while (
      start <= i &&
      count1[s2[start].charCodeAt(0) - 97] < count2[s2[start].charCodeAt(0) - 97]
    ) {
      count2[s2[start].charCodeAt(0) - 97] -= 1;
      start += 1;
    }
    if (count1.join('') === count2.join('')) return true;
  }
  return false;
};

var checkInclusion = function (s1, s2) {
  const len1 = s1.length;
  const len2 = s2.length;
  if (len1 > len2) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < len1; i++) {
    const element = s1[i];
    count[element.charCodeAt() - 97] -= 1;
  }
  let left = 0;
  for (let right = 0; right < len2; right += 1) {
    const index = s2[right].charCodeAt() - 97;
    count[index] += 1;
    while (count[index] > 0) {
      count[s2[left].charCodeAt() - 97] -= 1;
      left += 1;
    }
    if (right - left + 1 === len1) {
      return true;
    }
  }
  return false;
};

console.assert(checkInclusion('ab', 'eidbaooo') === true, 1);
console.assert(checkInclusion('ab', 'eidboaoo') === false, 2);
console.assert(checkInclusion('a', 'b') === false, 3);
