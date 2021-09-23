# gulp

## 初始化

```bash
npm init -y # 初始化工程，生成Package.json
yarn add gulp -D # 启动server ,打开浏览器
yarn add gulp-webserver -D
yarn add node-sass gulp-sass -D # 编译scss文件
yarn add gulp-concat -D # 文件合并
yarn add webpack-stream -D # 编译js文件
yarn add babel-loader @babel/core @babel/preset-env webpack -D # 转译e6 es7 代码转成es5
yarn add @babel/plugin-transform-runtime @babel/runtime -D
yarn add string-loader -D # 把html转成字符串
yarn add gulp-rev -D # 基于文件内容，生成带hash值得文件名字
yarn add gulp-rev-collector -D # 把带hash值的文件名，替换到模板里面（1：生成映射关系的json文件，2：依据json文件替换模板里面的引用）
```

## npm 脚本

yarn add json-server -g
json-server --watch ./mock/db.json
json-server ./mock/mock.js --routes ./mock/routes.json --port 9090

"build": "gulp -f gulpfile.prod.js",
"dev": "gulp -f gulpfile.dev.js",
"mock": "json-server ./mock/mock.js --routes ./mock/routes.json --port 9099"

## dev 配置

```js
// gulpfile.dev.js
const { series, parallel, src, dest, watch } = require("gulp");
// const gulp = require('gulp')
const gulpServer = require("gulp-webserver");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const webpackStream = require("webpack-stream");
const path = require("path");
const proxy = require("http-proxy-middleware");
const del = require("del"); // yarn add del -D

function copyHtml() {
  return src("./src/views/*.html").pipe(dest("./dev/"));
}
function copyImages() {
  return src("./src/images/*.*").pipe(dest("./dev/images/"));
}
function compileCSS() {
  return src(["./src/style/*.scss", "!./src/style/detail.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("all.css"))
    .pipe(dest("./dev/style/"));
}
function detailCompileCss() {
  return src(["./src/style/detail.scss", "./src/style/reset.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("detail.css"))
    .pipe(dest("./dev/style/"));
}
function compileJS() {
  return src("./src/js/index.js")
    .pipe(
      webpackStream({
        mode: "development",
        devtool: "inline-source-map",
        entry: {
          index: "./src/js/index.js",
          detail: "./src/js/detail.js",
        },
        output: {
          path: path.resolve(__dirname, "./dev/js/"), //目录
          filename: "[name].min.js", //文件名,
        },
        module: {
          rules: [
            {
              test: /\.js$/, //匹配js文件
              exclude: /(node_modules)/, //排除文件
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                  plugins: ["@babel/plugin-transform-runtime"],
                },
              },
            },
            { test: /\.html$/, loader: "string-loader" },
          ],
        },
      })
    )
    .pipe(dest("./dev/js/"));
}
function startServer() {
  // 生产模式不需要
  return src("./dev/").pipe(
    gulpServer({
      port: 9090,
      host: "0.0.0.0",
      livereload: true, // 是否支持热更新
      //directoryListing: true, // 是否展示文件夹列表
      open: true, // 打开浏览器
      middleware: [
        proxy("/fetch", {
          // target: 'http://localhost:9099/',
          target: "https://m.lagou.com/",
          changeOrigin: true, // 是否支持跨域
          pathRewrite: {
            // 路径重写
            "^/fetch": "",
          },
        }),
      ],
    })
  );
}
//监控文件的变化，当文件有变化时，同步到dev目录
function watchFile() {
  // 生产模式不需要
  watch("./src/**/*.js", (cb) => {
    compileJS();
    cb();
  });
  watch("./src/style/*.scss", (cb) => {
    compileCSS();
    cb();
  });
  watch("./src/views/**/*.html", (cb) => {
    copyHtml();
    compileJS();
    cb();
  });
}
function copyLibs() {
  return src("./src/libs/*.*").pipe(dest("./dev/libs/"));
}
function remove() {
  return del(["./dev/"]);
}
exports.default = series(
  remove,
  parallel(
    copyHtml,
    copyImages,
    copyLibs,
    compileJS,
    compileCSS,
    detailCompileCss
  ),
  startServer,
  watchFile
);
```

