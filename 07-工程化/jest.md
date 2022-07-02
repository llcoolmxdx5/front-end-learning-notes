# jest

## jest 基本介绍以及原理

1. 若需测试 ES6 的 MODULE 模块化时需要安装 `yarn add @babel/core @babel/preset-env jest@24.8.0 -D`
2. 配置 `.babelrc`

   ```js
   {
     "presets": [
       [
         "@babel/preset-env", { "targets": { "node": "current" } }
       ]
     ]
   }
   ```

3. jest 会自动进行 `.test.js` 文件的检测
4. `jest@24.8.0` 版本匹配 `axios@0.19.0`

## jest config

```js
// jest.config.js
module.exports = {
  moduleFileExtensions: [
    'ts', // 增加 ts、tsx，以支持单测文件中引入 typescript 模块
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.jest.json', // 此处指明 ts-jest 编译 typescript 时的配置文件
      diagnostics: false,
    },
    document: {},
  },
  // 只跑 util 进行单测覆盖率
  collectCoverageFrom: ['**/__test__/**'],
  // 此外，若你使用 typescript 书写单测，则需配置 testRegex 正则，保证匹配你的 ts、tsx 结尾的测试文件，并配置 testMatch 为 null
  testRegex: '/.*\\.(test)\\.(ts|tsx|js|jsx)$',
  testMatch: null,
  // 在执行每个测试文件前执行一次
  // setupFiles: ['./tests/setup.ts'],
  // 配置别名
  // 会在此递归的寻找需要的模块地址
  moduleDirectories: ['node_modules', 'src'],
  // transformIgnorePatterns: ['/node_modules/(?!\\/react)'],
};
```

## jest 匹配器

```js
expect({a:1}).toBe({a:1})//判断两个对象是否相等，用Object.is()判断对象的地址是否一致,测试数字用
expect(1).not.toBe(2)//判断不等
expect(n).toBeNull(); //判断是否为null
expect(n).toBeUndefined(); //判断是否为undefined
expect(n).toBeDefined(); //判断结果与toBeUndefined相反
expect(n).toBeTruthy(); //判断结果为true
expect(n).toBeFalsy(); //判断结果为false
expect(value).toBeGreaterThan(3); //大于3
expect(value).toBeGreaterThanOrEqual(3.5); //大于等于3.5
expect(value).toBeLessThan(5); //小于5
expect(value).toBeLessThanOrEqual(4.5); //小于等于4.5
expect(value).toBeCloseTo(0.3); // 浮点数判断相等
expect('Christoph').toMatch(/stop/); //正则表达式判断
expect(['one','two']).toContain('one'); //不解释
function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}
test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError); //判断抛出异常
}）
```

```js
test.only("仅测试当前用例"，() => {
  expect(1).not.toBe(2)
})
```

## 命令行操作

`jest --watchAll` 自动测试所有后缀为.test.js 的文件
`jest --watch` 自动测试当前文件
`jest --coverage` 生成测试覆盖率报告

- 按 f 仅运行失败的测试。
- 按 o 仅运行与更改的文件相关的测试。
- 按 p 按文件名正则表达式模式过滤。
- 按 t 以测试名称正则表达式模式进行过滤。
- 按 q 退出监视模式。
- 按 Enter 触发测试运行。

## 异步测试

```js
test('测试异步代码', () => {
  return fetchData().then((data) => {
    expect(data.data).toEqual({ success: true });
  });
});
test('测试异步代码', async () => {
  let data = await fetchData();
  expect(data.data).toMatchObject({ success: true });
});
test('异步测试失败', () => {
  return expect(fetchData()).rejects.toThrow();
});
```

## 生命周期

- beforeEach:每一个测试用例执行之前都会执行的生命周期
- afterEach:每一个测试用例执行之后都会执行的生命周期
- beforeAll:所有测试用例在执行之前执行的生命周期
- afterAll：所有测试用例在执行之后执行的生命周期

- 生命周期作用域的问题
  分组：describe
  > 所有的 describe 函数下面都有独立的 beforeEach beforeAll afterAll afterEach

```js
describe('测试所有加法', () => {
  beforeAll(() => {
    p = new Num();
  });
  test('测试Num加法', () => {
    p.add();
    expect(p.n).toBe(11);
  });
  test('测试Num减法', () => {
    p.reduce();
    expect(p.n).toBe(10);
  });
});
```

## mock 测试

mock 测试作用

- 测试函数的返回值
- 捕获函数的使用情况
- 改变函数内部的实现(重要)

mock 的使用

- jest.fn:捕获函数的调用
- toBeCalled:测试函数是否调用成功
- jest.fn().mock
  - calls: [ [] ], 测试函数调用的次数以及调用的参数
  - instances: [ undefined ], 当前调用函数的 this 指向
  - invocationCallOrder: [ 1 ], 函数执行的顺序
  - results: [ { type: 'return', value: undefined } ] 函数返回值的测试

## dom 测试
