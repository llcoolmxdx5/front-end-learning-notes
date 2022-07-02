# Rust 是 JS 基建的未来

[Rust Is The Future of JavaScript Infrastructure](https://leerob.io/blog/rust) 这篇文章讲述了 Rust 正在 JS 基建圈流行的事实：[Webpack](https://github.com/webpack/webpack)、[Babel](https://github.com/babel/babel)、[Terser](https://github.com/terser/terser)、[Prettier](https://github.com/prettier/prettier)、[ESLint](https://github.com/eslint/eslint) 这些前些年才流行起来的工具都已有了 Rust 替代方案，且性能有着 10 ～ 100 倍的提升。

前端基建的迭代浪潮从未停歇，当上面这些工具给 Gulp、js-beautify、tslint 等工具盖上棺材盖时，基于 Rust 的新一代构建工具已经悄悄将棺材盖悬挂在 webpack、babel、prettier、terser、eslint 它们头上，不知道哪天就会盖上。

原文已经有了不错的 [中文翻译](https://mp.weixin.qq.com/s?__biz=MzkxNDIzNTg4MA==&mid=2247485792&idx=1&sn=682a4dee7ce4d3b47a81baf9ebd7a98a&chksm=c170c1e7f60748f17585d6bfca0cff6edbf71bab95f0a4a1ea0bcf2d43c16d1722666d9fadc1&token=1766743281&lang=zh_CN#rd)，值得一提的是，原文一些英文名词对应着特定中文解释，记录如下：

- low-level programming：~~低级编程~~ 底层编程。
- ergonomics：~~人体工程学~~ 人机工程学。
- opinionated：~~自以为是，固执的~~ 开箱即用的。
- critical adoption：~~批判性采用~~ 技术选型临界点。

## 精读

本文不会介绍 Rust 如何使用，而会重点介绍原文提到的 Rust 工具链的一些基本用法，如果你感兴趣，可以立刻替换现有的工具库！

### swc

[swc](https://swc.rs/) 是基于 Rust 开发的一系列编译、打包、压缩等工具，并且被广泛应用于更多更上层的 JS 基建，大大推动了 Rust 在 JS 基建的影响力，所以要第一个介绍。

swc 提供了一系列原子能力，涵盖构建与运行时：

#### @swc/cli

`@swc/cli` 可以同时构建 js 与 ts 文件：

```typescript
const a = 1;
```

```bash
npm i -D @swc/cli
npx swc ./main.ts

# output:
# Successfully compiled 1 file with swc.
# var a = 1;
```

具体功能与 babel 类似，都可以让浏览器支持先进语法或者 ts，只是 `@swc/cli` 比 babel 快了至少 20 倍。可以通过 `.swcrc` 文件做 [自定义配置](https://swc.rs/docs/configuration/swcrc)。

#### @swc/core

你可以利用 `@swc/core` 制作更上层的构建工具，所以它是 `@swc/cli` 的开发者调用版本。基本 API 来自官网开发者文档：

```typescript
const swc = require('@swc/core');

swc
  .transform('source code', {
    // Some options cannot be specified in .swcrc
    filename: 'input.js',
    sourceMaps: true,
    // Input files are treated as module by default.
    isModule: false,

    // All options below can be configured via .swcrc
    jsc: {
      parser: {
        syntax: 'ecmascript',
      },
      transform: {},
    },
  })
  .then((output) => {
    output.code; // transformed code
    output.map; // source map (in string)
  });
```

其实就是把 cli 调用改成了 node 调用。

#### @swc/wasm-web

`@swc/wasm-web` 可以在浏览器运行时调用 wsm 版的 swc，以得到更好的性能。下面是官方的例子：

```typescript
import { useEffect, useState } from 'react';
import initSwc, { transformSync } from '@swc/wasm-web';

export default function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function importAndRunSwcOnMount() {
      await initSwc();
      setInitialized(true);
    }
    importAndRunSwcOnMount();
  }, []);

  function compile() {
    if (!initialized) {
      return;
    }
    const result = transformSync(`console.log('hello')`, {});
    console.log(result);
  }

  return (
    <div className="App">
      <button onClick={compile}>Compile</button>
    </div>
  );
}
```

这个例子可以在浏览器运行时做类似 babel 的事情，无论是低代码平台还是在线 coding 平台都可以用它做运行时编译。

#### @swc/jest

`@swc/jest` 提供了 Rust 版本的 jest 实现，让 jest 跑得更快。使用方式也很简单，首先安装：

```bash
npm i @swc/jest
```

然后在 `jest.config.js` 配置文件中，将 ts 文件 compile 指向 `@swc/jest` 即可：

```javascript
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};
```

#### swc-loader

`swc-loader` 是针对 webpack 的 loader 插件，代替 `babel-loader`：

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        // `.swcrc` can be used to configure swc
        loader: 'swc-loader',
      },
    },
  ];
}
```

#### swcpack

增强了多文件 bundle 成一个文件的功能，基本可以认为是 swc 版本的 webpack，当然性能也会比 `swc-loader` 方案有进一步提升。

截至目前，该功能还在测试阶段，只要安装了 `@swc/cli` 就可使用，通过创建 `spack.config.js` 后执行 `npx spack` 即可运行，和 webpack 的使用方式一样。

### Deno

[Deno](https://deno.land/) 的 linter、code formatter、文档生成器采用 swc 构建，因此也算属于 Rust 阵营。

Deno 是一种新的 js/ts 运行时，所以我们总喜欢与 node 进行类比。[quickjs](https://bellard.org/quickjs/) 也一样，这三个都是一种对 js 语言的运行器，作为开发者，需求永远是更好的性能、兼容性与生态，三者几乎缺一不可，所以当下虽然不能完全代替 Nodejs，但作为高性能替代方案是很香的，可以基于他们做一些跨端跨平台的解析器，比如 [kraken](https://github.com/openkraken/kraken) 就是基于 quickjs + flutter 实现的一种高性能 web 渲染引擎，是 web 浏览器的替代方案，作为一种跨端方案。

### esbuild

[esbuild](https://esbuild.github.io/) 是较早被广泛使用的新一代 JS 基建，是 JS 打包与压缩工具。虽然采用 Go 编写，但性能与 Rust 不相上下，可以与 Rust 风潮放在一起看。

esbuild 目前有两个功能：编译和压缩，理论上分别可代替 babel 与 terser。

编译功能的基本用法：

```js
require('esbuild').transformSync('let x: number = 1', {
  loader: 'ts',
});

