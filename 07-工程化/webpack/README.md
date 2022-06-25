# webpack5

## 安装 Webpack

```bash
npm install --save-dev webpack webpack-cli
# or
yarn add webpack webpack-cli
```

webpack-cli 是为了在 webpack 4+ 在命令行里使用 webpack

```js
// webpack.config.js
const { Configuration } = require("webpack");
const path = require("path");

/**
 * @type {Configuration}
 */
const config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // path 输出文件夹必须定义为绝对路径
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "none",
};

module.exports = config;
```

在 package.json scripts 里配置 `"webpack": "webpack --config webpack.config.js"` 即可

## 自动引入资源

到目前为止，我们都是在 index.html 文件中手动引入所有资源，然而随着应用程序增长，如果继续手动管理 index.html 文件，就会变得困难起来。然而，通过一些插件可以使这个过程更容易管控。

### 什么是插件

插件 是 webpack 的 核心 功能。插件可以用于执行一些特定的任务，包括:打包优 化，资源管理，注入环境变量等。Webpack 自身也是构建于你在 webpack 配置中 用到的 相同的插件系统 之上!

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。 多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建一个插件实例。

Webpack 提供很多开箱即用的插件。

### 使用 HtmlWebpackPlugin

首先安装插件:

```bash
npm install --save-dev html-webpack-plugin
# or
yarn add -D html-webpack-plugin
```

并且调整 webpack.config.js 文件:

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = { 
  //...
  plugins: [
    // 实例化 html-webpack-plugin 插件 
    new HtmlWebpackPlugin()
  ]
}
```

打包后的内容

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
      <script defer src="bundle.js"></script>
  </head>
  <body>
  </body>
</html>
```

打包后，我们发现这个 dist/index.html 似乎与先前的 index.html 并没有关 系，HtmlWebpackPlugin 会默认生成它自己的 index.html 文件，并且所有的 bundle(bundle.js) 会自动添加到 html 中。

首先删除 index.html 手工引入的 js 文件

```js
// webpack.config.js
module.exports = { 
  //...
  plugins: [
    // 实例化 html-webpack-plugin 插件 
    new HtmlWebpackPlugin({
      template: './index.html', // 打包生成的文件的模板 
      filename: 'index.html', // 打包生成的文件名称。默认为 index.html
      inject: 'body' // 设置所有资源文件注入模板的位置。可以设置的值 true|'head'|'body'|false，默认值为 true 
    })
  ]
}
```

打包后的结果

```html
<!-- ./dist/index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpack</title>
<script defer src="bundle.js"></script></head>
<body>
</body>
</html>

```

### 清理dist

webpack 将生成文件并放置在 /dist 文件夹中，但是它不会追踪哪些文件是实际在项目中用到的。通常比较推荐的做法是，在每次构建前清理 /dist 文件夹，这样只会生成用到的文件。让我们使用 output.clean 配置项 实现这个需求。

```js
// webpack.config.js
module.exports = { 
  //...
  output: { 
    //...
    // 打包前清理 dist 文件夹 
    clean: true
  },
}
```

## 搭建开发环境

### mode 选项

在开始前，我们先将 mode 设置为 development

### 使用 source map

当 webpack 打包源代码时，可能会很难追踪到 error(错误) 和 warning(警告) 在源代码中的原始位置。例如，如果将三个源文件(a.js, b.js 和 c.js)打包到一个 bundle( bundle.js )中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到 bundle.js 。你可能需要准确地知道错误来自于哪个源文件，所以这种提示这通常不会提供太多帮助。

为了更容易地追踪 error 和 warning，JavaScript 提供了 source maps 功能，可以将编译后的代码映射回原始源代码。如果一个错误来自于 b.js ，source map 就会明确的告诉你。

devtool: 'inline-source-map',

- eval 每个 module 会封装到 eval 里包裹起来执行，并且会在末尾追加注释 // @ sourceURL.
- source-map 生成一个 SourceMap文件. 默认
- hidden-source-map 和 source-map 一样，但不会在 bundle 末尾追加注释.
- inline-source-map 生成一个 DataUrl 形式的 SourceMap 文件.
- eval-source-map 每个 module 会通过 eval() 来执行，并且生成一个 DataUrl 形式的 SourceMap.
- cheap-source-map 生成一个没有列信息(column-mappings)的 SourceMaps 文件，不包含 loader 的 sourcemap(譬如 babel 的 sourcemap)
- cheap-module-source-map 生成一个没有列信息(column-mappings)的 SourceMaps 文件，同时 loader 的 sourcemap 也被简化为只包含对应行的。

### 使用 watch mode(观察模式)

在每次编译代码时，手动运行 npx webpack 会显得很麻烦。

我们可以在 webpack 启动时添加 "watch" 参数。如果其中一个文件被更新，代码将被重新编译，所以你不必再去手动运行整个构建。

webpack --watch --config webpack.config.js

### 使用 webpack-dev-server

webpack-dev-server 为你提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能。

先安装:

```bash
npm install --save-dev webpack-dev-server
# or
yarn add -D webpack-dev-server
```

修改配置文件，告知 dev server，从什么位置查找文件:

```js
// webpack.config.js
module.exports = { //...
  // dev-server
  devServer: { 
    static: './dist'
  } 
}
```

以上配置告知 webpack-dev-server ，将 dist 目录下的文件作为 web 服务的根目录。

提示: webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。

webpack serve --open

这时我们不用刷新浏览器页面，在控制台上能看到 Hello world~~~ 自动更新了。

额外的配置

```js
devServer: { 
  static: './dist'
  // 添加响应头
  headers: {
    'X-Fast-Id': 'p3fdg42njghm34gi9ukj',
    }, 
  },
  // 开启代理
  proxy: {
    '/api': 'http://localhost:4001',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:4001',
      // 重写路径
      pathRewrite: { '^/api': '' },
      // 接受在 HTTPS 上运行且证书无效的后端服务器
      secure: false,
      // 我们的本地http服务变成https服务
      https: true,
      http2: true,
    },
  },
  // spa 404
  historyApiFallback: true,
  // 根据不同的访问路径定制替代的页面
  historyApiFallback: {
    rewrites: [
      { from: /^\/$/, to: '/views/landing.html' },
      { from: /^\/subPage/, to: '/views/subPage.html' },
      { from: /./, to: '/views/404.html' },
    ],
  },
  // 同一局域网下，就可以通过局域网ip来访问你的服务
  host: '0.0.0.0',
  // 模块热替换
  hot: true,
  // 热加载(文件更新时，自动刷新我们的服务和页面)
  liveReload: false, // 默认为true，即开启热更新功能
}
```

## 资源模块

目前为止，我们的项目可以在控制台上显示 "Hello world~~~"。现在我们尝试混合一些其他资源，比如 images，看看 webpack 如何处理。

在 webpack 出现之前，前端开发人员会使用 grunt 和 gulp 等工具来处理资源，并 将它们从 /src 文件夹移动到 /dist 或 /build 目录中。webpack 最出色的功能 之一就是，除了引入 JavaScript，还可以内置的资源模块 Asset Modules
。
资源模块(asset module)是一种模块类型，它允许我们应用Webpack来打包其他资 源文件(如字体，图标等)

资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader:

- asset/resource 发送一个单独的文件并导出 URL。
- asset/inline 导出一个资源的 data URI。
- asset/source 导出资源的源代码。
- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。

### Resource 资源

修改 webpack.config.js 配置:

```js
module.exports = {
// 配置资源文件 
  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource'
      }
    ] 
  },
}
```

- 自定义输出文件名

默认情况下，asset/resource 模块以 [contenthash][ext][query] 文件名发送到输出目录。

可以通过在 webpack 配置中设置 output.assetModuleFilename 来修改此模板字符串:

```js
output: {
  assetModuleFilename: 'images/[contenthash][ext][query]'
},
```

另一种自定义输出文件名的方式是，将某些资源发送到指定目录，修改配置:

```js
module.exports = { 
  // 配置资源文件
  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource',
        // 优先级高于 assetModuleFilename 
        generator: {
          filename: 'images/[contenthash][ext][query]'
        }
      } 
    ],
  },
}
```

### inline 资源

修改 webpack.config.js 配置:

```js
// 配置资源文件 
module: {
  rules: [
    {
      test: /\.svg$/,
      type: 'asset/inline'
    }
  ]
}
```

### source 资源

source资源，导出资源的源代码。修改配置文件，添加:

```js
module: {
  rules: [
    {
      test: /\.txt$/,
      type: 'asset/source'
    }
  ]
}
```

所有 .txt 文件将原样注入到 bundle 中

### 通用资源类型

通用资源类型 asset , 在导出一个 data URI 和发送一个单独的文件之间自动选择。

修改配置文件:

```js
module: {
  rules: [
    {
      test: /\.jpg$/, 
      type: 'asset'
    }
  ]
}
```

现在，webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择: 小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。

可以通过在 webpack 配置的 module rule 层级中，设置 Rule.parser.dataUrlCondition.maxSize 选项来修改此条件:

```js
module: {
  rules: [
    {
      test: /\.jpg$/, 
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 4 * 1024,
        },
      },
    }
  ]
}
```

## 管理资源

除了资源模块，我们还可以通过 loader引入其他类型的文件。

### 什么是loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。 loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

在 webpack 的配置中，loader 有两个属性:

1. test 属性，识别出哪些文件会被转换。
2. use 属性，定义出在进行转换时，应该使用哪个 loader。

```js
const path = require('path');
module.exports = { 
  // ...
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  }, 
};
```
  
