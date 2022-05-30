const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");

const devMode = process.env.NODE_ENV !== "production";

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    assetModuleFilename: "images/[contenthash][ext][query]",
  },
  mode: devMode ? "development" : "production",
  devtool: devMode ? "inline-source-map" : false,
  /**
   * @type {import('webpack-dev-server').Configuration}
   */
  devServer: {
    static: "./dist",
    port: 8000,
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        type: "asset/resource",
        // 优先级高于 output.assetModuleFilename
        generator: {
          filename: "images/[contenthash:8][ext][query]",
        },
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      {
        test: /\.jpg$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024, // 默认 8kb
          },
        },
      },
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
      {
        test: /\.((le|c)ss)$/i,
        use: [
          devMode ? "style-loader" : { loader: MiniCssExtractPlugin.loader },
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
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      { test: /\.(csv|tsv)$/i, use: ["csv-loader"] },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "html.html",
      inject: "body",
    }),
  ].concat(
    devMode
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash:8].css",
          }),
        ]
  ),
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};

module.exports = config;