## prod 配置

```js
const { series, parallel, src, dest, watch } = require("gulp");
const gulpServer = require("gulp-webserver");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const webpackStream = require("webpack-stream");
const path = require("path");
const del = require("del");
const rev = require("gulp-rev");
const revCol = require("gulp-rev-collector");

function copyHtml() {
  return src("./src/views/*.html").pipe(dest("./dist/"));
}
function copyImages() {
  return src("./src/images/*.*").pipe(dest("./dist/images/"));
}
function compileCSS() {
  return src(["./src/style/*.scss", "!./src/style/detail.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("all.css"))
    .pipe(rev())
    .pipe(dest("./dist/style/"))
    .pipe(rev.manifest("css-index-manifest.json"))
    .pipe(dest("./rev/"));
}
function detailCompileCss() {
  return src(["./src/style/detail.scss", "./src/style/reset.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("detail.css"))
    .pipe(rev())
    .pipe(dest("./dist/style/"))
    .pipe(rev.manifest("css-detail-manifest.json"))
    .pipe(dest("./rev/"));
}
function compileJS() {
  return src("./src/js/index.js")
    .pipe(
      webpackStream({
        mode: "production",
        devtool: "inline-source-map",
        entry: {
          index: "./src/js/index.js",
          detail: "./src/js/detail.js",
        },
        output: {
          path: path.resolve(__dirname, "./dev/js/"),
          filename: "[name]-min.js",
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                  plugins: ["@babel/plugin-transform-runtime"],
                },
              },
            },
            { test: /\.html$/, loader: "string-loader" },
          ],
        },
      })
    )
    .pipe(rev())
    .pipe(dest("./dist/js/"))
    .pipe(rev.manifest("js-rev-manifest.json"))
    .pipe(dest("./rev/"));
}
function copyLibs() {
  return src("./src/libs/*.*").pipe(dest("./dist/libs/"));
}
function remove() {
  return del(["./dist/"]);
}
function revCollector() {
  return src(["./rev/*.json", "./dist/*.html"])
    .pipe(revCol())
    .pipe(dest("./dist/"));
}
exports.default = series(
  remove,
  parallel(
    copyHtml,
    copyImages,
    copyLibs,
    compileJS,
    compileCSS,
    detailCompileCss
  ),
  revCollector
);
```

## 什么是 Gulp

Gulp 是一个自动化工具，前端开发者可以使用它来处理常见任务：

- 搭建 web 服务器
- 文件保存时自动重载浏览器
- 使用预处理器如 Sass、LESS
- 优化资源，比如压缩 CSS、JavaScript、压缩图片

## gulp 的安装

- npm 初始化，新建 package.json
  npm init -y
- 先安装全局
  npm install gulp -g
- 再需要在当前项目中安装
  npm install gulp
- 装两遍是为了版本的灵活性

## 开始使用 Gulp

在根目录下新建 gulpfile.js 文件

这个文件就是配置运行文件。我们先尝试写一个最简单的内容

```js
var gulp = require("gulp");
gulp.task("init", function () {
  console.log("init");
});
```

1. require 就是讲刚才下载的 gulp 模块加载导入进来
2. gulp 下有一个方法 task 用来定义任务，第一个参数是任务名，第二个参数是任务执行后的执行函数
3. 在命令行输入 gulp init 这个 init 就是刚才起的任务名，执行后就会执行函数，打印出 init

## Gulp 的方法

