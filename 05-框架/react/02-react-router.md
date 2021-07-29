# react-router-dom

## Hooks

React Router带有一些钩子，您可以使用它们访问路由的状态并从组件内部执行导航。请注意：要使用这些钩子，您需要使用React> = 16.8

- useHistory
- useLocation
- useParams
- useRouteMatch

### useHistory

`useHistory`钩子使您可以访问可用于导航的历史记录实例。

```js
import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```

### useLocation

`useLocation`钩子返回代表当前URL的位置对象。 您可以像useState一样考虑它，只要URL更改，它就会返回一个新位置。

这可能非常有用，例如 在您希望每次加载新页面时都使用Web分析工具触发新的“页面浏览”事件的情况下，如以下示例所示：

```js
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ga.send(["pageview", location.pathname]);
  }, [location]);
}

function App() {
  usePageViews();
  return <Switch>...</Switch>;
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  node
);
```

### useParams

`useParams`返回URL参数的键/值对的对象。 用它来访问当前 `<Route>`的`match.params`.

```js
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function BlogPost() {
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/blog/:slug">
        <BlogPost />
      </Route>
    </Switch>
  </Router>,
  node
);
```

### useRouteMatch

`useRouteMatch`挂钩尝试以与`<Route>`相同的方式匹配当前URL。 在无需实际呈现`<Route>`的情况下访问匹配数据最有用。

```js
import { Route } from "react-router-dom";

function BlogPost() {
  return (
    <Route
      path="/blog/:slug"
      render={({ match }) => {
        // Do whatever you want with the match...
        return <div />;
      }}
    />
  );
}
```

用以下代码可以替换以上代码

```js
import { useRouteMatch } from "react-router-dom";

function BlogPost() {
  let match = useRouteMatch("/blog/:slug");

  // Do whatever you want with the match...
  return <div />;
}
```

## `<BrowserRouter>`

`<BrowserRouter>` 使用 HTML5 提供的 history API (pushState, replaceState 和 popstate 事件) 来保持 UI 和 URL 的同步。

```js
import { BrowserRouter } from 'react-router-dom';
<BrowserRouter
  basename={string}
  forceRefresh={bool}
  getUserConfirmation={func}
  keyLength={number}
>
  <App />
</BrowserRouter>
```

### basename: string

所有位置的基准 URL。如果你的应用程序部署在服务器的子目录，则需要将其设置为子目录。basename 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

```js
<BrowserRouter basename="/calendar">
  <Link to="/today" />
</BrowserRouter>
```

上例中的 `<Link>` 最终将被呈现为：

`<a href="/calendar/today" />`

### forceRefresh: bool

如果为 true ，在导航的过程中整个页面将会刷新。一般情况下，只有在不支持 HTML5 history API 的浏览器中使用此功能。

```js
const supportsHistory = 'pushState' in window.history;
<BrowserRouter forceRefresh={!supportsHistory} />
```

### getUserConfirmation: func

用于确认导航的函数，默认使用 window.confirm。例如，当从 /a 导航至 /b 时，会使用默认的 confirm 函数弹出一个提示，用户点击确定后才进行导航，否则不做任何处理。译注：需要配合 `<Prompt>` 一起使用。

```js
// 这是默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}
<BrowserRouter getUserConfirmation={getConfirmation} />
```

### keyLength: number

location.key 的长度，默认为 6

```js
<BrowserRouter keyLength={12} />
```

### children: node

要呈现的单个子元素（组件）。

## `<HashRouter>`

`<HashRouter>` 使用 URL 的 hash 部分（即 window.location.hash）来保持 UI 和 URL 的同步。

```js
import { HashRouter } from 'react-router-dom';

<HashRouter>
  <App />
</HashRouter>
```