以上配置中，对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性: test 和 use 。这告诉 webpack 编译器(compiler) 如下信息: “嘿，webpack 编译器，当你碰到「在 require() / import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先 use(使用) raw-loader 转换一下。”

需要安装 raw-loader `yarn add -D raw-loader`

txt: `hello webpack`, 实际显示为 `export default "hello webpack\n";`

### 加载 images 图像

假如，现在我们正在下载 CSS，但是像 background 和 icon 这样的图像，要如何处理呢?在 webpack 5 中，可以使用内置的 Asset Modules，我们可以轻松地将这些 内容混入我们的系统中，这个我们在"资源模块"一节中已经介绍了。这里再补充一个知识点，在 css 文件里也可以直接引用文件，修改 style.css

```css
.block-bg {
  background-image: url(./assets/webpack-logo.svg) ;
}
```

### 加载 fonts 字体

那么，像字体这样的其他资源如何处理呢?使用 Asset Modules 可以接收并加载任 何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文 件，也包括字体。让我们更新 webpack.config.js 来处理字体文件:

```js
module: {
  rules: [
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i, 
      type: 'asset/resource',
    },
  ] 
}
```

在项目中添加一些字体文件:

配置好 loader 并将字体文件放在合适的位置后，你可以通过一个 @font-face 声明 将其混合。本地的 url(...) 指令会被 webpack 获取处理，就像它处理图片一样

```css
@font-face {
  font-family: "iconfont";
  src: url("../assets/iconfont.ttf") format("truetype");
}

.icon {
  font-family: "iconfont" !important;
  font-size: 30px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

```js
const span = document.createElement("span");
span.classList.add("icon");
span.innerHTML = "&#xe668;";
document.body.appendChild(span);
```

打包后在 `webpack/dist/images/65b194f1f711865371d1.ttf`

### 加载数据

此外，可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说
默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 csv-loader 和 xml-loader。让我们处理加载这三类文件

安装

```bash
npm install --save-dev csv-loader xml-loader
# or
yarn add -D csv-loader xml-loader
```

添加配置:

```js
module.exports = { 
//...
// 配置资源文件 
  module: {
    rules: [ 
      { test: /\.(csv|tsv)$/i, use: ['csv-loader'] }, 
      {
        test: /\.xml$/i,
        use: ['xml-loader'], 
      },
    ]
  }
}
```

现在，你可以 import 这四种类型的数据(JSON, CSV, TSV, XML)中的任何一种，所导入的 Data 变量，将包含可直接使用的已解析 JSON

data.xml 文件转化为一个JS对象， data.cvs 转化为一个二维数组。

### 自定义 JSON 模块 parser

通过使用自定义 parser 替代特定的 webpack loader，可以将任何 toml 、 yaml 或 json5 文件作为 JSON 模块导入。

假设你在 src 文件夹下有一个 data.toml 、一个 data.yaml 以及一个 data.json5 文件

首先安装 toml ， yamljs 和 json5 的 packages

```bash
npm install toml yamljs json5 --save-dev
# or
yarn add -D toml yamljs json5
```

并在你的 webpack 中配置它们

```js
const toml = require('toml');
const yaml = require('yaml');
const json5 = require('json5');
module.exports = {
  module: {
    rules: [
      {
        test: /\.toml$/i,
        type: "json",
        parser: { parse: toml.parse },
      },
      {
        test: /\.yaml$/i,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      }, 
    ]
  } 
}
```

现在，toml、 yaml 和 json5 几个类型的文件都正常输出了结果。

## 加载CSS

为了在 JavaScript 模块中 import 一个 CSS 文件，你需要安装 style-loader 和 css-loader，并在 module 配置 中添加这些 loader:

```bash
npm install --save-dev style-loader css-loader
# or
yarn add -D style-loader css-loader
```

```js
module: {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    }, 
  ],
},
```

模块 loader 可以链式调用。链中的每个 loader 都将对资源进行转换。链会逆序执行。第一个 loader 将其结果(被转换后的资源)传递给下一个 loader，依此类推。 最后，webpack 期望链中的最后的 loader 返回 JavaScript。

应保证 loader 的先后顺序: 'style-loader' 在前，而 'css-loader' 在后。如果不遵守此约定，webpack 可能会抛出错误。webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这个示例中，所有以 .css 结尾的文件，都将被提供给 style-loader 和 css-loader 。

这使你可以在依赖于此样式的 js 文件中 `import './style.css'` 。现在，在此模块 执行过程中，含有 CSS 字符串的 `<style>` 标签，将被插入到 `html` 文件的 `<head>` 中。

现有的 loader 可以支持任何你可以想到的 CSS 风格 - sass 和 less 等。安装 less-loader:

`npm install less less-loader --save-dev`

```js
{
  test: /\.((le|c)ss)$/i,
  use: ['style-loader', 'css-loader', 'less-loader'], 
},
```

### 使用 css module

配置 css-loader

```js
{
  test: /\.((le|c)ss)$/i,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        /**
         * - 0 => no loaders (default);
         * - 1 => postcss-loader;
         * - 2 => postcss-loader, sass-loader
         */
        importLoaders: 2,
        modules: {
          mode: (path) => {
            if (/global\.((le|c)ss)$/.test(path)) {
              return "global";
            }
            return "local";
          },
          localIdentName: '[local]_[hash:base64:4]',
          /**
           * 
           * - camelCase 短横线命名增加一个驼峰命名的拷贝
           * - camelCaseOnly 短横线命名转为驼峰命名
           */
          exportLocalsConvention: 'camelCaseOnly'
        },
      },
    },
    // ...
```

```js
import './global.less'; // 全局导入
import styles from './index.less'; // 局部导入
```

### 抽离和压缩CSS

在多数情况下，我们也可以进行压缩CSS，以便在生产环境中节省加载时间，同时还 可以将CSS文件抽离成一个单独的文件。实现这个功能，需要 `mini-css-extract-plugin` 这个插件来帮忙。安装插件:

```bash
npm install mini-css-extract-plugin --save-dev
# or
yarn add -D mini-css-extract-plugin
```

本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文 件，并且支持 CSS 和 SourceMaps 的按需加载。本插件基于 webpack v5 的新特性构建，并且需要 webpack 5 才能正常工作。 之后将 loader 与 plugin 添加到你的 webpack 配置文件中

推荐 production 环境的构建将 CSS 从你的 bundle 中分离出来，这样可以使用 CSS/JS 文件的并行加载。 这可以通过使用 mini-css-extract-plugin 来实现，因为它可以创建单独的 CSS 文件。 对于 development 模式（包括 webpack-dev-server），你可以使用 style-loader，因为它可以使用多个 标签将 CSS 插入到 DOM 中，并且反应会更快。

不要同时使用 style-loader 与 mini-css-extract-plugin。

生产模式压缩: 为了压缩输出文件，请使用类似于 `css-minimizer-webpack-plugin` 这样的插件

```bash
yarn add -D css-minimizer-webpack-plugin
```

```js
mode: devMode ? "development" : "production",
module: {
  rules: [
    {
    test: /\.((le|c)ss)$/i,
    use: [
      devMode ? "style-loader" : { loader: MiniCssExtractPlugin.loader },
      // ...
    ]
  ]
} ,
plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin({
  filename: 'styles/[name].[contenthash:8].css',
})]),
optimization: {
  minimizer: [new CssMinimizerPlugin()],
},
```

### post-css-loader

安装

```bash
npm install --save-dev postcss-loader postcss
# or
yarn add -D postcss-loader postcss
```

安装 postcss 插件

postcss-preset-env 包含 autoprefixer

```bash
npm install --save-dev postcss-preset-env 
```

```js
{
  loader: "postcss-loader",
  options: {
    postcssOptions: { plugins: ["postcss-preset-env"] },
  },
},
```

autoprefixer 添加厂商前缀。postcss-preset-env 帮助 postcss 找到 package.json 里的 browserslist 配置

```json
// package.json
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

```css
.came-a {
  color: aqua;
  height: fit-content;
}
```

```css
.came-a_s3mt {
  color: aqua;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
}
```

## 使用 babel-loader

前面的章节里，我们应用 less-loader 编译过 less 文件，应用 xml-loader 编译过 xml 文件，那 js 文件需要编译吗? 我们来做一个实验

```js
// src/babelLoader/index.js
function getString() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello world~~~");
    }, 2000);
  });
}

async function helloWorld() {
  let string = await getString();
  console.log(string);
}

// 导出函数模块
export default helloWorld;

```

执行编译: npm run build 我们发现，编写的ES6代码原样输出了。启动服务，打开浏览器:

npm run start Hello world~~ 两秒后正常输出，说明浏览器能够运行我们的ES6代码。但如果浏览器版本过低，就很难保证代码正常运行了。

### 为什么需要 babel-loader

webpack 自身可以自动加载 JS 文件，就像加载JSON文件一样，无需任何 loader。可是，加载的JS文件会原样输出，即使你的 JS 文件里包含 ES6+ 的代码，也不会做任何的转化。这时我们就需要 Babel 来帮忙。Babel 是一个 JavaScript 编译器，可以将 ES6+ 转化成 ES5。在 Webpack 里使用 Babel，需要使用 babel-loader 。

### 使用 babel-loader

安装:

```bash
npm install -D babel-loader @babel/core @babel/preset-env
```

- babel-loader : 在webpack里应用 babel 解析ES6的桥梁
- @babel/core: babel核心模块
- @babel/preset-env: babel预设，一组babel插件的集合

