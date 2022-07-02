# webpack 进阶

## Webpack 核心概念

**Entry（入口）**：Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
**Module（模块）**：在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
**Chunk（代码块）**：一个 Chunk 由多个模块组合而成，用于代码合并与分割。
**Loader（模块转换器）**：用于把模块原内容按照需求转换成新内容。
**Plugin（扩展插件）** ：在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件，并改变输出结果

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件。

## Webpack 执行流程

webpack 从启动到结束会依次执行以下流程：
**初始化**：解析 webpack 配置参数，生产 Compiler 实例
**注册插件**：调用插件的 apply 方法，给插件传入 compiler 实例的引用，插件通过 compiler 调用 Webpack 提供的 API，让插件可以监听后续的所有事件节点。
**开始编译**：读取入口文件
**解析文件**：使用 loader 将文件解析成抽象语法树 AST
**生成依赖图谱**：找出每个文件的依赖项（遍历）
**输出**：根据转换好的代码，生成 chunk
生成最后打包的文件
**ps**：由于 webpack 是根据依赖图动态加载所有的依赖项，所以，每个模块都可以明确表述自身的依赖，可以避免打包未使用的模块。

## Babel

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中：
**主要功能**
语法转换

通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
源码转换 (codemods)

**主要模块**

**@babel/parser**：负责将代码解析为抽象语法树
**@babel/traverse**：遍历抽象语法树的工具，我们可以在语法树中解析特定的节点，然后做一些操作
**@babel/core**：代码转换，如 ES6 的代码转为 ES5 的模式

## Webpack 打包结果

在使用 webpack 构建的典型应用程序或站点中，有三种主要的代码类型：
**源码**：你或你的团队编写的源码。
**依赖**：你的源码会依赖的任何第三方的 library 或 "vendor" 代码。
**管理文件**：webpack 的 runtime 使用 manifest 管理所有模块的交互。
**runtime**：在模块交互时，连接模块所需的加载和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。
**manifest**：当编译器(compiler)开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "Manifest"， 当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。无论你选择哪种模块语法，那些 import 或 require 语句现在都已经转换为 webpack_require 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块。
其中：
import 或 require 语句会转换为 **webpack_require**
异步导入会转换为 require.ensure（在 Webpack 4 中会使用 Promise 封装）

## 编写一个 loader

### 同步 loader

```js
module.exports = function (content, map, meta) {
  return someSyncOperation(content);
};
```

this.callback 方法则更灵活，因为它允许传递多个参数，而不仅仅是 content。

```js
module.exports = function (content, map, meta) {
  this.callback(null, someSyncOperation(content), map, meta);
  return; // 当调用 callback() 时总是返回 undefined
};
```

### 异步 loader

```js
module.exports = function (content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function (err, result) {
    if (err) return callback(err);
    callback(null, result, map, meta);
  });
};
```

```js
module.exports = function (content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function (err, result, sourceMaps, meta) {
    if (err) return callback(err);
    callback(null, result, sourceMaps, meta);
  });
};
```

### this.callback

有时候我们不止要 return 一个 resource，还可能要返回多个结果，就需要用到 callback。

### this.async

在 loader 中，如果我们直接调用 setTimeout，就会报错，那么如果我们想进行异步操作要怎么做呢？

当要使用异步的时候，需要先把 callback 变为 this.callback，然后再返回结果（和 this.callback 一样）。
这样再打包就不会有任何问题。
额外知识点：我们现在配置 loader 的时候，需要使用 path.resolve，有没有什么方法可以像其他 loader 一样引用呢？

### Npm link

Npm link 专门用于开发和调试本地 Npm 模块，能做到在不发布模块的情况下，把本地的一个正在开发的模块的源码链接到项目的 node_modules 目录下，让项目可以直接使用本地的 Npm 模块。
由于是通过软链接的方式实现的，编辑了本地的 Npm 模块代码，在项目中也能使用到编辑后的代码。

完成 Npm link 的步骤如下：

确保正在开发的本地 Npm 模块（也就是正在开发的 Loader）的 package.json 已经正确配置好；