// 'let x = 1;\n'
```

压缩功能的基本用法：

```js
require('esbuild').transformSync('fn = obj => { return obj.x }', {
  minify: true,
});

// 'fn=n=>n.x;\n'
```

压缩功能比较稳定，适合用在生产环境，而编译功能要考虑兼容 webpack 的地方太多，在成熟稳定后才考虑能在生产环境使用，目前其实已经有不少新项目已经在生产环境使用 esbuild 的编译功能了。

编译功能与 `@swc` 类似，但因为 Rust 支持编译到 wsm，所以 `@swc` 提供了 web 运行时编译能力，而 esbuild 目前还没有看到这种特性。

### Rome

[Rome](https://rome.tools/blog/2020/08/08/introducing-rome) 是 Babel 作者做的基于 Nodejs 的前端基建全家桶，包含但不限于 Babel, ESLint, webpack, Prettier, Jest。目前 [计划使用 Rust 重构](https://rome.tools/blog/2021/09/21/rome-will-be-rewritten-in-rust)，虽然还没有实现，但我们姑且可以把 Rome 当作 Rust 的一员。

`rome` 是个全家桶 API，所以你只需要 `yarn add rome` 就完成了所有环境准备工作。

- `rome bundle` 打包项目。
- `rome compile` 编译单个文件。
- `rome develop` 调试项目。
- `rome parse` 解析文件抽象语法树。
- `rome analyzeDependencies` 分析依赖。

Rome 还将文件格式化与 Lint 合并为了 `rome check` 命令，并提供了[友好 UI 终端提示](https://rome.tools/#command-usage)。

其实我并不太看好 Rome，因为它负担太重了，测试、编译、Lint、格式化、压缩、打包的琐碎事情太多，把每一块交给社区可能会做得更好，这不现在还在重构中，牵一发而动全身。

### NAPI-RS

[NAPI-RS](https://napi.rs/) 提供了高性能的 Rust 到 Node 的衔接层，可以将 Rust 代码编译后成为 Node 可调用文件。下面是官网的例子：

```rust
#[js_function(1)]
fn fibonacci(ctx: CallContext) -> Result<JsNumber> {
  let n = ctx.get::<JsNumber>(0)?.try_into()?;
  ctx.env.create_int64(fibonacci_native(n))
}
```

上面写了一个斐波那契数列函数，直接调用了 `fibonacci_native` 函数实现。为了让这个方法被 Node 调用，首先安装 CLI：`npm i @napi-rs/cli`。

由于环境比较麻烦，因此需要利用这个脚手架初始化一个工作台，我们在里面写 Rust，然后再利用固定的脚本发布 npm 包。执行 `napi new` 创建一个项目，我们发现入口文件肯定是个 js，毕竟要被 node 引用，大概长这样（我创建了一个 `myLib` 包）：

```js
const { loadBinding } = require('@node-rs/helper');

