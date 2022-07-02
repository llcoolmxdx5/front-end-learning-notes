/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function (text) {
  // b a l o n
  const arr = new Array(5).fill(0);
  for (const str of text) {
    if (str === 'b') {
      arr[0] += 1;
    } else if (str === 'a') {
      arr[1] += 1;
    } else if (str === 'n') {
      arr[2] += 1;
    } else if (str === 'l') {
      arr[3] += 0.5;
    } else if (str === 'o') {
      arr[4] += 0.5;
    }
  }
  return parseInt(Math.min(...arr));
};

console.assert(maxNumberOfBalloons('loonbalxballpoon') === 2, 1);