注意： 使用 hash 记录导航历史不支持 location.key 和 location.state。在以前的版本中，我们视图 shim 这种行为，但是仍有一些问题我们无法解决。任何依赖此行为的代码或插件都将无法正常使用。由于该技术仅用于支持旧式（低版本）浏览器，因此对于一些新式浏览器，我们鼓励你使用 `<BrowserHistory>` 代替。

### basename: string

所有位置的基准 URL。basename 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

```js
<HashRouter basename="/calendar">
  <Link to="/today" />
</HashRouter>
```

上例中的 `<Link>` 最终将被呈现为：

`<a href="#/calendar/today" />`

### getUserConfirmation: func

用于确认导航的函数，默认使用 window.confirm。

```js
// 这是默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}
<HashRouter getUserConfirmation={getConfirmation} />
```

### hashType: string

`window.location.hash` 使用的 `hash` 类型，有如下几种：

- slash - 后面跟一个斜杠，例如 #/ 和 #/sunshine/lollipops
- noslash - 后面没有斜杠，例如 # 和 #sunshine/lollipops
- hashbang - Google 风格的 ajax crawlable，例如 #!/ 和 #!/sunshine/lollipops

默认为 slash。

### children: node

要呈现的单个子元素（组件）。

## `<Link>`

为你的应用提供声明式的、可访问的导航链接。

```js
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
```

### to: string

一个字符串形式的链接地址，通过 `pathname`、`search` 和 `hash` 属性创建。

```js
<Link to='/courses?sort=name' />
```

### to: object

一个对象形式的链接地址，可以具有以下任何属性：

- pathname - 要链接到的路径
- search - 查询参数
- hash - URL 中的 hash，例如 #the-hash
- state - 存储到 location 中的额外状态数据

```js
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: {
    fromDashboard: true
  }
}} />
```

### replace: bool

当设置为 `true` 时，点击链接后将替换历史堆栈中的当前条目，而不是添加新条目。默认为 false。

```js
<Link to="/courses" replace />
```

### innerRef: func

允许访问组件的底层引用。

```js
const refCallback = node => {
  // node 指向最终挂载的 DOM 元素，在卸载时为 null
}

<Link to="/" innerRef={refCallback} />
```

### others

你还可以传递一些其它属性，例如 title、id 或 className 等。

```js
<Link to="/" className="nav" title="a title">About</Link>
```

## `<NavLink>`

一个特殊版本的 `<Link>`，它会在与当前 URL 匹配时为其呈现元素添加样式属性。

```js
import { NavLink } from 'react-router-dom';

<NavLink to="/about">About</NavLink>
```

### activeClassName: string

当元素处于激活状态时应用的类，默认为 active。它将与 className 属性一起使用。

```js
<NavLink to="/faq" activeClassName="selected">FAQs</NavLink>
```

### activeStyle: object

当元素处于激活状态时应用的样式。

```js
const activeStyle = {
  fontWeight: 'bold',
  color: 'red'
};

<NavLink to="/faq" activeStyle={activeStyle}>FAQs</NavLink>
```

### exact: bool

如果为 true，则只有在位置完全匹配时才应用激活类/样式。

```js
<NavLink exact to="/profile">Profile</NavLink>
```

### strict: bool

如果为 true，则在确定位置是否与当前 URL 匹配时，将考虑位置的路径名后面的斜杠。有关更多信息，请参阅 `<Route strict>` 文档。

```js
<NavLink strict to="/events/">Events</NavLink>
```

### isActive: func

添加额外逻辑以确定链接是否处于激活状态的函数。如果你要做的不仅仅是验证链接的路径名与当前 URL 的路径名相匹配，那么应该使用它。

```js
// 只有当事件 id 为奇数时才考虑激活
const oddEvent = (match, location) => {
  if (!match) {
    return false;
  }
  const eventID = parseInt(match.params.eventID);
  return !isNaN(eventID) && eventID % 2 === 1;
}
<NavLink to="/events/123" isActive={oddEvent}>Event 123</NavLink>
```

### location: object

