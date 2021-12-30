/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function (hand, groupSize) {
  const { length } = hand;
  if (length % groupSize !== 0) {
    return false;
  }
  hand.sort((a, b) => a - b);
  const loop = length / groupSize;
  let arr = hand;
  for (let i = 0; i < loop; i++) {
    let temp = [arr[0]];
    let arr1 = [];
    for (let j = 1, len = arr.length; j < len; j++) {
      if (temp.length < groupSize && arr[j] === temp[temp.length - 1] + 1) {
        temp.push(arr[j]);
      } else {
        arr1.push(arr[j]);
      }
    }
    if (temp.length !== groupSize) return false;
    arr = arr1;
  }
  return true;
};

var isNStraightHand = function (hand, groupSize) {
  const n = hand.length;
  if (n % groupSize !== 0) {
    return false;
  }
  hand.sort((a, b) => a - b);
  const cnt = new Map();
  for (const x of hand) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  for (const x of hand) {
    if (!cnt.has(x)) {
      continue;
    }
    for (let j = 0; j < groupSize; j++) {
      const num = x + j;
      if (!cnt.has(num)) {
        return false;
      }
      cnt.set(num, cnt.get(num) - 1);
      if (cnt.get(num) == 0) {
        cnt.delete(num);
      }
    }
  }
  return true;
};

console.assert(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3) === true, 1);
console.assert(isNStraightHand([1, 2, 3, 4, 5], 4) === false, 2);
