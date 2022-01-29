/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function (s1, s2) {
  const map = new Map();
  s1.split(" ").forEach((item) => {
    map.set(item, (map.get(item) || 0) + 1);
  });
  s2.split(" ").forEach((item) => {
    map.set(item, (map.get(item) || 0) + 1);
  });
  const ans = [];
  for (const [item, count] of map.entries()) {
    if (count === 1) {
      ans.push(item);
    }
  }
  // console.log(map);
  return ans;
};

console.log(uncommonFromSentences("this apple is sweet", "this apple is sour")); // ["sweet","sour"]
