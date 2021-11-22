# immutability-helper

react hook 使用的是 `Object.is` 来进行的比较，这个比较是一个浅比较。这也意味着对于一个对象，直接修改对象里面的值，是不会触发组件的重渲染的。但是我们如果需要更新一个嵌套比较深的数据，为了能够触发 React 重渲染，就需要将整个对象进行更新，可能存在性能问题，有没有什么好办法解决这个问题呢？

## 从一个 🌰 来看问题

```jsx
import React, { useEffect, useMemo, useState } from 'react';
import update from 'immutability-helper';
import { Button } from 'antd';
import Child from './Child';
import { cloneDeep } from 'lodash';
​
const Test = () => {
  const [data, setData] = useState({
    info: {
      name: 'tom',
      age: 12,
    },
    score: {
      exam1: [99, 98, 89],
      exam2: [78, 85, 33],
    },
  });
​
  function handleClick() {
    // TODO: 点击按钮，更新第一个考试的英语成绩
  }
​
  const examStr = useMemo(() => {
    const exam1 = data.score.exam1;
    return (
      <div>
        <p>语文: {exam1[0]}</p>
        <p>数学: {exam1[1]}</p>
        <p>英语: {exam1[2]}</p>
      </div>
    );
  }, [data.score.exam1]);
​
  return (
    <div>
      <Button onClick={handleClick}>更新数据</Button>
      <div>{examStr}</div>
      <Child child={data.info}></Child>
    </div>
  );
};
​
export default Test;
```

​
来看上面的代码，我们需要点击按钮的时候更新 exam1 数组的第三项数据，这时候应该如何实现呢？

### 实现方式一（失败）

```jsx
data.score.exam1.push(100);
setData(data);
```

### 实现方式二(失败)

```jsx
data.score.exam1[2] = Math.random() * 100;
setData({
  ...data,
});
```

### 实现方式三（成功，但不推荐）

```jsx
import { cloneDeep } from 'lodash';
​
data.score.exam1[2] = Math.random() * 100;
setData(cloneDeep(data));
```

我们通过对 data 进行深复制，返回一个新的对象，通过这种方式是可以实现数据更新成功，但是也会引发一个新的问题，就是本来我们只需要更新 exam1，但是缺导致 info 也变成了一个新的对象，引起 Child 组件的重新渲染。

### 实现方式四(成功)

```jsx
data.score.exam1[2] = Math.random() * 100;
setData({
  ...data,
  score: {
    ...data.score,
    exam1: [...data.score.exam1],
  },
});
```

### 总结

为了更新一个数组的某一项的值，我们尝试了上面的四种方式，其中有两种是成功的，但是只有最后一种方式是比较好的，使用最后一种在更新数据的同时，尽可能的降低了对其他数据引用的破坏，但是我们示例数据只有三层，在代码中我们使用了三次...扩展运算符，如果层级更深，这样更新就会变得特别麻烦了。

## 使用 immutability-helper

如何能达到即优雅又高效的去变更数据，我这里使用到了 `immutability-helper`

```tsx
setData((data) => {
 return update(data, {
   score: {
     exam1: {
       2: {
         $set: Math.random() _ 10,
      },
    },
  },
});
});
```

使用 `immutability-helper` 可以按需去调整数据，而且它只会去调整需要修改的数据，复用未修改的数据，和实现方式四的效果是一致的。

### push 给数据末尾添加数据

```tsx
const [data, setData] = useState<any[]>([1,2]);
​
setData((data) => {
  // data 值为 [1,2,3,4]
  return update(data, {
    // $push的参数必须是一个数组
    $push: [3, 4],
  });
});
```

### $unshift 给数组开头添加数据

```tsx
const [data, setData] = useState<any[]>([3,4]);
​
setData((data) => {
  // data 值为 [1,2,3,4]
  return update(data, {
    // $unshift的参数必须是一个数组
    $unshift: [1,2],
  });
});
```

### $splice 修改数组数据，包括添加，删除数据

```tsx
const [data, setData] = useState<any[]>([3,4]);

setData((data) => {
  // data 值为 [3,6,5]
  return update(data, {
    // $splice的参数必须是一个二维数组
    $splice: [[1,1,6,5]],
  });
});
```

### $set 给对象的某个元素赋值

```jsx
const [data, setData] = useState<any[]>([
  {
    user: [
      {
        name: 'super-deng',
      },
    ],
  },
]);

setData((data) => {
  // 修改name的值
  return update(data, {
    0: {
      user: {
        0: {
          name: {
            $set: '冯超',
          },
        },
      },
    },
  });
});
```

### $unset 从对象中删除元素

```tsx
const [data, setData] = useState<any[]>([
  {
    user: [
      {
        name: 'super-deng',
        sex: '男',
      },
    ],
  },
]);

// 将sex从对象中删除
setData((data) => {
  return update(data, {
    0: {
      user: {
        0: {
          $unset: ['sex'],
        },
      },
    },
  });
});
```

### $merge 合并对象

```tsx
const [data, setData] = useState<any[]>([
  {
    user: [
      {
        name: 'super-deng',
        sex: '男',
      },
    ],
  },
]);

setData((data) => {
  return update(data, {
    0: {
      user: {
        0: {
          $merge: {
            age: 16,
          },
        },
      },
    },
  });
});
```

### $apply 将当前值传递给函数，并用新的返回值更新它

```tsx
const [data, setData] = useState<any[]>([
  {
    user: [
      {
        name: 'super-deng',
        sex: '男',
      },
    ],
  },
]);

setData((data) => {
  return update(data, {
    0: {
      user: {
        0: {
          $apply: (user: any) => {
            return Object.assign({}, user, { age: 15 });
          },
        },
      },
    },
  });
});
```

作者：前端进击者

[immutability-helper+React 实践与优化](https://juejin.cn/post/7033218491574403085)

来源：稀土掘金
