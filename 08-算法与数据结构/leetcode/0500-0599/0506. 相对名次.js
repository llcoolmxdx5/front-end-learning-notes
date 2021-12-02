/**
 * @param {number[]} score
 * @return {string[]}
 */
var findRelativeRanks = function (score) {
  const ans = [...score];
  const map = new Map();
  ans
    .sort((a, b) => b - a)
    .forEach((item, index) => {
      if (index === 0) {
        map.set(item, "Gold Medal");
      } else if (index === 1) {
        map.set(item, "Silver Medal");
      } else if (index === 2) {
        map.set(item, "Bronze Medal");
      } else {
        map.set(item, `${index + 1}`);
      }
    });
  return score.map((i) => map.get(i));
};

console.assert(
  findRelativeRanks([5, 4, 3, 2, 1]).join() ===
    ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"].join(),
  1
);

console.assert(
  findRelativeRanks([10, 3, 8, 9, 4]).join() ===
    ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"].join(),
  2
);