在 webpack 配置中，需要将 babel-loader 添加到 module 列表中，就像下面这样:

```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
},
```

执行编译: 从编译完的结果可以看出，async/await 的ES6语法被 babel编译了。

### regeneratorRuntime 插件

此时执行编译，在浏览器里打开项目发现报了一个致命错误: regeneratorRuntime is not defined

regeneratorRuntime 是 webpack 打包生成的全局辅助函数，由 babel 生成，用于兼容 async/await 的语法。

这个错误显然是未能正确配置 babel。 正确的做法需要添加以下的插件和配置:

```bash
# 这个包中包含了 regeneratorRuntime，运行时需要 
npm install --save @babel/runtime
# 这个插件会在需要 regeneratorRuntime 的地方自动 require 导包，编译时需要 
npm install --save-dev @babel/plugin-transform-runtime
# 更多参考这里 <https://babeljs.io/docs/en/babel-plugin-transform-runtime>
```

接着改一下 webpack 的配置:

```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
      plugins: [["@babel/plugin-transform-runtime"]],
    },
  },
},
```

启动服务，打开浏览器: 成功运行。

## 代码分离

代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

常用的代码分离方法有三种:

1. 入口起点: 使用 entry 配置手动地分离代码。
2. 防止重复: 使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk。
3. 动态导入: 通过模块的内联函数调用来分离代码。

### 入口起点

这是迄今为止最简单直观的分离代码的方式。不过，这种方式手动配置较多，并有一 些隐患，我们将会解决这些问题。先来看看如何从 main bundle 中分离 another module(另一个模块):

在 src/split 目录下创建 another-module.js 文件: webpack/src/split/another-module.js

```js
import _ from 'lodash'
console.log(_.join(['Another', 'module', 'loaded!'], ' '))
```

这个模块依赖了 lodash ，需要安装一下: npm install lodash

修改配置文件:

```js
entry: {
  index: "./src/index.js",
  another: "./src/split/another-module.js",
},
output: {
  filename: "[name].bundle.js",
  // ...
}
```

asset another.bundle.js 1.38 MiB [emitted] (name: another) , 我们发现 lodash.js 也被打包到 another.bundle.js 中。

两个入口的 bundle 文件都被链接到了 index.html 中。

我们再来修改一下 index.js 文件:

```js
// webpack/src/split/index.js
import _ from 'lodash'
console.log(_.join(['index', 'module', 'loaded!'], ' '));
// webpack/src/index.js
import "./split";
```

执行编译:

观察一下: 我们发现 index.bundle.js 文件大小也骤然增大了，可以 lodash.js也被打包 到了 index.bundle.js 中了。

正如前面提到的，这种方式的确存在一些隐患:

- 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。

以上两点中，第一点对我们的示例来说无疑是个问题，因为之前我们在 ./src/index.js 中也引入过 lodash ，这样就在两个 bundle 中造成重复引用。

#### entry 配置

```ts
interface EntryObject {
  [index: string]: string | string[] | EntryDescription;
}
interface EntryDescription {
  // 当前入口所依赖的入口。它们必须在该入口被加载前被加载。
  dependOn?: string | string[];
  // 指定要输出的文件名称。
  filename?: string | (pathData, assetInfo) => string;
  // 启动时需加载的模块。
  import: string | string[];
  // 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址
  publicPath?: string | (pathData, assetInfo) => string;
}
```

- runtime 和 dependOn 不应在同一个入口上同时使用，配置无效，并且会抛出错误
- 确保 runtime 不能指向已存在的入口名称
- dependOn 不能是循环引用的

1. 单个入口(简写)语法

   用法: `entry: string | [string]`

   ```js
   entry: './path/to/my/entry/file.js',
   entry: ['./src/file_1.js', './src/file_2.js'],
   ```

   将一个文件路径数组传递给 entry 属性，这将创建一个所谓的 "multi-main entry"。在你想要一次注入多个依赖文件，并且将它们的依赖关系绘制在一个 "chunk" 中时，这种方式就很有用。

2. 对象语法

   ```js
   entry: {
     a2: 'depending.js', 
     b2: {
       dependOn: 'a2',
       import: './src/app.js', 
     },
   },
   ```

#### 配置 index.html 模板

1. 生成多个HTML文件

   要生成多个HTML文件，请在插件数组中多次声明插件。

   ```js
   plugins: [
     new HtmlWebpackPlugin(), // Generates default index.html 
     new HtmlWebpackPlugin({ // Also generate a test.html
       filename: 'test.html',
       template: 'src/assets/test.html' 
     })
   ]
   ```

2. 编写自己的模板

   如果默认生成的HTML不能满足您的需要，您可以提供自己的模板。最简单的方法是 使用 template 选项并传递自定义HTML文件。html 网页包插件将自动将所有必要的 CSS、JS、manifest和favicon文件注入标记中。

   ```js
   plugins: [
    new HtmlWebpackPlugin({
       title: 'Custom template',
       // Load a custom template (lodash by default) 
       template: 'index.html'
     })
   ]
   ```

   ```html
   <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title><%= htmlWebpackPlugin.options.title %></title> 
      </head>
      <body></body>
   </html>
   ```

3. 多页面应用

   ```js
   entry: {
     pageOne: './src/pageOne/index.js', 
     pageTwo: './src/pageTwo/index.js',
     pageThree: './src/pageThree/index.js',
   },
   ```

   我们告诉 webpack 需要三个独立分离的依赖图

### 防止重复

#### 入口依赖

配置 dependOn option 选项，这样可以在多个 chunk 之间共享模块:

```js
entry: {
  index: {
    import: "./src/index.js",
    dependOn: "shared",
  },
  another: {
    import: "./src/split/another-module",
    dependOn: "shared",
  },
  shared: "lodash",
},
```

执行编译 观察一下: index.bundle.js 与 another.bundle.js 共享的模块 lodash.js 被打包到一个单独的文件 shared.bundle.js 中。

#### SplitChunksPlugin

SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。让我们使用这个插件，将之前的示例中重复的 lodash 模块去除:

```js
entry: {
  index: "./src/index.js",
  another: "./src/split/another-module.js",
},
optimization: {
  splitChunks: {
    chunks: "all",
  },
},
```

执行编译 观察一下: 使用 optimization.splitChunks 配置选项之后，现在应该可以看出， index.bundle.js 和 another.bundle.js 中已经移除了重复的依赖模块。需要注意的是，插件将 lodash 分离到单独的 chunk，并且将其从 main bundle 中移除，减轻了大小。

### 动态导入

当涉及到动态代码拆分时，webpack 提供了两个类似的技术。第一种，也是推荐选择的方式是，使用符合 ECMAScript 提案 的 import() 语法 来实现动态导入。第二种，则是 webpack 的遗留功能，使用 webpack 特定的 require.ensure 。让我们使用第一种......

创建 async-module.js 文件:

```js
// webpack/src/split/async-module.js
function getComponent() {
  return import("lodash")
    .then(({ default: _ }) => {
      const element = document.createElement("div");
      element.innerHTML = _.join(["Hello", "webpack"], " ");
      return element;
    })
    .catch((error) => "An error occurred while loading the component");
}

getComponent().then((component) => {
  document.body.appendChild(component);
});

```

在入口文件中导入:

```js
import "./split/async-module";
```

执行编译: 从打印的结果看，公共的代码被单独打包到一个文件外 我们看到，静态和动态载入的模块都正常工作了。

### 懒加载

懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把 你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用 或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

创建一个 math.js 文件，在主页面中通过点击按钮调用其中的函数:

```js
// webpack/src/split/math.js
export const add = (x, y) => {
  return x + y;
};

export const minus = (x, y) => {
  return x - y;
};
```

编辑 index.js 文件:

```js
// webpack/src/split/index.js
const button = document.createElement("button");

button.textContent = "点击执行加法运算";

button.addEventListener("click", () => {
  import(/* webpackChunkName: 'math' */ "./math.js").then(({ add }) => {
    console.log(add(4, 5));
  });
});

document.body.appendChild(button);
```

这里有句注释，我们把它称为 webpack 魔法注释: webpackChunkName: 'math' , 告诉webpack打包生成的文件名为 math 。

启动服务，在浏览器上查看: 第一次加载完页面， math.bundle.js 不会加载，当点击按钮后，才加载 math.bundle.js 文件。

### 预获取/预加载模块

Webpack v4.6.0+ 增加了对预获取和预加载的支持。

在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器:

- prefetch(预获取): 将来某些导航下可能需要的资源
- preload(预加载): 当前导航下可能需要资源

下面这个 prefetch 的简单示例中，编辑 index.js 文件: 添加第二句魔法注释: webpackPrefetch: true

```js
import(/* webpackChunkName: 'math', webpackPrefetch: true */ "./math.js")
```

告诉 webpack 执行预获取。这会生成 `<link rel="prefetch" as="script" href="math.js">` 并追加到页面头部，指示着浏览器在闲置时间预取 math.js 文件。

启动服务，在浏览器上查看: 我们发现，在还没有点击按钮时， math.bundle.js 就已经下载下来了。同时，在 index.html 里webpack自动添加了一句: 点击按钮，会立即调用已经下载好的 math.bundle.js 文件中的 add 方法 点击按钮，执行 4+5 的加法运算。

与 prefetch 指令相比，preload 指令有许多不同之处:

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

创建一个 print.js 文件:

```js
export const print = () => {
  console.log("preload chunk.");
};
```

修改 index.js 文件:

