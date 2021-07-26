# node 内置包

## url

### url.parse

> 将一个 URL 字符串转换成对象并返回。

`url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`

接收参数：

- urlString:url 字符串

- parseQueryString:为 true 时将使用查询模块分析查询字符串，默认为 false

- slashesDenoteHost

  默认为 false，//foo/bar 形式的字符串将被解释成 { pathname: ‘//foo/bar' }

  如果设置成 true，//foo/bar 形式的字符串将被解释成   { host: ‘foo', pathname: ‘/bar' }

```js
var url = require('url');
var a = url.parse('http://localhost:8080/one?a=index&t=article');
console.log(a);
//输出结果：
{
    protocol : 'http' ,//底层使用的协议
    auth : null ,
    host : 'localhost:8080' ,
    port : '8080' ,
    hostname : 'localhost' ,
    hash : null ,
    search : '?a=index&t=article',
    query : 'a=index&t=article',
    pathname : '/one',
    path : '/one?a=index&t=article',
    href : 'http://localhost:8080/one?a=index&t=article'
}
```

### url.format

> 将一个解析后的 URL 对象、转成、一个格式化的 URL 字符串。与上一个反向

`url.format(URL[, options])`

- URL: URL WHATWG URL 对象。
- options Object:
  - auth boolean 如果序列化的 URL 字符串应该包含用户名和密码则为 true，否则为 false。默认值: true。
  - fragment boolean 如果序列化的 URL 字符串应该包含分段则为 true，否则为 false。默认值: true。
  - search boolean 如果序列化的 URL 字符串应该包含搜索查询则为 true，否则为 false。默认值: true。
  - unicode boolean 如果出现在 URL 字符串主机元素里的 Unicode 字符应该被直接编码而不是使用 Punycode 编码则为 true。默认值: false。
- 返回: string

### url.resolve

> 解析 url（拼接）

`url.resolve(from, to)`

- from string 要解析的基本 URL。
- to string 要解析的 HREF URL。

```js
const url = require("url");
url.resolve("/one/two/three", "four"); // '/one/two/four'
url.resolve("http://example.com/", "/one"); // 'http://example.com/one'
url.resolve("http://example.com/one", "/two"); // 'http://example.com/two'
```

## querystring

> querystring 模块提供用于解析和格式化 URL 查询字符串的实用工具

### qs.escape

> qs.escape() 方法以对 URL 查询字符串的特定要求进行了优化的方式对给定的 str 执行 URL 百分比编码。

`qs.escape(str)`

- str string

qs.escape() 方法由 qs.stringify() 使用，通常不会直接使用。 它的导出主要是为了允许应用程序代码在必要时通过将 qs.escape 指定给替代函数来提供替换的百分比编码实现。

```js
qs.escape("name=慕白");
// 'name%3D%E6%85%95%E7%99%BD'
```

### querystring.parse(str,separator,eq,options)

parse 这个方法是将一个字符串反序列化为一个对象。

参数：

- str string 指需要反序列化的字符串;
- separator string 指用于分割 str 这个字符串的字符或字符串，默认值为"&";
- eq string 指用于划分键和值的字符或字符串，默认值为"=";
- options object 可设置 maxKeys 和 decodeURIComponent 这两个属性：
  - maxKeys：number 指定解析键值对的最大值，默认值为 1000，如果设置为 0 时，则取消解析的数量限制;
  - decodeURIComponent function 解码查询字符串中的百分比编码字符时使用的函数。默认值: qs.unescape()

```js
qs.parse("foo=bar&abc=xyz&abc=123");
// { foo: 'bar', abc: ['xyz', '123'] }
```

### qs.stringify

> stringify 这个方法是将一个对象序列化成一个字符串，与 qs.parse 相对。

`qs.stringify(obj[, sep[, eq[, options]]])`

参数：

- obj object 指需要序列化的对象
- separator string 用于连接键值对的字符或字符串，默认值为"&";
- eq string 用于连接键和值的字符或字符串，默认值为"=";
- options object 传入一个对象，该对象可设置 encodeURIComponent 这个属性：
  - encodeURIComponent:值的类型为 function，可以将一个不安全的 url 字符串转换成百分比的形式，默认值为 qs.escape()

```js
qs.stringify({ foo: "bar", baz: ["qux", "quux"], corge: "" });
// 返回 'foo=bar&baz=qux&baz=quux&corge='
qs.stringify({ foo: "bar", baz: "qux" }, ";", ":");
// 返回 'foo:bar;baz:qux'
// 假设 gbkEncodeURIComponent 函数已存在。
qs.stringify({ w: "中文", foo: "bar" }, null, null, {
  encodeURIComponent: gbkEncodeURIComponent,
});
```

### qs.unescape

> qs.unescape() 方法在给定的 str 上执行 URL 百分比编码字符的解码。

`qs.unescape(str)`

qs.unescape() 方法由 qs.parse() 使用，通常不会直接使用它。 它的导出主要是为了允许应用程序代码在必要时通过将 qs.unescape 分配给替代函数来提供替换的解码实现。