- gulp 工作方式

  gulp 实际工作是使用 nodejs 中的 stream 来处理的，简单来说，如果需要合并两个文件，就需要讲两个文件都加载进来，然后再处理将文件合并，注意这里加载进来的文件并不是文本形式加载，而是以二进制数据流的方式，也就是 steam 加载进入。被加载进入的文件是以二进制数据流模式存在的，内容中除了含有文件内容，还包括了文件的地址，文件名等等一系列相关信息。然后再将所有的数据流处理生产新文件。因此这里就用到了 nodejs 中 stream 的方法 pipe

  pipe

  - 管道，流向的意思，可以在这里理解为写入到
  - a.pipe(b) 将 a 写入到 b 中

- src 方法

  读取文件的数据流

  - gulp.src(globs)
  - globs 参数是读取文件的筛选条件，可以写入字符串，也可以是数组，数组含有多个读取条件
    - gulp.src("js/a.js") 读取一个文件
    - gulp.src(["js/a.js","js/b.js"]) 读取两个文件
    - gulp.src("js/\*.js") js 文件夹下所有的 js 文件
  - 匹配条件

    - `*` 匹配文件路径中的 0 个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾
    - `**` 匹配路径中的 0 个或多个目录及其子目录,需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件。也就是能匹配某个目录下所有文件包括其子目录下的所有内容
    - `?` 匹配文件路径中的一个字符(不会匹配路径分隔符)
    - `[...]` 匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个，类似 js 正则表达式中的用法
    - `!(pattern|pattern|pattern)` 匹配任何与括号中给定的任一模式都不匹配的
    - `?(pattern|pattern|pattern)` 匹配括号中给定的任一模式 0 次或 1 次，类似于 js 正则中的`(pattern|pattern|pattern)?`
    - `+(pattern|pattern|pattern)` 匹配括号中给定的任一模式至少 1 次，类似于 js 正则中的`(pattern|pattern|pattern)+`
    - `*(pattern|pattern|pattern)` 匹配括号中给定的任一模式 0 次或多次，类似于 js 正则中的`(pattern|pattern|pattern)*`
    - `@(pattern|pattern|pattern)` 匹配括号中给定的任一模式 1 次，类似于 js 正则中的`(pattern|pattern|pattern)`

- dest 方法

  给文件写入数据流 `gulp.dest(path)` path 参数是要写入文件存放的路径

  ```js
  gulp.task("init", function () {
    gulp.src("./js/*.js").pipe(gulp.dest("./dist/"));
  });
  ```

  这样就会将当前目录下，js 文件夹下所有的 js 读入，然后写入到当前目录的 dist 文件夹下
  用 gulp.dest()把文件流写入文件后，文件流仍然可以继续使用。

- task 方法:定义任务

  如果需要有多个任务操作时就需要定义任务

  gulp.task(任务名,任务所依赖前面任务名的数组,任务执行的函数);

  ```js
  gulp.task("default", function () {
    console.log("aaa");
  });
  ```

  这是默认执行，执行 gulp 就可以，无需输入任务名

  ```js
  gulp.task("one", function () {
    console.log("one");
  });
  gulp.task("two", ["one"], function () {
    console.log("two");
  });
  ```

  如果执行 gulp two 这时候就会先执行任务 one，再执行任务 two

- watch 方法:监视文件变化

  `gulp.watch("监视的文件",[监视文件发生变化后需要执行任务名的数组])`

  ```js
  gulp.task("default", function () {
    gulp.watch("js/*.js", function (event) {
      console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
      console.log(event.path); //变化的文件的路径
    });
  });
  ```

  这里启动任务后，会开始监视，如果 js 文件夹下那个文件修改了，或者删除，增加，这里都会打印出来

## Gulp4

在 gulp4 中所有的前置任务都被修改了，例如 task 中的数组不再使用，改为 series 和 parallel

