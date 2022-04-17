/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  const arr = paragraph.replace(/[!?',;.]/g, " ").split(" ");
  let ans = arr[0].toLowerCase();
  const map = new Map();
  for (const str of arr) {
    const s = str.toLowerCase();
    if (s && !banned.includes(s)) {
      const count = map.get(s) || 0;
      map.set(s, count + 1);
      if (count + 1 > (map.get(ans) || 0)) {
        ans = s;
      }
    }
  }
  return ans;
};

console.assert(
  mostCommonWord("Bob hit a ball, the hit BALL flew far after it was hit.", [
    "hit",
  ]) === "ball",
  1
);

console.assert(mostCommonWord("Bob. hIt, baLl", ["bob", "hit"]) === "ball", 2);
