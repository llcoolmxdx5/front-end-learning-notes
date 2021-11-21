# mobx

![alt](./media/mobx.png)

## observable

```js
import { observable } from "mobx";
const map = observable.map({ a: 1, b: 2 });
map.set("a", 11);
console.log(map.get("a"));
map.delete("a");
console.log(map.has("a"));

const obj = observable({ a: 1, b: 2 });
obj.a = 11;
console.log(obj.a);

const arr = observable(["a", "b", "c", "d"]);
console.log(arr[0]);
arr.pop();
arr.push("e");
console.log(arr);

const num = observable.box(10);
const str = observable.box("hello");
const bool = observable.box(true);
num.set(100);
console.log(num.get(), str.get(), bool.get());

class Store {
  @observable arr = ["a"];
  @observable obj = { a: 1 };
  @observable map = new Map();
}
```

## 对 observables 作出响应

```js
import { observable, autorun, when, reaction, computed } from "mobx";
```

### autorun

当你想创建一个响应式函数，而该函数本身永远不会有观察者时,可以使用 mobx.autorun

所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发。

经验法则：如果你有一个函数应该自动运行，但不会产生一个新的值，请使用 autorun。 其余情况都应该使用 computed。

```js
let obj = observable({
  title: "message",
});
autorun(() => {
  console.log(obj.title);
});
obj.title = "hello";
```

### when

`when(predicate: () => boolean, effect?: () => void, options?)`

when 观察并运行给定的 predicate，直到返回 true。 一旦返回 true，给定的 effect 就会被执行，然后 autorunner(自动运行程序) 会被清理。 该函数返回一个清理器以提前取消自动运行程序。

对于以响应式方式来进行处理或者取消，此函数非常有用。

```js
when(
  () => {
    return store.bool;
  },
  () => {
    console.log("when ");
  }
);
```

### reaction

用法: `reaction(() => data, (data, reaction) => { sideEffect }, options?)`。

autorun 的变种，对于如何追踪 observable 赋予了更细粒度的控制。 它接收两个函数参数，第一个(数据函数)是用来追踪并返回数据作为第二个函数(效果函数)的输入。 不同于 autorun 的是当创建时 效果函数 不会直接运行，只有在数据表达式首次返回一个新值后才会运行。 在执行 效果函数 时访问的任何 observable 都不会被追踪。

```js
reaction(
  () => {
    return store.result;
  },
  (result) => {
    // 第一个函数的返回值作为第二个函数的参数
    console.log(result);
  }
);
```

### computed

计算值是可以根据现有的状态或其它计算值衍生出的值, 跟 vue 中的 computed 非常相似。

computed 可作为装饰器， 将 result 的计算添加到类中

```js
class Store {
  @computed get result() {
    return this.str + this.num;
  }
}
```

## 改变 observables 状态

```js
import { action, runInAction } from "mobx";
```

### action

```js
class Store {
  @action bar() {
    this.str = "world";
    this.num = 40;
  }
}
const store = new Store();
store.bar(); // 调用action，只会执行一次
```

### action.bound

`action.bound` 可以用来自动地将动作绑定到目标对象。

```js
class Store {
  // this 永远都是正确的
  @action.bound foo() {
    this.str = "world";
    this.num = 40;
  }
}
const store = new Store();
setInterval(store.foo, 1000);
```

### runInAction

`action` 只能影响正在运行的函数，而无法影响当前函数调用的异步操作。如果你使用 async function 来处理业务，那么我们可以使用 `runInAction` 这个 API 来解决这个问题。

```js
@action async fzz() {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve({
        num: 220,
        str: 'world'
      })
    }, 1000)
  })
  runInAction(() => {
    store.num = 220
    store.str = 'world'
  })
}
```

## 在 react 中使用 mobx

在 react 中使用 mobx，需要借助 mobx-react。

它的功能相当于在 react 中使用 redux，需要借助 react-redux。

首先来搭建环境：

```bash
create-react-app react-app;
cd react-app;
yarn eject;
yarn add @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D;
yarn add mobx mobx-react;
```

修改 package.json 中 babel 的配置：

```js
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}
```

## React + Mobx

### 创建 store

在项目根目录下创建 store 目录，在 store 目录下创建 index.js，内容如下：

```js
import { observable, action, computed, runInAction } from "mobx";

class AppStore {
  @observable title = "mobx";
  @observable todos = [];
  @computed get desc() {
    return `一共${this.todos.length}条`;
  }
  @action addTodo(todo) {
    this.todos.push(todo);
  }
  @action.bound async asynnAddTodo(todo) {
    await new Promise((res) => {
      setTimeout(() => {
        res();
      }, 1000);
    });
    runInAction(() => {
      this.todos.push(todo);
    });
  }
}
const store = new AppStore();
export default store;
```

### 修改 App.js

修改项目根目录下的 App.js

```jsx
import React, { Component } from "react";
import Home from "./pages/Home";
import { Provider } from "mobx-react";
import store from "./store/";
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home></Home>
      </Provider>
    );
  }
}
```

### 创建 Home.js

在项目根目录下创建 pages 文件夹，在 pages 文件夹下创建 Home.js 组件，内容如下：

```jsx
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import store from "../store";

@inject("store")
@observer
class Home extends Component {
  addTodo = (item) => {
    return () => {
      store.addTodo(item);
    };
  };
  // asyncAddTodo = item => {
  //   return () => {
  //     setTimeout(() => {
  //       store.asynnAddTodo(item)
  //     }, 1000);
  //   }
  // }
  asyncAddTodo = (item) => {
    return () => {
      store.addTodo(item);
    };
  };
  render() {
    return (
      <>
        <div>{store.title}</div>
        <button onClick={this.addTodo("这是一条内容")}>添加</button>
        <button onClick={this.asyncAddTodo("这是异步添加的内容")}>
          async添加
        </button>
        <h6>{store.desc}</h6>
        {store.todos.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </>
    );
  }
}
export default Home;
```
