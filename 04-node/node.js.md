# 原生 Node.js 静态资源服务器

## index.js

```js
const http = require("http");
const path = require("path");
const content = require("./util/content");
const mimes = require("./util/mimes");

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = "./static";

// 解析资源类型
function parseMime(url) {
  let extName = path.extname(url);
  extName = extName ? extName.slice(1) : "unknown";
  return mimes[extName];
}

// 搭建server
const server = http.createServer((req, res) => {
  // 静态资源目录在本地的绝对路径
  let fullStaticPath = path.join(__dirname, staticPath);

  // 获取静态资源内容，有可能是文件内容，目录，或404
  let _content = content(req.url, fullStaticPath);

  // 解析请求内容的类型
  let _mime = parseMime(req.url);

  // 如果有对应的文件类型，就配置上下文的类型
  if (_mime) {
    res.setHeader("Content-Type", _mime);
  }

  // 输出静态资源内容
  if (_mime && _mime.indexOf("image/") >= 0) {
    // 如果是图片，输出二进制数据
    res.writeHead(200);
    res.write(_content, "binary");
    res.end();
  } else {
    // 其他则输出文本
    res.write(_content);
    res.end();
  }
});

server.listen(3000, () => {
  console.log("[demo] static-server is starting at port 3000");
});
```

## util/content.js

```js
const path = require("path");
const fs = require("fs");

// 封装读取目录内容方法
const dir = require("./dir");

// 封装读取文件内容方法
const file = require("./file");

/**
 * 获取静态资源内容
 * @param  {string} 上下文url
 * @param  {string} 静态资源目录在本地的绝对路径
 * @return  {string} 请求获取到的本地内容
 */
function content(url, fullStaticPath) {
  // 封装请求资源的完绝对径
  let reqPath = path.join(fullStaticPath, url);

  // 判断请求路径是否为存在目录或者文件
  let exist = fs.existsSync(reqPath);

  // 返回请求内容， 默认为空
  let content = "";

  if (!exist) {
    //如果请求路径不存在，返回404
    content = "404 Not Found! o(╯□╰)o！";
  } else {
    //判断访问地址是文件夹还是文件
    let stat = fs.statSync(reqPath);

    if (stat.isDirectory()) {
      //如果为目录，则渲读取目录内容
      content = dir(url, reqPath);
    } else {
      // 如果请求为文件，则读取文件内容
      content = file(reqPath);
    }
  }

  return content;
}

module.exports = content;
```

## util/dir.js

```js
// 遍历读取目录内容方法
const walk = require("./walk");

/**
 * 封装目录内容
 * @param  {string} url 当前请求的上下文中的url，
 * @param  {string} reqPath 请求静态资源的完整本地路径
 * @return {string} 返回目录内容，封装成HTML
 */
function dir(url, reqPath) {
  // 遍历读取当前目录下的文件、子目录
  let contentList = walk(reqPath);

  let html = `<ul>`;
  for (let [index, item] of contentList.entries()) {
    html = `${html}<li><a href="${
      url === "/" ? "" : url
    }/${item}">${item}</a></li>`;
  }
  html = `${html}</ul>`;

  return html;
}

module.exports = dir;
```

## util/walk.js

```js
const fs = require("fs");
const mimes = require("./mimes.js");

/**
 * 遍历读取目录内容（子目录，文件名）
 * @param  {string} reqPath 请求资源的绝对路径
 * @return {array} 目录内容列表
 */
function walk(reqPath) {
  let files = fs.readdirSync(reqPath);

  let dirList = [],
    fileList = [];
  for (let i = 0, len = files.length; i < len; i++) {
    let item = files[i];
    let itemArr = item.split(".");
    let itemMime =
      itemArr.length > 1 ? itemArr[itemArr.length - 1] : "undefined";

    if (typeof mimes[itemMime] === "undefined") {
      dirList.push(files[i]);
    } else {
      fileList.push(files[i]);
    }
  }

  let result = dirList.concat(fileList);

  return result;
}

module.exports = walk;
```

## util/file.js

```js
const fs = require("fs");

/**
 * 读取文件方法
 * @param  {string} 文件本地的绝对路径
 * @return {string|binary}
 */
function file(filePath) {
  let content = fs.readFileSync(filePath, "binary");
  return content;
}

module.exports = file;
```

util/walk.js

```js
const fs = require("fs");
const mimes = require("./mimes.js");

/**
 * 遍历读取目录内容（子目录，文件名）
 * @param  {string} reqPath 请求资源的绝对路径
 * @return {array} 目录内容列表
 */
function walk(reqPath) {
  let files = fs.readdirSync(reqPath);

  let dirList = [],
    fileList = [];
  for (let i = 0, len = files.length; i < len; i++) {
    let item = files[i];
    let itemArr = item.split(".");
    let itemMime =
      itemArr.length > 1 ? itemArr[itemArr.length - 1] : "undefined";

    if (typeof mimes[itemMime] === "undefined") {
      dirList.push(files[i]);
    } else {
      fileList.push(files[i]);
    }
  }

  let result = dirList.concat(fileList);

  return result;
}

module.exports = walk;
```

## util/mime.js

```js
let mimes = {
  css: "text/css",
  less: "text/css",
  gif: "image/gif",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  pdf: "application/pdf",
  png: "image/png",
  svg: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  tiff: "image/tiff",
  txt: "text/plain",
  wav: "audio/x-wav",
  wma: "audio/x-ms-wma",
  wmv: "video/x-ms-wmv",
  xml: "text/xml",
};

module.exports = mimes;
```

# Socket 编程

## net 模块

**SocketClient.js**

```js
var net = require("net");
const readline = require("readline");

var port = 9000;
var host = "127.0.0.1";

var socket = new net.Socket();

socket.setEncoding = "UTF-8";

socket.connect(port, host, () => {
  socket.write("hello.");
});

socket.on("data", (msg) => {
  console.log(msg.toString());
  say();
});

socket.on("error", function (err) {
  console.log("error" + err);
});

socket.on("close", function () {
  console.log("connection closeed");
});

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function say() {
  r1.question("请输入：", (inputMsg) => {
    if (inputMsg != "bye") {
      socket.write(inputMsg + "\n");
    } else {
      socket.destroy();
      r1.close();
    }
  });
}
```

**SocketServer.js**

```js
const net = require("net");

const server = new net.createServer();

let clients = {};
let clientName = 0;

server.on("connection", (client) => {
  client.name = ++clientName;
  clients[client.name] = client;

  client.on("data", (msg) => {
    // console.log('客户端传来：' + msg);
    broadcast(client, msg.toString());
  });

  client.on("error", (e) => {
    console.log("client error" + e);
    client.end();
  });

  client.on("close", (data) => {
    delete clients[client.name];
    console.log(client.name + " 下线了");
  });
});

function broadcast(client, msg) {
  for (var key in clients) {
    clients[key].write(client.name + " 说：" + msg);
  }
}

server.listen(9000);
```

## WebSocket

**client/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>WebSocket</title>
    <script src="WsClient.js" charset="utf-8"></script>
  </head>
  <body>
    <h1>gp10 交流区</h1>
    <div
      id="content"
      name="name"
      style="overflow-y: scroll; width: 400px; height: 300px; border: solid 1px #000"
    ></div>
    <br />
    <div>
      <input type="text" id="msg" style="width: 200px;" />
    </div>
    <button id="submit">提交</button>
    <script>
      document.querySelector("#submit").addEventListener(
        "click",
        function () {
          var msg2 = msg.value;
          ws.send(msg2);
          msg.value = "";
        },
        false
      );
    </script>
  </body>
</html>
```

**client/WsClient.js**