默认情况下， qs.unescape() 方法将尝试使用 JavaScript 内置的 decodeURIComponent() 方法进行解码。 如果失败，将使用更安全的不会丢失格式错误的 URL 的等价方法。

## http

### http.get

`http.get(url[, options][, callback])`

由于大多数请求都是没有主体的 GET 请求，因此 Node.js 提供了这个便捷的方法。 这个方法与 http.request() 的唯一区别是它将方法设置为 GET 并自动调用 req.end()。

- url string | URL
- options Object 接受与 http.request() 相同的 options，且 method 始终设置为 GET。从原型继承的属性将被忽略。
- callback Function callback 调用时只有一个参数
- 返回: http.ClientRequest

```js
// 获取 JSON 的示例
http
  .get("http://nodejs.cn/index.json", (res) => {
    const { statusCode } = res;
    const contentType = res.headers["content-type"];
    let error;
    if (statusCode !== 200) {
      error = new Error(`请求失败\n状态码: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(
        `无效的 content-type.\n期望的是 application/json 但接收到的是 ${contentType}`
      );
    }
    if (error) {
      console.error(error.message);
      // 消费响应数据来释放内存。
      res.resume();
      return;
    }
    res.setEncoding("utf8");
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  })
  .on("error", (e) => {
    console.error(`出现错误: ${e.message}`);
  });
```

### http.createServer

`http.createServer([options][, requestListener])`

- options Object
  - IncomingMessage http.IncomingMessage 指定要使用的 IncomingMessage 类。用于扩展原始的 IncomingMessage。默认值: IncomingMessage。
  - ServerResponse http.ServerResponse 指定要使用的 ServerResponse 类。用于扩展原始 ServerResponse。默认值: ServerResponse。
- requestListener Function
- 返回: http.Server 返回新建的 http.Server 实例。

requestListener 是一个自动添加到 'request' 事件的函数。

```js
const http = require("http");
const https = require("https");
const url = require("url");
let app = http.createServer((req, res) => {
  let str = req.url;
  let pageNo = url.parse(str, true).query.pageNo;
  let pageSize = url.parse(str, true).query.pageSize;
  let reqUrl = `https://m.lagou.com/listmore.json?pageNo=${pageNo}&pageSize=${pageSize}`;
  res.setHeader("Content-Type", "application/json;charset=utf8;");
  https.get(reqUrl, (res1) => {
    if (res1.statusCode !== 200) {
      throw new Error("error info");
    }
    let rawdata = "";
    res1.on("data", (chunk) => {
      rawdata += chunk;
    });
    res1.on("end", () => {
      res.write(rawdata);
      res.end();
    });
  });
});
app.listen("3000", () => {
  console.log("localhost:3000 stat ...");
});
// http://localhost:3000/?pageNo=2&pageSize=15
```

### http.request

`http.request(url[, options][, callback])`

- url string | URL
- options Object
  - agent http.Agent | boolean 控制 Agent 的行为。可能的值有：
    - undefined (默认): 对此主机和端口使用 http.globalAgent。
    - Agent 对象: 显式地使用传入的 Agent。
    - false: 使用新建的具有默认值的 Agent。
  - auth string 基本的身份验证，即 'user:password'，用于计算授权请求头。
  - createConnection Function 当 agent 选项未被使用时，用来为请求生成套接字或流的函数。这可用于避免创建自定义的 Agent 类- 以覆盖默认的 createConnection 函数。详见 agent.createConnection()。任何双工流都是有效的返回值。
  - defaultPort number 协议的默认端口。 如果使用 Agent，则默认值为 agent.defaultPort，否则为 undefined。
  - family number 当解析 host 或 hostname 时使用的 IP 地址族。有效值为 4 或 6。如果没有指定，则同时使用 IP v4 和 v6。
  - headers Object 包含请求头的对象。
  - host string 请求发送至的服务器的域名或 IP 地址。默认值: 'localhost'。
  - hostname string host 的别名。为了支持 url.parse()，如果同时指定 host 和 hostname，则使用 hostname。
  - localAddress string 为网络连接绑定的本地接口。
  - method string 一个字符串，指定 HTTP 请求的方法。默认值: 'GET'。
  - path string 请求的路径。应包括查询字符串（如果有）。例如 '/index.html?page=12'。当请求的路径包含非法的字符时，则抛出异- 常。目前只有空格被拒绝，但未来可能会有所变化。默认值: '/'。
  - port number 远程服务器的端口。默认值: defaultPort（如果有设置）或 80。
  - protocol string 使用的协议。默认值: 'http:'。
  - setHost boolean: 指定是否自动添加 Host 请求头。默认值: true。
  - socketPath string Unix 域套接字。如果指定了 host 或 port 之一（它们指定了 TCP 套接字），则不能使用此选项。
  - timeout number: 指定套接字超时的数值，以毫秒为单位。这会在套接字被连接之前设置超时。
- callback Function
- 返回: http.ClientRequest

url 可以是字符串或 URL 对象。 如果 url 是一个字符串，则会自动使用 `[url.URL()]` 解析它。 如果它是一个 URL 对象，则会自动转换为普通的 options 对象。

如果同时指定了 url 和 options，则对象会被合并，其中 options 属性优先。

可选的 callback 参数会作为单次监听器被添加到 'response' 事件。

http.request() 返回 http.ClientRequest 类的实例。 ClientRequest 实例是一个可写流。 如果需要使用 POST 请求上传文件，则写入到 ClientRequest 对象。

```js
const postData = querystring.stringify({ msg: "你好世界" });
const options = {
  hostname: "nodejs.cn",
  port: 80,
  path: "/upload",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": Buffer.byteLength(postData),
  },
};
const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  res.setEncoding("utf8");
  res.on("data", (chunk) => {
    console.log(`响应主体: ${chunk}`);
  });
  res.on("end", () => {
    console.log("响应中已无数据");
  });
});
req.on("error", (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});
// 将数据写入请求主体。
req.write(postData);
req.end();
```

## path

```js
const path = require("path");
path.extname(path); // 返回 path 的扩展名
path.join("/foo", "bar", "baz/asdf", "quux", ".."); // 返回: '/foo/bar/baz/asdf'
```

## fs

```js
const fs = require("fs");
// 带sync的方法为同步

