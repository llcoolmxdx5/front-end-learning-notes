/**
 * @param {number[]} persons
 * @param {number[]} times
 */
var TopVotedCandidate = function (persons, times) {
  this.times = times;
  this.candidate = [persons[0]];
  const map = new Map().set(persons[0], 1);
  let current = persons[0];
  for (let i = 1, len = persons.length; i < len; i++) {
    const value = persons[i];
    const prev = persons[i - 1];
    const number = map.get(value) ?? 0;
    map.set(value, number + 1);
    if (number + 1 >= (map.get(current) ?? 0)) {
      current = value;
      this.candidate.push(value);
    } else {
      this.candidate.push(current);
    }
  }
  console.log(this.candidate);
};

/**
 * @param {number} t
 * @return {number}
 */
TopVotedCandidate.prototype.q = function (t) {
  const { length } = this.times;
  let left = 0;
  let right = length - 1;
  if (t >= this.times[right]) {
    console.log(this.candidate[right]);
    return this.candidate[right];
  }
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midTime = this.times[mid];
    if (midTime === t) {
      console.log(this.candidate[mid]);
      return this.candidate[mid];
    } else if (midTime < t) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  console.log(this.candidate[right], left, right);
  return this.candidate[right];
};

/**
 * Your TopVotedCandidate object will be instantiated and called as such:
 * var obj = new TopVotedCandidate(persons, times)
 * var param_1 = obj.q(t)
 */

const topVotedCandidate = new TopVotedCandidate([0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30]);
topVotedCandidate.q(3); // 返回 0 ，在时刻 3 ，票数分布为 [0] ，编号为 0 的候选人领先。
topVotedCandidate.q(12); // 返回 1 ，在时刻 12 ，票数分布为 [0,1,1] ，编号为 1 的候选人领先。
topVotedCandidate.q(25); // 返回 1 ，在时刻 25 ，票数分布为 [0,1,1,0,0,1] ，编号为 1 的候选人领先。（在平局的情况下，1 是最近获得投票的候选人）。
topVotedCandidate.q(15); // 返回 0
topVotedCandidate.q(24); // 返回 0
topVotedCandidate.q(8); // 返回 1

// const topVotedCandidate = new TopVotedCandidate(
//   [0, 1, 0, 1, 1],
//   [24, 29, 31, 76, 81]
// );
// topVotedCandidate.q(28);
// topVotedCandidate.q(24);
// topVotedCandidate.q(29);
// topVotedCandidate.q(77);
// topVotedCandidate.q(30);
// topVotedCandidate.q(25);
// topVotedCandidate.q(76);
// topVotedCandidate.q(75);
// topVotedCandidate.q(81);
// topVotedCandidate.q(80);
// // [null, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1];
