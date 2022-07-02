/**
 * @param {number[]} releaseTimes
 * @param {string} keysPressed
 * @return {character}
 */
var slowestKey = function (releaseTimes, keysPressed) {
  let ans = keysPressed[0];
  let maxTime = releaseTimes[0];
  for (let i = 1, len = releaseTimes.length; i < len; i++) {
    const diff = releaseTimes[i] - releaseTimes[i - 1];
    if (diff > maxTime) {
      ans = keysPressed[i];
      maxTime = diff;
    } else if (diff === maxTime) {
      if (keysPressed[i] > ans) {
        ans = keysPressed[i];
      }
    }
  }
  return ans;
};

console.assert(slowestKey((releaseTimes = [9, 29, 49, 50]), (keysPressed = 'cbcd')) === 'c', 1);
console.assert(
  slowestKey((releaseTimes = [12, 23, 36, 46, 62]), (keysPressed = 'spuda')) === 'a',
  2
);
