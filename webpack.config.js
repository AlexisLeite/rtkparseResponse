const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");
const webpack = require("webpack");

module.exports = (_, argv) => {
  const mode = argv.mode;
  const isDevelopment = mode === "development";

  return {
    mode: isDevelopment ? "development" : "production" /* 
    devtool: "inline-source-map", */,
    entry: "./src/index.tsx",
    output: {
      path: __dirname + "/dist",
      filename: "bundle.js",
    },
    devServer: {
      // historyApiFallback: true,
      /* port: 3000, */
      hot: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.[jt]sx?$/,
          options: {
            plugins: [
              // this code will evaluate to "false" when
              // "isDevelopment" is "false"
              // otherwise it will return the plugin
              isDevelopment && require("react-refresh/babel"),
              // this line removes falsy values from the array
            ].filter(Boolean),
          },
        },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        { test: /\.js$/, use: ["source-map-loader"], enforce: "pre" },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
      ].filter(Boolean),
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebPackPlugin(),
    ].filter(Boolean),
  };
};
