/**
 * @param {number[]} stones
 * @return {boolean}
 */
var stoneGameIX = function (stones) {
  let cnt0 = 0,
    cnt1 = 0,
    cnt2 = 0;
  for (const val of stones) {
    const type = val % 3;
    if (type === 0) {
      ++cnt0;
    } else if (type === 1) {
      ++cnt1;
    } else {
      ++cnt2;
    }
  }
  if (cnt0 % 2 === 0) {
    return cnt1 >= 1 && cnt2 >= 1;
  }
  return cnt1 - cnt2 > 2 || cnt2 - cnt1 > 2;
};

console.assert(stoneGameIX([2, 1]) === true, 1);
console.assert(stoneGameIX([2]) === false, 2);
console.assert(stoneGameIX([5, 1, 2, 4, 3]) === false, 3);
