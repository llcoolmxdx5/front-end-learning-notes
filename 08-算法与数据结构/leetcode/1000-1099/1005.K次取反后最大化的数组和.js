/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function (nums, k) {
  const { length } = nums;
  nums.sort((a, b) => a - b);
  let i = 0;
  for (; i < nums.length; i++) {
    if (k <= 0) {
      break;
    }
    if (nums[i] < 0) {
      // 小于0直接取反
      nums[i] = -nums[i];
      k--;
    } else if (nums[i] == 0) {
      // 等于0直接返回
      break;
    } else {
      // 大于0且k等于奇数时才需要计算
      if (k % 2 != 0) {
        // 取 nums[i] 和 nums[i-1] 中最小的数反转
        if (i == 0 || nums[i] < nums[i - 1]) {
          nums[i] = -nums[i];
        } else {
          nums[i - 1] = -nums[i - 1];
        }
        k--;
      }
      break;
    }
  }
  console.log(nums);
  // 全是负数且k比较大的情况的特殊处理
  // 比如，nums=[-4,-2,-3],k=4
  // 此时，nums全部修正完后k还有剩余且为奇数，那么就处理 n-1 位置的数就可以了
  if (i >= nums.length && k % 2 != 0) {
    nums[i - 1] = -nums[i - 1];
  }
  let ans = 0;
  nums.forEach(num => (ans += num));
  return ans;
};

var largestSumAfterKNegations = function (nums, k) {
  // nums[i]的范围是-100~100，申请个201的正好够用
  const arr = new Array(201).fill(0);
  nums.forEach(num => {
    arr[num + 100]++;
  });

  // 遍历前100个数，也就是原负数的部分
  for (let i = 0; i < 100; i++) {
    if (arr[i] != 0) {
      // 取数量与k的最小值
      const count = Math.min(k, arr[i]);
      // 负数的部分减去相应的数量
      arr[i] -= count;
      // 负数的相反数加上相应的数量
      // 原负数为：i-100，取反为： -(i-100)，再加上偏移量为：-(i-100)+100=-i+200
      arr[-i + 200] += count;
      // k也减去相应的数量
      k -= count;
      // k减到0的，跳出循环
      if (k == 0) {
        break;
      }
    }
  }

  // 如果 k 还有剩余且为奇数，取最小的正数（或零）变换一次
  if (k % 2 != 0) {
    // 从100开始，也就是从原来的0开始
    for (let i = 100; i < 201; i++) {
      if (arr[i] != 0) {
        // 减一次
        arr[i]--;
        // 对应的负数加一次
        // 原正数为：i-100，取反为：-(i-100)，再加上偏移量为：-(i-100)+100=-i+200
        arr[-i + 200]++;
        break;
      }
    }
  }

  // 统计结果
  let ans = 0;
  for (let i = 0; i < 201; i++) {
    ans += arr[i] * (i - 100);
  }

  return ans;
};

console.assert(largestSumAfterKNegations([4, 2, 3], 1) === 5, 1);
console.assert(largestSumAfterKNegations([3, -1, 0, 2], 3) === 6, 2);
console.assert(largestSumAfterKNegations([2, -3, -1, 5, -4], 2) === 13, 3);
console.assert(largestSumAfterKNegations([3, -1, 2, 2], 2) === 6, 4);
console.assert(largestSumAfterKNegations([-4, -2, -3], 4) === 5, 5);
console.assert(largestSumAfterKNegations([4, -5, 4, -5, 9, 4, 5], 1) === 26, 6);
