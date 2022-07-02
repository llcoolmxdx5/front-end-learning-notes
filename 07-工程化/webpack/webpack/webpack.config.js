const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const toml = require('toml');
const yaml = require('yaml');
const json5 = require('json5');

const devMode = process.env.NODE_ENV !== 'production';
// 尝试使用环境变量，否则使用根路径
// const ASSET_PATH = process.env.ASSET_PATH || "/";

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: {
    // index: {
    //   import: "./src/index.js",
    //   dependOn: "shared",
    // },
    // another: {
    //   import: "./src/split/another-module",
    //   dependOn: "shared",
    // },
    // shared: "lodash",
    index: './src/index.js',
    another: './src/split/another-module.js',
  },
  output: {
    // publicPath: ASSET_PATH,
    publicPath: 'auto',
    filename: 'scripts/[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
    assetModuleFilename: 'images/[contenthash][ext][query]',
  },
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'inline-source-map' : false,
  /**
   * @type {import('webpack-dev-server').Configuration}
   */
  devServer: {
    static: './dist',
    port: 8000,
    devMiddleware: {
      index: true,
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource',
        // 优先级高于 output.assetModuleFilename
        generator: {
          filename: 'images/[contenthash:8][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
      {
        test: /\.jpg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024, // 默认 8kb
          },
        },
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        test: /\.((le|c)ss)$/i,
        use: [
          devMode ? 'style-loader' : { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
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
                    return 'global';
                  }
                  return 'local';
                },
                localIdentName: '[local]_[hash:base64:4]',
                /**
                 * - camelCase 增加一个驼峰命名的拷贝
                 * - camelCaseOnly 转为驼峰命名
                 */
                exportLocalsConvention: 'camelCaseOnly',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: ['postcss-preset-env'] },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      { test: /\.(csv|tsv)$/i, use: ['csv-loader'] },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: { parse: toml.parse },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-runtime']],
          },
        },
      },
    ],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH),
    // }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'html.html',
      inject: 'body',
    }),
  ].concat(
    devMode
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash:8].css',
          }),
        ]
  ),
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      // chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = config;