isActive 默认比较当前历史位置（通常是当前的浏览器 URL）。你也可以传递一个不同的位置进行比较。

## `<MemoryRouter>`

将 URL 的历史记录保存在内存中的 `<Router>`（不读取或写入地址栏）。在测试和非浏览器环境中很有用，例如 React Native。

```js
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <App />
</MemoryRouter>
```

### initialEntries: array

历史堆栈中的一系列位置信息。这些可能是带有 {pathname, search, hash, state} 的完整位置对象或简单的字符串 URL。

```js
<MemoryRouter
  initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
  initialIndex={1}
>
  <App/>
</MemoryRouter>
```

### initialIndex: number

initialEntries 数组中的初始位置索引。

### getUserConfirmation: func

用于确认导航的函数。当 `<MemoryRouter>` 直接与 `<Prompt>` 一起使用时，你必须使用此选项。

### keyLength: number

location.key 的长度，默认为 6。

### children: node

要呈现的单个子元素（组件）。

## `<Redirect>`

使用 `<Redirect>` 会导航到一个新的位置。新的位置将覆盖历史堆栈中的当前条目，例如服务器端重定向（HTTP 3xx）。

```js
import { Route, Redirect } from 'react-router-dom';

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <PublicHomePage />
  )
)} />
```

### to: string

要重定向到的 URL，可以是 path-to-regexp 能够理解的任何有效的 URL 路径。所有要使用的 URL 参数必须由 from 提供。

```js
<Redirect to="/somewhere/else" />
```

### to: object

要重定向到的位置，其中 pathname 可以是 path-to-regexp 能够理解的任何有效的 URL 路径。

```js
<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: {
    referrer: currentLocation
  }
}} />
```

上例中的 `state` 对象可以在重定向到的组件中通过 `this.props.location.state` 进行访问。而 `referrer` 键（不是特殊名称）将通过路径名 `/login` 指向的登录组件中的 `this.props.location.state.referrer` 进行访问。

### push: bool

如果为 true，重定向会将新的位置推入历史记录，而不是替换当前条目。

```js
<Redirect push to="/somewhere/else" />
```

### from: string

要从中进行重定向的路径名，可以是 path-to-regexp 能够理解的任何有效的 URL 路径。所有匹配的 URL 参数都会提供给 to，必须包含在 to 中用到的所有参数，to 未使用的其它参数将被忽略。

只能在 `<Switch>` 组件内使用 `<Redirect from>`，以匹配一个位置。有关更多细节，请参阅 `<Switch children>`。

```js
<Switch>
  <Redirect from='/old-path' to='/new-path' />
  <Route path='/new-path' component={Place} />
</Switch>
// 根据匹配参数进行重定向
<Switch>
  <Redirect from='/users/:id' to='/users/profile/:id' />
  <Route path='/users/profile/:id' component={Profile} />
</Switch>
```

译注：经过实践，发现以上“根据匹配参数进行重定向”的示例存在bug，没有效果。to 中的 :id 并不会继承 from 中的 :id 匹配的值，而是直接作为字符串显示到浏览器地址栏！！！

### exact: bool

完全匹配，相当于 Route.exact。

### strict: bool

严格匹配，相当于 Route.strict。

## `<Route>`

`<Route>` 可能是 React Router 中最重要的组件，它可以帮助你理解和学习如何更好的使用 React Router。它最基本的职责是在其 path 属性与某个 location 匹配时呈现一些 UI。

请考虑以下代码：

```js
import { BrowserRouter as Router, Route } from 'react-router-dom';

<Router>
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/news" component={News} />
  </div>
</Router>
```

如果应用程序的位置是 `/`，那么 UI 的层次结构将会是：

```html
<div>
  <Home />
  <!-- react-empty: 2 -->
</div>
```

或者，如果应用程序的位置是 /news，那么 UI 的层次结构将会是：

