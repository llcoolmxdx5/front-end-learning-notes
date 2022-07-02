/**
 * @param {number[]} widths
 * @param {string} s
 * @return {number[]}
 */
var numberOfLines = function (widths, s) {
  let line = 1;
  let rest = 0;
  for (const str of s) {
    const number = widths[str.charCodeAt() - 97];
    if (rest + number > 100) {
      line += 1;
      rest = number;
    } else {
      rest += number;
    }
  }
  return [line, rest];
};

console.assert(
  numberOfLines(
    [
      10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 10,
    ],
    'abcdefghijklmnopqrstuvwxyz',
  ).join() === [3, 60].join(),
  1,
);

console.assert(
  numberOfLines(
    [
      4, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      10, 10,
    ],
    'bbbcccdddaaa',
  ).join() === [2, 4].join(),
  2,
);