1. 在本地 Npm 模块根目录下执行 npm link，把本地模块注册到全局；
1. 在项目根目录下执行 npm link loader-name，把第 2 步注册到全局的本地 Npm 模块链接到项目的 node_modules 下，其中的 loader-name 是指在第 1 步中的 package.json 文件中配置的模块名称。
   链接好 Loader 到项目后你就可以像使用一个真正的 Npm 模块一样使用本地的 Loader 了。

```js
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
```

第一个参数是错误，第二个是结果，第三个是 sourcemap，第四个可以是任何内容（比如元数据）

## Webpack 优化

### 外围扩展 externals

externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖

这玩意不是插件，是 webpack 的配置选项
externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。此功能通常对 library 开发人员来说是最有用的，然而也会有各种各样的应用程序用到它。

```js
 externals: [
    {
      // String
      react: 'react',
      // Object
      lodash: {
        commonjs: 'lodash',
        amd: 'lodash',
        root: '_' // indicates global variable
      },
      // Array
      subtract: ['./math', 'subtract']
    },
    // Function
    function (context, request, callback) {
      if (/^yourregex$/.test(request)) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
    // Regex
    /^(jquery|\$)$/i
  ],
```

### 静态资源发布 CDN 后 webpack 的配置

```js
output: {
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: 'https://cdn.example.com/assets/'
  }
```

### 静态资源上传到 CDN

```js
/**
 * 发布静态文件到CDN上，并且修改HTML引用文件为CDN地址
 */

const fs = require('fs');
const emitter = require('events');
const Client = require('ftp');
const c = new Client();

class MyEmitter extends emitter {}
const EventEmitter = new MyEmitter();

const bucket = 'source';
const project = 'test'; // 项目名称
var projectPath = `${bucket}/${project}/`;
// static 静态资源目录
var staticPath = `${projectPath}static/`;
//css 文件夹目录
var cssPath = `${staticPath}css/`;
//img 文件夹目录
var imgPath = `${staticPath}img/`;
//js 文件夹目录
var jsPath = `${staticPath}js/`;

const FTP_CONFIG = {
  host: '192.168.1.170',
  port: 2121,
  user: 'username',
  password: '1qaz2wsx3edc',
};
const uploadList = [];

function travel(type) {
  const files = fs.readdirSync(`./dist/static/${type}`);
  for (let i = 0; i < files.length; i += 1) {
    uploadList.push({
      name: `./static/${type}/${files[i]}`,
      path: `./dist/static/${type}/${files[i]}`,
    });
  }
}

function mkdir(path, cb) {
  c.mkdir(path, function (err) {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`created path ${path}`);
    }
    cb();
  });
}

travel('css');
travel('js');
travel('img');

c.on('ready', () => {
  //create project path
  mkdir(projectPath, function () {
    EventEmitter.emit('PROJECT_PATH_CREATED');
  });

  // create project static path
  EventEmitter.on('PROJECT_PATH_CREATED', function () {
    mkdir(staticPath, function () {
      EventEmitter.emit('STATIC_PATH_CREATED');
    });
  });

  // create css path
  EventEmitter.on('STATIC_PATH_CREATED', function () {
    mkdir(cssPath, function () {
      EventEmitter.emit('CSS_PATH_CREATED');
    });
  });

  // create image path
  EventEmitter.on('CSS_PATH_CREATED', function () {
    mkdir(imgPath, function () {
      EventEmitter.emit('IMG_PATH_CREATED');
    });
  });

  // create js path
  EventEmitter.on('IMG_PATH_CREATED', function () {
    mkdir(jsPath, function () {
      EventEmitter.emit('JS_PATH_CREATED');
    });
  });

  //update static resource file
  EventEmitter.on('JS_PATH_CREATED', function () {
    var count = 0;
    for (let i = 0; i < uploadList.length; i += 1) {
      c.put(uploadList[i].path, `${bucket}/${project}/${uploadList[i].name}`, (err) => {
        count++;
        if (!err) {
          console.log(`upload success ${uploadList[i].name}`);
        } else if (err.message.indexOf('Overwrite permission denied')) {
          console.log(`文件 ${uploadList[i].name}已存在，不给予上传!`);
        } else if (err) {
          console.log(err.message);
        }
        if (count == uploadList.length) {
          console.log('upload complete!');
        }
      });
    }
  });
});
c.connect(FTP_CONFIG);
```