```html
<div>
  <!-- react-empty: 1 -->
  <News />
</div>
```

其中 `react-empty` 注释只是 React 空渲染的实现细节。但对于我们的目的而言，它是有启发性的。路由始终在技术上被“渲染”，即使它的渲染为空。只要应用程序的位置匹配 `<Route>` 的 `path`，你的组件就会被渲染。

### Route render methods

使用 `<Route>` 渲染一些内容有以下三种方式：

- `<Route component>`
- `<Route render>`
- `<Route children>`

在不同的情况下使用不同的方式。在指定的 `<Route>` 中，你应该只使用其中的一种。请参阅下面的解释，了解为什么有三个选项。大多数情况下你会使用 component。

### Route props

三种渲染方式都将提供相同的三个路由属性：

- match
- location
- history

### component

指定只有当位置匹配时才会渲染的 React 组件，该组件会接收 `route props` 作为属性。

```js
const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}
<Route path="/user/:username" component={User} />
```

当你使用 `component`（而不是 `render` 或 `children`）时，Router 将根据指定的组件，使用 `React.createElement` 创建一个新的 React 元素。这意味着，如果你向 `component` 提供一个内联函数，那么每次渲染都会创建一个新组件。这将导致现有组件的卸载和新组件的安装，而不是仅仅更新现有组件。当使用内联函数进行内联渲染时，请使用 `render` 或 `children`（见下文）。

### render: func

使用 `render` 可以方便地进行内联渲染和包装，而无需进行上文解释的不必要的组件重装。

你可以传入一个函数，以在位置匹配时调用，而不是使用 `component` 创建一个新的 React 元素。`render` 渲染方式接收所有与 component 方式相同的 `route props`。

```js
// 方便的内联渲染
<Route path="/home" render={() => <div>Home</div>} />

// 包装
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props} />
    </FadeIn>
  )} />
)

<FadingRoute path="/cool" component={Something} />
```

警告：`<Route component>` 优先于 `<Route render>`，因此不要在同一个 `<Route>` 中同时使用两者。

### children: func

有时候不论 path 是否匹配位置，你都想渲染一些内容。在这种情况下，你可以使用 children 属性。除了不论是否匹配它都会被调用以外，它的工作原理与 render 完全一样。

children 渲染方式接收所有与 component 和 render 方式相同的 route props，除非路由与 URL 不匹配，不匹配时 match 为 null。这允许你可以根据路由是否匹配动态地调整用户界面。如下所示，如果路由匹配，我们将添加一个激活类：

```js
const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest} />
    </li>
  )} />
)

<ul>
  <ListItemLink to="/somewhere" />
  <ListItemLink to="/somewhere-else" />
</ul>
```

这对动画也很有用：

```js
<Route children={({ match, ...rest }) => (
  {/* Animate 将始终渲染，因此你可以利用生命周期来为其子元素添加进出动画 */}
  <Animate>
    {match && <Something {...rest} />}
  </Animate>
)} />
```

警告：`<Route component>` 和 `<Route render>` 优先于 `<Route children>`，因此不要在同一个 `<Route>` 中同时使用多个。

### path: string

可以是 path-to-regexp 能够理解的任何有效的 URL 路径。

```js
<Route path="/users/:id" component={User} />
```

没有定义 path 的 `<Route>` 总是会被匹配。

### exact: bool

如果为 true，则只有在 path 完全匹配 `location.pathname` 时才匹配。

```js
<Route exact path="/one" component={OneComponent} />
```

### strict: bool

如果为 true，则具有尾部斜杠的 path 仅与具有尾部斜杠的 `location.pathname` 匹配。当 `location.pathname` 中有附加的 `URL` 片段时，`strict` 就没有效果了。

```js
<Route strict path="/one/" component={OneComponent} />
```

警告：可以使用 `strict` 来强制规定 `location.pathname` 不能具有尾部斜杠，但是为了做到这一点，strict 和 exact 必须都是 `true`。

