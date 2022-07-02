/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const resp = [];
  for (let i = 0; i < nums1.length; i++) {
    const element = nums1[i];
    let flag = true;
    let isFind = false;
    for (let j = 0; j < nums2.length; j++) {
      if (nums2[j] === element) {
        isFind = true;
        continue;
      }
      if (isFind && nums2[j] > element) {
        flag = false;
        resp.push(nums2[j]);
        break;
      }
    }
    if (flag) {
      resp.push(-1);
    }
  }
  // console.log(resp);
  return resp;
};

var nextGreaterElement = function (nums1, nums2) {
  const map = new Map();
  const stack = [];
  for (let i = nums2.length - 1; i >= 0; --i) {
    const num = nums2[i];
    while (stack.length && num >= stack[stack.length - 1]) {
      stack.pop();
    }
    map.set(num, stack.length ? stack[stack.length - 1] : -1);
    stack.push(num);
  }
  // console.log(map, stack);
  const res = nums1.map((v) => map.get(v));
  return res;
};

console.assert(nextGreaterElement([4, 1, 2], [1, 3, 4, 2]).join() === [-1, 3, -1].join(), 1);
console.assert(nextGreaterElement([2, 4], [1, 2, 3, 4]).join() === [3, -1].join(), 2);