### webpack-bundle-analyzer

```bash
# NPM
npm install --save-dev webpack-bundle-analyzer
# Yarn
yarn add -D webpack-bundle-analyzer
```

```js
module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};
```

启动方式：

```bash
 webpack --profile --json > build/stats.json
```

其它：
[webpack-chart](https://alexkuz.github.io/webpack-chart/)

### DllPlugin + DllReferencePlugin

为了极大减少构建时间，进行分离打包。
DllReferencePlugin 和 DLL 插件 DllPlugin 都是在*另外*的 webpack 设置中使用的。
DllPlugin 这个插件是在一个额外的独立的 webpack 设置中创建一个只有 dll 的 bundle(dll-only-bundle)。 这个插件会生成一个名为 manifest.json 的文件，这个文件是用来让 DLLReferencePlugin 映射到相关的依赖上去的。

```js
// webpack.vendor.config.js
new webpack.DllPlugin({
  context: __dirname,
  name: '[name]_[hash]',
  path: path.join(__dirname, 'manifest.json'),
});

// webpack.app.config.js
new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./manifest.json'),
  name: './my-dll.js',
  scope: 'xyz',
  sourceType: 'commonjs2',
});
```

### CommonsChunkPlugin (<4.0)

通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用。这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件。
如果把公共文件提取出一个文件，那么当用户访问了一个网页，加载了这个公共文件，再访问其他依赖公共文件的网页时，就直接使用文件在浏览器的缓存，这样公共文件就只用被传输一次。

```js
entry: {
    vendor: ["jquery", "other-lib"], // 明确第三方库
    app: "./entry"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      // filename: "vendor.js"
      // (给 chunk 一个不同的名字)

      minChunks: Infinity,
      // (随着 entry chunk 越来越多，
      // 这个配置保证没其它的模块会打包进 vendor chunk)
    })
  ]

  // 打包后的文件
  <script src="vendor.js" charset="utf-8"></script>
  <script src="app.js" charset="utf-8"></script>
```

### SplitChunkPlugin

起初，chunks(代码块)和导入他们中的模块通过 webpack 内部的父子关系图连接.在 webpack3 中，通过 CommonsChunkPlugin 来避免他们之间的依赖重复。而在 webpack4 中 CommonsChunkPlugin 被移除，取而代之的是 optimization.splitChunks 和 optimization.runtimeChunk 配置项，下面展示它们将如何工作。

在默认情况下，SplitChunksPlugin 仅仅影响按需加载的代码块，因为更改初始块会影响 HTML 文件应包含的脚本标记以运行项目。

webpack 将根据以下条件自动拆分代码块：

1. 会被共享的代码块或者 node_modules 文件夹中的代码块
1. 体积大于 30KB 的代码块（在 gz 压缩前）
1. 按需加载代码块时的并行请求数量不超过 5 个
1. 加载初始页面时的并行请求数量不超过 3 个

```js
 optimization: {
    splitChunks: {
      chunks: 'all', // 只对异步加载的模块进行拆分，可选值还有all | initial
      minSize: 0, // 模块最少大于30KB才拆分
      maxSize: 0,  // 模块大小无上限，只要大于30KB都拆分
      minChunks: 1, // 模块最少引用一次才会被拆分
      maxAsyncRequests: 5, // 异步加载时同时发送的请求数量最大不能超过5,超过5的部分不拆分
      maxInitialRequests: 3, // 页面初始化时同时发送的请求数量最大不能超过3,超过3的部分不拆分
      automaticNameDelimiter: '-', // 默认的连接符
      name: true, // 拆分的chunk名,设为true表示根据模块名和CacheGroup的key来自动生成,使用上面连接符连接
      cacheGroups: { // 缓存组配置,上面配置读取完成后进行拆分,如果需要把多个模块拆分到一个文件,就需要缓存,所以命名为缓存组
        vendors: { // 自定义缓存组名
          name: 'venders',
          test: /[\\/]node_modules[\\/]/, // 检查node_modules目录,只要模块在该目录下就使用上面配置拆分到这个组
          priority: -10 // 权重-10,决定了哪个组优先匹配,例如node_modules下有个模块要拆分,同时满足vendors和default组,此时就会分到vendors组,因为-10 > -20
        },
        commons: { // 默认缓存组名
          name: 'commons',
          minChunks: 2, // 最少引用两次才会被拆分
          priority: -20, // 权重-5
          reuseExistingChunk: true, // 如果主入口中引入了两个模块,其中一个正好也引用了后一个,就会直接复用,无需引用两次
          test: /[\\/]src[\\/]/,
          minSize: 0,
          chunks: "all"
        }
      }
    }
  }
```

### UglifyJSPlugin

基本上脚手架都包含了该插件,该插件会分析 JS 代码语法树，理解代码的含义，从而做到去掉无效代码、去掉日志输入代码、缩短变量名等优化。

```js
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
//...
plugins: [
  new UglifyJSPlugin({
    compress: {
      warnings: false, //删除无用代码时不输出警告
      drop_console: true, //删除所有console语句，可以兼容IE
      collapse_vars: true, //内嵌已定义但只使用一次的变量
      reduce_vars: true, //提取使用多次但没定义的静态值到变量
    },
    output: {
      beautify: false, //最紧凑的输出，不保留空格和制表符
      comments: false, //删除所有注释
    },
  }),
];
```

### DefinePlugin

DefinePlugin 能够自动检测环境变化，效率高效。
在前端开发中，在不同的应用环境中，需要不同的配置。如：开发环境的 API Mocker、测试流程中的数据伪造、打印调试信息。如果使用人工处理这些配置信息，不仅麻烦，而且容易出错。
使用 DefinePlugin 配置的全局常量
注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。通常，有两种方式来达到这个效果，使用 ' "production" ', 或者使用

```js
JSON.stringify('production')。
    new webpack.DefinePlugin({

        // 当然，在运行node服务器的时候就应该按环境来配置文件
        // 下面模拟的测试环境运行配置

        'process.env':JSON.stringify('dev'),
        WP_CONF: JSON.stringify('dev'),
    }),
```

测试 DefinePlugin：编写

```js
if (WP_CONF === 'dev') {
  console.log('This is dev');
} else {
  console.log('This is prod');
}
```

打包后 WP_CONF === 'dev'会编译为 false

```js
if (false) {
  console.log('This is dev');
} else {
  console.log('This is prod');
}
```

清除不可达代码
当使用了 DefinePlugin 插件后，打包后的代码会有很多冗余。可以通过 UglifyJsPlugin 清除不可达代码。

```js
[
  new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false, // 去除warning警告
        dead_code: true, // 去除不可达代码
      },
      warnings: false,
    },
  }),
];
```

最后的打包打包代码会变成 console.log('This is prod')
附 Uglify 文档：github.com/mishoo/Ugli…
使用 DefinePlugin 区分环境 + UglifyJsPlugin 清除不可达代码，以减轻打包代码体积
HappyPack
HappyPack 可以开启多进程 Loader 转换，将任务分解给多个子进程，最后将结果发给主进程。
使用

```js
exports.plugins = [
  new HappyPack({
    id: 'jsx',
    threads: 4,
    loaders: ['babel-loader'],
  }),

  new HappyPack({
    id: 'styles',
    threads: 2,
    loaders: ['style-loader', 'css-loader', 'less-loader'],
  }),
];

exports.module.rules = [
  {
    test: /\.js$/,
    use: 'happypack/loader?id=jsx',
  },

  {
    test: /\.less$/,
    use: 'happypack/loader?id=styles',
  },
];
```

### ParallelUglifyPlugin

```js
// ParallelUglifyPlugin可以开启多进程压缩JS文件
import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';

module.exports = {
  plugins: [
    new ParallelUglifyPlugin({
      test,
      include,
      exclude,
      cacheDir,
      workerCount,
      sourceMap,
      uglifyJS: {},
      uglifyES: {},
    }),
  ],
};
```

## Webpack HMR 原理解析

Hot Module Replacement（简称 HMR)
包含以下内容：