### location: object

一般情况下，`<Route>` 尝试将其 path 与当前历史位置（通常是当前的浏览器 URL）进行匹配。但是，也可以传递具有不同路径名的位置进行匹配。

当你需要将 `<Route>` 与当前历史位置以外的 `location` 进行匹配时，此功能非常有用。如过渡动画示例中所示。

如果一个 `<Route>` 被包含在一个 `<Switch>` 中，并且需要匹配的位置（或当前历史位置）传递给了 `<Switch>`，那么传递给 `<Route>` 的 location 将被 `<Switch>` 所使用的 location 覆盖。

### sensitive: bool

如果为 true，进行匹配时将区分大小写。

```js
<Route sensitive path="/one" component={OneComponent} />
```

## `<Router>`

所有 Router 组件的通用低阶接口。通常情况下，应用程序只会使用其中一个高阶 Router：

- `<BrowserRouter>`
- `<HashRouter>`
- `<MemoryRouter>`
- `<NativeRouter>`
- `<StaticRouter>`

使用低阶 `<Router>` 的最常见用例是同步一个自定义历史记录与一个状态管理库，比如 Redux 或 Mobx。请注意，将 React Router 和状态管理库一起使用并不是必需的，它仅用于深度集成。

```js
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

<Router history={history}>
  <App />
</Router>
```

### history: object

用于导航的历史记录对象。

```js
import createBrowserHistory from 'history/createBrowserHistory';

const customHistory = createBrowserHistory();

<Router history={customHistory} />
```

### children: node

要呈现的单个子元素（组件）。

```js
<Router>
  <App />
</Router>
```

## `<StaticRouter>`

一个永远不会改变位置的 `<Router>`。

这在服务器端渲染场景中非常有用，因为用户实际上没有点击，所以位置实际上并未发生变化。因此，名称是 static（静态的）。当你只需要插入一个位置，并在渲染输出上作出断言以便进行简单测试时，它也很有用。

以下是一个示例，node server 为 `<Redirect>` 发送 302 状态码，并为其它请求发送常规 HTML：

```js
import { createServer } from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

createServer((req, res) => {
  // 这个 context 对象包含了渲染的结果
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  // 如果使用 <Redirect>，context.url 将包含要重定向到的 URL
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(html);
    res.end();
  }
}).listen(3000);
```

### basename: string

所有位置的基准 URL。`basename` 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

```js
<StaticRouter basename="/calendar">
  <Link to="/today" />
</StaticRouter>
```

上例中的 `<Link>` 最终将被呈现为：

```js
<a href="/calendar/today" />
```

### location: string

服务器收到的 URL，可能是 node server 上的 req.url。

```js
<StaticRouter location={req.url}>
  <App />
</StaticRouter>
```

### location: object

一个形如 {pathname, search, hash, state} 的位置对象。

```js
<StaticRouter location={{ pathname: '/bubblegum' }}>
  <App />
</StaticRouter>
```

### context: object

一个普通的 JavaScript 对象。在渲染过程中，组件可以向对象添加属性以存储有关渲染的信息。

```js
const context = {};

<StaticRouter context={context}>
  <App />
</StaticRouter>
```

当一个 `<Route>` 匹配时，它将把 `context` 对象传递给呈现为 `staticContext` 的组件。查看服务器渲染指南以获取有关如何自行完成此操作的更多信息。

渲染之后，可以使用这些属性来配置服务器的响应。

```js
if (context.status === '404') {
  // ...
}
```

### children: node

要呈现的单个子元素（组件）。

## `<Switch>`

用于渲染与路径匹配的第一个子 `<Route>` 或 `<Redirect>`。

这与仅仅使用一系列 `<Route>` 有何不同？

`<Switch>` 只会渲染一个路由。相反，仅仅定义一系列 `<Route>` 时，每一个与路径匹配的 `<Route>` 都将包含在渲染范围内。考虑如下代码：