// 创建文件并写入内容
fs.writeFile("log.txt", "hello world", "utf8", () => {}); // 异步
fs.writeFileSync("log1.txt", "hello world", "utf8");

fs.appendFile("log1.txt", "gp", function () {}); //内容的追加
fs.unlink("log.txt", () => {}); // 删除文件
fs.renameSync("log.txt", "lognew.txt"); // 改名
fs.appendFileSync("./log1.txt", "\rhello world"); // 给文件追加内容
fs.mkdirSync("logs"); // 创建文件夹
fs.rmdirSync("log"); //删除文件夹
// 读取文件
fs.readFile("./logs/log.txt", (err, data) => {
  console.log(data.toString());
});
// 读取文件夹
var s = fs.readdir("./logs", (err, data) => {
  console.log(data.toString()); // 数组
});
var s = fs.statSync("./logs"); // 获取文件信息
console.log(s.isDirectory());
fs.rmdirSync("./logs"); // 删除文件夹
//删除文件夹
function delfile(path) {
  var stat = fs.statSync(path);
  if (stat.isDirectory()) {
    var files = fs.readdirSync(path);
    console.log(files);
    files.forEach((item, index) => {
      let curPath = __dirname + "/logs/" + item;
      delfile(curPath);
    });
    if (!files.length) {
      fs.rmdirSync(path);
    }
  } else {
    console.log("del:", path);
    fs.unlink(path, () => {});
  }
}
delfile("./logs");
```

## stream

```js
const fs = require("fs");
const zlib = require("zlib");
fs.writeFileSync("log.txt", "gp16");
fs.createReadStream("./log.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("log.txt.gz"));
```

## events

```js
const { once, EventEmitter } = require("events");
```

### events.once

`events.once(emitter, name)`

新增于: v11.13.0

- emitter EventEmitter
- name string
- 返回: Promise

创建一个 Promise，当 EventEmitter 触发给定的事件时则会被解决，当 EventEmitter 触发 'error' 时则会被拒绝。 解决 Promise 时将会带上触发到给定事件的所有参数的数组。

```js
const { once, EventEmitter } = require("events");
async function run() {
  const ee = new EventEmitter();
  process.nextTick(() => {
    ee.emit("myevent", 42);
  });
  const [value] = await once(ee, "myevent");
  console.log(value);
  const err = new Error("错误信息");
  process.nextTick(() => {
    ee.emit("error", err);
  });
  try {
    await once(ee, "myevent");
  } catch (err) {
    console.log("出错", err);
  }
}
run();
```

### EventEmitter 类

```js
const event = require("events");
let emitter = new event.EventEmitter()
emitter.off(eventName, listener) // 移除事件监听,可链式调用
emitter.on(eventName, listener) // 添加事件监听,可链式调用
emitter.once(eventName, listener) // 添加事件监听，执行一次后自动移除,可链式调用
emitter.emit(eventName[, ...args]) // 按照监听器注册的顺序，同步地调用每个注册到名为 eventName 的事件的监听器，并传入提供的参数。如果事件有监听器，则返回 true，否则返回 false。
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
// 第一个监听器。
myEmitter.on('event', function firstListener() {
  console.log('第一个监听器');
});
// 第二个监听器。
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`第二个监听器中的事件有参数 ${arg1}、${arg2}`);
});
// 第三个监听器
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`第三个监听器中的事件有参数 ${parameters}`);
});
myEmitter.emit('event', 1, 2, 3, 4, 5);
// 第一个监听器
// 第二个监听器中的事件有参数 1、2
// 第三个监听器中的事件有参数 1, 2, 3, 4, 5
```
