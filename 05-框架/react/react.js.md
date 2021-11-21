# 关于 React

React 部分的内容包含了所有授课的思路

## React 的起源和发展

React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在 2013 年 5 月开源了。

## React 与传统 MVC 的关系

轻量级的视图层**库**！_A JavaScript library for building user interfaces_

React 不是一个完整的 MVC 框架，最多可以认为是 MVC 中的 V（View），甚至 React 并不非常认可 MVC 开发模式；React 构建页面 UI 的库。可以简单地理解为，React 将将界面分成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，就成了我们的页面。

## React 高性能的体现：虚拟 DOM

### React 高性能的原理

在 Web 开发中我们总需要将变化的数据实时反应到 UI 上，这时就需要对 DOM 进行操作。而复杂或频繁的 DOM 操作通常是性能瓶颈产生的原因（如何进行高性能的复杂 DOM 操作通常是衡量一个前端开发人员技能的重要指标）。

React 为此引入了虚拟 DOM（Virtual DOM）的机制：在浏览器端用 Javascript 实现了一套 DOM API。基于 React 进行开发时所有的 DOM 构造都是通过虚拟 DOM 进行，每当数据变化时，React 都会重新构建整个 DOM 树，然后 React 将当前整个 DOM 树和上一次的 DOM 树进行对比，得到 DOM 结构的区别，然后仅仅将需要变化的部分进行实际的浏览器 DOM 更新。而且 React 能够批处理虚拟 DOM 的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从 A-B,B-A，React 会认为 A 变成 B，然后又从 B 变成 A UI 不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。

尽管每一次都需要构造完整的虚拟 DOM 树，但是因为虚拟 DOM 是内存数据，性能是极高的，部而对实际 DOM 进行操作的仅仅是 Diff 分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的 DOM 元素，而只需要关心在任意一个数据状态下，整个界面是如何 Render 的。

### React Fiber

在 react 16 之后发布的一种 react 核心算法，**React Fiber 是对核心算法的一次重新实现**(官网说法)。之前用的是 diff 算法。

在之前 React 中，更新过程是同步的，这可能会导致性能问题。

当 React 决定要加载或者更新组件树时，会做很多事，比如调用各个组件的生命周期函数，计算和比对 Virtual DOM，最后更新 DOM 树，这整个过程是同步进行的，也就是说只要一个加载或者更新过程开始，中途不会中断。因为 JavaScript 单线程的特点，如果组件树很大的时候，每个同步任务耗时太长，就会出现卡顿。

React Fiber 的方法其实很简单——分片。把一个耗时长的任务分成很多小片，每一个小片的运行时间很短，虽然总时间依然很长，但是在每个小片执行完之后，都给其他任务一个执行的机会，这样唯一的线程就不会被独占，其他任务依然有运行的机会。

## React 的特点和优势

1. 虚拟 DOM

   我们以前操作 dom 的方式是通过 document.getElementById()的方式，这样的过程实际上是先去读取 html 的 dom 结构，将结构转换成变量，再进行操作

   而 reactjs 定义了一套变量形式的 dom 模型，一切操作和换算直接在变量中，这样减少了操作真实 dom，性能真实相当的高，和主流 MVC 框架有本质的区别，并不和 dom 打交道

2. 组件系统

   react 最核心的思想是将页面中任何一个区域或者元素都可以看做一个组件 component

   那么什么是组件呢？

   组件指的就是同时包含了 html、css、js、image 元素的聚合体

   使用 react 开发的核心就是将页面拆分成若干个组件，并且 react 一个组件中同时耦合了 css、js、image，这种模式整个颠覆了过去的传统的方式

3. 单向数据流

   其实 reactjs 的核心内容就是数据绑定，所谓数据绑定指的是只要将一些服务端的数据和前端页面绑定好，开发者只关注实现业务就行了

4. JSX 语法

   在 vue 中，我们使用 render 函数来构建组件的 dom 结构性能较高，因为省去了查找和编译模板的过程，但是在 render 中利用 createElement 创建结构的时候代码可读性较低，较为复杂，此时可以利用 jsx 语法来在 render 中创建 dom，解决这个问题，但是前提是需要使用工具来编译 jsx

