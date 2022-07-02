/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
  const { length } = points;
  // 公约数
  const gcd = (a, b) => {
    return b !== 0 ? gcd(b, a % b) : a;
  };
  const map = new Map();
  let ret = 0;
  for (let i = 0; i < length; i++) {
    map.clear();
    for (let j = i + 1; j < length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      let k;
      let y = y2 - y1;
      let x = x2 - x1;
      if (x === 0) {
        k = Number.MAX_SAFE_INTEGER;
      } else if (y === 0) {
        k = 0;
      } else {
        const gcdXY = gcd(x, y);
        y /= gcdXY;
        x /= gcdXY;
        k = y + '_' + x;
      }
      map.set(k, (map.get(k) ?? 0) + 1);
      ret = Math.max(ret, map.get(k));
    }
  }
  return ret + 1;
};

console.assert(
  maxPoints([
    [1, 1],
    [2, 2],
    [3, 3],
  ]) === 3,
  1,
);

console.assert(
  maxPoints([
    [1, 1],
    [3, 2],
    [5, 3],
    [4, 1],
    [2, 3],
    [1, 4],
  ]) === 4,
  2,
);
