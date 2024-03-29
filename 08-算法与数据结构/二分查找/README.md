# 二分搜索

## 解题框架

```js
const binarySearch = (nums, target) => {
  let left = 0, right = ...;
  while(...) {
    const mid = left + (right - left) / 2;
    if(nums[mid] === target) {
      ...
    } else if (nums[mid] < target) {
      left = ...
    } else if (nums[mid] > target) {
      right = ...
    }
  }
  return ...
}
```

注意:

- 不要出现 `else`, 而是把所有情况用 `else if` 写清楚, 这样可以清楚展现所有细节
- 所有 ... 的地方都是细节问题

## 三种方式搜索

```js
const binarySearch = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  return -1;
};

const leftBound = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      // 收缩右边界, 锁定左侧边界
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  // 检查 left 越界的情况
  if (left >= nums.length || nums[left] !== target) {
    return -1;
  }
  return left;
};

const rightBound = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      // 收缩左边界, 锁定右侧边界
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  // 检查 right 越界的情况
  if (right < 0 || nums[right] !== target) {
    return -1;
  }
  return right;
};
```

## 查找不小于/不大于的值

```js
const findMax = (nums, target) => {
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = left + Math.floor((right - left + 1) / 2);
    const value = nums[mid];
    if (value === target) {
      return target;
    } else if (value < target) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return nums[right];
};
```

```js
const findMin = (nums, target) => {
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = left + Math.floor((right - left - 1) / 2);
    const value = nums[mid];
    if (value === target) {
      return target;
    } else if (value < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
};
```

## 题目

- [x] 0033 搜索旋转排序数组 中等
- [x] 0034 在排序数组中查找元素的第一个和最后一个位置 中等
- [x] 0035 搜索插入位置 简单
- [x] 0074 搜索二维矩阵 中等
- [x] 0153 寻找旋转排序数组中的最小值
- [x] 0162 寻找峰值 中等
- [x] 0278 第一个错误的版本 简单
- [x] 0475 供暖器 中等
- [x] 0704 二分查找 简单
- [x] 0852 山脉数组的峰顶索引 简单