```js
const button2 = document.createElement("button");
button2.textContent = "点击执行字符串打印";
button2.addEventListener("click", () => {
  import(
    /* webpackChunkName: 'print', webpackPreload: true */ "./print.js"
  ).then(({ print }) => {
    print(4, 5);
  });
});
document.body.appendChild(button2);
```

启动服务，打开浏览器: 仔细观察，发现 print.bundle.js 未被下载，因为我们配置的是 webpackPreload , 是在父 chunk 加载时，以并行方式开始加载。点击按钮才加载的模块不会事先加载的。

我们修改一下引入方式:

```js
import(/* webpackChunkName: 'print', webpackPreload: true */ "./print.js").then(
  ({ print }) => {
    print();
  }
);
```

再次刷新浏览器页面: print.bundle.js 被加载下来，是和当前 index.bundle.js 并行加载的。

## 缓存

以上，我们使用 webpack 来打包我们的模块化后的应用程序，webpack 会生成一个可部署的 /dist 目录，然后把打包后的内容放置在此目录中。只要 /dist 目录中的内容部署到 server 上，client(通常是浏览器)就能够访问此 server 的网站及其 资源。而最后一步获取资源是比较耗费时间的，这就是为什么浏览器使用一种名为**缓存**的技术。可以通过命中缓存，以降低网络流量，使网站加载速度更快，然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手。

本节通过必要的配置，以确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。

### 输出文件的文件名

我们可以通过替换 output.filename 中的 substitutions 设置，来定义输出文件的名称。webpack 提供了一种使用称为**substitution(可替换模板字符串)**的方式，通过带括号字符串来模板化文件名。其中， `[contenthash]` substitution 将根据资源内容创建出唯一hash。当资源内容发生变化时， `[contenthash]` 也会发生变化。

修改配置文件:

```js
output: {
  filename: "[name].[contenthash].js",
  // ...
},
```

执行打包编译: 可以看到，bundle 的名称是它内容(通过 hash)的映射。如果我们不做修改，然后再次运行构建，文件名会保持不变。

### 缓存第三方库

将第三方库(library)(例如 `lodash` )提取到单独的 vendor chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用 client 的长效缓存机制，命中缓存来消除请求，并减少向 server 获取资源，同时还能保证 client 代码和 server 代码版本一致。

我们在 optimization.splitChunks 添加如下 cacheGroups 参数并构建:

```js
optimization: {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendors",
        chunks: "all",
      },
    },
  },
},
```

### 将 js 文件放到一个文件夹中

目前，全部 js 文件都在 dist 文件夹根目录下，我们尝试把它们放到一个文件夹中，

这个其实也简单，修改配置文件:

```js
output: {
  filename: 'scripts/[name].[contenthash].js',
},
```

我们在输出配置中修改 filename ，在前面加上路径即可。执行编译

截止目前，我们已经把 JS 文件、样式文件及图片等资源文件分别放到了 scripts 、 styles 、 images 三个文件夹中。

## 拆分配置文件

现在，我们只能手工的来调整 mode 选项，实现生产环境和开发环境的切换，且很多 配置在生产环境和开发环境中存在不一致的情况，比如开发环境没有必要设置缓存， 生产环境还需要设置公共路径等等。

本节介绍拆分开发环境和生产环境，让打包更灵活。

### 公共路径

publicPath 配置选项在各种场景中都非常有用。你可以通过它来指定应用程序中所有资源的基础路径。

#### 基于环境设置

在开发环境中，我们通常有一个 assets/ 文件夹，它与索引页面位于同一级别。这没太大问题，但是，如果我们将所有静态资源托管至 CDN，然后想在生产环境中使用呢?

想要解决这个问题，可以直接使用一个 environment variable(环境变量)。假设我们有一个变量 ASSET_PATH :

```js
const webpack = require("webpack");
// 尝试使用环境变量，否则使用根路径
const ASSET_PATH = process.env.ASSET_PATH || '/';
// ...
output: {
  publicPath: ASSET_PATH,
},
plugins: [
  new webpack.DefinePlugin({
    "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH),
  }),
]
```
  
#### auto

该值是默认项

有可能你事先不知道 `publicPath` 是什么，webpack 会自动根据 `import.meta.url`、`document.currentScript`、`script.src` 或者 `self.location` 变量设置 publicPath。你需要做的是将 `output.publicPath` 设为 'auto'

请注意在某些情况下不支持 `document.currentScript` ，例如:IE 浏览器，你不得不引入一个 polyfill，例如 currentScript Polyfill 。

### 环境变量

想要消除 webpack.config.js 在 开发环境 和 生产环境 之间的差异，你可能需要环境变量(environment variable)。

webpack 命令行 环境配置 的 --env 参数，可以允许你传入任意数量的环境变量。而在 webpack.config.js 中可以访问到这些环境变量。例如， `--env production` 或 `--env goal=local` 。

对于我们的 webpack 配置，有一个必须要修改之处。通常，module.exports 指向配置对象。要使用 env 变量，你必须将 module.exports 转换成一个函数:

```js
module.exports = (env) => {
  return {
    // 根据命令行参数 env 来设置不同环境的 mode
    mode: env.production ? "production" : "development", 
    //...
  }
}
```

或是 `webpack --node-env production`

```js
mode: process.env.NODE_ENV === "production" ? "production" : "development", 
```

### 拆分配置文件

目前，生产环境和开发环境使用的是一个配置文件，我们需要将这两个文件单独放到不同的配置文件中。如 webpack.config.dev.js (开发环境配置)和
webpack.config.prod.js (生产环境配置)。在项目根目录下创建一个配置文件夹 config 来存放他们。

拆分成两个配置文件后，分别运行这两个文件:

- 开发环境: webpack serve -c ./config/webpack.config.dev.js
- 生产环境: webpack -c ./config/webpack.config.prod.js

### npm 脚本

每次打包或启动服务时，都需要在命令行里输入一长串的命令。

```json
// package.json
"scripts": {
  "start": "webpack serve -c ./config/webpack.config.dev.js", 
  "build": "webpack -c ./config/webpack.config.prod.js"
}
```

### 提取公共配置

这时，我们发现这两个配置文件里存在大量的重复代码，可以手动的将这些重复的代码单独提取到一个文件里，

使用 webpack-merge 合并配置

合并规则

1. 如果数据类型不一样，后面的直接完全覆盖前面的，如果两者都是基础数据类型，后面的也会覆盖前面的
2. 如果两者都是数组的话就会把两个数组进行合并
3. 如果两者都是对象, 例如在a对象和b对象合并的过程中，a和b的键值对key如果不同，当然都会保留下来，到最终合并后的对象中

## 模块解析(resolve)

webpack通过Resolvers实现了模块之间的依赖和引用。举个例子:所引用的模块可以是来自应用程序的代码，也可以是第三方库。 resolver 帮助 webpack 从每个 require/import 语句中，找到需要引入到 bundle 中的模块代码。 当打包模块时，webpack 使用 enhanced-resolve 来解析文件路径。(webpack_resolver的代码实现很有思想，webpack 基于此进行 tree-shaking，这个概念我们后面会讲到)。

### resolve alias

```js
resolve: {
  alias: {
    "@utils": path.resolve(__dirname, 'src/utils/') 
  },
},
```

### extensions

```js
resolve: {
  extensions: ['.js', '.json', '.wasm'],
},
```

webpack会按照数组顺序去解析这些后缀名，对于同名的文件，webpack总是会先 解析列在数组首位的后缀名的文件。

### 外部扩展(Externals)

有时候我们为了减小bundle的体积，从而把一些不变的第三方库用cdn的形式引入进来，比如 jQuery

这个时候我们想在我们的代码里使用引入的jquery———但似乎三种模块引入方式都不行，这时候怎么办呢? webpack给我们提供了 Externals 的配置属性，让我们可以配置外部扩展模块:

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
```

```js
module.exports = { 
  //...
  externals: {
    jquery: 'jQuery',
  },
};
```

注意:我们如何得知 { jquery: 'jQuery'} 中的 'jQuery'? 其实就是cdn里打入到window中的变量名，比如jQuery不仅有jQuery变量名，还有$，那么我们也可以写成这样子:

```js
import $ from 'jquery'; 
console.log($);
```

### 依赖图(dependency graph)

每当一个文件依赖另一个文件时，webpack 会直接将文件视为存在依赖关系。 这使得 webpack 可以获取非代码资源，如 images 或 web 字体等。并会把它们作为依赖提供给应用程序。 当 webpack 开始工作时，它会根据我们写好的配置,从入口 (entry) 开始，webpack 会递归的构建一个依赖关系图，这个依赖图包含着应用程序中所需的每个模块，然后将所有模块打包为bundle(也就是output的配置项)。

单纯讲似乎很抽象，我们更期望能够可视化打包产物的依赖图，下边列示了一些 bundle分析工具。

bundle 分析(bundle analysis) 工具:

- 官方分析工具 是一个不错的开始。还有一些其他社区支持的可选项:
- webpack-chart: webpack stats 可交互饼图。
- webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- webpack-bundle-analyzer:一个 plugin 和 CLI 工具，它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式。
- webpack bundle optimize helper:这个工具会分析你的 bundle，并提供可操 作的改进措施，以减少 bundle 的大小。
- bundle-stats:生成一个 bundle 报告(bundle 大小、资源、模块)，并比较不同构建之间的结果。

我们来使用 webpack-bundle-analyzer 实现。然后我们配置它:

```bash
# 首先安装这个插件作为开发依赖
# NPM
npm install --save-dev webpack-bundle-analyzer 
# Yarn
yarn add -D webpack-bundle-analyzer
```

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = { 
  plugins: [
    // ...others
    new BundleAnalyzerPlugin()
  ]
}
```

