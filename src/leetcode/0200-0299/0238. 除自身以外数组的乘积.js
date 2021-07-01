/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const L = [1];
  const R = [];
  R[nums.length - 1] = 1;
  for (let index = 1; index < nums.length; index++) {
    const element = nums[index - 1];
    L[index] = L[index - 1] * element;
  }
  for (let index = nums.length - 2; index >= 0; index--) {
    const element = nums[index + 1];
    R[index] = R[index + 1] * element;
  }
  return nums.map((_, index) => L[index] * R[index]);
};

var productExceptSelf = function (nums) {
  const ans = [1];
  for (let index = 1; index < nums.length; index++) {
    const element = nums[index - 1];
    ans[index] = ans[index - 1] * element;
  }
  // console.log(ans);
  let R = 1;
  for (let index = nums.length - 1; index >= 0; index--) {
    const element = nums[index];
    ans[index] = ans[index] * R;
    R *= element;
  }
  return ans;
};

console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
