/**
 * @param {string} s
 * @return {string}
 */
var reverseOnlyLetters = function (s) {
  const { length } = s;
  const isLetter = (str) => {
    return /[a-zA-Z]/.test(str);
  };
  let left = 0;
  let right = length - 1;
  let ans = s.split("");
  while (left < right) {
    while (left < length && !isLetter(s[left])) {
      left += 1;
    }
    while (right >= 0 && !isLetter(s[right])) {
      right -= 1;
    }
    if (left < right) {
      [ans[left], ans[right]] = [ans[right], ans[left]];
      left += 1;
      right -= 1;
    }
  }
  return ans.join("");
};

console.assert(
  reverseOnlyLetters("Test1ng-Leet=code-Q!") === "Qedo1ct-eeLg=ntse-T!",
  1
);
