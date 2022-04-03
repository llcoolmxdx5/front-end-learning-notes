/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
  const n = letters.length;
  if (target >= letters[n - 1]) {
    return letters[0];
  }
  let left = 0;
  let right = n - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (letters[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return letters[left];
};

console.assert(nextGreatestLetter(["c", "f", "j"], "a") === "c", 1);
console.assert(nextGreatestLetter(["c", "f", "j"], "c") === "f", 2);
