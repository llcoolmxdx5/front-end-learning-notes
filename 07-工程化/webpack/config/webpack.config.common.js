const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const toml = require("toml");
const yaml = require("yaml");
const json5 = require("json5");

// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: {
    index: "./src/index.js",
    another: "./src/split/another-module.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    clean: true,
    assetModuleFilename: "images/[contenthash][ext][query]",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: ["@babel/preset-env"],
          //   plugins: [["@babel/plugin-transform-runtime"]],
          // },
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: ["last 1 version", "> 1%"],
                  useBuiltIns: "usage",
                  // 添加corejs配置
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
      {
        test: require.resolve("../src/shimming/index.ts"),
        use: "imports-loader?wrapper=window.console",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body",
    }),
    // new WorkboxPlugin.GenerateSW({
    //   // 这些选项帮助快速启用 ServiceWorkers
    //   // 不允许遗留任何“旧的” ServiceWorkers
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    new webpack.ProvidePlugin({
      // _: "lodash",
      join: ["lodash", "join"],
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};

module.exports = config;
