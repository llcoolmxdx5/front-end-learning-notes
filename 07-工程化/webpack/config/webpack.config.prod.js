const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: "production",
  devtool: false,
  output: {
    filename: "scripts/[name].[contenthash].js",
    publicPath: "http://localhost:8080/",
  },
  module: {
    rules: [
      {
        test: /\.((le|c)ss)$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[contenthash].css",
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  performance: {
    hints: false,
  },
};

module.exports = config;
