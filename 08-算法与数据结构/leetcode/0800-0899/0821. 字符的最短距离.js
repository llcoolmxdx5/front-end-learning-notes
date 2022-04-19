/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
var shortestToChar = function (s, c) {
  const n = s.length;
  const ans = new Array(n).fill(0);

  for (let i = 0, idx = -n; i < n; ++i) {
    if (s[i] === c) {
      idx = i;
    }
    ans[i] = i - idx;
  }

  for (let i = n - 1, idx = 2 * n; i >= 0; --i) {
    if (s[i] == c) {
      idx = i;
    }
    ans[i] = Math.min(ans[i], idx - i);
  }
  return ans;
};

var shortestToChar = function (s, c) {
  const ans = [];
  const arr = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      arr.push(i);
    }
  }
  arr.push(Number.MAX_SAFE_INTEGER);
  let loop = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      ans.push(0);
      loop += 1;
    } else if (loop === 0) {
      ans.push(arr[0] - i);
    } else {
      ans.push(Math.min(Math.abs(arr[loop] - i), Math.abs(arr[loop - 1] - i)));
    }
  }
  // console.log(arr);
  // console.log(ans);
  return ans;
};

console.assert(
  shortestToChar("loveleetcode", "e").join() ===
    [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0].join(),
  1
);

console.assert(shortestToChar("aaab", "b").join() === [3, 2, 1, 0].join(), 2);

console.assert(shortestToChar("aaba", "b").join() === [2, 1, 0, 1].join(), 2);
