/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (words) {
  const firstSet = new Set('qwertyuiop'.split('')); // 10
  const secondSet = new Set('asdfghjkl'.split('')); // 9
  const thirdSet = new Set('zxcvbnm'.split('')); // 7
  const resp = [];
  words.forEach((word) => {
    [firstSet, secondSet, thirdSet].some((set) => {
      if (new Set([...set, ...word.toLowerCase().split('')]).size === set.size) {
        resp.push(word);
        return true;
      }
      return false;
    });
  });
  // console.log(resp);
  return resp;
};

var findWords = function (words) {
  const list = [];
  const rowIdx = '12210111011122000010020202';
  for (const word of words) {
    let isValid = true;
    const idx = rowIdx[word[0].toLowerCase().charCodeAt() - 'a'.charCodeAt()];
    for (let i = 1; i < word.length; ++i) {
      if (rowIdx[word[i].toLowerCase().charCodeAt() - 'a'.charCodeAt()] !== idx) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      list.push(word);
    }
  }
  return list;
};

console.assert(
  findWords(['Hello', 'Alaska', 'Dad', 'Peace']).join() === ['Alaska', 'Dad'].join(),
  1
);

console.assert(findWords(['omk']).join() === [].join(), 2);
