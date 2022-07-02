/**
 * @param {string[]} words
 * @return {string}
 */
var longestWord = function (words) {
  const { length } = words;
  const queue = [];
  const map = new Map();
  for (let i = 0; i < length; i++) {
    const ele = words[i];
    if (!map.has(ele)) {
      if (ele.length === 1) {
        queue.push(ele);
      }
      map.set(ele, i);
    }
  }
  let res = [];
  let len = 0;
  while (queue.length) {
    const item = queue.shift();
    if (item.length >= len) {
      if (item.length > len) {
        len = item.length;
        res = [item];
      } else {
        res.push(item);
      }
    }
    // a-z
    for (let i = 97; i <= 122; i++) {
      const nextWord = item + String.fromCharCode(i);
      if (map.has(nextWord)) {
        queue.push(nextWord);
      }
    }
    // console.log(queue);
  }
  if (!res.length) {
    return '';
  }
  let ans = res[0];
  for (let i = 1; i < res.length; i++) {
    if (res[i] < ans) {
      ans = res[i];
    }
  }
  console.log(ans);
  return ans;
};

var longestWord = function (words) {
  words.sort((a, b) => {
    if (a.length !== b.length) {
      return a.length - b.length;
    } else {
      return b.localeCompare(a);
    }
  });
  let longest = '';
  const set = new Set();
  set.add('');
  const n = words.length;
  for (let i = 0; i < n; i++) {
    const word = words[i];
    if (set.has(word.slice(0, word.length - 1))) {
      set.add(word);
      longest = word;
    }
  }
  return longest;
};

console.assert(longestWord(['w', 'wo', 'wor', 'worl', 'world']) === 'world', 1);
console.assert(longestWord(['a', 'banana', 'app', 'appl', 'ap', 'apply', 'apple']) === 'apple', 2);
console.assert(
  longestWord([
    'm',
    'mo',
    'moc',
    'moch',
    'mocha',
    'l',
    'la',
    'lat',
    'latt',
    'latte',
    'c',
    'ca',
    'cat',
  ]) === 'latte',
  3
);
console.assert(
  longestWord([
    'ts',
    'e',
    'x',
    'pbhj',
    'opto',
    'xhigy',
    'erikz',
    'pbh',
    'opt',
    'erikzb',
    'eri',
    'erik',
    'xlye',
    'xhig',
    'optoj',
    'optoje',
    'xly',
    'pb',
    'xhi',
    'x',
    'o',
  ]) === 'e',
  4
);
