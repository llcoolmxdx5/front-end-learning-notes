/**
 * @param {number[]} plants
 * @param {number} capacityA
 * @param {number} capacityB
 * @return {number}
 */
var minimumRefill = function (plants, capacityA, capacityB) {
  const { length } = plants;
  let currentA = capacityA;
  let currentB = capacityB;
  let res = 0;
  let left = 0;
  let right = length - 1;
  while (left < right) {
    if (currentA < plants[left]) {
      currentA = capacityA;
      res += 1;
    }
    currentA -= plants[left];
    left += 1;

    if (currentB < plants[right]) {
      currentB = capacityB;
      res += 1;
    }
    currentB -= plants[right];
    right -= 1;
  }
  if (left === right) {
    const max = Math.max(currentA, currentB);
    // console.log(max, plants[left], plants[right], currentA, currentB, res);
    if (max < plants[left]) {
      res += 1;
    }
  }
  return res;
};

console.assert(minimumRefill([2, 2, 5, 2, 2], 5, 5) === 1, 1); // 1
console.assert(minimumRefill([2, 2, 3, 3], 5, 5) === 1, 2); // 1
console.assert(minimumRefill([2, 2, 3, 3], 3, 4) === 2, 3); // 2
console.assert(minimumRefill([5], 10, 8) === 0, 4); // 0
console.assert(minimumRefill([1, 2, 4, 4, 5], 6, 5) === 2, 5); // 2
console.assert(
  minimumRefill(
    [
      726, 739, 934, 116, 643, 648, 473, 984, 482, 85, 850, 806, 146, 764, 156, 66, 186, 339, 985,
      237, 662, 552, 800, 78, 617, 933, 481, 652, 796, 594, 151, 82, 183, 241, 525, 221, 951, 732,
      799, 483, 368, 354, 776, 175, 974, 187, 913, 842,
    ],
    1439,
    1207
  ) === 24,
  6
); // 24
