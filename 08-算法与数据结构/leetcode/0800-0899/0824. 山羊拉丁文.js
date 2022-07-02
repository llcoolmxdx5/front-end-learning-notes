/**
 * @param {string} sentence
 * @return {string}
 */
var toGoatLatin = function (sentence) {
  const arr = sentence.split(' ');
  const ans = [];
  let index = 1;
  for (const str of arr) {
    if (['a', 'e', 'i', 'o', 'u'].includes(str[0].toLowerCase())) {
      ans.push(str + 'ma' + 'a'.repeat(index));
    } else {
      ans.push(str.slice(1) + str[0] + 'ma' + 'a'.repeat(index));
    }
    index += 1;
  }
  // console.log(ans);
  return ans.join(' ');
};

console.assert(
  toGoatLatin('The quick brown fox jumped over the lazy dog') ===
    'heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa',
  1,
);