```js
const ws = new WebSocket("ws://localhost:8080/");

ws.onopen = () => {
  ws.send("大家好");
};

ws.onmessage = (msg) => {
  const content = document.getElementById("content");
  content.innerHTML += msg.data + "<br/>";
};

ws.onerror = (err) => {
  console.log(err);
};

ws.onclose = () => {
  console.log("closed~");
};
```

**WebSocketServer.js**

```js
const WebSocket = require("ws");
const ws = new WebSocket.Server({ port: 8080 });

let clients = {};
let clientName = 0;

ws.on("connection", (client) => {
  client.name = ++clientName;
  clients[client.name] = client;

  client.on("message", (msg) => {
    broadcast(client, msg);
  });

  client.on("close", () => {
    delete clients[client.name];
    console.log(client.name + " 离开了~");
  });
});

function broadcast(client, msg) {
  for (var key in clients) {
    clients[key].send(client.name + " 说：" + msg);
  }
}
```

## socket.io

**client/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>socket.io</title>
    <script src="socket.io.js" charset="utf-8"></script>
  </head>
  <body>
    <h1>gp10 交流区</h1>
    <div
      id="content"
      name="name"
      style="overflow-y: scroll; width: 400px; height: 300px; border: solid 1px #000"
    ></div>
    <br />
    <div>
      <input type="text" id="msg" style="width: 200px;" />
    </div>
    <button id="submit">提交</button>
    <script>
      var socket = io.connect("http://10.9.164.98:8081");
      const content = document.getElementById("content");
      document.querySelector("#submit").addEventListener(
        "click",
        function () {
          var msg2 = msg.value;
          socket.emit("receive", msg2);
          msg.value = "";
          content.innerHTML += msg2 + "<br/>";
        },
        false
      );

      socket.on("message", function (msg) {
        content.innerHTML += msg + "<br/>";
      });
    </script>
  </body>
</html>
```

**socket.io.js**

需要下载

**server.js**

```js
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static(__dirname + "/client"));

io.on("connection", function (socket) {
  // setInterval(function () {
  //   socket.emit('list', 'abc')
  // }, 1000)
  // socket.broadcast.emit('list', 'test');
  // socket.on('backend', (msg) => {
  //   console.log(msg);
  // })

  socket.on("receive", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

server.listen(8081, "10.9.164.98");
```

# 异步编程

> nodejs 是单线程执行的，同时它又是基于事件驱动的非阻塞 IO 编程模型。这就使得我们不用等待异步操作结果返回，就可以继续往下执行代码。当异步事件触发之后，就会通知主线程，主线程执行相应事件的回调。

以上是众所周知的内容。今天我们从源码入手，分析一下 nodejs 的事件循环机制。

## 引子代码

```js
// event-loop-1.js
setTimeout(() => {
  console.log("setTimeout");
}, 0);
setImmediate(() => {
  console.log("setImmediate");
});

// event-loop-2.js
const fs = require("fs");
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("setTimeout");
  }, 0);
  setImmediate(() => {
    console.log("setImmediate");
  });
});
```

## Node.js 架构

首先，我们先看下 nodejs 架构，下图所示：

[![img](https://camo.githubusercontent.com/07f0f549d4b7c6d95c774db16588b5cb023df624/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f362f31322f313633663335663730646330366663643f773d37373026683d32383026663d706e6726733d313939323731)](https://camo.githubusercontent.com/07f0f549d4b7c6d95c774db16588b5cb023df624/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f362f31322f313633663335663730646330366663643f773d37373026683d32383026663d706e6726733d313939323731)
如上图所示，nodejs 自上而下分为

- **用户代码 ( js 代码 )**

> 用户代码即我们编写的应用程序代码、npm 包、nodejs 内置的 js 模块等，我们日常工作中的大部分时间都是编写这个层面的代码。

- **binding 代码**或者**三方插件（js 或 C/C++ 代码）**

> **胶水代码**，能够让 js 调用 C/C++的代码。可以将其理解为一个桥，桥这头是 js，桥那头是 C/C++，通过这个桥可以让 js 调用 C/C++。
> 在 nodejs 里，胶水代码的主要作用是把 nodejs 底层实现的 C/C++库暴露给 js 环境。
> **三方插件**是我们自己实现的 C/C++库，同时需要我们自己实现胶水代码，将 js 和 C/C++进行桥接。

- **底层库**

> nodejs 的依赖库，包括大名鼎鼎的 V8、libuv。
> **V8**： 我们都知道，是 google 开发的一套高效 javascript 运行时，nodejs 能够高效执行 js 代码的很大原因主要在它。
> **libuv**：是用 C 语言实现的一套异步功能库，nodejs 高效的异步编程模型很大程度上归功于 libuv 的实现，而 libuv 则是我们今天重点要分析的。
> 还有一些其他的依赖库
> **http-parser**：负责解析 http 响应
> **openssl**：加解密
> **c-ares**：dns 解析
> **npm**：nodejs 包管理器
> ...

关于 nodejs 不再过多介绍，大家可以自行查阅学习，接下来我们重点要分析的就是 libuv。

## libuv 架构

我们知道，nodejs 实现异步机制的核心便是 libuv，libuv 承担着 nodejs 与文件、网络等异步任务的沟通桥梁，下面这张图让我们对 libuv 有个大概的印象：
[![img](https://camo.githubusercontent.com/4d6998578cfeee7840133d6c72c58736884866c2/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f362f31322f313633663431306239353163653430393f773d3130323026683d34393326663d706e6726733d323036373637)](https://camo.githubusercontent.com/4d6998578cfeee7840133d6c72c58736884866c2/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f362f31322f313633663431306239353163653430393f773d3130323026683d34393326663d706e6726733d323036373637)

> 这是 libuv 官网的一张图，很明显，nodejs 的网络 I/O、文件 I/O、DNS 操作、还有一些用户代码都是在 libuv 工作的。
> 既然谈到了异步，那么我们首先归纳下 nodejs 里的异步事件：

- 非 I/O：
  - 定时器（setTimeout，setInterval）
  - microtask（promise）
  - process.nextTick
  - setImmediate
  - DNS.lookup
- I/O：
  - 网络 I/O
  - 文件 I/O
  - DNS 操作
- ...

### 网络 I/O

对于网络 I/O，各个平台的实现机制不一样，linux 是 epoll 模型，类 unix 是 kquene 、windows 下是高效的 IOCP 完成端口、SunOs 是 event ports，libuv 对这几种网络 I/O 模型进行了封装。

### 文件 I/O、异步 DNS 操作

libuv 内部还维护着一个默认 4 个线程的线程池，这些线程负责执行文件 I/O 操作、DNS 操作、用户异步代码。当 js 层传递给 libuv 一个操作任务时，libuv 会把这个任务加到队列中。之后分两种情况：

- 1、线程池中的线程都被占用的时候，队列中任务就要进行排队等待空闲线程。
- 2、线程池中有可用线程时，从队列中取出这个任务执行，执行完毕后，线程归还到线程池，等待下个任务。同时以事件的方式通知 event-loop，event-loop 接收到事件执行该事件注册的回调函数。

> 当然，如果觉得 4 个线程不够用，可以在 nodejs 启动时，设置环境变量**UV_THREADPOOL_SIZE**来调整，出于系统性能考虑，libuv 规定可设置线程数不能超过**128**个。

## MacroTask VS MicroTask

在[Node.js 官网文档](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)的描述中，提到了`process.nextTick()`, 它不属于`Libuv`的部分，实际上，它是属于 Node.js 的一部分。

实际上，除了 Libuv 里面要处理的回调，在 Node.js 里还有另外两个 queue，分别是`Next Tick Queue`以及`MicroTask Queue`。

- `Next Tick Queue`: 使用`process.nextTick()`添加的回调。
- `MicroTask Queue`: 包含一些 microtasks 比如`resolved promise callbacks`。

那 MacroTask 是什么呢？Macrotask 实际上就是上面我们遇到的那些异步任务，也被称为 Task, 也就是说，有的人会将`MacroTask Queue`称为`Task Queue`。

### 它是如何工作的

我们结合一张图来看看它在 Event Loop 是如何工作的：

![img](http://p1.meituan.net/codeman/441db12a0388ee230bf4d238e19ebe3518591.png)

**在 Event Loop 完成一个阶段，然后到另一个阶段之前，Event Loop 将会执行这 Next Tick Queue 以及 MicroTask Queue 里面的回调, 直到这两个队列为空。一旦它们空了后，Event Loop 会进入到下一个阶段。**

**很多人会将这两个队列都当作是 MicroTask Queue**, 因为它们是处于同一阶段执行的， 实际上，这两个队列执行依然是有一个先后顺序的: `Next Tick Queue`的优先级高于`MicroTask Queue`, **注意：我们这里将两个队列称为 Immediate Queue。**

> E.g, The event loop is currently processing the immediates queue which has 5 handlers to be processed. Meanwhile, two handlers are added to the next tick queue. Once the event loop completes 5 handlers in the immediates queue, event loop will detect that there are two items to be processed in the next tick queue before moving to the close handlers queue. It will then execute all the handlers in the next tick queue and then will move to process the close handlers queue.

上面的那段话引用来自[Event Loop and the Big Picture — NodeJS Event Loop Part 1](https://jsblog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810), 即`Event Loop`在处理拥有 5 个`handlers`的`Next Tick Queue`时，有 2 个`handlers`被添加到`Next Tick Queue`， 一旦 5 个`handlers`被处理完后，Event Loop 会接着处理`Next Tick Queue`里面新增的两个`handlers`, 然后再处理`MicroTask Queue`里的回调，当`Immediate Queue`里面的回调都处理完成后，Event Loop 将会进入到下一个阶段。举个例子：

```js
Promise.resolve().then(() => {
  console.log("resolve1");
});

