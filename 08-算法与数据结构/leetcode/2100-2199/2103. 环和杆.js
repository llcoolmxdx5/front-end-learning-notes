/**
 * @param {string} rings
 * @return {number}
 */
var countPoints = function (rings) {
  const map = new Map();
  for (let i = 0, len = rings.length; i < len; i += 2) {
    const value = map.get(rings[i + 1]) ?? [];
    if (!value.includes(rings[i])) {
      map.set(rings[i + 1], [...value, rings[i]]);
    }
  }
  // console.log(map)
  let res = 0;
  for (let i = 0; i < 10; i++) {
    if (map.get(i.toString())?.length === 3) {
      res += 1;
    }
  }
  return res;
};