# Immutable.js

## JavaScript 数据修改的问题

看一段大家熟悉的代码

```js
const state = {
  str: "千锋教育",
  obj: {
    y: 1,
  },
  arr: [1, 2, 3],
};
const newState = state;

console.log(newState === state); // true
```

由于 js 的对象和数组都是引用类型。所以 newState 的 state 实际上是指向于同一块内存地址的, 所以结果是 newState 和 state 是相等的。

尝试修改一下数据

```js
const state = {
  str: "千锋教育",
  obj: {
    y: 1,
  },
  arr: [1, 2, 3],
};
const newState = state;

newState.str = "千锋教育H5学院";

console.log(state.str, newState.str);
```

可以看到，newState 的修改也会引起 state 的修改。要解决这个问题，js 中提供了另一种修改数据的方式，要修改一个数据之前先制作一份数据的拷贝，像这样

```js
const state = {
  str: "千锋教育",
  obj: {
    y: 1,
  },
  arr: [1, 2, 3],
};
const newState = Object.assign({}, state);

newState.str = "千锋教育H5学院";

console.log(state.str, newState.str);
```

我们可以使用很多方式在 js 中复制数据，比如`…`, `Object.assign`, `Object.freeze`, `slice`, `concat`, `map`, `filter`, `reduce`等方式进行复制，但这些都是浅拷贝，就是只拷贝第一层数据，更深层的数据还是同一个引用，比如：

```js
const state = {
  str: "千锋教育",
  obj: {
    y: 1,
  },
  arr: [1, 2, 3],
};
const newState = Object.assign({}, state);

newState.obj.y = 2;
newState.arr.push(4);

console.log(state, newState);
```

可以看到，当在更改 newState 更深层次的数据的时候，还是会影响到 state 的值。如果要深层复制，就得一层一层的做递归拷贝，这是一个复杂的问题。虽然有些第三方的库已经帮我们做好了，比如`lodash`的`cloneDeep`方法。深拷贝是非常消耗性能的。

```js
import { cloneDeep } from "lodash";

const state = {
  str: "千锋教育",
  obj: {
    y: 1,
  },
  arr: [1, 2, 3],
};
const newState = cloneDeep(state);

newState.obj.y = 2;
newState.arr.push(4);

console.log(state, newState);
```

## 什么是不可变数据

不可变数据 (Immutable Data )就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是持久化数据结构（ Persistent Data Structure），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的 s 性能损耗，Immutable 使用了 结构共享（Structural Sharing），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

![react](./images/structure-sharing.png)

## immutable.js 的优缺点

**优点：**

- 降低 mutable 带来的复杂度
- 节省内存
- 历史追溯性（时间旅行）：时间旅行指的是，每时每刻的值都被保留了，想回退到哪一步只要简单的将数据取出就行，想一下如果现在页面有个撤销的操作，撤销前的数据被保留了，只需要取出就行，这个特性在 redux 或者 flux 中特别有用
- 拥抱函数式编程：immutable 本来就是函数式编程的概念，纯函数式编程的特点就是，只要输入一致，输出必然一致，相比于面向对象，这样开发组件和调试更方便。推荐一本函数式编程的在线免费书《[JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)》, 此书可以推荐给学生做为课外补充阅读。

**缺点：**

- 需要重新学习 api
- 资源包大小增加（源码 5000 行左右）
- 容易与原生对象混淆：由于 api 与原生不同，混用的话容易出错。

## 使用 Immutable.js

