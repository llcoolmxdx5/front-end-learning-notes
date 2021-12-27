/**
 * @param {number[]} ages
 * @return {number}
 */
var numFriendRequests = function (ages) {
  // 大*0.5+7 < 小 相同时 2 条
  // 至少 15 才能发
  // 2. 大或等于 -> 小
  ages = ages.sort((a, b) => a - b);
  // console.log(ages);
  let ans = 0;
  let left = 0,
    right = 0;
  for (let i = 0, len = ages.length; i < len; i++) {
    if (ages[i] < 15) {
      continue;
    }
    while (ages[left] <= 0.5 * ages[i] + 7) {
      left += 1;
    }
    while (right + 1 < len && ages[right + 1] <= ages[i]) {
      ++right;
    }
    ans += right - left;
  }
  // console.log(ans);
  return ans;
};

var numFriendRequests = function (ages) {
  const cnt = new Array(121).fill(0);
  for (const age of ages) {
    cnt[age] += 1;
  }
  const pre = new Array(121).fill(0);
  for (let i = 1; i <= 120; ++i) {
    pre[i] = pre[i - 1] + cnt[i];
  }
  let ans = 0;
  for (let i = 15; i <= 120; ++i) {
    if (cnt[i] > 0) {
      const bound = Math.floor(i * 0.5 + 8);
      ans += cnt[i] * (pre[i] - pre[bound - 1] - 1);
    }
  }
  return ans;
};

console.assert(numFriendRequests([16, 16]) === 2, 1);
console.assert(numFriendRequests([16, 17, 18]) === 2, 2);
console.assert(numFriendRequests([20, 30, 100, 110, 120]) === 3, 3);
console.assert(numFriendRequests([20, 20, 20, 20]) === 12, 4);
console.assert(numFriendRequests([25, 21, 20, 20, 20, 20]) === 21, 5);