```js
<Route path="/about" component={About} />
<Route path="/:user" component={User} />
<Route component={NoMatch} />
```

如果 URL 是 /about，那么 `<About>`、`<User>` 和 `<NoMatch>` 将全部渲染，因为它们都与路径匹配。这是通过设计，允许我们以很多方式将 `<Route>` 组合成我们的应用程序，例如侧边栏和面包屑、引导标签等。

但是，有时候我们只想选择一个 `<Route>` 来呈现。比如我们在 URL 为 `/about` 时不想匹配 `/:user`（或者显示我们的 404 页面），这该怎么实现呢？以下就是如何使用 `<Switch>` 做到这一点：

```js
import { Switch, Route } from 'react-router';

<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/:user" component={User} />
  <Route component={NoMatch} />
</Switch>
```

现在，当我们在 /about 路径时，`<Switch>` 将开始寻找匹配的 `<Route>`。我们知道，`<Route path="/about" />` 将会被正确匹配，这时 `<Switch>` 会停止查找匹配项并立即呈现 `<About>`。同样，如果我们在 `/michael` 路径时，那么 `<User>` 会呈现。

这对于动画转换也很有用，因为匹配的 `<Route>` 与前一个渲染位置相同。

```js
<Fade>
  <Switch>
    {/* 这里只会渲染一个子元素 */}
    <Route />
    <Route />
  </Switch>
</Fade>

<Fade>
  <Route />
  <Route />
  {/* 这里总是会渲染两个子元素，也有可能是空渲染，这使得转换更加麻烦 */}
</Fade>
```

### location: object

用于匹配子元素而不是当前历史位置（通常是当前的浏览器 URL）的 `location` 对象。

### children: node

所有 `<Switch>` 的子元素都应该是 `<Route>` 或 `<Redirect>`。只有第一个匹配当前路径的子元素将被呈现。

`<Route>` 组件使用 path 属性进行匹配，而 `<Redirect>` 组件使用它们的 from 属性进行匹配。没有 path 属性的 `<Route>` 或者没有 from 属性的 `<Redirect>` 将始终与当前路径匹配。

当在 `<Switch>` 中包含 `<Redirect>` 时，你可以使用任何 `<Route>` 拥有的路径匹配属性：path、exact 和 strict。from 只是 path 的别名。

如果给 `<Switch>` 提供一个 location 属性，它将覆盖匹配的子元素上的 location 属性。

```js
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/users" component={Users} />
  <Redirect from="/accounts" to="/users" />
  <Route component={NoMatch} />
</Switch>
```

## history

本文档中的术语 `history` 指的是 `history` 包，它是 React Router 的两个主要依赖之一（除了 React 本身），并且提供了几种不同的实现方式，用于在各种环境中管理 JavaScript 中的会话历史。

以下术语我们会经常使用：

- browser history - 针对 DOM 环境，用于支持 HTML5 history API 的浏览器
- hash history - 针对 DOM 环境，用于传统的旧式（低版本） 浏览器
- memory history - history 在内存上的实现，用于测试以及 React Native 等非 DOM 环境

history 对象通常具有以下属性和方法：

- length - number 历史堆栈中的条目数
- action - string 当前的导航操作（push、replace 或 pop）
- location - object 当前访问的位置信息，可能具有以下属性：
  - pathname - string URL 路径
  - search - string URL 中的查询字符串
  - hash - string URL 中的 hash 片段
  - state - object 存储至 location 中的额外状态数据，仅在 browser history 和 memory history 中有效。
- push(path, [state]) - function 将一个新条目推入到历史堆栈中
- replace(path, [state]) - function 替换历史堆栈中的当前条目
- go(n) - function 将历史堆栈中的指针移动 n 个条目
- goBack() - function 返回到上一个页面，相当于 go(-1)
- goForward() - function 进入到下一个页面，相当于 go(1)
- block(prompt) - function 阻止导航（请参阅 history 文档）

