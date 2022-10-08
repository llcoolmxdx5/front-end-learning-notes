/**
 * @param {string} str
 * @return {boolean}
 */
const isPalindrome = str => {
  const { length } = str;
  for (let i = 0; i < length / 2; i++) {
    if (str[i] !== str[length - 1 - i]) {
      return false;
    }
  }
  return true;
};

/**
 * @param {string} str
 * @return {boolean}
 */
const validPalindrome = str => {
  if (isPalindrome(str)) {
    return true;
  }
  let left = 0,
    right = str.length - 1;
  while (left < right) {
    if (str[left] === str[right]) {
      left += 1;
      right -= 1;
    } else {
      return isPalindrome(str.slice(left, right)) || isPalindrome(str.slice(left + 1, right + 1));
    }
  }
  return true;
};
