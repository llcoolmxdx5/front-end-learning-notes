# npm

## 什么是 npm

NPM（node package manager），通常称为 node 包管理器。顾名思义，它的主要功能就是管理 node 包，包括：安装、卸载、更新、查看、搜索、发布等。
npm 的背后，是基于 couchdb 的一个数据库，详细记录了每个包的信息，包括作者、版本、依赖、授权信息等。它的一个很重要的作用就是：将开发者从繁琐的包管理工作（版本、依赖等）中解放出来，更加专注于功能的开发。

[npm 官网](https://npmjs.org/)

## 查看版本

npm -v

## 升级 NPM 旧版本

npm install npm -g

## 淘宝镜像

`npm install -g cnpm --registry=https://registry.npm.taobao.org`
安装好淘宝镜像，以后可以使用 cnpm 来安装模块了

## 生成 JSON 配置文件

- npm init

  这个配置文件以后我们使用 webpack 打包用的配置文件

- -y 跳过所有提问

- packer name

  包名

- version

  版本

- description

  描述

- main

  入口文件

- scripts

  支持的脚本，默认是一个空的 test

- keywords

  关键字，有助于在人们使用 npm search 搜索时发现你的项目

- author

  作者

- license:

  版权许可证（默认：ISC）

- dependencies

  在生产环境中需要用到的依赖

- devDependencies

  在开发、测试环境中用到的依赖

## 查看当前安装的树形模块

npm list

## 安装包

- npm install
- npm i
  这是 npm install 的简写形式
- npm install 包名@latest
- npm install 包名@0.1.1
- npm install 包名 -global
  全局安装，任何一个项目都可以访问到
  可以使用简写 -g
- npm install 包名 --save
  添加到 dependencies（项目依赖）
  项目上线时候需要用到的包
  简写可以使用 -S （简写必须是大写）
- npm install 包名 --save-dev
  添加到 devDependencies（开发依赖）
  开发代码时使用的包，例如测试，验证等使用的模块和包
  简写可以使用 -D （简写必须大写）

## 更新模块

- npm update 包名
  这是更新到最新版本（npm update 只更新顶层模块）
- npm install 包名@版本号
  我们一般使用这个来更新

## 删除模块

- npm uninstall 包名
- npm uninstall 包名 -g
  删除全局安装的模块
- npm uninstall 包名 --save 或者 npm uninstall 包名 -S
  删除项目依赖的模块
- npm uninstall 包名 --save-dev 或者 npm uninstall 包名 -D
  删除开发依赖的模块

## 执行脚本

npm run 指令

```js
{
    "name": "myproject",
    "devDependencies": {
        "jshint": "latest",
        "browserify": "latest",
        "mocha": "latest"
    },
    "scripts": {
        "dev": "node server.js",
        "lint": "eslint **.js",
        "test": "mocha test/"
    }
}
```

不能使用 node 等关键字

值必须用双引号引起来

使用时，直接使用 npm run dev

lint 一般用来代码校验格式
使用时必须先安装 eslint

test 一般用来代码测试
使用时必须先安装 mocha

## 清除缓存数据

npm cache verify

-4048

## 重设代理

- 错误内容
  ECONNREFUSED
  一直连接不上
- 察看代理
  npm config get proxy
  npm config get https-proxy
  如果不是 null
- 设置代理
  npm config set proxy null
  npm config set https-proxy null
- 设置淘宝镜像
  `npm config set registry https://registry.npm.taobao.org`
