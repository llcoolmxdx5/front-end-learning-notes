const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "search",
      filename: "remoteEntry.js",
      remotes: {
        nav: "nav@http://localhost:3001/remoteEntry.js",
        home: "home@http://localhost:3002/remoteEntry.js",
      },
      exposes: {},
      shared: {},
    }),
  ],
};