process.nextTick(function () {
  console.log("tick1");
  process.nextTick(function () {
    console.log("tick2");
  });
  process.nextTick(function () {
    console.log("tick3");
  });
});

Promise.resolve().then(() => {
  console.log("resolve2");
});

process.nextTick(function () {
  console.log("tick4");
});

Promise.resolve().then(() => {
  console.log("resolve3");
});

process.nextTick(function () {
  console.log("tick5");
});
```

那么上面的执行顺序是：`tick1, tick4, tick5, tick2, tick3, resolve1, resolve2, resolve3`。不要递归调用`process.nextTick`, 因为这会导致`I/O starvation`。

## Node.js 源码

> 先简要介绍下 nodejs 的启动过程：

- 1、调用**platformInit**方法 ，初始化 **nodejs** 的运行环境。
- 2、调用 **performance_node_start** 方法，对 **nodejs** 进行性能统计。
- 3、**openssl**设置的判断。
- 4、调用**v8_platform.Initialize**，初始化 **libuv** 线程池。
- 5、调用 **V8::Initialize**，初始化 **V8** 环境。
- 6、创建一个**nodejs**运行实例。
- 7、启动上一步创建好的实例。
- 8、开始执行 js 文件，同步代码执行完毕后，进入事件循环。
- 9、在没有任何可监听的事件时，销毁 **nodejs** 实例，程序执行完毕。

以上就是 nodejs 执行一个 js 文件的全过程。接下来着重介绍第八个步骤，事件循环。

我们看几处关键源码：

- 1、_core.c_，事件循环运行的核心文件。

```c++
int uv_run(uv_loop_t* loop, uv_run_mode mode) {
  int timeout;
  int r;
  int ran_pending;
//判断事件循环是否存活。
  r = uv__loop_alive(loop);
  //如果没有存活，更新时间戳
  if (!r)
    uv__update_time(loop);
//如果事件循环存活，并且事件循环没有停止。
  while (r != 0 && loop->stop_flag == 0) {
    //更新当前时间戳
    uv__update_time(loop);
    //执行 timers 队列
    uv__run_timers(loop);
    //执行由于上个循环未执行完，并被延迟到这个循环的I/O 回调。
    ran_pending = uv__run_pending(loop);
    //内部调用，用户不care，忽略
    uv__run_idle(loop);
    //内部调用，用户不care，忽略
    uv__run_prepare(loop);

    timeout = 0;
    if ((mode == UV_RUN_ONCE && !ran_pending) || mode == UV_RUN_DEFAULT)
    //计算距离下一个timer到来的时间差。
      timeout = uv_backend_timeout(loop);
   //进入 轮询 阶段，该阶段轮询I/O事件，有则执行，无则阻塞，直到超出timeout的时间。
    uv__io_poll(loop, timeout);
    //进入check阶段，主要执行 setImmediate 回调。
    uv__run_check(loop);
    //进行close阶段，主要执行 **关闭** 事件
    uv__run_closing_handles(loop);

    if (mode == UV_RUN_ONCE) {

      //更新当前时间戳
      uv__update_time(loop);
      //再次执行timers回调。
      uv__run_timers(loop);
    }
    //判断当前事件循环是否存活。
    r = uv__loop_alive(loop);
    if (mode == UV_RUN_ONCE || mode == UV_RUN_NOWAIT)
      break;
  }

  /* The if statement lets gcc compile it to a conditional store. Avoids
   * dirtying a cache line.
   */
  if (loop->stop_flag != 0)
    loop->stop_flag = 0;

  return r;
}
```

- 2、**timers** 阶段，源码文件：_timers.c_。

```c++
void uv__run_timers(uv_loop_t* loop) {
  struct heap_node* heap_node;
  uv_timer_t* handle;

  for (;;) {
  //取出定时器堆中超时时间最近的定时器句柄
    heap_node = heap_min((struct heap*) &loop->timer_heap);
    if (heap_node == NULL)
      break;

    handle = container_of(heap_node, uv_timer_t, heap_node);
    // 判断最近的一个定时器句柄的超时时间是否大于当前时间，如果大于当前时间，说明还未超时，跳出循环。
    if (handle->timeout > loop->time)
      break;
    // 停止最近的定时器句柄
    uv_timer_stop(handle);
    // 判断定时器句柄类型是否是repeat类型，如果是，重新创建一个定时器句柄。
    uv_timer_again(handle);
    //执行定时器句柄绑定的回调函数
    handle->timer_cb(handle);
  }
}
```

- 3、 **轮询阶段** 源码，源码文件：_kquene.c_

```c++
void uv__io_poll(uv_loop_t* loop, int timeout) {
  /*一连串的变量初始化*/
  //判断是否有事件发生
  if (loop->nfds == 0) {
    //判断观察者队列是否为空，如果为空，则返回
    assert(QUEUE_EMPTY(&loop->watcher_queue));
    return;
  }

  nevents = 0;
  // 观察者队列不为空
  while (!QUEUE_EMPTY(&loop->watcher_queue)) {
    /*
    取出队列头的观察者对象
    取出观察者对象感兴趣的事件并监听。
    */
    ....省略一些代码
    w->events = w->pevents;
  }


  assert(timeout >= -1);
  //如果有超时时间，将当前时间赋给base变量
  base = loop->time;
  // 本轮执行监听事件的最大数量
  count = 48; /* Benchmarks suggest this gives the best throughput. */
  //进入监听循环
  for (;; nevents = 0) {
  // 有超时时间的话，初始化spec
    if (timeout != -1) {
      spec.tv_sec = timeout / 1000;
      spec.tv_nsec = (timeout % 1000) * 1000000;
    }

    if (pset != NULL)
      pthread_sigmask(SIG_BLOCK, pset, NULL);
    // 监听内核事件，当有事件到来时，即返回事件的数量。
    // timeout 为监听的超时时间，超时时间一到即返回。
    // 我们知道，timeout是传进来得下一个timers到来的时间差，所以，在timeout时间内，event-loop会一直阻塞在此处，直到超时时间到来或者有内核事件触发。
    nfds = kevent(loop->backend_fd,
                  events,
                  nevents,
                  events,
                  ARRAY_SIZE(events),
                  timeout == -1 ? NULL : &spec);

    if (pset != NULL)
      pthread_sigmask(SIG_UNBLOCK, pset, NULL);

    /* Update loop->time unconditionally. It's tempting to skip the update when
     * timeout == 0 (i.e. non-blocking poll) but there is no guarantee that the
     * operating system didn't reschedule our process while in the syscall.
     */
    SAVE_ERRNO(uv__update_time(loop));
    //如果内核没有监听到可用事件，且本次监听有超时时间，则返回。
    if (nfds == 0) {
      assert(timeout != -1);
      return;
    }

    if (nfds == -1) {
      if (errno != EINTR)
        abort();

      if (timeout == 0)
        return;

      if (timeout == -1)
        continue;

      /* Interrupted by a signal. Update timeout and poll again. */
      goto update_timeout;
    }

    。。。
    //判断事件循环的观察者队列是否为空
    assert(loop->watchers != NULL);
    loop->watchers[loop->nwatchers] = (void*) events;
    loop->watchers[loop->nwatchers + 1] = (void*) (uintptr_t) nfds;
    // 循环处理内核返回的事件，执行事件绑定的回调函数
    for (i = 0; i < nfds; i++) {
        。。。。
    }

}
```

uv\_\_io_poll 阶段源码最长，逻辑最为复杂，可以做个概括，如下：
当 js 层代码注册的事件回调都没有返回的时候，事件循环会阻塞在 poll 阶段。看到这里，你可能会想了，会永远阻塞在此处吗？

> 1、首先呢，在 poll 阶段执行的时候，会传入一个 timeout 超时时间，该超时时间就是 poll 阶段的最大阻塞时间。
> 2、其次呢，在 poll 阶段，timeout 时间未到的时候，如果有事件返回，就执行该事件注册的回调函数。timeout 超时时间到了，则退出 poll 阶段，执行下一个阶段。

所以，我们不用担心事件循环会永远阻塞在 poll 阶段。

以上就是事件循环的两个核心阶段。限于篇幅，**timers**阶段的其他源码和**setImmediate**、**process.nextTick**的涉及到的源码就不罗列了，感兴趣的童鞋可以看下源码。

最后，总结出事件循环的原理如下，以上你可以不 care，记住下面的总结就好了。

### 事件循环原理

```
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

- node 的初始化

  - 初始化 node 环境。
  - 执行输入代码。
  - 执行 **process.nextTick** 回调。
  - 执行 microtasks。

- 进入 event-loop

  - 进入 timers 阶段

    - 检查 timer 队列是否有到期的 timer 回调，如果有，将到期的 timer 回调按照 timerId 升序执行。
    - 检查是否有 process.nextTick 任务，如果有，全部执行。
    - 检查是否有 microtask，如果有，全部执行。
    - 退出该阶段。

  - 进入 IO callbacks 阶段。

    - 检查是否有 pending 的 I/O 回调。如果有，执行回调。如果没有，退出该阶段。
    - 检查是否有 process.nextTick 任务，如果有，全部执行。
    - 检查是否有 microtask，如果有，全部执行。
    - 退出该阶段。

  - 进入 idle，prepare 阶段：

    - 这两个阶段与我们编程关系不大，暂且按下不表。

  - 进入 poll 阶段

    - 首先检查是否存在尚未完成的回调，如果存在，那么分两种情况。
      - 第一种情况：
        - 如果有可用回调（可用回调包含到期的定时器还有一些 IO 事件等），执行所有可用回调。
        - 检查是否有 process.nextTick 回调，如果有，全部执行。
        - 检查是否有 microtaks，如果有，全部执行。
        - 退出该阶段。
      - 第二种情况：
        - 如果没有可用回调。
        - 检查是否有 immediate 回调，如果有，退出 poll 阶段。如果没有，阻塞在此阶段，等待新的事件通知。
    - 如果不存在尚未完成的回调，退出 poll 阶段。

  - 进入 check 阶段。

    - 如果有 immediate 回调，则执行所有 immediate 回调。
    - 检查是否有 process.nextTick 回调，如果有，全部执行。
    - 检查是否有 microtaks，如果有，全部执行。
    - 退出 **check** 阶段

  - 进入 closing 阶段。

    - 如果有 immediate 回调，则执行所有 immediate 回调。
    - 检查是否有 process.nextTick 回调，如果有，全部执行。
    - 检查是否有 microtaks，如果有，全部执行。
    - 退出 **closing** 阶段

  - 检查是否有活跃的 handles（定时器、IO 等事件句柄）。

    - 如果有，继续下一轮循环。
    - 如果没有，结束事件循环，退出程序。

我们可以发现，在事件循环的每一个子阶段退出之前都会按顺序执行如下过程：

- 检查是否有 process.nextTick 回调，如果有，全部执行。
- 检查是否有 microtaks，如果有，全部执行。
- 退出当前阶段。

# npm scripts

## 一、什么是 npm 脚本

npm 允许在`package.json`文件里面，使用`scripts`字段定义脚本命令。

> ```javascript
> {
>   // ...
>   "scripts": {
>     "build": "node build.js"
>   }
> }
> ```

上面代码是`package.json`文件的一个片段，里面的`scripts`字段是一个对象。它的每一个属性，对应一段脚本。比如，`build`命令对应的脚本是`node build.js`。

命令行下使用`npm run`命令，就可以执行这段脚本。

> ```bash
> $ npm run build
> # 等同于执行
> $ node build.js
> ```

这些定义在`package.json`里面的脚本，就称为 npm 脚本。它的优点很多。

> - 项目的相关脚本，可以集中在一个地方。
> - 不同项目的脚本命令，只要功能相同，就可以有同样的对外接口。用户不需要知道怎么测试你的项目，只要运行`npm run test`即可。
> - 可以利用 npm 提供的很多辅助功能。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的`npm run`命令。

> ```bash
> $ npm run
> ```

## 二、原理

npm 脚本的原理非常简单。每当执行`npm run`，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，`npm run`新建的这个 Shell，会将当前目录的`node_modules/.bin`子目录加入`PATH`变量，执行结束后，再将`PATH`变量恢复原样。

这意味着，当前目录的`node_modules/.bin`子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写`mocha test`就可以了。

> ```javascript
> "test": "mocha test"
> ```

而不用写成下面这样。

> ```javascript
> "test": "./node_modules/.bin/mocha test"
> ```

由于 npm 脚本的唯一要求就是可以在 Shell 执行，因此它不一定是 Node 脚本，任何可执行文件都可以写在里面。

npm 脚本的退出码，也遵守 Shell 脚本规则。如果退出码不是`0`，npm 就认为这个脚本执行失败。

## 三、通配符

由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。

> ```javascript
> "lint": "jshint *.js"
> "lint": "jshint **/*.js"
> ```

上面代码中，`*`表示任意文件名，`**`表示任意一层子目录。

如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。

> ```javascript
> "test": "tap test/\*.js"
> ```

## 四、传参

向 npm 脚本传入参数，要使用`--`标明。

> ```javascript
> "lint": "jshint **.js"
> ```

向上面的`npm run lint`命令传入参数，必须写成下面这样。

> ```bash
> $ npm run lint --  --reporter checkstyle > checkstyle.xml
> ```

也可以在`package.json`里面再封装一个命令。

> ```javascript
> "lint": "jshint **.js",
> "lint:checkstyle": "npm run lint -- --reporter checkstyle > checkstyle.xml"
> ```

## 五、执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是并行执行（即同时的平行执行），可以使用`&`符号。

> ```bash
> $ npm run script1.js & npm run script2.js
> ```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用`&&`符号。

> ```bash
> $ npm run script1.js && npm run script2.js
> ```

这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：[script-runner](https://github.com/paulpflug/script-runner)、[npm-run-all](https://github.com/mysticatea/npm-run-all)、[redrun](https://github.com/coderaiser/redrun)。

## 六、默认值

一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。

> ```javascript
> "start": "node server.js"，
> "install": "node-gyp rebuild"
> ```

上面代码中，`npm run start`的默认值是`node server.js`，前提是项目根目录下有`server.js`这个脚本；`npm run install`的默认值是`node-gyp rebuild`，前提是项目根目录下有`binding.gyp`文件。

## 七、钩子

npm 脚本有`pre`和`post`两个钩子。举例来说，`build`脚本命令的钩子就是`prebuild`和`postbuild`。

> ```javascript
> "prebuild": "echo I run before the build script",
> "build": "cross-env NODE_ENV=production webpack",
> "postbuild": "echo I run after the build script"
> ```

用户执行`npm run build`的时候，会自动按照下面的顺序执行。

> ```bash
> npm run prebuild && npm run build && npm run postbuild
> ```

因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子。

> ```javascript
> "clean": "rimraf ./dist && mkdir dist",
> "prebuild": "npm run clean",
> "build": "cross-env NODE_ENV=production webpack"
> ```

npm 默认提供下面这些钩子。

> - prepublish，postpublish
> - preinstall，postinstall
> - preuninstall，postuninstall
> - preversion，postversion
> - pretest，posttest
> - prestop，poststop
> - prestart，poststart
> - prerestart，postrestart

自定义的脚本命令也可以加上`pre`和`post`钩子。比如，`myscript`这个脚本命令，也有`premyscript`和`postmyscript`钩子。不过，双重的`pre`和`post`无效，比如`prepretest`和`postposttest`是无效的。

npm 提供一个`npm_lifecycle_event`变量，返回当前正在运行的脚本名称，比如`pretest`、`test`、`posttest`等等。所以，可以利用这个变量，在同一个脚本文件里面，为不同的`npm scripts`命令编写代码。请看下面的例子。

> ```javascript
> const TARGET = process.env.npm_lifecycle_event;
>
> if (TARGET === "test") {
>   console.log(`Running the test task!`);
> }
>
> if (TARGET === "pretest") {
>   console.log(`Running the pretest task!`);
> }
>
> if (TARGET === "posttest") {
>   console.log(`Running the posttest task!`);
> }
> ```

注意，`prepublish`这个钩子不仅会在`npm publish`命令之前运行，还会在`npm install`（不带任何参数）命令之前运行。这种行为很容易让用户感到困惑，所以 npm 4 引入了一个新的钩子`prepare`，行为等同于`prepublish`，而从 npm 5 开始，`prepublish`将只在`npm publish`命令之前运行。

## 八、简写形式

四个常用的 npm 脚本有简写形式。

> - `npm start`是`npm run start`
> - `npm stop`是`npm run stop`的简写
> - `npm test`是`npm run test`的简写
> - `npm restart`是`npm run stop && npm run restart && npm run start`的简写

`npm start`、`npm stop`和`npm restart`都比较好理解，而`npm restart`是一个复合命令，实际上会执行三个脚本命令：`stop`、`restart`、`start`。具体的执行顺序如下。

> 1. prerestart
> 2. prestop
> 3. stop
> 4. poststop
> 5. restart
> 6. prestart
> 7. start
> 8. poststart
> 9. postrestart

## 九、变量

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。

首先，通过`npm_package_`前缀，npm 脚本可以拿到`package.json`里面的字段。比如，下面是一个`package.json`。

> ```javascript
> {
>   "name": "foo",
>   "version": "1.2.5",
>   "scripts": {
>     "view": "node view.js"
>   }
> }
> ```

那么，变量`npm_package_name`返回`foo`，变量`npm_package_version`返回`1.2.5`。

> ```javascript
> // view.js
> console.log(process.env.npm_package_name); // foo
> console.log(process.env.npm_package_version); // 1.2.5
> ```

上面代码中，我们通过环境变量`process.env`对象，拿到`package.json`的字段值。如果是 Bash 脚本，可以用`$npm_package_name`和`$npm_package_version`取到这两个值。

`npm_package_`前缀也支持嵌套的`package.json`字段。

> ```javascript
>   "repository": {
>     "type": "git",
>     "url": "xxx"
>   },
>   scripts: {
>     "view": "echo $npm_package_repository_type"
>   }
> ```

上面代码中，`repository`字段的`type`属性，可以通过`npm_package_repository_type`取到。

下面是另外一个例子。

> ```javascript
> "scripts": {
>   "install": "foo.js"
> }
> ```

上面代码中，`npm_package_scripts_install`变量的值等于`foo.js`。

然后，npm 脚本还可以通过`npm_config_`前缀，拿到 npm 的配置变量，即`npm config get xxx`命令返回的值。比如，当前模块的发行标签，可以通过`npm_config_tag`取到。

> ```javascript
> "view": "echo $npm_config_tag",
> ```

注意，`package.json`里面的`config`对象，可以被环境变量覆盖。

> ```javascript
> {
>   "name" : "foo",
>   "config" : { "port" : "8080" },
>   "scripts" : { "start" : "node server.js" }
> }
> ```

上面代码中，`npm_package_config_port`变量返回的是`8080`。这个值可以用下面的方法覆盖。

> ```bash
> $ npm config set foo:port 80
> ```

最后，`env`命令可以列出所有环境变量。

> ```javascript
> "env": "env"
> ```

## 十、常用脚本示例

> ```javascript
> // 删除目录
> "clean": "rimraf dist/*",
>
> // 本地搭建一个 HTTP 服务
> "serve": "http-server -p 9090 dist/",
>
> // 打开浏览器
> "open:dev": "opener http://localhost:9090",
>
> // 实时刷新
>  "livereload": "live-reload --port 9091 dist/",
>
> // 构建 HTML 文件
> "build:html": "jade index.jade > dist/index.html",
>
> // 只要 CSS 文件有变动，就重新执行构建
> "watch:css": "watch 'npm run build:css' assets/styles/",
>
> // 只要 HTML 文件有变动，就重新执行构建
> "watch:html": "watch 'npm run build:html' assets/html",
>
> // 部署到 Amazon S3
> "deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",
>
> // 构建 favicon
> "build:favicon": "node scripts/favicon.js",
> ```

# MongoDB

## 数据库操作

`查看数据库`

- show dbs

`查看当前数据库`

- db

`创建数据库`

- use movies

`切换数据库`

- use gp6

`删除数据库`

- db.dropDatabase()

## 集合操作

`创建集合`

- db.createCollection('beyond')

`查看某个数据库里的集合`

- db.getCollectionNames()

## 文档操作（CRUD）

`插入文档`

- db.beyond.insertOne({name: '光辉岁月', pubdate: '1997'})
- db.beyond.insertMany([{name: '不在犹豫', pubdate: '1997'},{name: '海阔天空', pubdate: '1997'}])
- db.beyond.insert() // insert 里可以创建一个或多个，语法同上
  insert 别名(save):
- db.beyond.save({name: '喜欢你', pubdate: '1999'})

`修改文档`

- db.beyond.update({name:'光辉岁月'}, {\$set: {pubdate: '1998'}})
- db.beyond.update({}, {\$set: {pubdate: '2000'}}, true, true) // 第一个 true 表示当文档不存在，就创建；第二个 true 表示符合条件的文档全改

`删除文档`

- db.beyond.remove({name: '光辉岁月'})
- db.beyond.remove({})

```js
[
  {
    rating: {
      max: 10,
      average: 9.6,
      stars: "50",
      min: 0,
    },
    genres: ["犯罪", "剧情"],
    title: "肖申克的救赎",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1054521/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17525.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17525.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17525.jpg",
        },
        name: "蒂姆·罗宾斯",
        id: "1054521",
      },
      {
        alt: "https://movie.douban.com/celebrity/1054534/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34642.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34642.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34642.jpg",
        },
        name: "摩根·弗里曼",
        id: "1054534",
      },
      {
        alt: "https://movie.douban.com/celebrity/1041179/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5837.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5837.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5837.jpg",
        },
        name: "鲍勃·冈顿",
        id: "1041179",
      },
    ],
    collect_count: 1452533,
    original_title: "The Shawshank Redemption",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1047973/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p230.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p230.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p230.jpg",
        },
        name: "弗兰克·德拉邦特",
        id: "1047973",
      },
    ],
    year: "1994",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg",
    },
    alt: "https://movie.douban.com/subject/1292052/",
    id: "1292052",
  },
  {
    rating: {
      max: 10,
      average: 9.6,
      stars: "50",
      min: 0,
    },
    genres: ["剧情", "爱情", "同性"],
    title: "霸王别姬",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1003494/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p67.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p67.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p67.jpg",
        },
        name: "张国荣",
        id: "1003494",
      },
      {
        alt: "https://movie.douban.com/celebrity/1050265/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1391771959.66.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1391771959.66.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1391771959.66.jpg",
        },
        name: "张丰毅",
        id: "1050265",
      },
      {
        alt: "https://movie.douban.com/celebrity/1035641/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399268395.47.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399268395.47.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399268395.47.jpg",
        },
        name: "巩俐",
        id: "1035641",
      },
    ],
    collect_count: 1108300,
    original_title: "霸王别姬",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1023040/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1451727734.81.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1451727734.81.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1451727734.81.jpg",
        },
        name: "陈凯歌",
        id: "1023040",
      },
    ],
    year: "1993",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg",
    },
    alt: "https://movie.douban.com/subject/1291546/",
    id: "1291546",
  },
  {
    rating: {
      max: 10,
      average: 9.4,
      stars: "50",
      min: 0,
    },
    genres: ["剧情", "动作", "犯罪"],
    title: "这个杀手不太冷",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1025182/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8833.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8833.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8833.jpg",
        },
        name: "让·雷诺",
        id: "1025182",
      },
      {
        alt: "https://movie.douban.com/celebrity/1054454/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2274.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2274.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2274.jpg",
        },
        name: "娜塔莉·波特曼",
        id: "1054454",
      },
      {
        alt: "https://movie.douban.com/celebrity/1010507/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33896.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33896.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33896.jpg",
        },
        name: "加里·奥德曼",
        id: "1010507",
      },
    ],
    collect_count: 1460639,
    original_title: "Léon",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1031876/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33301.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33301.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33301.jpg",
        },
        name: "吕克·贝松",
        id: "1031876",
      },
    ],
    year: "1994",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg",
    },
    alt: "https://movie.douban.com/subject/1295644/",
    id: "1295644",
  },
  {
    rating: {
      max: 10,
      average: 9.4,
      stars: "50",
      min: 0,
    },
    genres: ["剧情", "爱情"],
    title: "阿甘正传",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1054450/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p551.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p551.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p551.jpg",
        },
        name: "汤姆·汉克斯",
        id: "1054450",
      },
      {
        alt: "https://movie.douban.com/celebrity/1002676/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1537890386.77.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1537890386.77.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1537890386.77.jpg",
        },
        name: "罗宾·怀特",
        id: "1002676",
      },
      {
        alt: "https://movie.douban.com/celebrity/1031848/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1345.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1345.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1345.jpg",
        },
        name: "加里·西尼斯",
        id: "1031848",
      },
    ],
    collect_count: 1224207,
    original_title: "Forrest Gump",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1053564/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p505.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p505.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p505.jpg",
        },
        name: "罗伯特·泽米吉斯",
        id: "1053564",
      },
    ],
    year: "1994",
    images: {
      small:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p510876377.jpg",
      large:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p510876377.jpg",
      medium:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p510876377.jpg",
    },
    alt: "https://movie.douban.com/subject/1292720/",
    id: "1292720",
  },
  {
    rating: {
      max: 10,
      average: 9.5,
      stars: "50",
      min: 0,
    },
    genres: ["剧情", "喜剧", "爱情"],
    title: "美丽人生",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1041004/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg",
        },
        name: "罗伯托·贝尼尼",
        id: "1041004",
      },
      {
        alt: "https://movie.douban.com/celebrity/1000375/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9548.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9548.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9548.jpg",
        },
        name: "尼可莱塔·布拉斯基",
        id: "1000375",
      },
      {
        alt: "https://movie.douban.com/celebrity/1000368/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45590.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45590.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45590.jpg",
        },
        name: "乔治·坎塔里尼",
        id: "1000368",
      },
    ],
    collect_count: 664748,
    original_title: "La vita è bella",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1041004/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg",
        },
        name: "罗伯托·贝尼尼",
        id: "1041004",
      },
    ],
    year: "1997",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p510861873.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p510861873.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p510861873.jpg",
    },
    alt: "https://movie.douban.com/subject/1292063/",
    id: "1292063",
  },
  {
    rating: {
      max: 10,
      average: 9.3,
      stars: "50",
      min: 0,
    },
    genres: ["剧情", "爱情", "灾难"],
    title: "泰坦尼克号",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1041029/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p470.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p470.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p470.jpg",
        },
        name: "莱昂纳多·迪卡普里奥",
        id: "1041029",
      },
      {
        alt: "https://movie.douban.com/celebrity/1054446/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53358.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53358.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53358.jpg",
        },
        name: "凯特·温丝莱特",
        id: "1054446",
      },
      {
        alt: "https://movie.douban.com/celebrity/1031864/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45186.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45186.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45186.jpg",
        },
        name: "比利·赞恩",
        id: "1031864",
      },
    ],
    collect_count: 1144872,
    original_title: "Titanic",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1022571/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33715.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33715.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33715.jpg",
        },
        name: "詹姆斯·卡梅隆",
        id: "1022571",
      },
    ],
    year: "1997",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p457760035.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p457760035.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p457760035.jpg",
    },
    alt: "https://movie.douban.com/subject/1292722/",
    id: "1292722",
  },
  {
    rating: {
      max: 10,
      average: 9.3,
      stars: "50",
      min: 0,
    },
    genres: ["剧情", "动画", "奇幻"],
    title: "千与千寻",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1023337/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1463193210.13.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1463193210.13.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1463193210.13.jpg",
        },
        name: "柊瑠美",
        id: "1023337",
      },
      {
        alt: "https://movie.douban.com/celebrity/1005438/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44986.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44986.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44986.jpg",
        },
        name: "入野自由",
        id: "1005438",
      },
      {
        alt: "https://movie.douban.com/celebrity/1045797/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376151005.51.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376151005.51.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376151005.51.jpg",
        },
        name: "夏木真理",
        id: "1045797",
      },
    ],
    collect_count: 1064494,
    original_title: "千と千尋の神隠し",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1054439/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg",
        },
        name: "宫崎骏",
        id: "1054439",
      },
    ],
    year: "2001",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1606727862.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1606727862.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1606727862.jpg",
    },
    alt: "https://movie.douban.com/subject/1291561/",
    id: "1291561",
  },
  {
    rating: {
      max: 10,
      average: 9.5,
      stars: "50",
      min: 0,
    },
    genres: ["剧情", "历史", "战争"],
    title: "辛德勒的名单",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1031220/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44906.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44906.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44906.jpg",
        },
        name: "连姆·尼森",
        id: "1031220",
      },
      {
        alt: "https://movie.douban.com/celebrity/1054393/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1374649659.58.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1374649659.58.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1374649659.58.jpg",
        },
        name: "本·金斯利",
        id: "1054393",
      },
      {
        alt: "https://movie.douban.com/celebrity/1006956/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28941.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28941.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28941.jpg",
        },
        name: "拉尔夫·费因斯",
        id: "1006956",
      },
    ],
    collect_count: 623451,
    original_title: "Schindler's List",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1054440/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34602.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34602.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34602.jpg",
        },
        name: "史蒂文·斯皮尔伯格",
        id: "1054440",
      },
    ],
    year: "1993",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p492406163.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p492406163.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p492406163.jpg",
    },
    alt: "https://movie.douban.com/subject/1295124/",
    id: "1295124",
  },
  {
    rating: {
      max: 10,
      average: 9.3,
      stars: "50",
      min: 0,
    },
    genres: ["剧情", "科幻", "悬疑"],
    title: "盗梦空间",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1041029/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p470.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p470.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p470.jpg",
        },
        name: "莱昂纳多·迪卡普里奥",
        id: "1041029",
      },
      {
        alt: "https://movie.douban.com/celebrity/1101703/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3517.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3517.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3517.jpg",
        },
        name: "约瑟夫·高登-莱维特",
        id: "1101703",
      },
      {
        alt: "https://movie.douban.com/celebrity/1012520/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p118.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p118.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p118.jpg",
        },
        name: "艾伦·佩吉",
        id: "1012520",
      },
    ],
    collect_count: 1269773,
    original_title: "Inception",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1054524/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg",
        },
        name: "克里斯托弗·诺兰",
        id: "1054524",
      },
    ],
    year: "2010",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p513344864.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p513344864.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p513344864.jpg",
    },
    alt: "https://movie.douban.com/subject/3541415/",
    id: "3541415",
  },
  {
    rating: {
      max: 10,
      average: 9.3,
      stars: "50",
      min: 0,
    },
    genres: ["爱情", "科幻", "动画"],
    title: "机器人总动员",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1009535/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13028.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13028.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13028.jpg",
        },
        name: "本·贝尔特",
        id: "1009535",
      },
      {
        alt: "https://movie.douban.com/celebrity/1000389/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1519794715.93.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1519794715.93.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1519794715.93.jpg",
        },
        name: "艾丽莎·奈特",
        id: "1000389",
      },
      {
        alt: "https://movie.douban.com/celebrity/1018022/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p31068.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p31068.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p31068.jpg",
        },
        name: "杰夫·格尔林",
        id: "1018022",
      },
    ],
    collect_count: 787709,
    original_title: "WALL·E",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1036450/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467359656.96.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467359656.96.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467359656.96.jpg",
        },
        name: "安德鲁·斯坦顿",
        id: "1036450",
      },
    ],
    year: "2008",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1461851991.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1461851991.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1461851991.jpg",
    },
    alt: "https://movie.douban.com/subject/2131459/",
    id: "2131459",
  },
  {
    rating: {
      max: 10,
      average: 9.3,
      stars: "50",
      min: 0,
    },
    genres: ["剧情"],
    title: "忠犬八公的故事",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1040997/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33013.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33013.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33013.jpg",
        },
        name: "理查·基尔",
        id: "1040997",
      },
      {
        alt: "https://movie.douban.com/celebrity/1049499/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5502.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5502.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5502.jpg",
        },
        name: "萨拉·罗默尔",
        id: "1049499",
      },
      {
        alt: "https://movie.douban.com/celebrity/1025215/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17520.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17520.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17520.jpg",
        },
        name: "琼·艾伦",
        id: "1025215",
      },
    ],
    collect_count: 849338,
    original_title: "Hachi: A Dog's Tale",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1018014/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4333.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4333.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4333.jpg",
        },
        name: "拉斯·霍尔斯道姆",
        id: "1018014",
      },
    ],
    year: "2009",
    images: {
      small:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p524964016.jpg",
      large:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p524964016.jpg",
      medium:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p524964016.jpg",
    },
    alt: "https://movie.douban.com/subject/3011091/",
    id: "3011091",
  },
  {
    rating: {
      max: 10,
      average: 9.2,
      stars: "45",
      min: 0,
    },
    genres: ["剧情", "喜剧", "爱情"],
    title: "三傻大闹宝莱坞",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1031931/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13628.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13628.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13628.jpg",
        },
        name: "阿米尔·汗",
        id: "1031931",
      },
      {
        alt: "https://movie.douban.com/celebrity/1049635/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5568.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5568.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5568.jpg",
        },
        name: "卡琳娜·卡普尔",
        id: "1049635",
      },
      {
        alt: "https://movie.douban.com/celebrity/1018290/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5651.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5651.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5651.jpg",
        },
        name: "马达范",
        id: "1018290",
      },
    ],
    collect_count: 1070049,
    original_title: "3 Idiots",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1286677/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16549.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16549.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16549.jpg",
        },
        name: "拉吉库马尔·希拉尼",
        id: "1286677",
      },
    ],
    year: "2009",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p579729551.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p579729551.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p579729551.jpg",
    },
    alt: "https://movie.douban.com/subject/3793023/",
    id: "3793023",
  },
  {
    rating: {
      max: 10,
      average: 9.2,
      stars: "45",
      min: 0,
    },
    genres: ["剧情", "音乐"],
    title: "海上钢琴师",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1025176/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6281.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6281.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6281.jpg",
        },
        name: "蒂姆·罗斯",
        id: "1025176",
      },
      {
        alt: "https://movie.douban.com/celebrity/1010659/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1355152571.6.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1355152571.6.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1355152571.6.jpg",
        },
        name: "普路特·泰勒·文斯",
        id: "1010659",
      },
      {
        alt: "https://movie.douban.com/celebrity/1027407/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12333.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12333.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12333.jpg",
        },
        name: "比尔·努恩",
        id: "1027407",
      },
    ],
    collect_count: 928132,
    original_title: "La leggenda del pianista sull'oceano",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1018983/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p195.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p195.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p195.jpg",
        },
        name: "朱塞佩·托纳多雷",
        id: "1018983",
      },
    ],
    year: "1998",
    images: {
      small:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p511146807.jpg",
      large:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p511146807.jpg",
      medium:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p511146807.jpg",
    },
    alt: "https://movie.douban.com/subject/1292001/",
    id: "1292001",
  },
  {
    rating: {
      max: 10,
      average: 9.2,
      stars: "50",
      min: 0,
    },
    genres: ["剧情", "音乐"],
    title: "放牛班的春天",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1048281/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3363.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3363.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3363.jpg",
        },
        name: "热拉尔·朱尼奥",
        id: "1048281",
      },
      {
        alt: "https://movie.douban.com/celebrity/1036712/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1414312828.15.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1414312828.15.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1414312828.15.jpg",
        },
        name: "让-巴蒂斯特·莫尼耶",
        id: "1036712",
      },
      {
        alt: "https://movie.douban.com/celebrity/1054351/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9329.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9329.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9329.jpg",
        },
        name: "弗朗索瓦·贝莱昂",
        id: "1054351",
      },
    ],
    collect_count: 784510,
    original_title: "Les choristes",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1277959/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p24744.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p24744.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p24744.jpg",
        },
        name: "克里斯托夫·巴拉蒂",
        id: "1277959",
      },
    ],
    year: "2004",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1910824951.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1910824951.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1910824951.jpg",
    },
    alt: "https://movie.douban.com/subject/1291549/",
    id: "1291549",
  },
  {
    rating: {
      max: 10,
      average: 9.2,
      stars: "45",
      min: 0,
    },
    genres: ["喜剧", "爱情", "奇幻"],
    title: "大话西游之大圣娶亲",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1048026/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47421.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47421.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47421.jpg",
        },
        name: "周星驰",
        id: "1048026",
      },
      {
        alt: "https://movie.douban.com/celebrity/1016771/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45482.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45482.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45482.jpg",
        },
        name: "吴孟达",
        id: "1016771",
      },
      {
        alt: "https://movie.douban.com/celebrity/1041734/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p49237.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p49237.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p49237.jpg",
        },
        name: "朱茵",
        id: "1041734",
      },
    ],
    collect_count: 821929,
    original_title: "西遊記大結局之仙履奇緣",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1274431/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45374.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45374.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45374.jpg",
        },
        name: "刘镇伟",
        id: "1274431",
      },
    ],
    year: "1995",
    images: {
      small:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2455050536.jpg",
      large:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2455050536.jpg",
      medium:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2455050536.jpg",
    },
    alt: "https://movie.douban.com/subject/1292213/",
    id: "1292213",
  },
  {
    rating: {
      max: 10,
      average: 9.2,
      stars: "45",
      min: 0,
    },
    genres: ["剧情", "科幻"],
    title: "楚门的世界",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1054438/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p615.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p615.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p615.jpg",
        },
        name: "金·凯瑞",
        id: "1054438",
      },
      {
        alt: "https://movie.douban.com/celebrity/1053572/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p516.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p516.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p516.jpg",
        },
        name: "劳拉·琳妮",
        id: "1053572",
      },
      {
        alt: "https://movie.douban.com/celebrity/1048024/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485163747.76.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485163747.76.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485163747.76.jpg",
        },
        name: "艾德·哈里斯",
        id: "1048024",
      },
    ],
    collect_count: 784754,
    original_title: "The Truman Show",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1022721/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4360.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4360.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4360.jpg",
        },
        name: "彼得·威尔",
        id: "1022721",
      },
    ],
    year: "1998",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p479682972.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p479682972.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p479682972.jpg",
    },
    alt: "https://movie.douban.com/subject/1292064/",
    id: "1292064",
  },
  {
    rating: {
      max: 10,
      average: 9.2,
      stars: "50",
      min: 0,
    },
    genres: ["剧情", "犯罪"],
    title: "教父",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1041025/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45035.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45035.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45035.jpg",
        },
        name: "马龙·白兰度",
        id: "1041025",
      },
      {
        alt: "https://movie.douban.com/celebrity/1054451/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p645.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p645.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p645.jpg",
        },
        name: "阿尔·帕西诺",
        id: "1054451",
      },
      {
        alt: "https://movie.douban.com/celebrity/1000050/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53524.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53524.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53524.jpg",
        },
        name: "詹姆斯·肯恩",
        id: "1000050",
      },
    ],
    collect_count: 551532,
    original_title: "The Godfather",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1054419/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p592.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p592.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p592.jpg",
        },
        name: "弗朗西斯·福特·科波拉",
        id: "1054419",
      },
    ],
    year: "1972",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p2190556185.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p2190556185.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p2190556185.jpg",
    },
    alt: "https://movie.douban.com/subject/1291841/",
    id: "1291841",
  },
  {
    rating: {
      max: 10,
      average: 9.1,
      stars: "45",
      min: 0,
    },
    genres: ["动画", "奇幻", "冒险"],
    title: "龙猫",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1019382/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1455201170.02.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1455201170.02.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1455201170.02.jpg",
        },
        name: "日高法子",
        id: "1019382",
      },
      {
        alt: "https://movie.douban.com/celebrity/1025582/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29537.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29537.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29537.jpg",
        },
        name: "坂本千夏",
        id: "1025582",
      },
      {
        alt: "https://movie.douban.com/celebrity/1379738/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1503457262.72.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1503457262.72.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1503457262.72.jpg",
        },
        name: "糸井重里",
        id: "1379738",
      },
    ],
    collect_count: 668392,
    original_title: "となりのトトロ",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1054439/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg",
        },
        name: "宫崎骏",
        id: "1054439",
      },
    ],
    year: "1988",
    images: {
      small:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p537668599.jpg",
      large:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p537668599.jpg",
      medium:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p537668599.jpg",
    },
    alt: "https://movie.douban.com/subject/1291560/",
    id: "1291560",
  },
  {
    rating: {
      max: 10,
      average: 9.2,
      stars: "45",
      min: 0,
    },
    genres: ["剧情", "科幻", "冒险"],
    title: "星际穿越",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1040511/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1392653727.04.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1392653727.04.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1392653727.04.jpg",
        },
        name: "马修·麦康纳",
        id: "1040511",
      },
      {
        alt: "https://movie.douban.com/celebrity/1048027/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10467.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10467.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10467.jpg",
        },
        name: "安妮·海瑟薇",
        id: "1048027",
      },
      {
        alt: "https://movie.douban.com/celebrity/1000225/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p54076.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p54076.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p54076.jpg",
        },
        name: "杰西卡·查斯坦",
        id: "1000225",
      },
    ],
    collect_count: 789910,
    original_title: "Interstellar",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1054524/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg",
        },
        name: "克里斯托弗·诺兰",
        id: "1054524",
      },
    ],
    year: "2014",
    images: {
      small:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p2206088801.jpg",
      large:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p2206088801.jpg",
      medium:
        "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p2206088801.jpg",
    },
    alt: "https://movie.douban.com/subject/1889243/",
    id: "1889243",
  },
  {
    rating: {
      max: 10,
      average: 9.2,
      stars: "50",
      min: 0,
    },
    genres: ["剧情"],
    title: "熔炉",
    casts: [
      {
        alt: "https://movie.douban.com/celebrity/1011009/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p55195.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p55195.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p55195.jpg",
        },
        name: "孔侑",
        id: "1011009",
      },
      {
        alt: "https://movie.douban.com/celebrity/1276062/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1352773255.21.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1352773255.21.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1352773255.21.jpg",
        },
        name: "郑有美",
        id: "1276062",
      },
      {
        alt: "https://movie.douban.com/celebrity/1331104/",
        avatars: {
          small:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1393488191.45.jpg",
          large:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1393488191.45.jpg",
          medium:
            "http://img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1393488191.45.jpg",
        },
        name: "金志映",
        id: "1331104",
      },
    ],
    collect_count: 409953,
    original_title: "도가니",
    subtype: "movie",
    directors: [
      {
        alt: "https://movie.douban.com/celebrity/1317274/",
        avatars: {
          small:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p52558.jpg",
          large:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p52558.jpg",
          medium:
            "http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p52558.jpg",
        },
        name: "黄东赫",
        id: "1317274",
      },
    ],
    year: "2011",
    images: {
      small:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p1363250216.jpg",
      large:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p1363250216.jpg",
      medium:
        "http://img3.doubanio.com/view/photo/s_ratio_poster/public/p1363250216.jpg",
    },
    alt: "https://movie.douban.com/subject/5912992/",
    id: "5912992",
  },
];
```

`查询文档`

- db.douban.insert([])
- db.douban.find({}, {title: 1, year: 1, \_id: 0})
- db.douban.find({}, {title: 1, year: 1, 'rating.average': 1, \_id: 0})
- db.douban.find({}, {title: 1, year: 1, \_id: 0}).sort({year: 1})
- db.douban.find({}, {title: 1, year: 1, 'rating.average': 1, \_id: 0}).sort({'rating.average': -1})
- db.douban.find({}, {title: 1, year: 1, \_id: 0}).sort({year: 1}).limit(3)
- db.douban.find({}, {title: 1, year: 1, \_id: 0}).sort({year: 1}).skip(3).limit(3)
