// @ts-nocheck
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserJSPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");
const BrotliPlugin = require("brotli-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  stats: "verbose",
  entry: "./src/index.tsx",
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new ModuleConcatenationPlugin(),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.(js|css|html|json)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
