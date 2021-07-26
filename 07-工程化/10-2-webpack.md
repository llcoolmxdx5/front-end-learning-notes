# webpack

## 起步

```bash
npm init -y # 初始化项目
yarn add webpack webpack-cli -D # 添加webpack依赖
yarn add webpack-dev-server -D # webpack开发热更新
yarn add html-webpack-plugin -D # 将编译出来的js文件注入到模板文件
yarn add css-loader style-loader -D # cssloader
yarn add sass-loader node-sass -D # 处理sass
yarn add mini-css-extract-plugin -D # 处理sass
yarn add copy-webpack-plugin -D # 文件复制
yarn add string-loader -D # 处理html
```

## npm 脚本配置

"dev": "webpack-dev-server --open --config webpack.config.js",
"build": "webpack --progress --hide-modules --config webpack.prod.config.js"

## webpack 配置

```js
// webpack.config.js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");
const copyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development", // 'production'
  entry: {
    index: "./src/index.js",
    detail: "./src/detail.js",
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: '/dist/'
  },
  devServer: {
    open: true,
    port: 9099,
    proxy: {
      "/api": {
        target: "http://localhost:9099",
        pathRewrite: { "^/api": "" },
      },
    },
  },
  module: {
    rules: [
      { test: /\.html$/, loader: "string-loader" }, // 处理html
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 'style-loader', // 注入到页面中
          MiniCssExtractPlugin.loader, // 提取为css文件
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      // 将编译出来的js文件注入到模板文件
      title: "首页",
      filename: "index.html",
      // <%= htmlWebpackPlugin.options.title %> 在index.html中配置title
      // <%= htmlWebpackPlugin.options.util %> 将utils.js注入index.html中
      template: "./src/index.html",
      util: fs.readFileSync("./src/util.js"),
      chunks: ["index"],
    }),
    new htmlWebpackPlugin({
      // 将编译出来的js文件注入到模板文件
      title: "详情页",
      filename: "detail.html",
      template: "./src/detail.html",
      chunks: ["detail"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
    new copyPlugin([
      {
        // 复制文件
        from: "./src/static/",
        to: "./static/",
      },
    ]),
  ],
};
```
