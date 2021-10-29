/**
 * @param {number[]} distance
 * @return {boolean}
 */
var isSelfCrossing = function (distance) {
  let { length } = distance;
  if (length < 4) return false;

  let i = 2;

  // 一直向外卷
  while (i < length && distance[i] > distance[i - 2]) {
    i += 1;
  }
  // 如果走完了，直接就可以返回不相交
  if (i == length) return false;

  // 如果向外卷转成了向内卷，i-1的长度减i-3的长度
  if (distance[i] >= distance[i - 2] - (distance[i - 4] ?? 0)) {
    distance[i - 1] -= distance[i - 3] ?? 0;
  }

  // 一直向内卷，注意i先加1，这样正好跟i-1的位置相比较，相当于内卷从i-1的位置开始的
  for (++i; i < length && distance[i] < distance[i - 2]; i++);

  // 如果 i 能走完就不会相交，相反，走不完就相交了
  return i !== length;
};

console.assert(isSelfCrossing([2, 1, 1, 2]) === true, 1);
console.assert(isSelfCrossing([1, 2, 3, 4]) === false, 2);
console.assert(isSelfCrossing([4, 2, 1, 4]) === true, 3);
console.assert(isSelfCrossing([1, 1, 2, 1, 1]) === true, 4);