- series

  前置任务完成后，执行下一个任务，同步执行

  - 回调函数法

    ```js
    gulp.task("js", function (done) {
      gulp
        .src("./src/**/*.js")
        .pipe(
          load.babel({
            presets: ["@babel/env"],
          })
        )
        .pipe(gulp.dest("./dist"));
      done();
    });
    gulp.task(
      "save",
      gulp.series("js", function () {
        console.log("aaaa");
        gulp
          .src("./dist/**/*.js")
          .pipe(load.concat("main.min.js"))
          .pipe(load.uglify())
          .pipe(gulp.dest("./dist"));
      })
    );
    ```

    注意上面的 done，在函数中有参数 done，当完成当前任务内容后执行回调函数 done，以为这后续任务 save 中的 function 函数被执行，会打印 aaaa，如果不执行 done，不会执行后续任务

  - promise 法

    ```js
    gulp.task("js", function () {
      return new Promise(function (res, rej) {
        gulp
          .src("./src/**/*.js")
          .pipe(
            load.babel({
              presets: ["@babel/env"],
            })
          )
          .pipe(gulp.dest("./dist"));
        res();
      });
    });
    gulp.task(
      "save",
      gulp.series("js", function () {
        console.log("aaaa");
        gulp
          .src("./dist/**/*.js")
          .pipe(load.concat("main.min.js"))
          .pipe(load.uglify())
          .pipe(gulp.dest("./dist"));
      })
    );
    ```

    上面这种 promise 写法，通过 return promise，在执行完成任务后，执行其中的 res，执行后续 save 任务中的函数方法，打印 aaaa

  - 事件完成操作后回调

    以上的案例是 js 任务解决了 ES6 转换 ES5，任务 save 重新获取转换好的 js 文件合并压缩后存储为 main.min.js。但是使用上面两个方法后，我们发现后面没有合并存储，原因是什么呢？上面的两种写法在任务中标识完成了，但是不代表操作就完成了，js 任务最后存储是需要时间的，但是当开始存储时就已经执行了后续的任务，显然在后续任务中不能找到这个被转换后的文件。那么我们应该通过什么操作，这里我们需要等待上面内容完成后才可以操作后续内容

    ```js
    gulp.task("js", function (done) {
      gulp
        .src("./src/**/*.js")
        .pipe(
          load.babel({
            presets: ["@babel/env"],
          })
        )
        .pipe(gulp.dest("./dist"))
        .on("end", done);
    });
    gulp.task(
      "save",
      gulp.series("js", function () {
        console.log("aaaa");
        gulp
          .src("./dist/**/*.js")
          .pipe(load.concat("main.min.js"))
          .pipe(load.uglify())
          .pipe(gulp.dest("./dist"));
      })
    );
    ```

    通过事件 end 判断完成存储后再继续执行后续任务

- parallel

  前置任务和当前任务一同执行

  ```js
  gulp.task("js", function () {
    gulp
      .src("./src/**/*.js")
      .pipe(
        load.babel({
          presets: ["@babel/env"],
        })
      )
      .pipe(gulp.dest("./dist"));
  });
  gulp.task(
    "save",
    gulp.parallel("js", function () {
      console.log("aaaa");
      gulp
        .src("./js/**/*.js")
        .pipe(load.concat("main.min.js"))
        .pipe(load.uglify())
        .pipe(gulp.dest("./dist"));
    })
  );
  ```

  这个任务中，使用了 parallel 在处理任务中是并行的，可以看到后续任务并不需要依赖 js 任务完成而执行，是在于 js 任务同时开始的，因此，js 任务也不需要执行回调函数或者 promise

## 一些常用的 gulp 插件

