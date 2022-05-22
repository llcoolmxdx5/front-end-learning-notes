const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  mode: "development",
  devtool: "inline-source-map",
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "html.html",
      inject: "body",
    }),
  ],
};

module.exports = config;