这时我们执行打包命令，发现控制台里打印出下面这样的日志: 我们在浏览器中打开 `http://127.0.0.1:8888` ，我们成功可视化了打包产物依赖图!

## 扩展功能

### Web Works

有时我们需要在客户端进行大量的运算，但又不想让它阻塞我们的js主线程。你可能第一时间考虑到的是异步。 但事实上，运算量过大(执行时间过长)的异步也会阻塞js事件循环，甚至会导致浏览器假死状态。

这时候，HTML5的新特性 WebWorker 就派上了用场。 在此之前，我们简单的了解下这个特性。

html5之前，打开一个常规的网页，浏览器会启用几个线程? 一般而言，至少存在三个线程(公用线程不计入在内): 分别是js引擎线程(处理js)、GUI渲染线程(渲染页面)、浏览器事件触发线程(控制交互)。

当一段JS脚本长时间占用着处理机,就会挂起浏览器的GUI更新，而后面的事件响应也被排在队列中得不到处理，从而造成了浏览器被锁定进入假死状态。现在如果遇到了这种情况，我们可以做的不仅仅是优化代码————html5提供了解决方案，webworker。webWorkers提供了js的后台处理线程的API，它允许将复杂耗时的单纯js逻辑处理放 在浏览器后台线程中进行处理，让js线程不阻塞UI线程的渲染。 多个线程间也是可以通过相同的方法进行数据传递。

它的使用方式如下:

```js
// new Worker(scriptURL: string | URL, options?: WorkerOptions)
new Worker("someWorker.js");
```

也就是说，需要单独写一个js脚本，然后使用new Worker来创建一个Work线程实 例。 这意味着并不是将这个脚本当做一个模块引入进来，而是单独开一个线程去执行这个脚本。

我们知道，常规模式下，我们的webpack工程化环境只会打包出一个bundle.js，那 我们的worker脚本怎么办? 也许你会想到设置多入口(Entry)多出口(output)的方式。 事实上不需要那么麻烦，webpack4 的时候就提供了 worker-loader 专门配置 webWorker。 令人开心的是，webpack5之后就不需要用 loader 啦，因为 webpack5 内置了这个功能。

```js
// work.js
self.onmessage = ({ data: { question } }) => {
  self.postMessage({
    answer: 42,
  });
};
```

```js
// 下面的代码属于业务逻辑
const worker = new Worker(new URL("./work.js", import.meta.url));

worker.postMessage({
  question: "hi, 那边的 worker 线程，请告诉我今天的幸运数字是多少?",
});

worker.onmessage = ({ data: { answer } }) => {
  console.log(answer);
};
```

> import.meta.url这个参数能够锁定我们当前的这个模块——注意，它不能在 commonjs中使用。

这时候我们执行打包命令，会发现,dist目录下除了bundle.js之外，还有另外一个 xxx.bundle.js!

这说明我们的 webpack5 自动的将被 new Work 使用的脚本单独打出了一个bundle。

我们加上刚才的问答代码，执行 npm run start，发现它是能够正常工作。 并且在 network 里也可以发现多了一个 src_worker_js.bundle.js。

总结: webpack5以来内置了很多功能，让我们不需要过多的配置，比如之前讲过的hot模 式，和现在的 web worker。

### TypeScript

在前端生态里，TS扮演着越来越重要的角色。 我们直入正题，讲下如何在webpack工程化环境中集成TS。

首先，当然是安装我们的ts和对应的loader。

```bash
npm install --save-dev typescript ts-loader
```

接下来我们需要在项目根目录下添加一个 ts 的配置文件————tsconfig.json，我们可以用 ts 自带的工具来自动化生成它。

```bash
npx tsc --init
```

我们发现生成了一个tsconfig.json，里面注释掉了绝大多数配置。 现在，根据我们想要的效果来打开对应的配置。

```json
{
  "compilerOptions": {
    "outDir": "./dist/", 
    "sourceMap": true, 
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true, 
    "moduleResolution": "node"
  } 
}
```

 好了，接下来我们新增一个src/index.ts，内置一些内容。 然后我们别忘了更改我们的 entry 及配置对应的 loader。 当然，还有resolve extensions，将 .ts 放在 .js 之前，这样它会先找 .ts。 注意，如果我们使用了sourceMap，一定记得和上面的ts配置一样，设置 sourcemap为true。 也别忘记在我们的webpack.config.js里，添加 sourcemap ,就像我们之前讲的那样。

```js
resolve: {
  extensions: [".tsx", ".ts", ".js"],
},
module: {
  rules: [
    {
      test: /\.(ts|tsx)$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
```

eslint & ts 注意，如果要使用eslint，使用初始化命令的时候，记得选择 “使用了 typescript ”。

如果已经配置了eslint，但没有配置ts相关的配置，那么我们需要先安装对应的 plugin

```bash
yarn add -D @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
```

注意如果需要用到react的话，记得也要安装

```bash
yarn add -D eslint-plugin-react@latest
```

vue或者其他常用框架同样如此，一般都会有专门的plugin。 然后我们对 .esilntrc 进行更改~

```js
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended", 
    // 如果需要react的话 "plugin:react/recommended", 
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser", 
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }, 
    // 如果需要 react 的话 "ecmaVersion": 13, "sourceType": "module"
    },
  "plugins": [
    "react",
    "@typescript-eslint"
  ], 
  "rules": {
    // ...一些自定义的rules "no-console": "error"
  } 
};
```

## Tree shaking

注意 Webpack 不能百分百安全地进行 tree-shaking。有些模块导入，只要被引入，就会对应用程序产生重要的影响。一个很好的例子就是全局样式表，或者设置全局配置的JavaScript 文件。

Webpack 认为这样的文件有“副作用”。具有副作用的文件不应该做 tree-shaking， 因为这将破坏整个应用程序。

Webpack 的设计者清楚地认识到不知道哪些文件有副作用的情况下打包代码的风险，因此webpack4默认地将所有代码视为有副作用。这可以保护你免于删除必要的文件，但这意味着 Webpack 的默认行为实际上是不进行 tree-shaking。值得注意的是 webpack5 默认会进行 tree-shaking。

如何告诉 Webpack 你的代码无副作用，可以通过 package.json 有一个特殊的属性 sideEffects，就是为此而存在的。

它有三个可能的值:

1. true
  如果不指定其他值的话。这意味着所有的文件都有副作用，也就是没有一个文件可以 tree-shaking。

2. false
  告诉 Webpack 没有文件有副作用，所有文件都可以 tree-shaking。

3. 数组[...]
  是文件路径数组。它告诉 webpack，除了数组中包含的文件外，你的任何文件 都没有副作用。因此，除了指定的文件之外，其他文件都可以安全地进行 tree- shaking。

webpack4 曾经不进行对 CommonJs 导出和 require() 调用时的导出使用分析。 webpack 5 增加了对一些 CommonJs 构造的支持，允许消除未使用的 CommonJs 导出，并从 require() 调用中跟踪引用的导出名称。

## 渐进式网络应用程序 PWA

渐进式网络应用程序(progressive web application - PWA)，是一种可以提供类似于 native app(原生应用程序) 体验的 web app(网络应用程序)。PWA 可以用来做很多事。其中最重要的是，在离线(offline)时应用程序能够继续运行功能。这是通过使用 名为 Service Workers 的 web 技术来实现的。

### 非离线环境下运行

到目前为止，我们一直是直接查看本地文件系统的输出结果。通常情况下，真正的用户是通过网络访问 web app;用户的浏览器会与一个提供所需资源(例如， .html ,.js 和 .css 文件)的 server 通讯。

我们通过搭建一个拥有更多基础特性的 server 来测试下这种离线体验。这里使用 http-server package: `npm install http-server --save-dev` 。还要修改 package.json 的 scripts 部分，来添加一个 start script

```js
// package.json
"scripts": {
  "dev": "http-server dist"
}
```

注意:默认情况下，webpack DevServer 会写入到内存。我们需要启用 devServer.devMiddleware.writeToDisk 配置项，来让 http-server 处理 ./dist 目 录中的文件。

```js
devServer: {
  devMiddleware: {
    index: true,
    writeToDisk: true,
  },
},
```

如果你之前没有操作过，先得运行命令 npm run build 来构建你的项目。然后运行命令 npm start

如果你打开浏览器访问 <http://localhost:8080> (即 <http://127.0.0.1> )，你应该会看到 webpack 应用程序被 serve 到 dist 目录。如果停止 server 然后刷新， 则 webpack 应用程序不再可访问。

这就是我们为实现离线体验所需要的改变。在本章结束时，我们应该要实现的是，停止 server 然后刷新，仍然可以看到应用程序正常运行。

### 添加 Workbox

添加 workbox-webpack-plugin 插件，然后调整 webpack.config.js 文件

```bash
npm install workbox-webpack-plugin --save-dev
# or
yarn add workbox-webpack-plugin
```

```js
// webpack.config.common.js
const WorkboxPlugin = require("workbox-webpack-plugin");
plugins: [
  new WorkboxPlugin.GenerateSW({
    // 这些选项帮助快速启用 ServiceWorkers
    // 不允许遗留任何“旧的” ServiceWorkers
    clientsClaim: true,
    skipWaiting: true,
  }),
]
```

执行 yarn build

