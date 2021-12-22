/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var repeatedStringMatch = function (a, b) {
  const n = a.length;
  const m = b.length;
  // 1. a长度大于b长度
  if (n > m) {
    // 1.1 b内含在a中 eg:"aa", "a"
    if (a.indexOf(b) !== -1) {
      return 1;
    }
    // 1.2 b分两部分 eg:"aaaaab", "ba"
    if ((a + a).indexOf(b) !== -1) {
      return 2;
    }
    return -1;
  }
  // 2. a长度小于等于b长度
  const index = b.indexOf(a);
  // 2.1 b中不含有完整a
  if (index === -1) {
    // 2.1.1 a分两部分 eg:abcd bcdabc
    if ((a + a).indexOf(b) !== -1) {
      return 2;
    }
    return -1;
  }
  // console.log(index, a.slice(n - index), b.slice(0, index));
  // 2.2 b一开始就是a eg: "bc", "bcbcbcb"
  if (index === 0) {
    for (let i = n; i < m; i++) {
      const value = i % n;
      if (a[value] !== b[i]) {
        return -1;
      }
    }
    return Math.floor(m / n) + (m % n);
  }
  // 2.3 b中间有完整a
  // 2.3.1 b第一个完整a前面不是a的后部分 eg "abc", "babcabca"
  if (a.slice(n - index) !== b.slice(0, index)) {
    return -1;
  }
  let lastNum = 0; // b在a重复后的字符长度
  for (let i = index; i < m; ) {
    if (b.slice(i, i + n) === a) {
      i += n;
    } else {
      lastNum = m - i;
      break;
    }
  }
  let ans = Math.floor((m - index) / n); // 完整a有几个
  // 2.3.2 b在最后一个完整a后没有了 eg "abc", "cabcabc"
  if (lastNum === 0) {
    return ans + 1;
  }
  // 2.3.3 b最后一个完整a后面不是a的前部分 eg "abc", "cabcabcb"
  // console.log(lastNum, a.slice(0, lastNum), b.slice(ans * n + lastNum));
  if (a.slice(0, lastNum) !== b.slice(ans * n + lastNum)) {
    return -1;
  }
  // 2.3.4 b在最后一个完整a后还有一点点 eg "abc", "cabcabca"
  return ans + 2;
};

var repeatedStringMatch = function (a, b) {
  // 覆盖b字符串至少需要 [b/a]个a字符串，至多需要[b/a]+1个a字符串。
  const l = Math.ceil(b.length / a.length);
  if (a.repeat(l).includes(b)) return l;
  if (a.repeat(l + 1).includes(b)) return l + 1;
  return -1;
};

console.assert(repeatedStringMatch("abcd", "cdabcdab") === 3, 1);
console.assert(repeatedStringMatch("a", "aa") === 2, 2);
console.assert(repeatedStringMatch("a", "a") === 1, 3);
console.assert(repeatedStringMatch("abc", "wxyz") === -1, 4);
console.assert(repeatedStringMatch("aa", "a") === 1, 5);
console.assert(repeatedStringMatch("abc", "cabcabca") === 4, 6);
console.assert(repeatedStringMatch("aaaaaaaaaaaaaaaaaaaaaab", "ba") === 2, 7);
console.assert(repeatedStringMatch("bc", "bcbcbcb") === 4, 8);
console.assert(repeatedStringMatch("abcd", "abcdb") === -1, 9);
console.assert(repeatedStringMatch("abcd", "cdabcdacdabcda") === -1, 10);
