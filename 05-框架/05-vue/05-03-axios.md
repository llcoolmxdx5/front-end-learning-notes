# axios

> `https://www.kancloud.cn/yunye/axios/234845`

## 安装

```sh
npm install axios  npm安装
bower install axios  bower安装
```

```html
<!-- 使用cdn -->
<script src="https://cdn.staticfile.org/axios/0.18.0/axios.js"></script>
```

## API

axios(config)

请求方法的别名:

- axios.request(config)

- axios.get(url[, config])

- axios.delete(url[, config])

- axios.head(url[, config])

- axios.post(url[, data[, config]])

- axios.put(url[, data[, config]])

- axios.patch(url[, data[, config]])

处理并发请求的助手函数:

- axios.all(iterable)

- axios.spread(callback)

创建实例

- axios.create([config])

实例方法 指定的配置将与实例的配置合并

- axios#request(config)

- axios#get(url[, config])

- axios#delete(url[, config])

- axios#head(url[, config])

- axios#post(url[, data[, config]])

- axios#put(url[, data[, config]])

- axios#patch(url[, data[, config]])

## 配置

> 创建请求时可以用的配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法。

```js
{
  url: '/user',// url 是用于请求的服务器 URL
  method: 'get', // method 是创建请求时使用的方法 默认是 get
  // baseURL将自动加在url前面，除非url是一个绝对 URL。
  // 它可以通过设置一个 baseURL 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',
  // transformRequest 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
  // transformResponse 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
  headers: {'X-Requested-With': 'XMLHttpRequest'},// headers 是即将被发送的自定义请求头
  params: {// params 是即将与请求一起发送的 URL 参数
    ID: 12345// 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  },
  // paramsSerializer 是一个负责 params 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  // data 是作为请求主体被发送的数据 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 transformRequest 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },
  // timeout 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: 1000,
  withCredentials: false, // 默认的 表示跨域请求时是否需要使用凭证
  adapter: function (config) {// adapter 允许自定义处理请求，以使测试更轻松
    // 返回一个 promise 并应用一个有效的响应.
  },
  auth: {// auth 表示应该使用 HTTP 基础验证，并提供凭据
    username: 'janedoe',// 这将设置一个 Authorization 头，
    password: 's00pers3cret'// 覆写掉现有的任意使用 headers 设置的自定义 Authorization头
  },
  // responseType表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认的
  xsrfCookieName: 'XSRF-TOKEN', // 默认值 用作 xsrf token 的值的cookie的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的 承载 xsrf token 的值的 HTTP 头的名称
  onUploadProgress: function (progressEvent) { // onUploadProgress允许为上传处理进度事件
    // 对原生进度事件的处理
  },
  onDownloadProgress: function (progressEvent) {// 允许为下载处理进度事件
    // 对原生进度事件的处理
  },
  maxContentLength: 2000,// 定义允许的响应内容的最大尺寸
  // validateStatus 定义对于给定的HTTP 响应状态码是 resolve 或 reject promise 。如果 validateStatus 返回 true(或者设置为 null 或 undefined)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认的
  },
  // maxRedirects 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的
  // httpAgent 和 httpsAgent 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // keepAlive 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  proxy: {// proxy 定义代理服务器的主机名称和端口
    host: '127.0.0.1',
    port: 9000,
    auth: : { // auth 表示 HTTP 基础验证应当用于连接代理，并提供凭据
      username: 'mikeymike',
      password: 'rapunz3l'
    }// 这将会设置一个 Proxy-Authorization 头，覆写掉已有的通过使用 header 设置的自定义 Proxy-Authorization 头。
  },
  cancelToken: new CancelToken(function (cancel) {// 指定用于取消请求的 cancel token
  })
}
```

全局的 axios 默认值

```js
axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
```

自定义实例默认值

```js
// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: "https://api.example.com",
});
// 在实例已创建后修改默认值
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
```

配置的优先顺序

在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。后者将优先于前者。

```js
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();
// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;
// 为已知需要花费很长时间的请求覆写超时设置
instance.get("/longRequest", {
  timeout: 5000,
});
```

## 拦截器

在请求或响应被 then 或 catch 处理前拦截它们。

```js
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
```

如果你想在稍后移除拦截器，可以这样：

```js
var myInterceptor = axios.interceptors.request.use(function () {
  /*...*/
});
axios.interceptors.request.eject(myInterceptor);
```

可以为自定义 axios 实例添加拦截器

```js
var instance = axios.create();
instance.interceptors.request.use(function () {
  /*...*/
});
```

## 请求实例

执行 GET 请求

```js
// 为给定 ID 的 user 创建请求
axios
  .get("/user?ID=12345")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 可选地，上面的请求可以这样做
axios
  .get("/user", {
    params: {
      ID: 12345,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

执行 post 请求

```js
axios
  .post("/user", {
    firstName: "Fred",
    lastName: "Flintstone",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

执行多个并发请求

```js
function getUserAccount() {
  return axios.get("/user/12345");
}
function getUserPermissions() {
  return axios.get("/user/12345/permissions");
}
axios.all([getUserAccount(), getUserPermissions()]).then(
  axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  })
);
```

## 响应

响应结构

```js
{
  data: {},// data 由服务器提供的响应
  status: 200,// status 来自服务器响应的 HTTP 状态码
  statusText: 'OK',// statusText 来自服务器响应的 HTTP 状态信息
  headers: {},// headers 服务器响应的头
  config: {}// config 是为请求提供的配置信息
}
```

使用 then 时，你将接收下面这样的响应：

```js
axios.get("/user/12345").then(function (response) {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);
});
```

错误处理

```js
axios.get("/user/12345").catch(function (error) {
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
});
```