现在你可以看到，生成了两个额外的文件: service-worker.js 和名称冗长的 workbox-6716fad7.js。service-worker.js 是 Service Worker 文件，workbox-6716fad7.js 是 service-worker.js 引用的文件，所以它也可以运行。你本地生成的文件可能会有所不同;但是应该会有一个 service-worker.js 文件。

所以，值得高兴的是，我们现在已经创建出一个 Service Worker。接下来该做什么?

### 注册 Service Worker

接下来我们注册 Service Worker，使其出场并开始表演。通过添加以下注册代码来完成此操作:

```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service- worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
```

再次运行 npm run build 来构建包含注册代码版本的应用程序。然后用 npm dev 启动服务。访问 <http://localhost:8080> 并查看 console 控制台。在那里你应该 看到: SW registered

现在来进行测试。停止 server 并刷新页面。如果浏览器能够支持 Service Worker， 应该可以看到你的应用程序还在正常运行。然而，server 已经停止 serve 整个 dist 文件夹，此刻是 Service Worker 在进行 serve。

## shimming 预置依赖

webpack compiler 能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写 的模块。然而，一些 third party(第三方库) 可能会引用一些全局依赖(例如 jQuery 中的 $ )。因此这些 library 也可能会创建一些需要导出的全局变量。这些 "broken modules(不符合规范的模块)" 就是 shimming( ) 发挥作用的地方。
shim 另外一个极其有用的使用场景就是:当你希望 polyfill 扩展浏览器能力，来支持 到更多用户时。在这种情况下，你可能只是想要将这些 polyfills 提供给需要修补 (patch)的浏览器(也就是实现按需加载)。
    SW registered
      //...
if ('serviceWorker' in navigator) { window.addEventListener('load', () => {
navigator.serviceWorker.register('/service- worker.js').then(registration => {
console.log('SW registered: ', registration); }).catch(registrationError => {
console.log('SW registration failed: ', registrationError); });
}); }

赖依置预

 2.7.1 Shimming 预置全局变量
让我们开始第一个 shimming 全局变量的用例。还记得我们之前用过的 lodash 吗?出于演示目的，例如把这个应用程序中的模块依赖，改为一个全局变量依赖。要 实现这些，我们需要使用 ProvidePlugin 插件。
使用 ProvidePlugin 后，能够在 webpack 编译的每个模块中，通过访问一个变量 来获取一个 package。如果 webpack 看到模块中用到这个变量，它将在最终 bundle 中引入给定的 package。让我们先移除 lodash 的 import 语句，改为通过 插件提供它:
src/index.js
webpack.config.js
        console.log(_.join(['hello', 'webpack'], ' '))
 const webpack = require('webpack') module.exports = {
mode: 'development', entry: './src/index.js',
plugins: [
new webpack.ProvidePlugin({
      _: 'lodash'
    })
] }
 我们本质上所做的，就是告诉 webpack......
如果你遇到了至少一处用到 _ 变量的模块实例，那请你将 lodash package 引
入进来，并将其提供给需要用到它的模块。
运行我们的构建脚本，将会看到同样的输出:
   [felix] 01-third-party-shimming $ npx webpack asset main.js 549 KiB [emitted] (name: main) runtime modules 344 bytes 2 modules cacheable modules 528 KiB
./src/index.js 46 bytes [built] [code generated]
../../../../../node_modules/lodash/lodash.js 528 KiB [built] [code generated]
webpack 5.61.0 compiled successfully in 275 ms

还可以使用 ProvidePlugin 暴露出某个模块中单个导出，通过配置一个“数组路径” (例如 [module, child, ...children?] )实现此功能。所以，我们假想如下， 无论 join 方法在何处调用，我们都只会获取到 lodash 中提供的 join 方法。
src/index.js
webpack.config.js
       console.log(join(['hello', 'webpack'], ' '))
 const webpack = require('webpack') module.exports = {
mode: 'development', entry: './src/index.js',
plugins: [
new webpack.ProvidePlugin({
      // _: 'lodash'
      join: ['lodash', 'join'],
    })
] }
 这样就能很好的与 tree shaking 配合，将 lodash library 中的其余没有用到的导出 去除。
2.7.2 细粒度 Shimming
一些遗留模块依赖的 this 指向的是 window 对象。在接下来的用例中，调整我们
的 index.js :
当模块运行在 CommonJS 上下文中，这将会变成一个问题，也就是说此时的 this 指向的是 module.exports 。在这种情况下，你可以通过使用 imports-loader 覆 盖 this 指向:
       this.alert('hello webpack')
       const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') module.exports = {
mode: 'production', entry: './src/index.js',
module: {

2.7.3 全局 Exports
让我们假设，某个 library 创建出一个全局变量，它期望 consumer(使用者) 使用这
个变量。为此，我们可以在项目配置中，添加一个小模块来演示说明:
src/globals.js
  const file = 'example.txt'; const helpers = {
test: function () { console.log('test something')
  },
  parse: function () {
console.log('parse something') },
}
webpack.config.js
 rules: [ {
test: require.resolve('./src/index.js'),
use: 'imports-loader?wrapper=window', },
] },
plugins: [
new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new HtmlWebpackPlugin()
  ]
}
 const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') module.exports = {
mode: 'production', entry: './src/index.js',
  module: {
    rules: [
{
test: require.resolve('./src/index.js'),

 use: 'imports-loader?wrapper=window', },
{
test: require.resolve('./src/globals.js'), use: 'exports-loader?
type=commonjs&exports=file,multiple|helpers.parse|parse', },
] },
plugins: [
new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new HtmlWebpackPlugin()
  ]
}
   const {
  src/index.js
    @babel/polyfill
file, parse } = require('./globals.js');
      npm install --save @babel/polyfill
 import
 import '@babel/polyfill' console.log(Array.from([1, 2, 3], x => x + x))
  此时，在我们的 entry 入口文件中(即 )，可以使用 ，可以保证一切将顺利运行。
2.7.4 加载 Polyfills
目前为止，我们讨论的所有内容 都是处理那些遗留的 package，让我们进入到第二
个话题:polyfill。
有很多方法来加载 polyfill。例如，想要引入 我们只需如下操
作:
然后，使用 将其引入到我们的主 bundle 文件:
注意，这种方式优先考虑正确性，而不考虑 bundle 体积大小。为了安全和可靠， polyfill/shim 必须运行于所有其他代码之前，而且需要同步加载，或者说，需要在所 有 polyfill/shim 加载之后，再去加载所有应用程序代码。 社区中存在许多误解，即 现代浏览器“不需要”polyfill，或者 polyfill/shim 仅用于添加缺失功能 - 实际上，它们 通常用于修复损坏实现(repair broken implementation)，即使是在最现代的浏览 器中，也会出现这种情况。 因此，最佳实践仍然是，不加选择地和同步地加载所有 polyfill/shim，尽管这会导致额外的 bundle 体积成本。
  
2.7.5 进一步优化 Polyfills
不建议使用 import @babel/polyfilll 。因为这样做的缺点是会全局引入整个 polyfill包，比如 Array.from 会全局引入，不但包的体积大，而且还会污染全局环 境。
babel-preset-env package 通过 browserslist 来转译那些你浏览器中不支持的特 性。这个 preset 使用 useBuiltIns 选项，默认值是 false ，这种方式可以将全局
babel-polyfill 导入，改进为更细粒度的 import 格式:
安装 @babel/preset-env 及 相关的包
webpack.config.js
         import 'core-js/modules/es7.string.pad-start'; import 'core-js/modules/es7.string.pad-end'; import 'core-js/modules/web.timers';
import 'core-js/modules/web.immediate'; import 'core-js/modules/web.dom.iterable';
  npm i babel-loader @babel/core @babel/preset-env -D
 const HtmlWebpackPlugin = require('html-webpack-plugin') module.exports = {
mode: 'production', entry: './src/index.js', plugins: [
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
{
test: /\.js$/,
exclude: /node_modules/, use: {
loader: 'babel-loader', options: {
presets: [ [
'@babel/preset-env', {
                  targets: [
                    "last 1 version",
                    "> 1%",
  
useBuiltIns: 参数有 “entry”、”usage”、false 三个值
默认值是 false ，此参数决定了babel打包时如何处理@babel/polyfilll 语句。
“entry”: 会将文件中 import @babel/polyfilll 语句 结合 targets ，转换为一系 列引入语句，去掉目标浏览器已支持的 polyfilll 模块，不管代码里有没有用到，只要 目标浏览器不支持都会引入对应的 polyfilll 模块。
“usage”: 不需要手动在代码里写 import @babel/polyfilll ，打包时会自动根据 实际代码的使用情况，结合 targets 引入代码里实际用到部分 polyfilll 模块
false: 对 import‘@babel/polyfilll’不作任何处理，也不会自动引入 polyfilll 模块。 需要注意的是在 webpack 打包文件配置的 entry 中引入的 @babel/polyfill 不会根据
useBuiltIns 配置任何转换处理。 由于@babel/polyfill在7.4.0中被弃用，我们建议直接添加corejs并通过corejs选项设
置版本。
执行编译 npx webpack
    ],
                  useBuiltIns: 'usage'
                }
] ]
} }
} ]
} }
 [felix] 02-polyfill $ npx webpack
WARNING (@babel/preset-env): We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.
You should also be sure that the version you pass to the `corejs` option matches the version specified in your `package.json`'s `dependencies` section. If it doesn't, you need to run one of the following commands:

