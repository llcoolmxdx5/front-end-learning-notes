/**
 * @param {string} date
 * @return {number}
 */
var dayOfYear = function (date) {
  const [year, month, day] = date.split('-').map(item => parseInt(item));
  let ans = day;
  const arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let i = 0; i < month - 1; i++) {
    ans += arr[i];
  }
  if (month > 2) {
    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
      ans += 1;
    }
  }
  return ans;
};

var dayOfYear = function (str) {
  let time1, time2;
  let d = new Date(str);
  time1 = d.getTime();
  d.setMonth(0);
  d.setDate(1);
  time2 = d.getTime();
  let day = 24 * 60 * 60 * 1000;
  let g = time1 - time2;
  return g / day + 1;
};