- 自动加载插件

  gulp-load-plugins

  `npm install --save-dev gulp-load-plugins`

  在 gulpfile 中如果需要使用别的插件，导入方法我们使用 require。那么如果需要加载很多就会出现这种情况

  ```js
  var gulp = require("gulp"),
    //一些gulp插件,abcd这些命名只是用来举个例子
    a = require("gulp-a"),
    b = require("gulp-b"),
    c = require("gulp-c"),
    d = require("gulp-d"),
    e = require("gulp-e"),
    f = require("gulp-f"),
    g = require("gulp-g"),
    //更多的插件...
    z = require("gulp-z");
  ```

  我们可以这样做：

  安装并导入 gulp-load-plugins
  在 package.json 的 devDependencies 中写下需要加载的插件，这个是开发依赖

  ```js
  var load = require("gulp-load-plugins")();
  load.rename("a.js"); // 这里的rename就是一个插件，这插件叫gulp-rename
  ```

- 压缩文件

  gulp-uglify

  `npm install --save-dev gulp-uglify`

  可以将文件中的空格去除

  ```js
  gulp.task("default", function () {
    gulp.src("./js/a.js").pipe(uglify()).pipe(gulp.dest("./dist"));
  });
  ```

- 重命名

  gulp-rename

  `npm install --save-dev gulp-rename`

  可以重新给文件起名

  ```js
  gulp.task("rename", function () {
    gulp
      .src("js/jquery.js")
      .pipe(uglify()) //压缩
      .pipe(rename("jquery.min.js")) //会将jquery.js重命名为jquery.min.js
      .pipe(gulp.dest("js"));
  });
  ```

- css 文件压缩

  gulp-minify-css

  `npm install --save-dev gulp-minify-css`

  ```js
  var gulp = require('gulp'),
  var minifyCss = require("gulp-minify-css");
  gulp.task('minify-css', function () {
      gulp.src('css/*.css') // 要压缩的css文件
      .pipe(minifyCss()) //压缩css
      .pipe(gulp.dest('dist/css'));
  });
  ```

- html 文件压缩

  gulp-minify-html

  `npm install --save-dev gulp-minify-html`

  ```js
  var gulp = require('gulp'),
  var minifyHtml = require("gulp-minify-html");
  gulp.task('minify-html', function () {
      gulp.src('html/*.html') // 要压缩的html文件
      .pipe(minifyHtml()) //压缩
      .pipe(gulp.dest('dist/html'));
  });
  ```

- 文件合并

  gulp-concat

  `npm install --save-dev gulp-concat`

  ```js
  var gulp = require('gulp'),
  var concat = require("gulp-concat");
  gulp.task('concat', function () {
      gulp.src('js/*.js')  //要合并的文件
      .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
      .pipe(gulp.dest('dist/js'));
  });
  ```

- sass 解析

  gulp-sass

  `npm install --save-dev gulp-sass`

  ```js
  var gulp = require('gulp'),
  var sass = require("gulp-sass");
  gulp.task('compile-sass', function () {
      gulp.src('sass/*.sass')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'));
  });
  ```

- 图片压缩

  gulp-imagemin

  `npm install --save-dev gulp-imagemin`

  ```js
  var gulp = require("gulp");
  var imagemin = require("gulp-imagemin");
  gulp.task("default", function () {
    gulp.src("src/images/*").pipe(imagemin()).pipe(gulp.dest("dist/images"));
  });
  ```

- 静态服务器搭建

  ```js
  var gulp = require("gulp");
  var load = require("gulp-load-plugins")();
  var browser = require("browser-sync").create();
  gulp.task("save", function (done) {
    gulp
      .src("./src/**/*.js")
      .pipe(
        load.babel({
          presets: ["@babel/env"],
        })
      )
      .pipe(load.concat("main.min.js"))
      .pipe(load.uglify())
      .pipe(gulp.dest("./dist"))
      .on("end", browser.reload);
  });
  gulp.task("server", function () {
    browser.init({
      server: "./",
      port: 3009,
    });
    gulp.watch("./src/**/*.js", gulp.series("save"));
  });
  ```

  browser-sync 是静态服务器，create()开启创建

  使用 browser.init 创建服务位置和端口

  使用 gulp.watch 做监听，并且重新执行 js 的合并压缩打包等处理，最后当存储完成后，刷新网页 browser.reload 是重载页面
