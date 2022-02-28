/**
 * @param {number} n
 * @param {number[][]} requests
 * @return {number}
 */
var maximumRequests = function (n, requests) {
  const m = requests.length;
  const combine = function (k) {
    const result = [];
    const backTrack = (start, track) => {
      if (k === track.length) {
        result.push([...track]);
        return;
      }
      for (let i = start; i <= m - 1; i++) {
        track.push(requests[i]);
        backTrack(i + 1, track);
        track.pop();
      }
    };
    backTrack(0, []);
    return result;
  };
  for (let i = m; i > 0; i--) {
    for (const comb of combine(i)) {
      // 统计出度入度是否完全相等
      const cnt = new Array(n).fill(0);
      for (const [from, to] of comb) {
        // 出度, 入度
        cnt[from] += 1;
        cnt[to] -= 1;
      }
      // console.log(comb, cnt);
      if (cnt.every((item) => item === 0)) {
        return i;
      }
    }
  }
  return 0;
};

console.assert(
  maximumRequests(5, [
    [0, 1],
    [1, 0],
    [0, 1],
    [1, 2],
    [2, 0],
    [3, 4],
  ]) === 5,
  1
);

console.assert(
  maximumRequests(3, [
    [0, 0],
    [1, 2],
    [2, 1],
  ]) === 3,
  2
);

// console.assert(
//   maximumRequests(4, [
//     [0, 3],
//     [3, 1],
//     [1, 2],
//     [2, 0],
//   ]) === 4,
//   3
// );
