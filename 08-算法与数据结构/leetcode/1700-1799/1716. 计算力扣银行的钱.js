/**
 * @param {number} n
 * @return {number}
 */
var totalMoney = function (n) {
  let total = 0;
  const loop = Math.floor(n / 7);
  total += loop * 28;
  for (let i = 1; i < loop; i++) {
    total += i * 7;
  }
  n -= loop * 7;
  for (let i = 0; i < n; i++) {
    total += loop + i + 1;
  }
  return total;
};

var totalMoney = function (n) {
  // 所有完整的周存的钱
  const weekNumber = Math.floor(n / 7);
  const firstWeekMoney = Math.floor(((1 + 7) * 7) / 2);
  const lastWeekMoney = firstWeekMoney + 7 * (weekNumber - 1);
  const weekMoney = Math.floor(((firstWeekMoney + lastWeekMoney) * weekNumber) / 2);
  // 剩下的不能构成一个完整的周的天数里存的钱
  const dayNumber = n % 7;
  const firstDayMoney = 1 + weekNumber;
  const lastDayMoney = firstDayMoney + dayNumber - 1;
  const dayMoney = Math.floor(((firstDayMoney + lastDayMoney) * dayNumber) / 2);
  return weekMoney + dayMoney;
};

console.assert(totalMoney(20) === 96, 1);
console.assert(totalMoney(4) === 10, 2);
console.assert(totalMoney(400) === 12826, 3);
