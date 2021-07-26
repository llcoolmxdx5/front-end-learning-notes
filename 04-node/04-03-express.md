# express

> Express 是一个路由和中间件 Web 框架，其自身的功能很少：Express 应用程序本质上是一系列中间件函数调用

## express 生成器

```bash
npm install express-generator -g # 生成器
express --view=ejs --css=sass  myapp # 生成器生成项目
```

## 路由

```js
const express = require("express");
const ejs = require("ejs");
let router = express.Router();
//http://localhost:3000/user/getinfo?name=xiaoming&age=20
router.get("/getinfo", function (req, res) {
  res.send(req.query);
  // res.json({ name: 'aaa' }) // 直接发送json
  // res.download('a.txt') // 下载
});
// http://localhost:3000/flights/LAX-SFO
router.get("/flights/:from-:to", function (req, res) {
  res.send({
    from: req.params.from,
    to: req.params.to,
  });
});
// 服务端渲染
router.get("/info", function (req, res) {
  let html = ejs.render(
    `<% if (user) { %>
    <h2><%= user.name %></h2>
  <% } %>`,
    { user: { name: "xiaoming" } }
  );
  res.send(html);
});
// 重定向
// res.redirect([status,] path)
// res.redirect(301, 'http://example.com');
app
  .route("/book")
  .get(function (req, res) {
    res.send("Get a random book");
  })
  .post(function (req, res) {
    res.send("Add a book");
  })
  .put(function (req, res) {
    res.send("Update the book");
  });
module.exports = router;
```

## 静态文件

```js
app.use(express.static("public"));
// http://localhost:3000/js/app.js
app.use("/static", express.static(path.join(__dirname, "public")));
// http://localhost:3000/static/js/app.js
```

## 中间件

### 1.应用层中间件

```js
app.get(
  "/user/:id",
  function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id === "0") next("route");
    // next(“route”)，会跳过当前路由的其它中间件，直接将控制权交给下一个路由。
    // next('route')仅在使用app.METHOD()或router.METHOD()函数加载的中间件函数中有效。
    else next();
  },
  function (req, res, next) {
    // send a regular response
    res.send("regular");
  }
);
// handler for the /user/:id path, which sends a special response
app.get("/user/:id", function (req, res, next) {
  res.send("special");
});
```

### 2.路由层中间件

路由器级中间件与应用程序级中间件的工作方式相同，只不过它绑定到的实例 express.Router()。

### 3.错误处理中间件

错误处理中间件始终采用四个参数。您必须提供四个参数以将其标识为错误处理中间件函数。即使不需要使用该 next 对象，也必须指定它以维护签名。否则，该 next 对象将被解释为常规中间件，并且将无法处理错误。

```js
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

### 4.内置中间件

`express.static`提供静态资源，例如 HTML 文件，图像等。
`express.json`使用 JSON 负载解析传入的请求。注意：Express 4.16.0+中可用
`express.urlencoded`使用 URL 编码的有效内容解析传入的请求。 注意：Express 4.16.0+中可用

```js
express.json();
express.urlencoded(); // 基于body-parser
express.static("public");
```

### cookie-parser

`yarn add cookie-parser`

```js
var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
// load the cookie-parsing middleware
app.use(cookieParser());
```

### body-parser

```js
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.write("you posted:\n");
  res.end(JSON.stringify(req.body, null, 2));
});
```

### cors

`yarn add cors`

```js
var cors = require("cors");
var options = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
// 此处列出的options全是默认值 可以不写
app.use(cors(options)); // 全部路由都允许跨域
app.get("/products/:id", cors(), function (req, res, next) {
  res.json({ msg: "仅单个路由允许跨域" });
});
```
