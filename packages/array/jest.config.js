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
  // transformIgnorePatterns: ['/node_modules/(?!\\/@alipay)'],
};
