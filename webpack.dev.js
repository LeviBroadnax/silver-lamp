const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = merge(common, {
  entry: ["webpack-hot-middleware/client", "./src/index.tsx"],
  mode: "development",
  devServer: {
    open: false,
    historyApiFallback: true
  },
  plugins: [
    new HotModuleReplacementPlugin(),  // Add this plugin for HMR
  ]
});