参考[官网](https://immutable-js.github.io/immutable-js/)重点讲解数据不可变数据的创建、更新及比较方式 。对于就业班来说，掌握以下知识点即可。

### Map

```js
import { Map } from "immutable";

const map = Map({
  a: 1,
  b: 2,
  c: 3,
});

const newMap = map.set("b", 20); // immutable数据每次都是生成新的再重新调用set进行修改，所以需要 重新赋值给一个新的变量

console.log(map, newMap); // immutable.Map不是原生的对象
console.log(map.b, newMap.b); // immutable.Map不是原生的对象, 所以是undefined
console.log(map.get("b"), newMap.get("b")); // 要取值，需要调用get(key)方法，可以看到，两个值不一样

const obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Map.isMap(map), Map.isMap(obj)); // true false, 使用Map.isMap来判断是否是一个immutable.Map类型
```

### List

```js
import { List } from "immutable";

const list = List([1, 2, 3, 4]);
const newList = list.push(5);
console.log(list, newList);
console.log(list[4], newList[4]); // undefined undefined
console.log(list.get(4), newList.get(4)); // undefined 5
console.log(list.size, newList.size); // 4 5

const arr = [1, 2, 3, 4];

console.log(List.isList(list), List.isList(arr)); // true false
```

### equals & is

```js
import { Map, is } from "immutable";

const map = Map({
  a: 1,
  b: 2,
  c: 3,
});

const anotherMap = Map({
  a: 1,
  b: 2,
  c: 3,
});

console.log(map == anotherMap); // false
console.log(map === anotherMap); // false
console.log(map.equals(anotherMap)); // 使用equals进行比较 true
console.log(is(map, anotherMap)); // 使用is进行比较 true
```

### List 常用 api

```js
import { List } from "immutable";

const list = List([1, 2, 3, 4]);
const list1 = list.push(5);
const list2 = list1.unshift(0);
const list3 = list.concat(list1, list2);
const list4 = list.map((v) => v * 2);

console.log(list.size, list1.size, list2.size, list3.size, list4.toJS()); // 4 5 6 15, [2, 4, 6, 8]
```

### Map 常用 api

```js
import { Map } from "immutable";

const alpha = Map({
  a: 1,
  b: 2,
  c: 3,
});
const objKeys = alpha.map((v, k) => k);
console.log(objKeys.join()); // a, b, c

const map1 = Map({
  a: 1,
  b: 2,
});
const map2 = Map({
  c: 3,
  d: 4,
});
const obj = {
  d: 400,
  e: 50,
};

const mergedMap = map1.merge(map2, obj);

console.log(mergedMap.toObject());
console.log(mergedMap.toJS());
```

### 嵌套数据结构

```js
const { fromJS } = require("immutable");
const nested = fromJS({ a: { b: { c: [3, 4, 5] } } });

const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }

console.log(nested2.getIn(["a", "b", "d"])); // 6

const nested3 = nested2.updateIn(["a", "b", "d"], (value) => value + 1);
console.log(nested3);
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }

const nested4 = nested3.updateIn(["a", "b", "c"], (list) => list.push(6));
// Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }
```

## 在 redux 中使用 immutable.js

[redux 官网](https://redux.js.org/recipes/using-immutablejs-with-redux)推荐使用[redux-immutable](https://www.npmjs.com/package/redux-immutable)进行 redux 和 immutable 的集成。几个注意点：

`redux`中，利用`combineReducers`来合并多个`reduce`, `redux`自带的`combineReducers`只支持原生 js 形式的，所以需要使用`redux-immutable`提供的`combineReducers`来代替

```js
// 使用redux-immutable提供的combineReducers方法替换redux里的combineReducers
import { combineReducers } from "redux-immutable";
import reducerOne from "./reducerOne";
import reducerTwo from "./reducerTwo";

const rootReducer = combineReducers({
  reducerOne,
  reducerTwo,
});

export default rootReducer;
```

`reducer`中的`initialState`也需要初始化成`immutable`类型, 比如一个 counter 的 reducer

```js
import { Map } from "immutable";

import ActionTypes from "../actions";

const initialState = Map({
  count: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INCREAMENT:
      return state.set("count", state.get("count") + 1); // 使用set或setIn来更改值, get或者getIn来取值
    case ActionTypes.DECREAMENT:
      return state.set("count", state.get("count") - 1);
    default:
      return state;
  }
};
```

`state`成为了`immutable`类型，`connect`的`mapStateToProp`也需要相应的改变

```js
const mapStateToProps = (state) => ({
  count: state.getIn(["counter", "count"]), // 永远不要在mapStateToProps里使用`toJS`方法，因为它永远返回一个新的对象
});
```

在`shouldComponentUpdate`里就可以使用`immutable.is`或者`instance.equals`来进行数据的对比了。
