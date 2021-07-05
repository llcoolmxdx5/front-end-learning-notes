/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const len = nums1.length + nums2.length;
  let i = 0,
    j = 0;
  let pre, cur;
  while (i + j <= Math.floor(len / 2)) {
    pre = cur;
    if (j >= nums2.length || (i < nums1.length && nums1[i] < nums2[j])) {
      cur = nums1[i];
      i += 1;
    } else {
      cur = nums2[j];
      j += 1;
    }
  }
  // console.log(pre, cur);
  if (len % 2 == 1) {
    return cur;
  } else {
    return (pre + cur) / 2;
  }
};

console.assert(findMedianSortedArrays([1, 3], [2]) === 2, 1);
console.assert(findMedianSortedArrays([1, 2], [3, 4]) === 2.5, 2);
console.assert(findMedianSortedArrays([0, 0], [0, 0]) === 0, 3);
console.assert(findMedianSortedArrays([], [1]) === 1, 4);
console.assert(findMedianSortedArrays([2], []) === 2, 5);
console.assert(findMedianSortedArrays([], [2, 3]) === 2.5, 6);
