# useCallback 与 useMemo

`useMeme`、`useCallback` 用法都差不多，都会在第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行，并且这两个 hooks 都返回缓存的值，`useMemo` 返回缓存的变量，`useCallback` 返回缓存的函数。`useCallback` 作为 `useMemo` 的语法糖,在缓存一个函数时可以用 `useMemo` 无缝替换, 但是考虑到语义问题, 尽量还是使用 `useCallback`

```jsx
const value = useMemo(fnM, [a]);
const fnA = useCallback(fnB, [a]);
```

## 1、memo 的应用

`React.memo` 为高阶组件。它与 `React.PureComponent` 非常相似

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。这与 `shouldComponentUpdate` 方法的返回值相反。

```javascript
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

每次父组件更新 `count` ，子组件都会更新。如下版本使用 `memo` ，`count` 变化子组件没有更新

```jsx
const Child = (props) => {
  console.log("子组件?");
  return <div>我是一个子组件</div>;
};
const ChildMemo = memo(Child);

const Page = (props) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <button
        onClick={(e) => {
          setCount(count + 1);
        }}
      >
        加1
      </button>
      <p>count:{count}</p>
      <ChildMemo />
    </>
  );
};
```

## 2、使用 useCallback

当父组件传递状态给子组件的时候，`memo` 好像没什么效果，子组件还是执行了，这时候我们就要引入 `hooks` 的`useCallback`、`useMemo` 这两个钩子了。

```tsx
//子组件没有必要渲染的例子
interface ChildProps {
  name: string;
  onClick: Function;
}
const Child = ({ name, onClick }: ChildProps): JSX.Element => {
  console.log("子组件?");
  return (
    <>
      <div>我是一个子组件，父级传过来的数据：{name}</div>
      <button onClick={onClick.bind(null, "新的子组件name")}>改变name</button>
    </>
  );
};
const ChildMemo = memo(Child);

const Page = (props) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Child组件");
  return (
    <>
      <button
        onClick={(e) => {
          setCount(count + 1);
        }}
      >
        加1
      </button>
      <p>count:{count}</p>
      <ChildMemo
        name={name}
        onClick={useCallback((newName: string) => setName(newName), [])}
      />
      {/* useCallback((newName: string) => setName(newName),[]) */}
      {/* 这里使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数 */}
    </>
  );
};
```

## 3、使用 useMemo

```tsx
// 子组件会有不必要渲染的例子
interface ChildProps {
  name: { name: string; color: string };
  onClick: Function;
}
const Child = ({ name, onClick }: ChildProps): JSX.Element => {
  console.log("子组件?");
  return (
    <>
      <div style={{ color: name.color }}>
        我是一个子组件，父级传过来的数据：{name.name}
      </div>
      <button onClick={onClick.bind(null, "新的子组件name")}>改变name</button>
    </>
  );
};
const ChildMemo = memo(Child);

const Page = (props) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Child组件");
  return (
    <>
      <button
        onClick={(e) => {
          setCount(count + 1);
        }}
      >
        加1
      </button>
      <p>count:{count}</p>
      <ChildMemo
        name={{ name, color: name.indexOf("name") !== -1 ? "red" : "green" }}
        onClick={useCallback((newName: string) => setName(newName), [])}
      />
    </>
  );
};
```

更新属性 `name` 为对象类型，这时子组件还是一样的执行了，在父组件更新其它状态的情况下，子组件的 `name` 对象属性会一直发生重新渲染改变，从而导致一直执行,这也是不必要的性能浪费。

解决这个问题，使用 `name` 参数使用 `useMemo`，依赖于 `State.name` 数据的变化进行更新

```tsx
interface ChildProps {
  name: { name: string; color: string };
  onClick: Function;
}
const Child = ({ name, onClick}: ChildProps): JSX.Element => {
  console.log('子组件?')
  return(
    <>
      <div style={{ color: name.color }}>我是一个子组件，父级传过来的数据：{name.name}</div>
      <button onClick={onClick.bind(null, '新的子组件name')}>改变name</button>
    </>
  );
}
const ChildMemo = memo(Child);

const Page = (props) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Child组件');
  return (
    <>
      <button onClick={(e) => { setCount(count+1) }}>加1</button>
      <p>count:{count}</p>
      <ChildMemo
        //使用useMemo，返回一个和原本一样的对象，第二个参数是依赖性，当name发生改变的时候，才产生一个新的对象
        name={
          useMemo(()=>({
            name,
            color: name.indexOf('name') !== -1 ? 'red' : 'green'
          }), [name])
        }
        onClick={ useCallback((newName: string) => setName(newName), []) }
        {/* useCallback((newName: string) => setName(newName),[]) */}
        {/* 这里使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数*/}
      />
    </>
  )
}
```

## 4、memo 使用的总结

在子组件不需要父组件的值和函数的情况下，只需要使用 `memo` 函数包裹子组件即可。而在使用函数的情况，需要考虑有没有函数传递给子组件使用 `useCallback`。而在值有所依赖的项，并且是对象和数组等值的时候而使用 `useMemo`（当返回的是原始数据类型如字符串、数字、布尔值，就不要使用 `useMemo` 了）。不要盲目使用这些 hooks

## 5、其他使用场景

当一个函数或一个对象/数组作为 hooks 的依赖项时, 该函数或对象/数组 应该分别用 `useCallback` 和 `useMemo` 进行缓存, 一个常见的使用场景是 函数式组件加载时请求后端接口这个函数, 将该函数使用 `useCallback` 包裹后,放在 `useEffect` 中执行, 并且依赖该函数

## 总结

1. 子组件如果不是 `memo` 或 `pureComponent` 或 实现了 shouldComponentUpdate 方法的话, 在传进该组件的函数或对象/数组 使用了 `useCallback` 和 `useMemo` 是没有意义的, 且会造成性能浪费
2. 因为每次函数都会重新创建, 使不使用 `useCallback` 的区别只是会不会比对后重新赋值而已, 而这个比对操作和缓存函数的操作会造成性能损失, 所以需要控制 `useCallback` 的合理使用, 而 `useMemo` 则建议是能用则用, 某对象或数组 函数不依赖组件内的状态则是写在函数式组件外部会更好一点