提示我们需要安装 core-js 。
此时还需要 添加一个配置:
  npm i core-js@3 -S
  npm install --save core-js@2 npm install --save core-js@3 yarn add core-js@2 yarn add core-js@3
More info about useBuiltIns: <https://babeljs.io/docs/en/babel>- preset-env#usebuiltins
More info about core-js: <https://babeljs.io/docs/en/babel-preset>- env#corejs
asset main.js 16.7 KiB [emitted] [minimized] (name: main) asset index.html 214 bytes [compared for emit]
runtime modules 663 bytes 3 modules
modules by path ./node_modules/core-js/modules/*.js 38.9 KiB 68 modules
./src/index.js 374 bytes [built] [code generated] webpack 5.61.0 compiled successfully in 1613 ms
 const HtmlWebpackPlugin = require('html-webpack-plugin') module.exports = {
mode: 'production', entry: './src/index.js', plugins: [
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
{
test: /\.js$/,
exclude: /node_modules/, use: {
loader: 'babel-loader', options: {
presets: [ [
'@babel/preset-env', {
                  targets: [
                    "last 1 version",
                    "> 1%",
                  ],
                  useBuiltIns: 'usage',

成功优化!

## 创建 library

除了打包应用程序，webpack 还可以用于打包 JavaScript library。
2.8.1 创建一个 library
假设我们正在编写一个名为 webpack-numbers 的小的 library，可以将数字 1 到 5
转换为文本表示，反之亦然，例如将 2 转换为 'two'。
使用 npm 初始化项目，然后安装 webpack ， webpack-cli 和 lodash :
我们将 lodash 安装为 devDependencies 而不是 dependencies ，因为我们不需 要将其打包到我们的库中，否则我们的库体积很容易变大。
src/ref.json
       npm i webpack webpack-cli lodash -D
    // 添加corejs配置
corejs: 3, }
] ]
} }
} ]
} }
 [ {
    "word": "One"
  },
  {
    "num": 2,
    "word": "Two"
}, {
"num": 3,
    "word": "Three"
  },
"num": 1,

src/index.js
 import _from 'lodash';
import numRef from './ref.json';
export function numToWord(num) { return_.reduce(
    numRef,
    (accum, ref) => {
return ref.num === num ? ref.word : accum; },
''
); }
export function wordToNum(word) { return _.reduce(
    numRef,
    (accum, ref) => {
return ref.word === word && word.toLowerCase() ? ref.num : accum;
},
-1 );
}
    {
    "num": 4,
    "word": "Four"
}, {
"num": 5,
    "word": "Five"
  },
  {
    "num": 0,
    "word": "Zero"
} ]
  
 const path = require('path');
module.exports = {
entry: './src/index.js', output: {
path: path.resolve(__dirname, 'dist'),
filename: 'webpack-numbers.js', },
};
    src/index.js
dist/webpack-
    numbers.js
  output.library
  const path = require('path');
module.exports = {
entry: './src/index.js', output: {
path: path.resolve(__dirname, 'dist'), filename: 'webpack-numbers.js', library: "webpackNumbers",
}, };
  webpackNumbers script
 <script src="https://example.org/webpack-numbers.js"></script> <script>
window.webpackNumbers.wordToNum('Five'); </script>
 2.8.2 Webpack 配置 我们可以从如下 webpack 基本配置开始:
webpack.config.js
 在上面的例子中，我们将通知 webpack 将 打包到 中。
2.8.3 导出 Library 到目前为止，一切都应该与打包应用程序一样，这里是不同的部分 - 我们需要通过
配置项暴露从入口导出的内容。
webpack.config.js
 我们暴露了 ，以便用户可以通过 标签使用。

 然而它只能通过被 script 标签引用而发挥作用，它不能运行在 CommonJS、AMD、 Node.js 等环境中。
作为一个库作者，我们希望它能够兼容不同的环境，也就是说，用户应该能够通过以 下方式使用打包后的库:
CommonJS module require:
AMD module require:
script tag:
  const webpackNumbers = require('webpack-numbers'); // ...
webpackNumbers.wordToNum('Two');
 require(['webpackNumbers'], function (webpackNumbers) { // ...
webpackNumbers.wordToNum('Two'); });
   <!DOCTYPE html>
<html>
...
<script src="https://example.org/webpack-numbers.js"> </script>
<script>
// ...
// Global variable webpackNumbers.wordToNum('Five');
// Property in the window object window.webpackNumbers.wordToNum('Five'); // ...
  </script>
</html>
我们更新 output.library 配置项，将其 type 设置为 'umd' :

 现在 webpack 将打包一个库，其可以与 CommonJS、AMD 以及 script 标签使用。 2.8.4 外部化 lodash
现在，如果执行 webpack ，你会发现创建了一个体积相当大的文件。如果你查看这 个文件，会看到 lodash 也被打包到代码中。在这种场景中，我们更倾向于把
lodash 当作 peerDependency 。也就是说，consumer(使用者) 应该已经安装过
lodash 。因此，你就可以放弃控制此外部 library ，而是将控制权让给使用 library 的 consumer。
这可以使用 externals 配置来完成: webpack.config.js
     const path = require('path');
module.exports = {
entry: './src/index.js', output: {
path: path.resolve(__dirname, 'dist'), filename: 'webpack-numbers.js', library: {
      name: 'webpackNumbers',
      type: 'umd',
    },
}, };
 const path = require('path');
module.exports = {
entry: './src/index.js', output: {
path: path.resolve(__dirname, 'dist'), filename: 'webpack-numbers.js', library: {
      name: "webpackNumbers",
      type: "umd"
    },
// 修补bug
    globalObject: 'globalThis',
  },
  externals: {
    lodash: {
commonjs: 'lodash',
  
这意味着你的 library 需要一个名为 lodash 的依赖，这个依赖在 consumer 环境中 必须存在且可用。
2.8.5 外部化限制 对于想要实现从一个依赖中调用多个文件的那些 library:
无法通过在 externals 中指定整个 library 的方式，将它们从 bundle 中排除。而 是需要逐个或者使用一个正则表达式，来排除它们。
  import A from 'library/one';
import B from 'library/two';
// ...
    module.exports = { //...
externals: [
'library/one',
'library/two',
// 匹配以 "library/" 开始的所有依赖 /^library\/.+$/,
], };
2.8.6 优化输出
为优化生产环境下的输出结果，我们还需要将生成 bundle 的文件路径，添加到
package.json 中的 main 字段中。 package.json
    {
}
...
"main": "dist/webpack-numbers.js", ...
       commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
}, },
};
  
 或者，按照这个 指南，将其添加为标准模块:
  {
}
...
"module": "src/index.js", ...
这里的 key(键) main 是参照 package.json 标准，而 module 是参照 一个提案， 此提案允许 JavaScript 生态系统升级使用 ES2015 模块，而不会破坏向后兼容性。
2.8.7 发布为 npm package
现在，你可以 将其发布为一个 npm package，并且在 unpkg.com 找到它，并分发
给你的用户。

## 模块联邦

2.9.1 什么是模块联邦
多个独立的构建可以组成一个应用程序，这些独立的构建之间不应该存在依赖关系， 因此可以单独开发和部署它们。
这通常被称作微前端，但并不仅限于此。
Webpack5 模块联邦让 Webpack 达到了线上 Runtime 的效果，让代码直接在项目
间利用 CDN 直接共享，不再需要本地安装 Npm 包、构建再发布了!
我们知道 Webpack 可以通过 DLL 或者 Externals 做代码共享时 Common Chunk， 但不同应用和项目间这个任务就变得困难了，我们几乎无法在项目之间做到按需热插 拔。
NPM 方式共享模块 想象一下正常的共享模块方式，对，就是 NPM。
如下图所示，正常的代码共享需要将依赖作为 Lib 安装到项目，进行 Webpack 打包 构建再上线，如下图:
img
对于项目 Home 与 Search，需要共享一个模块时，最常见的办法就是将其抽成通用
依赖并分别安装在各自项目中。
虽然 Monorepo 可以一定程度解决重复安装和修改困难的问题，但依然需要走本地 编译。

 UMD 方式共享模块
真正 Runtime 的方式可能是 UMD 方式共享代码模块，即将模块用 Webpack UMD
模式打包，并输出到其他项目中。这是非常普遍的模块共享方式:
img
对于项目 Home 与 Search，直接利用 UMD 包复用一个模块。但这种技术方案问题
也很明显，就是包体积无法达到本地编译时的优化效果，且库之间容易冲突。
微前端方式共享模块
微前端:micro-frontends (MFE) 也是最近比较火的模块共享管理方式，微前端就是 要解决多项目并存问题，多项目并存的最大问题就是模块共享，不能有冲突。
img
由于微前端还要考虑样式冲突、生命周期管理，所以本文只聚焦在资源加载方式上。 微前端一般有两种打包方式:

1. 子应用独立打包，模块更解耦，但无法抽取公共依赖等。
2. 整体应用一起打包，很好解决上面的问题，但打包速度实在是太慢了，不具备水
平扩展能力。
模块联邦方式
终于提到本文的主角了，作为 Webpack5 内置核心特性之一的 Federated Module:
img
从图中可以看到，这个方案是直接将一个应用的包应用于另一个应用，同时具备整体 应用一起打包的公共依赖抽取能力。
2.9.2 应用案例
本案例模拟三个应用:Nav、Search 及 Home。每个应用都是独立的，又通过模块
联邦联系到了一起。
1、Nav 导航 src/header.js

  src/index.js
webpack.config.js
  import Header from './Header'
const div = document.createElement('div') div.appendChild(Header()) document.body.appendChild(div)
  const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  ModuleFederationPlugin
} = require('webpack').container
module.exports = {
mode: 'production', entry: './src/index.js', plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
// 模块联邦名字
name: 'nav',
// 外部访问的资源名字 filename: 'remoteEntry.js', // 引用的外部资源列表
remotes: {},
// 暴露给外部资源列表
exposes: {
'./Header': './src/Header.js', },
// 共享模块，如lodash
      shared: {},
    }),
] }
const Header = () => {
const header = document.createElement('h1') header.textContent = '公共头部内容'
return header
}
export default Header

应用 webpack 运行服务:
  [felix] nav $ npx webpack serve --port 3003
2、Home 首页 src/HomeList
 const HomeList = (num) => {
  let str = '<ul>'
  for (let i = 0; i < num; i++) {
    str += '<li>item ' + i + '</li>'
  }
  str += '</ul>'
return str }
export default HomeList
 src/index.js
  import HomeList from './HomeList' import('nav/Header').then((Header) => {
const body = document.createElement('div') body.appendChild(Header.default()) document.body.appendChild(body) document.body.innerHTML += HomeList(5)
})
webpack.config.js
 const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  ModuleFederationPlugin
} = require('webpack').container
module.exports = {
mode: 'production', entry: './src/index.js', plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
name: "home",
filename: "remoteEntry.js",
  
应用 webpack 运行服务:
3、search 搜索 src/index
  [felix] nav $ npx webpack serve --port 3001
  Promise.all([import('nav/Header'), import('home/HomeList')]) .then(([{
    default: Header
  }, {
    default: HomeList
  }]) => {
document.body.appendChild(Header())
document.body.innerHTML += HomeList(4) })
webpack.config.js
 remotes: {
nav: "nav@<http://localhost:3003/remoteEntry.js>",
}, exposes: {
'./HomeList': './src/HomeList.js', },
      shared: {},
    }),
] }
 const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  ModuleFederationPlugin
} = require('webpack').container
module.exports = {
mode: 'production', entry: './src/index.js', plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
name: 'search',
filename: 'remoteEntry.js',

应用 webpack 运行服务:

## 提升构建性能

2.10.1 通用环境
无论你是在 开发环境 还是在 生产环境 下运行构建脚本，以下最佳实践都会有所帮 助。
1、更新到最新版本
使用最新的 webpack 版本。我们会经常进行性能优化。webpack 的最新稳定版本
是:
将 Node.js 更新到最新版本，也有助于提高性能。除此之外，将你的 package 管理 工具(例如 npm 或者 yarn )更新到最新版本，也有助于提高性能。较新的版本能 够建立更高效的模块树以及提高解析速度。
2、loader
将 loader 应用于最少数量的必要模块。而非如下:
  [felix] nav $ npx webpack serve --port 3002
     remotes: {
nav: "nav@<http://localhost:3003/remoteEntry.js>", home: "home@<http://localhost:3001/remoteEntry.js>"
      },
      exposes: {},
      shared: {},
}), ]
}
  
  通过使用 include 字段，仅将 loader 应用在实际需要将其转换的模块:
  const path = require('path');
module.exports = { //...
  module: {
    rules: [
{
test: /\.js$/,
include: path.resolve(__dirname, 'src'), loader: 'babel-loader',
}, ],
}, };
 3、引导(bootstrap)
每个额外的 loader/plugin 都有其启动时间。尽量少地使用工具。 4、解析
以下步骤可以提高解析速度:
减少 resolve.modules , resolve.extensions , resolve.mainFiles , resolve.descriptionFiles 中条目数量，因为他们会增加文件系统调用的次
数。
如果你不使用 symlinks(例如 npm link 或者 yarn link )，可以设置
resolve.symlinks: false 。
如果你使用自定义 resolve plugin 规则，并且没有指定 context 上下文，可以设 置 resolve.cacheWithContext: false 。
        module.exports = { //...
  module: {
    rules: [
{
test: /\.js$/,
loader: 'babel-loader',
}, ],
}, };

 5、小即是快(smaller = faster) 减少编译结果的整体大小，以提高构建性能。尽量保持 chunk 体积小。
使用数量更少/体积更小的 library。
在多页面应用程序中使用 SplitChunksPlugin 。 在多页面应用程序中使用 SplitChunksPlugin ，并开启 async 模式。 移除未引用代码。
只编译你当前正在开发的那些代码。
6、持久化缓存
在 webpack 配置中使用 cache 选项。使用 package.json 中的 "postinstall"
清除缓存目录。
将 cache 类型设置为内存或者文件系统。 memory 选项很简单，它告诉 webpack 在内存中存储缓存，不允许额外的配置:
webpack.config.js
          module.exports = { //...
  cache: {
    type: 'memory',
}, };
7、自定义 plugin/loader
对它们进行概要分析，以免在此处引入性能问题。
8、dll
使用 DllPlugin 为更改不频繁的代码生成单独的编译结果。这可以提高应用程序的 编译速度，尽管它增加了构建过程的复杂度。
9、worker 池(worker pool)
thread-loader 可以将非常消耗资源的 loader 分流给一个 worker pool。
不要使用太多的 worker，因为 Node.js 的 runtime 和 loader 都有启动开销。 最小化 worker 和 main process(主进程) 之间的模块传输。进程间通讯(IPC, inter process communication)是非常消耗资源的。
10、Progress plugin
将 ProgressPlugin 从 webpack 中删除，可以缩短构建时间。请注意， ProgressPlugin 可能不会为快速构建提供太多价值，因此，请权衡利弊再使用。

 2.10.2 开发环境
以下步骤对于 特别有帮助。
1、增量编译
使用 webpack 的 watch mode(监听模式)。而不使用其他工具来 watch 文件和调用 webpack 。内置的 watch mode 会记录时间戳并将此信息传递给 compilation 以使 缓存失效。
在某些配置环境中，watch mode 会回退到 poll mode(轮询模式)。监听许多文件会 导致 CPU 大量负载。在这些情况下，可以使用 watchOptions.poll 来增加轮询的 间隔时间。
2、在内存中编译
下面几个工具通过在内存中(而不是写入磁盘)编译和 serve 资源来提高性能:
webpack-dev-server webpack-hot-middleware webpack-dev-middleware
3、stats.toJson 加速
webpack 4 默认使用 stats.toJson() 输出大量数据。除非在增量步骤中做必要的 统计，否则请避免获取 stats 对象的部分内容。 webpack-dev-server 在 v3.1.3 以 后的版本，包含一个重要的性能修复，即最小化每个增量构建步骤中，从 stats 对 象获取的数据量。
4、Devtool
需要注意的是不同的 devtool 设置，会导致性能差异。
"eval" 具有最好的性能，但并不能帮助你转译代码。
如果你能接受稍差一些的 map 质量，可以使用 cheap-source-map 变体配置来 提高性能
使用 eval-source-map 变体配置进行增量编译。
在大多数情况下，最佳选择是 eval-cheap-module-source-map 。
5、避免在生产环境下才会用到的工具
某些 utility, plugin 和 loader 都只用于生产环境。例如，在开发环境下使用 TerserPlugin 来 minify(压缩) 和 mangle(混淆破坏) 代码是没有意义的。通常在开
发环境下，应该排除以下这些工具:
TerserPlugin
[fullhash] / [chunkhash] / [contenthash]
                  境环发开

      AggressiveSplittingPlugin
    AggressiveMergingPlugin
    ModuleConcatenationPlugin
6、最小化 entry chunk
Webpack 只会在文件系统中输出已经更新的 chunk。某些配置选项(HMR, output.chunkFilename 的 [name]/[chunkhash]/[contenthash]， [fullhash] )来说，除了对已经更新的 chunk 无效之外，对于 entry chunk 也不
会生效。
确保在生成 entry chunk 时，尽量减少其体积以提高性能。下面的配置为运行时代码
创建了一个额外的 chunk，所以它的生成代价较低:
       module.exports = { // ...
  optimization: {
    runtimeChunk: true,
}, };
 7、避免额外的优化步骤
Webpack 通过执行额外的算法任务，来优化输出结果的体积和加载性能。这些优化
适用于小型代码库，但是在大型代码库中却非常耗费性能:
  module.exports = { // ...
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
}, };
8、输出结果不携带路径信息
Webpack 会在输出的 bundle 中生成路径信息。然而，在打包数千个模块的项目 中，这会导致造成垃圾回收性能压力。在 options.output.pathinfo 设置中关 闭:

  9、Node.js 版本 8.9.10-9.11.1
Node.js v8.9.10 - v9.11.1 中的 ES2015 Map 和 Set 实现，存在 性能回退。
Webpack 大量地使用这些数据结构，因此这次回退也会影响编译时间。 之前和之后的 Node.js 版本不受影响。
10、TypeScript loader
你可以为 loader 传入 transpileOnly 选项，以缩短使用 ts-loader 时的构建时 间。使用此选项，会关闭类型检查。如果要再次开启类型检查，请使用
ForkTsCheckerWebpackPlugin 。使用此插件会将检查过程移至单独的进程，可以 加快 TypeScript 的类型检查和 ESLint 插入的速度。
       module.exports = { // ...
test: /\.tsx?$/, use: [
{
loader: 'ts-loader', options: {
        transpileOnly: true,
      },
}, ],
};
2.10.3 生产环境
以下步骤对于 特别有帮助。
Source Maps
source map 相当消耗资源。你真的需要它们?

--本篇完--
