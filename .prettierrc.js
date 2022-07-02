module.exports = {
  trailingComma: 'all', // 在所有可能的位置添加尾逗号,为了避免别人修改时git影响了
  tabWidth: 2, // 缩进字节数
  semi: true, // 句尾添加分号
  useTabs: false, // 缩进不使用tab，使用空格
  singleQuote: true, // 使用单引号代替双引号
  printWidth: 100, // 超过最大值换行
  endOfLine: 'lf', // 结尾是 cr crlf lf auto
  arrowParens: 'avoid', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  plugins: ['./scripts/prettier-plugin'], // 对 import 进行排序, 会去掉没有使用的import
};
