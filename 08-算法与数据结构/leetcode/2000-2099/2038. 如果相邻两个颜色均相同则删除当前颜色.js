/**
 * @param {string} colors
 * @return {boolean}
 */
var winnerOfGame = function (colors) {
  const { length } = colors;
  let aCount = 0;
  let bCount = 0;
  for (let index = 1; index < length - 1; index++) {
    if (!colors.slice(index - 1, index + 2).includes('B')) {
      aCount += 1;
    }
    if (!colors.slice(index - 1, index + 2).includes('A')) {
      bCount += 1;
    }
  }
  // console.log(aCount,bCount);
  return aCount > bCount;
};

console.assert(winnerOfGame('AAABABB') === true, 1);
console.assert(winnerOfGame('AA') === false, 2);
