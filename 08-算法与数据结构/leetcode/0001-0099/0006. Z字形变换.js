/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows === 1) {
    return s;
  }
  const arr = Array.from({ length: numRows }, () => []);
  let row = 0;
  let direction = true;
  for (const str of s) {
    if (row === 0) {
      direction = true;
    } else if (row === numRows - 1) {
      direction = false;
    }
    arr[row].push(str);
    if (direction) {
      row += 1;
    } else {
      row -= 1;
    }
  }
  return arr.join("").split(",").join("");
};

var convert = function (s, numRows) {
  const n = s.length,
    r = numRows;
  if (r === 1 || r >= n) {
    return s;
  }
  const t = r * 2 - 2;
  const ans = [];
  for (let i = 0; i < r; i++) {
    // 枚举矩阵的行
    for (let j = 0; j < n - i; j += t) {
      // 枚举每个周期的起始下标
      ans.push(s[j + i]); // 当前周期的第一个字符
      if (0 < i && (i < r - 1) & (j + t - i < n)) {
        ans.push(s[j + t - i]); // 当前周期的第二个字符
      }
    }
  }
  return ans.join("");
};

console.assert(convert("PAYPALISHIRING", 3) === "PAHNAPLSIIGYIR", 1);
console.assert(convert("PAYPALISHIRING", 4) === "PINALSIGYAHRPI", 2);
console.assert(convert("PAYPALISHIRING", 1) === "PAYPALISHIRING", 3);
