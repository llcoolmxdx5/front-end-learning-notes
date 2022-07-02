/**
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @return {string}
 */
var dayOfTheWeek = function (day, month, year) {
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(year, month - 1, day);
  return week[date.getDay()];
};

console.assert(dayOfTheWeek(31, 8, 2019) === 'Saturday', 1);
