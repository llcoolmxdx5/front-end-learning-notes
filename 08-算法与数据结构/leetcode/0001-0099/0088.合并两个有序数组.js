/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 替换后排序 复杂度 O((m+n)log(m+n))
// var merge = function (nums1, m, nums2, n) {
//   nums1.splice(m, n, ...nums2);
//   nums1.sort((a, b) => a - b);
//   console.log(nums1);
// };

// 双指针 临时变量 O(m+n)
// var merge = function (nums1, m, nums2, n) {
//   const arr = [];
//   let i = 0,
//     j = 0;
//   while (i + j < m + n) {
//     // console.log(nums1[i], nums2[j], i, j);
//     if (i === m) {
//       arr.push(nums2[j]);
//       j++;
//       continue
//     }
//     if (nums2[j] === undefined) {
//       arr.push(nums1[i]);
//       i++;
//       continue
//     }
//     if (nums1[i] < nums2[j]) {
//       arr.push(nums1[i]);
//       i++;
//     } else {
//       arr.push(nums2[j]);
//       j++;
//     }
//   }
//   // console.log(arr);
//   for (let index = 0; index < arr.length; index++) {
//     const element = arr[index];
//     nums1[index] = element
//   }
//   // console.log(nums1);
// };

// 双指针 后向
var merge = function (nums1, m, nums2, n) {
  let i = m - 1,
    j = n - 1;
  let index = m + n;
  while (i >= 0 || j >= 0) {
    index -= 1;
    if (index < 0) break;
    if (nums1[i] === undefined) {
      nums1[index] = nums2[j];
      j -= 1;
      continue;
    }
    if (nums2[j] === undefined) {
      nums1[index] = nums1[i];
      i -= 1;
      continue;
    }
    if (nums1[i] < nums2[j]) {
      nums1[index] = nums2[j];
      j -= 1;
    } else {
      nums1[index] = nums1[i];
      i -= 1;
    }
  }
  // console.log(nums1);
};

merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3); // [1, 2, 2, 3, 5, 6]
merge([1], 1, [], 0); // [1]
merge([4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3); // [1, 2, 3, 4, 5, 6]
merge([-1, 0, 0, 3, 3, 3, 0, 0, 0], 6, [1, 2, 2], 3); // [-1,0,0,1,2,2,3,3,3]