### history is mutable

`history` 对象是可变的。因此建议从 `<Route>` 渲染组件时接收的属性中直接访问 `location`，而不是通过 `history.location` 进行访问。这样可以保证 React 在生命周期中的钩子函数正常执行。例如：

```js
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // locationChanged 会是 true
    const locationChanged = nextProps.location !== this.props.location;

    // 错误，locationChanged 永远是 false，因为 history 是可变的。
    const locationChanged = nextProps.history.location !== this.props.history.location;
  }
}

<Route component={Comp} />
```

根据你使用的实现方式，还可能存在其它属性。有关详细信息，请参阅 history 文档。

## location

`location` 代表应用程序的位置。如当前的位置，将要去的位置，或是之前所在的位置。它看起来像这样：

```js
{
  key: 'ac3df4', // 使用 hash history 时，没有这个属性
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

Router 将在以下几个地方为您提供一个 location 对象：

- 在 Route component 中，以 this.props.location 方式获取
- 在 Route render 中，以 ({ location }) => () 方式获取
- 在 Route children 中，以 ({ location }) => () 方式获取
- 在 withRouter 中，以 this.props.location 方式获取

location 对象永远不会发生改变，因此可以在生命周期钩子函数中使用 location 对象来查看当前访问地址是否发生改变。这种技巧在获取远程数据以及使用动画时非常有用。

```js
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // 已经跳转了！
  }
}
```

可以在以下不同情境中使用 location：

- Web `<Link to={location}>`
- React Native `<Link to={location}>`
- `<Redirect to={location}>`
- `history.push(location)`
- `history.replace(location)`

通常情况下只是使用一个字符串，但是如果你需要添加一些额外的 state，以在应用程序跳转到特定位置时可以使用，那么你就可以使用 location 对象。如果你想根据导航历史而不是路径来组织 UI（如模态对话框），这也很有用（见模态画廊示例）。

```js
// 通常情况下我们这么做
<Link to="/somewhere" />

// 但是我们可以改为使用 location 对象
const location = {
  pathname: '/somewhere',
  state: { fromDashboard: true }
};

<Link to={location} />
<Redirect to={location} />
history.push(location);
history.replace(location);
```

最终，location 将传递给以下组件：

- Route
- Switch

这将阻止它们在 Router 状态下使用实际位置。这对动画和等待导航非常有用，或者任何时候你想诱导一个组件在不同于真实位置的地方渲染。

## match

一个 match 对象包含有关 `<Route path>` 如何匹配 URL 的信息。它具有以下属性：

- params - object 根据 path 中指定的动态片段，从 URL 中解析出的键值对
- isExact - boolean 如果整个 URL 匹配（不包含尾随字符），则为 true
- path - string 用于匹配的路径模式。可用于构建嵌套的 `<Route>`
- url - string URL 的匹配部分。可用于构建嵌套的 `<Link>`

您可以在以下几个地方访问 match 对象：

- 在 Route component 中，以 this.props.match 方式获取
- 在 Route render 中，以 ({ match }) => () 方式获取
- 在 Route children 中，以 ({ match }) => () 方式获取
- 在 withRouter 中，以 this.props.match 方式获取
- matchPath 的返回值

如果 `<Route>` 没有定义 path，并因此始终匹配，则会得到最接近的父匹配。`withRouter` 也是一样。

### null matches

在 `<Route path="/somewhere" children={({ match }) => ()} />` 中，即使 path 与当前位置不匹配，children 指定的内联函数也依然会被调用。这种情况下，match 为 null。能够在不匹配时依然呈现 `<Route>` 的内容可能很有用，但是这样会带来一些挑战。

解析 URL 的默认方式是将 match.url 字符串连接到 relative-path。

`${match.url}/relative-path`
如果你在 match 为 null 时尝试执行此操作，最终会出现 TypeError 错误。这意味着在使用 children 属性时尝试在 `<Route>` 内部连接 relative-path 是不安全的。

当您在产生空匹配对象的 `<Route>` 内部使用没有定义 path 的 `<Route>` 时，会出现类似但更微妙的情况。

```js
// location.pathname = '/matches'
<Route path='/does-not-match' children={({ match }) => (
  // match === null
  <Route render={({ match: pathlessMatch }) => (
    // pathlessMatch === ???
  )} />
)} />
```

没有 path 的 `<Route>` 从它的父节点继承 match 对象。如果它的父匹配为 null，那么它的匹配也将为 null。这意味着：

- 任何子路由/子链接必须是绝对的
- 一个没有定义 path 的 `<Route>`，它的父匹配可以为 null，但它本身需要使用 children 来呈现内容。

## matchPath

在正常的渲染周期之外，你可以使用和 `<Route>` 所使用的相同的匹配代码，例如在服务器上呈现之前收集数据依赖关系。

```js
import { matchPath } from 'react-router';

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false
});
```

### pathname

第一个参数是要匹配的路径名。如果您在服务器上通过 Node.js 使用，它将是 req.path。

### props

第二个参数是匹配的属性，它们与 `<Route>` 接受的匹配属性相同：

```js
{
  path, // 例如 /users/:id
  strict, // 可选，默认为 false
  exact // 可选，默认为false
}
```

### returns

```js
matchPath("/users/2", {
  path: "/users/:id",
  exact: true,
  strict: true
});
// 匹配到时返回
//  {
//    isExact: true
//    params: {
//        id: "2"
//    }
//    path: "/users/:id"
//    url: "/users/2"
//  }

