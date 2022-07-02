/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var buddyStrings = function (s, goal) {
  const { length: sLength } = s;
  const { length: gLength } = goal;
  if (sLength !== gLength) {
    return false;
  }
  if (s === goal) {
    const arr = new Array(26).fill(0);
    // 相同时, 要有重复的才为 true
    for (let index = 0; index < sLength; index++) {
      const charCode = s[index].charCodeAt() - 97;
      if (arr[charCode] > 0) {
        return true;
      }
      arr[charCode] += 1;
    }
    return false;
  }
  // 不同的
  // 找到两个不同的字符，看它们的位置是否互为相等
  // 如果找到了不是两个位置不同，那肯定不是亲密字符串
  let first = -1;
  let second = -1;
  for (let index = 0; index < sLength; index++) {
    if (s[index] !== goal[index]) {
      if (first === -1) {
        first = index;
      } else if (second === -1) {
        second = index;
      } else {
        return false;
      }
    }
  }
  return second !== -1 && s[first] === goal[second] && s[second] === goal[first];
};

console.assert(buddyStrings('ab', 'ab') === false, 1);
console.assert(buddyStrings('aa', 'aa') === true, 2);
console.assert(buddyStrings('ab', 'ba') === true, 3);
console.assert(buddyStrings('aaaaaaabc', 'aaaaaaacb') === true, 4);
console.assert(buddyStrings('abcaa', 'abcbb') === false, 5);
console.assert(buddyStrings('abab', 'abab') === true, 6);
console.assert(buddyStrings('adcb', 'abdc') === false, 7);