/**
 * __dirname means load native addon from current dir
 * 'myLib' is the name of native addon
 * the second arguments was decided by `napi.name` field in `package.json`
 * the third arguments was decided by `name` field in `package.json`
 * `loadBinding` helper will load `myLib.[PLATFORM].node` from `__dirname` first
 * If failed to load addon, it will fallback to load from `myLib-[PLATFORM]`
 */
module.exports = loadBinding(__dirname, 'myLib', 'myLib');
```

所以 loadBinding 才是入口，同时项目文件夹下存在三个系统环境包，分别供不同系统环境调用：

- `@cool/core-darwin-x64` macOS x64 平台。
- `@cool/core-win32-x64` Windows x64 平台。
- `@cool/core-linux-arm64-gnu` Linux aarch64 平台。

`@node-rs/helper` 这个包的作用是引导 node 执行预编译的二进制文件，`loadBinding` 函数会尝试加载当前平台识别的二进制包。

将 `src/lib.rs` 的代码改成上面斐波那契数列的代码后，执行 `npm run build` 编译。注意在编译前需要安装 rust 开发环境，只要一行脚本即可安装，具体看 [rustup.rs](https://rustup.rs/)。然后把当前项目整体当作 node 包发布即可。

发布后，就可以在 node 代码中引用啦：

```javascript
import { fibonacci } from 'myLib';

function hello() {
  let result = fibonacci(10000);
  console.log(result);
  return result;
}
```

NAPI-RS 作为 Rust 与 Node 的桥梁，很好的解决了 Rust 渐进式替换现有 JS 工具链的问题。

### Rust + WebAssembly

[Rust + WebAssembly](https://www.rust-lang.org/what/wasm) 说明 Rust 具备编译到 wsm 的能力，虽然编译后代码性能会变得稍慢，但还是比 js 快很多，同时由于 wsm 的可移植性，让 Rust 也变得可移植了。

其实 Rust 支持编译到 WebAssembly 也不奇怪，因为本来 WebAssembly 的定位之一就是作为其他语言的目标编译产物，然后它本身支持跨平台，这样它就很好的完成了传播的使命。

WebAssembly 是一个基于栈的虚拟机 ([stack machine](https://webassembly.github.io/spec/core/exec/index.html))，所以跨平台能力一流。

想要将 Rust 编译为 wsm，除了安装 Rust 开发环境外，还要安装 [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)。

安装后编译只需执行 `wasm-pack build` 即可。更多用法可以查看 [API 文档](https://rustwasm.github.io/wasm-pack/book/commands/build.html)。

### dprint

[dprint](https://github.com/dprint/dprint) 是用 rust 编写的 js/ts 格式化工具，并提供了 [dprint-node](https://github.com/devongovett/dprint-node) 版本，可以直接作为 node 包，通过 npm 安装使用，从 [源码](https://github.com/devongovett/dprint-node/blob/main/src/lib.rs) 可以看到，使用 [NAPI-RS](https://napi.rs/) 实现。

`dprint-node` 可以直接在 Node 中使用：

```js
const dprint = require('dprint-node');
dprint.format(filePath, code, options);
```

[参数文档](https://dprint.dev/plugins/typescript/config/)。

### Parcel

[Parcel](https://parceljs.org/) 严格来说算是上一代 JS 基建，它出现在 Webpack 之后，Rust 风潮之前。不过由于它已经[采用 SWC 重写](https://github.com/parcel-bundler/parcel/pull/6230)，所以姑且算是跟上了时髦。

## 总结

前端全家桶已经有了一整套 Rust 实现，只是对于存量项目的编译准确性需要大量验证，我们还需要时间等待这些库的成熟度。

但毫无疑问的是，Rust 语言对 JS 基建支持已经较为完备了，剩下的只是工具层逻辑覆盖率的问题，都可以随时间而解决。而用 Rust 语言重写后的逻辑带来的巨幅性能提升将为社区注入巨大活力，就像原文说的，前端社区可以为了巨大性能提升而引入 Rust 语言，即便这可能导致为社区贡献门槛的提高。

> 讨论地址是：[精读《Rust 是 JS 基建的未来》· Issue #371 · dt-fe/weekly](https://github.com/dt-fe/weekly/issues/371)

**如果你想参与讨论，请 [点击这里](https://github.com/dt-fe/weekly)，每周都有新的主题，周末或周一发布。前端精读 - 帮你筛选靠谱的内容。**

> 关注 **前端精读微信公众号**

<img width=200 src="https://img.alicdn.com/tfs/TB165W0MCzqK1RjSZFLXXcn2XXa-258-258.jpg">

> 版权声明：自由转载-非商用-非衍生-保持署名（[创意共享 3.0 许可证](https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh)）