// 匹配不到是返回null
//  null
```

## withRouter

你可以通过 withRouter 高阶组件访问 history 对象的属性和最近（UI 结构上靠的最近）的 `<Route>` 的 match 对象。当组件渲染时，withRouter 会将更新后的 match、location 和 history 传递给它。

```js
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// 显示当前位置的 pathname 的简单组件
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props;
    return (
      <div>You are now at {location.pathname}</div>
    );
  }
}

// 创建一个连接到 Router 的新组件（借用 redux 术语）
const ShowTheLocationWithRouter = withRouter(ShowTheLocation)
```

注意：`withRouter` 不会订阅位置更改，如 `React Redux` 的 `connect` 对状态更改所做的更改。而是在位置更改从 `<Router>` 组件传播出去之后重新呈现。这意味着除非其父组件重新呈现，否则使用 `withRouter` 不会在路由转换时重新呈现。如果使用 `withRouter` 来防止更新被 `shouldComponentUpdate` 阻塞，那么使用router 包装实现 `shouldComponentUpdate` 的组件是非常重要的。例如，使用 `Redux` 时：

```js
// This gets around shouldComponentUpdate
withRouter(connect(...)(MyComponent))
// or
compose(
  withRouter,
  connect(...)
)(MyComponent)

// This does not
connect(...)(withRouter(MyComponent))
// nor
compose(
  connect(...),
  withRouter
)(MyComponent)
```

有关更多信息，请参阅本指南。

静态方法和属性

封装组件的所有无反应的特定静态方法和属性都会自动复制到 connected 组件。

### Component.WrappedComponent

被包装的组件被公开为返回组件上的静态属性 WrappedComponent，它可用于隔离测试组件等等。

```js
// MyComponent.js
export default withRouter(MyComponent);

// MyComponent.test.js
import MyComponent from './MyComponent';

render(<MyComponent.WrappedComponent location={{...}} ... />);
```

### wrappedComponentRef: func

一个将作为 ref 属性传递给包装组件的函数。

```js
class Container extends React.Component {
  componentDidMount() {
    this.component.doSomething();
  }

  render() {
    return (
      <MyComponent wrappedComponentRef={c => this.component = c} />
    )
  }
}
```