![alt](https://tva1.sinaimg.cn/large/0082zybply1gc38w9m232j30md0n9tb5.jpg)

热更新步骤讲解

### 第一步：webpack 对文件系统进行 watch 打包到内存中

webpack-dev-middleware 调用 webpack 的 api 对文件系统 watch，当文件发生改变后，webpack 重新对文件进行编译打包，然后保存到内存中。
webpack 将 bundle.js 文件打包到了内存中，不生成文件的原因就在于访问内存中的代码比访问文件系统中的文件更快，而且也减少了代码写入文件的开销。
这一切都归功于 memory-fs，memory-fs 是 webpack-dev-middleware 的一个依赖库，webpack-dev-middleware 将 webpack 原本的 outputFileSystem 替换成了 MemoryFileSystem 实例，这样代码就将输出到内存中。
webpack-dev-middleware 中该部分源码如下:

```js
// compiler
// webpack-dev-middleware/lib/Shared.js
var isMemoryFs = !compiler.compilers && compiler.outputFileSystem instanceof MemoryFileSystem;
if (isMemoryFs) {
  fs = compiler.outputFileSystem;
} else {
  fs = compiler.outputFileSystem = new MemoryFileSystem();
}
```

### 第二步：devServer 通知浏览器端文件发生改变

在启动 devServer 的时候，socket.js 在服务端和浏览器端建立了一个 webSocket 长连接，以便将 webpack 编译和打包的各个阶段状态告知浏览器，最关键的步骤还是 webpack-dev-server 调用 webpack api 监听 compile 的 done 事件，当 compile 完成后，webpack-dev-server 通过 \_sendStatus 方法将编译打包后的新模块 hash 值发送到浏览器端。

```js
// webpack-dev-server/lib/Server.js
  compiler.plugin('done', (stats) => {
    // stats.hash 是最新打包文件的 hash 值
    this._sendStats(this.sockets, stats.toJson(clientStats));
    this._stats = stats;
  });
  ...
  Server.prototype._sendStats = function (sockets, stats, force) {
    if (!force && stats &&
    (!stats.errors || stats.errors.length === 0) && stats.assets &&
    stats.assets.every(asset => !asset.emitted)
    ) { return this.sockWrite(sockets, 'still-ok'); }
    // 调用 sockWrite 方法将 hash 值通过 websocket 发送到浏览器端
    this.sockWrite(sockets, 'hash', stats.hash);
    if (stats.errors.length > 0) { this.sockWrite(sockets, 'errors', stats.errors); }
    else if (stats.warnings.length > 0) { this.sockWrite(sockets, 'warnings', stats.warnings); }      else { this.sockWrite(sockets, 'ok'); }
  };
```

### 第三步：webpack-dev-server/client 接收到服务端消息做出响应

webpack-dev-server 修改了 webpack 配置中的 entry 属性，在里面添加了 webpack-dev-client 的代码，这样在最后的 bundle.js 文件中就会接收 websocket 消息的代码了。
webpack-dev-server/client 当接收到 type 为 hash 消息后会将 hash 值暂存起来，当接收到 type 为 ok 的消息后对应用执行 reload 操作。
在 reload 操作中，webpack-dev-server/client 会根据 hot 配置决定是刷新浏览器还是对代码进行热更新（HMR）。代码如下：

```js
// webpack-dev-server/client/index.js
  hash: function msgHash(hash) {
      currentHash = hash;
  },
  ok: function msgOk() {
      // ...
      reloadApp();
  },
  // ...
  function reloadApp() {
    // ...
    if (hot) {
      log.info('[WDS] App hot update...');
      const hotEmitter = require('webpack/hot/emitter');
      hotEmitter.emit('webpackHotUpdate', currentHash);
      // ...
    } else {
      log.info('[WDS] App updated. Reloading...');
      self.location.reload();
    }
  }
```

### 第四步：webpack 接收到最新 hash 值验证并请求模块代码

首先 webpack/hot/dev-server（以下简称 dev-server） 监听第三步 webpack-dev-server/client 发送的 webpackHotUpdate 消息，调用 webpack/lib/HotModuleReplacement.runtime（简称 HMR runtime）中的 check 方法，检测是否有新的更新。
在 check 过程中会利用 webpack/lib/JsonpMainTemplate.runtime（简称 jsonp runtime）中的两个方法 hotDownloadManifest 和 hotDownloadUpdateChunk。
hotDownloadManifest 是调用 AJAX 向服务端请求是否有更新的文件，如果有将发更新的文件列表返回浏览器端。该方法返回的是最新的 hash 值。
hotDownloadUpdateChunk 是通过 jsonp 请求最新的模块代码，然后将代码返回给 HMR runtime，HMR runtime 会根据返回的新模块代码做进一步处理，可能是刷新页面，也可能是对模块进行热更新。该 方法返回的就是最新 hash 值对应的代码块。
最后将新的代码块返回给 HMR runtime，进行模块热更新。
附：为什么更新模块的代码不直接在第三步通过 websocket 发送到浏览器端，而是通过 jsonp 来获取呢？
我的理解是，功能块的解耦，各个模块各司其职，dev-server/client 只负责消息的传递而不负责新模块的获取，而这些工作应该有 HMR runtime 来完成，HMR runtime 才应该是获取新代码的地方。再就是因为不使用 webpack-dev-server 的前提，使用 webpack-hot-middleware 和 webpack 配合也可以完成模块热更新流程，在使用 webpack-hot-middleware 中有件有意思的事，它没有使用 websocket，而是使用的 EventSource。综上所述，HMR 的工作流中，不应该把新模块代码放在 websocket 消息中。

### 第五步：HotModuleReplacement.runtime 对模块进行热更新

这一步是整个模块热更新（HMR）的关键步骤，而且模块热更新都是发生在 HMR runtime 中的 hotApply 方法中

```js
// webpack/lib/HotModuleReplacement.runtime
function hotApply() {
  // ...
  var idx;
  var queue = outdatedModules.slice();
  while (queue.length > 0) {
    moduleId = queue.pop();
    module = installedModules[moduleId];
    // ...
    // remove module from cache
    delete installedModules[moduleId];
    // when disposing there is no need to call dispose handler
    delete outdatedDependencies[moduleId];
    // remove "parents" references from all children
    for (j = 0; j < module.children.length; j++) {
      var child = installedModules[module.children[j]];
      if (!child) continue;
      idx = child.parents.indexOf(moduleId);
      if (idx >= 0) {
        child.parents.splice(idx, 1);
      }
    }
  }
  // ...
  // insert new code
  for (moduleId in appliedUpdate) {
    if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
      modules[moduleId] = appliedUpdate[moduleId];
    }
  }
  // ...
}
```

模块热更新的错误处理，如果在热更新过程中出现错误，热更新将回退到刷新浏览器，这部分代码在 dev-server 代码中，简要代码如下：

```js
module.hot
  .check(true)
  .then(function (updatedModules) {
    if (!updatedModules) {
      return window.location.reload();
    }
    // ...
  })
  .catch(function (err) {
    var status = module.hot.status();
    if (['abort', 'fail'].indexOf(status) >= 0) {
      window.location.reload();
    }
  });
```

### 第六步：业务代码需要做些什么？

当用新的模块代码替换老的模块后，但是我们的业务代码并不能知道代码已经发生变化，也就是说，当 hello.js 文件修改后，我们需要在 index.js 文件中调用 HMR 的 accept 方法，添加模块更新后的处理函数，及时将 hello 方法的返回值插入到页面中。代码如下

```js
// index.js
if (module.hot) {
  module.hot.accept('./hello.js', function () {
    div.innerHTML = hello();
  });
}
```
