/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "scripts/[name].js",
    pathinfo: false,
  },
  /**
   * @type {import('webpack-dev-server').Configuration}
   */
  devServer: {
    // static: "./dist",
    port: 8000,
    // devMiddleware: {
    //   index: true,
    //   writeToDisk: true,
    // },
  },
  cache: {
    type: "memory",
  },
  module: {
    rules: [
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
               * - 2 => postcss-loader, less-loader
               */
              importLoaders: 2,
              modules: {
                mode: (path) => {
                  if (/global\.((le|c)ss)$/.test(path)) {
                    return "global";
                  }
                  return "local";
                },
                localIdentName: "[local]_[hash:base64:4]",
                /**
                 * - camelCase 增加一个驼峰命名的拷贝
                 * - camelCaseOnly 转为驼峰命名
                 */
                exportLocalsConvention: "camelCaseOnly",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: { plugins: ["postcss-preset-env"] },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
};

module.exports = config;
